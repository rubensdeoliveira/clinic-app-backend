module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts'
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true
}
