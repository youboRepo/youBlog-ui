import Vue from 'vue'
import Router from 'vue-router'
//import RouteView from "@/components/route-view"

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
//import { Layout } from '../../src/index'

//import routes from './menu'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect')
  }]
}, {
  path: '/login',
  component: () => import('@/views/login/login'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: location.pathname.split('/')[1],
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

export const routes = [{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('../views/dashboard'),
    meta: { title: '系统首页', icon: 'dashboard', affix: true }
  }]
}, {
  path: '/user',
  component: Layout,
  meta: { title: '用户角色', icon: 'user', roles: ['15000000'] },
  children: [{
    path: 'permission',
    name: 'Permission',
    component: () => import('../views/user/permission_tree'),
    meta: { title: '权限管理', roles: ['15010000'] }
  }, {
    path: 'role',
    name: 'Role',
    component: () => import('../views/user/role_list'),
    meta: { title: '角色管理', roles: ['15020000'] }
  }, {
    path: 'core',
    name: 'User',
    component: () => import('../views/user/user_list'),
    meta: { title: '用户管理', roles: ['15030000'] }
  }]
}, {
  path: '/system',
  component: Layout,
  meta: { title: '系统配置', icon: 'system', roles: ['16000000'] },
  children: [{
    path: 'param',
    name: 'SystemParam',
    component: () => import('@/views/system/system_param_list'),
    meta: { title: '系统参数', roles: ['16010000'] }
  }, {
    path: 'online/user',
    name: 'OnlineUser',
    component: () => import('../views/system/online_user_list'),
    meta: { title: '在线用户', roles: ['16020000'] }
  }]
}]