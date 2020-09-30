export default [
  {
    path: "/stock",
    components: require("@/layout/layout_admin/index"),
    meta: { title: "库存管理" },
    children: [
      {
        path: "list",
        components: require("@/views/stock/list.vue"),
        meta: { title: "库存" }
      },
      {
        path: "restock",
        components: require("@/views/stock/restock/index.vue"),
        meta: { title: "进货" }
      },
      {
        path: "out",
        components: require("@/views/stock/out.vue"),
        meta: { title: "出货" }
      },
    ]
  }
]