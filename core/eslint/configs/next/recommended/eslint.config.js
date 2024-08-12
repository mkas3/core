const { antfu } = require('@antfu/eslint-config');
const tailwind = require('eslint-plugin-tailwindcss');

module.exports = antfu({
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type']
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
      'style/arrow-parens': ['error', 'always'],

      'import/order': 'off',
      'sort-imports': 'off',

      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          internalPattern: ['~/**', '@/**'],
          newlinesBetween: 'always',
          maxLineLength: undefined,
          groups: [
            'type',
            'internal-type',
            'parent-type',
            'sibling-type',
            'index-type',
            'react',
            'next',
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'side-effect',
            'side-effect-style',
            'style',
            'object',
            'unknown'
          ],
          customGroups: {
            value: {
              react: ['react', 'react-*'],
              next: ['next', 'next-*']
            },
            type: {
              react: ['react', 'react-*'],
              next: ['next', 'next-*']
            }
          }
        }
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreAlias: false,
          ignoreCase: true,
          groupKind: 'types-first'
        }
      ],
      'perfectionist/sort-exports': [
        'error',
        { type: 'alphabetical', order: 'asc', ignoreCase: true }
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          groupKind: 'types-first'
        }
      ],

      'perfectionist/sort-array-includes': 'error',
      'perfectionist/sort-intersection-types': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          groups: [
            'keyword',
            'literal',
            'named',
            ['tuple', 'union', 'intersection'],
            'object',
            'function',
            'operator',
            'conditional',
            'import',
            'nullish',
            'unknown'
          ]
        }
      ],

      'style/jsx-sort-props': 'off',
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          ignorePattern: [],
          groups: ['ref', 'className', 'otherClassName', 'unknown', 'shorthand', 'callback'],
          customGroups: {
            ref: 'ref',
            className: 'className',
            otherClassName: '*ClassName',
            callback: 'on*'
          }
        }
      ]
    }
  }
}).append(...tailwind.configs['flat/recommended']);
