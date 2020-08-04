/**
 * Created with WebStorm
 * @ Name:      authUtils.js
 * @ Author:    RuiChen
 * @ Date:      Created in 下午7:45 19-8-21
 * @ Modified By:
 * @ Description:
 */

const TokenKey = 'fire_admin_token'

export function getToken () {
  return sessionStorage.getItem(TokenKey)
}

export function setToken (token) {
  sessionStorage.setItem(TokenKey, token)
}

const expiryKey = 'fire_admin_expiry'

export function getExpiry () {
  return sessionStorage.getItem(expiryKey)
}

export function setExpiry (expiry) {
  sessionStorage.setItem(expiryKey, expiry)
}

const passwordKey = 'fire_admin_password'

export function getPassword () {
  return sessionStorage.getItem(passwordKey)
}

export function setPassword (password) {
  sessionStorage.setItem(passwordKey, password)
}

const phoneKey = 'fire_admin_phone'

export function getPhone () {
  return sessionStorage.getItem(phoneKey)
}

export function setPhone (phone) {
  sessionStorage.setItem(phoneKey, phone)
}

const nameKey = 'fire_admin_username'

export function getUserName () {
  return sessionStorage.getItem(nameKey)
}

export function setUserName (username) {
  sessionStorage.setItem(nameKey, username)
}

const roleKey = 'fire_admin_role'

export function getUserRole () {
  return sessionStorage.getItem(roleKey)
}

export function setUserRole (role) {
  sessionStorage.setItem(roleKey, role)
}

const roleKeyId = 'fire_admin_role_id'

export function getUserRoleId () {
  return sessionStorage.getItem(roleKeyId)
}

export function setUserRoleId (roleId) {
  sessionStorage.setItem(roleKeyId, roleId)
}

const loginKey = 'fire_admin_loginStatus'

export function getLoginStatus () {
  return sessionStorage.getItem(loginKey)
}

export function setLoginStatus (status) {
  sessionStorage.setItem(loginKey, status)
}

const avatarKey = 'fire_admin_avatar'
export function getAvatar () {
  return sessionStorage.getItem(avatarKey)
}

export function setAvatar (avatar) {
  return sessionStorage.setItem(avatarKey, avatar)
}

export function removeAllToken () {
  sessionStorage.removeItem(TokenKey)
  sessionStorage.removeItem(nameKey)
  sessionStorage.removeItem(loginKey)
  sessionStorage.removeItem(avatarKey)
  sessionStorage.removeItem(roleKey)
  sessionStorage.removeItem(phoneKey)
  sessionStorage.removeItem(roleKeyId)
  sessionStorage.removeItem(avatarKey)
}
