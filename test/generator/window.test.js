const {expect} = require('chai');
const window = require('../../lib/generator/window');

describe('window params', () => {
  it('undefined', () => {
    const result = window();
    expect(result).to.be.a('null');
  });

  it('empty object', () => {
    const result = window({});
    expect(result).to.be.a('string')
      .with.have.string('<script type="text/javascript">')
      .with.have.string('</script>')
  });

  it('object', () => {
    const result = window({
      __INIT__: JSON.stringify({name: 'John Doe'})
    });
    expect(result).to.be.a('string')
      .with.have.string('<script type="text/javascript">')
      .with.have.string('</script>')
  });
});
