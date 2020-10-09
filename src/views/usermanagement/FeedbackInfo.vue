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
          @keyup.enter.native="getFeedbackInfo"
          size="small"
          placeholder="输入关键字搜索(手机号)"/>
        <el-button
          style="width: 15%"
          type="primary"
          size="small" @click="getFeedbackInfo">搜索
        </el-button>
      </el-col>
    </div>
    <div>
      <template>
        <el-table
          :data="feedbackInfoData"
          v-loading="feedbackInfoDataLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(200, 200, 200, 0.8)"
          style="width: 100%"
          max-height="600px"
          stripe
          @filter-change="handleFilterChange">
          <el-table-column
            type="index"
            fixed
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="phone"
            fixed
            label="电话"
            width="150">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="100"
            column-key="type"
            :filters="[{text: '网站内容', value: 1}, {text: '服务质量', value: 2},
                {text: '系统bug', value: 3}, {text: '其他', value: 4}]">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="反馈时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="content"
            label="反馈信息"
            width="250">
          </el-table-column>
          <el-table-column
            label="反馈图片"
            width="200">
            <template slot-scope="scope">
              <el-image class="img" v-for="(item, index) in scope.row.images"
                        :key='index' style="width: 30px; height: 30px"
                        :src="item" :preview-src-list="[item]">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="是否已读"
            width="150"
            fixed="right"
            column-key="isRead"
            :filters="[{text: '未读', value: 0}, {text: '已读', value: 1}]">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isRead"
                :active-value='1'
                :inactive-value='0'
                active-text="已读"
                inactive-text="未读"
                @change="handleIsRead(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="反馈处理"
            width="100"
            fixed="right">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleFeedback(scope.$index,scope.row)">回复
              </el-button>
            </template>
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
        :total="feedbackInfoDataSize">
      </el-pagination>
    </div>
    <div>
      <el-dialog
        title="用户反馈回复信息："
        :visible.sync="dialogVisible"
        width="30%">
        <el-input v-model="description" placeholder="请输入内容" type="textarea" autosize></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendReplyInfo">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import {queryFeedbackInfo, updateFeedbackInfo} from '../../scripts/api/user'
import {showMessage} from '../../scripts/utils/utils'

export default {
  name: 'FeedbackInfo',
  data () {
    return {
      feedbackInfoDataSize: 10,
      feedbackInfoDataLoading: false,
      searchContent: '',
      pageSize: 10,
      currentPage: 1,
      typeSearch: [1, 2, 3, 4],
      isReadSearch: [0, 1],
      dialogVisible: false,
      description: '',
      feedbackInfoData: [
        {
          phone: '18053007962',
          id: 11,
          type: '系统bug',
          content: '数据生产不完全！',
          createTime: '2020-1-1 12:00:00',
          images: [
            '../../../static/image/fire_logo.png',
            '../../../static/image/avatar_default.png'
          ],
          isRead: 0
        }
      ]
    }
  },
  methods: {
    getFeedbackInfo: function () {
      this.feedbackInfoDataLoading = true
      let queryFeedbackInfoReq = {
        searchContent: this.searchContent,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        typeSearch: this.typeSearch,
        isReadSearch: this.isReadSearch
      }
      queryFeedbackInfo(queryFeedbackInfoReq).then((response) => {
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
          this.feedbackInfoData = response.data.entity
        }
      }).catch((error) => {
        this.$message.error(error)
      }).finally(() => {
        this.feedbackInfoDataLoading = false
      })
    },
    handleSizeChange: function (newSize) {
      this.pageSize = newSize
      this.getFeedbackInfo()
    },
    handleCurrentChange: function (newPage) {
      this.currentPage = newPage
      this.getFeedbackInfo()
    },
    handleIsRead: function (row) {
      let updateIsReadReq = {
        feedbackId: row.id,
        isRead: row.isRead,
        flag: 1// flag=1，示意为修改；flag=2，示意删除
      }
      updateFeedbackInfo(updateIsReadReq).then((response) => {
        if (response.data.success) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          row.isRead = (row.isRead === 0) ? 0 : 1
        } else {
          this.$message({
            message: '修改失败，请联系工作人员！',
            type: 'error'
          })
          row.isRead = (row.isRead === 0) ? 1 : 0
        }
      }).catch((error) => {
        this.$message.error(error)
        this.$message({
          message: '修改失败，请联系工作人员！',
          type: 'error'
        })
        row.isRead = (row.isRead === 0) ? 1 : 0
      })
    },
    handleFilterChange: function (filter) {
      if (filter.hasOwnProperty('isRead')) {
        this.isReadSearch = filter.isRead
      }
      if (filter.hasOwnProperty('type')) {
        this.typeSearch = filter.type
      }
      this.getFeedbackInfo()
    },
    handleFeedback: function (index, row) {
      this.dialogVisible = true
    }
    /*  删除该条数据
    handleDeleteInfo: function (row) {
      let deleteFeedbackInfoReq = {
        feedbackId: row.feedbackId,
        flag: '2'   //  flag=2,示意为删除
      }
      updateFeedbackInfo(deleteFeedbackInfoReq).then((response) => {
        if (response.data.success) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getFeedbackInfo()
        }
        else {
          showMessage(this, response.data.message, 'error')
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    }
    */
  },
  mounted () {
    this.getFeedbackInfo()
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
.operation .el-col{
  text-align: center;
}
</style>
