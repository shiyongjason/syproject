<template>
<div>
    <div class="active-mask" v-if="activeUrl" @click="closeModel" v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="container">
            <iframe
                :src="activeUrl"
                ref="iframe"
            ></iframe>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'h5Preview',
    props: ['activeUrl', 'loading'],
    watch: {
        activeUrl () {
            if (this.activeUrl) {
                this.$nextTick(() => {
                    this.$refs.iframe.addEventListener('load', this.addEvents)
                })
            }
        }
    },
    methods: {
        closeModel () {
            this.$refs.iframe.removeEventListener('load', this.addEvents)
            this.$emit('clearUrl')
        },
        addEvents () {
            this.$emit('hideLoading', false)
        }
    }
}
</script>

<style scoped lang="scss">
.active-mask {
    position: fixed;
    z-index: 999;
    background: rgba(0,0,0,.6);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
    .container{
        width: 350px;
        height: 700px;
        background: transparent url("../../assets/images/iPhoneX_model.png") no-repeat scroll center center;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        iframe{
            display: block;
            width: 314px;
            margin: 42px auto 0;
            height: 617px;
            overflow: hidden;
            overflow-y: scroll;
            border: 0;
            background: transparent;
        }
        html {
            background: transparent;
            width: 320px;
        }
    }
</style>
