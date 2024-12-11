/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/tmp/jest_rs",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['lcov', 'text'],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;