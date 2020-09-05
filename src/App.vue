<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {getExpiry, getPhone, getToken, removeAllToken} from './scripts/utils/authUtils'
import {sendLogin} from './scripts/utils/userUtils'
import {showMessage, detectBrowserZoom} from './scripts/utils/utils'
export default {
  name: 'App',
  mounted () {
    document.title = '后台管理系统——森林和草原火灾预警监测大数据平台'
    this.init()
    this.detectBrowserZoomShow()
  },
  beforeCreate () {
    // 避免加载其他组件，需要在App创建前实现路由调转
    this.$router.push('/login')
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
