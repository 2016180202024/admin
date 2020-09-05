/**
 * Created with WebStorm
 * @ Name:      user.js
 * @ Author:    RuiChen
 * @ Date:      Created in 上午9:11 19-8-15
 * @ Modified By:
 * @ Description:
 */
import {auth, login, auth4IdentifyCode} from '../../scripts/api/login'
import {
  getToken,
  setAvatar as avatarToSession,
  setExpiry,
  setPhone as phoneToSession,
  setToken as tokenToSession,
  setUserName as userNameToSession,
  setUserRole,
  setUserRoleId
} from '../../scripts/utils/authUtils'
import { Message } from 'element-ui'

const user = {
  state: {
    token: '',
    username: '',
    avatar: require('../../../static/image/avatar_default.png'),
    role: '',
    roleId: 0,
    phone: '',
    mail: '',
    password: '',
    age: ''
  },
  mutations: {
    SET_AGE: (state, age) => {
      state.age = age
    },
    SET_TOKEN: (state, token) => {
      // setToken(token)
      state.token = token
    },
    SET_USERNAME: (state, name) => {
      // setLoginStatus(true)
      // setUserName(name)
      state.username = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_MAIL: (state, mail) => {
      state.mail = mail
    },
    SET_ROLE_ID: (state, roleId) => {
      state.roleId = roleId
    }
  },
  actions: {
    setAge (context, data) {
      context.commit('SET_AGE', data)
    },
    setAvatar (context, data) {
      context.commit('SET_AVATAR', data)
    },
    setToken (context, data) {
      context.commit('SET_TOKEN', data)
    },
    setRole (context, data) {
      context.commit('SET_ROLE', data)
    },
    setUserName (context, data) {
      context.commit('SET_USERNAME', data)
    },
    setRoleId (context, data) {
      context.commit('SET_ROLE_ID', data)
    },
    setPhone (context, data) {
      context.commit('SET_PHONE', data)
    },
    // 登录
    Login ({commit}, option) {
      return new Promise((resolve, reject) => {
        /* 调用api中的request方法从从后端中获取数据,先POST请求获取令牌（TOKEN） */
        login(option).then(response => {
          console.log(response)
          let roleId = 0
          if (response.status === 200) {
            let data = response.data
            let status = response.status
            let role = ''
            let expectedRole = ''

            if (data.isAuth === -2) {
              resolve(data.isAuth)
              return
            } else {
              if (data.role === 1) {
                expectedRole = '普通用户'
                role = '普通用户'
                roleId = 1
                commit('SET_IF_AUTH_ROLE', true)
              } else if (data.role === 2) {
                expectedRole = '专家用户'
                if (data.isAuth !== 1) {
                  // 授权未通过、未审核
                  role = '普通用户'
                  roleId = 1
                  commit('SET_IF_AUTH_ROLE', false)
                } else {
                  roleId = 2
                  role = '专家用户'
                  commit('SET_IF_AUTH_ROLE', true)
                }
              } else if (data.role === 3) {
                expectedRole = '管理员用户'
                // 管理员用户
                if (data.isAuth !== 1) {
                  // 授权未通过、未审核
                  role = '专家用户'
                  roleId = 2
                  commit('SET_IF_AUTH_ROLE', false)
                } else {
                  roleId = 3
                  role = '管理员用户'
                  commit('SET_IF_AUTH_ROLE', true)
                }
              }
            }

            if (roleId !== 3) {
              status = -3
            }

            commit('SET_PHONE', data.phone)
            commit('SET_MAIL', data.mail)
            commit('SET_USERNAME', data.userName)
            commit('SET_EXPECTED_ROLE', expectedRole)
            commit('SET_ROLE', role)
            commit('SET_ROLE_ID', roleId)
            commit('SET_IS_AUTH', data.isAuth)
            commit('SET_AVATAR', data.avatar)
            // 防止token刷新后丢失
            commit('SET_TOKEN', getToken())
            // 存入session
            setUserRole(role)
            setUserRoleId(roleId)
            userNameToSession(data.userName)
            phoneToSession(data.phone)
            avatarToSession(data.avatar)

            resolve(status)
          } else {
            resolve(response.status)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 登录授权token
    Auth ({commit}, AuthReq) {
      return new Promise((resolve, reject) => {
        /* 调用api中的request方法从从后端中获取数据,先POST请求获取令牌（TOKEN） */
        auth(AuthReq).then(response => {
          if (response.status === 200) {
            let data = response.data
            tokenToSession(data.authToken)
            setExpiry(data.expiry)

            // 全局变量
            commit('SET_TOKEN', data.authToken)
          }
          resolve(response)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    },
    // 登录授权token
    Auth4IdentifyCode ({commit}, AuthReq4IdentifyCode) {
      return new Promise((resolve, reject) => {
        /* 调用api中的request方法从从后端中获取数据,先POST请求获取令牌（TOKEN） */
        auth4IdentifyCode(AuthReq4IdentifyCode).then(response => {
          if (response.status === 200) {
            let data = response.data
            if (data === false) {
              Message.error('短信验证码错误')
            } else {
              tokenToSession(data.authToken)
              setExpiry(data.expiry)
              // 全局变量
              commit('SET_TOKEN', data.authToken)
            }
          }
          resolve(response)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}

export default user
