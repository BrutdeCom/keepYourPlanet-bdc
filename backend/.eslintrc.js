module.exports = {
  env: {
    node: true
    // mocha: true
  },
  extends: [
    'standard',
    // "plugin:lodash/canonical"
    'plugin:node/recommended',
    'plugin:unicorn/recommended'
    // "plugin:sonarjs/recommended"
    // "plugin:mocha/recommended"

  ],
  plugins: [
    // "mocha",
    // "chai-expect",
    // "optimize-regex",
    'lodash',
    'unicorn'
    // "sonarjs"
  ],
  // globals: {
  //     describe: true,
  //     it: true,
  //     chai: true,
  //     expect: true // for chai
  // },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {

    // Unicorn
    'unicorn/no-null': 0,
    'no-useless-catch': 0,
    'no-useless-escape': 0,
    'unicorn/no-reduce': 0,
    'unicorn/prevent-abbreviations': [
      'off',
      {
        replacements: {
          env: {
            environment: false // issues with process.env
          }
        }
      }
    ],
    'unicorn/filename-case': [
      'error',
      {
        cases: { camelCase: true }
      }
    ],
    'lodash/prop-shorthand': 'error'
  }

}
