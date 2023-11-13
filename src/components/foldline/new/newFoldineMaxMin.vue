<template>
  <div class="box">
    <div class="f">
      <div class="s">最大负荷测试时段</div>
      <div class="d">最小负荷测试时段</div>
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
      //   maxAdjustLoadList: [
      //     700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639,
      //   ],
      //   Xmax: '15:30', // x轴 最大负荷竖线所对应的时刻
      //   Xmin: '17:15', // x轴 最小负荷竖线所对应的时刻
      //   maxInterval: { start: '15:15', end: '16:15' }, //x轴 最大负荷 '背景' 两端边缘所对应的时刻
      //   minInterval: { start: '17:00', end: '18:00' }, //x轴 最小负荷 '背景' 两端边缘所对应的时刻
      //   maxIntervalAll: ['15:15', '15:30', '15:45', '16:00', '16:15'], //x轴 最大负荷 '背景' 区间所对应的所有时刻
      //   minIntervalAll: ['17:00', '17:15', '17:30', '17:45', '18:00'], //x轴 最小负荷 '背景' 区间所对应的所有时刻
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
      var maxy = Math.max(...this.data.maxAdjustLoadList) * 1.5 //y轴最大值

      var option = {
        // 缩略图
        dataZoom: [
          {
            type: 'slider',
            moveHandleSize: 0,
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
            startValue: 534,
            endValue: 700,
            // start: 0,
            // end: 100,
            height: '20',
          },
        ],
        legend: {
          right: '330',
          top: '5',
          data: [
            { name: '实时负荷', icon: '' },
            // { name: '最小负荷测试时段', icon: '' },
            // { name: '最大负荷测试时段', icon: '' },
          ],
        },
        title: {
          text: '单位 :  kW', //标题
          left: '20',
          textStyle: {
            color: '#999999',
            fontSize: '12',
          },
        },

        tooltip: {
          //提示框组件
          trigger: 'axis',
          formatter: '负荷: {c0} kW',
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
          // data: xs,
          data: this.data?.adjustPerformanceList ?? [],
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
            name: '实时负荷',
            // data: [700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639],
            data: this.data?.maxAdjustLoadList ?? [],
            smooth: true, //圆滑过渡
            type: 'line',
            // showSymbol: false, //去掉折线上面小圆点
            lineStyle: {
              color: '#2F73F2', // 设置折线的颜色
            },

            // y轴加背景 x轴加背景
            markArea: {
              //设置具体区域的背景颜色，选择不同区间 设置图表对应的背景颜色
              silent: true,
              label: {
                show: true,
                position: 'inside',
              },
              data: [
                // x轴 上调
                [
                  {
                    name: '最大负荷测试时段',
                    // xAxis: '15:15',
                    xAxis: this.data?.maxInterval?.start ?? '',
                    itemStyle: {
                      opacity: 1,
                      color: '#f4f7ff',

                      // color: 'none',
                    },
                    label: {
                      show: true,
                      color: '#5aabff',
                      fontSize: 14,
                      zIndex: 10,
                      position: 'inside',
                    },
                  },
                  {
                    // xAxis: '16:15',
                    xAxis: this.data?.maxInterval?.end ?? '',
                  },
                ],

                [
                  {
                    name: '最小负荷测试时段',
                    // xAxis: '17:00',
                    xAxis: this.data?.minInterval?.start ?? '',
                    itemStyle: {
                      opacity: 1,
                      color: '#f6fff0',
                      // color: 'none',
                    },
                    label: {
                      show: true,
                      color: 'green',
                      // color: '#5aabff',
                      fontSize: 14,
                      zIndex: 99999,
                      position: 'inside',
                    },
                  },
                  {
                    // xAxis: '18:00',
                    xAxis: this.data?.minInterval?.end ?? '',
                  },
                ],
              ],
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
  width: 160px;
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
.d {
  text-align: center;
  width: 160px;
  height: 30px;
  line-height: 30px;
  /* background-color: skyblue; */
  position: absolute;
  right: 160px;
  top: 0;
}
.d::before {
  content: ' ';
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: #cdfdb4;
}
</style>
