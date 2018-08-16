const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');




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
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: distPath
    }
};