const test = String(process.env.TEST);

module.exports = {
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test/reports',
      outputName: 'TestReport_' + test.trim() + '.xml'
    }]
  ]
};
