// Webpack Config File
const path = require('path');

module.exports = {
  mode: 'none',
  // Path to the source file
  entry: './src/hello-theme-child.src.js',
  output: {
    // Output to the destination file
    filename: 'hello-theme-child.min.js',
    // Set path directory to /dist/
    path: path.resolve(__dirname, 'dist'),
  },
};
