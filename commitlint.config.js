module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    // 提交类型的枚举
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'build']],
    // 提交类型的大小写规则
    'type-case': [0],
    // 提交类型不能为空
    'type-empty': [0],
    // 提交范围不能为空
    'scope-empty': [0],
    // 提交范围大小写限制
    'scope-case': [0],
    // 关闭标题不能以句号结尾的规则
    'subject-full-stop': [0, 'never'],
    // 不限制提交信息的标题大小写
    'subject-case': [0, 'never'],
    // 开启标题长度不能超过 72 个字符的规则
    'header-max-length': [0, 'always', 72]
  }
}
