const argv = require('minimist')(process.argv.slice(2));
const { getHTML, parseHTML } = require('./src/hackernews');

const URL = 'https://news.ycombinator.com/';
const POSTS_PER_PAGE = 30;

// validate command line -posts n argument
// where n must a positive integer <= 100.
function validateArgument(n) {
  return (n < 0 || n > 100 || !Number.isInteger(n));
}

async function hackernews() {
  // destructure the value of 'n' when running hackernews -posts n from CLI
  const { posts } = argv;
  if (validateArgument(posts)) {
    console.log(
      `App wrongly called! You should type in:
      hackernews --posts n
      --posts how many posts to print. A positive integer <= 100.
      `
    );
    return '';
  }
  // determine how many Hacker News pages to pagesToScrape
  // currently hackernews displays 30 posts per page
  const pagesToScrape = Math.trunc(posts / POSTS_PER_PAGE) + 1;
  let n = 1;
  const htmlPromises = [];
  // start requesting the HTML per each Hacker News page
  while (n <= pagesToScrape) {
    const page = (n === 1) ? URL : `${URL}news?p=${n}`;
    htmlPromises.push(getHTML(page));
    n += 1;
  }
  const htmlResponses = await Promise.all(htmlPromises);
  const parsedHTMLPromises = [];
  // parse the HTML by selecting DOM elements using cheerio
  htmlResponses.forEach((html) => {
    parsedHTMLPromises.push(parseHTML(html));
  });
  const parsedHTML = await Promise.all(parsedHTMLPromises);
  // construct the full array of posts' objects
  const allPosts = parsedHTML.reduce((acc, val) => acc.concat(val), []);
  const results = allPosts.slice(0, posts);
  console.log(JSON.stringify(results));
  return JSON.stringify(results);
}

hackernews();
