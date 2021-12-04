module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!**/main/**',
    '!**/errors/**',
    '!**/mocks/**',
    '!**/migrations/**',
    '!**/entities/**',
    '!**/protocols/**',
    '!**/config/**',
    '!**/middlewares/express/**',
    '!**/factories/**',
    '**/routes/**',
    '!**/index.ts',
    '!**/html-to-pdf-adapter.ts',
    '!**/s3-storage-adapter.ts',
    '!**/**type.ts',
    '!**/**migration.ts',
    '!**/**entity.ts',
    '!**/connection.ts',
    '!**.hbs',
    '!**.ejs'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
