/* 基础文件 */

// 安装以下 npm 包
// npm install -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-alias @rollup/plugin-replace @rollup/plugin-eslint @rollup/plugin-babel rollup-plugin-terser rollup-plugin-clear @rollup/plugin-json
import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析 node_modules 中的模块
import commonjs from '@rollup/plugin-commonjs' // cjs => esm。由于 rollup 只能处理 esm 模块，所以需要改插件进行转换
import alias from '@rollup/plugin-alias' // 用于在打包过程中为模块创建别名，以便在代码中使用别名而不是实际路径
import replace from '@rollup/plugin-replace' // 用于将代码中的指定字符串替换为另一组字符串或者变量
import eslint from '@rollup/plugin-eslint' // 用于在打包过程中使用 ESLint 进行代码检查
import { babel } from '@rollup/plugin-babel' // 用于将 ES6+ 代码转换为 ES5 代码，以便在旧版浏览器中运行
import { terser } from 'rollup-plugin-terser' // 用于压缩 JavaScript 代码
import clear from 'rollup-plugin-clear' // 用于在打包之前清空输出目录的内容。
import json from '@rollup/plugin-json' // 支持将 JSON 文件加载为 ES6 模块并导入到 Rollup 打包的项目中
import { name, version, author } from '../package.json'

// 打包处理的文件，添加的备注信息
const banner = '/*!\n' + ` * ${name} v${version}\n` + ` * (c) 2023-${new Date().getFullYear()} ${author}\n` + ' * Released under the MIT License.\n' + ' */'

export default {
  input: 'src/index.js',
  // 同时打包多种规范的产物
  output: [
    {
      file: `dist/${name}.umd.js`,
      // 通用模块定义，以 amd，cjs，iife 为一体
      format: 'umd',
      name,
      banner
    },
    {
      file: `dist/${name}.umd.min.js`,
      format: 'umd',
      name,
      banner,
      plugins: [terser()]
    },
    {
      file: `dist/${name}.cjs.js`,
      // CommonJS，适用于 Node 和 Browserify/Webpack
      format: 'cjs',
      name,
      banner,
      plugins: [terser()]
    },
    {
      file: `dist/${name}.esm.js`,
      // 将软件包保存为 ES 模块文件，在现代浏览器中可以通过
      format: 'es',
      name,
      banner,
      plugins: [terser()]
    },
    {
      file: `dist/${name}.js`,
      // 一个自定执行的功能
      format: 'iife',
      name,
      banner,
      plugins: [terser()]
    }
  ],
  // 注意 plugin 的使用顺序
  plugins: [
    json(),
    clear({ targets: ['dist'] }),
    alias(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'), // 将 process.env.NODE_ENV 都替换为 JSON.stringify(process.env.NODE_ENV || 'development')
      preventAssignment: true // 防止变量被重新分配值
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    eslint({
      throwOnError: true, // 抛出异常并阻止打包
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    babel({ babelHelpers: 'bundled' })
  ]
}
