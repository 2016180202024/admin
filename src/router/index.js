import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

export const constantRoutes = [
  {
    path: '/',
    component: import('../views/login/Index.vue'),
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    component: () => import('../views/login/Index.vue'),
    hidden: true
  },
  {
    path: '/usermanagement',
    component: Layout,
    meta: {title: '用户管理', icon: 'user'},
    redirect: '/usermanagement/index',
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('../views/usermanagement/UserInfo'),
        meta: {title: '用户信息', icon: 'info'}
      },
      {
        path: 'roleAuth',
        name: 'user',
        component: () => import('../views/usermanagement/RoleAuth'),
        meta: {title: '角色审核', icon: 'role'}
      },
      {
        path: 'loginInfo',
        name: 'user',
        component: () => import('../views/usermanagement/LoginInfo'),
        meta: {title: '登录信息', icon: 'login'}
      },
      {
        path: 'feedbackInfo',
        name: 'user',
        component: () => import('../views/usermanagement/FeedbackInfo'),
        meta: {title: '反馈信息', icon: 'info'}
      }
    ]
  },
  {
    path: '/messageManagement',
    component: Layout,
    meta: {title: '消息管理', icon: 'info'},
    children: [
      {
        path: 'userMessage',
        name: 'message',
        component: () => import('../views/messageManagement/UserMessage'),
        meta: {title: '用户消息发送', icon: 'info'}
      },
      {
        path: 'warningMessage',
        name: 'message',
        component: () => import('../views/messageManagement/WarningMessage'),
        meta: {title: '预警消息发送', icon: 'info'}
      }
    ]
  },
  {
    path: '/systemManagement',
    component: Layout,
    meta: {title: '系统管理', icon: 'info'},
    children: [
      {
        path: 'operationManagement',
        name: 'systemManagement',
        component: () => import('../views/systemManagement/OperationManagement'),
        meta: {title: '系统运行监控', icon: 'info'}
      },
      {
        path: 'serviceManagement',
        name: 'systemManagement',
        component: () => import('../views/systemManagement/ServiceManagement'),
        meta: {title: '系统服务监控', icon: 'info'}
      },
      {
        path: 'serviceLaunch',
        name: 'systemManagement',
        component: () => import('../views/systemManagement/ServiceLaunch'),
        meta: {title: '系统服务操作', icon: 'info'}
      }
    ]
  },
  {
    path: '/dataManagement',
    component: Layout,
    meta: {title: '数据管理', icon: 'info'},
    children: [
      {
        path: 'produceManagement',
        name: 'dataManagement',
        component: () => import('../views/dataManagement/ProduceManagement'),
        meta: {title: '系统运行监控', icon: 'info'}
      },
      {
        path: 'orderManagement',
        name: 'dataManagement',
        component: () => import('../views/dataManagement/OrderManagement'),
        meta: {title: '系统服务监控', icon: 'info'}
      }
    ]
  }
]

const createRouter = () => new Router({
  base: '/fire/',
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

export default router
