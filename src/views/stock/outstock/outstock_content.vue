<template>
  <el-dialog
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
      <outstock-form :multipleTable='multipleTable' ref="outstockForm" @submitResult='submitResult'></outstock-form>
    </div>
  </el-dialog>
</template>

<script>
import outstockForm from "./outstock_form"

export default {
  props: {
    dialog_title: {
      type: String,
      default: '出库',
    },
    multipleTable: {
      type: Array,
    }
  },
  components: {
    outstockForm,
  },
  data() {
    return {
      status: false,
      submitLoading: false,
    }
  },
  watch: {
    multipleTable: {
      immediate: true,
      handler: function (val) {
        console.log(val)
      }
    }
  },
  methods: {
    // 触发子组件提交
    onSubmit() {
      this.submitLoading = true
      this.$refs['outstockForm'].onSubmit()
    },
    // 子组件提交结果返回
    submitResult(res) {
      if (res) {
        this.submitLoading = false
        this.$emit('update:visible', false)
        this.$emit('submitResult', true)
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