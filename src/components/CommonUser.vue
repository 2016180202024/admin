<template>
  <div style="height: 100%">
    <el-tabs type="border-card" v-model="tabName"  class="common">
      <el-tab-pane label="已注册">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  style="width: 100%;" border :stripe="isStripe" :default-sort = "{prop: 'date', order: 'descending'}" :fit="isFit" size="small">
          <el-table-column fixed prop="phone" label="手机号" width="200px"></el-table-column>
          <el-table-column prop="username" label="用户名" width="150px"></el-table-column>
          <el-table-column prop="mail" label="邮箱" width="200px"></el-table-column>
          <el-table-column prop="role" label="角色" width="200px"></el-table-column>
          <el-table-column prop="registerTime" label="注册时间" width="200px"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">选择<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
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
      <el-tab-pane label="已删除">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  style="width: 100%;" border :stripe="isStripe" :default-sort = "{prop: 'date', order: 'descending'}" :fit="isStripe" size="small">
          <el-table-column fixed prop="phone" label="手机号" width="200px"></el-table-column>
          <el-table-column prop="username" label="用户名" width="150px"></el-table-column>
          <el-table-column prop="mail" label="邮箱" width="200px"></el-table-column>
          <el-table-column prop="role" label="角色" width="200px"></el-table-column>
          <el-table-column prop="registerTime" label="注册时间" width="200px"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">选择<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><button type="button" class="layui-btn layui-btn-sm layui-btn-danger" @click="authUser(scope.$index, scope.row)">通过</button></el-dropdown-item>
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
  </div>
</template>

<script>
export default {
  name: 'CommonUser',
  data () {
    return {
      isStripe:true,
      isFit:true,
      tableData: [],
      currentPage: 1, // 默认开始页面,
      total:0,
      units: [],
      pagesize: 15,
      tabName: '',
      thisUsername: '18208106124',
    }
  },
  mounted () {
    this.getCommonuser()
  },
  watch: {
    tabName (val) {
      console.log('tabName' + val)
      if (val === '0') {
        this.getCommonuser()
      } else {
        this.getDeleteduser()
      }
    }
  },
  methods: {
    created: function () {
      this.total = this.tableData.length
      this.currentPage=1
    },
    current_change: function (currentPage) {
      console.log(currentPage)
      this.currentPage = currentPage
    },
    getCommonuser: function () {
      let dataset = {
        'roleId': 1,
        'phone': this.thisUsername,
        'isAuth': 1
      }
      this.$axios.post('/api/user_backend/getUserInfo', dataset, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        this.tableData = res.data
        this.created()
      })
    },
    getDeleteduser: function () {
      let dataset = {
        'roleId': 1,
        'phone': this.thisUsername,
        'isAuth': -2
      }
      this.$axios.post('/api/user_backend/getUserInfo', dataset, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        this.tableData = res.data
        this.created()
      })
    },
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
          this.created()
          this.$message.success('处理成功！')
        } else {
          this.$message.error('操作失败！')
        }
      })
    },
    deleteuser: function (index, row) {
      let dataset = {
        'adminPhone': this.adminPhone,
        'handlePhone': row.phone,
        'roleID': 1,
        'authOperation': -2
      }
      this.$axios.post('/api/user_backend/authUser', dataset, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        console.log(res.data.code)
        if (res.data.code === 0) {
          this.tableData.splice(index, 1)
          this.created()
          this.$message.success('处理成功！')
        } else {
          this.$message.error('操作失败！')
        }
      })
    }
  }
}
</script>

<style  scoped>
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
