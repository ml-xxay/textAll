<template>
  <!-- 导出excel -->
  <div>
    <el-button type="primary" @click="exporeData">导出excel</el-button>
  </div>
</template>
<script>
// import { portTable } from '../vendor/zidingyiExportExcel'
export default {
  name: '',
  data() {
    return {
      tableData: [
        {
          correctionTime: '2018-11-30',
          mobile: '13800000001',
          timeOfEntry: '2025-11-01',
          username: '张三',
          age: '21',
        },
        {
          correctionTime: '2018-11-30',
          mobile: '13800000002',
          timeOfEntry: '2025-11-01',
          username: '李四',
          age: '23',
        },
      ],
      // tableData: [
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     start: 4,
      //   },
      //   {
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     start: 3,
      //   },
      //   {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     start: 4,
      //   },
      //   {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     start: 1,
      //   },
      //   {
      //     date: '2016-05-08',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     start: 2,
      //   },
      //   {
      //     date: '2016-05-06',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     start: 4,
      //   },
      //   {
      //     date: '2016-05-07',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     start: 2,
      //   },
      // ],
    }
  },
  methods: {
    // 导出excel  方式1
    exporeData() {
      import('../vendor/Export2Excel').then((excel) => {
        const multiHeader = [['姓名', '标题', '']] // 标题
        const header = ['姓名', '年龄', '手机号'] // 表头
        const filterVal = ['username', 'age', 'mobile'] // 数据属性
        const list = this.tableData //请求来的数据  下面我贴出来了tableData
        const merges = ['A1:A2'] //需要合并的单元格
        debugger
        const data = list.map((item) => filterVal.map((j) => item[j])) // 转换二维数组
        console.log(data)
        //data 转换后的数据类型  [["张三","21","13800000001"],["李四","24","13800000002"]]
        const filename = '复杂员工列表'
        excel.export_json_to_excel({
          multiHeader, // 标题--非必要
          header, // 要导出的表头   比如 ["姓名","工资"]  就是一行两列
          data, // 要导出的具体数据--二维数组 [[]]
          merges, // 合并--非必要
          filename, // 导出excel的文件名
        })
      })
    },
    // 导出表格exceljs  方式2
    // exporeData() {
    //   const columns = [
    //     { name: '时间' },
    //     { name: '姓名' },
    //     { name: '地址' },
    //     { name: '起点' },
    //   ]
    //   const width = [40, 40, 40, 40]
    //   const data = this.tableData.map((r) => {
    //     return [r.date, r.name, r.address, r.start]
    //   })
    //   portTable(
    //     // 调用方法，记得使用前要import一下
    //     '这是一个表格啊',
    //     'A1:D1',
    //     ['这是一个表格'],
    //     data,
    //     columns,
    //     width
    //   )
    // },
  },
}
</script>
<style scoped lang="less"></style>
