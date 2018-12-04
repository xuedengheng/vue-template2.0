module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
    validate(value) {
      if (!value.length) {
        return '状态管理模块名字不能为空！'
      }
      return true
    }
  }
]
