const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemcalcPlugin = require('less-plugin-remcalc');
const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const get = require('lodash/get');
const set = require('lodash/set');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpackRetryChunckLoadPlugin = require('webpack-retry-chunk-load-plugin');
const webpack = require('webpack');

const RetryChunkLoadPlugin = Object.assign(
  webpackRetryChunckLoadPlugin.RetryChunkLoadPlugin,
);

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.resolve(process.cwd(), 'node_modules/.cache-loader'),
  },
};

// The common webpack configuration.
module.exports = (opts) => {
  const lessLoaderOptions = {
    sourceMap: true,
    plugins: [
      RemcalcPlugin, // required by ovh-ui-kit
    ],
    relativeUrls: false,
  };

  if ('lessPath' in opts) {
    set(lessLoaderOptions, 'paths', opts.lessPath);
  }

  if ('lessJavascriptEnabled' in opts) {
    set(lessLoaderOptions, 'javascriptEnabled', opts.lessJavascriptEnabled);
  }

  const jsExclude = [
    /\/node_modules/, // vendors
    /\/dist/, // bundled files
  ];

  return {
    plugins: [
      // Copy application assets.
      // note: we could use the `html-loader` plugin but it wouldn't work for
      //       dynamic src attributes.
      new CopyWebpackPlugin(
        get(opts, 'assets.files', []),
        get(opts, 'assets.options', {}),
      ),

      // see: https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: opts.template, // path to application's main HTML template.
      }),

      // Display pretty loading bars.
      new WebpackBar({
        name: 'OVHcloud Manager',
        color: '#0050d7',
      }),

      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].css',
      }),

      new webpack.DefinePlugin({
        __VERSION__: process.env.VERSION ? `'${process.env.VERSION}'` : 'null',
      }),

      new RetryChunkLoadPlugin({
        // optional stringified function to get the cache busting query string
        // appended to the script src.
        // if not set will default to appending the string `?cache-bust=true`
        cacheBust: `function() {
          return Date.now();
        }`,
        // optional value to set the maximum number of retries to load the chunk.
        // Default is 1
        maxRetries: 5,
      }),
    ],

    resolve: {
      fallback: {
        stream: false,
        os: false,
      },
      modules: ['./node_modules', path.resolve('./node_modules')],
    },

    resolveLoader: {
      modules: [
        // #1 check in module's relative node_modules directory
        './node_modules',

        // #2 check in application's node_modules directory
        path.resolve('./node_modules'),
      ],
    },

    module: {
      rules: [
        // Load HTML files as string.
        {
          test: /\.html$/,
          loader: 'raw-loader',
        },

        // Load Images & Fonts into file.
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          type: 'asset/resource',
        },

        // Load CSS files.
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            cacheLoader,
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
          ],
        },

        // Load Less files.
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            cacheLoader,
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'resolve-url-loader', // specify relative path for Less files
              options: {
                root: opts.root,
              },
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: { lessOptions: lessLoaderOptions },
            },
          ],
        },

        // Load SCSS files.
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            cacheLoader,
            'css-loader', // translates CSS into CommonJS
            {
              loader: 'resolve-url-loader',
              options: {
                root: opts.root,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sassOptions: {
                  sourceMapContents: false,
                },
              },
            },
          ],
        },

        // Normalize JSON translation files.
        {
          test: /Messages_\w+_\w+\.json$/,
          use: [
            cacheLoader,
            {
              loader: path.resolve(__dirname, './loaders/translation-json.js'),
            },
          ],
        },

        // Load JS files.
        {
          test: /\.js$/,
          exclude: jsExclude,
          use: [
            cacheLoader,
            {
              loader: 'babel-loader', // babelify JS sources
              options: {
                presets: [require.resolve('@babel/preset-env')],
                plugins: [
                  require.resolve('@babel/plugin-proposal-class-properties'),
                  require.resolve('@babel/plugin-proposal-optional-chaining'),
                  require.resolve('@babel/plugin-proposal-private-methods'),
                  require.resolve('@babel/plugin-syntax-dynamic-import'),
                  require.resolve('babel-plugin-angularjs-annotate'),
                ],
                shouldPrintComment: (val) => !/@ngInject/.test(val),
              },
            },
          ],
        },

        // Inject translation imports into JS source code,
        // given proper ui-router state `translations` property.
        {
          test: /\.js$/,
          exclude: jsExclude,
          enforce: 'pre',
          use: [
            cacheLoader,
            {
              loader: path.resolve(
                __dirname,
                './loaders/translation-ui-router.js',
              ),
              options: {
                subdirectory: 'translations',
                filtering: false,
              },
            },
          ],
        },

        // Inject translation with `@ngTranslationsInject` comment.
        {
          test: /\.js$/,
          exclude: jsExclude,
          enforce: 'pre',
          use: [
            cacheLoader,
            {
              loader: path.resolve(
                __dirname,
                './loaders/translation-inject.js',
              ),
              options: {
                filtering: false,
              },
            },
          ],
        },
      ], // \rules
    }, // \module

    optimization: {
      minimizer: [new CssMinimizerPlugin({}), '...'],
      runtimeChunk: 'single',
      // Bundle spliting configuration.
      splitChunks: {
        // Vendors bundle containing `node_modules` source code.
        cacheGroups: {
          ovh: {
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]@ovh-ux[\\/]/,
            name: 'ovh',
            enforce: true,
            priority: 1,
          },
          vendor: {
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            enforce: true,
          },
        },
      },
    }, // \optimization
  };
};
