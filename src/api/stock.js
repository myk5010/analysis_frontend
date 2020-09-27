import request from "../utils/request"

// 库存列表
export function stock_list(params) {
  return request({
    url: `/stock/list`,
    method: "get",
    params
  })
}

// 入库列表
export function stock_in_list(params) {
  return request({
    url: `/stock/list`,
    method: "get",
    params
  })
}

