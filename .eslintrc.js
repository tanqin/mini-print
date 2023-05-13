module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended', // eslint
    'plugin:prettier/recommended', // plugin-prettier
    'plugin:vue/vue3-essential' // plugin-vue
  ],
  parserOptions: {
    parser: '@babel/eslint-parser', // 解析器
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    semi: 0 // 结尾不要分号
  }
}
