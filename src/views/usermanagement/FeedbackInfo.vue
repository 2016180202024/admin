<template>
  <el-card shadow="hover" style="margin-top:3vh;margin-left: 2vw;margin-right: 2vw">
    <div slot="header" class="clearfix">
      <el-col :span="14">
        <strong>反馈信息管理</strong>
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
            width="150">
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
export default {
  name: "FeedbackInfo"
}
</script>

<style scoped>

</style>
