import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
// elment-ui
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
// 路由拦截器
// import "@/router/router_intercept.js"
// 过滤器
import * as filters from "@/utils/filters.js"

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.use(Element, {
  size:
    // Cookies.get('size') ||
    "mini" // set element-ui default size
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
