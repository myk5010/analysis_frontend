<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="postForm" :model="postForm" :rules="rules" inline label-width="110px">
        <el-form-item label="出库单据编号" prop="document">
          <el-input v-model="postForm.document" style="width: 160px;"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-table
        :data="tableData"
        ref="tableData"
        :cell-style="function(){return 'padding:0'}"
        border
        show-summary
        :summary-method='summaryTable'
        style="border: solid 1px #e6e6e6;box-shadow: 0 2px 12px 0 #0000001a;">
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
        <el-table-column
          prop="out_number"
          align="center"
          label="出货量">
          <template slot-scope="{row}">
            <el-input v-model="row.out_number" />
          </template>
        </el-table-column>
        <el-table-column
          prop="out_price"
          align="center"
          label="出货价">
          <template slot-scope="{row}">
            <el-input v-model="row.out_price" />
          </template>
        </el-table-column>
        <el-table-column
          prop="sum"
          align="center"
          :formatter="sumPrice"
          label="实收金额">
        </el-table-column>
        <el-table-column
          prop="code"
          align="center"
          label="物料长代码">
          <template slot-scope="{row}">
            <el-input v-model="row.code" />
          </template>
        </el-table-column>
        <el-table-column
          prop="loss"
          align="center"
          label="损耗">
          <template slot-scope="{row}">
            <el-input v-model="row.loss" />
          </template>
        </el-table-column>
        <el-table-column
          prop="out_comment"
          align="center"
          label="备注">
          <template slot-scope="{row}">
            <el-input v-model="row.out_comment" />
          </template>
        </el-table-column>
        <el-table-column
          align='center'
          label="操作"
          width="80">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { restock_list, outstock_create } from "@/api/stock"
import { table_header, show_header, } from "./outstock_form_data"

export default {
  props: {
    multipleTable: {
      type: Array,
    }
  },
  data () {
    return {
      // 出库列表
      tableData: [],
      table_header,
      show_header,
      // 单据编号
      postForm: {
        'document': ''
      },
      // 单据编号 - 表单验证
      rules: {
        document: [{ required: true, message: '请输入单据编号', trigger: 'blur' },],
      },
    }
  },
  watch: {
    multipleTable: {
      immediate: true,
      handler: function (val) {
        this.tableData = val
      }
    }
  },
  methods: {
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    // 合计行计算
    summaryTable(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        // 只计算sum列
        if (!values.every(value => isNaN(value)) && column.property=='sum') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      sums[9] = sums[9] + '元'
      return sums
    },
    // 实收金额计算
    sumPrice(row, column) {
      row.sum = Math.round(row.out_number*row.out_price*10)/10
      return row.sum
    },
    // 提交出货数据
    onSubmit() {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          const data = {
            'document': this.postForm.document,
            'list': this.tableData,
          }
          outstock_create(data).then(res => {
            // this.$emit('submitResult',res)
          }, err => {
            this.$emit('submitResult',false)
          })
        } else {
          console.log('error submit!!')
          this.$emit('submitResult',false)
          return false
        }
      })
    },
  },
  updated() {
    this.$nextTick(() => {
      // elementUI - version <= 2.13.2 - 合计行: 处理表格有tableHeight时合计行消失bug
      this.$refs['tableData'].doLayout()
    })  
  }
}
</script>

<style scoped lang='scss'>
  .el-table {

    /deep/ .cell {
      padding: 0;
    }
  }
</style>