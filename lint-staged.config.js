module.exports = {
  '*.js': [
    'npm run lint:eslint',
    'npm run lint:prettier',
    'git add',
    'npm run test:unit:file',
  ],
  '{!(package)*.json,*.code-snippets,.*rc}': [
    'npm run lint:prettier --parser json',
    'git add',
  ],
  'package.json': ['yarn lint:prettier', 'git add'],
  '*.vue': [
    'npm run lint:eslint',
    // 'yarn lint:stylelint',
    'npm run lint:prettier',
    'git add',
    'npm run test:unit:file',
  ],
  // '*.styl': ['yarn lint:stylelint', 'yarn lint:prettier', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add'],
}
