var path = require('path')
// var webpack = require('webpack')

module.exports = {
  entry: './app/scripts/main.js',
  output: {
    path: path.resolve(__dirname, './dist/scripts'),
    filename: 'main.js'
  }
}
