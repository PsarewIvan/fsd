const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // могут быть проблемы с git

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

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
      loader: 'sass-loader',
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
  entry: {
    main:['@babel/polyfill', PATHS.src]
  },
  output: {
    filename: filename('js'),
    path: PATHS.dist,
    publicPath: "./"
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : '',
  plugins: [
    ...PAGES.map(page => new HTMLWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`
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
    })
  ],
  optimization: optimization(),
  devServer: {
    contentBase: `${PATHS.dist}`,
    port: 8088,
    hot: isDev,
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
            outputPath: 'img',
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
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