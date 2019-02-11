const {expect} = require('chai');
const component = require('../../lib/generator/window');

describe('window', () => {
  it('zero config', () => {
    expect(component()).to.be.a('null');
  });

  it('full config', () => {
    expect(component({
      __INIT__: JSON.stringify({name: 'John Doe'}),
      __REDUX__: JSON.stringify({app: 'Application'}),
    })).to.be.a('object')
      .with.deep.nested.property('script.innerHTML')
      .with.have.string('__INIT__')
      .with.have.string('__REDUX__')
  });
});
