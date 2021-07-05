<template>
    <div v-if="scheme" class="index">
        <div class='title'>{{scheme.schemeTitle}}</div>
        <div class='time'>{{scheme.effectiveTime.replace('T', ' ')}}</div>
        <video
            v-if="scheme.schemeVideo"
            class='video'
            :src='scheme.schemeVideo'
            controls
            muted></video>
        <div class="rich-text">
            <div v-html='scheme.schemeDetail.replace(/<img/g, "<img style=\"width: 100%\" ")'></div>
    </div>

    </div>
</template>
<script>

import { getCrmPlanDetail } from './api'

export default {
    name: 'H5Preview',
    data () {
        return {
            scheme: null
        }
    },
    methods: {
        async getDetail () {
            let { data } = await getCrmPlanDetail({ id: this.$route.query.id })
            this.scheme = data
        }
    },
    mounted () {
        this.getDetail()
    }
}
</script>
<style scoped>
    .index {
        background: white;
        min-height: 100%;
    }

    .title {
        padding: 1.25rem 1rem 0 1rem;
        font-size: 1.25rem;
        font-weight: 500;
        color: #333333;
        line-height: 1.75rem;
        word-wrap: break-word;
        word-break: break-all;
    }

    .time {
        padding: 0.5rem 1rem 1.25rem 1rem;
        height: 1.25rem;
        font-size: 0.88rem;
        font-weight: 400;
        color: #888888;
        line-height: 2.5rem;
    }

    .video {
        margin: 0 1rem 1.25rem 1rem;
        width: calc(100% - 2rem);
        height: 15rem;
        background: #D8D8D8;
    }

    .rich-text {
        margin: 0 1rem 1.25rem 1rem;
    }
</style>
