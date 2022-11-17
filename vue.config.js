const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/supplier',
  devServer: {
    open: true,
    proxy: {
      ['/api']: {
        target: `http://localhost:21300`,
        changeOrigin: false
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        return { ...options, limit: 102400 }
      })
      .end()
  }
}