module.exports = {
  cacheDirectory: __dirname + '/.jest_cache',
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testRegex: '(.*.(test|spec)).(jsx?|tsx?|ts?)$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/node_modules/**',
    '!**/*.test.data.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 90,
      functions: 0,
      lines: 0,
    },
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'junit-TEST.xml',
      },
    ],
  ],
  coveragePathIgnorePatterns: [
    '.*test\\.data\\.ts$,migrations.*.ts$,(.*.(test|spec)).(jsx?|tsx?)$,(tests/.*.mock).(jsx?|tsx?)$',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  verbose: true,
}