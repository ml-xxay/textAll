<template>
  <!-- 扫码input -->
  <!-- style="opacity: 0;
  position: absolute" 这个样式可以隐藏元素，但功能还在 -->
  <!-- 外层还有个盒子的时候   点击别的地方也会使输入框失去焦点 绑定失去焦点事件会在获取焦点-->
  <div @tap="setfocus()">
    <input
    v-if="flag"
    v-model="pvalue"
    @focus="focus"
    @blur="setfocus"
    @input="bindputFocus"
    :focus="focusType"
    @confirm="confirm"
    placeholder="请输入"
  />
  </div>
 
</template>

<script>
export default {
  name: "",
  data() {
    return {
      flag:true, //控制每次进来时dom元素的显示，防止跳转别的页面之后，回来这个页面焦点就失去了
      pvalue:'',//双向绑定，为了清空输入框值
      focusType: true, //控制输入框聚焦  初始必须是true
    };
  },
  //在小程序onShow生命周期中
  onShow: function () {
    // #ifdef APP-PLUS
    plus.key.removeEventListener("keyup");
    // 监听键按下事件
    plus.key.addEventListener("keyup", function (KeyEvent) {
      if (KeyEvent.keyCode == 66) {
        this.inputValue = "";
        uni.showToast({
          title: "监听回车",
        });
        console.log(KeyEvent);
        this.confirm(); //调用输入框回车事件
      }
    });
    // #endif
  },
  methods: {
    //解决焦点自动丢失，无法再次自动聚焦
    setfocus() {
      this.focusType = false;
      this.$nextTick(() => {
        this.focusType = true;
      });
    },
    // 在每次input输入的时候清空之前的内容，防止每次扫码之前的内容还在
    bindputFocus(){
      this.$nextTick(()=>{
        this.pvalue = '' //每次清空输入框的内容
      })
    },
    // 聚焦时
    focus() {
      console.log("输入框聚焦");
      // 并不能完全禁用软键盘
      setTimeout(function () {
        uni.hideKeyboard(); //隐藏软键盘:隐藏已经显示的软键盘，如果软键盘没有显示则不做任何操作
        plus.key.hideSoftKeybord(); //隐藏软键盘:隐藏已经显示的软键盘，如果软键盘没有显示则不做任何操作
      }, 250);
    },
    // 回车
    confirm: function (e) {
      console.log(e.detail.value, "回显数据----");
    //e.detail.value   {"code":"S-B-A1-90107123 共享办公桌 A1 1600*800"}
      let proxy = e.detail.value.substring(0, e.detail.value.indexOf(" "));
      console.log(proxy, "&&&&&&&&&&");//S-B-A1-90107123

     //拿到参数后进行后续操作

    },

    // 注意  在小程序或者app中  从这个当前页跳转到别的页面，在退回来的时候，onload生命周期不会被再次加载,导致输入框不饿能默认有焦点，没有焦点，扫码枪就扫不到内容回显
    
    // 现在要跳转了
    // this.flag = false //跳转页面之前隐藏dom
    // uni.navigateTo({
		// 			url: url,
		// 			events: { //需要在这里监听跳转过去的页面在退回来时发射的事件
		// 				refreshPage: () => { //refreshPage  为事件名称
		// 					// 刷新dom
		// 					this.flag = true;//显示dom
		// 				},
		// 			},
		// 		})


    //比如我现在在跳转过后的页面
    // onLoad() {
		//  this.eventChannel = this.getOpenerEventChannel();//ml
    // },
    // //点击返回上一页
    // uni.navigateBack({
    //     delta: 1,
    //   });
	  //   // 刷新上一页面
	  // this.eventChannel.emit("refreshPage");// 向上一页发射个方法
  },
};
</script>
