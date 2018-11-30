
export default [
  {
    path: '/',
    name: 'home',
    component: () => lazyLoadView(import('@pages/home/home')),
  },
  {
    path: '/sample',
    name: 'sample',
    component: () => lazyLoadView(import('@pages/sample/sample'))
  },
  {
    path: '/other-pages',
    name: 'other-pages',
    component: () => lazyLoadView(import('@pages/other-pages/other-pages'))
  },
  {
    path: '/404',
    name: '404',
    component: require('@pages/_404/_404').default,
    props: true,
  },
  {
    path: '*',
    redirect: '404',
  },
]

function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // 组件加载的时候使用loading组件
    loading: require('@pages/_loading/_loading').default,
    // 显示loading组件前的延迟
    // 默认200毫秒
    delay: 400,
    // 超时情况下展示的组件
    error: require('@pages/_timeout/_timeout').default,
    // 超时时间
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // 将属性和方法传递给所有展示组件
      return h(AsyncHandler, data, children)
    },
  })
}
