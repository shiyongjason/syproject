const SentryPlugin = require('@sentry/webpack-plugin')
// const SentryPlugin = require('webpack-sentry-plugin')
module.exports = {
    configureWebpack: config => {
        // 是否生产和预发布
        if (process.env.VUE_APP_TITLE === 'production' || process.env.VUE_APP_TITLE === 'preview') {
            config.plugins.push(
                new SentryPlugin({
                    include: './dist',
                    release: process.env.RELEASE_VERSION, // 一致的版本号
                    configFile: '.sentryclirc', // 不用改
                    ignore: ['node_modules', 'webpack.config.js'],
                    urlPrefix: '~' // 这里指的你项目需要观测的文件如果你的项目有publicPath这里加上就对了
                })
            // new SentryPlugin(Object.assign({
            //     release: process.env.RELEASE_VERSION,
            //     deleteAfterCompile: true,
            //     // exclude: /(\.css\.map| \.css | \.html)$/,
            //     include: /(\.js\.map | \.js)$/, // 只上传js和map文件
            //     filenameTransform: function (filename) {
            //         return '~/' + filename
            //     }
            // }, require('./sentry.config.js')))
            )
        }
    },
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
