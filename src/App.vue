<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {getExpiry, getPhone, getToken, removeAllToken} from './scripts/utils/authUtils'
import {sendLogin} from './scripts/utils/userUtils'
import {showMessage, detectBrowserZoom} from './scripts/utils/utils'
import {getAPINameByProjectFlag} from './scripts/utils/projectControl'

export default {
  name: 'App',
  mounted () {
    document.title = '后台管理系统——森林和草原火灾预警监测大数据平台'
    this.init()
    this.detectBrowserZoomShow()

    /**
     * 监听浏览器关闭或关闭事件
     * 当浏览器刷新将时，触发unload事件，此时，先sendLogout,然后在加载App.vue时，sendLogin
     * 当浏览器关闭时，触发unload事件，仅运行sendLogout
     **/
    window.addEventListener('unload', () => {
      this.sendBeaconLogout()
    })
  },
  beforeCreate () {
    // 避免加载其他组件，需要在App创建前实现路由调转
    // this.$router.push('/login')
  },
  methods: {
    init: function () {
      if (getExpiry() > new Date().getTime()) {
        if (getToken() !== null) {
          sendLogin(getPhone(), this)
        }
      } else {
        removeAllToken()
      }
    },
    detectBrowserZoomShow: function () {
      let ratio = detectBrowserZoom()
      if (ratio !== 100) {
        this.$confirm('浏览器当前窗口缩放比例为' + ratio + '%，建议调整至100%显示！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {

        }).catch(() => {
          showMessage(this, '已取消操作', 'info')
        })
      }
    },
    sendBeaconLogout: function () {
      const url = getAPINameByProjectFlag() + '/user_foreend/logout/status'
      let formData = new FormData()
      formData.append('Authorization', getToken())
      formData.append('platform', 'admin')
      // 使用此方法在可在浏览器关闭前发送数据
      navigator.sendBeacon(url, formData)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 100%;
  position: relative;
  margin: 0 auto;
  min-width: 100%;
  width: 100%;
}
</style>
