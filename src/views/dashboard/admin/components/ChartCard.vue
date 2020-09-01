<template>
  <div>
    <div id="main" style="width: 600px; height: 300px"></div>
  </div>
</template>

<script>
import { getChartData } from '@/api/chart'

export default {
  name: "ChartCard",
  props: {
    clickObj: {
      type: String,
      default: 'article'
    }
  },
  data() {
    return {
      chartData: null
    }
  },
  computed: {
    chartObj() {
      return this.clickObj
    }
  },
  mounted() {
    this.initCharts()
  },
  watch: {
    chartObj: function() {
      this.refreshChart()
    }
  },
  methods: {
    initCharts() {
      const params = {
        fromData: this.chartObj
      }
      getChartData(params).then( response => {
        const { data } = response
        this.chartData = data
        this.chart = this.$echarts.init(document.getElementById('main'))
        this.setOptions()
      })
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: this.chartObj + '近期数据统计'
        },
        tooltip: {},
        xAxis: {
          data: this.chartData.name
        },
        yAxis: {},
        series: [{
          name: '',
          type: 'bar',
          data: this.chartData.count
        }]
      })
    },
    refreshChart() {
      const params = {
        fromData: this.chartObj
      }
      getChartData(params).then( response => {
        const { data } = response
        this.chartData = data
        this.setOptions()
      })
    }
  }
}
</script>

<style scoped>

</style>