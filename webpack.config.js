const path = require('path');

// webpack needs to be explicitly required
const webpack = require('webpack')

module.exports = {
  entry: './src/frontend.ts', // Replace with the actual path to your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
        assert: require.resolve('assert/'),
        fs: false,
        net: false,
        zlib: require.resolve('browserify-zlib'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        url: require.resolve('url/'),
        buffer: require.resolve('buffer/'),
        path: require.resolve('path-browserify'),
        querystring: require.resolve('querystring-es3'),
        util: require.resolve('util/'),
      },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};

