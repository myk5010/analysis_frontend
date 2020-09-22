<template>
    <div :id="chartDataInfo.id" :style="chartDataInfo.style"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') 

export default {
  name: 'ChartsPlugin',
  props: [ 'chartData' ],
  data () {
    return {
      chartDataInfo: this.chartData
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawLine()
    })
  },
  watch: {
    chartDataInfo: {
      handler (newValue, oldValue) {
        this.chartDataInfo = newValue
        // 清除旧图数据
        let myChart = echarts.init(document.getElementById(this.chartDataInfo.id), 'macarons')
        myChart.dispose()
        // 重新绘图
        this.drawLine()
      },
      deep: true
    }
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.chartDataInfo.id), 'macarons')
      // 绘制图表
      myChart.setOption(this.chartDataInfo.option)
      // 自适应宽度
      window.onresize = myChart.resize
    },
  }
}
</script>
