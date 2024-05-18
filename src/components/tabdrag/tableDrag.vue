<template>
  <div class="table-box">
    <div class="set-up-box">
      <!-- 新增按钮 -->
      <el-button
        icon="el-icon-circle-plus-outline"
        @click="addRow"
        :disabled="isDisabled"
        class="add-btn"
        type="primary"
        size="small"
        >新增</el-button
      >
      <!-- <el-button icon="el-icon-upload" size="small" type="primary" @click="uploadFile">上传</el-button> -->
      <el-upload
        class="upload-demo"
        action="#"
        ref="upload"
        :on-change="uploadFile"
        :show-file-list="false"
        :auto-upload="false"
        :limit="1">
        <el-button icon="el-icon-upload" size="small" type="primary">上传文件</el-button>
      </el-upload>
      <el-button icon="el-icon-notebook-2" size="small" type="primary" @click="downloadTemplate">下载模板</el-button>
      <el-button icon="el-icon-download" size="small" type="primary" @click="downloadAllProductList">下载数据</el-button>

      <!-- 拖拽表头 -->
      <div class="set-up">
        <div class="p-box">表头设置</div>
        <el-popover
          placement="top"
          width="150"
          trigger="click"
          popper-class="custom-popover"
          :visible-arrow="true"
          v-model="dialogVisible"
        >
          <el-button
            slot="reference"
            size="mini"
            icon="el-icon-s-tools"
            @click="handleMounseDown"
          ></el-button>
          <!-- 拖拽区域 -->
          <div class="set-up-content">
            <draggable
              v-model="tableHead"
              animation="1000"
              chosen-class="chosen"
              force-fallback="true"
              group="tableHead"
            >
              <div
                style="cursor: pointer"
                v-for="tag in tableHead"
                :key="tag.colKey"
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                <el-checkbox  v-model="tag.ifColChecked"><span :class="{ actives: tag.ifColChecked == true }">{{tag.colName }}</span></el-checkbox>
              </div>
            </draggable>
          </div>
          <!-- 确定按钮 -->
          <div class="save-box">
            <el-button
              @click="saveTableHerderSetUp"
              class="save-btn"
              type="primary"
              size="mini"
              plain
              >确定</el-button
            >
          </div>
        </el-popover>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :header-cell-style="{ background: '#f4f6f8' }"
      @header-dragend="headerDragend"
      @select="handleSelectionChange"
      ref="elTable"
      border
      stripe
      :data="tableData"
      style="width: 100%"
      :key="headKey"
    >
      <!-- 多选项-->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      >
      </el-table-column>
      <!-- 剩余项 -->
      <template v-for="(col, index) in tableHead">
        <el-table-column
          show-overflow-tooltip
          v-if="col.ifColChecked"
          :key="index"
          :prop="col.colKeyForCamelCase"
          :align="col.align || 'center'"
          :width="col.colWidth || 100"
        >
          <!-- 通过插槽为表头绑定mousedown和dragover方法 -->
          <template slot="header" slot-scope="{ column, $index }">
            <span @mouseup="handleOnmouUp">
              {{ col.colName }}
            </span>
          </template>
        </el-table-column>
      </template>

      <!-- 其他列定义 -->
      <el-table-column label="操作" align="center" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isCopied"
            icon="el-icon-edit"
            size="mini"
            type="primary"
            plain
            @click="handleCopyRowEdit(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "PaymentList",
  components: {
    draggable,
  },
  props: {
    tableHead: {
      type: Array,
      default: () => [],
    },
     // 默认研发
     role:{
      type:String,
      default: () => {
        return 'iprs_rd'
      }
    },
    tableData: {
      type: Array,
      required: true,
    },
    // 序号显示与隐藏
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      headKey: "dragHead", // 表头数组变换位置时，重绘table（不更新该值，表头数组变化时，页面不会改变）
      timer: null,
      selectTableRow: [], //选中行
      isDisabled: true, //
    //   tableHead: [...this.tableHeadSource],
    //   tableData: [...this.tableDataSource],
      tableErr: [],
      tableHeadCopy:[]
    };
  },
  watch: {
    tableHead: {
      handler: function (newVal, oldVal) {
        // console.log(newVal);
        this.$nextTick(() => {
          this.headKey = new Date().getTime() + ""; // 更新table key值
          this.$refs["elTable"].doLayout(); //重新渲染表格
          // localStorage.setItem('tableHead', JSON.stringify(newVal))
          // console.log(newVal,'---&&&&&');
          this.tableHead = newVal;
        });
      },
      deep: true,
      // immediate: true
    },
  },
  computed: {},
  beforeUpdate() {},
  created() {
    // this.tableHead = localStorage.getItem('tableHead') ? JSON.parse(localStorage.getItem('tableHead')) : this.tableHead
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handleOnmouUp() {
      clearTimeout(this.timer);
    },
    /** 鼠标摁下触发 */
    handleMounseDown() {
      this.timer = setTimeout(() => {
        this.dialogVisible = true;
      }, 500);
      return;
    },
    // 列宽发生变化
    headerDragend(newWidth, oldWidth, column, event) {
      console.log(newWidth);
      console.log(column.property);
      const columnItem = this.tableHead.find(
        (col) => col.colKeyForCamelCase === column.property
      );
      if (columnItem) {
        console.log(columnItem);
        columnItem.colWidth = newWidth;
        this.$emit("updatetableHead", this.tableHead);
      }

    },
    // 保存表头设置以及拖拽顺序配置
    saveTableHerderSetUp() {
      this.$emit("updatetableHead", this.tableHead);
    },
    // 多选
    handleSelectionChange(val) {
      if ((val && val.length == 0) || val.length != 1) {
        return this.isDisabled = true;
      }
      if(this.tableData[0].isCopied) {
        this.isDisabled = true;
        return
      }
      this.selectTableRow = val;
      const selectedIndexes = this.selectTableRow.map((row) =>
        this.tableData.findIndex((item) => item.id === row.id)
      ); // 假设id是唯一标识符
      if (selectedIndexes && selectedIndexes.length !== 1) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }

      const count = this.tableData.filter((item) => item.id == this.tableData[selectedIndexes[0]].id).length;
      console.log("被选中行的索引:", selectedIndexes);
      console.log(count,"数组中id出现的次数","id:",this.tableData[selectedIndexes[0]].id);
      if (count != 1) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
    },
    // 新增
    addRow() {
      const copiedRow = { ...this.selectTableRow[0], isCopied: true }; // 复制选中行并标记
      this.tableData.unshift(copiedRow);
      this.isDisabled = true;
      // 确保复制的行在table中也能被选中
      this.$nextTick(() => {
        // 获取复制行在displayedTableData中的索引
        const copiedRowIndex = this.tableData.findIndex((row) => row.isCopied);
        // 手动设置复制行的选中状态
        this.$refs.elTable.toggleRowSelection(
          this.tableData[copiedRowIndex],
          true
        );
      });
    },
    // 编辑
    handleCopyRowEdit(row) {
      this.$emit("updatetableData", row);
    },
    
    // 上传文件
    uploadFile(response, file){
      this.$refs.upload.clearFiles();
      console.log(response, file);
      let fileType = file[0].name.substring(file[0].name.lastIndexOf(".") + 1);
      if(fileType == 'xlsx') {
        console.log(file[0].name,'----------');
        let formData = new FormData()
          formData.append('productListFile', file[0].raw)
        this.$emit("uploadFile",formData);
      } else {
        this.$message.error('文件类型错误')
      }
    },
    // 下载模板
    downloadTemplate(){
      this.$emit("downloadTemplate");
    },
    // 下载数据
    downloadAllProductList(){
      this.$emit("downloadAllProductList");
    },
    // handle差异
    handleDiffrence(tableData, formData) {
        const map = new Map()
        this.tableHead.forEach(item => {
            map.set(item.colKeyForCamelCase, item.colName)
        })
        tableData.forEach(item => {
            let str = ''
            Object.keys(formData).forEach(key => {
                // isCopied 是用于添加编辑按钮， 没有具体的业务意义，不参与比较
                if (key !== 'isCopied' && formData[key] && formData[key] != item[key]) {
                    str += `${map.get(key)}:${item[key]},`
                }
            })
            this.$set(item, 'differenceItem', str ? str.slice(0, str.length - 1) : '')
        })
    }
  },
};
</script>

<style>
/* 表头拖拽滚动条 */
.set-up-content::-webkit-scrollbar {
  width: 4px; /*  设置纵轴（y轴）轴滚动条 */
  height: 4px; /*  设置横轴（x轴）轴滚动条 */
}
.set-up-content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px #ccc;
  background: #ccc;
}
.set-up-content::-webkit-scrollbar-track {
  border-radius: 0;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #fff;
}
/* table表格滚动条 */
.el-table .el-table__body-wrapper::-webkit-scrollbar {
  width: 4px; /*  设置纵轴（y轴）轴滚动条 */
  height: 4px; /*  设置横轴（x轴）轴滚动条 */
}
.el-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px #ccc;
  background: #ccc;
}
.el-table .el-table__body-wrapper::-webkit-scrollbar-track {
  border-radius: 0;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #fff;
}
.table-box {
  box-sizing: border-box;
}
.upload-demo {
  margin: 0 10px;
}
/* 表头设置 */
el-dialog .el-dialog__header {
  padding: 0 0 10px 0 !important;
}

/* 表格右侧定位占满高度 */
.el-table__fixed,
.el-table__fixed-right {
  height: 100% !important;
}
.set-up-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
}
.set-up {
  display: flex;
  margin-left: auto;
}
.add-btn {
  align-self: flex-start;
}
.set-up:hover .p-box {
  display: block;
}
.p-box {
  position: relative;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 28px;
  text-align: center;
  font-size: 13px;
  line-height: 28px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: none;
}
.p-box::before {
  position: absolute;
  top: 50%;
  left: 100px;
  content: "";
  width: 0;
  height: 0;
  transform: translateY(-50%);
  border-top: solid 5px transparent;
  border-left: solid 5px black;
  border-bottom: solid 5px transparent;
}
.custom-popover {
  right: 10px;
  width: 200px !important;
  height: 200px;
  padding-bottom: 40px;
  max-height: 200px;
  overflow: hidden;
}
.set-up-content {
  height: 100%;
  overflow: auto;
}
.save-box {
  height: 30px;
  margin: 5px 0;
  text-align: center;
  line-height: 30px;
  color: #fff;
}
.save-btn {
  width: 100%;
}
.actives {
  color: #3370ff;
}
</style>
