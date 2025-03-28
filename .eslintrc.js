// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  ignorePatterns: ['/dist/*', '/node_modules/*'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
