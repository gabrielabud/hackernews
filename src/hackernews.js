const rp = require('request-promise');
const cheerio = require('cheerio');
const validUrl = require('valid-url');
const { validateString, validateNumber } = require('./inputValidation');

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
    const allStorylinkClasses = $('a[class*="storylink"]');
    const results = [];
    allStorylinkClasses.each((i, elem) => {
      const title = $(elem).text();
      const uri = $(elem).attr('href');
      const subtextHtmlClass = $(elem)
        .parent()
        .parent()
        .next()
        .children('.subtext')
        .children();
      const points = parseInt($(subtextHtmlClass).eq(0).text(), 10);
      const author = $(subtextHtmlClass).eq(1).text();
      const comments = parseInt($(subtextHtmlClass).eq(5).text(), 10);
      const rank = parseInt($(elem).parent().parent().text(), 10);
      const hackernewsObj = {
        title: validateString(title) ? title : '',
        uri: validUrl.isUri(uri) ? uri : '',
        author: validateString(author) ? title : '',
        points: validateNumber(points) ? points : 0,
        comments: validateNumber(comments) ? comments : 0,
        rank: validateNumber(rank) ? rank : 0,
      };
      results.push(hackernewsObj);
    });
    return results;
  } catch (err) {
    console.log('error in parsing html with cheerio');
    throw err;
  }
}
async function outputHTML(url) {
  const responses = await getHTML(url);
  console.log(parseHTML(responses));
}

// const urls = argv.url;
outputHTML('https://news.ycombinator.com/');
module.exports = {
  getHTML,
  parseHTML
};
