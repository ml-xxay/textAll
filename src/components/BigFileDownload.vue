<template>
  <div>
    <h2>大文件分片下载</h2>
    <button @click="startDownload" :disabled="downloading">
      {{ downloading ? '下载中...' : '开始下载' }}
    </button>
    <div v-if="progress > 0">下载进度：{{ progress }}%</div>
  </div>
</template>

<script>
import { downloadFileInChunks } from '@/utils/download'
import { download } from '@/utils/index.js'
export default {
  data() {
    return {
      downloading: false,
      progress: 0,
    }
  },
  methods: {
    async startDownload() {
      // 普通下载
      // const res = await download()
      // console.log(res);
      // console.log(res.headers['content-disposition']);
      // console.log(res.headers['content-disposition'].split('filename="')[1].split('"')[0]);
      // const blob = new Blob([res.data], {type: 'audio/mpeg'});
      // const url = URL.createObjectURL(blob)
      // const a = document.createElement('a')
      // a.href = url
      // a.download = res.headers['content-disposition'].split('filename="')[1].split('"')[0];// 下载后的文件名
      // document.body.appendChild(a)
      // a.click()
      // a.remove()
      // URL.revokeObjectURL(url)

      // 分片下载

      const fileId = 1833 // 文件 ID
      const fileUrl = `/api/web-server/uc-api/file/download?id=${fileId}`
      const chunkSize = 1024 * 1024 * 1 // 每个分片大小：2MB
      try {
        this.downloading = true
        // 调用下载函数
        const blob = await downloadFileInChunks(
          fileUrl,
          chunkSize,
          (progress) => {
            this.progress = Math.round(progress * 100)
          }
        )
        // 创建下载链接并触发下载
        // 假设response.data是你的流数据   audio/mpeg

        console.log(blob,'-----blob----');
        

        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'downloaded-file.zip' // 下载后的文件名
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
      } catch (err) {
        console.error('下载失败:', err)
        alert('下载失败，请重试')
      } finally {
        this.downloading = false
        this.progress = 0
      }
    },
  },
}
</script>
