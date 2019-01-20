const argv = require('minimist')(process.argv.slice(2));
const { getHTML, parseHTML } = require('./src/hackernews');

const url = 'https://news.ycombinator.com/';

async function hackernews() {
  const { posts } = argv;
  if (posts < 0 || posts > 100 || !Number.isInteger(posts)) {
    console.log(
      `App wrongly called! You should type in:
      hackernews --posts n
      --posts how many posts to print. A positive integer <= 100.
      `
    );
    return '';
  }
  const pagesToScrape = Math.trunc(posts / 30) + 1;
  let n = 1;
  const htmlPromises = [];
  while (n <= pagesToScrape) {
    const page = (n === 1) ? url : `${url}news?p=${n}`;
    htmlPromises.push(getHTML(page));
    n += 1;
  }
  const htmlResponses = await Promise.all(htmlPromises);
  const parsedHTMLPromises = [];
  htmlResponses.forEach((html) => {
    parsedHTMLPromises.push(parseHTML(html));
  });
  const parsedHTML = await Promise.all(parsedHTMLPromises);
  const allPosts = parsedHTML.reduce((acc, val) => acc.concat(val), []);
  const results = allPosts.slice(0, posts);
  console.log(JSON.stringify(results));
  return JSON.stringify(results);
}

hackernews();
