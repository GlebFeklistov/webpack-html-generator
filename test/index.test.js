const {expect} = require('chai');
const lodash = require('lodash');
const fs = require('fs');
const component = lodash.template(fs.readFileSync(require('../lib/index'), 'utf-8'));

describe('html-webpack-template', () => {
  it('zero config', () => {
    const html = component({require: require, htmlWebpackPlugin: null});
    expect(html).to.be.a('string');
  });

  it('html', () => {
    const html = component({require: require, htmlWebpackPlugin: null });
    expect(html)
      .to.have.string('<!DOCTYPE html>')
      .with.have.string('<html>')
      .with.have.string('<head>')
      .with.have.string('</head>')
      .with.have.string('<body>')
      .with.have.string('</body>')
      .with.have.string('</html>')
  });
});
