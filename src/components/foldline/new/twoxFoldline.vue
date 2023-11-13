<template>
  <div class="box">
    <!-- <div ref="chart" style="width: 100%; height: 600px"></div> -->

    <div class="f">
      <div class="s">优质用户</div>
      <div class="d">达标用户</div>
      <div class="g">不达标用户</div>
      <div ref="chart" style="width: 100%; height: 600px"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    data: {
      type: Object,
      require: true,
    },
    height: {
      type: String,
      default: '300px',
    },
  },
  data() {
    return {
      // data: {
      //   // x轴各个电厂用户公司名
      //   xs: [
      //     '武汉公司',
      //     '南京公司模拟超出你好你好',
      //     '上海公司',
      //     '深圳公司',
      //     '苏州公司',
      //     '广东公司',
      //     '郑州公司',
      //     '安徽公司',
      //     '合肥公司',
      //     '淮南公司',
      //     '怀远公司',
      //     '蒙城公司',
      //     '宿州公司',
      //   ],
      //   xs1: [
      //     '2.3',
      //     '2.4',
      //     '2.5',
      //     '2.6',
      //     '2.7',
      //     '2.8',
      //     '2.4',
      //     '2.4',
      //     '2.4',
      //     '2.4',
      //     '2.4',
      //     '2.4',
      //     '2.4',
      //   ],
      //   // y轴数据调节速率
      //   dataList: [
      //     580, 540, 500, 460, 420, 380, 340, 300, 260, 220, 180, 140, 100, 60,
      //   ],
      //   // 警戒线  要求调节速率百分比  调节电量10万KW.h
      //   Yspeedregulation: 150,
      //   // Xquantityelectricity: '安徽公司', //要求调节电量警戒线
      //   Xquantityelectricity: '2.8', //要求调节电量警戒线
      //   XquantityelectricityDL: 20,
      //   baifenbi: '20',
      //   Xindex: 7, //调节电量10万KW.h 索引
      //   Highquality: { start: 0, end: 7 }, //优质用户开始结束索引
      //   Compliance: { start: 7, end: 10 }, //达标用户开始结束索引
      //   NoCompliance: { start: 10, end: 12 }, //不达标用户开始结束索引
      //   zongshuA: ['100', '200', '300', '400'],//调节速率百分比平均值
      //   zongshuB: ['3.7', '4.6', '5.3', '6.2'],//调节电量之和
      //   xFontcolor: [
      //     'green',
      //     'green',
      //     'green',
      //     'green',
      //     '#668bd1',
      //     '#668bd1',
      //     '#668bd1',
      //     '#668bd1',
      //     '#668bd1',
      //     '#f2c581',
      //     '#f2c581',
      //     '#f2c581',
      //   ],
      // },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      const echarts = require('echarts')
      const charts = echarts.init(this.$refs.chart)
      // var arr = []
      var arr = this.data.xFontcolor
      var listA = this.data.zongshuA
      var listB = this.data.zongshuB
      var Dindex = this.data.Xindex
      var num1 = this.data.XquantityelectricityDL
      var num2 = this.data.baifenbi
      var option = {
        // visualMap: {
        //   // formatter: function (value) {
        //   //   //标签的格式化工具。
        //   //   return '你好' + value
        //   // },
        //   z: 999,
        //   type: 'piecewise',
        //   show: true,
        //   dimension: 0,
        //   seriesIndex: 0,
        //   // text: ['nihao', 'Low'], //两端的文本
        //   right: '0%',
        //   top: '0% ',
        //   orient: 'horizontal',
        //   pieces: [
        //     {
        //       label: '计算',
        //       gt: 0,
        //       lt: 0,
        //       // color: 'rgba(196, 220, 242, 1)',
        //       color: 'rgba(196, 220, 242, 0)',
        //     },
        //     // 绿色  优质用户
        //     {
        //       label: '优质用户',
        //       // value: 1,
        //       // gt: 0,
        //       // lt: 7,
        //       gt: this.data.Highquality.start,
        //       lt: this.data.Highquality.end,
        //       // color: 'rgba( 68, 186, 129, 0.3)',
        //       color: 'rgba( 68, 186, 129, 0)',
        //     },
        //     // 黄色  达标用户
        //     {
        //       label: '达标用户',
        //       // value: 3,
        //       // gt: 7,
        //       // lt: 10,
        //       gt: this.data.Compliance.start,
        //       lt: this.data.Compliance.end,
        //       color: 'rgba(185, 209, 246, 0)',
        //     },
        //     // 最右侧粉红色 不达标用户
        //     {
        //       label: '不达标用户',
        //       // value: 2,
        //       // gt: 10,
        //       // lt: 12,
        //       gt: this.data.NoCompliance.start,
        //       lt: this.data.NoCompliance.end,
        //       // color: 'rgba(255, 203, 203, 1)',
        //       color: 'rgba(253, 205, 119, 0)',
        //     },
        //   ],
        // },
        // 缩略图
        dataZoom: [
          {
            type: 'slider',
            moveHandleSize: 0,
            handleStyle: {
              color: '#fff',
            },
            dataBackground: {
              //数据阴影的样式。
              color: '#fff',
              lineStyle: {
                color: '#D3D3D3',
              }, //阴影的线条样式
            },
            selectedDataBackground: {
              //选中部分数据阴影的样式
              lineStyle: {
                color: '#2F73F2',
              }, //选中部分阴影的线条样式
            },

            textStyle: {
              color: '#2F73F2',
            },
            handleStyle: {
              color: '#2F73F2',
              height: '20',
            },
            start: 0,

            end: 100,
            height: '20',
          },
        ],
        legend: {
          // right: '30%',
          right: '330',
          top: '5',
          data: [{ name: '实时负荷', icon: '' }],
        },
        title: {
          text: '调节速率百分比', //标题
          left: '20',
          textStyle: {
            color: '#999999',
            fontSize: '12',
          },
        },
        tooltip: {
          //提示框组件
          trigger: 'axis',
          // formatter: '基线负荷: {c0} kW',
          formatter: function (value) {
            //标签的格式化工具。
            // console.log(list,'-----------')
            var val = `${value[0].name}` + '\n' + '<br/>'
            val +=
              `调节速率百分比:${listA[value[0].dataIndex]}` +
              '/min' +
              '\n' +
              '<br/>'
            val += `调节电量: ${listB[value[0].dataIndex]}万kW.h`
            return val
          },
        },
        grid: {
          left: '5%',
          // right:'3%',
          // containLabel: true
        },
        xAxis: [
          // Kw
          {
            name: '调节电量',
            scale: true,
            triggerEvent: true,
            // type: 'category',
            // boundaryGap: false,
            z: 2,
            nameTextStyle: {
              lineHeight: 30, //标题行高
              verticalAlign: 'top',
              //坐标轴名称的文字样式
              color: 'black', //坐标轴名称的颜色
            },
            axisLine: {
              symbol: ['none', 'arrow'], //加箭头处
              symbolOffset: [0, 12],
              lineStyle: {
                color: '#c0c0c0', //x轴线颜色
              },
            },
            axisLabel: {
              // interval: 1, // 显示所有刻度
              textStyle: {
                //x轴字体颜色 动态
                // color: function (value, index) {
                //   return arr[index]
                // },

                color: '#999999', //x轴字体颜色
              },
              margin: 8,
              //  formatter: '                                   {value}万kW·h'
              formatter: function (params) {
                // var val = ''
                // if (params.length > 4) {
                //   val = params.substr(0, 4) + '...'
                //   return val
                // } else {
                //   return params
                // }
                return params + 'kW·h'
              },
            },

            axisTick: {
              show: true, //不显示x轴刻度线
            },
            type: 'category',
            data: this.data.xs1,
            //  offset:-460,
            offleft: 30,
          },
          // 公司
          {
            // name: '调节电量',
            scale: true,
            triggerEvent: true,
            // type: 'category',
            // boundaryGap: false,
            z: 2,
            nameTextStyle: {
              lineHeight: 30, //标题行高
              verticalAlign: 'top',
              //坐标轴名称的文字样式
              color: 'black', //坐标轴名称的颜色
            },
            axisLine: {
              symbol: ['none', 'arrow'], //加箭头处
              symbolOffset: [0, 13],
              lineStyle: {
                color: '#fff', //x轴线颜色
              },
            },
            axisLabel: {
              interval: 0, // 显示所有刻度
              textStyle: {
                //x轴字体颜色 动态
                color: function (value, index) {
                  return arr[index]
                },

                // color: '#999999', //x轴字体颜色
              },
              margin: 8,
              formatter: function (params) {
                // var val = ''
                // if (params.length > 4) {
                //   val = params.substr(0, 4) + '...'
                //   return val
                // } else {
                //   return params
                // }
                return params
              },
            },

            axisTick: {
              // show: true, //不显示x轴刻度线
              show: false, //不显示x轴刻度线
            },
            type: 'category',
            //  boundaryGap: false,
            data: this.data.xs,
            offset: -460,
          },
        ],
        yAxis: {
          z: 2,
          type: 'value',
          min: 0, // 最小刻度值
          max: 800, // 最大刻度值
          interval: 200, // 刻度间隔为10,
          axisLabel: {
            textStyle: {
              color: '#999999', //yy轴字体颜色
            },
          },
          // y轴
          axisLine: {
            show: true, //是否显示
            symbol: ['none', 'arrow'], //加箭头处
            symbolOffset: [0, 13],
            lineStyle: {
              color: '#c0c0c0', //y轴颜色
            },
          },

          // 分割线
          splitLine: {
            lineStyle: {
              type: 'dashed', //虚线
            },
            show: true, //隐藏
          },
        },
        series: [
          {
            name: '实时负荷',
            // z: 3,
            symbolSize: 8,
            // areaStyle: {},
            // data: [
            //   580, 540, 500, 460, 420, 380, 340, 300, 260, 220, 180, 140, 100,
            //   60,
            // ],
            data: this.data.dataList,
            // smooth: true, //圆滑过渡
            // showSymbol: false, //去掉折线上面小圆点
            type: 'line',
            lineStyle: {
              color: '#2F73F2', // 设置折线的颜色
            },
            // 警戒线
            markLine: {
              symbol: 'none', //去掉警戒线最后面的箭头
              silent: true, //去除鼠标悬停事件

              data: [
                // 要求调节速率
                {
                  z: 3,
                  silent: true, //鼠标悬停事件 true没有，false有
                  lineStyle: {
                    //警戒线的样式 ，虚实 颜色
                    type: 'dashed',
                    color: 'red',
                    // opacity: 0 //设置透明度  来控制显示与隐藏
                  },
                  label: {
                    position: 'end',
                    fontSize: '14',
                    // formatter:'要求调节速率百分比: 20%/min',
                    formatter: function () {
                      var val = '要求调节速率' + '\n'
                      val += `百分比: ${num2}%/min`
                      return val
                    },
                  },

                  // yAxis: 150, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
                  yAxis: this.data.Yspeedregulation, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
                },

                // 要求调节电量
                {
                  silent: true, //鼠标悬停事件 true没有，false有
                  lineStyle: {
                    //警戒线的样式 ，虚实 颜色
                    type: 'dashed',
                    color: '#74a0f3',
                    opacity: 1,
                  },
                  label: {
                    position: 'end',
                    fontSize: '14',
                    formatter: function () {
                      // var val = '要求调节电量:' + '\n'
                      var val = '要求调节电量: '
                      val += `${num1}万kW.h`
                      return val
                    },
                    // fontSize: '8',
                  },
                  // 这里要返还警戒线的索引  我才能根据索引去改变之前的蓝色
                  // xAxis: '16:45', // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
                  xAxis: this.data.Xquantityelectricity, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
                },
              ],
            },
          },
        ],
      }

      charts.setOption(option)
      
      // charts.on('mouseover', function (params) {
      //   // console.log('鼠标移入事件', params)
      //   option.series[0].data.forEach((item, index) => {
      //     if (params.value == item) {
      //       // console.log('相等'), console.log(item)
      //       // console.log(params.dataIndex)
      //       // console.log(params.name)
      //       // option.series[0].markArea.data[0][1].xAxis = params.name
      //       option.visualMap.pieces[0].lt = params.dataIndex
      //     }
      //     if (params.dataIndex >= Dindex) {
      //       // 蓝色
      //       option.visualMap.pieces[1].color = 'rgba(196, 220, 242, 1)'
      //     } else {
      //       // 绿色
      //       option.visualMap.pieces[1].color = 'rgba( 68, 186, 129, 0.3)'
      //     }
      //   })
      //   // console.log(option.series[0].markArea.data[0][1].xAxis)
      //   charts.setOption(option)
      //   // 鼠标移入事件处理函数
      // })

      window.addEventListener('resize', function () {
        charts.resize()
      })
    },
  },
}
</script>
<style scoped>
.box {
  width: 100%;
  background-color: #fff;
}
.f {
  position: relative;
}
.s {
  text-align: center;
  width: 160px;
  height: 30px;
  line-height: 30px;
  /* background-color: skyblue; */
  position: absolute;
  right: 85px;
  top: 0;
}
.s::before {
  content: ' ';
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: skyblue;
}
.d {
  text-align: center;
  width: 160px;
  height: 30px;
  line-height: 30px;
  /* background-color: skyblue; */
  position: absolute;
  right: 170px;
  top: 0;
}
.d::before {
  content: ' ';
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: greenyellow;
}
.g {
  text-align: center;
  width: 160px;
  height: 30px;
  line-height: 30px;
  /* background-color: skyblue; */
  position: absolute;
  right: 0;
  top: 0;
}
.g::before {
  content: ' ';
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: #ffd075;
}
</style>
