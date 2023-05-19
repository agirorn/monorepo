// const fs = require("fs");
// console.log("######################################");
// const dir = process.cwd();
// console.log(`dir: ${dir}`);
//
// fs.readdirSync(dir).forEach((file) => {
//   console.log(file);
// });
//
// console.log("######################################");
//
// fs.readdirSync(dir + "/..").forEach((file) => {
//   console.log(file);
// });
//
// console.log("######################################");
module.exports = {
  extends: ["eslint:recommended", "plugin:node/recommended", "prettier"],
  ignorePatterns: ["**/node_modules/*.js"],
  plugins: ["node", "prettier"],
  parser: "@typescript-eslint/parser",
  rules: {
    quotes: ["error", "double"],
    "prettier/prettier": "error",
    "block-scoped-var": "error",
    eqeqeq: "error",
    "no-var": "error",
    "prefer-const": "error",
    "eol-last": "error",
    "prefer-arrow-callback": "error",
    "no-trailing-spaces": "error",
    "no-console": "error",
    "no-restricted-properties": [
      "error",
      {
        object: "describe",
        property: "only",
      },
      {
        object: "it",
        property: "only",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-extra-non-null-assertion": "error",
        "@typescript-eslint/no-extraneous-class": "warn",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-warning-comments": "off",
        "@typescript-eslint/no-unsafe-assignment": "error",
        "node/no-missing-import": "off",
        "node/no-empty-function": "off",
        "node/no-unsupported-features/es-syntax": "off",
        "node/no-missing-require": "off",
        "node/shebang": "off",
        "no-dupe-class-members": "off",
        "require-atomic-updates": "off",
      },
      parserOptions: {
        sourceType: "module",
        project: ["./tsconfig.json"],
      },
    },
    {
      files: ["**/*.json"],
      rules: {
        quotes: ["error", "double", { avoidEscape: true }],
      },
    },
  ],
};
