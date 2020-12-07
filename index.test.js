const { execFileSync } = require("child_process");
const path = require("path");

function execEnvinfo(args) {
  const packagePath = __dirname;

  return execFileSync(
    "npx",
    ["--package", packagePath, "testing-library-envinfo", ...args],
    { encoding: "utf-8", stdio: "pipe" }
  );
}

test("logs info about the environment", () => {
  const packagePath = path.resolve(__dirname, "../../");

  const envinfoJSON = execEnvinfo(["react", "--json"]);

  const envinfo = JSON.parse(envinfoJSON);
  expect(envinfo).toEqual({
    Binaries: {
      Node: {
        path: expect.any(String),
        version: expect.any(String),
      },
      Yarn: {
        path: expect.any(String),
        version: expect.any(String),
      },
      npm: {
        path: expect.any(String),
        version: expect.any(String),
      },
    },
    System: {
      OS: expect.any(String),
    },
    npmPackages: {
      "@testing-library/dom": {
        installed: expect.any(String),
      },
      "@testing-library/react": {
        installed: expect.any(String),
        wanted: expect.any(String),
      },
      "aria-query": {
        installed: expect.any(String),
      },
      "dom-accessibility-api": {
        installed: expect.any(String),
      },
      jest: {
        installed: expect.any(String),
        wanted: expect.any(String),
      },
      jsdom: {
        installed: expect.any(String),
      },
      react: {
        installed: expect.any(String),
        wanted: expect.any(String),
      },
      "react-dom": {
        installed: expect.any(String),
        wanted: expect.any(String),
      },
    },
  });
});

test("throws on unknown packages", () => {
  expect(() => {
    execEnvinfo(["nonse-nonexisting"]);
  }).toThrow();
});
