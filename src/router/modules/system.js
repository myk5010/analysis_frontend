export default [
  {
    path: "/system",
    components: require("@/layout/layout_admin/index"),
    meta: { title: "系统设置" },
    children: [
      {
        path: "category_list",
        components: require("@/views/system/category_list.vue"),
        meta: { title: "物料种类" }
      },
    ]
  }
]