<template>
    <div>
        <iframe :src="srcUrl" ref="iframe" id="bdIframe" width="100%" frameborder="0"></iframe>
    </div>
</template>
<script>
import { getTianyanUrl } from './api/index.js'
export default {
    name: 'tianyan',
    data () {
        return {
            srcUrl: ''
        }
    },
    methods: {
        async  getTYurl () {
            const { data } = await getTianyanUrl(this.$route.query.name)
            console.log(data.redirectUrl)
            this.srcUrl = data.data.redirectUrl
        }
    },
    mounted () {
        this.getTYurl()
        const oIframe = document.getElementById('bdIframe')
        const deviceWidth = document.documentElement.clientWidth
        const deviceHeight = document.documentElement.clientHeight
        oIframe.style.width = (Number(deviceWidth) - 220) + 'px' // 数字是页面布局宽度差值
        oIframe.style.height = (Number(deviceHeight) - 120) + 'px' // 数字是页面布局高度差
    }
}
</script>
<style lang="scss" scoped>
</style>