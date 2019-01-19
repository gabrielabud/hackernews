const rp = require('request-promise');

async function getHTML(url) {
  try {
    const response = await rp(url);
    return response;
  } catch (err) {
    console.log('error in getting the html');
    throw err;
  }
}

module.exports = {
  getHTML
};
