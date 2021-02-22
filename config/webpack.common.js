const paths = require("./paths");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + "/app/index.tsx"],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: "webpack 5",
      favicon: paths.src + "/images/favicon.png",
      template: paths.src + "/template.html", // template file
      filename: "index.html", // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.js$|jsx/, // please dont use like this -> test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
    ],
  },
  resolve: {
    //
    // alias: {
    //   Utils: path.resolve(__dirname, paths.src + "/utils/"),
    //   Images: path.resolve(__dirname, paths.src + "/images/"),
    //   Styles: path.resolve(__dirname, paths.src + "/styles/"),
    //   Components: path.resolve(__dirname, paths.src + "/components/"),
    // },
    // extensions: ["*", ".js", ".jsx"],
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};
