#!/usr/bin/env node
const { spawnSync } = require("child_process");

const options = {
  npmPackages: `{${[
    "@testing-library/*",
    // important transitive dependencies
    "aria-query",
    "dom-accessibility-api",
    // Libraries tested by @testing-library/*
    "react",
    "react-dom",
    // testing environment
    "jsdom",
    // test runner
    "jest",
  ]}}`,
  Binaries: ["Node", "Yarn", "npm"],
  System: ["OS"],
};

const { status } = spawnSync(
  "npx",
  [
    "envinfo",
    "--raw",
    `${JSON.stringify(options)}`,
    "--duplicates",
    "--fullTree",
    "--showNotFound",
  ],
  {
    stdio: "inherit",
  }
);

if (status !== null) {
  process.exit(status);
}
