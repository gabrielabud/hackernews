// validate strings which are non empty strings not longer than 256 characters
const validateString = (str) => {
  const n = str.length;
  if (n === 0 || n > 256) {
    return false;
  }
  return true;
};

// helper for validating whether the points, comments and rank are integers >= 0
const validateNumber = (nr) => {
  const parsedNr = parseInt(nr, 10);
  if (Number.isNaN(parsedNr) || parsedNr < 0) {
    return false;
  }
  return true;
};

module.exports = {
  validateString,
  validateNumber
};
