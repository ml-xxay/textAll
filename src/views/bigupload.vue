<template>
  <div id="app">
    <BigFileDownload></BigFileDownload>
    <br />

    <div>
      <br />
      <input
        ref="inputRef"
        class="inputFile"
        type="file"
        @change="changeFile"
      />
      <br />
      <br />
      <div>
        大文件 <span class="bigFileC">📁</span> 分了{{ chunksCount }}片:
      </div>
      <br />
      <div class="pieceItem" v-for="index in chunksCount" :key="index">
        <span class="a">{{ index - 1 }}</span>
        <span class="b">📄</span>
      </div>
      <br />
      <br />
      <div>计算此大文件的hash值进度</div>
      <div class="r">结果为: {{ fileHash }}</div>
      <progress max="100" :value="hashProgress"></progress> {{ hashProgress }}%
      <br />
      <br />
      <div>
        <div>上传文件的进度</div>
        <div class="r" v-show="fileProgress == 100">上传成功</div>
        <progress max="100" :value="fileProgress"></progress>
        {{ fileProgress }}%
      </div>

      <!-- 在上传进度条下面添加取消按钮 -->
      <br />
      <br />
      <button @click="cancelUpload" :disabled="!loading">取消上传</button>
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import {
  sliceFn,
  checkFileFn,
  sliceFileUploadFn,
  tellBackendMergeFn,
  download,
} from '../utils/index.js'

import BigFileDownload from '../components/BigFileDownload.vue' //大文件分片下载
// 定义文件上传状态码
const fileStatus = {
  0: '文件不存在（没有上传过）',
  1: '文件已存在（曾经上传过,代表已经上传完成了，并且文件还存在呢，无需重新上传）',
  2: '文件不完整（曾经上传中断过，可继续上传）',
}
export default {
  name: 'App',
  components: { BigFileDownload },
  data() {
    return {
      max_size: 10 * 1024 * 1024 * 1024,
      totalSize: 0, //文件总大小
      CHUNK_SIZE: 10 * 1024 * 1024, // 文件分片大小
      hashProgress: 0, // 计算hash值进度
      chunksCount: 0, // 一共分了多少片
      fileHash: '', // 大文件的hash值
      doneFileList: [], // 部分已完成的
      fileProgress: 0, // 上传文件的进度
      loading: false, //上传loading
      worker: null, //线程

      isUploadCanceled: false, // 控制是否取消上传
      currentUploadPromise: null, // 保存当前上传 promise，用于取消

      // 👇 新增状态：用于控制暂停/继续上传
      // isPaused: false,
      // uploadQueue: [], // 所有上传任务
      // pausedIndex: 0, // 当前上传到哪一片
      // currentUploadPromises: [], // 当前正在进行的请求
    }
  },
  methods: {
    /**
     * 开启辅助线程计算文件的hash值
     *    注意：开辅助线程运算文件在public文件夹中
     * */
    calFileMd5ByThreadFn(chunks) {
      return new Promise((resolve) => {
        this.worker = new Worker('./hash.js') // 实例化一个webworker线程
        this.worker.postMessage({ chunks }) // 主线程向辅助线程传递数据，发分片数组用于计算
        this.worker.onmessage = (e) => {
          const { hash, hashProgress } = e.data // 辅助线程将相关计算数据发给主线程
          this.hashProgress = hashProgress // 更改进度条
          if (hash) {
            // 当hash值被算出来时，就可以关闭主线程了
            this.worker.terminate()
            this.worker = null
            resolve(hash) // 将结果带出去
          }
        }
      })
    },
    /**
     * 第一步，获取文件并分片，根据分片结果算出文件的hash值，与此同时，更改文件解析的hash进度条
     * */
    async changeFile(e) {
      let file = this.$refs.inputRef.files[0] // 获取文件
      // 如果没有文件，直接返回
      if (!file) {
        return
      }

      if (file && file.size > this.max_size) {
        alert('文件太大，不支持上传大于1GB的文件')
        return
      }

      this.loading = true // 🔁 只在计算 hash 时开启 loading
      this.hashProgress = 0
      this.fileProgress = 0
      this.totalSize = file.size
      const chunks = sliceFn(file, this.CHUNK_SIZE) // 文件分片
      console.log('分片结果为:', chunks)

      this.chunksCount = chunks.length // 文件分了多少片
      // 计算文件hash值
      // console.time("文件hash计算时间");
      const fileMd5 = await this.calFileMd5ByThreadFn(chunks)
      // console.timeEnd("文件hash计算时间");
      console.log('计算出的hash值为:', fileMd5)
      this.fileHash = fileMd5 // 存一份hash值
      this.uploadFileCheck(fileMd5, chunks, file.name, file.size)
    },
    /**
     * 第二步，上传文件前的检查
     * */
    async uploadFileCheck(fileMd5, chunks, fileName, fileSize) {
      // 根据文件的hash值进行上传之前的校验，校验结果如下三种情况
      const { data: res } = await checkFileFn(fileMd5, this.chunksCount)

      console.log('校验结果为:', res)

      // allUploaded为true，直接告诉后端合并就行了
      if (res.data.allUploaded) {
        this.$message({
          type: 'warning',
          message: fileStatus[1],
        })

        let formData = new FormData()
        formData.append('fileId', fileMd5) // 使用FormData可以将blob文件转成二进制binary
        formData.append('fileName', fileName) //文件的唯一标识hash值
        formData.append('totalChunks', chunks.length) //当前分片索引号

        const res = await tellBackendMergeFn(formData)

        console.log(res, '------已存在直接上传------')

        return // 拦截停下
      }
      // uploaded 有长度，说明有上传过
      if (res.data.uploaded && res.data.uploaded.length > 0) {
        // 若是文件曾上传过一部分，后端会返回上传过得部分的文件索引，前端通过索引可以知道哪些
        // 上传过，做一个过滤，已上传的文件就不用继续上传了，上传未上传过的文件片
        this.doneFileList = res.data.uploaded.map((item) => {
          return item * 1 // 后端给到的是字符串索引，这里转成数字索引
        })
        console.log(this.doneFileList)

        console.log(fileStatus[2])
      }
      // 等于0表示没有上传过，直接上传
      if (res.data.uploaded.length == 0) {
        console.log(fileStatus[0])
      }

      let formDataList = [] // 准备参数数组

      // 说明没有上传过，组装一下，直接使用
      if (this.doneFileList.length == 0) {
        formDataList = chunks
          .map((item, index) => {
            // 只保留未上传过的分片
            return {
              formData: this.createChunkFormData(
                item,
                index,
                chunks.length,
                fileMd5,
                fileSize,
                fileName
              ),
              originalIndex: index, // 保留原始索引
            }
          })
          .filter((item) => item !== null) // 过滤掉 null
      }
      // 说明曾经上传过，需要过滤一下，曾经上传过的就不用再上传了
      else {
        formDataList = chunks
          .map((item, index) => {
            // 只保留未上传过的分片
            if (!this.doneFileList.includes(index)) {
              return {
                formData: this.createChunkFormData(
                  item,
                  index,
                  chunks.length,
                  fileMd5,
                  fileSize,
                  fileName
                ),
                originalIndex: index, // 保留原始索引
              }
            }
            return null
          })
          .filter((item) => item !== null) // 过滤掉 null
      }
      console.log(formDataList, '---formDataList----')

      this.fileUpload(formDataList, fileName)
    },

    /**
     * 第三步，创建辅助每个分片的 FormData 对象函数
     * */

    createChunkFormData(item, index, totalChunks, fileMd5, fileSize, fileName) {
      console.log(index, '原始索引')

      let formData = new FormData()
      formData.append('file', item)
      formData.append('fileId', fileMd5)
      formData.append('chunkNumber', index) // 使用原始索引
      formData.append('totalChunks', totalChunks)
      formData.append('chunkSize', item.size)
      formData.append('fileSize', fileSize)
      formData.append('fileName', fileName)
      return formData
    },

    /**
     * 第四步，上传文件（分片上传，一片文件就是一个请求）
     * */

    async fileUpload(formDataList, fileName) {
      // 用于记录每个分片上传的尝试次数
      const retryCounts = new Array(formDataList.length).fill(0) // 初始化每个分片的重试次数为0 [0,0,0,0]
      const maxRetries = 3 // 每个分片最多重试3次

      // 👇 增加一个已完成分片的计数器
      let completedCount = 0
      const totalChunks = formDataList.length
      // 递归上传函数，带重试机制
      const uploadWithRetry = async ({ formData }, index) => {
        // 👇 增加一个已完成分片的计数器
        if (this.isUploadCanceled) return { status: 'canceled' }
        try {
          const res = await sliceFileUploadFn(formData) // 调用上传函数
          if (!this.isUploadCanceled) {
            completedCount++
            this.fileProgress = Math.ceil((completedCount / totalChunks) * 100) //更新进度条
          }
          return { status: 'fulfilled', result: res } // 成功返回
        } catch (error) {
          retryCounts[index]++ // 重试次数+1
          if (retryCounts[index] <= maxRetries) {
            console.log(`第 ${retryCounts[index]} 次重传分片 ${index}`)
            return uploadWithRetry({ formData }, index) // 递归重试
          } else {
            console.error(`分片 ${index} 上传失败，已达最大重试次数`)
            return { status: 'rejected', reason: error } // 超过最大重试次数，标记为失败
          }
        }
      }

      // 构建请求列表（每个请求都带重试机制）
      const requestListFn = formDataList.map((item, index) =>
        uploadWithRetry(item, index)
      )

      // 使用 allSettled 确保所有请求完成（无论成功或失败）
      Promise.allSettled(requestListFn).then(async (results) => {
        if (this.isUploadCanceled) return // 如果已取消，跳过后续逻辑

        // 👇 所有请求完成，关闭 loading
        this.loading = false
        // this.fileProgress = 100 // 所有分片上传完成，进度条置为100%
        console.log('上传结果:', results)

        // 检查是否所有分片都上传成功
        const allSuccess = results.every(
          (result) => result.status === 'fulfilled'
        )

        if (!allSuccess) {
          // 如果有失败的分片，提示用户重新上传
          alert('部分分片上传失败，请重新上传文件')
          return
        }

        //所有分片上传成功后
        let formData = new FormData()
        formData.append('fileId', this.fileHash) // 使用FormData可以将blob文件转成二进制binary
        formData.append('fileName', fileName) //文件的唯一标识hash值
        formData.append('totalChunks', this.chunksCount) //分片总数
        // 所有分片上传成功后，通知后端合并文件
        const res = await tellBackendMergeFn(formData)
        console.log(res.data, '----合并文件结果-----')

        if (res.data.code === 0) {
          console.log('文件合并成功')
        } else {
          console.error('通知后端合并文件失败')
        }
      })
    },

    // ...其他方法

    // 取消上传
    async cancelUpload() {
      this.isUploadCanceled = true // 设置为已取消上传

      this.loading = false // 关闭 loading
      this.fileHash = '' //文件hash值
      this.chunksCount = 0 //总分片书
      this.totalSize = 0 //文件总大小
      this.fileProgress = 0 // 清空进度条
      this.hashProgress = 0 // 可选：清空 hash 进度条
      this.doneFileList = []

      // 终止线程
      if (this.worker) {
        this.worker.terminate()
        this.worker = null
      }
      // 调用后端删除分片的接口
      try {
        const res = await deleteUploadedChunksFn({ fileId: this.fileHash })
        console.log('已成功删除已上传的分片', res)
        this.$message.success('已取消上传，服务器数据已清理')
      } catch (err) {
        console.error('删除分片失败:', err)
        this.$message.error('取消上传成功，但删除分片失败')
      }
    },
  },
  beforeDestroy() {
    // 页面卸载时关闭子线程
    this.worker.terminate()
  },
}
</script>

<style>
#app {
  background-color: #ccc;
  box-sizing: border-box;
  padding: 12px;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}
.bigFileC {
  font-size: 48px;
}
.pieceItem {
  width: 36px;
  height: 36px;
  display: inline-block;
  position: relative;
}
.a,
.b {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.a {
  z-index: 6;
  font-weight: bold;
  font-size: 13px;
}
.b {
  z-index: 5;
  font-size: 32px;
}
progress {
  width: 60%;
}
.r {
  font-size: 13px;
  font-weight: 700;
}
</style>
