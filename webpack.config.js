const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './app/controllers/index.ts',
    devtool: 'source-map',
    module: {
        rules: [
            //Typescript loader
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            //SASS LOADER Äá»‚ ÄĂ“NG GĂ“I CĂC FILE SASS
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        }
                    },
                    { loader: "sass-loader" },
                ]
            },

            //CSS LOADER Äá»‚ ÄĂ“NG GĂ“I CĂC FILE CSS
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" },
                {
                    loader: "css-loader",
                    options: {
                        minimize: true,
                    }
                }],
            },
            //ÄĂ“NG GĂ“I HĂŒNH áº¢NH
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "../[path][name].[ext]",
                        limit: 1000,
                    },
                },
            },
        ]
    }, 
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './assets/js')
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        }),
    ],
};