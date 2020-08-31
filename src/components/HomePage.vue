<template>
  <div class="HomePage-container">
    <div class="HomePage-head">
      <img src="../assets/fire_logo.png" style="height: 58px;">
      森林和草原火灾风险预警大数据平台
    </div>
    <div class="HomePage-main">
      <ul class="nav_ul">
        <li class="el-icon-s-grid nav_title_li" style="padding-left: 6%;font-size: 16px;width: auto">后台管理系统</li>
        <!-- render-content 用于绑定渲染函数 -->
        <el-tree :data="data" @node-click="changeTab"  node-key="id" ref="tree" :highlight-current="highlightCurrent" :default-expanded-keys="this.defaultExpand" :current-node-key="currentKey">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <div @click="changeTab(node.id)">
                <i v-bind:class=data.icon1></i>{{ node.label }}
            </div>
        </span>
        </el-tree>
      </ul>
    <div class="main" style="overflow: hidden;height: 100%;position: relative;overflow: hidden;">
      <router-view></router-view>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      iconl: 'el-icon-s-custom',
      listyle: ['', '', 'el-icon-user-solid', 'el-icon-s-custom', 'el-icon-warning', 'el-icon-document'],
      defaultExpand:['1'],
      currentKey:'3',
      highlightCurrent:true,
      data: [{
        id: '1',
        label: '用户管理',
        children: [{
          id: '3',
          label: '普通用户',
          icon1: 'el-icon-success'
        },
        {
          id: '4',
          label: '专家用户',
          icon1: 'el-icon-s-custom'
        }]
      },
      {
        id: '2',
        label: '系统消息',
        children: [{
          id: '5',
          label: '预警消息',
          icon1: 'el-icon-warning'
        },
        {
          id: '6',
          label: '常规消息',
          icon1: 'el-icon-document'
        }]
      }]
    }
  },
  mounted () {
    this.$router.push({path: '/commonuser'})
    this.$refs.tree.setCheckedKeys([])
  },
  methods: {
    handleNodeClick (id) {
      /* @node-click事件传参三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
      console.log('data:', data, '\n', 'node:', node, '\n', 'vuecomponent', vuecomponent)
*/
      console.log(id.id)
    },
    changeTab (id) {
      let key = id.id
      switch (key) {
        case '3':
          console.log('跳到普通用户')
          this.$router.push({path: '/commonuser'})
          break
        case '4':
          console.log('跳到专家用户')
          this.$router.push({path: '/expertuser'})
          break
        case '5':
          console.log('跳到预警消息')
           this.$router.push({path: '/error'})
          break
        case '6':
          console.log('跳到普通消息')
          this.$router.push({path: '/error'})
          break
      }
    }
  }

}
</script>

<style scoped>
.HomePage-head{
  background-color: #393D49;
  color: aliceblue;
  height:  60px;
  line-height: 60px;
  word-break: keep-all;/* 实现不换行*/
  white-space:nowrap;/* 实现不换行*/
  font-size: 20px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom-style: double;
  border-color: #5e6565;
  border-width: 2px;

}
  .HomePage-container{
    width: 100%;
    word-break: keep-all;
    position: relative;
    height: inherit;
  }
  .HomePage-container ul{
    width: 18%;
    position: relative;;
    float: left;
    height: 100%;
  }
  .HomePage-main{
    height: calc(100% - 62px);
    min-height: 90%;
  }
  .HomePage-main .main{
    width: 82%;
    position: relative;;
    float: left;
    height: 100%;
  }
  .nav_title_li{
    padding-top: 3%;
    padding-bottom: 3%;
    font-size: 40px;
    background-color: #cf9236;
    display: block;
  }
  .nav_ul{
    font-size: 16px!important;
    width: inherit;
    border-bottom: #58585ebd!important;
    border-bottom-style: solid!important;
    border-bottom-width: 1px!important;
  }
  .layui-btn{
    text-align: start;
    height: auto;
    padding-left: 6%;
    margin-left: 0px;
  }
</style>
<style>
  .HomePage-main .el-tree{
    background-color: #009688;
    color: #fff;
  }
  .HomePage-main .el-tree-node__content{
    padding-left: 0px;
    height: 45px;
    border-bottom-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.13);
  }
  .HomePage-main .el-tree-node__label {
    font-size: 16px
  }
  .el-tree-node__content:hover {
    background-color: rgba(208, 208, 208, 0.5)!important;
  }
  .el-tree-node:focus > .el-tree-node__content {
    background-color: rgba(0, 0, 0, 0.3)!important;
  }
  .el-tree-node__content i{
    margin-right: 2px!important;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: rgba(0, 0, 0, 0.3)!important;
    font-size: 16px;
  }
</style>
