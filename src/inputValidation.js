// validate strings which are non empty & not longer than 256 characters
const MAX_LENGTH = 256;
const validateString = (str) => {
  const n = str.length;
  if (n === 0 || n > MAX_LENGTH) {
    return false;
  }
  return true;
};

// helper for validating whether the points, comments and rank are integers >= 0
const validateNumber = (nr) => {
  return nr >= 0;
};

module.exports = {
  validateString,
  validateNumber
};
