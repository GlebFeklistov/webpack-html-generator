# HTML Webpack Template

[![build](https://img.shields.io/travis/glebfeklistov/webpack-html-template.svg?style=flat-square&branch=master)](https://travis-ci.org/glebfeklistov/webpack-html-template)
[![codecov coverage](https://img.shields.io/codecov/c/github/glebfeklistov/webpack-html-template.svg?style=flat-square)](https://codecov.io/github/glebfeklistov/webpack-html-template)
[![version](https://img.shields.io/npm/v/webpack-html-template.svg?style=flat-square)](http://npm.im/webpack-html-template)
[![MIT License](https://img.shields.io/npm/l/webpack-html-template.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

This is a clear and powerful template for the [webpack](http://webpack.github.io/) plugin [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).

It has a many extra features than the [default template](https://github.com/jantimon/html-webpack-plugin/blob/master/default_index.ejs) and [html-webpack-template project](https://github.com/jaketrent/html-webpack-template).

* You have full control of generated template with few line config.
* Set initial state for [redux](https://redux.js.org) or another solutions who needs global variable in window.
* No provided default tags or attributes without your needs.
* Custom webpack chunks position output.
* Auto inject webpack chunks and styles with zero configuration.
* May set attributes to <body> tag
* Any tags or other html elements and attributes.
* Any count mount application points.
* Compatible with other [html-webpack-plugins](https://github.com/jantimon/html-webpack-plugin).

## Installation

Install the template in your project with npm:

```shell
$ npm i html-webpack-template
```

## Basic Usage

To make it work, you need to provide these **required parameters**:

- `inject: false`
- `template: require('html-webpack-template')`

And you can provide some **optional parameters**:
- `lang`: The `lang` attribute for html tag.
- `manifest`: The `manifest` attribute for html tag.
- `dir`: The `dir` attribute for html tag.
- `head`: The `<head>` tag configuration.
- `body`: The `<body>` tag configuration.
  - `window`: The custom `<script>` tag to pass initial values for application.

### Example

Here's an example webpack config illustrating how to use these options in your `webpack.config.js`:

```js
{
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('webpack-html-template'),
      head: {
        title: 'App title',
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
          content: 'A better default template for html-webpack-plugin'
        }]
      },
      body: {
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
          __INITIAL_STATE__: JSON.stringify({a: true, b: 'John Doe'})
        }
      }
    }),
    new FaviconsWebpackPlugin({
      inject: true,
      logo: './src/logo.png'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

Another example with different body tags configuration concept and identical output

```js
{
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('webpack-html-template'),
      head: {
        title: 'App title',
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
          content: 'A better default template for html-webpack-plugin'
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
          __INITIAL_STATE__: JSON.stringify({a: true, b: 'John Doe'})
        }
      }]
    }),
    new FaviconsWebpackPlugin({
      inject: true,
      logo: './src/logo.png'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
```
