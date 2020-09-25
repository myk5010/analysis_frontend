import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

let modulesRoutes = []
const files = require.context("./modules", false, /\.js$/i)
files.keys().map(key => {
  const fileName = key
    .split("/")
    .pop()
    .split(".")[0]
  if (fileName !== "index") {
    modulesRoutes.push(...files(key).default)
  }
})

export default new Router({
  mode: "history",
  // mode: 'hash',
  routes: [
    // 登录
    // {
    //   path: "/login",
    //   component: () => import("@/layout/login/index.vue"),
    //   meta: {
    //     title: "登录"
    //   }
    // },
    // 首页
    {
      path: "/",
      redirect: 'default',
      component: () => import("@/layout/layout_admin/index.vue"),
      meta: { title: "首页" },
      children: [
        {
          path: "default",
          components: require("@/views/home/default"),
          meta: { title: "首页" }
        }
      ]
    },
    // // BI
    // {
    //   path: "/index",
    //   redirect: '/index/bi',
    //   component: () => import("@/layout/layout_admin/index.vue"),
    //   meta: { title: "BI" },
    //   children: [
    //     {
    //       path: "bi",
    //       components: require("@/views/home/index"),
    //       meta: { title: "BI", activeMenu: '/index'  }
    //     }
    //   ]
    // },
   
    ...modulesRoutes,
    // 404 page must be placed at the end !!!
    {
      path: "*",
      component: () => import("@/views/404.vue"),
      hidden: true
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})
