const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './lit-demo.js', // Path to your Lit component
        output: {
            filename: isProduction ? 'bundle.min.js' : 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html', // Update with your HTML file path
            }),
        ],
        devServer: {
            static: './dist', // Serve from the "dist" directory
        },
    };
};
