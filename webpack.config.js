const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // могут быть проблемы с git

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.join(__dirname, './dist')
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR);

const isDev = process.env.NODE_ENV === 'development'; // Режим сборки
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin( )
    ]
  }
  return config;
};

const filename = ext => isDev ? `${ext}/[name].${ext}` : `${ext}/[name].[contenthash].${ext}`;

const cssLoaders = extra => {
  const loaders = [
    'style-loader',
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev, // Hot Module Replacement, в режиме dev
        reloadAll: true,
        publicPath: "../"
      }
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        config: {
          path: './postcss.config.js'
        }
      }
    }
  ];

  if (extra) {
    loaders.push({
      loader: extra,
      options: { sourceMap: true }
    });
  }

  return loaders;
};

const babelOptions = preset => {
  const options = {
    presets: [
      '@babel/preset-env'
    ]
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

module.exports = {
  context: PATHS.src,
  mode: 'development',
  entry: {
    main:['@babel/polyfill', './index.js']
  },
  output: {
    filename: filename('js'),
    path: PATHS.dist,
    // publicPath: PATHS.dist
  },
  resolve: {
    extensions: ['.js', '.json', '.png', 'jpg', 'svg'],
    alias: {
      '@': PATHS.src,
    }
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : '',
  plugins: [
    ...PAGES.map(page => new HTMLWebpackPlugin({
      template: `${PAGES_DIR}/${page}/${page}.pug`,
      filename: `${page}.html`
    })),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: `${PATHS.src}/favicon`,
          to: PATHS.dist
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  optimization: optimization(),
  devServer: {
    port: 9000,
    compress: true,
    hot: isDev,
    inline: true,
    contentBase: PATHS.dist,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: {
          loader: 'pug-loader'
        }
      },
      {
        test: /\.css$/i,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|svg|gif)$/i,
        exclude: [ `${PATHS.src}/assets/fonts` ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img'
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        include: [ `${PATHS.src}/assets/fonts` ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions()
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        }
      }
    ]
  }
};