# eslint-config-viking

> TypeScript ESLint configuration for Vikings

Based on [gts][gts-url] ESLint rules and uses [Prettier][prettier-url] for code
formatting configured with [prettier-config-viking][prettier-config-viking-url]
configuration

## Setup

You will have to setup the [prettier-config-viking][prettier-config-viking-url]
configuration or similar and configure it correctly.

```bash
yarn add --dev eslint-config-viking \
  && yarn add --dev prettier-config-viking \
  && echo '{\n  "extends": ["viking"]\n}' > .eslintrc.json \
  && echo '"prettier-config-viking"' > .prettierrc.json
```

## Usage

```bash
yarn eslint src
```

[gts-url]: https://github.com/google/gts
[prettier-url]: https://github.com/prettier/prettier
[prettier-config-viking-url]: https://www.npmjs.com/package/prettier-config-viking
