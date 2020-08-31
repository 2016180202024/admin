/**
 * Created with WebStorm
 * @ Name:      validateUtils.js
 * @ Author:    RuiChen
 * @ Date:      Created in 上午11:30 19-8-23
 * @ Modified By:
 * @ Description:
 */

export function isValidIDCard (IDNumber) {
  let idCardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  return idCardReg.test(IDNumber)
}

export function isMail (mail) {
  let isMailReg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
  return isMailReg.test(mail)
}

export function isTelenumber (telenumber) {
  let isTelenumberReg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
  return isTelenumberReg.test(telenumber)
}
