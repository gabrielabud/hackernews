const validateString = (str) => {
  const n = str.length;
  if (n === 0 || n >= 256) {
    return false;
  }
  return true;
};

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
