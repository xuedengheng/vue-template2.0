module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
    validate(value) {
      if (!value.length) {
        return '自动化测试名字不能为空'
      }
      return true
    }
  }
]
