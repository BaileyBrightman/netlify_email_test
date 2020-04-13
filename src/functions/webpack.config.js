const path = require('path');

module.exports = {
  entry: './src/send_email.js',
  output: {
    filename: 'send_email.js',
    path: path.resolve(__dirname, './'),
  },
};