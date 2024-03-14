<template>
  <!-- 扫码input -->
  <input
    :value="inputValue"
    @focus="focus"
    @blur="setfocus"
    :focus="focusType"
    @confirm="confirm"
    placeholder="请输入"
  />
</template>

<script>
export default {
  name: "",
  data() {
    return {
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
    // 聚焦时
    focus() {
      this.inputValue = "";
      console.log("输入框聚焦");
      // 并不能完全禁用软键盘
      setTimeout(function () {
        uni.hideKeyboard(); //隐藏软键盘:隐藏已经显示的软键盘，如果软键盘没有显示则不做任何操作
        plus.key.hideSoftKeybord(); //隐藏软键盘:隐藏已经显示的软键盘，如果软键盘没有显示则不做任何操作
      }, 250);
    },
    // 回车
    confirm: function (e) {
      this.inputValue = "";
      console.log(e.detail.value, "回显数据----");
    //e.detail.value   {"code":"S-B-A1-90107123 共享办公桌 A1 1600*800"}
      let proxy = e.detail.value.substring(0, e.detail.value.indexOf(" "));
      console.log(proxy, "&&&&&&&&&&");//S-B-A1-90107123

     //拿到参数后进行后续操作
    
    },
  },
};
</script>
