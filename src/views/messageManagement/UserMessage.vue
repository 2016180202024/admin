<template>
  <el-card shadow="hover" style="margin-top:3vh;margin-left: 2vw;margin-right: 2vw">
    <div slot="header" class="clearfix">
      <div>
        <strong>用户消息发布</strong>
      </div>
      <div>
        <el-tabs class="message-tab" v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="个人消息发布" name="person"></el-tab-pane>
          <el-tab-pane label="群体消息发布" name="all"></el-tab-pane>
          <el-tab-pane label="历史消息查看" name="history"></el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="activeName!=='history'" class="message-form">
        <template>
          <el-form ref="personForm" :model="personForm" label-width="80px" :rules="rules">
            <el-form-item v-if="activeName==='person'" label="用户电话" prop="phone">
              <el-autocomplete
                style="width: 500px"
                v-model="personForm.phone"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect">
                <template slot-scope="{ item }">
                  <span>{{ item.phone }}</span>
                  <span>{{ item.realName }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item v-if="activeName==='all'" label="用户电话">
              <el-input placeholder="all" v-model="personForm.phone" :disabled="true" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="消息标题" prop="title">
              <el-input placeholder="请输入标题" style="width: 500px" v-model="personForm.title" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="消息内容" prop="content">
              <el-input type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        style="width: 500px"
                        v-model="personForm.content"
                        placeholder="请输入内容">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="personFormSubmit">立即发布</el-button>
            </el-form-item>
          </el-form>
        </template>
      </div>
      <div v-if="activeName==='history'" class="message-table">
        <el-table
          :data="sendInfoData"
          v-loading="dataLoading"
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
            prop="phone"
            fixed
            label="用户电话"
            width="150">
          </el-table-column>
          <el-table-column
            prop="title"
            label="消息标题"
            width="200">
          </el-table-column>
          <el-table-column
            prop="content"
            label="消息内容"
            width="400">
          </el-table-column>
          <el-table-column
            prop="isRead"
            label="是否已读"
            width="150">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="发布时间"
            width="150">
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[1, 5, 10, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="infoDataSize">
          </el-pagination>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import {mapGetters} from 'vuex'
import {queryHistoryInfo, queryPhoneInfo, releaseSystemMessage} from '../../scripts/api/user'

export default {
  name: 'UserMessage',
  data () {
    return {
      activeName: 'person',
      dataLoading: true,
      infoDataSize: 0,
      currentPage: 1,
      pageSize: 10,
      sendInfoData: [
        {
          phone: '',
          title: '',
          content: '',
          isRead: '',
          createTime: ''
        }
      ],
      userData: [
        {
          phone: '',
          realName: ''
        }
      ],
      personForm: {
        phone: '',
        title: '',
        content: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入您要发送消息的用户电话', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入您要发送消息的标题', trigger: 'blur' },
          { max: 20, message: '长度在 20 个字符以内', trigger: 'blur' }
        ],
        content: [
          {required: true, message: '请输入您要发送消息的内容', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    querySearch (queryString, cb) {
      let userData = this.userData
      let results = queryString ? userData.filter(this.createFilter(queryString)) : userData
      let queryUserInfoReq = {
        phone: queryString
      }
      queryPhoneInfo(queryUserInfoReq).then((response) => {
        if (response.data.success) {
          this.userData = response.data.entity
          // 调用 callback 返回建议列表的数据
          cb(results)
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    createFilter (queryString) {
      return (userData) => {
        return (userData.phone.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    personFormSubmit () {
      console.log(this.phone)
      let releaseSystemMessageReq = {
        phone: this.personForm.phone,
        title: this.personForm.title,
        content: this.personForm.content,
        source: this.phone
      }
      this.$confirm('此操作将发送该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        releaseSystemMessage(releaseSystemMessageReq).then((response) => {
          if (response.data.success) {
            this.$message({
              type: 'success',
              message: '发布成功!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '系统原因，发布失败！'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布！'
        })
      })
    },
    handleSelect: function (item) {
      this.personForm.phone = item.phone
    },
    handleSizeChange: function (newSize) {
      this.pageSize = newSize
      this.queryHistoryInfo()
    },
    handleCurrentChange: function (newPage) {
      this.currentPage = newPage
      this.queryHistoryInfo()
    },
    queryHistoryInfo: function () {
      let queryHistoryInfoReq = {
        source: this.sourcePhone,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }
      queryHistoryInfo(queryHistoryInfoReq).then((response) => {
        if (response.data.success) {
          this.sendInfoData = response.data.entity
          this.dataLoading = false
          this.infoDataSize = parseInt(response.data.message.split(':')[1])
        }
      })
    },
    handleTabClick: function (tab, event) {
      if (tab.name === 'person') {
        this.personForm.phone = ''
      }
      if (tab.name === 'all') {
        this.personForm.phone = 'all'
      }
      if (tab.name === 'history') {
        this.queryHistoryInfo()
      }
    }
  },
  computed: {
    ...mapGetters(['phone'])
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
.message-tab{
  background-color: #fff;
  border-radius: 3px;
  margin-top: 20px;
  margin-bottom: 50px;
}
.message-form{
  margin-left: 100px;
}
.message-table{
  margin-top: -30px;
  margin-left: 20px;
}
.pagination {
  margin-top: 30px;
}
</style>
