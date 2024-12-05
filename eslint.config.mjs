import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import vueEslint from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import vuePrettierEslIntConfig from '@vue/eslint-config-prettier';
import cypressEslint from 'eslint-plugin-cypress/flat';

export default [
  ...vueEslint.configs['flat/recommended'],
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...vueTsEslintConfig(),
  vuePrettierEslIntConfig,
  {
    cypressEslint,
    files: ['cypress/integration/**.spec.{js,ts,jsx,tsx}'],
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
    ignores: [
      'logs',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'pnpm-debug.log*',
      'lerna-debug.log*',
      'node_modules',
      '.DS_Store',
      'dist',
      'dist-ssr',
      'coverage',
      '.scannerwork',
      '*.local',
      'cypress/videos/',
      'cypress/screenshots/',
      'results',
      '.vscode/*',
      '!.vscode/extensions.json',
      '!.vscode/launch.json',
      '!.vscode/settings.json',
      '.idea',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      '*.sw?',
      'dev-dist/',
    ],
  },
];
