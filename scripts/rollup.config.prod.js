/* 生产环境配置 */

// npm install -D rollup-plugin-filesize
import baseConfig from './rollup.config.base'
import filesize from 'rollup-plugin-filesize' // 用于在打包后显示文件大小信息

export default {
  ...baseConfig,
  plugins: [...baseConfig.plugins, filesize()]
}
