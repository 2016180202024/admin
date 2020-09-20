/**
 * Created with WebStorm
 * @ Name:      user.js
 * @ Author:    RuiChen
 * @ Date:      Created in 下午9:14 20-7-28
 * @ Modified By:
 * @ Description:
 */

import request from '../utils/requestUtils'
import {getAPINameByProjectFlag} from '../utils/projectControl'
import {getToken} from '../utils/authUtils'

/**
 * @description 获取简要用户信息
 * @param page
 * @param pageSize
 */

export function getSimpleUserInfoByPage (page, pageSize, searchContent) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/getSimpleUserInfoByPage?page=' + page + '&pageSize=' + pageSize + '&searchContent=' + searchContent,
    method: 'get'
  })
}

/**
 * @description 用户冻结与解冻
 * @param phone
 * @param flag
 */

export function freezeUser (phone, flag) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/freezeUser?phone=' + phone + '&flag=' + flag,
    method: 'get'
  })
}

/**
 * @description 用户信息查询
 * @param feedbackReq
 */
export function querySimpleUserInfo (querySimpleUserInfoReq) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/querySimpleUserInfo',
    method: 'post',
    data: querySimpleUserInfoReq
  })
}

/**
 * @description 用户授权信息查询
 * @param feedbackReq
 */
export function queryAuthUserInfo (queryAuthUserInfoReq) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/queryAuthUserInfo',
    method: 'post',
    data: queryAuthUserInfoReq
  })
}

/**
 * @description 用户授权
 * @param authUserReq
 */
export function authUser (authUserReq) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/authUser',
    method: 'post',
    data: authUserReq
  })
}

/**
 * @description 写入用户登录信息
 * @param loginStatus
 */
export function setLoginStatus (loginStatus) {
  return request({
    url: getAPINameByProjectFlag() + '/user_foreend/login/status',
    method: 'post',
    headers: {
      'Authorization': getToken()
    },
    data: loginStatus
  })
}

/**
 * @description 用户退出时，更新用户登录消息
 * @param loginStatus
 */
export function setLogoutStatus () {
  let formData = new FormData()
  formData.append('Authorization', getToken())
  formData.append('platform', 'admin')
  return request({
    url: getAPINameByProjectFlag() + '/user_foreend/logout/status',
    method: 'post',
    headers: {
      'Authorization': getToken()
    },
    data: formData
  })
}

/**
 * @description 用户登录信息查询
 * @param queryLoginInfoReq
 */
export function queryLoginInfo (queryLoginInfoReq) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/queryLoginInfo',
    method: 'post',
    data: queryLoginInfoReq
  })
}
