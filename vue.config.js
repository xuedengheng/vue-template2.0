const appConfig = require('./src/app.config')

module.exports = {
  configureWebpack: {
    name: appConfig.title,
    resolve: {
      alias: require('./aliases.config').webpack,
    },
  },
  css: {
    sourceMap: true,
  },
  devServer: {
    ...(process.env.API_BASE_URL
      ? // 代理生产地址.
        { proxy: { '/api': { target: process.env.API_BASE_URL } } }
      : // 代理本地地址.
        {  }),
        // { before: require('./tests/mock-api') }),
  },
}
