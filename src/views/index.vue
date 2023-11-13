<template>
  <div class="board">
    <div id="container" class="container"></div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.initEchart()
  },
  methods: {
    initEchart() {
      let data = [
        [0.8, 80],
        [1.7, 75],
        [3.7, 62],
        [6.7, 56],
        [7.4, 56],
        [10.7, 44],
        [11.3, 38],
        [11.8, 32],
        [12.6, 28],
        [13.2, 22],
        [15.3, 17],
        [18.3, 10]
      ];
      let myChart = echarts.init(document.getElementById('container'), null)
      const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
      let option = {
        title: {
          text: 'X轴不等间距分布',
          left: 'center',
          textStyle: {
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        grid: {
          right: 40,
          left: 40
        },
        xAxis: [
          {
            type: 'value',
            name: '万kW·h',
            nameTextStyle: {
              verticalAlign: 'center',
              padding: [10, -24, 0, 0],
              align: 'right',
              fontSize: 10
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          }
        ],
        yAxis: [
          {
            nameLocation: 'middle',
            nameGap: 35,
            splitLine: {
              show: true,
            },
            axisLabel: {
              show: true,
            },
            type: 'value',
          },
          {
            nameLocation: 'start',
            type: 'value',
            inverse: true,
          },
        ],
        series: [
          {
            name: '设计值',
            type: 'line',
            showSymbol: true,
            smooth: true,
            itemStyle: {
              color: 'red',
            },
            data,
            markLine: {
              symbol: ['none', 'none'],
              silent: true,
              label: {
                show: true,
                position: 'start',
                formatter: '{b}',
                color: '#666',
                fontSize: 10,

              },
              lineStyle: {
                type: 'dashed',
                color: 'rgba(0, 0, 0, 0.1)',
              },
              data: data.map(v => ({
                name: `${String(v[0])}`,
                xAxis: v[0],
              }))
            },
          },
        ],
      }
      myChart.setOption(option)
    },
  },
}
</script>
<style lang="scss" scoped>
.board {
  height: 100%;
}
.container {
  height: 500px;
}
</style>