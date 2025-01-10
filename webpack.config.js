const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js', // Arquivo principal
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.[contenthash].js", // Hash para evitar cache
            clean: true, // Limpa a pasta dist antes de cada build
        },
        mode: isProduction ? "production" : "development",
        devServer: {
            static: {
                directory: path.resolve(__dirname, "dist"),
            },
            port: 3000,
            open: true, // Abre o navegador automaticamente
            hot: true, // Habilita Hot Module Replacement
        },
        devtool: isProduction ? "source-map" : "eval-source-map",
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: ["html-loader"], // Processa o arquivo HTML
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"], // Processa CSS
                },
                {
                    test: /\.js$/, // Processa arquivos JavaScript
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader', // Transpila código moderno para compatibilidade
                    },
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: 'all', // Divide o código em múltiplos arquivos para maior eficiência
            },
            minimize: isProduction, // Minimiza arquivos em produção
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html", // Usa o arquivo HTML como template
                filename: "index.html",
                minify: isProduction ? { // Minimiza HTML em produção
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                } : false,
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? "styles.[contenthash].css" : "styles.css", // Nome com hash em produção
            }),
        ],
    };
};
