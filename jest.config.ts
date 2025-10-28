module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/tests/setup.ts"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  extensionsToTreatAsEsm: [".ts"],
   globals: {
    "ts-jest": {
      useESM: true, 
    },
  },
  testMatch: ["<rootDir>/src/tests/*.(test|spec).ts"]
};