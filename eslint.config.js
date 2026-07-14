const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const cypressPlugin = require('eslint-plugin-cypress');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
  cypressPlugin.configs.recommended,
  prettierConfig,
  {
    ignores: [
      'node_modules/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
      'dist/**',
      'eslint.config.js',
    ],
  }
);
