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
        <el-button type="primary" @click="handleClick">出库</el-button>
      </el-col>
    </div>
    <el-table
      :data="tableData"
      border
      ref="multipleTable"
      :height="tableHeight"
      default-expand-all
      v-loading="tableLoading"
      :cell-style="function(){return 'padding:0'}"
      row-key="id"
      @selection-change="handleSelectionChange"
      :tree-props="{children: 'batch_ins', hasChildren: 'hasChildren'}"
      style="border: solid 1px #e6e6e6;">
      <el-table-column
        type="selection"
        :selectable='handleDisable'
        width="55">
      </el-table-column>
      <!-- <el-table-column
        type="selection"
        width="55">
        <template slot-scope="scope">
          <el-checkbox v-if="!scope.row.batch_ins"></el-checkbox> 
        </template>
      </el-table-column> -->
      <template v-for="item in table_header">
        <el-table-column
          show-overflow-tooltip
          align='center'
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
    <out-stock :visible.sync="dialogVisible" :multipleTable='multipleTable' @submitResult='submitResult'></out-stock>
  </div>
</template>

<script>
import { table_header, show_header } from "./list_data"
import { stock_list } from "@/api/stock"
import outStock from "./outstock/outstock_content"

export default {
  components: {
    outStock,
  },
  data () {
    return {
      // 库存列表
      table_header,
      show_header,
      tableData: [],
      tableHeight: '',
      tableLoading: false,
      // 出库
      dialogVisible: false,
      multipleTable: [],
    }
  },
  methods: {
    // 初始数据请求
    fetchData() {
      this.tableLoading = true
      stock_list().then(res => {
        this.tableLoading = false
        this.tableData = res.data
      }, err => {
        this.tableLoading = false
      })
    },
    // 出库 --->
    // - 禁止选中合计的库存行
    handleDisable(row, index) {
      return !row.batch_ins
    },
    // - 选中出库目标
    handleSelectionChange(val) {
      this.multipleTable = val
    },
    handleClick() {
      this.dialogVisible = true
    }, 
    // - 子组件提交结果返回
    submitResult(res) {
      if (res) {
        this.fetchData()
      } 
    },
    // <--- end
  },
  created() {
    this.tableHeight = document.documentElement.clientHeight - 150
    this.fetchData()
  },
}
</script>

<style lang="scss" scoped>
// 隐藏全选框
.el-table /deep/ .el-table__header .el-checkbox__input {
  display: none !important;
}
</style>