module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!**/errors/**',
    '!**/mocks/**',
    '!**/migrations/**',
    '!**/entities/**',
    '!**/data/**/protocols/**',
    '!**/config/**',
    '!**/factories/**',
    '!**/main/application/**',
    '!**/index.ts',
    '!**/server.ts',
    '!**/**type.ts',
    '!**/**migration.ts',
    '!**/**entity.ts',
    '!**/connection.ts'
  ],
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
