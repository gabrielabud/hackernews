const chai = require('chai');
const { validateNumber, validateString } = require('../src/inputValidation');

chai.should();

describe('#validateNumber', () => {
  it('should return false for negative integer', () => {
    const valid = validateNumber(-10);
    valid.should.eql(false);
  });
  it('should return false for NaN', () => {
    const valid = validateNumber(NaN);
    valid.should.eql(false);
  });
  it('should return true for positive integer', () => {
    const valid = validateNumber(10);
    valid.should.eql(true);
  });
  it('should return false for strings greater than 256 characters', () => {
    const sampleString = 'Bm8aUnHICmaOHlQM5RUDoh4DUCTlW7JARSzWMC0fK6gsvViVYVexBaoBx6jTxeSROUxalxPpevEOcSSGc2NZZLAiduZKUJVbUsLc0Lh3ASUPGkxwNuOY1AzNmO2rZYkpsYkK9AvSAw7Sqi3AsscZ4uc2E1CJY6mvW0mh0SpF43Qo3omEnvzEVLFKCsItRHFj2PqjBG14hbrX77wIRU3FwVv7l9TGTGV46zGVm5IXsmAmIA10OkLPAxoWJZRLBmPDLr';
    const valid = validateString(sampleString);
    sampleString.length.should.eql(258);
    valid.should.eql(false);
  });
});
