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
      :cell-style="function(){return 'padding:0'}"
      style="border: solid 1px #e6e6e6;">
      <template v-for="item in table_header">
        <el-table-column
          show-overflow-tooltip
          :width="item['width']"
          :key="item['key']"
          :label="item['label']"
          :column-key="item['columnKey']"
          :filters="item['filters']"
          v-if="show_header.includes(item['key'])">
          <template slot-scope="scope">{{ scope.row[item['key']] }}</template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { table_header, show_header } from "./in_data"

export default {
  data () {
    return {
      table_header,
      show_header,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableHeight: ''
    }
  },
  methods: {
  },
  created() {
    this.tableHeight = document.documentElement.clientHeight - 200
  },
}
</script>