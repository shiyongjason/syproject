module.exports = {
    devServer: {
        host: '192.168.27.33',
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
