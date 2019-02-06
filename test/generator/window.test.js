const {expect} = require('chai');
const component = require('../../lib/generator/window');

describe('window params', () => {
  it('zero config', () => {
    expect(component()).to.be.a('null');
  });

  it('full config', () => {
    expect(component({
      __INIT__: JSON.stringify({name: 'John Doe'}),
      __REDUX__: JSON.stringify({app: 'Application'}),
    })).to.be.a('array')
      .with.length(3)
      .with.include('script')
      .with.include('script')
  });
});
