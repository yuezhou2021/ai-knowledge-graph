<template>
  <div>
    <!-- echarts -->
    <div id="main" class="main_container"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {};
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      var myChart = echarts.init(document.getElementById('main'));
      var option;
      myChart.showLoading();
      $.get('https://yapi.gaokeyun.cn/mock/102/ai_kldg_graph', function (data) {
        myChart.hideLoading();
        myChart.setOption(
          (option = {
            title: {
              text: '人工智能专业领域知识图谱',
              subtext: '提供知识点热度趋势，相互关系挖掘与对应教学资源推荐',
              top: '15%',
              left: '5%',
              textStyle: {
                color: '#4E5B71',
                fontWeight: 'bolder',
                fontFamily: 'Microsoft YaHei',
              },
            },
            //backgroundColor: '#2c343c',
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove',
              borderColor: '#EEF1F7',
              borderWidth: 1,
              textStyle: {
                width: 160,
                height: 250,
                lineHeight: 24,
                color: '#4E5B71',
                fontSize: '12',
              },
              formatter: function (params) {
                var tip = '';
                if (params != null) {
                  let book = ' 教材 : ';
                  let course = ' 推荐课程 : ';
                  let teacher = ' 推荐教师 : ';
                  let value = ' 热门指数 ：';
                  tip += `<div><p style="font-weight:bold;font-size:16px;margin:0 auto 8px;text-align:center">${params.data.name}</p></div>`;
                  if (params.data.value) {
                    tip += `<div style="margin:0 auto 8px;height:1px;border-top:1px solid #4E5B71;text-align:center;"></div>`;
                    tip += params.marker + value + params.data.value + '<br/>';
                  }
                  if (params.data.book) {
                    tip += params.marker + book + params.data.book + '<br/>';
                  }
                  if (params.data.course) {
                    tip +=
                      params.marker + course + params.data.course + '<br/>';
                  }
                  if (params.data.teacher) {
                    tip +=
                      params.marker + teacher + params.data.teacher + '<br/>';
                  }
                }
                return tip;
              },
            },
            visualMap: {
              show: false,
              min: 0,
              max: 100,
              inRange: {
                colorLightness: [1, 0.25],
              },
            },
            series: [
              {
                type: 'tree',
                data: [data],
                layout: 'radial',
                top: '12%',
                bottom: '12%',
                symbol: 'emptyCircle',
                symbolSize: 7,
                initialTreeDepth: 3,
                animationDuration: 550,
                animationDurationUpdate: 750,
                itemStyle: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
                lineStyle: {
                  width: 1,
                  curveness: 0.5,
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.75)',
                },
                emphasis: {
                  focus: 'descendant',
                },
              },
            ],
          })
        );
      });
      option && myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.main_container {
  width: 100%;
  height: 1080px;
}
</style>
