#!/usr/bin/env node
const envinfo = require("envinfo");

const [info, ...args] = process.argv.slice(2);
const json = args.indexOf("--json") !== -1;

function reactInfo() {
  return envinfo.run(
    {
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
    },
    {
      json,
      duplicates: true,
      fullTree: true,
      showNotFound: true,
    }
  );
}

let getInfo;
switch (info) {
  case "react":
    getInfo = reactInfo;
    break;
  default:
    getInfo = () => {
      throw new Error(`Unable to provide environment info for '${info}'.`);
    };
}

getInfo().then(
  (info) => {
    console.log(info);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
