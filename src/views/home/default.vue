<template>
  <div>
    <el-col :span="24">
      <charts-plugin :chartData="index_data[0]"></charts-plugin>
    </el-col>
  </div>
</template>

<script>
import chartsPlugin from "@/components/charts_plugin"
import index_data from "./index_data"

export default {
  components: {
    chartsPlugin,
  },
  data() {
    return {
      index_data,
      testData: []
    }
  },
  methods: {
    fetchData() {
      this.index_data[0].option.xAxis.data = this.testData.map(function (item) {
        return item[0]
      })
      this.index_data[0].option.series.data = this.testData.map(function (item) {
        return item[1]
      })
    },
  },
  mounted() {
    this.fetchData()
  },
  destroyed () {
  }
}
</script>