const {expect} = require('chai');
const component = require('../../lib/generator');

const dataObject = {
  html: {
    lang: 'en',
    manifest: 'app.manifest',
    dir: 'ltr',
    innerHTML: {
      head: {
        innerHTML: {
          title: 'Object mode',
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
        }
      },
      body: {
        class: 'theme-main',
        innerHTML: {
          script: [{
            src: '/bootstrap.js'
          }],
          div: [{
            id: 'canvas'
          }, {
            id: 'root'
          }],
          span: {
            innerHTML: '<div>Hello world</div>'
          },
          img: {
            src: '/logo.png'
          },
          window: {
            __INIT__: JSON.stringify({name: 'John Doe'}),
            __REDUX__: JSON.stringify({app: 'Application'})
          },
          css: ['/1.css', '/2.css'],
          chunks: {
            main: '/1.js',
            vendors: '/2.js'
          }
        }
      }
    }
  }
};
const dataArray = {
  html: {
    lang: 'en',
    manifest: 'app.manifest',
    dir: 'ltr',
    innerHTML: {
      head: {
        innerHTML: [{
          title: 'Array mode'
        }, {
          base: {
            href: 'http://localhost'
          }
        }, {
          meta: {
            charset: 'utf-8'
          }
        }, {
          meta: {
            content: 'ie=edge',
            'http-equiv': 'x-ua-compatible'
          }
        }, {
          meta: {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
          }
        }, {
          meta: {
            name: 'description',
            content: 'A better default template for html-webpack-plugin.'
          }
        },
        ]
      },
      body: {
        class:
          'theme-main',
        innerHTML:
          [{
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
          }, {
            css: ['/1.css', '/2.css']
          }, {
            chunks: {
              main: '/1.js',
              vendors: '/2.js'
            }
          }]
      }
    }
  }
};

describe('generator', () => {
  it('zero config', () => {
    const result = component();
    expect(result).to.be.a('null');
  });

  it('all features object mode', () => {
    const result = component(dataObject);
    expect(result).to.be.a('string')
      .with.have.string('<html lang="en" manifest="app.manifest" dir="ltr">')
      .with.have.string('<head><title>Object mode</title>')
      .with.have.string('<meta charset="utf-8"/>')
      .with.have.string('</head>')
      .with.have.string('<body class="theme-main">')
      .with.have.string('<script>')
      .with.have.string('__INIT__')
      .with.have.string('__REDUX__')
      .with.have.string('</script>')
      .with.have.string('<link rel="stylesheet" href="/1.css"/>')
      .with.have.string('<link rel="stylesheet" href="/2.css"/>')
      .with.have.string('<script src="/1.js"></script>')
      .with.have.string('<script src="/2.js"></script>')
      .with.have.string('</body>')
      .with.have.string('</html>')
  });

  it('all features array mode', () => {
    const result = component(dataArray);
    expect(result).to.be.a('string')
      .with.have.string('<html lang="en" manifest="app.manifest" dir="ltr">')
      .with.have.string('<head><title>Array mode</title>')
      .with.have.string('<meta charset="utf-8"/>')
      .with.have.string('</head>')
      .with.have.string('<body class="theme-main">')
      .with.have.string('<script>')
      .with.have.string('__INIT__')
      .with.have.string('__REDUX__')
      .with.have.string('</script>')
      .with.have.string('<link rel="stylesheet" href="/1.css"/>')
      .with.have.string('<link rel="stylesheet" href="/2.css"/>')
      .with.have.string('<script src="/1.js"></script>')
      .with.have.string('<script src="/2.js"></script>')
      .with.have.string('</body>')
      .with.have.string('</html>')
  });
});
