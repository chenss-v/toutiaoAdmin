<template>
  <div class='fans-container'>
    <div ref="main" style="width: 600px;height:400px;"></div>
    <baidu-map></baidu-map>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import BaiduMap from './components/baiduMap.vue'
export default {
  name: 'FansIndex',
  components: {
    BaiduMap
  },
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  created () {
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById('main'));
    const myChart = echarts.init(this.$refs.main)
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
</style>
