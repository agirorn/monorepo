module.exports = {
  extends: ["@monorepo/eslint-config"],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    "node/no-extraneous-import": "off",
  },
};
