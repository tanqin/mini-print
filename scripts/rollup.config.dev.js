/* 开发环境配置 */

// 安装以下 npm 包
// npm install -D rollup-plugin-serve rollup-plugin-livereload
import baseConfig from './rollup.config.base'
import serve from 'rollup-plugin-serve' // 用于在开发过程中提供本地服务器
import livereload from 'rollup-plugin-livereload' // 实时刷新浏览器页面

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    serve({
      port: 8080,
      contentBase: ['dist', 'examples/browser'],
      openPage: 'index.html'
    }),
    livereload({
      watch: 'examples/browser'
    })
  ]
}
