module.exports = {
  root: true,
  extends: ['eslint-config-tencent', 'eslint-config-tencent/ts'],
  env: {
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'react-hooks',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
    complexity: ['error', 4],
    'max-len': ['error', { code: 150 }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
        pathGroupsExcludedImportTypes: [
          'builtin',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
      },
    ],
  },
};
