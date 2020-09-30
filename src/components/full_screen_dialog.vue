<template>
  <el-dialog
    title="提示"
    v-bind="$attrs"
    v-on="$listeners"
    width="98%"
    class="dialog-content"
    :show-close="false"
    top="20px">
    <div slot="title" class="dialog-header">
      <el-row>
        <el-col :span="18">
          <h4>{{ dialog_title }}</h4>
        </el-col>
        <el-col :span="6" style="text-align: right;">
          <el-button type="primary" @click="onSubmit('versionDetail')" v-loading="submitLoading">提交</el-button>
          <el-button type="info" @click="$emit('update:visible', false)">关闭</el-button>
        </el-col>
      </el-row>
    </div>
    <div style="height: calc(100vh - 160px);overflow: auto;">
      <span>这里放内容</span>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialog_title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped lang='scss'>
// 窗口不滚动/头部底边框
.dialog-content {
  overflow: visible !important;

  .el-dialog__header {
    border-bottom: solid 1px #e6e6e6;
  }

  .el-dialog__body {
    padding: 0;
  }

  // 引入组件单独滚动
  .dialog-detail {
    height: calc(100vh - 140px);
    overflow: auto;
  }
}
</style>