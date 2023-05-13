module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended", // eslint
    "plugin:prettier/recommended", // plugin-prettier
    "plugin:vue/vue3-essential", // plugin-vue
  ],
  parserOptions: {
    parser: "@babel/eslint-parser", // 解析器
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "space-before-function-paren": ["error", "never"], // 函数名和左括号之间不应该有空格,
    semi: 0, // 结尾不要分号
  },
};
