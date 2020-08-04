/**
 * Created with WebStorm
 * @ Name:      utils.js
 * @ Author:    RuiChen
 * @ Date:      Created in 上午11:49 19-9-5
 * @ Modified By:
 * @ Description:
 */

export function showMessage (self, message, type) {
  self.$message({
    showClose: true,
    message: message,
    type: type
  })
}

// 添加加载loading

export function showLoading (self, target) {
  if (target != null) {
    let loading = self.$loading({
      lock: true,
      target: target,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(200, 200, 200, 0.7)'
    })
    return loading
  } else {
    let loading = self.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(200, 200, 200, 0.7)'
    })
    return loading
  }
}

// 改变鼠标样式

export function setCursorById (id, cursorStyle) {
  if (document.getElementById(id)) {
    if (document.getElementById(id).style) {
      document.getElementById(id).style.cursor = cursorStyle
    }
  }
}

/**
 * @description 监测用户浏览器缩放比例
 * @returns {number}
 */

export function detectBrowserZoom () {
  let ratio = 0
  let screen = window.screen
  let ua = navigator.userAgent.toLowerCase()

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth
  }

  if (ratio) {
    ratio = Math.round(ratio * 100)
  }
  return ratio
}
