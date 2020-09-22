import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
// elment-ui
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
// 路由拦截器
// import "@/router/router_intercept.js"

Vue.config.productionTip = false

Vue.use(Element, {
  size:
    // Cookies.get('size') ||
    "mini" // set element-ui default size
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
