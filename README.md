# HTML Webpack Template

[![build](https://img.shields.io/travis/glebfeklistov/webpack-html-template.svg?style=flat-square&branch=master)](https://travis-ci.org/glebfeklistov/webpack-html-template)
[![codecov coverage](https://img.shields.io/codecov/c/github/glebfeklistov/webpack-html-template.svg?style=flat-square)](https://codecov.io/github/glebfeklistov/webpack-html-template)
[![version](https://img.shields.io/npm/v/webpack-html-template.svg?style=flat-square)](http://npm.im/webpack-html-template)
[![MIT License](https://img.shields.io/npm/l/webpack-html-template.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

This is a clear and powerful template for the [webpack](http://webpack.github.io/) plugin [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).

It has a many extra features than the [default template](https://github.com/jantimon/html-webpack-plugin/blob/master/default_index.ejs) and [html-webpack-template project](https://github.com/jaketrent/html-webpack-template).

* You have full control of generated template with few line config.
* No provided default tags or attributes without your needs, only webpack bundles.
* Auto inject webpack chunks and styles with zero configuration.
* Custom webpack chunks position output, self chunks or disable it.
* Set initial state for [redux](https://redux.js.org) or another solutions who needs global variable in window.
* May set attributes to <body> tag
* Any tags or other html elements and it attributes.
* Any count mount application points.
* Compatible with other [html-webpack-plugins](https://github.com/jantimon/html-webpack-plugin).

## Installation

Install the template in your project with npm:

```shell
$ npm i webpack-html-template
```

## Basic Usage

To make it work, you need to provide these **required parameters**:

- `inject: false`
- `template: require('webpack-html-template')`

And you can provide some **optional parameters**:
- `lang`: The `lang` attribute for html tag.
- `manifest`: The `manifest` attribute for html tag.
- `dir`: The `dir` attribute for html tag.
- `head`: The `<head>` tag configuration.
  - simple head configuration
  ```js
  head: {
      title: 'Application title', //  title tag with inner text
      base: {             
        href: 'https://domain.com'  //  base tag with href attribute
      },
      meta: [{  //  group of meta tags with their attributes
        charset: 'utf-8'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }, {
        name: 'description',
        content: 'A better default template for html-webpack-plugin.'
      }],
      ccsChunks: true //  marker for webpack style chunks output with link tags
    }
  ```
- `body`: The `<body>` tag configuration.
  - simple body configuration
  ```js
  body: [{
      canvas: { //  other application mount point
        id: 'canvas'
      }
    }, {
      div: {  //  react app mount point
        id: 'root'
      }
    }, {
      window: { //  redux initial state
        __REDUX__: JSON.stringify({app: 'Application'})
      }
    }]
  ```

In any position in `<head>` or `<body>` you can place special tags
- `window`: The `<script>` tag to pass initial values for application or other data to global visible scope in window.
- `ccsChunks`: The `<link>` marker for output webpack styles chunks
- `jsChunks`:The `<script>`  marker for output webpack js chunks

`ccsChunks` and `jsChunks` can accepts parameters such as:
- true, marker to insert scripts and styles from webpack build.
- false, marker to disable insert anyone script or style from webpack build.
- [Array], string array with paths to custom bundle scripts or styles.

### Examples

Here's an example illustrating disabling webpack output:

```js
{
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('webpack-html-template'),
      head: {
        cssChunks: false,  //  marker for disable webpack application styles
        jsChunks: false,  //  marker for disable webpack application scripts
      }
    }),
    // ...
  ]
}
```

Here's an example with custom position of output webpack bundles:

```js
{
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('webpack-html-template'),
      head: {
        title: 'App title',
        cssChunks: true,  //  marker for webpack application styles
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
        jsChunks: true,  //  marker for webpack application scripts
        div: [{
          id: 'canvas'
        }, {
          id: 'root'
        }],
        window: {
          __INITIAL_STATE__: JSON.stringify({a: true, b: 'John Doe'})
        }
      }
    }),
    // ...
  ]
}
```

Here's an full example for webpack config illustrating how to use these options in your `webpack.config.js`:

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
        div: [{
          id: 'canvas'
        }, {
          id: 'root'
        }],
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

