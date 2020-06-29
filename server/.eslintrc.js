module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'comma-dangle': 'off',
    'prettier/prettier': 'error',
    'no-undef': 'off',
  },
}
