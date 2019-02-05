# HTML Webpack Generator

This is a clear and powerful template generator for the [webpack](http://webpack.github.io/) plugin [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).
It has a many extra features than the [default template](https://github.com/jantimon/html-webpack-plugin/blob/master/default_index.ejs).
You have full control of generated template with few line config.
No provided default tags or attributes without your needs.
Compatible with other [html-webpack-plugins](https://github.com/jantimon/html-webpack-plugin).

## Installation

Install the template in your project with npm:

```shell
$ npm i html-webpack-generator --save-dev
```

## Basic Usage

To make it work, you need to provide these **required parameters**:

- `inject: false`
- `template: require('html-webpack-generator')`

And you can provide some other *optional parameters*:
- `lang`: The `lang` attribute for html tag.
- `manifest`: The `manifest` attribute for html tag.
- `head`: The `<head>` tag configuration.
- `body`: The `<body>` tag configuration.
- - `window`: The custom `<script>` tag to pass initial values for application.

### Example

Here's an example webpack config illustrating how to use these options in your `webpack.config.js`:

```js
{
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('webpack-html-generator'),
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
      template: require('webpack-html-generator'),
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
