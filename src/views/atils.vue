<template>
  <div class="apaas-custom-deportal">
    <template v-if="isShow">
      <div class="radar-box">
        <div ref="chart" class="radar"></div>
      </div>
      <div class="centent">
        <div>您的认证结果：{{ defenseResult || '' }}</div>
        <div>
          <p>评委建议：&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p>{{ defensePropose || '' }}</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="box">今年的认证尚未启动, 请等待通知！</div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      defenseResult: '你通过了',
      defensePropose: '你很优秀你很优秀你很优秀你很优秀你很优秀你很优秀你很优秀你很优秀',
      isShow: true,
      headers: {
        'Content-Type': 'application/json', // 指定内容类型为JSON
        Xdapappid: '542045473624555520', // 自定义请求头
        Xdaptenantid: '491633633145126913', // 自定义请求头
        xdaptimestamp: "1723028698396", // 自定义请求头
        Xdaptoken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MjMwNTExODcsImlhdCI6MTcyMzAwODE4NywieGRhcHVzZXJpZCI6IjEwMDUwMjQ2NTA2ODk5MDk4ODI4OCJ9.zRcpqPqhTTcn1WlgyZJiwJ3puiYf9idEgrYHLYagU12RLD6n5WE1xwMua9X3NP2DWiRrlJWJjaubD9SRLlw1rQ'
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
          ],
      value: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
    };
  },
  created() {
    // this.getChartList();
  },
  computed: {},
  mounted() {
    this.drawLine();
  },
  methods: {
    getChartList() {
      let that = this;
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/pc/getDefenseResults`,
          {
            token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MjMwNTExODcsImlhdCI6MTcyMzAwODE4NywieGRhcHVzZXJpZCI6IjEwMDUwMjQ2NTA2ODk5MDk4ODI4OCJ9.zRcpqPqhTTcn1WlgyZJiwJ3puiYf9idEgrYHLYagU12RLD6n5WE1xwMua9X3NP2DWiRrlJWJjaubD9SRLlw1rQ'
          },
          { headers: that.headers }
        )
        .then(function (resp) {
          console.log(resp, '---我是新建------');
          if(resp.data.code == 'ok'){
            that.isShow = resp?.data?.data?.isShow || false
            that.defenseResult = resp?.data?.data?.defenseResult //结果
            that.defensePropose = resp?.data?.data?.defensePropose //建议
            that.indicator = resp?.data?.data?.indicator ?? []
            that.value = resp?.data?.data?.value ?? []
            that.drawLine();
          }
        });

      // this.$request({
      //   url: `/custom/access/pc/getDefenseResults`,
      //   method: 'POST',
      //   disableSuccessMsg: true,
      //   params: {
      //     token: this.token
      //   }
      // }).asyncThen((resp) => {
      //   if (resp.code === 'ok') {
      //     console.info(resp, '------请求数据-----')
      //     this.message = resp?.data?.message
      //     this.result = resp?.data?.result
      //     this.option.radar.indicator = resp?.data?.indicator ?? []
      //     this.option.series[0].data[0].value = resp?.data?.value ?? []

      //   } else {
      //     this.$message({
      //       message: resp.message,
      //       type: 'error'
      //     })
      //   }
      // })
    },
    drawLine() {
        let that = this
      const echarts = require('echarts');
      const charts = echarts.init(that.$refs.chart);
      let option =  {
        backgroundColor: '#FFF',
        tooltip: {
          backgroundColor: 'rgba(0,0,0,.5)',
          textStyle: {
            color: '#fff'
          },
          confine: true //限制在框内
          // appendToBody: true //不限制  如果数据较多展示不全，就把这个开启
        },
        radar: {
          name: {
            textStyle: {
              color: '#999999'
            },
            formatter: function (value) {
              let list = value.split('');
              let result = '';
              for (let i = 1; i <= list.length; i++) {
                if (!(i % 5) && list[i] != undefined) {
                  result += list[i - 1] + '\n';
                } else {
                  result += list[i - 1];
                }
              }
              return result;
            }
          },
          splitArea: {
            areaStyle: {
              color: ['#fff', '#fff', '#fff', '#fff'],
              shadowColor: 'rgba(0, 100, 0, 0.3)'
            }
          },
          indicator: that.indicator || []
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: that.value || [],
                name: '总览',
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
      charts.setOption(option);

      window.addEventListener('resize', function () {
        charts.resize();
      });
    }
  }
};
</script>

<style lang="less">
.apaas-custom-deportal {
  display: flex;
  width: 100%;
  height: 100%;
  .radar-box {
    margin-left: 20px;
    width: 60%;
    height: 100%;
    .radar {
      width: 100%;
      height: 100%;
    }
  }
  .centent {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;
    div {
      width: 100%;
      text-align: left;
      padding: 5px 10px 5px 20px;
      box-sizing: border-box;
    }
  }
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
