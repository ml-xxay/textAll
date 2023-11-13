<template>
  <div>
    <!-- 上传文件 -->
    <el-upload
      class="upload-demo"
      action="http://www.liulongbin.top:3006/api/upload/avatar"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-change="handleChange"
      multiple
      :show-file-list="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <!-- 进度条 -->
    <el-table border :data="files" stripe style="width: 800px">
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column prop="name" label="文件名" width="180">
      </el-table-column>
      <el-table-column prop="size" label="文件大小" width="180">
        <template slot-scope="item">{{ sizeInfo(item.row.size) }}</template>
      </el-table-column>
      <el-table-column prop="percentage" label="进度">
        <template slot-scope="item">
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="quzheng(item.row.percentage)"
            status="success"
          ></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'upload',
  data() {
    return {
      files: [],
    }
  },
  methods: {
    handleSuccess(response) {
      // console.log(response);
    },
    handleProgress(event, file, fileList) {
      // this.files = fileList
      // console.log(fileList)
      // console.log(file.name + ' -- ' +file.percentage + ' -- ' + file.size);
      let obj = {
        loaded: '', //当前进度
        filename: '', //文件名
        total: '', //文件总大小
      }

      console.log(event)
      // console.log(file);
      // console.log(fileList);
      obj.loaded = Math.ceil((event.loaded / event.total) * 100) //当前进度
      obj.total = event.total //文件总大小
      obj.filename = file.name //文件名
      if (event.loaded == event.total) {
        this.files.push(obj)
      }
    },
    handleChange() {
      // console.log("我上传成功了");
    },
    //   过滤文件大小
    sizeInfo(size) {
      size = parseInt((size / 1024 / 1024) * 1000)
      if (size > 1024) return `${Number(size / 1000).toFixed(2)}MB`
      return `${size}KB`
    },
    // 取整
    quzheng(percentage) {
      return Math.ceil(percentage)
    },
  },
  created() {},
}
</script>
<style scoped>
el-upload-list__item .el-icon-close-tip {
  display: none !important;
}
</style>
