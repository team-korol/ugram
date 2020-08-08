module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
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
