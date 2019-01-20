const rp = require('request-promise');
const cheerio = require('cheerio')
async function getHTML(url) {
  try {
    const response = await rp(url);
    return response;
  } catch (err) {
    console.log('error in getting the html');
    throw err;
  }
}

async function parseHTML(html) {
  try {
    const $ = cheerio.load(html);
    console.log('loading', $);
    const className = 'storylink';
    const results = $('a[class*="storylink"]');
    console.log('resultsss', results);
    console.log('resultsss', results.length);
    results.map((i, elem) => {
      console.log(i, $(elem).text());
      return 'test';
    });
    return results;
  } catch (err) {
    console.log('error in parsing html with cheerio');
    throw err;
  }
}


async function outputHTML(url) {
  // console.log(await getHTML(url));
  const responses = await getHTML(url);
  parseHTML(responses);
}

// const urls = argv.url;
outputHTML('https://news.ycombinator.com/');
module.exports = {
  getHTML,
  parseHTML
};
