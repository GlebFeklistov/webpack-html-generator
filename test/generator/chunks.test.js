const {expect} = require('chai');
const component = require('../../lib/generator/chunks');

describe('chunks', () => {
  it('zero config', () => {
    expect(component()).to.be.a('null');
  });

  it('full config', () => {
    expect(component({main: '/1.js', vendors: '/2.js'}))
      .to.be.a('array')
      .with.length(2)
      .with.deep.include({script: {src: '/1.js'}})
      .with.deep.include({script: {src: '/2.js'}})
  });
});
