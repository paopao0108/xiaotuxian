module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': 0,
    // 'no-unused-vars': 0,
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'Layout', 'home', 'sub']
      }
    ]
  }
};
