// file: jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.js"], // <= setup file here
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
