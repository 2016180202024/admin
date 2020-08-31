<template>
    <div>
        <div>
            <el-row :gutter="30">
                <el-col :span="6" style="margin-left: 2vw">
                    <el-card shadow="hover" style="width:25vw;margin-top: 10px;">
                        <div class="user-info">
                            <img :src=avatarSrc class="user-avator" alt="">
                            <div class="user-info-cont">
                                <div class="user-info-name">{{name}}</div>
                                <div class="user-info-name" style="margin-top: 2vh">{{roleZh}}</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="5" style="margin-left: 6vw;margin-top: 6vh">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-1">
                            <i class="el-icon-view grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{totalViewCount}}次</div>
                                <div>用户访问量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="5" style="margin-top: 6vh">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-2">
                            <i class="el-icon-message grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{systemMessageCount}}条</div>
                                <div>系统消息</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="5" style="margin-top: 6vh">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-3">
                            <i class="el-icon-goods grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{systemDataCount}}T</div>
                                <div>数据量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-card shadow="hover" style="margin-top:3vh;margin-left: 2vw;margin-right: 2vw">
                    <div slot="header" class="clearfix">
                        <el-col :span="18">
                            <span>用户信息管理</span>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    style="width: 80%"
                                    v-model="userInfoSearchContent"
                                    size="small"
                                    @keyup.enter.native="userInfoSearch"
                                    placeholder="输入关键字搜索(用户名/手机号/邮箱)"/>
                            <el-button
                                    style="width: 15%"
                                    type="primary"
                                    size="small" @click="userInfoSearch">搜索
                            </el-button>
                        </el-col>
                    </div>
                    <div>
                        <template>
                            <el-table
                                    :data="userData"
                                    v-loading="userDataLoading"
                                    element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(200, 200, 200, 0.8)"
                                    style="width: 100%"
                                    :row-class-name="tableRowClassName"
                                    @filter-change="userDataFilterChange">
                                <el-table-column
                                        prop="phone"
                                        label="电话"
                                        width="200">
                                </el-table-column>
                                <el-table-column
                                        prop="userName"
                                        label="用户名"
                                        width="200">
                                </el-table-column>
                                <el-table-column
                                        prop="roleName"
                                        label="用户类型"
                                        width="200"
                                        column-key="roleName"
                                        :filters="[{ text: '普通用户', value: '普通用户' },{ text: '专家用户', value: '专家用户' }, { text: '管理员用户', value: '管理员用户' }]"
                                        filter-placement="bottom-end">
                                </el-table-column>
                                <el-table-column
                                        prop="mail"
                                        label="邮箱"
                                        width="250">
                                </el-table-column>
                                <el-table-column
                                        prop="roleState"
                                        label="授权状态"
                                        width="150"
                                        column-key="roleState"
                                        :filters="[{ text: '未授权', value: '未授权' }, { text: '待审核', value: '待审核' },{ text: '已授权', value: '已授权' }]"
                                        filter-placement="bottom-end">
                                </el-table-column>
                                <el-table-column
                                        prop="freezeFlag"
                                        label="用户状态"
                                        width="150"
                                        column-key="freezeFlag"
                                        :filters="[{ text: '正常', value: '正常' }, { text: '冻结', value: '冻结' }]"
                                        filter-placement="bottom-end">
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                    <template slot-scope="scope">
                                        <el-col :span="12">
                                            <el-button size="small" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑
                                            </el-button>
                                        </el-col>
                                        <el-col :span="12">
                                            <div v-if="scope.row.phone!==phone">
                                                <el-button v-if=" scope.row.freezeFlag==='正常'" @click="handleFreezeUser(scope.row)"
                                                           type="danger" size="small">冻结
                                                </el-button>
                                                <el-button v-else @click="handleFreezeUser(scope.row)" type="success"
                                                           size="small">
                                                    解冻
                                                </el-button>
                                            </div>
                                        </el-col>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <div class="block">
                            <el-pagination
                                    background
                                    :page-index="userPageIndex"
                                    :page-size="userPageSize"
                                    @current-change="handleCurrentPageChange"
                                    layout="total, prev, pager, next, jumper"
                                    :total="userDataSize">
                            </el-pagination>
                        </div>
                    </div>
                    <!-- 编辑弹出框 -->
                    <el-dialog :visible.sync="editVisible" style="width: 900px;margin-left: 300px;">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-row span="6">
                                <div style="font-size: 14px;">用户名：{{form.username}}</div>
                            </el-row>
                            <el-row span="6">
                                <div class="user-info-name">电话：{{form.phone}}</div>
                            </el-row>
                            <el-row span="6">
                                <div class="user-info-name">邮箱：{{form.mail}}</div>
                            </el-row>
                            <el-row span="6">
                                <div class="user-info-name">用户类型：{{form.roleName}}</div>
                            </el-row>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveEdit">确定</el-button>
                </span>
                    </el-dialog>
                </el-card>
            </el-row>
            <el-tooltip placement="top" content="回到顶部">
                <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50"
                             transition-name="fade"/>
            </el-tooltip>
    </div>
    </div>
</template>

<script>
import BackToTop from '../../components/BackToTop/index'
import {getToken} from '../../scripts/utils/authUtils'
import {freezeUser, querySimpleUserInfo} from '../../scripts/api/user'
import {mapGetters} from 'vuex'
import {showMessage} from '../../scripts/utils/utils'

export default {
  name: 'Index',
  components: {BackToTop},
  data () {
    return {
      avatarSrc: 'http://teamhe.uestc.edu.cn/fire/data/file/avatar/default/avatar.png',
      name: '陈瑞',
      roleZh: '管理员用户',
      userInfoSearchContent: '',
      totalViewCount: 1000,
      systemMessageCount: 100,
      systemDataCount: 20,
      userData: [],
      userDataLoading: false,
      filteredValue: {
        roleName: [],
        roleState: [],
        freezeFlag: []
      },
      myBackToTopStyle: {
        right: '10px',
        bottom: '20px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      userPageIndex: 1,
      userPageSize: 7,
      userDataSize: 0,
      form: {
        username: '',
        roleName: '',
        permission: '',
        phone: '',
        mail: '',
        currentRole: ''
      },
      editVisible: false,
      delVisible: false
    }
  },
  mounted () {
    this.getSimpleUserInfo(1)
  },
  computed: {
    ...mapGetters(['phone'])
  },
  methods: {
    tableRowClassName: function ({row, rowIndex}) {
      if (row.phone === this.phone) {
        return 'success-row'
      } else {
        return ''
      }
    },
    getSimpleUserInfo: function (pageIndex) {
      this.userDataLoading = true
      let querySimpleUserInfoReq = {
        adminPhone: this.phone,
        page: pageIndex,
        pageSize: this.userPageSize,
        searchContent: this.userInfoSearchContent,
        roleName: this.filteredValue.roleName,
        roleState: this.filteredValue.roleState,
        freezeFlag: this.filteredValue.freezeFlag
      }
      querySimpleUserInfo(querySimpleUserInfoReq).then((response) => {
        if (response.data.success) {
          if (response.data.message.indexOf('size') >= 0) {
            this.userDataSize = parseInt(response.data.message.split(':')[1])
          } else {
            showMessage(this, response.data.message, 'error')
          }

          this.userData = response.data.entity
          // this.setCurrentPageData(1)
        }
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.userDataLoading = false
      })
    },
    handleCurrentPageChange: function (page) {
      this.setCurrentPageData(page)
    },
    setCurrentPageData: function (page) {
      this.getSimpleUserInfo(page)
    },
    saveEdit: function () {

    },
    handleFreezeUser: function (row) {
      this.$confirm('该操作会改变用户冻结状态，是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let flag = 0
        let successMessage = ''
        if (row.freezeFlag === '正常') {
          flag = 1
          successMessage = '您已成功冻结' + row.phone + '用户'
        } else {
          flag = 0
          successMessage = '您已成功解除' + row.phone + '用户的冻结状态'
        }
        freezeUser(row.phone, flag).then((response) => {
          if (response.data.success) {
            this.modifyFreezeUserState(row.phone, flag)
            showMessage(this, successMessage, 'success')
          } else {
            showMessage(this, '操作失败,请稍后再试', 'error')
          }
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
        })
      }).catch(() => {
        showMessage(this, '已取消操作', 'info')
      })
    },
    modifyFreezeUserState: function (phone, flag) {
      let freezeFlag = ''
      if (flag === 1) {
        freezeFlag = '冻结'
      } else {
        freezeFlag = '正常'
      }

      for (let i = 0; i < this.userData.length; i++) {
        if (this.userData[i].phone === phone) {
          this.userData[i].freezeFlag = freezeFlag
          break
        }
      }
    },
    handleEdit: function (index, row) {

    },
    // 确定删除
    deleteRow: function () {
      // freezeUser(currentUserName, username, flag, getToken()).then((response) => {
      //   if (response.status === 204) {
      //     if (flag === -1) {
      //       this.$message.success('您已成功冻结' + username + '用户')
      //     } else {
      //       this.$message.success('您已成功解除' + username + '用户的冻结状态')
      //     }
      //     this.getdata()
      //   } else if (response.status === 403) {
      //     this.$message.warning('对不起,您没有权限执行该操作')
      //   } else {
      //     this.$message.error('操作失败')
      //   }
      // }).catch((error) => {
      //   console.log(error)
      // })
    },
    userInfoSearch: function () {
      this.getSimpleUserInfo(1)
    },
    userDataFilterChange: function (filter) {
      // 判断现有的筛选条件
      if (filter.hasOwnProperty('roleName')) {
        this.filteredValue.roleName = filter.roleName
      }
      if (filter.hasOwnProperty('roleState')) {
        this.filteredValue.roleState = filter.roleState
      }
      if (filter.hasOwnProperty('freezeFlag')) {
        this.filteredValue.freezeFlag = filter.freezeFlag
      }
      console.log(this.filteredValue)

      this.getSimpleUserInfo(1)
    }
  }
}
</script>

<style scoped lang="scss">
    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 60%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
<style>
    .success-row {
        background: #e3f968!important;
    }
</style>
