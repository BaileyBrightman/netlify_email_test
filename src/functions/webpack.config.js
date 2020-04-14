const path = require('path');
import node from 'node-loader!./file.node';


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
  node: { 
      fs: 'empty', 
      net: 'empty', 
      tls: 'empty', 
      child_process: 'empty',
       __filename: true,
        __dirname: true 
    }, 
    
    externals: nodeExternals(); 
  
  
};