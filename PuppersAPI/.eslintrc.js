module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: ['standard', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'

  },
  rules: {
    semi: ['warn', 'always'],
    'arrow-body-style': ['error', 'always'],
    'default-case': 'error',
    'func-names': ['error', 'as-needed'],
    'no-confusing-arrow': 'error',
    'no-console': 'error',
    'no-continue': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-eq-null': 'error',
    'no-lonely-if': 'error',
    'no-multi-str': 'error',
    'no-throw-literal': 'error',
    'no-useless-return': 'error'
  }
};
