const path = require('path');

module.exports = {
  entry: './src/entry.js',
  mode: 'development',
  output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
  }
};
