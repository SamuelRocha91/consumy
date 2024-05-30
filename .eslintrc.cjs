/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'always'],
    indent: ['error', 2],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'max-len': ['error', { code: 80 }],
    complexity: ['error', 10],
    'max-lines-per-function': ['error', { max: 30 }],
  }
};
