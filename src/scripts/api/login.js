
/**
 * Created with WebStorm
 * @ Name:      login.js
 * @ Author:    RuiChen
 * @ Date:      Created in 下午5:18 20-7-17
 * @ Modified By:
 * @ Description:
 */

import request from '../utils/requestUtils'
import {getToken} from '../utils/authUtils'
import {getAPINameByProjectFlag} from '../utils/projectControl'

export function getPictureCode () {
  return request({
    url: getAPINameByProjectFlag() + '/user_foreend/code/picture',
    method: 'post'
  })
}

export function sendAuthCode (phone, action, flag) {
  return request({
    url: getAPINameByProjectFlag() + '/identify_code/send?phone=' + phone + '&action=' + action + '&flag=' + flag,
    method: 'get'
  })
}

// 用于登录认证的函数
export function auth (AuthReq) {
  return request({
    url: getAPINameByProjectFlag() + '/user_foreend/auth',
    method: 'post',
    // data默认为application/json类型
    data: AuthReq
  })
}

// 用于登录认证的函数
export function auth4IdentifyCode (AuthReq4IdentifyCode) {
  return request({
    url: getAPINameByProjectFlag() + '/user_foreend/auth4IdentifyCode',
    method: 'post',
    // data默认为application/json类型
    data: AuthReq4IdentifyCode
  })
}

export function login (option) {
  return request({
    url: getAPINameByProjectFlag() + '/user_foreend/login?option=' + option,
    method: 'get',
    // data默认为application/json类型
    headers: {
      'Authorization': getToken()
    }
  })
}
