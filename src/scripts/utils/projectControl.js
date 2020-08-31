
/**
 * Created with WebStorm
 * @ Name:      projectControl.js
 * @ Author:    RuiChen
 * @ Date:      Created in 下午5:22 20-7-17
 * @ Modified By:
 * @ Description:
 */

// 用于部署使用的代理api,1:代理;2:表示火灾
// 开发环境只用api切换代理
const projectFlag = 1

export function getAPINameByProjectFlag () {
  switch (projectFlag) {
    case 1:
      return '/api'
    case 2:
      return '/apiF'
  }
}
