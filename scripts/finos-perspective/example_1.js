// webpack.config.js
const PerspectivePlugin = require("@finos/perspective-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new PerspectivePlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};