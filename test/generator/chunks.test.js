const {expect} = require('chai');
const component = require('../../lib/generator/css');

describe('css', () => {
  it('zero config', () => {
    expect(component()).to.be.a('null');
  });

  it('full config', () => {
    expect(component(['/1.css', '/2.css']))
      .to.be.a('array')
      .with.length(2)
      .with.deep.include({ link: { rel: 'stylesheet', href: '/1.css' } })
      .with.deep.include({ link: { rel: 'stylesheet', href: '/2.css' } })
  });
});
