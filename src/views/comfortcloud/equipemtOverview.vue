<template>
    <div class="page-body cloud-app">
        <div class="cloud-top">
            <div class="top-box" @click="onTopbox" :class="equipshow?'bgactive':''">
                <p>设备总数(截止今日)</p>
                <p>32323</p>
                <p>环比昨日：-20.7%</p>
            </div>
            <div class="top-box">
                <p>在线设备总数(截止今日)</p>
                <p>32323</p>
                <p>环比昨日：-20.7%</p>
                <p type='danger'>在线设备总数(截止今日)</p>
                <p type='danger'>32323</p>
            </div>
            <div class="top-box" @click="onTopbox" :class="!equipshow?'bgactive':''">
                <p>设备总数(截止今日)</p>
                <p>32323</p>
                <p>环比昨日：-20.7%</p>
            </div>
        </div>
        <div class="cloud-echart">
            <smartequip v-if='equipshow' />
            <timeequip v-if='!equipshow' />
        </div>

    </div>
</template>
<script>
import smartequip from './equipcoms/smartequip'
import timeequip from './equipcoms/timeequip'
export default {
    data () {
        return {
            equipshow: true
        }
    },
    components: {
        smartequip,
        timeequip
    },
    methods: {
        onTopbox () {
            this.equipshow = !this.equipshow
        }
    }
}
</script>
<style lang="scss" >
.cloud-top {
    display: flex;
    justify-content: flex-start;
    .top-box {
        flex: 1;
        height: 130px;
        background: #ffffff;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 3px 3px #e5e5e5;
        padding: 10px;
         box-sizing:border-box;
    }
    .bgactive {
        background: #ff7a45;
        color: #ffffff;
    }
}
.cloud-echart {
    background: #ffffff;
    margin-top: 10px;
    padding: 0 10px;
}
.echart-tab {
    display: flex;
    justify-content: space-between;
}
.echart-tab-fl {
    display: flex;
    span {
        width: 100px;
        height: 50px;
        margin: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #efefef;
        cursor: pointer;
    }
    .active {
        background: #ff7a45;
        color: #ffffff;
    }
}
.echart-time {
    display: flex;
    align-items: center;
}
</style>