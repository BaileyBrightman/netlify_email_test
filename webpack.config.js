import node from 'node-loader!./file.node';
const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: './src/send_email.js',
  output: {
    filename: 'send_email.js',
    path: path.resolve(__dirname, ''),
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js'] // add your other extensions here
  },
  target: 'node',
  externals: {
    node:nodeExternals(),
    canvas: {}
  },
  
  
};