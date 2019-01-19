const chai = require('chai');
const nock = require('nock');
const { getHTML } = require('../src/hackernews');

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
    } catch (error) {
      throw new Error();
    }
  });
});
