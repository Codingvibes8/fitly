// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tseslint = require('typescript-eslint');

module.exports = defineConfig([
  ...tseslint.configs.recommended,
  expoConfig,
  {
    ignores: ['dist/*'],
  },
]);