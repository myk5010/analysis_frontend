import request from "../utils/request"

/**
 * -------------------------------------------------------------------------------------------
 * 登录
 * -------------------------------------------------------------------------------------------
 */
export function login(data) {
  return request({
    url: "/backend/user/login",
    method: "post",
    data
  })
}
// 登出
export function logout() {
  return request({
    url: "/backend/user/logout",
    method: "delete"
  })
}
// 获取用户信息
export function getInfo() {
  return request({
    url: "/backend/users/authed",
    method: "get"
  })
}
// 获取用户权限
export function getPermission(userid) {
  return request({
    url: `/api/admin/permission/onepermission/${userid}`,
    method: "get"
  })
}
// 重置密码
export function resetPassword(data, user_id) {
  return request({
    url: `/backend/user/${user_id}/reset_password`,
    method: "post",
    data
  })
}

export async function searchUser(params) {
  return request.get("/backend/users/search", { params })
}
// 根据小组id获取当前组下所有成员
export async function teamUsers(params) {
  return request({
    url: "/backend/teams/users",
    method: "get",
    params
  })
}

