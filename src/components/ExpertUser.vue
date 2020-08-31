<template>
  <div style="height: 100%">
    <el-tabs type="border-card"  class="common" v-model="tabName">
      <el-tab-pane label="待审核">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  style="width: 100%;" border stripe="true" :default-sort = "{prop: 'date', order: 'descending'}" fit="true" size="small">
          <el-table-column fixed prop="phone" label="手机号" width="120px"></el-table-column>
          <el-table-column prop="username" label="用户名" width="130px"></el-table-column>
          <el-table-column prop="mail" label="邮箱" width="155px"></el-table-column>
          <el-table-column prop="realName" label="姓名" width="80px"></el-table-column>
          <el-table-column prop="idCardNumber" label="身份证号" width="180px"></el-table-column>
          <el-table-column prop="organization" label="所属单位"></el-table-column>
          <el-table-column prop="role" label="角色" width="80px"></el-table-column>
          <el-table-column prop="registerTime" label="注册时间" width="170px"></el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">选择<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><button type="button" @click="authUser(scope.$index, scope.row)">通过</button></el-dropdown-item>
                  <el-dropdown-item><button type="button" @click="openInput(scope.$index, scope.row)">不通过</button></el-dropdown-item>
                  <el-dropdown-item><button type="button" @click="deleteuser(scope.$index, scope.row)">删除</button></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!--      分页组件      、、、、、、 -->
        <el-pagination class="fy"
                       @current-change="current_change"
                       :total="total"
                       background
                       layout="total, prev, pager, next">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已通过">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  style="width: 100%;" border stripe="true" :default-sort = "{prop: 'date', order: 'descending'}" fit="true" size="small">
          <el-table-column fixed prop="phone" label="手机号" width="120px"></el-table-column>
          <el-table-column prop="username" label="用户名" width="130px"></el-table-column>
          <el-table-column prop="mail" label="邮箱" width="155px"></el-table-column>
          <el-table-column prop="realName" label="姓名" width="80px"></el-table-column>
          <el-table-column prop="idCardNumber" label="身份证号" width="180px"></el-table-column>
          <el-table-column prop="organization" label="所属单位"></el-table-column>
          <el-table-column prop="role" label="角色" width="80px"></el-table-column>
          <el-table-column prop="registerTime" label="注册时间" width="170px"></el-table-column>
          <el-table-column prop="authTime" label="处理时间" width="170px"></el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">选择<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="openInput(scope.$index, scope.row)">不通过</button></el-dropdown-item>
                  <el-dropdown-item><button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="deleteuser(scope.$index, scope.row)">删除</button></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!--      分页组件      、、、、、、 -->
        <el-pagination class="fy"
                       @current-change="current_change"
                       :total="total"
                       background
                       layout="total, prev, pager, next">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="未通过">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  style="width: 100%;" border stripe="true" :default-sort = "{prop: 'date', order: 'descending'}" fit="true" size="small">
          <el-table-column fixed prop="phone" label="手机号" width="120px"></el-table-column>
          <el-table-column prop="username" label="用户名" width="130px"></el-table-column>
          <el-table-column prop="mail" label="邮箱" width="155px"></el-table-column>
          <el-table-column prop="realName" label="姓名" width="80px"></el-table-column>
          <el-table-column prop="idCardNumber" label="身份证号" width="180px"></el-table-column>
          <el-table-column prop="organization" label="所属单位"></el-table-column>
          <el-table-column prop="role" label="角色" width="80px"></el-table-column>
          <el-table-column prop="registerTime" label="注册时间" width="170px"></el-table-column>
          <el-table-column prop="authTime" label="处理时间" width="170px"></el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">选择<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="authUser(scope.$index, scope.row)">通过</button></el-dropdown-item>
                  <el-dropdown-item><button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="deleteuser(scope.$index, scope.row)">删除</button></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!--      分页组件      、、、、、、 -->
        <el-pagination class="fy"
                       @current-change="current_change"
                       :total="total"
                       background
                       layout="total, prev, pager, next">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已删除">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  style="width: 100%;" border stripe="true" :default-sort = "{prop: 'date', order: 'descending'}" size="small">
          <el-table-column fixed prop="phone" label="手机号" width="120px"></el-table-column>
          <el-table-column prop="username" label="用户名" width="130px"></el-table-column>
          <el-table-column prop="mail" label="邮箱" width="155px"></el-table-column>
          <el-table-column prop="realName" label="姓名" width="80px"></el-table-column>
          <el-table-column prop="idCardNumber" label="身份证号" width="180px"></el-table-column>
          <el-table-column prop="organization" label="所属单位"></el-table-column>
          <el-table-column prop="role" label="角色" width="80px"></el-table-column>
          <el-table-column prop="registerTime" label="注册时间" width="170px"></el-table-column>
          <el-table-column prop="authTime" label="处理时间" width="170px"></el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">选择<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="authUser(scope.$index, scope.row)">通过</button></el-dropdown-item>
                  <el-dropdown-item><button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="openInput(scope.$index, scope.row)">不通过</button></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
          <!--      分页组件      、、、、、、 -->
        <el-pagination class="fy"
                       @current-change="current_change"
                       :total="total"
                       background
                       layout="total, prev, pager, next">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
<!--    填写不通过理由  、、、、、、、、、、、 -->
    <el-dialog
      title="审核不通过理由："
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input v-model="inputReason" placeholder="请输入内容" type="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="notauthUser">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ExpertUser',
  data () {
    return {
      tableData: [],
      adminPhone: '18682598854',
      tabName: '',
      dialogVisible: false,
      inputReason: '',
      pageSize: 2,
      total: 0,
      pagesize: 15, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      notAuthIndex: '', // 不通过用户所在行的index
      notAuthPhone: '' // 不通过用户的电话
    }
  },
  mounted () {
    this.waitAuthuser()
    this.total = this.tableData.length
  },
  watch: {
    tabName (val) {
      console.log('tabName' + val)
      switch (val) {
        case '0':
          this.waitAuthuser()
          break
        case '1':
          this.getAutheduser()
          break
        case '2':
          this.getnotAuthuser()
          break
        case '3':
          this.getDeleteduser()
          break
      }
    }
  },
  methods: {
    created: function () {
      this.total = this.tableData.length
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 请求待审核用户
    waitAuthuser: function () {
      let dataset = {
        'roleId': 2,
        'phone': this.adminPhone,
        'isAuth': 0
      }
      this.$axios.post('/api/user_backend/getUserInfo', dataset, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        this.tableData = res.data
        this.total = this.tableData.length
      })
    },
    // 请求已通过用户
    getAutheduser: function () {
      let dataset = {
        'roleId': 2,
        'phone': this.adminPhone,
        'isAuth': 1
      }
      this.$axios.post('/api/user_backend/getUserInfo', dataset, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        this.tableData = res.data
        this.total = this.tableData.length
      })
    },
    // 请求未通过用户
    getnotAuthuser: function () {
      let dataset = {
        'roleId': 2,
        'phone': this.adminPhone,
        'isAuth': -1
      }
      this.$axios.post('/api/user_backend/getUserInfo', dataset, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        this.tableData = res.data
        this.total = this.tableData.length
      })
    },
    // 请求已删除用户
    getDeleteduser: function () {
      let dataset = {
        'roleId': 2,
        'phone': this.adminPhone,
        'isAuth': -2
      }
      this.$axios.post('/api/user_backend/getUserInfo', dataset, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        this.tableData = res.data
        this.total = this.tableData.length
      })
    },
    // 删除用户
    deleteuser: function (index, row) {
      let dataset = {
        'adminPhone': this.adminPhone,
        'handlePhone': row.phone,
        'roleId': -2,
        'authOperation': -2
      }
      this.$axios.post('/api/user_backend/authUser', dataset, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        if (res.data.code === 0) {
          this.tableData.splice(index, 1)
          this.total = this.tableData.length
          this.$message.success('处理成功！')
        } else {
          this.$message.error('操作失败！')
        }
      })
    },
    // 填写不通过理由
    openInput: function (index, row) {
      this.dialogVisible = true
      console.log('打开input')
      this.notAuthIndex = index
      this.notAuthPhone = row.phone
    },
    // 审核用户通过
    authUser: function (index, row) {
      console.log(index, row)
      let dataset = {
        'adminPhone': this.adminPhone,
        'handlePhone': row.phone,
        'roleId': 1,
        'authOperation': 1
      }
      this.$axios.post('/api/user_backend/authUser', dataset, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        if (res.data.code === 0) {
          this.tableData.splice(index, 1)
          this.total = this.tableData.length
          this.$message.success('处理成功！')
        } else {
          this.$message.error('操作失败！')
        }
      })
    },
    // 审核用户不通过
    notauthUser: function () {
      let dataset = {
        'adminPhone': this.adminPhone,
        'handlePhone': this.notAuthPhone,
        'roleId': 1,
        'authOperation': -1,
        'message': this.inputReason
      }
      this.$axios.post('/api/user_backend/authUser', dataset, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        if (res.data.code === 0) {
          this.tableData.splice(this.notAuthIndex, 1)
          this.$message.success('处理成功！')
        } else {
          this.$message.error('操作失败！')
        }
      })
      console.log('执行到审核不通过')
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
  .common{
    height: calc(100% - 2px);
  }
  .el-dropdown-menu .layui-btn{
    margin-bottom: 5px;
    width: 100%;
  }
  .layui-btn{
    width: 70%;
  }
  .el-dialog__title{
    font-size: 16px;
  }
  .el-dropdown{
    cursor: pointer;
  }
  .el-pagination{
    overflow: auto;
  }
  .el-tab-pane{
    height: 100%;
  }
  .el-table{
    max-height: 95%;
    overflow: auto;
  }
</style>
<style>
.el-tabs__content{
  height: calc(100% - 69px);
}
</style>
