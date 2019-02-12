const {expect} = require('chai');
const lodash = require('lodash');
const fs = require('fs');
const component = lodash.template(fs.readFileSync(require('../lib/index'), 'utf-8'));

const config = {
  files: {
    css: ['/1.css', '/2.css'],
    chunks: {main: {entry: '/main.js'}, vendors: {entry: '/vendors.js'}}
  },
  options: {
    lang: 'en',
    manifest: 'app.manifest',
    dir: 'ltr',
    head: {
      title: 'Application title',
      base: {
        href: 'http://localhost'
      },
      meta: [{
        charset: 'utf-8'
      }, {
        content: 'ie=edge',
        'http-equiv': 'x-ua-compatible'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }, {
        name: 'description',
        content: 'A better default template for html-webpack-plugin.'
      }]
    },
    body: [{
      script: {
        src: '/bootstrap.js'
      }
    }, {
      div: {
        id: 'canvas'
      }
    }, {
      div: {
        id: 'root'
      }
    }, {
      span: {
        innerHTML: '<div>Hello world</div>'
      }
    }, {
      img: {
        src: '/logo.png'
      }
    }, {
      window: {
        __INIT__: JSON.stringify({name: 'John Doe'}),
        __REDUX__: JSON.stringify({app: 'Application'})
      }
    }]
  }
};

describe('html-webpack-template', () => {
    it('zero config', () => {
      const result = component({require: require, htmlWebpackPlugin: null});
      expect(result).to.be.a('string');
    });

    it('full config', () => {
      const result = component({require: require, htmlWebpackPlugin: config});
      expect(result).to.be.a('string')
        .with.have.string('<html lang="en" manifest="app.manifest" dir="ltr">')
        .with.have.string('<head><title>Application title</title>')
        .with.have.string('<meta charset="utf-8"/>')
        .with.have.string('<link rel="stylesheet" href="/1.css"/>')
        .with.have.string('<link rel="stylesheet" href="/2.css"/>')
        .with.have.string('</head>')
        .with.have.string('<body>')
        .with.have.string('<script>')
        .with.have.string('__INIT__')
        .with.have.string('__REDUX__')
        .with.have.string('</script>')
        .with.have.string('<script src="/main.js"></script>')
        .with.have.string('<script src="/vendors.js"></script>')
        .with.have.string('</body>')
        .with.have.string('</html>')
    });

    it('empty extensions', () => {
      const result = component({
        require: require, htmlWebpackPlugin: {
          options: {
            body: {
              window: {},
              jsChunks: [],
              cssChunks: []
            }
          }
        }
      });
      expect(result).to.be.a('string')
    });
  }
);
