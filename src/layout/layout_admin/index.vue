
<template>
  <el-container>
    <el-header>
      <h3>出入帐数据分析</h3>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu 
          :default-active="menuActive" 
          class="el-menu-vertical-demo" 
          :collapse="isCollapse" 
          :default-openeds="openList" 
          router>
          <el-submenu index="default">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">数据分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/default/index">统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="stock">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span slot="title">库存管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/stock/list">库存详情</el-menu-item>
              <el-menu-item index="/stock/restock">进货记录</el-menu-item>
              <el-menu-item index="/stock/outstock">出库记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="setting">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span slot="title">系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/setting/category_list">物料种类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-row>
            <router-view />
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      isCollapse: false,
      openList: ['default', 'stock', 'setting'],
      menuActive: '/default/index',
    }
  },
  watch: {
    $route: "updateRouter"
  },
  methods: {
    updateRouter() {
      if (Object.prototype.hasOwnProperty.call(this.$route.meta, "activeMenu")) {
        this.menuActive = this.$route.meta.activeMenu
      } else {
        this.menuActive = this.$route.path
      }
    }
  },
  created() {
    this.updateRouter()
  }
}
</script>

<style lang="scss" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    height: calc(100vh - 60px);
  }
  
  .el-main {
    background-color: #E9EEF3;
    padding: 0 15px;
    color: #333;
  }
  
</style>
