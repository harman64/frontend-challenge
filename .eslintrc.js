module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['airbnb-base', 'prettier'],
  plugins: ['import'],
  env: {
    browser: true,
  },
  rules: {
    'no-param-reassign': [2, { props: false }],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
};
