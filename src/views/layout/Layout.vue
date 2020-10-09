<template>
    <div class="layout-admin">
        <el-container>
            <el-header class="layout-header">
                <img style="height:58px" src="static/image/fire_logo.png">
                <strong>后台管理——森林和草原火灾风险预警大数据平台</strong>
                <div class="header-userInfo">
                    <a class="el-link el-link--primary is-underline"><i class="el-icon-user"></i><span class="el-link--inner">{{username}}</span></a>
                    <a style="margin-left: 20px" title="注销账号" class="el-link el-link--primary is-underline" @click="toLogout"><i class="el-icon-s-release">注销</i></a>
                </div>
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
                        <el-submenu index="2">
                          <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>消息管理</span>
                          </template>
                          <el-menu-item index="/messageManagement/userMessage"><i class="el-icon-reading"></i>用户消息发送</el-menu-item>
                          <el-menu-item index="/messageManagement/warningMessage"><i class="el-icon-bank-card"></i>预警消息发送</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                          <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>系统管理</span>
                          </template>
                          <el-menu-item index="/systemManagement/serviceManagement"><i class="el-icon-reading"></i>服务监控</el-menu-item>
                          <el-menu-item index="/systemManagement/operationManagement"><i class="el-icon-bank-card"></i>运行监控</el-menu-item>
                          <el-menu-item index="/systemManagement/serviceLaunch"><i class="el-icon-bank-card"></i>服务启动</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                          <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>数据管理</span>
                          </template>
                          <el-menu-item index="/dataManagement/produceManagement"><i class="el-icon-reading"></i>数据生产监控</el-menu-item>
                          <el-menu-item index="/dataManagement/orderManagement"><i class="el-icon-bank-card"></i>订单生产监控</el-menu-item>
                        </el-submenu>
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
import {mapGetters} from 'vuex'
import {setLogoutStatus} from '../../scripts/api/user'
import {removeAllToken} from '../../scripts/utils/authUtils'
import {removeUserInfo} from '../../scripts/utils/userUtils'
import {showMessage} from '../../scripts/utils/utils'

export default {
  name: 'Layout',
  data () {
    return {
      activeMenuIndex: '1-1'
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  mounted () {
    this.$router.push('/usermanagement/index')
  },
  methods: {
    toLogout: function () {
      this.$confirm('将退出登录，刷新页面，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        setLogoutStatus()
        removeAllToken()
        removeUserInfo(this)
        this.$router.push('/')
      }).catch(() => {
        showMessage(this, '已取消操作', 'info')
      })
    }
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
    .header-userInfo{
        right: 3.5vw;
        top: 4vh;
        position: absolute;
        height: auto;
        width: auto;
        line-height: normal;
    }
</style>
