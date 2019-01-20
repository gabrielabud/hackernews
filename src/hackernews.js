const rp = require('request-promise');
const cheerio = require('cheerio');
const validUrl = require('valid-url');
const { validateString, validateNumber } = require('./inputValidation');

// make HTTP request to hackernews website, returning a promise of the HTML output
async function getHTML(url) {
  try {
    const response = await rp(url);
    return response;
  } catch (err) {
    console.log('#getHTML error twhile making the http request to hackernews');
    throw err;
  }
}

// parse HTML using cheerio package to load the HTML and select DOM elements
async function parseHTML(html) {
  try {
    const $ = cheerio.load(html);
    // select each element from the DOM which class equal "storylink"
    // all the other elements of the DOM will be manipulated relative
    // to this selected class
    const allStorylinkClasses = $('a[class*="storylink"]');
    const results = [];
    allStorylinkClasses.each((i, elem) => {
      const title = $(elem).text();
      const uri = $(elem).attr('href');
      // finding the class="subtext" relative to the class="storylink"
      // the "subtext" class element contains information about
      // points, author and comments
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
        author: validateString(author) ? author : '',
        points: validateNumber(points) ? points : 0,
        comments: validateNumber(comments) ? comments : 0,
        rank: validateNumber(rank) ? rank : 0,
      };
      // constructing an array of posts objects
      results.push(hackernewsObj);
    });
    return results;
  } catch (err) {
    console.log('error in parsing html with cheerio');
    throw err;
  }
}

module.exports = {
  getHTML,
  parseHTML
};
