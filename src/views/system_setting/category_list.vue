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
    </el-col>
    <el-col :span='12'>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>筛选</span>
          <el-button style="float: right;" type="primary">确定</el-button>
        </div>
        <el-form ref="form" :model="search_form" label-width="80px">
          <el-col :span='12'>
            <el-form-item label="物料名称">
              <el-input v-model="search_form.materiel_name"></el-input>
            </el-form-item>
            <el-form-item label="规格">
              <el-input v-model="search_form.standard"></el-input>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="search_form.unit"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span='12' style="margin-top: 20px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新增物料</span>
          <el-button style="float: right;" type="primary">提交</el-button>
        </div>
        <el-form ref="form" :model="add_form" label-width="80px">
          <el-col :span='12'>
            <el-form-item label="物料名称">
              <el-input v-model="add_form.materiel_name"></el-input>
            </el-form-item>
            <el-form-item label="规格">
              <el-input v-model="add_form.standard"></el-input>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="add_form.unit"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      tableHeight: '',
      condition: {
        // 分页
        page: 1,
        limit: 20,
      },
      total: 0,
      search_form: {},
      add_form: {},
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
  },
  created() {
    this.tableHeight = document.documentElement.clientHeight - 155
  } 
}
</script>