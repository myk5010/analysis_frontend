<template>
  <div>
    <div>
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 50px;line-height: 50px;">
          <el-breadcrumb-item :to="{ path: '/' }">库存</el-breadcrumb-item>
          <el-breadcrumb-item>进货列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" :offset='12' style="height: 50px;line-height: 50px;text-align: right;">
        <el-button type="primary">进货</el-button>
      </el-col>
    </div>
    <el-table
      :data="tableData"
      border
      :height="tableHeight"
      v-loading="tableLoading"
      :cell-style="function(){return 'padding:0'}"
      style="border: solid 1px #e6e6e6;">
      <template v-for="item in table_header">
        <el-table-column
          show-overflow-tooltip
          :width="item['width']"
          :key="item['key']"
          :prop="item['prop']"
          :label="item['label']"
          :column-key="item['columnKey']"
          :filters="item['filters']"
          v-if="show_header.includes(item['key'])">
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { table_header, show_header } from "./in_data"
import { stock_in_list } from "@/api/stock"

export default {
  data () {
    return {
      // 入库列表
      table_header,
      show_header,
      tableData: [],
      tableHeight: '',
      tableLoading: false,
    }
  },
  methods: {
    // 初始数据请求
    fetchdata() {

    },
  },
  created() {
    this.tableHeight = document.documentElement.clientHeight - 200
    this.fetchdata()
  },
}
</script>