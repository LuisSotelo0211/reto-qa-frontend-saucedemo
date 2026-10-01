const { mkdirSync } = require('node:fs');

mkdirSync('reports', { recursive: true });

module.exports = {
  default: {
    paths: ['tests/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['tests/support/**/*.ts', 'tests/steps/**/*.ts'],
    format: ['progress', 'html:reports/cucumber.html'],
  },
};
