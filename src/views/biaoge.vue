<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容" show-password></el-input>

    <!-- 测试表单效验 -->
    <div style="margin-left: 48%">
      <br />
      <!-- 只能数字 -->
      <el-input v-input.num v-model="input" style="width: 400px" placeholder="只能数字"></el-input
      ><br /><br />
      <!-- 只能数字+小数点 -->
      <el-input
        v-input.num_point
        v-model="input1"
        style="width: 400px"
        placeholder="只能数字+小数点(可以多个小数点)"
      ></el-input
      ><br /><br />
      <!-- 只能整数 -->
      <el-input
        v-input.int
        v-model="input2"
        style="width: 400px"
        placeholder="只能整数-可以单独一个0,但不能以0开头"
      ></el-input
      ><br /><br />
      <!-- 只能正整数 -->
      <el-input
        v-input.intp
        v-model="input2"
        style="width: 400px"
        placeholder="只能正整数(不包含0)"
      ></el-input
      ><br /><br />
      <!-- 浮点型后面限制2位 -->
      <el-input
        v-input.float="2"
        v-model="input3"
        style="width: 400px"
        placeholder="浮点型小数后面限制2位"
      ></el-input
      ><br /><br />
      <!-- 只能英文 -->
      <el-input v-input.alp v-model="input4" style="width: 400px" placeholder="只能英文"></el-input
      ><br /><br /><br />
    </div>
    <!-- 测试字体图标 -->

    <div>我是字体图标: <i class="iconfont icon-wenhao"></i></div>
    <div>我是字体图标: <i class="iconfont icon-fuxian"></i></div>
    <div>我是字体图标: <i class="iconfont icon-rili"></i></div>

    <!-- 搜索表单 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="queryBtnClick"
      @resetBtnClick="resetBtnClick"
    >
    </page-search>
    <!-- table表格 -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :listDate="listDate"
      :total="total"
      @handleSelectionChange="handleSelectionChange"
      @deleatl="deleatl"
      @getPageListDate="getPageListDate"
    >
      <template #shanchu>
        <el-button type="parimary" size="medium" @click="handelNewClick">新建用户</el-button>
        <el-button type="parimary" size="medium">多选删除</el-button>
      </template>
      <template #rowTwo> 你好 </template>
      <template #handler="scope">
        <!-- <slot name="caozuo"></slot> -->
        <el-button icon="el-icon-edit" size="mini" type="text" @click="handleEditClick(scope.row)">
          编辑
        </el-button>
      </template>
      <!-- 图片插槽 可以预览 -->
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgurl"
          :preview-src-list="[scope.row.imgurl]"
        >
        </el-image>
      </template>
    </page-content>
    <!-- 弹框 -->
    <page-modal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      @dialogEdit="dialogEdit"
      @dialogCreate="dialogCreate"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>
<script>
import PageSearch from '../components/page-search/page-search.vue'; //搜索表单
import PageContent from '../components/page-content/page-content.vue'; //table表格
import PageModal from '../components/page-modal/page-modal.vue'; // 弹框

export default {
  name: '',
  components: {
    // formSearch,
    // mytable,
    PageSearch,
    PageContent,
    // HyFrom,
    PageModal
  },
  props: {},
  data() {
    return {
      weishu: '1',
      input: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      // 搜索表单的 配置
      searchFormConfig: {
        labelWidth: '120px',
        itemStyle: {
          //输入框的间距
          padding: '5px 40px'
        },

        colLayout: {
          span: 8
        },
        formItems: [
          //field 是要双向绑定所对应上去的字段  type 输入框类型  label 标头名称  value是输入框默认值
          {
            field: 'id',
            type: 'input',
            label: 'id',
            placeholder: '请输入id'
          },

          {
            field: 'name',
            type: 'input',
            label: '用户名',
            placeholder: '请输入用户名'
          },

          {
            field: 'iphone',
            type: 'input',
            label: '手机号码',
            placeholder: '请输入手机号码'
          },
          // 单选下拉
          // {
          //   field: 'status',
          //   linHeight: {
          //     lineHeight: '20px',
          //   },
          //   type: 'select',
          //   value: '自己决定默认值',
          //   label: '用户状态用户状态用户状态',
          //   placeholder: '请选择用户状态',
          //   options: [
          //     { title: '全部', value: '' },
          //     { title: '启用', value: 1 },
          //     { title: '禁用', value: 0 },
          //   ],
          // },
          // 多选下拉
          {
            field: 'status',
            linHeight: {
              lineHeight: '20px'
            },
            type: 'multiple',
            value: '自己决定默认值',
            label: '用户状态用户状态用户状态',
            placeholder: '请选择用户状态',
            options: [
              { title: '全部', value: '' },
              { title: '启用', value: 1 },
              { title: '禁用', value: 0 }
            ]
          },
          // 有开始和结束日期
          // {
          //
          //   field: 'createdTime',
          //   type: 'datepicker',
          //   label: '创建时间',
          //   otherOptions: {
          //     startPlaceholder: '开始时间',
          //     endPlaceholder: '结束时间',
          //     type: 'daterange',
          //   },
          // },

          {
            // 单个日期
            field: 'createdTime',
            type: 'datepickerone',
            label: '创建时间',
            placeholder: '请选择时间'
          }
        ]
      },

      // 表格请求回来的模拟数据
      listDate: [
        {
          id: 1,
          name: '张三',
          iphone: 18845608981,
          status: 0,
          createAt: '2018-10-1',
          updateAt: '2019-08-30',
          imgurl:
            'https://img0.baidu.com/it/u=3021883569,1259262591&fm=253&fmt=auto&app=120&f=JPEG?w=1140&h=641',
          children: [
            {
              id: '10',
              name: '张三的下一级',
              status: 1,
              createAt: '2018-10-1',
              updateAt: '2019-08-30',
              imgurl:
                'https://img0.baidu.com/it/u=3021883569,1259262591&fm=253&fmt=auto&app=120&f=JPEG?w=1140&h=641',
              children: [
                {
                  id: '11',
                  name: '张三的下一级的下一级',
                  status: 1,
                  createAt: '2018-10-1',
                  updateAt: '2019-08-30',
                  imgurl:
                    'https://img0.baidu.com/it/u=3021883569,1259262591&fm=253&fmt=auto&app=120&f=JPEG?w=1140&h=641',
                  children: [
                    {
                      id: '11',
                      name: '张三的下一级的下一级',
                      status: 1,
                      createAt: '2018-10-1',
                      updateAt: '2019-08-30',
                      imgurl:
                        'https://img0.baidu.com/it/u=3021883569,1259262591&fm=253&fmt=auto&app=120&f=JPEG?w=1140&h=641'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: '李四',
          iphone: 18845608981,
          status: 0,
          createAt: '2019-10-1',
          updateAt: '2019-08-30'
        },
        {
          id: 3,
          name: '王二',
          iphone: 18845608981,
          status: 1,
          createAt: '2010-10-1',
          updateAt: '2019-08-30'
        },
        {
          id: 4,
          name: '麻子',
          iphone: 18845608981,
          status: 1,
          createAt: '2011-10-1',
          updateAt: '2019-08-30'
        },
        {
          id: 5,
          name: '科比',
          iphone: 18845608981,
          status: 0,
          createAt: '2012-10-1',
          updateAt: '2019-08-30'
        }
      ],
      // 模拟网络请求总数据
      total: 10,
      // 表格配置项
      contentTableConfig: {
        // title: '用户列表',
        propList: [
          { prop: 'id', label: 'id', minWidth: '200' },
          { prop: 'name', label: '用户名用户名用户名用户名用户名用户名用户名', minWidth: '100' },
          { prop: 'iphone', label: '手机号码', minWidth: '100' },
          { prop: 'imgurl', label: '图片', minWidth: '100', slotName: 'image' },
          {
            prop: 'status',
            label: '用户状态',
            minWidth: '100',
            slotName: 'status'
          },
          {
            prop: 'createAt',
            label: '创建时间',
            minWidth: '250',
            slotName: 'createAt'
          },
          {
            prop: 'updateAt',
            label: '更新时间',
            minWidth: '250',
            slotName: 'updateAt'
          },
          { label: '操作', minWidth: '120', slotName: 'handler' }
        ],
        showIndexColumn: true, //序号项显示
        showSelectColumn: true, //多选项显示

        // 要不要展开表格
        childrenProps: {
          rowKey: 'id',
          treeProp: {
            children: 'children',
          },
        },
        maxheight: '400'
        // 分页的显示与隐藏
        // showFooter: false,
      },

      // 弹框显示与隐藏
      dialogVisible: false,
      // 弹框的配置文件
      modalConfig: {
        // labelWidth: '80px',
        itemStyle: {},
        formItems: [
          //这些字段都是根据表格的字段来的
          {
            field: 'name',
            type: 'input',
            label: '用户名',
            placeholder: '请输入用户名',
            isHidden: false //控制这一行显不显示  true隐藏  false显示
          },
          {
            field: 'iphone',
            type: 'input',
            label: '电话号码',
            placeholder: '请输入电话号码',
            isHidden: false
          },
          {
            field: 'status',
            type: 'select',
            value: '自己决定默认值',
            label: '用户状态',
            placeholder: '请选择用户状态',
            isHidden: false,
            options: [
              // 这里有的时候需要别的灵活的数据 自己发请求赋值给它就好
              { title: '启用', value: 1 },
              { title: '禁用', value: 0 }
            ]
          }
        ],
        colLayout: {
          span: 12
        },
        rules: {
          name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
        }
      },
      // 弹框编辑时要操作的数据
      defaultInfo: {},

      entity: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 直接在页面插入的编辑操作
    handleEditClick(row) {
      console.log(row);
      this.defaultInfo = { ...row }; //点击编辑时  把子编辑的数据给defaultInfo  方便做数据的回显
      this.$refs.pageModalRef.dialogVisible = true;
    },
    // 监听搜索组件传出来的搜索事件  formData 搜索对象参数-->组件传出来的
    queryBtnClick(formData) {
      console.log(formData);

      Object.keys(formData).forEach((item) => {
        console.log(item); //id name iphone status createdTime
        this.entity[item] = formData[item];
        //  if(item == 'status' ){ //这个时多选时候赋值
        //   console.log(formData[item].join(' '));
        //  }
      });
      // 搜索时页码也要重置
      this.$refs.pageContentRef.pageInfo.pageNum = 1;
      this.$refs.pageContentRef.pageInfo.pageSize = 10;

      // 从新发送请求 去请求搜索出来表格的数据
    },
    // 监听搜索组件传出来的重置事件
    resetBtnClick() {
      alert('点击了重置');
      // 重置时页码也要重置
      this.$refs.pageContentRef.pageInfo.pageNum = 1; //页码重置
      this.$refs.pageContentRef.pageInfo.pageSize = 10;

      // 重置的时候也要 从新发送请求 去请求搜索出来表格的数据
    },

    // 监听table编辑操作   这个被直接在页面插入代替了
    // EditClick(item) {
    //   // console.log(item)
    //   this.defaultInfo = { ...item } //点击编辑时  把子编辑的数据给defaultInfo  方便做数据的回显
    //   this.$refs.pageModalRef.dialogVisible = true
    // },
    // 监听table表格删除操作
    deleatl(row) {
      alert('点击了删除操作');
      console.log(row);
    },
    // tab表格多选按钮操作  注意  不是多选删除按钮
    handleSelectionChange(val) {
      console.log(val, '------');
    },
    // 按钮新建操作
    handelNewClick() {
      // alert('新建用户')
      this.defaultInfo = {};
      this.$refs.pageModalRef.dialogVisible = true;
    },
    // 监听table表格分页请求
    getPageListDate(query) {
      // 请求新的页数数据
      console.log(query);
      alert('触发了分页请求');
    },

    // 弹窗事件 编辑用户/新增用户
    dialogEdit(form) {
      //传出来的编辑的对象
      // 编辑请求
    },
    dialogCreate(form) {
      //传出来的新增对象
      //新增请求
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less"></style>
