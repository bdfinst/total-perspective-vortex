module.exports = {
  verbose: true,
  bail: 1,
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 35,
      lines: 40,
      statements: 40,
    },
  },
  coverageReporters: ['text', 'lcov', 'json', 'html'],
}
