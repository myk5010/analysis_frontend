<template>
  <el-row :gutter="20" style="padding-top: 15px;">
    <el-col :span=12>
      <el-table
        :data="tableData"
        :height="tableHeight"
        :cell-style="function(){return 'padding:0'}"
        border
        style="border: solid 1px #e6e6e6;">
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
        <el-table-column
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
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
            :page-sizes="[20, 50, 100, 500]"
            :page-size="condition.limit"
            layout="total, sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
    </el-col>
    <el-col :span='12'>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>筛选</span>
          <el-button style="float: right;" type="primary" @click="handleScreen">确定</el-button>
          <el-button style="float: right;margin-right: 20px;" type="warning" @click="handleClear">清空</el-button>
        </div>
        <el-form ref="search_form" :model="search_form" label-width="80px">
          <el-col :span='12'>
            <el-form-item label="物料名称">
              <el-input v-model="search_form.materiel_name" placeholder="支持模糊搜索"></el-input>
            </el-form-item>
            <el-form-item label="规格">
              <el-input v-model="search_form.standard" placeholder="支持模糊搜索"></el-input>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="search_form.unit" placeholder="支持模糊搜索"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span='12' style="margin-top: 20px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新增物料</span>
          <el-button style="float: right;" type="primary" @click="handleSubmit">提交</el-button>
          <el-button style="float: right;margin-right: 20px;" type="warning" @click="handleClearSub">清空</el-button>
        </div>
        <el-form ref="add_form" :model="add_form" label-width="80px" :rules="rules">
          <el-col :span='12'>
            <el-form-item label="物料名称" prop="materiel_name">
              <el-input v-model="add_form.materiel_name" placeholder="必填"></el-input>
            </el-form-item>
            <el-form-item label="规格">
              <el-input v-model="add_form.standard" placeholder="非必填"></el-input>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="add_form.unit" placeholder="非必填"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { category_list, add_category } from "@/api/system_setting"

export default {
  data () {
    return {
      // 列表
      tableData: [],
      tableHeight: '',
      // 筛选
      condition: {
        // 分页
        page: 1,
        limit: 50,
      },
      total: 0,
      search_form: {
        materiel_name: '',
        standard: '',
        unit: '',
      },
      // 新增
      add_form: {
        materiel_name: '',
        standard: '',
        unit: '',
      },
      rules: {
        materiel_name: [{ required: true, message: '请输入物料名称', trigger: 'blur' },],
      }
    }
  },
  methods: {
    fetchData() {
      category_list(this.condition).then(res => {
        this.tableData = res.data
        this.total = res.total
      })
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
    // 筛选
    handleScreen() {
      this.condition = Object.assign(this.condition, this.search_form)
      this.fetchData()
    },
    // 清空 - 筛选
    handleClear() {
      this.condition = {
        page: this.condition.page,
        limit: this.condition.limit,
      }
      for (const key in this.search_form) this.search_form[key] = ''
      this.fetchData()
    },
    // 提交
    handleSubmit() {
      add_category(this.add_form).then(res => {
        console.log(res)
      })
      // this.$refs.add_form.validate((valid) => {
      //   if (valid) {
      //     add_category(this.add_form).then(res => {
      //       console.log(res)
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    // 清空 - 提交
    handleClearSub() {
      this.$refs.add_form.resetFields()
      for (const key in this.add_form) this.add_form[key] = ''
    },
  },
  created() {
    this.tableHeight = document.documentElement.clientHeight - 155
    this.fetchData()
  } 
}
</script>