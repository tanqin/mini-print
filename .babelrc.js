module.exports = {
  presets: [
    ['@babel/preset-env', {
      // 设置为 false 表示不需要转换模块语法，因为 rollup 会处理模块
      modules: false
    }]
  ],
  plugins: []
}