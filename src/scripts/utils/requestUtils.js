
/**
 * Created with WebStorm
 * @ Name:      requestUtils.js
 * @ Author:    RuiChen
 * @ Date:      Created in 下午5:19 20-7-17
 * @ Modified By:
 * @ Description:
 */

import axios from 'axios'

// 创建axios实例, 实例中不设置base_url属性,因为要使用proxyTable跨域
const service = axios.create({
  timeout: 300000 // 请求超时时间
})

service.ontimeout = function handleTimeout () {
  console.log('请求超时！')
}
// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器,需要根据需求自己写，源代码是根据后端返回的data中的code属性进行拦截的

export default service
