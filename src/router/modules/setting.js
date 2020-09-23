export default [
  {
    path: "/system",
    components: require("@/layout/layout_admin/index"),
    meta: { title: "系统" },
    children: [
      {
        path: "setting",
        components: require("@/views/system/setting.vue"),
        meta: { title: "设置" }
      },
    ]
  }
]