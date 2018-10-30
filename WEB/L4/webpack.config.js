let path = require('path');
var nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    target: "node",
    module:{
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader : 'style-loader!css-loader'
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    externals: [nodeExternals()]
};