/* eslint-disable no-param-reassign */
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

const IS_RELEASE = process.env.NODE_ENV === 'production' // 正式环境

const resolve = dir => path.join(__dirname, dir)

console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_BASE_API)

module.exports = {
  // 基本路径
  publicPath: IS_RELEASE ? '/static' : '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  runtimeCompiler: true, // 关键点在这
  configureWebpack: {
    // 开发环境时，天开启source-map进行调试
    devtool: IS_RELEASE ? 'false' : 'source-map'
  },
  // 调整内部的 webpack 配置。
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('libs', resolve('src/libs'))
      .set('views', resolve('src/views'))

    // 加载svg
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    if (IS_RELEASE) {
      // 打包可视化插件
      // config
      //   .plugin('analyzer')
      //   .use(BundleAnalyzerPlugin)
      //   .end()
      // 解决ie11兼容ES6
      config.entry('main').add('babel-polyfill')
      // gzip 压缩
      config
        .plugin('compressionPlugin')
        .use(CompressionPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 超过10k进行压缩
            deleteOriginalAssets: false // 是否删除源文件
          }
        ])
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true, // 注释css热更新生效
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  // webpack-dev-server 相关配置
  devServer: {
    /* 自动打开浏览器 */
    open: false,
    host: 'localhost',
    // host: 'jbi.jd.com',
    allowedHosts: [
      '.jd.com',
      '.jdwl.com'
    ],
    port: 8080,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        // target: process.env.VUE_APP_BASE_API,
        target: 'http://10.170.181.47',
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    before: () => {}
  },
  // 第三方插件配置
  pluginOptions: {}
}
