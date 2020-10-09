import request from "../utils/request"

// 库存列表
export function stock_list(params) {
  return request({
    url: `/stock/list`,
    method: "get",
    params
  })
}

// 进货 --->
// - 进货列表
export function restock_list(params) {
  return request({
    url: `/restock/list`,
    method: "get",
    params
  })
}
// - 新增进货
export function restock_create(data) {
  return request({
    url: `/restock/create`,
    method: "post",
    data
  })
}
// <--- end

// 出库 --->
// - 新增出库
export function outstock_create(data) {
  return request({
    url: '/outstock',
    method: "post",
    data
  })
}
