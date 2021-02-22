const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/app/index.js"),
  },
  mode: "development",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack Boilerplate",
      template: path.resolve(__dirname, "./src/template.html"), // template file
      filename: "index.html", // output file
    }),
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      // loader
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"],
        resolve: {
          extensions: [".js", ".jsx"],
        },
        // presets: ["es2015", "react"],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },

      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      // CSS, PostCSS, and Sass
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1, modules: true },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    /* ... */
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: {
      Utils: path.resolve(__dirname, "src/utils/"),
      Images: path.resolve(__dirname, "src/images/"),
      Styles: path.resolve(__dirname, "src/styles/"),
      components: path.resolve(__dirname, "src/components/"),
    },
  },
};
