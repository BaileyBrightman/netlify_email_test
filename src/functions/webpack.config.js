const path = require('path');

module.exports = {
  entry: './src/sendEmail.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};