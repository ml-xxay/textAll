<template>
    <div class="table-box">
        
        <div class="set-up-box">
            <!-- 新增按钮 -->
            <el-button @click="addRow" :disabled="isDisabled" class="add-btn" type="primary" size="medium">新增</el-button>
            <!-- 拖拽表头 -->
            <div class="set-up">
                <div class="p-box">表头设置</div>
                <el-popover
                    placement="bottom"
                    width="150"
                    trigger="click"
                    popper-class="custom-popover"
                    :visible-arrow="true"
                    v-model="dialogVisible"
                >

                <el-button slot="reference" size="mini" icon="el-icon-s-tools" @click="handleMounseDown"></el-button>
                <!-- 拖拽区域 -->
                <div class="set-up-content">
                    <draggable v-model="tableHead" animation="1000" chosen-class="chosen" force-fallback="true"
                    group="tableHead">
                        <div style="cursor: pointer;" v-for="tag in tableHead" :key="tag.value" :disable-transitions="false"
                            @close="handleClose1(tag)">
                            <el-checkbox v-model="tag.check"><span :class="{active:tag.check == true}">{{ tag.label }}</span></el-checkbox>
                        </div>
                    </draggable>
                </div>
                <!-- 确定按钮 -->
                <div class="save-box">
                    <el-button @click="saveTableHerderSetUp" class="save-btn" type="primary" size="mini" plain>确定</el-button>
                </div>
                </el-popover>
            </div>
        </div>
        <!-- 表格 -->
        <el-table  @header-dragend="headerDragend" @select="handleSelectionChange" ref="elTable" border stripe :data="tableData" style="width: 100%" :key="headKey">
            <!-- 多选项  可以传控制变量控制显示与隐藏 -->
            <el-table-column
            v-if="showSelectColumn"
            type="selection"
            align="center"
            width="60"
            >
            </el-table-column>
            <!-- 剩余项 -->
            <template v-for="(col, index) in tableHead">
                <el-table-column  show-overflow-tooltip v-if="col.check" :key="index" :prop="col.value" :align="col.align || 'center'" :width="col.width || 100">
                    <!-- 通过插槽为表头绑定mousedown和dragover方法 -->
                    <template slot="header" slot-scope="{ column, $index }">
                        <span @mouseup="handleOnmouUp">
                            {{ col.label }}
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
import draggable from 'vuedraggable'
export default {
    name: "PaymentList",
    components: {
        draggable
    },
    props:{
        tableHead:{
            type:Array,
            default: () => ([]),
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
            tableData: [
                {
                    id:1,
                    v0: "2016-05-02",
                    v1: "王1",
                    v2: "上海",
                    v3: "普陀区",
                    v4: "上海市普陀区金沙江路 1518 弄",
                    v5: 200333,
                    v6: "2016-05-02",
                    v7: "王小虎",
                    v8: "上海",
                    v9: "普陀区",
                    v10: "普陀区",
                },
                {
                    id:2,
                    v0: "2016-05-02",
                    v1: "2",
                    v2: "上海",
                    v3: "普陀区",
                    v4: "上海市普陀区金沙江路 1518 弄",
                    v5: 200333,
                    v6: "2016-05-02",
                    v7: "王小虎",
                    v8: "上海",
                    v9: "普陀区",
                    v10: "普陀区",
                }
            ],
            timer: null,
            selectTableRow:[],
            isDisabled:true,
        };
    },
    watch: {
        tableHead:{
            handler:function(newVal,oldVal){
                // console.log(newVal);
                this.$nextTick(() => {
                this.headKey = new Date().getTime() + ""; // 更新table key值
                this.$refs['elTable'].doLayout(); //重新渲染表格
                localStorage.setItem('tableHead', JSON.stringify(newVal))
                this.tableHead = newVal
            })
            },
            deep: true,
            // immediate: true
        }
    },
    computed:{
  
    },
    beforeUpdate() {
    },
    created() {
        this.tableHead = localStorage.getItem('tableHead') ? JSON.parse(localStorage.getItem('tableHead')) : this.tableHead
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        handleOnmouUp() {
            clearTimeout(this.timer);
        },
        /** 鼠标摁下触发 */
        handleMounseDown() {
            this.timer = setTimeout(() => {
                this.dialogVisible = true
            }, 500)
            return
        },
        // 列宽发生变化
        headerDragend(newWidth,oldWidth,column, event){
            console.log(newWidth);
            const columnItem = this.tableHead.find(col => col.value === column.property);
            if(columnItem) {
                columnItem.width = newWidth
            }
        },
        // 保存表头设置以及拖拽顺序配置
        saveTableHerderSetUp(){
            console.log('-----saveTableHerderSetUp------');
        },
        // 多选
        handleSelectionChange(val){
            if(val && val.length == 0 || val.length != 1){
                return this.isDisabled = true
            }

            console.log(this.tableData,'table');
            console.log(val,'所选中的项');
            
            this.selectTableRow = val
            const selectedIndexes = this.selectTableRow.map(row => this.tableData.findIndex(item => item.id === row.id));// 假设id是唯一标识符
            if(selectedIndexes && selectedIndexes.length !== 1){
                this.isDisabled = true
            }else {
                this.isDisabled = false
            }

            const count = this.tableData.filter(item => item.id == this.tableData[selectedIndexes[0]].id).length;
            console.log('被选中行的索引:', selectedIndexes);
            console.log(count,'数组中id出现的次数','id:',this.tableData[selectedIndexes[0]].id,);
            if(count != 1){
                this.isDisabled = true
            }else {
                this.isDisabled = false
            }
          
        },
        // 新增
        addRow(){
            const copiedRow = { ...this.selectTableRow[0], isCopied: true }; // 复制选中行并标记
            this.tableData.unshift(copiedRow)
            this.isDisabled = true
              // 确保复制的行在table中也能被选中
              this.$nextTick(() => {
                // 获取复制行在displayedTableData中的索引
                const copiedRowIndex = this.tableData.findIndex(row => row.isCopied);
                // 手动设置复制行的选中状态
                this.$refs.elTable.toggleRowSelection(this.tableData[copiedRowIndex], true);
            });
        },
        handleCopyRowEdit(row){
            console.log(row,'----');
        }
    }
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
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
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
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #fff;
    }
    .table-box {
        box-sizing: border-box;
    }
    /* 表头设置 */
    el-dialog .el-dialog__header {
        padding: 0 0 10px 0 !important;
    }
    .el-table__fixed,.el-table__fixed-right{
        height:100% !important;
    }
    .set-up-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
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
        background-color: rgba(0,0,0,0.8);
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
            transform:translateY(-50%) ;
            border-top: solid 5px transparent;
            border-left: solid 5px black;
            border-bottom: solid 5px transparent;
    }
    .custom-popover{
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
    .active {
        color: #3370ff;
    }
</style>
