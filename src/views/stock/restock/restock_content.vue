<template>
  <el-dialog
    title="提示"
    v-bind="$attrs"
    v-on="$listeners"
    width="98%"
    class="dialog-content"
    :show-close="false"
    top="20px">
    <div slot="title">
      <el-row>
        <el-col :span="18">
          <h4>{{ dialog_title }}</h4>
        </el-col>
        <el-col :span="6" style="text-align: right;">
          <el-button type="primary" @click="onSubmit()" v-loading="submitLoading">提交</el-button>
          <el-button type="info" @click="$emit('update:visible', false)">关闭</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-detail">
      <restock-form :postForm='postForm' ref="restockForm"></restock-form>
    </div>
  </el-dialog>
</template>

<script>
import restockForm from "./restock_form"

export default {
  props: {
    dialog_title: {
      type: String,
      default: '进货',
    }
  },
  components: {
    restockForm,
  },
  data() {
    return {
      status: false,
      postForm: {
        'serial': '',
        restockNumberTable: [],
      },
      submitLoading: false,
    }
  },
  methods: {
    // 触发子组件提交
    onSubmit() {
      this.submitLoading = true
      this.$refs['restockForm'].onSubmit()
    },
    // 子组件提交结果返回
    submitResult(res) {
      if (res) {
        this.submitLoading = false
        this.$emit('update:visible', false)
      } else {
        this.submitLoading = false
      }
    },
  }
}
</script>

<style scoped lang='scss'>
// 窗口不滚动/头部底边框
.dialog-content {
  overflow: visible !important;

  /deep/ .el-dialog__header {
    border-bottom: solid 1px #e6e6e6;
  }

  // 引入组件单独滚动
  .dialog-detail {
    height: calc(100vh - 160px);
    overflow: auto;
  }
}
</style>