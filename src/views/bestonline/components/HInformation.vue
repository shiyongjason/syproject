<template>
    <div>
        <iframe :src="srcUrl" ref="iframe" id="bdIframe" width="100%" frameborder="0"></iframe>
    </div>
</template>
<script>
import { getTianyanUrl } from './../api/index.js'
export default {
    data () {
        return {
            srcUrl: ''
        }
    },
    computed: {
        companyName () {
            // if (this.$store.state.dueDiligence.companyName === '') { 
            //     return localStorage.getItem('user_data')
            // }
            // return this.$store.state.dueDiligence.companyName
            return JSON.parse(sessionStorage.getItem('user_data')).organizationName
        }
    },
    mounted () {
        this.getTianyanUrl()
        const oIframe = document.getElementById('bdIframe')
        const deviceWidth = document.documentElement.clientWidth
        const deviceHeight = document.documentElement.clientHeight
        oIframe.style.width = (Number(deviceWidth) - 220) + 'px' // 数字是页面布局宽度差值
        oIframe.style.height = (Number(deviceHeight) - 120) + 'px' // 数字是页面布局高度差
    },
    methods: {
        async  getTianyanUrl () {
            const { data } = await getTianyanUrl(this.companyName)
            this.srcUrl = data.data.redirectUrl
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
