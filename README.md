# Hacker News Scraper
command line application that outputs the top posts from [Hacker News](https://news.ycombinator.com/) built using Node.js

## Instructions to run the app
- $ git clone https://github.com/gabrielabud/hackernews.git
- $ cd hackernews
- $ npm install
- $ npm run hackernews --posts n (e.g. npm run hackernews --posts 5 to get top 5 posts)
- $ npm run test:unit

### Dockerfile
- $ cd hackernews
- $ docker build -t hackernews .
- $ docker images (see the image that has just been built)
- $ docker run -it hackernews bash (run the container)
  - $ npm run hackernews --posts n 
  - $ npm run test:unit

## Packages used
- [request-promise](https://www.npmjs.com/package/request-promise) HTTP request which has support for Promise
- [cheerio](https://www.npmjs.com/package/cheerio) to parse the HTML and select DOM elements 
- [mocha](https://mochajs.org/) test framework running on Node.js
- [chai](https://www.chaijs.com/) is a BDD / TDD assertion library
- [nock](https://www.npmjs.com/package/nock) for HTTP server mocking
- [minimist](https://www.npmjs.com/package/minimist) to parse command line arguments
- [valid-url](https://www.npmjs.com/package/valid-url) for uri validation






 
