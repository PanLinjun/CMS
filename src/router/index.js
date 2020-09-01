import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        meta: { title: 'Profile' }
      }
    ],
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
]

export const asyncRoutes = [
  {
    path: '/article',
    name: 'article',
    component: Layout,
    redirect: '/article/list',
    meta: { title: '文章管理', icon: 'documentation', roles: ['admin', 'editor'] },
    children: [
      {
        name: 'articleList',
        path: '/article/list',
        component: () => import('@/views/article/components/List/'),
        meta: { title: '文章列表', icon: 'list', roles: ['editor'] }
      },
      {
        path: '/article/category',
        component: () => import('@/views/article/components/Category'),
        meta: { title: '文章类别', icon: 'category', roles: ['editor'] }
      },
      {
        path: '/article/Tag',
        component: () => import('@/views/article/components/Tag'),
        meta: { title: '文章标签', icon: 'tag', roles: ['editor'] }
      },
      {
        name: 'articleCreate',
        path: 'create',
        component: () => import('@/views/article/create'),
        meta: { title: '添加文章', roles: ['editor'] },
        hidden: true
      },
      {
        name: 'articleEdit',
        path: 'edit/:id',
        component: () => import('@/views/article/edit'),
        meta: { title: '编辑文章', roles: ['editor'] },
        hidden: true
      }
    ]
  },
  {
    path: '/management',
    name: 'management',
    component: Layout,
    redirect: '/management/admin',
    meta: { title: '系统管理', icon: 'example', roles: ['admin'] },
    children: [
      {
        name: 'admin',
        path: 'admin',
        component: () => import('@/views/management/admin'),
        meta: { title: '用户管理', icon: 'user', roles: ['admin'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
