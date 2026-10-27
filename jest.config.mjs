import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig({
  testEnvironment: "node",
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  testMatch: [
    "<rootDir>/content/**/*.test.ts",
    "<rootDir>/lib/**/*.test.ts",
    "<rootDir>/features/**/data/**/*.test.ts",
  ],
  collectCoverageFrom: [
    "content/**/*.ts",
    "lib/**/*.ts",
    "features/**/data/**/*.ts",
    "!**/*.test.ts",
    "!**/*.d.ts",
  ],
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ["/node_modules/", "/.next/", "/app/", "/components/"],
});
