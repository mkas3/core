const { eslint } = require('@mkas3/eslint');

module.exports = {
  ...eslint.node,
  parserOptions: {
    ...eslint.node.parserOptions,
    tsconfigRootDir: __dirname
  }
};
