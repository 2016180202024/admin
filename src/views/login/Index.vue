<template>
    <div class="login-view">
        <div class="title">
            <strong style="font-size: 32pt;">后台管理</strong><br/>
            <strong style="font-size: 24pt;">森林和草原火灾预警监测大数据平台</strong>
        </div>
        <Login></Login>
    </div>
</template>

<script>
import Login from './Login'
export default {
  name: 'Index',
  components: {Login}
}
</script>

<style scoped lang="scss">
    .login-view{
        background-color: #2c3e50;
        width: 100%;
        height: 100%;
    }
    .title{
        background: none;
        width: 100%;
        position: absolute;
        text-align: center;
        height: 20%;
        top: 15%;
        color: #fff;
        float: left;
    }
</style>
