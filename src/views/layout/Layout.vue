<template>
    <div class="layout-admin">
        <el-container>
            <el-header class="layout-header">
                <img style="height:58px" src="static/image/fire_logo.png">
                <strong>后台管理——森林和草原火灾风险预警大数据平台</strong>
            </el-header>
            <el-container>
                <el-aside width="300px" class="aside-menu">
                    <el-menu
                            default-active="/usermanagement/index"
                            class="el-menu-vertical-demo"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            :router=true>
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user-solid"></i>
                                <span>用户管理</span>
                            </template>
                                <el-menu-item index="/usermanagement/index"><i class="el-icon-reading"></i>用户信息</el-menu-item>
                                <el-menu-item index="/usermanagement/roleAuth"><i class="el-icon-bank-card"></i>角色审核</el-menu-item>
                                <el-menu-item index="/usermanagement/loginInfo"><i class="el-icon-data-analysis"></i>登录信息</el-menu-item>
                                <el-menu-item index="/usermanagement/feedbackInfo"><i class="el-icon-data-analysis"></i>反馈信息</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">消息管理</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                          <i class="el-icon-menu"></i>
                          <span slot="title">系统管理</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-document"></i>
                            <span slot="title">数据管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      activeMenuIndex: '1-1'
    }
  },
  mounted () {
    this.$router.push('/usermanagement/index')
  }
}
</script>

<style scoped lang="scss">
.layout-admin{
    background-color: #3a8ee6;
    width: 100%;
    height: 100%;

    /deep/ section{
        height: 100%;
    }
}
    .layout-header{
        background-color: #393d49;
        color: #f0f8ff;
        height: 80px!important;
        line-height: 80px;
        word-break: keep-all;
        white-space: nowrap;
        font-size: 20px;
        padding-left: 15px;
        padding-right: 15px;
        border-bottom: double;
        border-width: 2px;
        border-color: #5e6565;
    }

    .aside-menu{
        background-color: gray;
        border-right: solid 1px #e6e6e6;

        /deep/ .el-menu{
            border:none;
        }
    }
</style>
