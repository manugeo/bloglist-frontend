/* eslint-env node */
module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest/globals": true,
    "cypress/globals": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": [
    "react", "jest", "cypress"
  ],
  "rules": {
    "quotes": [
      "warn",
      "single"
    ],
    "semi": [
      "warn",
      "always"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "warn",
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}