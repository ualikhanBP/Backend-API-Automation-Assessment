module.exports = {
  default: {
    require: ['src/steps/**/*.ts', 'src/hooks/**/*.ts'],
    requireModule: ['ts-node/register'],
    paths: ['src/features/**/*.feature'],
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ]
  }
};
