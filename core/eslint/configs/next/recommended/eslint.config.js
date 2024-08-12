const { antfu } = require('@antfu/eslint-config');
const tailwind = require('eslint-plugin-tailwindcss');

module.exports = antfu({
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type'],

      'import/order': [
        'error',
        {
          groups: [
            // External packages:
            ['^react', 'next', '^@?\\w'],
            // Internal packages:
            ['^@(mkas3/core/.*|$)'],
            // Alias imports:
            ['^@(([\\/.]?\\w))'],
            // Side effect imports:
            ['^\\u0000'],
            // Parent imports:
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports:
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports:
            ['^.+\\.s?css$']
          ]
        }
      ]
    }
  },
  react: {
    overrides: {
      'antfu/top-level-function': 'off'
    }
  },
  stylistic: {
    quotes: 'single',
    jsx: true,
    indent: 2,
    semi: true,
    overrides: {
      'style/comma-dangle': ['error', 'never'],
      'style/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false
          },
          multilineDetection: 'brackets'
        }
      ],
      'style/jsx-quotes': ['error', 'prefer-single'],
      'style/arrow-parens': ['error', 'always']
    }
  }
}).append(...tailwind.configs['flat/recommended']);
