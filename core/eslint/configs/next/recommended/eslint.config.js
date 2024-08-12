const { antfu } = require('@antfu/eslint-config');

module.exports = antfu({
  javascript: {
    overrides: {
      'antfu/top-level-function': 'off'
    }
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type']
    }
  },
  react: true,
  stylistic: {
    quotes: 'single',
    jsx: true,
    indent: 2,
    semi: true,
    overrides: {
      'style/comma-dangle': ['error', 'never'],
      'style/member-delimiter-style': [
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
      'style/arrow-parens': ['always']
    }
  }
});
