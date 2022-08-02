module.exports = {
  "extends": ["taro/react", 'eslint-config-tencent', 'eslint-config-tencent/ts'],
  "rules": {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
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
  }
}
