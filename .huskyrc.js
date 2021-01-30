const tasks = (arr) => arr.join('&&')

module.exports = {
  hooks: {
    'pre-commit': tasks([
      'npm run format:fix',
      'npm run lint:fix',
      'git add .',
      'npm run lint:check',
      'npm run format:check',
      'npm run coverage',
    ]),
  },
}
