<!-- 手持终端PDA前置扫码组件 -->
<!-- 一般是在app中使用的   用法如下 -->
<!-- 
    1.把这个组件引入到你需要扫码的页面中用起来,然后在这个生命周期测试触发监听的扫码方法
    onShow() {
			var _this = this
			uni.$off('scancodedate') // 每次进来先 移除全局自定义事件监听器  
			uni.$on('scancodedate', function(data) {
			uni.showToast({
				title: "测试广播",
				icon: "none",
			});
				console.log(data.code, 'data.code为扫码内容')
				uni.hideLoading();
			})
		},
 -->
<template>  
    <div class="content"></div>  
</template>  

<script>  
var main,receiver,filter;    
var _codeQueryTag = false;    
export default {  
	name:'scan',
    data() {  
        return {  
            scanCode: ''  
        }  
    },  
    created: function (option) {  
        this.initScan()  
        this.startScan();    
    },    
    onHide:function(){    
        this.stopScan();    
    },  
    destroyed:function(){    
        /*页面退出时一定要卸载监听,否则下次进来时会重复，造成扫一次出2个以上的结果*/    
        this.stopScan();    
    },    
    methods: {  
			
        initScan() {  
            let _this = this;  
            main = plus.android.runtimeMainActivity();//获取activity  
            var IntentFilter = plus.android.importClass('android.content.IntentFilter');   
            filter = new IntentFilter();
            filter.addAction("android.intent.action.SCANRESULT"); // 换你的广播动作  
            receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver',{  
            onReceive : function(context, intent) {
				uni.showLoading({
						title: '正在查询'
					})
                plus.android.importClass(intent);     
                let code = intent.getStringExtra("value");// 换你的广播标签  
                _this.queryCode(code);    
            }});    
        },    
        startScan(){    
			
            main.registerReceiver(receiver,filter);  
        },    
        stopScan(){  
			
            main.unregisterReceiver(receiver);    
        },    
        queryCode: function(code){  
            //防重复  
            if(_codeQueryTag)return false;    
            _codeQueryTag = true;    
            setTimeout(function(){    
                _codeQueryTag = false;    
            },150);  
            var id = code  
            // console.log('id:', id)  
            uni.$emit('scancodedate',{code:id})  
        }  
    }  
}  
</script>  

<style>  
  /*  page {  
        background-color: #efeff4;  
    }  
    .content {  
        text-align: center;  
    }  */
</style>

