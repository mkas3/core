const { antfu } = require('@antfu/eslint-config');
const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');
const { FlatCompat } = require('@eslint/eslintrc');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const tailwind = require('eslint-plugin-tailwindcss');

const compat = new FlatCompat();

let nextConfigs = fixupConfigRules(
  compat.config({
    extends: ['plugin:@next/next/core-web-vitals']
  })
).map((config, index) =>
  index === 0
    ? { ...config, name: 'mkas3/next/rules' }
    : { ...config, name: 'mkas3/next/rules/web-vitals' }
);

nextConfigs = [{ name: 'mkas3/next/setup', plugins: nextConfigs[0].plugins }, ...nextConfigs];

nextConfigs = nextConfigs.map((config, index) =>
  index >= 1
    ? {
        ...config,
        files: ['**/*.?([cm])[jt]s?(x)'],
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true
            }
          }
        },
        plugins: []
      }
    : config
);

let tailwindConfigs = tailwind.configs['flat/recommended']
  .map((config) => ({
    ...config,
    name: config.name === 'tailwindcss:base' ? 'mkas3/tailwindcss/base' : 'mkas3/tailwindcss/rules'
  }))
  .map((config) => ({ ...config, files: ['**/*.?([cm])[jt]s?(x)'] }));

tailwindConfigs = tailwindConfigs.with(1, {
  ...tailwindConfigs[1],
  languageOptions: { ...tailwindConfigs[0].languageOptions }
});

delete tailwindConfigs[0].languageOptions;

module.exports = antfu(
  {
    react: {
      overrides: {
        'antfu/top-level-function': 'off',

        'react/no-class-component': 'error',
        'react/no-default-props': 'error',
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
      indent: 2,
      jsx: true,
      overrides: {
        'style/arrow-parens': ['error', 'always'],
        'style/comma-dangle': ['error', 'never'],
        'style/jsx-quotes': ['error', 'prefer-single'],
        'style/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true
            },
            multilineDetection: 'brackets',
            singleline: {
              delimiter: 'semi',
              requireLast: false
            }
          }
        ],

        'import/order': 'off',
        'sort-imports': 'off',

        'perfectionist/sort-exports': [
          'error',
          { ignoreCase: true, order: 'asc', type: 'alphabetical' }
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              type: {
                'next-type': ['next', 'next-*', 'next/*'],
                'react-type': ['react', 'react-*', 'react/*']
              },
              value: {
                'alias-app': ['@/app/*'],
                'alias-components': ['@/components/*'],
                'alias-lib': ['@/lib/*', '@/utils/*'],
                'next': ['next', 'next-*', 'next/*'],
                'react': ['react', 'react-*', 'react/*']
              }
            },
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
            ignoreCase: true,
            internalPattern: ['~/**'],
            maxLineLength: undefined,
            newlinesBetween: 'always',
            order: 'asc',
            type: 'alphabetical'
          }
        ],
        'perfectionist/sort-named-exports': [
          'error',
          {
            groupKind: 'types-first',
            ignoreCase: true,
            order: 'asc',
            type: 'alphabetical'
          }
        ],
        'perfectionist/sort-named-imports': [
          'error',
          {
            groupKind: 'types-first',
            ignoreAlias: false,
            ignoreCase: true,
            order: 'asc',
            type: 'alphabetical'
          }
        ],

        'perfectionist/sort-array-includes': 'error',
        'perfectionist/sort-intersection-types': [
          'error',
          {
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
            ],
            ignoreCase: true,
            order: 'asc',
            type: 'alphabetical'
          }
        ],

        'perfectionist/sort-jsx-props': [
          'error',
          {
            customGroups: {
              key: 'key',
              className: 'className',
              otherClassName: '*ClassName',
              callback: 'on*',
              ref: 'ref'
            },
            groups: [
              'key',
              'ref',
              'className',
              'otherClassName',
              'unknown',
              'shorthand',
              'callback'
            ],
            ignoreCase: true,
            ignorePattern: [],
            order: 'asc',
            type: 'alphabetical'
          }
        ],
        'style/jsx-sort-props': 'off',

        'perfectionist/sort-object-types': [
          'error',
          {
            customGroups: {
              id: 'id',
              className: '*ClassName',
              boolean: 'is*',
              callback: 'on*'
            },
            groupKind: 'required-first',
            groups: ['id', 'boolean', 'className', 'unknown', 'callback'],
            ignoreCase: true,
            order: 'asc',
            partitionByNewLine: true,
            type: 'alphabetical'
          }
        ],
        'ts/adjacent-overload-signatures': 'off',

        'perfectionist/sort-objects': [
          'error',
          {
            customGroups: {
              key: 'key',
              id: 'id',
              className: 'className',
              otherClassName: '*ClassName',
              callback: 'on*',
              children: 'children'
            },
            destructureOnly: false,
            groups: ['key', 'id', 'className', 'otherClassName', 'unknown', 'children', 'callback'],
            ignoreCase: true,
            ignorePattern: [],
            order: 'asc',
            partitionByComment: false,
            partitionByNewLine: true,
            styledComponents: true,
            type: 'alphabetical'
          }
        ],
        'sort-keys': 'off',

        'perfectionist/sort-union-types': [
          'error',
          {
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
            ],
            ignoreCase: true,
            order: 'asc',
            type: 'alphabetical'
          }
        ],
        'ts/sort-type-constituents': 'off'
      },
      quotes: 'single',
      semi: true
    },
    typescript: {
      overrides: {
        'ts/consistent-type-definitions': ['error', 'type'],
        'ts/strict-boolean-expressions': 'off'
      }
    }
  },
  ...nextConfigs,
  ...tailwindConfigs
)
  .renamePlugins({
    '@next/next': 'next'
  })
  .override('antfu/react/setup', (config) => ({
    ...config,
    plugins: {
      ...config.plugins,
      'react-hooks': fixupPluginRules(reactHooksPlugin)
    }
  }));
