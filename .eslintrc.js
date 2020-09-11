module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    __dirname: true,
    process: true,
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  rules: {
    semi: 'error',
    'no-extra-boolean-cast': 'off',
  },
  plugins: ['react'],
};
