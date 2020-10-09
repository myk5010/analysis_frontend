<template>
  <el-row>
    <el-col :span="7">
      <el-form ref="searchForm" :model="searchForm" inline label-width="70px">
        <!-- <el-form-item label="物料名称">
          <el-input v-model="searchForm.materiel_name" placeholder="支持模糊搜索" style="width: 120px;" @input="fetchData"></el-input>
        </el-form-item> -->
        <!-- <el-form-item style="float: right;margin-right: 0;"> -->
        <el-form-item>
          <el-button type="primary" @click="openDialog">增加物料种类</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        ref="postForm.restockNumberTable"
        :height="tableHeight"
        :cell-style="function(){return 'padding:0'}"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange"
        style="border: solid 1px #e6e6e6;box-shadow: 0 2px 12px 0 #0000001a;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="materiel_name"
          align="center"
          label="物料名称">
        </el-table-column>
        <el-table-column
          prop="standard"
          align="center"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="unit"
          align="center"
          label="单位">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="16" :offset="1">
      <el-form ref="postForm" :model="postForm" :rules="rules" inline label-width="80px">
        <el-form-item label="收据单号" prop="serial">
          <el-input v-model="postForm.serial" style="width: 160px;"></el-input>
        </el-form-item>
      </el-form>
      <el-table
        :data="postForm.restockNumberTable"
        :height="tableHeight"
        :cell-style="function(){return 'padding:0'}"
        border
        ref="restockNumberTable"
        show-summary
        :summary-method='summaryTable'
        style="border: solid 1px #e6e6e6;box-shadow: 0 2px 12px 0 #0000001a;">
        <el-table-column
          prop="materiel_name"
          align="center"
          label="物料名称">
        </el-table-column>
        <el-table-column
          prop="in_number"
          align="center"
          label="实收数量">
          <template slot-scope="{row}">
            <el-input v-model="row.in_number" />
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          align="center"
          label="单价">
          <template slot-scope="{row}">
            <el-input v-model="row.price" />
          </template>
        </el-table-column>
        <el-table-column
          prop="commission"
          align="center"
          label="佣金">
          <template slot-scope="{row}">
            <el-input v-model="row.commission" />
          </template>
        </el-table-column>
        <el-table-column
          prop="comment"
          align="center"
          label="备注">
          <template slot-scope="{row}">
            <el-input v-model="row.comment" />
          </template>
        </el-table-column>
        <el-table-column
          prop="sum"
          align="center"
          :formatter="sumPrice"
          label="实收金额">
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog
      width="300px"
      title="新增物料"
      :visible.sync="innerVisible"
      append-to-body>
      <el-form ref="add_form" :model="add_form" label-width="80px" :rules="categoryRules">
        <el-form-item label="物料名称" prop="materiel_name">
          <el-input v-model="add_form.materiel_name" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="add_form.standard" placeholder="非必填"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="add_form.unit" placeholder="非必填"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCategory">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { category_list, add_category } from "@/api/system_setting"
import { restock_create } from "@/api/stock"

export default {
  props: {
    postForm: {
      default: {}
    }
  },
  data () {
    return {
      // 列表高度
      tableHeight: '',
      // 物料种类列表
      tableData: [],
      loading: false,
      // 增加物料种类
      innerVisible: false,
      categoryRules: {
        materiel_name: [{ required: true, message: '请输入物料名称', trigger: 'blur' },],
      },
      add_form: {
        materiel_name: '',
        standard: '',
        unit: '',
      },
      // 筛选
      searchForm: { 'materiel_name': '' },
      // 收据单号 - 表单验证
      rules: {
        serial: [{ required: true, message: '请输入收据单号', trigger: 'blur' },],
      },
    }
  },
  watch: {
    postForm: {
      immediate: true,
      handler: function (val) {
        this.fetchData()
        // 每次打开dialog计算table高度
        this.tableHeight = document.documentElement.clientHeight - 230
      }
    }
  },
  methods: {
    // 初始数据请求
    fetchData() {
      this.loading = true
      category_list(this.searchForm).then(res => {
        this.loading = false
        this.tableData = res.data
        this.total = res.total
      }, err => {
        this.loading = false
      })
    },
    // 增加物料种类 --->
    openDialog() {
      this.innerVisible = true
    },
    addCategory() {
      this.$refs.add_form.validate((valid) => {
        if (valid) {
          add_category(this.add_form).then(res => {
            this.fetchData()
            this.innerVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // <--- end
    // 选中物料
    handleSelectionChange(val) {
      this.postForm.restockNumberTable = val
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
      sums[5] = sums[5] + '元'
      return sums
    },
    // 实收金额计算
    sumPrice(row, column) {
      row.sum = Math.round(row.in_number*row.price*10)/10
      return row.sum
    },
    // 提交进货数据
    onSubmit() {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          restock_create(this.postForm).then(res => {
            this.$emit('submitResult',res)
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
      this.$refs['restockNumberTable'].doLayout()
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