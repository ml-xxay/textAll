<template>
  <div class="box">
    <!-- {{riqi}} -->
    <!-- 新版原型 双x轴 -->
    <!-- <twoxFoldlineVue :data="newdata"></twoxFoldlineVue> -->
    <twoxFoldlinecopy :data="newdata"></twoxFoldlinecopy>
    <!-- <y></y> -->

    <!-- 新版 持续时间计算开始  持续时间计算结束-->
    <foldlineAllCxVue :data="newdata5"></foldlineAllCxVue>

    <!-- 新版 最大最小负荷  旧版是带放大缩小的-->
    <newFoldineMaxMinVue :data="newdata3"></newFoldineMaxMinVue>

    <!-- 调节性能测试  初始页面   上下调节启动边界线 的图 -->
    <newUpEndVue :data="newdata5"></newUpEndVue>

    <!-- 调节性能测试  测试正式开始 -->
    <newUpEndStartVue :data="newdata5"></newUpEndStartVue>

    <!-- 旧版 -->
    <!-- 三色 -->
    <!-- <foldlinethree-bgc :data="data"></foldlinethree-bgc> -->
    <!-- <div ref="chart" style="width: 100%; height: 600px"></div> -->

    <!-- 持续时间的 -->
    <!-- <foldlineall :data="data1"></foldlineall> -->
    <!-- <div class="f">
            <div class="s">有效调节区间</div>
            <div ref="chart" style="width: 100%; height: 600px"></div>
         </div> -->

    <!-- <foldline-max-min :data="data3"></foldline-max-min> -->
    <!-- <foldline-max-min-amplify
      :data="data4"
      :max="true"
    ></foldline-max-min-amplify> -->
    <div ref="chart" class="radar" style="width: 100%; height: 600px"></div>
  </div>
</template>
<script>
//  import moment from "moment";
import Foldlineall from '../components/foldline/foldlineAll.vue' //持续时间折线图
import FoldlinethreeBgc from '../components/foldline/foldlinethreeBgc.vue' //三色
import FoldlineMaxMin from '../components/foldline/foldlineMaxMin.vue' //最大最小
import FoldlineMaxMinAmplify from '../components/foldline/foldlineMaxMinAmplify.vue'

import twoxFoldlineVue from '../components/foldline/new/twoxFoldline.vue' // 新版三色
import twoxFoldlinecopy from '../components/foldline/new/twoxFoldlinecopy.vue' // 新版三色
import foldlineAllCxVue from '../components/foldline/new/newfoldlineAllCxsj.vue' //新版持续时间计算开始与计算结束
import newFoldineMaxMinVue from '../components/foldline/new/newFoldineMaxMin.vue' //最大最小负荷测试时段
import newUpEndVue from '../components/foldline/new/newUpEnd.vue' //调节性能测试开始
import newUpEndStartVue from '../components/foldline/new/newUpEndStart.vue' //调节性能测试进行

import y from './y.vue' //调节性能测试进行

export default {
  name: 'Date',
  components: {
    Foldlineall,
    FoldlinethreeBgc,
    FoldlineMaxMin,
    FoldlineMaxMinAmplify,

    twoxFoldlineVue,
    twoxFoldlinecopy,
    foldlineAllCxVue,
    newFoldineMaxMinVue,
    newUpEndVue,
    newUpEndStartVue,
    y,
  },
  props: {},
  data() {
    return {
      yxdate: [
        [0.8, 580],
        [1.7, 540],
        [2.5, 500],
        [3.7, 460],
        [6.7, 420],
        [7.4, 380],
        [10.7, 340],
        [11.3, 260],
        [11.8, 220],
        [12.6, 180],
        [13.2, 140],
        [15.3, 100],
        [18.3, 60],
      ],
      riqi: '',
      // 新版
      // 双x
      newdata: {
        // x轴各个电厂用户公司名
        xs: [
          '武汉公司',
          '南京公司',
          '上海公司',
          '深圳公司',
          '苏州公司',
          '广东公司',
          '郑州公司',
          '安徽公司',
          '合肥公司',
          '淮南公司',
          '怀远公司',
          '蒙城公司',
          '宿州公司',
        ],
        // 第一个参数计算出来的公司之和  第二个参数 每个y点的数据
        yxdates: [
          [0.8, 580],
          [1.7, 540],
          [2.5, 500],
          [3.7, 460],
          [6.7, 420],
          [7.4, 380],
          [10.7, 340],
          [11.3, 260],
          [11.8, 220],
          [12.6, 180],
          [13.2, 140],
          [15.3, 100],
          [18.3, 60],
        ],
        arr: [],
        // y轴数据调节速率
        dataList: [
          580, 540, 500, 460, 420, 380, 340, 300, 260, 220, 180, 140, 100, 60,
        ],
        // 警戒线  要求调节速率百分比  调节电量10万KW.h
        // Yspeedregulation: 150,//要求调节速率 y的值
        Xquantityelectricity: '6.7', //要求调节电量警戒线对应x
        // XquantityelectricityDL: 20,//要求调节电量数值
        baifenbi: '20', //要求调节速率百分比数值
        Xindex: 7, //调节电量10万KW.h 索引
        Highquality: { start: 0, end: 7 }, //优质用户开始结束索引
        Compliance: { start: 7, end: 10 }, //达标用户开始结束索引
        NoCompliance: { start: 10, end: 12 }, //不达标用户开始结束索引
        zongshuA: ['100', '200', '300', '400'], //调节速率百分比平均值
        zongshuB: ['0.8', '1.7', '2.5', '3.7'], //调节电量之和
        // x轴每个公司所对应的颜色
        xFontcolor: [
          'green',
          'green',
          'green',
          'green',
          '#668bd1',
          '#668bd1',
          '#668bd1',
          '#668bd1',
          '#668bd1',
          '#f2c581',
          '#f2c581',
          '#f2c581',
        ],
      },
      // 持续时间
      newdata1: {
        // x轴96个字段  这个和后端无关   现在由后端返还
        adjustPerformanceList: [
          '15:00',
          '15:15',
          '15:30',
          '15:45',
          '16:00',
          '16:15',
          '16:30',
          '16:45',
          '17:00',
          '17:15',
          '17:30',
          '17:45',
          '18:00',
        ],
        // 每个时间段的数据
        seriesdata: [
          700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639,
        ],
        // 测试开始  测试结束
        testTimeGroup: {
          start: '16:00', // 测试开始字段
          end: '17:45', // 测试结束字段
        },
        startupBoundary: 150, // 调节启动边界
        pTarget: 580, // p 达标
        pStandard: 620, // p 目标
        pUp: '650', // p 目标 上15%
        pend: '550', // p 目标 下15%
        // 持续时间警戒线
        markLinelist: ['16:15', '16:45', '17:00', '17:30'],
        // 持续时间的背景和阶段时间
        markArealist: [
          { x1: '16:15', x2: '16:45', time: '30' },
          { x1: '17:00', x2: '17:30', time: '50' },
        ],
      },
      // 最大最小负荷
      newdata3: {
        adjustPerformanceList: [
          '15:00',
          '15:15',
          '15:30',
          '15:45',
          '16:00',
          '16:15',
          '16:30',
          '16:45',
          '17:00',
          '17:15',
          '17:30',
          '17:45',
          '18:00',
        ],
        maxAdjustLoadList: [
          700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639,
        ],
        Xmax: '15:30', // x轴 最大负荷竖线所对应的时刻
        Xmin: '17:15', // x轴 最小负荷竖线所对应的时刻
        maxInterval: { start: '15:15', end: '16:15' }, //x轴 最大负荷 '背景' 两端边缘所对应的时刻
        minInterval: { start: '17:00', end: '18:00' }, //x轴 最小负荷 '背景' 两端边缘所对应的时刻
        maxIntervalAll: ['15:15', '15:30', '15:45', '16:00', '16:15'], //x轴 最大负荷 '背景' 区间所对应的所有时刻
        minIntervalAll: ['17:00', '17:15', '17:30', '17:45', '18:00'], //x轴 最小负荷 '背景' 区间所对应的所有时刻
        maxIntervalList: [639, 534, 639, 700, 534], //最大负荷背景区间 y 所有数据
        minIntervalList: [639, 534, 639, 534, 639], //最小负荷背景区间 y 所有数据
      },
      // 向上向下 调节启动边界   这个是复制 newdata1 的数据
      newdata4: {
        // x轴96个字段  这个和后端无关   现在由后端返还
        adjustPerformanceList: [
          '15:00',
          '15:15',
          '15:30',
          '15:45',
          '16:00',
          '16:15',
          '16:30',
          '16:45',
          '17:00',
          '17:15',
          '17:30',
          '17:45',
          '18:00',
        ],
        // 每个时间段的数据
        seriesdata: [
          700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639,
        ],
        // 测试开始  测试结束
        testTimeGroup: {
          start: '16:00', // 测试开始字段
          end: '17:45', // 测试结束字段
        },
        startupBoundary: 150, // 调节启动边界 向上
        startendBoundary: 700, // 调节启动边界 向下
        pTarget: 580, // p 达标
        pStandard: 620, // p 目标
        instruct: '15:30', //指令下发
        pUp: '650', // p 目标 上15%
        pend: '550', // p 目标 下15%
        // 持续时间警戒线
        markLinelist: ['16:15', '16:45', '17:00', '17:30'],
        // 持续时间的背景和阶段时间
        markArealist: [
          { x1: '16:15', x2: '16:45', time: '30' },
          { x1: '17:00', x2: '17:30', time: '50' },
        ],
        up: 150, //向上调节启动边界
        end: 620, //向下调节启动边界
      },

      // 向上向下测试开始
      newdata5: {
        // x轴96个字段  这个和后端无关   现在由后端返还
        adjustPerformanceList: [
          '15:00',
          '15:15',
          '15:30',
          '15:45',
          '16:00',
          '16:15',
          '16:30',
          '16:45',
          '17:00',
          '17:15',
          '17:30',
          '17:45',
          '18:00',
        ],
        // 每个时间段的数据
        seriesdata: [
          700, 639, 534, 639, 700, 400, 520, 534, 600, 534, 639, 534, 639,
        ],
        // 测试开始  测试结束
        testTimeGroup: {
          start: '16:00', // 测试开始字段
          end: '17:45', // 测试结束字段
        },
        startupBoundary: 30000, // 调节启动边界 向上         
        // startupBoundary: 150, // 调节启动边界 向上
        startendBoundary: 700, // 调节启动边界 向下
        pTarget: 580, // p 达标
        pStandard: 620, // p 目标
        instruct: '15:30', //指令下发
        responseFail: '16:00',
        adjust: '15:45', //调节达标
        over: '17:15', //测试结束
        pUp: '650', // p 目标 上15%
        pend: '550', // p 目标 下15%
        // 持续时间警戒线
        markLinelist: ['16:15', '16:45', '17:00', '17:30'],
        // 持续时间的背景和阶段时间
        markArealist: [
          { x1: '16:15', x2: '16:45', time: '30' },
          { x1: '17:00', x2: '17:30', time: '50' },
        ],
        up: 150, //向上调节启动边界
        end: 620, //向下调节启动边界
      },

      // 旧版
      // 三色
      data: {
        // x轴各个电厂用户公司名
        xs: [
          '武汉公司',
          '南京公司超出',
          '上海公司',
          '深圳公司',
          '苏州公司',
          '广东公司',
          '郑州公司',
          '安徽公司',
          '合肥公司',
          '淮南公司',
          '怀远公司',
          '蒙城公司',
          '宿州公司',
        ],
        // y轴数据
        dataList: [
          580, 540, 500, 460, 420, 380, 340, 300, 260, 220, 180, 140, 100, 60,
        ],
        // 警戒线  要求调节速率百分比  调节电量10万KW.h
        Yspeedregulation: 180,
        Xquantityelectricity: '安徽公司',

        XquantityelectricityDL: 50, //调节电量警戒线值
        baifenbi: '30', //警戒线百分比值

        Xindex: 7, //调节电量10万KW.h 索引
        Highquality: { start: 0, end: 7 }, //优质用户开始结束索引
        Compliance: { start: 7, end: 10 }, //达标用户开始结束索引
        NoCompliance: { start: 10, end: 12 }, //不达标用户开始结束索引

        zongshuA: ['100', '200', '300', '400'],
        zongshuB: ['3.7', '4.6', '5.3', '6.2'],
      },
      // 持续时间
      data1: {
        // x轴96个字段  这个和后端无关
        adjustPerformanceList: [
          '15:00',
          '15:15',
          '15:30',
          '15:45',
          '16:00',
          '16:15',
          '16:30',
          '16:45',
          '17:00',
          '17:15',
          '17:30',
          '17:45',
          '18:00',
        ],
        // 每个时间段的数据
        seriesdata: [
          700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639,
        ],
        // 测试开始  测试结束
        testTimeGroup: {
          start: '16:00', // 测试开始字段
          end: '17:45', // 测试结束字段
        },
        startupBoundary: 150, // 调节启动边界
        pTarget: 580, // p 达标
        pStandard: 620, // p 目标
        pUp: '650', // p 目标 上15%
        pend: '550', // p 目标 下15%
        // 持续时间警戒线
        markLinelist: ['16:15', '16:45', '17:00', '17:30'],
        // 持续时间的背景和阶段时间
        markArealist: [
          { x1: '16:15', x2: '16:45', time: '30' },
          { x1: '17:00', x2: '17:30', time: '50' },
        ],
      },
      // 最大最小负荷
      data3: {
        maxAdjustLoadList: [
          700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639,
        ],
        Xmax: '15:30', // x轴 最大负荷竖线所对应的时刻
        Xmin: '17:15', // x轴 最小负荷竖线所对应的时刻
        maxInterval: { start: '15:15', end: '16:15' }, //x轴 最大负荷 '背景' 两端边缘所对应的时刻
        minInterval: { start: '17:00', end: '18:00' }, //x轴 最小负荷 '背景' 两端边缘所对应的时刻
        maxIntervalAll: ['15:15', '15:30', '15:45', '16:00', '16:15'], //x轴 最大负荷 '背景' 区间所对应的所有时刻
        minIntervalAll: ['17:00', '17:15', '17:30', '17:45', '18:00'], //x轴 最小负荷 '背景' 区间所对应的所有时刻
        maxIntervalList: [639, 534, 639, 700, 534], //最大负荷背景区间 y 所有数据
        minIntervalList: [639, 534, 639, 534, 639], //最小负荷背景区间 y 所有数据
      },
      // 放大
      data4: {
        // y轴所有数据
        maxAdjustLoadList: [
          700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639,
        ],
        Xmax: '15:30', // x轴 最大负荷竖线所对应的时刻
        Xmin: '17:15', // x轴 最小负荷竖线所对应的时刻
        maxInterval: { start: '15:15', end: '16:15' }, //x轴 最大负荷 '背景' 两端边缘所对应的时刻
        minInterval: { start: '17:00', end: '18:00' }, //x轴 最小负荷 '背景' 两端边缘所对应的时刻
        maxIntervalAll: ['15:15', '15:30', '15:45', '16:00', '16:15'], //x轴 最大负荷 '背景' 区间所对应的所有时刻
        minIntervalAll: ['17:00', '17:15', '17:30', '17:45', '18:00'], //x轴 最小负荷 '背景' 区间所对应的所有时刻
        maxIntervalList: [639, 534, 639, 700, 534], //最大负荷背景区间 y 所有数据
        minIntervalList: [639, 534, 639, 534, 639], //最小负荷背景区间 y 所有数据
      },
      
    }
  },

  mounted() {
    // this.drawLine()
    /*窗口自适应，关键代码*/
    // window.onresize = () => {
    //   this.$refs.chart.resize();
    // };
    // window.addEventListener('resize', function () {
    //   this.$refs.chart.resize()
    // })
    // 获取 当前年月日 时分秒  a时当前的 上午,下午,晚上   根据时间来的
    // this.riqi = moment().format("YYYY年MM月DD日 HH时mm分ss秒 a")
    this.text()
  },
  created() {
    var gsarr = []
    gsarr.push(this.yxdate[0][0] / 2)

    this.yxdate.forEach((item, index) => {
      if (this.yxdate.length - 1 == index) return
      let resulut = (item[0] + this.yxdate[index + 1][0]) / 2
      gsarr.push(resulut)
      // console.log((item[0] +  this.yxdate[index+1][0]) / 2);
    })
    this.newdata.arr = gsarr
    console.log(gsarr, 'gsarr')
  },
  //注销window.onresize事件
  destroyed() {
    // window.onresize = null
  },
  methods: {
    text(){
      const echarts = require('echarts')
      const charts = echarts.init(this.$refs.chart)
      let option = {
        backgroundColor: '#FFF',
        tooltip: {
          // formatter: function(params) {
          //   console.log(params,'------------');
          //   // params 是包含当前数据信息的对象
          //   return `分数：${params.value}`
          // },
          
        },
        // tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: '#999999'
            }
          },
          splitArea: {
            areaStyle: {
              color: ['#fff', '#fff', '#fff', '#fff'],
              shadowColor: 'rgba(0, 100, 0, 0.3)'
            }
          },
          indicator: [
            { name: 'A', max: 10 },
            { name: 'B', max: 10 },
            { name: 'Cddddd', max: 10 },
            { name: 'Ddddd', max: 10 },
            { name: 'E', max: 10 },
            { name: 'F', max: 10 },
            { name: 'G', max: 10 },
            { name: 'H', max: 10 },
            { name: 'I', max: 10 },
            { name: 'K', max: 10 }
          ]
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
                name:'总览',
                itemStyle: {
                  normal: {
                    color: 'rgba(5, 128, 242, 0.5)'
                  }
                },
                areaStyle: {
                  normal: {
                    color: '#37A2DA'
                  }
                }
              }
            ]
          }
        ]
      }
      charts.setOption(option)
    },
    drawLine() {
      const echarts = require('echarts')
      const charts = echarts.init(this.$refs.chart)

      // 持续时间的
      // let xs = [
      //   '15:00',
      //   '15:15',
      //   '15:30',
      //   '15:45',
      //   '16:00',
      //   '16:15',
      //   '16:30',
      //   '16:45',
      //   '17:00',
      //   '17:15',
      //   '17:30',
      //   '17:45',
      //   '18:00',
      // ]
      // var option = {
      //   // 缩略图
      //   dataZoom: [
      //     {
      //       type: 'slider',
      //       moveHandleSize: 0,
      //       handleStyle: {
      //         color: '#fff',
      //       },
      //       dataBackground: {
      //         //数据阴影的样式。
      //         color: '#fff',
      //         lineStyle: {
      //           color: '#D3D3D3',
      //         }, //阴影的线条样式
      //       },
      //       selectedDataBackground: {
      //         //选中部分数据阴影的样式
      //         lineStyle: {
      //           color: '#2F73F2',
      //         }, //选中部分阴影的线条样式
      //       },

      //       textStyle: {
      //         color: '#2F73F2',
      //       },
      //       handleStyle: {
      //         color: '#2F73F2',
      //         height: '20',
      //       },
      //       start: 60,

      //       end: 100,
      //       height: '20',
      //     },
      //   ],
      //   legend: {
      //     right: '20',
      //     data: [
      //       { name: '实时负荷', icon: '' },
      //       { name: '有效调节区间', icon: '' },
      //     ],
      //   },
      //   title: {
      //     text: '单位 :  kW', //标题
      //     left: '20',
      //     textStyle: {
      //       color: '#999999',
      //       fontSize: '12',
      //     },
      //   },

      //   tooltip: {
      //     //提示框组件
      //     trigger: 'axis',
      //     formatter: '基线负荷: {c0} kW',
      //   },
      //   grid: {
      //     left: '5%',
      //   },
      //   xAxis: {
      //     axisLine: {
      //       lineStyle: {
      //         color: '#c0c0c0', //x轴线颜色
      //       },
      //     },
      //     axisLabel: {
      //       textStyle: {
      //         color: '#999999', //x轴字体颜色
      //       },
      //     },

      //     axisTick: {
      //       show: false, //不显示x轴刻度线
      //     },
      //     type: 'category',
      //     data: xs,
      //   },
      //   yAxis: {
      //     z: 999,
      //     type: 'value',
      //     min: 0, // 最小刻度值
      //     max: 800, // 最大刻度值
      //     interval: 200, // 刻度间隔为10,
      //     axisLabel: {
      //       textStyle: {
      //         color: '#999999', //yy轴字体颜色
      //       },
      //     },
      //     splitLine: {
      //       lineStyle: {
      //         type: 'dashed', //虚线
      //       },
      //       show: true, //隐藏
      //     },
      //     //y轴加背景
      //     // splitArea: {
      //     //   show: true,
      //     //   areaStyle: {
      //     //     yAxis: '800',
      //     //     color: ['rgba(123,19,19,0.3)']
      //     //   }
      //     // }
      //   },
      //   series: [
      //     {
      //       name: '实时负荷',
      //       data: [
      //         700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639,
      //       ],
      //       smooth: true, //圆滑过渡
      //       type: 'line',
      //       showSymbol: false, //去掉折线上面小圆点
      //       lineStyle: {
      //         color: '#2F73F2', // 设置折线的颜色
      //       },
      //       // 警戒线
      //       markLine: {
      //         symbol: 'none', //去掉警戒线最后面的箭头

      //         data: [
      //           // 调节边界
      //           {
      //             silent: false, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: 'red',
      //               opacity: 0, //设置透明度  来控制显示与隐藏
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: '调节启动边界',
      //             },

      //             yAxis: 150, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           // p达标
      //           {
      //             silent: false, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#00BB6D',
      //               opacity: 0,
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: 'P 达标',
      //               // fontSize: '8',
      //             },
      //             yAxis: 580, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           // p目标
      //           {
      //             silent: false, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#F2A32F',
      //               opacity: 0,
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: 'P 目标',
      //               // fontSize: '8',
      //             },
      //             yAxis: 620, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           //测试开始结束
      //           {
      //             silent: true, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#74a0f3',
      //               opacity: 1,
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: '测试开始',
      //               // fontSize: '8',
      //             },
      //             xAxis: '16:45', // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           {
      //             silent: true, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#74a0f3',
      //               opacity: 1,
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: '测试结束',
      //               // fontSize: '8',
      //             },
      //             xAxis: '17:45', // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           // 持续时间计算开始和结束
      //           {
      //             silent: true, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#74a0f3',
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: function () {
      //                 var val = '持续时间' + '\n'
      //                 val += '计算开始'
      //                 return val
      //               },
      //               // fontSize: '8',
      //             },
      //             xAxis: '17:00', // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           {
      //             silent: true, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#74a0f3',
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: '持续时间计算结束',
      //               formatter: function () {
      //                 var val = '持续时间' + '\n'
      //                 val += '计算结束'
      //                 return val
      //               },
      //               // fontSize: '8',
      //             },
      //             xAxis: '17:30', // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //         ],
      //       },
      //       // y轴加背景 x轴加背景
      //       markArea: {
      //         //设置具体区域的背景颜色，选择不同区间 设置图表对应的背景颜色
      //         silent: true,

      //         data: [
      //           // y轴颜色填充p目标上下百分之15%
      //           [
      //             {
      //               yAxis: '650',
      //               itemStyle: {
      //                 color: '#f1f1fe',
      //                 opacity: 1,
      //               },
      //             },
      //             {
      //               yAxis: '550',
      //               itemStyle: {
      //                 color: '#f1f1fe',
      //                 opacity: 1,
      //               },
      //             },
      //           ],
      //           // x轴 持续时间背景+文字
      //           [
      //             {
      //               name: '持续时间 30min',
      //               xAxis: '17:00',
      //               itemStyle: {
      //                 color: '#f4f7ff',
      //                 opacity: 0.1,
      //                 color: '#FFAA00',
      //                 color: 'none',
      //               },
      //               label: {
      //                 show: true,
      //                 color: '#5aabff',
      //                 fontSize: 14,
      //                 zIndex: 10,
      //                 position: 'inside',
      //               },
      //             },
      //             {
      //               xAxis: '17:30',
      //             },
      //           ],
      //         ],
      //       },
      //     },
      //     {
      //       name: '实时负荷',
      //       data: [
      //         700, 639, 534, 639, 700, 534, 520, 534, 639, 534, 639, 534, 639,
      //       ],
      //       smooth: true, //圆滑过渡
      //       type: 'line',
      //       showSymbol: false, //去掉折线上面小圆点
      //       lineStyle: {
      //         color: '#2F73F2', // 设置折线的颜色
      //       },
      //       // 警戒线
      //       markLine: {
      //         symbol: 'none', //去掉警戒线最后面的箭头

      //         data: [
      //           // 调节边界
      //           {
      //             silent: false, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: 'red',
      //               opacity: 0, //设置透明度  来控制显示与隐藏
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: '调节启动边界',
      //             },

      //             yAxis: 150, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           // p达标
      //           {
      //             silent: false, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#00BB6D',
      //               opacity: 0,
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: 'P 达标',
      //               // fontSize: '8',
      //             },
      //             yAxis: 580, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           // p目标
      //           {
      //             silent: false, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#F2A32F',
      //               opacity: 0,
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: 'P 目标',
      //               // fontSize: '8',
      //             },
      //             yAxis: 620, // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           //测试开始结束
      //           {
      //             silent: true, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#74a0f3',
      //               opacity: 1,
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: '测试开始',
      //               // fontSize: '8',
      //             },
      //             xAxis: '16:45', // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           {
      //             silent: true, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#74a0f3',
      //               opacity: 1,
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: '测试结束',
      //               // fontSize: '8',
      //             },
      //             xAxis: '17:45', // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           // 持续时间计算开始和结束
      //           {
      //             silent: true, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#74a0f3',
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: function () {
      //                 var val = '持续时间' + '\n'
      //                 val += '计算开始'
      //                 return val
      //               },
      //               // fontSize: '8',
      //             },
      //             xAxis: '17:00', // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //           {
      //             silent: true, //鼠标悬停事件 true没有，false有
      //             lineStyle: {
      //               //警戒线的样式 ，虚实 颜色
      //               type: 'dashed',
      //               color: '#74a0f3',
      //             },
      //             label: {
      //               position: 'end',
      //               formatter: '持续时间计算结束',
      //               formatter: function () {
      //                 var val = '持续时间' + '\n'
      //                 val += '计算结束'
      //                 return val
      //               },
      //               // fontSize: '8',
      //             },
      //             xAxis: '17:30', // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
      //           },
      //         ],
      //       },
      //       // y轴加背景 x轴加背景
      //       markArea: {
      //         //设置具体区域的背景颜色，选择不同区间 设置图表对应的背景颜色
      //         silent: true,

      //         data: [
      //           // y轴颜色填充p目标上下百分之15%
      //           [
      //             {
      //               yAxis: '650',
      //               itemStyle: {
      //                 color: '#f1f1fe',
      //                 opacity: 1,
      //               },
      //             },
      //             {
      //               yAxis: '550',
      //               itemStyle: {
      //                 color: '#f1f1fe',
      //                 opacity: 1,
      //               },
      //             },
      //           ],
      //           // x轴 持续时间背景+文字
      //           [
      //             {
      //               name: '持续时间 30min',
      //               xAxis: '17:00',
      //               itemStyle: {
      //                 color: '#f4f7ff',
      //                 opacity: 0.1,
      //                 color: '#FFAA00',
      //                 // color: 'none',
      //               },
      //               label: {
      //                 show: true,
      //                 color: '#5aabff',
      //                 fontSize: 14,
      //                 zIndex: 10,
      //                 position: 'inside',
      //               },
      //             },
      //             {
      //               xAxis: '17:30',
      //             },
      //           ],
      //         ],
      //       },
      //     },
      //   ],
      // }

      // 三色
      // let xs = [
      //   '15:00',
      //   '15:15',
      //   '15:30',
      //   '15:45',
      //   '16:00',
      //   '16:15',
      //   '16:30',
      //   '16:45',
      //   '17:00',
      //   '17:15',
      //   '17:30',
      //   '17:45',
      //   '18:00',
      // ]
      // console.log(this.data.zongshu,'----------')

      // 三色的
      var listA = this.data.zongshuA
      var listB = this.data.zongshuB
      var Dindex = this.data.Xindex
      var num1 = this.data.XquantityelectricityDL
      var num2 = this.data.baifenbi
      var option = {
        visualMap: {
          // formatter: function (value) {
          //   //标签的格式化工具。
          //   return '你好' + value
          // },
          z: 999,
          type: 'piecewise',
          show: true,
          dimension: 0,
          seriesIndex: 0,
          // text: ['nihao', 'Low'], //两端的文本
          right: '0%',
          top: '0% ',
          orient: 'horizontal',
          pieces: [
            {
              label: '计算',
              gt: 0,
              lt: 0,
              color: 'rgba(196, 220, 242, 1)',
            },
            // 绿色  优质用户
            {
              label: '优质用户',
              // value: 1,
              // gt: 0,
              // lt: 7,
              gt: this.data.Highquality.start,
              lt: this.data.Highquality.end,
              color: 'rgba( 68, 186, 129, 0.3)',
            },
            // 黄色  达标用户
            {
              label: '达标用户',
              // value: 3,
              // gt: 7,
              // lt: 10,
              gt: this.data.Compliance.start,
              lt: this.data.Compliance.end,
              color: 'rgba( 255, 242, 217, 1)',
            },
            // 最右侧粉红色 不达标用户
            {
              label: '不达标用户',
              // value: 2,
              // gt: 10,
              // lt: 12,
              gt: this.data.NoCompliance.start,
              lt: this.data.NoCompliance.end,
              color: 'rgba(255, 203, 203, 1)',
            },
          ],
        },
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
          right: '30%',
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
            console.log(value, '----------')
            // console.log(list,'-----------')
            var val = `${value[0].name}` + '\n' + '<br/>'
            val +=
              `调节速率百分比:${listA[value[0].dataIndex]}` + '\n' + '<br/>'
            val += `调节电量: ${listB[value[0].dataIndex]}万kW.h`
            return val
          },
        },
        grid: {
          left: '5%',
          // right:'3%',
          // containLabel: true
        },
        xAxis: {
          name: '调节电量',
          scale: true,
          triggerEvent: true,
          z: 2,
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: 'black', //坐标轴名称的颜色
          },
          axisLine: {
            lineStyle: {
              color: '#c0c0c0', //x轴线颜色
            },
          },
          axisLabel: {
            interval: 0, // 显示所有刻度
            textStyle: {
              color: '#999999', //x轴字体颜色
            },
            margin: 8,
            formatter: function (params) {
              var val = ''
              if (params.length > 4) {
                val = params.substr(0, 4) + '...'
                return val
              } else {
                return params
              }
            },
          },

          axisTick: {
            show: true, //不显示x轴刻度线
          },
          type: 'category',
          data: this.data.xs,
        },
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
            areaStyle: {},
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

                // 调节电量
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
                      var val = '调节电量:' + '\n'
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
      charts.on('mouseover', function (params) {
        // console.log('鼠标移入事件', params)
        option.series[0].data.forEach((item, index) => {
          if (params.value == item) {
            // console.log('相等'), console.log(item)
            // console.log(params.dataIndex)
            // console.log(params.name)
            // option.series[0].markArea.data[0][1].xAxis = params.name
            option.visualMap.pieces[0].lt = params.dataIndex
          }
          if (params.dataIndex >= Dindex) {
            // 蓝色
            option.visualMap.pieces[1].color = 'rgba(196, 220, 242, 1)'
          } else {
            // 绿色
            option.visualMap.pieces[1].color = 'rgba( 68, 186, 129, 0.3)'
          }
        })
        // console.log(option.series[0].markArea.data[0][1].xAxis)
        charts.setOption(option)
        // 鼠标移入事件处理函数
      })

      window.addEventListener('resize', function () {
        charts.resize()
      })
      // charts.on('mouseout', function (params) {
      //   console.log('鼠标移出事件：', params)
      //   setTimeout(() => {
      //     option.series[0].markArea.data[0][1].xAxis = ''
      //     charts.setOption(option)
      //   },5000)
      // })
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
  width: 100px;
  height: 30px;
  line-height: 30px;
  background-color: skyblue;
  position: absolute;
  right: 100px;
  top: 0;
}
</style>
