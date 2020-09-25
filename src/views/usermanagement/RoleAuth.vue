<template>
    <el-card shadow="hover" style="margin-top:3vh;margin-left: 2vw;margin-right: 2vw">
        <div slot="header" class="clearfix">
            <el-col :span="16">
                <el-tabs class="role-auth-tab" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="待审核" name="authing"></el-tab-pane>
                    <el-tab-pane label="已授权" name="authed"></el-tab-pane>
                    <el-tab-pane label="未授权" name="notAuth"></el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="8" style="margin-top: 3%">
                <el-input
                        style="width: 80%"
                        v-model="authUserInfoSearchContent"
                        size="small"
                        @keyup.enter.native="authUserInfoSearch"
                        placeholder="输入关键字搜索(用户名/手机号/邮箱/姓名/单位)"/>
                <el-button
                        style="width: 15%"
                        type="primary"
                        size="small" @click="authUserInfoSearch">搜索
                </el-button>
            </el-col>
        </div>
        <div>
            <template>
                <el-table
                        :data="authUserInfoData"
                        v-loading="authUserInfoDataLoading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(200, 200, 200, 0.8)"
                        type="index"
                        style="width: 100%"
                        @filter-change="authUserInfoDataFilterChange">
                    <el-table-column
                      type="index"
                      fixed
                      label="序号"
                      width="50">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="电话"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="用户名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="mail"
                            label="邮箱"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="roleName"
                            label="用户类型"
                            width="120"
                            column-key="roleName"
                            :filters="[{ text: '普通用户', value: '普通用户' },{ text: '专家用户', value: '专家用户' }, { text: '管理员用户', value: '管理员用户' }]"
                            filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column
                            prop="realName"
                            label="真实姓名"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="IdCardNumber"
                            label="身份证号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="organization"
                            label="单位"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="300">
                        <template slot-scope="scope">
                           <div  v-if="activeName==='authing'" class="operation">
                               <el-col :span="8">
                                   <el-button size="small" type="primary" @click="handleEdit(scope.$index,scope.row)">查看
                                   </el-button>
                               </el-col>
                               <el-col :span="8">
                                   <el-button size="small" type="success" @click="handleAuthUser(scope.$index,scope.row)">同意
                                   </el-button>
                               </el-col>
                               <el-col :span="8">
                                   <el-button size="small" type="danger" @click="refuseAuthUser(scope.$index,scope.row)">拒绝
                                   </el-button>
                               </el-col>
                           </div>
                            <div v-if="activeName==='authed'" class="operation">
                                <el-col :span="12">
                                    <el-button size="small" type="primary" @click="handleEdit(scope.$index,scope.row)">查看
                                    </el-button>
                                </el-col>
                                <el-col :span="12">
                                    <el-button size="small" type="danger" @click="refuseAuthUser(scope.$index,scope.row)">取消授权
                                    </el-button>
                                </el-col>
                            </div>
                            <div v-if="activeName==='notAuth'" class="operation">
                                <el-col :span="12">
                                    <el-button size="small" type="primary" @click="handleEdit(scope.$index,scope.row)">查看
                                    </el-button>
                                </el-col>
                                <el-col :span="12">
                                    <el-button size="small" type="success" @click="handleAuthUser(scope.$index,scope.row)">恢复授权
                                    </el-button>
                                </el-col>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination
                        background
                        :current-page="authUserInfoPageIndex"
                        :page-size="authUserInfoPageSize"
                        @current-change="handleCurrentPageChange"
                        layout="total, prev, pager, next, jumper"
                        :total="authUserInfoDataSize">
                </el-pagination>
            </div>
            <!--    填写不通过理由  、、、、、、、、、、、 -->
            <el-dialog
                    title="审核不通过理由："
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-input v-model="description" placeholder="请输入内容" type="textarea"></el-input>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="confirmRefuseAuthUser">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </el-card>
</template>

<script>
import {queryAuthUserInfo, authUser} from '../../scripts/api/user'
import {showMessage} from '../../scripts/utils/utils'
import {mapGetters} from 'vuex'

export default {
  name: 'RoleAuth',
  data () {
    return {
      activeName: 'authing',
      authUserInfoData: [
        {
          phone: '18682598854',
          userName: 'ruirui',
          mail: '2809958532@qq.com',
          roleName: '专家用户',
          realName: '陈瑞',
          IdCardNumber: '511523199708182094',
          organization: '电子科技大学'
        }
      ],
      authUserInfoSearchContent: '',
      authUserInfoDataLoading: false,
      authUserInfoPageIndex: 1,
      authUserInfoPageSize: 10,
      authUserInfoDataSize: 0,
      filterRoleName: [],
      dialogVisible: false,
      description: '',
      currentRow: null
    }
  },
  computed: {
    ...mapGetters(['phone'])
  },
  mounted () {
    this.getAuthUserInfo(1)
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    getAuthUserInfo: function (pageIndex) {
      this.authUserInfoDataLoading = true
      let queryAuthUserInfoReq = {
        adminPhone: this.phone,
        page: pageIndex,
        pageSize: this.authUserInfoPageSize,
        searchContent: this.authUserInfoSearchContent,
        roleName: this.filterRoleName,
        isAuth: this.getIsAuth(this.activeName)
      }
      queryAuthUserInfo(queryAuthUserInfoReq).then((response) => {
        if (response.data.success) {
          if (response.data.message.indexOf('size') >= 0) {
            this.authUserInfoDataSize = parseInt(response.data.message.split(':')[1])
          } else {
            showMessage(this, response.data.message, 'error')
          }

          this.authUserInfoData = response.data.entity
          // this.setCurrentPageData(1)
        }
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.authUserInfoDataLoading = false
      })
    },
    handleCurrentPageChange: function (page) {
      this.setCurrentPageData(page)
    },
    setCurrentPageData: function (page) {
      this.getAuthUserInfo(page)
    },
    getIsAuth: function (activeName) {
      switch (activeName) {
        case 'authing':
          return 0
        case 'authed':
          return 1
        case 'notAuth':
          return -1
        default:
          return 0
      }
    },
    authUserInfoDataFilterChange: function (filter) {
      // 判断现有的筛选条件
      if (filter.hasOwnProperty('roleName')) {
        this.filterRoleName = filter.roleName
      }
      this.getAuthUserInfo(1)
    },
    authUserInfoSearch: function () {
      this.getAuthUserInfo(1)
    },
    handleAuthUser: function (index, row) {
      let targetRoleState = 1
      this.currentRow = row
      this.sendAuthUser(targetRoleState)
    },
    confirmRefuseAuthUser: function () {
      this.dialogVisible = false
      let targetRoleState = -1
      this.sendAuthUser(targetRoleState)
    },
    refuseAuthUser: function (index, row) {
      this.dialogVisible = true
      this.currentRow = row
    },
    sendAuthUser: function (targetRoleState) {
      let authUserReq = {
        adminPhone: this.phone,
        handlePhone: this.currentRow.phone,
        roleName: this.currentRow.roleName,
        nowRoleState: this.getIsAuth(this.activeName),
        targetRoleState: targetRoleState,
        description: this.description
      }
      authUser(authUserReq).then((response) => {
        if (response.data.success) {
          showMessage(this, '修改成功', 'success')
          this.getAuthUserInfo(this.authUserInfoPageIndex)
        } else {
          showMessage(this, '处理失败', 'success')
        }
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
      })
    }

  },
  watch: {
    activeName: function (newValue, oldValue) {
      this.getAuthUserInfo(1)
    }
  }
}
</script>

<style scoped lang="scss">
.role-auth-tab{
    background-color: #fff;
    border-radius: 3px;
    /deep/ .el-tabs__header{
        margin: 20px 20px 0 20px;
    }
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.operation .el-col{
    text-align: center;
}
</style>
