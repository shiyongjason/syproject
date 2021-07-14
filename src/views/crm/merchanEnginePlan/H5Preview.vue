<template>
    <div v-if="scheme" class="index">
        <div class="rich-box">
        <div class='title'>{{scheme.schemeTitle}}</div>
        <div class='time'>{{scheme.effectiveTime.replace('T', ' ')}}</div>
        <video v-if="scheme.schemeVideo" class='video' :src='scheme.schemeVideo' controls muted></video>
        <div class="rich-text">
            <div  v-html='scheme.schemeDetail.replace(/<img/g, "<img style=\"width: 100%\" ")'></div>
        </div>
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
        async getDetail (val) {
            console.log(val)
            let { data } = await getCrmPlanDetail({ id: val })
            this.scheme = data
        }
    },
    mounted () {
    }
}
</script>
<style scoped>
.index {
    width: 350px;
    margin: 0 auto;
    width: 350px;
    height: 700px;
    background: transparent url("../../../assets/images/iPhoneX_model.png")
        no-repeat scroll center center;
    background-size: 100% 100%;
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px 10px 10px 10px ;

}
.rich-box{
    height: 610px;
       overflow-y: scroll;
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
    background: #d8d8d8;
}

.rich-text {
        margin: 0 1rem 1.25rem 1rem;
}
</style>
