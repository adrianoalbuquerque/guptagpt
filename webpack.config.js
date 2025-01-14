const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js", // Nomes únicos para cada chunk
            clean: true, // Limpa a pasta dist antes de cada build
        },
        mode: isProduction ? "production" : "development",
        devServer: {
            static: {
                directory: path.resolve(__dirname, "dist"),
            },
            port: 3000,
            open: true,
            hot: true,
        },
        // devtool: isProduction ? "source-map" : "eval-source-map",
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: ["html-loader"],
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
            minimize: isProduction,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "index.html",
                minify: isProduction && {
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? "[name].[contenthash].css" : "[name].css",
            }),
            new Dotenv(),
        ],
    };
};
