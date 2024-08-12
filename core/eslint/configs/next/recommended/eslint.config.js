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
      'antfu/top-level-function': 'off',

      'react/no-class-component': 'error',
      'react/no-default-props': 'error',
      'react/no-leaked-conditional-rendering': 'warn',
      'react/no-missing-component-display-name': 'warn',
      'react/no-prop-types': 'error',

      'react-hooks-extra/ensure-custom-hooks-using-other-hooks': 'warn',
      'react-hooks-extra/ensure-use-callback-has-non-empty-deps': 'warn',
      'react-hooks-extra/ensure-use-memo-has-non-empty-deps': 'warn',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn',
      'react-hooks-extra/no-direct-set-state-in-use-layout-effect': 'warn',
      'react-hooks-extra/prefer-use-state-lazy-initialization': 'warn',
      'react-naming-convention/component-name': ['warn', 'PascalCase'],
      'react-naming-convention/filename': ['warn', 'kebab-case'],
      'react-naming-convention/use-state': 'warn'
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
          internalPattern: ['~/**'],
          newlinesBetween: 'always',
          maxLineLength: undefined,
          groups: [
            'react-type',
            'next-type',
            'type',
            'internal-type',
            'parent-type',
            'sibling-type',
            'index-type',
            'react',
            'next',
            'builtin',
            'external',
            'alias-app',
            'alias-components',
            'alias-lib',
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
              react: ['react', 'react-*', 'react/*'],
              next: ['next', 'next-*', 'next/*'],
              'alias-app': ['@/app/*'],
              'alias-components': ['@/components/*'],
              'alias-lib': ['@/lib/*', '@/utils/*']
            },
            type: {
              'react-type': ['react', 'react-*', 'react/*'],
              'next-type': ['next', 'next-*', 'next/*']
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
      ],

      'ts/adjacent-overload-signatures': 'off',
      'perfectionist/sort-object-types': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          partitionByNewLine: true,
          groupKind: 'required-first',
          groups: ['id', 'boolean', 'className', 'unknown', 'callback'],
          customGroups: {
            id: 'id',
            className: '*ClassName',
            boolean: 'is*',
            callback: 'on*'
          }
        }
      ],

      'sort-keys': 'off',
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          partitionByComment: false,
          partitionByNewLine: true,
          styledComponents: true,
          destructureOnly: false,
          ignorePattern: [],
          groups: ['id', 'boolean', 'className', 'unknown', 'callback'],
          customGroups: {
            id: 'id',
            className: '*ClassName',
            boolean: 'is*',
            callback: 'on*'
          }
        }
      ],

      'ts/sort-type-constituents': 'off',
      'perfectionist/sort-union-types': [
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
      ]
    }
  }
}).append(...tailwind.configs['flat/recommended']);
