# Line-by-line comments for eslint.config.js

```js
import js from '@eslint/js'  // Import ESLint JavaScript configuration presets
import globals from 'globals'  // Import global variables definitions
import reactHooks from 'eslint-plugin-react-hooks'  // Import React hooks ESLint plugin
import reactRefresh from 'eslint-plugin-react-refresh'  // Import React refresh ESLint plugin

export default [
  { ignores: ['dist'] },  // Ignore files in the dist directory
  {
    files: ['**/*.{js,jsx}'],  // Apply these rules to all JS and JSX files
    languageOptions: {
      ecmaVersion: 2020,  // Use ECMAScript 2020 syntax
      globals: globals.browser,  // Use browser global variables
      parserOptions: {
        ecmaVersion: 'latest',  // Use latest ECMAScript version
        ecmaFeatures: { jsx: true },  // Enable JSX parsing
        sourceType: 'module',  // Use ES modules
      },
    },
    plugins: {
      'react-hooks': reactHooks,  // Enable react-hooks plugin
      'react-refresh': reactRefresh,  // Enable react-refresh plugin
    },
    rules: {
      ...js.configs.recommended.rules,  // Use recommended JS rules
      ...reactHooks.configs.recommended.rules,  // Use recommended react-hooks rules
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],  // Error on unused vars except those starting with uppercase or underscore
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },  // Warn if non-component exports in React refresh
      ],
    },
  },
]
