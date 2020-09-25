import request from "../utils/request"

// 物料种类列表
export function category_list(params) {
  return request({
    url: "/system_setting/category_list",
    method: "get",
    params
  })
}
