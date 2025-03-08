module.exports = {
  extends: 'next/core-web-vitals',
  overrides: [
    {
      files: ['jest.setup.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off'
      }
    }
  ]
}; 