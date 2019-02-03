const chai = require('chai');
const nock = require('nock');
const { getHTML, parseHTML } = require('../src/hackernews');
const { htmlSample } = require('./helper');

chai.should();

describe('#getHTML', () => {
  const url = 'https://news.ycombinator.com/';
  const htmlResponse = '<html>\n'
                      + '<body>\n'
                      + '<h1>Hello, World!</h1>\n'
                      + '</body>\n'
                      + '</html>\n';
  beforeEach(() => {
    nock('https://news.ycombinator.com/')
      .get('/')
      .reply(200, htmlResponse);
  });
  it('should return the html response', async () => {
    try {
      const response = await getHTML(url);
      response.should.eql(htmlResponse);
    } catch (err) {
      throw new Error();
    }
  });
});

describe('#parseHTML', () => {
  it('should parse HTML and return an array of hackernews posts objects', () => {
    const results = parseHTML(htmlSample);
    const resultsArray = [
      {
        title: 'Students learn from people they love',
        uri: 'https://www.nytimes.com/2019/01/17/opinion/learning-emotion-education.html',
        author: 'kareemm',
        points: 49,
        comments: 6,
        rank: 1
      },
      {
        title: 'MySQL client allowsMySQL server to request any local file',
        uri:
        'https://gwillem.gitlab.io/2019/01/20/sites-hacked-via-mysql-protocal-flaw/',
        author: 'cnst',
        points: 5,
        comments: 1,
        rank: 2
      }
    ];
    results.should.eql(resultsArray);
  });
});
