import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import NProgress from 'nprogress/nprogress'
import routes from './routes'
import store from '@state/store'

NProgress.configure({showSpinner: false})

Vue.use(VueRouter)
Vue.use(VueMeta, {
  keyName: 'page'
})

const router = new VueRouter({
  routes,
  mode: process.env.NODE_ENV === 'production' ? 'history' : '',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

router.beforeEach((routeTo, routeFrom, next) => {
  if (routeFrom.name !== null) {
    NProgress.start()
  }
  return next()
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              if (routeFrom.name === args[0].name) {
                NProgress.done()
              }
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    }
  } catch (error) {
    return
  }
  next()
})

const ADD_TEXT = '新建'
const EDIT_TEXT = '编辑'
const SUCCESS_TEXT = '完善资料'
router.afterEach((routeTo, routeFrom) => {
  const name = routeTo.params.name
  const variableIndex = routeTo.meta.variableIndex
  let titles = routeTo.meta.crumbs ? [...routeTo.meta.crumbs] : []
  // 判断该页面是否是变动的标题
  if (variableIndex || variableIndex === 0) {
    if (routeTo.query.complete || routeTo.params.complete) {
      titles[variableIndex] = SUCCESS_TEXT
    } else {
      titles[variableIndex] = (routeTo.query.id || routeTo.params.id ? EDIT_TEXT : ADD_TEXT) + titles[variableIndex]
    }
  }
  titles[titles.length - 1] = name || titles[titles.length - 1]
  if (titles) {
    store.commit('global/SET_CURRENT_TITLES', titles)
  }
  NProgress.done()
})

export default router
