const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => {
  const { mode } = env;

  const isProd = mode === "production";
  const isDev = mode === "development";

  const getOptimization = () => {
    if (isProd) {
      return {
        optimization: {
          splitChunks: {
            chunks: "all",
          },
        },
      };
    } else {
      return {};
    }
  };

  const getLoaderForCss = () => {
    if (isProd) {
      return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        "sass-loader",
      ];
    } else {
      return ["style-loader", "css-loader", "sass-loader"];
    }
  };

  const getLocalServer = () => {
    const server = {
      devServer: {
        port: 3000,
        open: true,
      },
    };
    return isProd ? {} : server;
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
      new CleanWebpackPlugin(),
    ];
    if (isProd) {
      return [
        ...plugins,
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, "./src/favicon.png"),
            to: path.resolve(__dirname, "dist"),
          },
        ]),
        new MiniCssExtractPlugin({
          filename: "css/[name]-[hash:4].css",
        }),
      ];
    }
    return plugins;
  };

  return {
    mode: isProd ? "production" : isDev && "development",
    context: path.resolve(__dirname, "src"),
    entry: {
      app: "./js/index.js",
    },
    output: {
      filename: "js/[name].[hash:4].js",
      path: path.resolve(__dirname, "dist"),
    },
    ...getOptimization(),
    module: {
      rules: [
        {
          test: /.\js$/,
          exclude: "/node_modules/",
          loader: "babel-loader",
        },
        {
          test: /\.s[ac]ss$/i,
          use: getLoaderForCss(),
        },
        {
          test: /\.(png|jpe?g|gif|icon?)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[sha1:hash:4].[ext]",
                outputPath: "img",
                publicPath: "../img",
              },
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
              },
            },
          ],
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/i,
          loader: "file-loader",
          options: {
            name: "[name].[sha1:hash:4].[ext]",
            outputPath: "fonts",
            publicPath: "../fonts",
          },
        },
      ],
    },
    resolve: {
      alias: {
        "@scss": path.resolve(__dirname, "src/scss/"),
        "@parts": path.resolve(__dirname, "src/js/parts/"),
      },
    },
    plugins: getPlugins(),
    ...getLocalServer(),
  };
};
