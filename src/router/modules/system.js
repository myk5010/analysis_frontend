export default [
  {
    path: "/setting",
    components: require("@/layout/layout_admin/index"),
    meta: { title: "系统设置" },
    children: [
      {
        path: "category_list",
        components: require("@/views/setting/category_list.vue"),
        meta: { title: "物料种类" }
      },
    ]
  }
]