import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { sync } from 'vuex-router-sync'

Vue.use(Router)

const routes = [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['../components/index.vue'], resolve),
    },
    {
      path: '/project',
      name: 'project',
      component: resolve => require(['../components/project.vue'], resolve),
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../components/login.vue'], resolve),
    },
    {
      path: '/user',
      name: 'user',
      component: resolve => require(['../components/user.vue'], resolve),
    },
    {
      path: '/target/:oid/:pid',
      name: 'target',
      component: resolve => require(['../components/target.vue'], resolve),
    },
    {
      path: '/add/:pid',
      name: 'add',
      component: resolve => require(['../components/add.vue'], resolve),
    },
    {
      path: '/update/:pid/:oid',
      name: 'update',
      component: resolve => require(['../components/update.vue'], resolve),
    },
    {
      path: '/taglist',
      name: 'taglist',
      component: resolve => require(['../components/tag_list.vue'], resolve),
    },
    {
      path: '/serialtag/:mid',
      name: 'serialtag',
      component: resolve => require(['../components/serial_tag.vue'], resolve),
    },
    {
      path: '/prodetail/:pid/',
      name: 'pro_deatil',
      component: resolve => require(['../components/pro_deatil.vue'], resolve),
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['../components/register.vue'], resolve),
    },
    {
      path: '/messages',
      name: 'messages',
      component: resolve => require(['../components/messages.vue'], resolve),
    },
    
  ]

const router = new Router({
   routes
})

sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

export default router


