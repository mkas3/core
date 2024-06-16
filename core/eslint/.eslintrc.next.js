const eslint = require('./.eslintrc.react');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb/hooks',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended'
  ],
  plugins: ['simple-import-sort', 'prettier', 'tailwindcss'],
  ignorePatterns: ['dist'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      removeDuplicates: true
    }
  },
  rules: {
    ...eslint.react.rules
  },
  overrides: [...eslint.react.overrides]
};
