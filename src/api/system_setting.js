import request from "../utils/request"

// 物料种类列表
export function category_list(params) {
  return request({
    url: `/setting/category`,
    method: "get",
    params
  })
}

// 新增物料种类
export function add_category(data) {
  return request({
    url: `/setting/category`,
    method: "post",
    data
  })
}
