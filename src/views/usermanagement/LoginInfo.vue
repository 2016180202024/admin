<template>
  <el-card shadow="hover" style="margin-top:3vh;margin-left: 2vw;margin-right: 2vw">
    <div slot="header" class="clearfix">
      <el-col :span="14">
        <strong>登录信息管理</strong>
      </el-col>
      <el-col :span="10">
        <el-input
          style="width: 80%"
          v-model="searchContent"
          @keyup.enter.native="getLoginInfo"
          size="small"
          placeholder="输入关键字搜索(手机号)"/>
        <el-button
          style="width: 15%"
          type="primary"
          size="small" @click="getLoginInfo">搜索
        </el-button>
      </el-col>
    </div>
    <div>
      <template>
        <el-table
          :data="loginInfoData"
          v-loading="loginInfoDataLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(200, 200, 200, 0.8)"
          style="width: 100%"
          max-height="600px"
          stripe>
          <el-table-column
            type="index"
            fixed
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="adminPhone"
            fixed
            label="电话"
            width="150">
          </el-table-column>
          <el-table-column
            prop="ip"
            label="ip"
            width="150">
          </el-table-column>
          <el-table-column
            prop="platform"
            label="登录平台"
            width="100">
          </el-table-column>
          <el-table-column
            prop="browser"
            label="登录浏览器"
            width="200">
          </el-table-column>
          <el-table-column
            prop="state"
            label="登录状态"
            width="150">
          </el-table-column>
          <el-table-column
            prop="loginTime"
            label="登录时刻"
            width="200">
          </el-table-column>
          <el-table-column
            prop="logoutTime"
            label="登出时刻"
            width="200">
          </el-table-column>
          <el-table-column
            prop="loginDuration"
            label="登录总时间"
            width="200">
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[1, 5, 10, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="loginDataSize">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import {queryLoginInfo} from '../../scripts/api/user'
import {showMessage} from '../../scripts/utils/utils'

export default {
  name: 'LoginInfo',
  data () {
    return {
      loginDataSize: 10,
      loginInfoDataLoading: false,
      searchContent: '',
      pageSize: 10,
      currentPage: 1,
      loginInfoData: [
        {
          adminPhone: '18053007962',
          ip: '116.168.1.1',
          platform: 'web',
          browser: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
          state: '1',
          loginTime: '2020-1-1 12:00:00',
          logoutTime: '2020-1-1 13:10:10',
          loginDuration: '1h 10m 10s'
        }
      ]
    }
  },
  methods: {
    getLoginInfo: function () {
      this.loginInfoDataLoading = true
      let queryLoginInfoReq = {
        searchContent: this.searchContent,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      queryLoginInfo(queryLoginInfoReq).then((response) => {
        if (response.data.success) {
          this.$message({
            message: '查询成功！',
            type: 'success'
          })
          if (response.data.message.indexOf('size') >= 0) {
            this.loginDataSize = parseInt(response.data.message.split(':')[1])
          } else {
            showMessage(this, response.data.message, 'error')
          }
          this.loginInfoData = response.data.entity
        }
      }).catch((error) => {
        this.$message.error(error)
      }).finally(() => {
        this.loginInfoDataLoading = false
      })
    },
    handleSizeChange: function (newSize) {
      this.pageSize = newSize
      this.getLoginInfo()
    },
    handleCurrentChange: function (newPage) {
      this.currentPage = newPage
      this.getLoginInfo()
    }
  },
  mounted () {
    this.getLoginInfo()
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.pagination {
  margin-top: 20px;
}
</style>
