require = require('esm')(module);

const CompressionPlugin = require("compression-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  configureWebpack: {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        maxInitialRequests: Infinity,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/
          },
        },
      },
      // minimize: true,
      nodeEnv: 'production'
    },
    // TODO: rewrite this config with config mutations
    // BETTER: move to Vite from Fucking Vue CLI and webpack
    // FIX - styles don't active
    // SAVE IT
    // mode: "production",
    // module: {
    //   rules: [
    //     {
    //       test: /\.s[ac]ss$/i,
    //       use: [
    //         { loader: MiniCssExtractPlugin.loader },
    //         "css-loader",
    //         "sass-loader"
    //       ]
    //     }
    //   ]
    // },
    plugins: [
      new CompressionPlugin({
        algorithm: "gzip",
        threshold: 8192,
        minRatio: 0.8
      }),
      // new MiniCssExtractPlugin({ 
      //   filename: "[name].css",
      //   chunkFilename: "[id].css",
      // })
    ]
  }
}
