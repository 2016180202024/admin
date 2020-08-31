/**
 * Created with WebStorm
 * @ Name:      getters.js
 * @ Author:    RuiChen
 * @ Date:      Created in 下午9:09 19-8-13
 * @ Modified By:
 * @ Description:
 */

const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  role: state => state.user.role,
  roleId: state => state.user.roleId,
  phone: state => state.user.phone,
  mail: state => state.user.mail,
  age: state => state.user.age,
  password: state => state.user.password
}

export default getters
