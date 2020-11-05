module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['prettier'],
  env: {node: true, es6: true},
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/display-name': 'off',
  }
};
