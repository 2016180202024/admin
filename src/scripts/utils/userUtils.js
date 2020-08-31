/**
 * Created with WebStorm
 * @ Name:      userUtils.js
 * @ Author:    RuiChen
 * @ Date:      Created in 下午8:33 19-8-24
 * @ Modified By:
 * @ Description:
 */

import {isMail, isTelenumber} from './validateUtils'
import {showMessage} from './utils'
import {getExpiry, getToken} from './authUtils'
import CryptoJS from 'crypto-js'

export function encryptPassword (password) {
  let encodePassword = CryptoJS.enc.Utf8.parse(password)
  console.log(encodePassword)
  let encryptedPassword = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse('fire123456'), {mode: CryptoJS.mode.ECB})
  console.log(encryptedPassword)
  return encryptedPassword.toString()
}

// 判断登录时用户名类型
export function getUserNameOptionType (username) {
  let optionType = 0
  if (isTelenumber(username)) {
    optionType = 1
  } else if (isMail(username)) {
    optionType = 2
  } else {
    optionType = 3
  }
  return optionType
}

export function sendLogin (option, self) {
  self.$store.dispatch('Login', option).then((status) => {
    switch (status) {
      case 200:
        showMessage(self, '登录成功！', 'success')
        self.$router.push('/')
        break
      case 204:
        showMessage(self, '用户名或密码错误，请重新输入！', 'error')
        self.getPictureCode()
        break
      case -2:
        showMessage(self, '该账号已被停用，请联系管理员！', 'error')
        self.getPictureCode()
        break
      default:
        showMessage(self, '系统错误！', 'error')
        self.getPictureCode()
    }
  }).catch((err) => {
    console.log(err)
    showMessage(self, '网络异常！', 'error')
    self.getPictureCode()
  }).finally((e) => {
    self.loginLoading = false
  })
}

export function sendLogin4IdentifyCode (option, self) {
  self.$store.dispatch('Login', option).then((status) => {
    switch (status) {
      case 200:
        showMessage(self, '登录成功！', 'success')
        self.$router.push('/home')
        break
      case 204:
        showMessage(self, '用户名或密码错误，请重新输入！', 'error')
        self.getPictureCode()
        break
      case -2:
        showMessage(self, '该账号已被停用，请联系管理员！', 'error')
        self.getPictureCode()
        break
      default:
        showMessage(self, '系统错误！', 'error')
        self.getPictureCode()
    }
  }).catch((err) => {
    console.log(err)
    showMessage(self, '网络异常！', 'error')
    self.getPictureCode()
  }).finally((e) => {
    self.loginLoading = false
  })
}

export function sendAuth (AuthReq, self) {
  self.loginLoading = true
  self.$store.dispatch('Auth', AuthReq).then((response) => {
    switch (response.status) {
      case 200:
        sendLogin(AuthReq.option, self)
        break
      case 204:
        showMessage(self, '非法操作！', 'warning')
        break
      default:
        break
    }
  }).catch((error) => {
    console.log(error)
  }).finally(e => {
    self.loginLoading = false
  })
}

export function sendAuth4IdentifyCode (AuthReq4IdentifyCode, self) {
  self.loading = true
  self.$store.dispatch('Auth4IdentifyCode', AuthReq4IdentifyCode).then((response) => {
    if (response.data !== false) {
      switch (response.status) {
        case 200:
          sendLogin4IdentifyCode(AuthReq4IdentifyCode.phone, self)
          break
        case 204:
          showMessage(self, '非法操作！', 'warning')
          break
        default:
          break
      }
    }
  }).catch((error) => {
    console.log(error)
  }).finally(e => {
    self.loading = false
  })
}

/**
 * @description 清除用户个人信息，未登录时，roleId=0
 * @param self
 */
export function removeUserInfo (self) {
  self.$store.dispatch('setUserName', '')
  self.$store.dispatch('setRoleId', 0)
  self.$store.dispatch('setPhone', '')
  self.$store.dispatch('setRole', '')
  self.$store.dispatch('setBaseInfo', {
    username: '',
    password: '',
    phone: '',
    mail: ''
  })
  self.$store.dispatch('setAvatar', require('../../../static/image/avatar_default.png'))
  self.$store.dispatch('setToken', '')
}

export function isUserLogin (self) {
  if (getExpiry() > new Date().getTime()) {
    if (getToken() !== null) {
      return true
    } else {
      // sendLogin(getPhone(), self)
      return false
    }
  } else {
    return false
  }
}
