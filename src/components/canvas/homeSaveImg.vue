<template>
  <!-- 小程序  把一张图片和文字合成一个图片 -->
  <view>
    <canvas class="canvas_image" :style="{width:windowW+ 'px',height:windowH + 'px' }" canvas-id="firstCanvas"></canvas>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        // topName: "绿色毅行线 10KM", //报名类型
        bmName: "00001", //报名编号
        jin: "#0168FF",
        ctx: null,//画布实例
        proportion: '',//比例
        windowW: '',
        windowH: '',
        pixelRatio: '',//像素密度
        canvasImg:'',
        canvasHeight:'',
        employeeAndFamily:[
          {
            height:560,
            title:'合肥',
            img:'https://apaas.sungrow.cn/images/trailwalk/registration_certificate_hefei_employee.png',
            imgFamily:'https://apaas.sungrow.cn/images/trailwalk/registration_certificate_hefei_family.png'
          },
          {
            height:535,
            title:'南京',
            img:'https://apaas.sungrow.cn/images/trailwalk/registration_certificate_nanjing.png'
          },
          {
            height:535,
            title:'深圳',
            img:'https://apaas.sungrow.cn/images/trailwalk/registration_certificate_shenzhen.png'
          },
          {
            height:535,
            title:'上海',
            img:'https://apaas.sungrow.cn/images/trailwalk/registration_certificate_shanghai.png'
          }
        ]
      };
    },
    computed: {
      ...mapGetters(['cityname', 'registerNo', 'trailwalkType','userType']),
    },
    onShow() {
      // this.img()
    },
    async created() {
      let that = this
      await uni.getSystemInfo({
        success(res) {
          // 动态的获取每个城市不同的高
          let cityobj = that.employeeAndFamily.find(city => city.title === that.cityname)
          if(cityobj.title == '合肥' && that.userType == 'employee'){
            that.canvasImg = cityobj.img
            that.canvasHeight = cityobj.height
          }else if (cityobj.title == '合肥' && that.userType == 'family'){
             that.canvasImg = cityobj.imgFamily
             that.canvasHeight = cityobj.height
          }else if (cityobj && that.cityname != '合肥'){
            that.canvasImg = cityobj.img
             that.canvasHeight = cityobj.height
          }
          // console.log(res,'-----我是设备信息-----');
          let proportion = res.windowWidth / 375
          that.proportion = res.windowWidth / 375 // 375为ui设计图宽度  获取屏幕的宽和实际高的比例
          that.pixelRatio = res.pixelRatio //获取设备像素比
          that.windowW = 310 * proportion //310是设计图宽
          that.windowH = that.canvasHeight * proportion //设计图高
          // console.log(that.windowH),'---我是处理后的高---';
        }
      })
      that.img()
    },
    methods: {
      async img() {
        let that = this
        var name = ''
        if (that.cityname == '合肥' && that.trailwalkType == '5_km') {
          name = '趣味-亲子线 5km'
        } else if (that.cityname == '合肥' && that.trailwalkType == '10_km') {
          name = '绿色-毅行线 10km'
        }
        var ctx = uni.createCanvasContext("firstCanvas", that) // 使用画布创建上下文 图片
        that.ctx = ctx
        await that.getImge(that.canvasImg).then(res => {
          ctx.drawImage(res.path, 0, 0, 310 * that.proportion, that.canvasHeight * that.proportion)
        })
        // ctx.fillRect(0, 0, 310, 535); //这个加了会黑屏
        // 设置图片坐标及大小，括号里面的分别是（图片路径，x坐标，y坐标，width，height）
        ctx.font = "bold 24px Arial"
        // ctx.setFontSize(24) //设置字体大小，默认10
        ctx.setFillStyle('#0168FF') //文字颜色：默认蓝色
        ctx.setTextAlign('center') //文本水平居中
        ctx.fillText(name, that.windowW / 2, that.windowH / 2 + 20); //文字内容、x坐标，y坐标
        ctx.setFillStyle('#0168FF') //文字颜色：默认蓝色
        ctx.setTextAlign('center') //文本水平居中
        ctx.font = "bold 65px Arial"
        // ctx.setFontSize(65) //设置字体大小，默认10
        if(that.cityname == '合肥') {
          ctx.fillText(that.registerNo, that.windowW / 2, that.windowH / 2 + 130); //文字内容、x坐标，y坐标
        }else {
          ctx.fillText(that.registerNo, that.windowW / 2, that.windowH / 2 + 100); //文字内容、x坐标，y坐标
        }
        ctx.save(); //保存
        ctx.draw() //绘制
      },

      //利用promise异步转同步  兼容ios
      getImge(url) {
        return new Promise((resolve, reject) => {
          uni.getImageInfo({
            src: url,
            success: function(res) {
              resolve(res)
            },
            fail: function(res) {
              reject(res)
            }
          })
        })
      },
      // canvas生成图片
      canimg() {
        let that = this
        uni.showLoading({
          title: "正在保存证书",
          mask: true
        });
        uni.canvasToTempFilePath({
          width: 310 * that.proportion,//画布宽
          height: that.windowH * that.proportion,//画布高
          quality: 1,
          destWidth: 310 * that.pixelRatio,//图片宽
          destHeight: that.windowH * that.pixelRatio,//图片高
          canvasId: 'firstCanvas',
          success: function(res) {
            // 在H5平台下，tempFilePath 为 base64
            console.log(res.tempFilePath, "//")

            // 保存本地
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                uni.showToast({
                  icon: 'none',
                  position: 'bottom',
                  title: "图片已下载至【图库】，请打开【图库】查看", // res.tempFilePath
                });
              },
              fail: function(err) {
                uni.showToast({
                  icon: 'none',
                  position: 'bottom',
                  title: "取消保存", // res.tempFilePath
                });
                uni.hideLoading()
                if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
                  uni.showModal({
                    content: '检测到您没打开获取信息功能权限，是否去设置打开？',
                    confirmText: "确认",
                    cancelText: '取消',
                    success: (res) => {
                      if (res.confirm) {
                        uni.openSetting({
                          success: (res) => {
                            console.log('确定');
                          }
                        })
                      } else {
                        console.log('取消');
                        return false;
                      }
                    }
                  })
                }
              }
            })

          },
          fail(err) {
            console.log(err)
            uni.showToast({
              title: '保存失败!',
              icon: 'none',
              duration: 3000
            })
            uni.hideLoading()
          }

        }, that)
      }
    }
  }
</script>

<style lang="scss">
  .canvas_image {
    position: absolute;
    top: 0;
    left: -100%;
  }
</style>