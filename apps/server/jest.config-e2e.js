module.exports = {
  displayName: 'server-e2e',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec-e2e.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(e2e-spec).[jt]s'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/server',
  setupFilesAfterEnv: ['jest-expect-jwt'],
};
