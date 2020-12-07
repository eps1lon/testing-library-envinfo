const envinfo = require("envinfo");

envinfo
  .run(
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
      duplicates: true,
      // include transitive dependencies and important packages that are transitive dependencies (e.g. `jsdom` is usually a transitive dependency inside jest)
      fullTree: true,
      markdown: true,
      showNotFound: true,
    }
  )
  .then((env) => console.log(env));
