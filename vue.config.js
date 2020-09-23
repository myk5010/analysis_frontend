"use strict"

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // 服务器反代
  devServer: {
    hot:true,
    port: port,
    host: "0.0.0.0",
    useLocalIp: true,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      "^/api": {
        target: process.env.VUE_API,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    name: '数据分析',
  },
  chainWebpack(config) {
    config.resolve.symlinks(true) // 热更新
  },
  productionSourceMap: false
}
