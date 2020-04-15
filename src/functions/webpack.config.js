const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './srcFiles/send_email.js',
  output: {
    filename: 'send_email.js',
    path: path.resolve(__dirname, ''),
  },
  target: 'node',
  externals:[nodeExternals()]
};