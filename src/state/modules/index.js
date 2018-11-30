import camelCase from 'lodash/camelCase'

const moduleCache = {}
const root = { modules: {} }
;(function updateModules() {
  const requireModule = require.context(
    '.',
    true,
    /^((?!index|\.unit\.).)*\.js$/
  )

  requireModule.keys().forEach(fileName => {
    const moduleDefinition = requireModule(fileName)

    if (moduleCache[fileName] === moduleDefinition) return

    moduleCache[fileName] = moduleDefinition

    const modulePath = fileName
      // 切掉"./"
      .replace(/^\.\//, '')
      // 切掉后缀
      .replace(/\.\w+$/, '')
      // 将嵌套模块拆分为数组路径
      .split(/\//)
      // 将所有模块名称空间和名称变为驼峰式
      .map(camelCase)

    // 获取当前路径的模块对象
    const { modules } = getNamespace(root, modulePath)

    // 将模块添加到模块对象
    modules[modulePath.pop()] = {
      // 默认情况下，模块是命名空间
      namespaced: true,
      ...moduleDefinition,
    }
  })

  if (module.hot) {
    module.hot.accept(requireModule.id, () => {
      updateModules()
      // 触发store的热更新
      require('../store').default.hotUpdate({ modules: root.modules })
    })
  }
})()

// 递归地获得vuex modules的命名空间
function getNamespace(subtree, path) {
  if (path.length === 1) return subtree

  const namespace = path.shift()
  subtree.modules[namespace] = {
    modules: {},
    ...subtree.modules[namespace],
  }
  return getNamespace(subtree.modules[namespace], path)
}

export default root.modules
