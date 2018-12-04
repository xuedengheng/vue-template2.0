module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
    validate(value) {
      if (!value.length) {
        return '工具类方法名字不能为空！'
      }
      return true
    }
  }
]
