// // @ts-check
// import eslint from '@eslint/js';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';

// export default tseslint.config(
//   {
//     ignores: ['eslint.config.mjs', 'dist', 'node_modules'],
//   },
//   // TypeScript + ESLint recommended
//   ...tseslint.configs.recommendedTypeChecked,
//   // Prettier integration
//   eslintPluginPrettierRecommended,

//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       sourceType: 'module', // ✅ ES modules
//       parserOptions: {
//         project: ['./tsconfig.json'], // ✅ better for type-aware rules
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
//   {
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'off', // ✅ often needed for practical work
//       '@typescript-eslint/no-floating-promises': 'warn',
//       '@typescript-eslint/no-unsafe-argument': 'warn',
//       '@typescript-eslint/no-unsafe-assignment': 'off', // ✅ fix your db config warnings
//       '@typescript-eslint/no-unused-vars': [
//         'warn',
//         { argsIgnorePattern: '^_' },
//       ],
//       'prettier/prettier': ['error', { endOfLine: 'auto' }],
//     },
//   },
// );
