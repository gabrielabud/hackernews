const rp = require('request-promise');
const cheerio = require('cheerio');

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
      const points = $(subtextHtmlClass).eq(0).text();
      const author = $(subtextHtmlClass).eq(1).text();
      const comments = $(subtextHtmlClass).eq(5).text();
      const rank = $(elem).parent().parent().text();
      const hackernewsObj = {
        title,
        uri,
        author,
        points: parseInt(points, 10),
        comments: parseInt(comments, 10),
        rank: parseInt(rank, 10)
      };
      results.push(hackernewsObj);
    });
    return results;
  } catch (err) {
    console.log('error in parsing html with cheerio');
    throw err;
  }
}
// async function outputHTML(url) {
//   // console.log(await getHTML(url));
//   const responses = await getHTML(url);
//   console.log('respones', responses);
//   parseHTML(responses);
// }

// // const urls = argv.url;
// outputHTML('https://news.ycombinator.com/');
module.exports = {
  getHTML,
  parseHTML
};
