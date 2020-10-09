<template>
  <div>
    <div>
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 50px;line-height: 50px;">
          <el-breadcrumb-item :to="{ path: '/' }">库存</el-breadcrumb-item>
          <el-breadcrumb-item>出库列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" :offset='12' style="height: 50px;line-height: 50px;text-align: right;">
        <el-button type="primary" @click="restock">出库</el-button>
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
    <el-col :span="24">
      <div style="padding:20px 0; text-align:center;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="condition.page"
          :page-sizes="[20, 50, 100, 500]"
          :page-size="condition.limit"
          layout="total, sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
import { table_header, show_header } from "./index_data"
import { restock_list } from "@/api/stock"

export default {
  data () {
    return {
      // 入库列表
      table_header,
      show_header,
      tableData: [],
      tableHeight: '',
      tableLoading: false,
      dialogVisible: false,
      // 筛选
      condition: {
        // 分页
        page: 1,
        limit: 50,
      },
      total: 0,
    }
  },
  methods: {
    // 初始数据请求
    fetchData() {
      restock_list(this.condition).then(res => {
        this.tableData = res.data
        this.total = res.total
      })
    },
    // 进货
    restock() {
      this.dialogVisible = true
    },
    // 分页
    handleSizeChange(val) {
      this.condition.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.condition.page = val
      this.fetchData()
    },
  },
  created() {
    this.tableHeight = document.documentElement.clientHeight - 200
    this.fetchData()
  },
}
</script>