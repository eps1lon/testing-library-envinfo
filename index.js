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

const { error, stderr, stdout, status } = spawnSync(
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
    encoding: "utf-8",
  }
);

if (error) {
  throw error;
}
console.log(stdout);
if (stderr) {
  console.error(stderr);
  process.exit(status);
}
