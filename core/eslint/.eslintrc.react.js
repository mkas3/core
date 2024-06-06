/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['simple-import-sort', 'prettier'],
  ignorePatterns: ['dist'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'consistent-return': 'off',
    'max-len': 'off',
    'no-param-reassign': 'warn',
    'no-console': ['warn', { allow: ['info', 'error'] }],
    'require-await': 'error',
    'sort-imports': 'off',

    'react/boolean-prop-naming': 'warn',
    'react/button-has-type': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function'],
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/hook-use-state': 'warn',
    'react/jsx-curly-brace-presence': [
      'warn',
      {
        props: 'never',
        children: 'never',
        propElementValues: 'always'
      }
    ],
    'react/jsx-filename-extension': [
      'warn',
      {
        allow: 'as-needed',
        ignoreFilesWithoutCode: true
      }
    ],
    'react/jsx-handler-names': [
      'warn',
      {
        eventHandlerPrefix: 'on',
        eventHandlerPropPrefix: 'on'
      }
    ],
    'react/jsx-indent': 'off',
    'react/jsx-newline': 'off',
    'react/jsx-no-constructed-context-values': 'warn',
    'react/jsx-no-leaked-render': ['warn', { validStrategies: ['coerce'] }],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandLast: true,
        multiline: 'first',
        reservedFirst: ['key', 'ref', 'className']
      }
    ],
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'warn',
    'react/no-object-type-as-default-prop': 'warn',
    'react/no-unstable-nested-components': [
      'warn',
      {
        allowAsProps: true
      }
    ],
    'react/no-unused-prop-types': 'warn',
    'react/prop-types': 'off',
    'react/style-prop-object': 'warn',
    'react/void-dom-elements-no-children': 'warn',

    'react-hooks/exhaustive-deps': 'warn',

    'import/order': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',

    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
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
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      },
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended'
      ],
      rules: {
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/restrict-template-expressions': [
          'warn',
          { allowBoolean: true, allowNullish: true }
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', disallowTypeAnnotations: false }
        ],
        '@typescript-eslint/require-await': 'error',

        'max-len': 'off',
        'consistent-return': 'off',
        'no-shadow': 'off',
        'no-param-reassign': 'warn',
        'no-console': ['warn', { allow: ['info', 'error'] }],
        'sort-imports': 'off',
        'require-await': 'error',

        'import/order': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',

        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // External packages:
              ['^@?\\w'],
              // Internal packages:
              ['^@(mkas3/core/.*|$)'],
              // Alias imports:
              ['^@(([\\/.]?\\w)|assets|test-utils)'],
              // Side effect imports:
              ['^\\u0000'],
              // Parent imports:
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports:
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
            ]
          }
        ]
      }
    }
  ]
};
