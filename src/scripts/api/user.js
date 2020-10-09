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

/**
 * @description 用户反馈信息查询
 * @param queryFeedbackInfoReq
 */
export function queryFeedbackInfo (queryFeedbackInfoReq) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/queryFeedbackInfo',
    method: 'post',
    data: queryFeedbackInfoReq
  })
}

/**
 * @description 用户反馈信息修改
 * @param updateIsReadReq
 */
export function updateFeedbackInfo (updateIsReadReq) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/updateFeedbackInfo',
    method: 'post',
    data: updateIsReadReq
  })
}

/**
 * @description 根据Phone查询用户信息（phone+userName）
 * @param queryPhoneInfoReq
 */
export function queryPhoneInfo (queryPhoneInfoReq) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/queryPhoneInfo',
    method: 'post',
    data: queryPhoneInfoReq
  })
}

/**
 * @description 发送个人/群体用户消息（phone+title+content）
 * @param insertSystemMessage
 */
export function releaseSystemMessage (insertSystemMessage) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/insertSystemMessage',
    method: 'post',
    data: insertSystemMessage
  })
}

/**
 * @description 查询source发布的历史消息
 * @param queryHistoryInfoReq
 */
export function queryHistoryInfo (queryHistoryInfoReq) {
  return request({
    url: getAPINameByProjectFlag() + '/user_backend/queryHistoryInfo',
    method: 'post',
    data: queryHistoryInfoReq
  })
}
