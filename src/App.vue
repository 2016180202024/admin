<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    document.title = this.title
    document.title = '后台管理系统——森林和草原火灾预警监测大数据平台'
  },
  beforeCreate () {
    // 避免加载其他组件，需要在App创建前实现路由调转
    this.$router.push('/usermanagement')
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
