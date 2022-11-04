import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { ProgressPlugin } from "webpack";
import { DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BuildEnv, Config } from "./types/types";

module.exports = (env: BuildEnv) => {
  const mode = env.mode || "development";
  const PORT = env.port || 3000;

  const isDev = mode === "development";

  const config: Config = {
    mode: mode,
    entry: resolve(__dirname, "src", "index.tsx"),
    output: {
      filename: "[name].[contenthash].js",
      path: resolve(__dirname, "./build"),
      clean: true,
      publicPath: "/",
      pathinfo: false
    },

    devtool: isDev ? "inline-source-map" : undefined,

    devServer: isDev
      ? {
          static: "./build",
          open: true,
          hot: true,
          port: PORT,
          proxy: [
            {
              context: "/*",
              target: "http://localhost:4000"
            }
          ]
        }
      : undefined,

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        title: "TTT"
      }),
      new ProgressPlugin(),
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(isDev)
      })
    ],

    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            { loader: "css-loader", options: { importLoaders: 1 } },
            "postcss-loader"
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico|pdf)$/i,
          type: "asset/resource"
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: "asset/inline"
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ["csv-loader"]
        },
        {
          test: /\.xml$/i,
          use: ["xml-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      preferAbsolute: true,
      modules: [resolve(__dirname, "src"), "node_modules"],
      mainFiles: ["index"],
      alias: {}
    }
  };

  if (isDev) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false
      })
    );
  }

  return config;
};
