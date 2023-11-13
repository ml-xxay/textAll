.
<template>
  <div class="box">
    <!-- {{riqi}} -->
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <!-- <div ref="chart" style="width: 100%; height: 600px"></div> -->

    <div class="f">
      <!-- <div class="s">有效调节区间</div> -->
      <div ref="chart" style="width: 100%; height: 600px"></div>
    </div>
  </div>
</template>
<script>
//  import moment from "moment";
export default {
  name: 'foldlineall',
  components: {},
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      // data: {
      //   // x轴96个字段  这个和后端无关
      //   adjustPerformanceList: [
      //     '15:00',
      //     '15:15',
      //     '15:30',
      //     '15:45',
      //     '16:00',
      //     '16:15',
      //     '16:30',
      //     '16:45',
      //     '17:00',
      //     '17:15',
      //     '17:30',
      //     '17:45',
      //     '18:00',
      //   ],
      //   // 每个时间段的数据
      //   seriesdata: [
      //     700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639,
      //   ],
      //   // 测试开始  测试结束
      //   testTimeGroup: {
      //     start: '16:00', // 测试开始字段
      //     end: '17:45', // 测试结束字段
      //   },
      //   startupBoundary: 150, // 调节启动边界
      //   pTarget: 580, // p 达标
      //   pStandard: 620, // p 目标
      //   pUp: '650', // p 目标 上15%
      //   pend: '550', // p 目标 下15%
      //   // 持续时间警戒线
      //   markLinelist: ['16:15', '16:45', '17:00', '17:30'],
      //   // 持续时间的背景和阶段时间
      //   markArealist: [
      //     { x1: '16:15', x2: '16:45', time: '30' },
      //     { x1: '17:00', x2: '17:30', time: '50' },
      //   ],
      // up:150,  向上调节启动边界
      // end:620  向下调节启动边界
      // },
    }
  },
  mounted() {
    this.drawLine()
  },
  created() {},
  methods: {
    drawLine() {
      const echarts = require('echarts')
      const charts = echarts.init(this.$refs.chart)
      var maxy = Math.max(...this.data.seriesdata) * 1.5 //y轴最大值
      var option = {
        // 缩略图
        dataZoom: [
          {
            type: 'slider',
            moveHandleSize: 0,
            // handleStyle: {
            //   color: '#fff',
            // },
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
          right: '110',
          top: '5',
          data: [
            { name: '实时负荷', icon: '' },
            { name: '有效调节区间', icon: '' },
          ],
        },
        title: {
          text: '实时负荷单位 :  kW', //标题
          left: '20',
          textStyle: {
            color: '#999999',
            fontSize: '12',
          },
        },

        tooltip: {
          //提示框组件
          trigger: 'axis',
          formatter: '实时负荷: {c0} kW',
        },
        grid: {
          left: '5%',
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: '#c0c0c0', //x轴线颜色
            },
          },
          axisLabel: {
            textStyle: {
              color: '#999999', //x轴字体颜色
            },
          },

          axisTick: {
            show: false, //不显示x轴刻度线
          },
          type: 'category',
          data: this.data?.adjustPerformanceList,
        },
        yAxis: {
          z: 999,
          type: 'value',
          min: 0, // 最小刻度值
          max: maxy, // 最大刻度值
          interval: 200, // 刻度间隔为10,
          axisLabel: {
            textStyle: {
              color: '#999999', //yy轴字体颜色
            },
          },
          splitLine: {
            lineStyle: {
              type: 'dashed', //虚线
            },
            show: true, //隐藏
          },
        },
        series: [
          {
            name: '',
            data: this.data?.seriesdata,
            smooth: true, //圆滑过渡
            type: 'line',
            showSymbol: true, //去掉折线上面小圆点
            lineStyle: {
              color: '#2F73F2', // 设置折线的颜色
            },
            // 警戒线
            markLine: {
              symbol: 'none', //去掉警戒线最后面的箭头
              silent: true,
              data: [
                // 调节启动边界    向上
                {
                  silent: false, //鼠标悬停事件 true没有，false有
                  lineStyle: {
                    //警戒线的样式 ，虚实 颜色
                    type: 'dashed',
                    width: 2,
                    color: '#F2A32F',
                    opacity: 1, //设置透明度  来控制显示与隐藏
                  },
                  label: {
                    position: 'end',
                    formatter: '向上调节启动边界',
                  },

                  // yAxis: 150, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
                  yAxis: this.data?.up ?? '',
                },

                // 调节启动边界 向下
                {
                  silent: false, //鼠标悬停事件 true没有，false有
                  lineStyle: {
                    //警戒线的样式 ，虚实 颜色
                    type: 'dashed',
                    width: 2,
                    color: '#F2A32F',
                    opacity: 1,
                  },
                  label: {
                    position: 'end',
                    formatter: '向下调节启动边界',
                    // fontSize: '8',
                  },
                  // yAxis: 620, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
                  yAxis: this.data?.end ?? '',
                },
              ],
            },
            // y轴加背景 x轴加背景
            markArea: {
              //设置具体区域的背景颜色，选择不同区间 设置图表对应的背景颜色
              silent: true,

              data: [],
            },
          },
        ],
      }

      charts.setOption(option)
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
  width: 120px;
  height: 30px;
  line-height: 30px;
  /* background-color: skyblue; */
  position: absolute;
  right: 0;
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
</style>
