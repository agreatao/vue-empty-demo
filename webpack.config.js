const NODE_ENV = process.env.NODE_ENV;

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const DEFAULT_CSS = new ExtractTextWebpackPlugin({
    filename: 'css/default.css',
    allChunks: true
})

const PROJECT_LESS = new ExtractTextWebpackPlugin({
    filename: 'css/[name].css',
    allChunks: true
})

module.exports = {
    devtool: 'source-map',
    entry: {
        vendor: ['vue', 'vuex', 'vue-router'],
        main: [path.join(__dirname, 'src/entry')]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            path.join('node_modules')
        ],
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': path.join(__dirname, 'src'),
            'loader': path.join(__dirname, 'src/loader'),
            'images': path.join(__dirname, 'src/images'),
            'masters': path.join(__dirname, 'src/masters'),
            'pages': path.join(__dirname, 'src/pages'),
            'components': path.join(__dirname, 'src/components'),
            'lib': path.join(__dirname, 'src/lib'),
            'store': path.join(__dirname, 'src/store'),
            'router': path.join(__dirname, 'src/router'),
            'theme': path.join(__dirname, 'src/theme'),
            'config': path.join(__dirname, 'config')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    limit: 512,
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            },
            {
                test: /\.(woff|svg|ttf|eot)$/,
                loader: 'file-loader',
                query: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: DEFAULT_CSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: PROJECT_LESS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({ // 公共代码提取
            name: ['vendor', 'runtime'],
            filename: 'js/[name].js',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: '系统名称',
            template: path.join(__dirname, 'src/views/index.html'),
            filename: 'index.html',
            favicon: path.join(__dirname, 'src/views/favicon.ico'),
            inject: true,
            chunks: ['runtime', 'vendor', 'main'],
            minify: NODE_ENV == 'production' ? {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            } : false
        }),
        DEFAULT_CSS,
        PROJECT_LESS
    ].concat(NODE_ENV == 'production' ? [
        /**
         * 生产模式下的配置
         */
        new webpack.optimize.UglifyJsPlugin({ // js代码压缩
            compress: {
                warnings: false
            }
        }),
        new OptimizeCssAssetsWebpackPlugin({ // css代码压缩
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ] : [])
}