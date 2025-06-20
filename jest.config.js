/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/components/**/*.{ts,tsx}",
    "!./src/components/**/types.{ts,tsx}",
    "!./src/types/**/*.{ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      lines: 45,
      statements: 45,
      functions: 45,
      branches: 45,
    },
  },
  coverageReporters: ["text-summary", "json", "html"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
};

module.exports = createJestConfig(config);
