let path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    target: "node",
    module:{

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyPlugin([
            {from: './css/**', to: ''},
            {from: './lib/**', to: ''},
            {from: './res/**', to: ''},
            {from: './views/**', to: ''},
            {from: './src/javascript/**', to: ''}
        ])
    ],
    externals: [nodeExternals()]
};