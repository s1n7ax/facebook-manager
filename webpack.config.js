const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


let distPath = path.resolve(__dirname, 'dist');
let srcPath = path.resolve(__dirname, 'src');
let scriptsPath = path.resolve(__dirname, srcPath, 'scripts');

module.exports = {
    mode: 'development',

    entry: {
        content: path.resolve(scriptsPath, 'content', 'content.ts'),
        background: path.resolve(scriptsPath, 'background', 'background.ts'),
        popup: path.resolve(scriptsPath, 'popup', 'popup.ts'),
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: srcPath, to: distPath, ignore: ['*.ts','*.tsx'] }
        ]),

        /**
         * replace process.env.NODE_ENV with system NODE_ENV
         * as a result, all the usage will be removed at the compile time
         * more details: https://stackoverflow.com/questions/45776264/
         */
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: distPath
    }
};