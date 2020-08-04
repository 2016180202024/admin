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
