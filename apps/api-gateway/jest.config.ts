/* eslint-disable */
export default {
  displayName: 'api-gateway',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  coverageDirectory: '../../coverage/apps/api-gateway',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/app/users/documentation/'
  ],
};
