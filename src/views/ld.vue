<template>
  <div style="display: flex; gap: 20px">
    <input type="file" @change="handleFileChange" accept=".xlsx,.xls, .txt"  ref="fileInput"/>

    <textarea
      id="leftText"
      ref="leftTextRef"
      v-model="zhText"
      placeholder="请输入..."
      @input="handleZhInput"
      style="width: 40%; height: 200px"
    ></textarea>
    <textarea
      ref="rightTextRef"
      v-model="enText"
      placeholder="请输入..."
      @input="handleEnInput"
      style="width: 40%; height: 200px"
    ></textarea>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
export default {
  data() {
    return {
      zhText: '',
      enText: '',
      left: [], // 用来保存中文每行处理后的内容
      right: [], // 用来保存英文每行处理后的内容
      placeholder: '请输入...', // 提示语统一管理
    }
  },

  // 深度监听 left 数组和right数组

  watch: {
    // 监听中文数组变化
    left: {
      handler(newValue, oldValue) {
        console.log('left', newValue, oldValue)
        console.log('leftLength', newValue.length)

        // 如果新数组比旧数组短，说明某行被删了
        if (newValue.length < oldValue.length) {
          // 获取被删的行索引
          const deletedIndex = oldValue.findIndex((_, i) => !newValue[i])
          if (deletedIndex > -1 && this.right[deletedIndex]) {
            // 删除英文对应行
            this.right.splice(deletedIndex, 1)
            this.syncEnView()
          }
        }

        // 某行内容被清空，但数组长度一样
        oldValue.forEach((line, index) => {
          if (line && !newValue[index]) {
            // 该行被清空了
            if (this.right[index]) {
              this.right.splice(index, 1)
              this.syncEnView()
            }
          }
        })
      },
      deep: true,
    },

    // 监听英文数组变化
    right: {
      handler(newValue, oldValue) {
        console.log('right', newValue, oldValue)
        if (newValue.length < oldValue.length) {
          const deletedIndex = oldValue.findIndex((_, i) => !newValue[i])
          if (deletedIndex > -1 && this.left[deletedIndex]) {
            this.left.splice(deletedIndex, 1)
            this.syncZhView()
          }
        }
        // 某行内容被清空，但数组长度一样
        oldValue.forEach((line, index) => {
          if (line && !newValue[index]) {
            if (this.left[index]) {
              this.left.splice(index, 1)
              this.syncZhView()
            }
          }
        })
      },
      deep: true,
    },
  },
  mounted() {
    this.syncZhView()
    this.syncEnView()
  },

  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]
      if (!file) return
      
      const reader = new FileReader()

      if (file.name.endsWith('.txt')) {
        reader.readAsText(file) //读取txt文本
      } else {
        reader.readAsArrayBuffer(file) // 读取Excel  Excel需要用 binary 读取
      }

      // 文件读取结果
      reader.onload = (e) => {
        const data = e.target.result
        console.log(data, '---------')

        if (file.name.endsWith('.txt')) {
          this.parseTxt(data)
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          this.parseExcel(data)
        }
      }


       // ✅ 读取后立即清空  防止二次不能读取
      this.$nextTick(() => {
        // event.target.value = ''
        this.$refs.fileInput.value = null
      })
      
      
    },

    parseTxt(data) {
      console.log(data, '---我是读取的内容---')

      const lines = data.split('\n')
      const parsedData = lines
        .slice(1)
        .filter((line, index) => line.trim() !== '') // 过滤空行
        .map((line) => {
          const parts = line.split(':').map((s) => s.trim())
          if (parts.length == 2) { //必须两列
            const [src, tgt] = parts
            if (src !== '' && tgt !== '') {  //必须左右都有值
              return { src, tgt }
            }
          }
          return null
        })
        .filter((item) => item != null)  //过滤掉无值的

      this.updateDataFromParsed(parsedData)
    },

    parseExcel(data) {
      const workbook = XLSX.read(data, { type: 'binary' })

      const sheetName = workbook.SheetNames[0]  //第一个表
      const worksheet = workbook.Sheets[sheetName] //第一个表的数据

      // 读取为数组格式（非对象格式），跳过自动解析表头
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      // console.log(jsonData);  //读取的数据[ ['src_text', 'tgt_text'], ['你好', 'Hello'], ['游泳','swing'] ]   //['src_text', 'tgt_text']是excel的表头
      
      // 跳过第一行（表头）
      const result = []
      let validCount = 0
      let skipCount = 0

      for (let i = 1; i < jsonData.length; i++) {//i =1 从1开始跳过表头
        const row = jsonData[i]
        if (row.length < 2) {
          skipCount++
          continue
        }

        // 这个是没过滤为空的数据
        // if (row.length >= 2) {
        //   const src = row[0]?.toString().trim() || ''
        //   const tgt = row[1]?.toString().trim() || ''
        //   result.push({ src, tgt })
        // }
        
        // 过滤为undefined和null的数据
        const src = (row[0] !== undefined && row[0] !== null) ? row[0].toString().trim() : ''
        const tgt = (row[1] !== undefined && row[1] !== null) ? row[1].toString().trim() : ''

        // 过滤为空的数据
        if (src !== '' && tgt !== '') {
          result.push({ src, tgt })
          validCount++
        } else {
          skipCount++
        }
      }
      console.log(`Excel 读取：${validCount} 行有效，${skipCount} 行被跳过`)
      this.updateDataFromParsed(result)
    },

    updateDataFromParsed(parsedData) {
      console.log(parsedData,'----数据----')
      const MAX_TOTAL = 4000

      // 当前已有多少条数据
      const currentCount = this.left.length

      // 已达上限，无法再导入
      if (currentCount >= MAX_TOTAL) {
        alert('数据已达最大容量 4000 条，无法继续导入！')
        return
      }

      // 还能接受多少条新数据
      const availableSlots = MAX_TOTAL - currentCount

      // 只取新数据中可以容纳的部分
      const dataToAppend = parsedData.slice(0, availableSlots)
      const actualAppendCount = dataToAppend.length

      // 提取文本
      const newLeft = dataToAppend.map(item => item.src || '')
      const newRight = dataToAppend.map(item => item.tgt || '')

      // 拼接到原数据
      this.left = [...this.left, ...newLeft]
      this.right = [...this.right, ...newRight]


      
      // ✅ 友好提示用户
      if (actualAppendCount > 0) {
        console.log(`成功导入 ${actualAppendCount} 条数据，当前总数：${this.left.length}`)
        // 也可以用 message 或 UI 提示
        alert(`成功导入 ${actualAppendCount} 条数据，当前共 ${this.left.length} 条`)
      } else {
        // 极端情况：一个都加不进去了
        console.warn('新数据未导入：已达最大容量')
      }


      // 直接覆盖原有数据
      // this.left = parsedData.map((item) => item.src || '')
      // this.right = parsedData.map((item) => item.tgt || '')

      // 更新视图
      this.zhText = this.left.join('\n')
      this.enText = this.right.join('\n')
    },

   

    // 同步中文输入框内容到视图
    syncZhView() {
      this.zhText = this.left.join('\n')
    },

    // 同步英文输入框内容到视图
    syncEnView() {
      this.enText = this.right.join('\n')
    },
    // 监听中文输入框的输入事件
    handleZhInput(e) {
      // 按行分割内容
      const lines = e.target.value.split('\n') //'hello/n world'   ['hello', ' world']
      // 对每一行去除首尾空格
      this.left = lines.map((line) => line.trim()).filter(line => line !== '') //['hello', 'world']

      console.log('中文输入框内容：', this.zhText)
    },
    // 监听英文输入框的输入事件
    handleEnInput(e) {
      const lines = e.target.value.split('\n') //'hello/n world'   ['hello', ' world']
      // 对每一行去除首尾空格
      this.right = lines.map((line) => line.trim()).filter(line => line !== '') //['hello', 'world']
      console.log('英文输入框内容：', this.enText)
    },
    // ,
    // // 中文输入框按下回车事件
    // handleEnterLeft(e) {
    //   const value = e.target.value
    //   const lineIndex = this.getCaretLine(e.target)
    //   const lines = value.split('\n')

    //   const currentLine = lines[lineIndex]

    //   // 如果当前行是空或全是空白字符，阻止换行
    //   if (!currentLine || !currentLine.trim()) {
    //     e.preventDefault()
    //   }
    // },
    // // 获取光标所在行号（从0开始）
    // getCaretLine(el) {
    //   const pos = el.selectionStart
    //   const lines = el.value.substring(0, pos).split('\n')
    //   return lines.length - 1
    // },
  },
}
</script>

<style>
#leftText::placeholder {
  white-space: pre-wrap !important; /* 保留空白符序列，但是正常地进行换行 */
  word-wrap: break-word !important; /* 在长单词或 URL 地址内部进行换行 */
}
</style>
