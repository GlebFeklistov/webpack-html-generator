const {expect} = require('chai');
const lodash = require('lodash');
const fs = require('fs');
const template = lodash.template(fs.readFileSync(require('../lib/index'), 'utf-8'));

describe('html-webpack-generator', () => {
  it('zero config', () => {
    const html = template({require: require, htmlWebpackPlugin: null});
    expect(html).to.be.a('string');
  });

  /*it('empty config', () => {
    const html = template({require: require, htmlWebpackPlugin: {}});
    expect(html).to.be.a('string');
  });

  it('html structure', () => {
    const html = template({require: require, htmlWebpackPlugin: null });
    expect(html)
      .to.have.string('<!DOCTYPE html>')
      .with.have.string('<html>')
      .with.have.string('<head>')
      .with.have.string('</head>')
      .with.have.string('<body>')
      .with.have.string('</body>')
      .with.have.string('</html>')
  });*/
});
