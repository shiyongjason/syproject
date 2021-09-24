const SentryPlugin = require('@sentry/webpack-plugin')
// const SentryPlugin = require('webpack-sentry-plugin')
module.exports = {
    devServer: {
        port: 8082,
        open: false,
        sockHost: 'http://localhost:8081/',
        disableHostCheck: true
    },
    productionSourceMap: false,
    // configureWebpack: config => {
    //     // 是否生产和预发布
    //     // if (process.env.NODE_ENV === 'production') {
    //     //     config.plugins.push(
    //     //         new SentryPlugin({
    //     //             include: './dist',
    //     //             release: process.env.RELEASE_VERSION, // 一致的版本号
    //     //             configFile: '.sentryclirc', // 不用改
    //     //             ignore: ['node_modules', 'webpack.config.js'],
    //     //             urlPrefix: '~' // 这里指的你项目需要观测的文件如果你的项目有publicPath这里加上就对了
    //     //         })
    //     //     )
    //     // }
    // },
    /* // "webpack-bundle-analyzer": "^4.4.2" 添加到package.json,npm run build
    chainWebpack: config => {
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }, */
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/assets/style/variables/color.scss";
                `
            }
        }
    }

}
