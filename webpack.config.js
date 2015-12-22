module.exports = {
  entry: [
    __dirname + '/node_modules/babel-core/browser-polyfill.js',
    './src/main.js'
  ],
  output: {
    filename: 'built/output.js'
  },
  module: {
    loaders: [
      {
        test: /.*\.js$/,
        exclude: /node_modules/,
        loaders: [
          'jsx-loader',
          'babel-loader?stage=0'
        ]
      }
    ],
    noParse: [
      /polyfill\.js$/
      // /\/babel-core\/browser-polyfill\.js$/
    ],
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  devtool: "#inline-source-map"
}
