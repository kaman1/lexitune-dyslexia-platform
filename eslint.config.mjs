import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: [
      '.next/',
      'out/',
      'build/',
      'dist/',
      'node_modules/',
      '.vercel/',
      '.turbo/',
      '.wrangler/',
      '.convex/',
      'convex/_generated/**',
      '*.d.ts',
      'public/',
      '.env*',
      'next.config.*'
    ]
  }
]; 