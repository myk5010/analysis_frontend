<template>
  <div>
    <div>
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 50px;line-height: 50px;">
          <el-breadcrumb-item :to="{ path: '/' }">库存</el-breadcrumb-item>
          <el-breadcrumb-item>库存列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" :offset='12' style="height: 50px;line-height: 50px;text-align: right;">
        <el-button type="primary">盘点</el-button>
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
          align='center'
          :width="item['width']"
          :key="item['key']"
          :label="item['label']"
          :column-key="item['columnKey']"
          :filters="item['filters']"
          v-if="show_header.includes(item['key'])">
          <template slot-scope="scope">{{ scope.row[item['key']] }}</template>
        </el-table-column>
      </template>
      <el-table-column
        align='center'
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24">
      <div style="padding:20px 0; text-align:center;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="condition.page"
          :page-sizes="[20, 30, 60, 100]"
          :page-size="condition.limit"
          layout="total, sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
import { table_header, show_header } from "./list_data"

export default {
  data () {
    return {
      table_header,
      show_header,
      tableData: [],
      tableHeight: '',
      condition: {
        // 分页
        page: 1,
        limit: 20,
      },
      total: 0,
    }
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.condition.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.condition.page = val
      this.fetchData()
    },
    // 库存详情
    handleClick() {

    }, 
  },
  created() {
    this.tableHeight = document.documentElement.clientHeight - 200
  },
}
</script>