module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  parser: "babel-eslint",
  plugins: ['prettier'],
  env: {node: true, es6: true},
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
  }
};
