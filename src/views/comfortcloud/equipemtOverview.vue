<template>
    <div class="page-body cloud-app">
        <div class="cloud-top">
            <div class="top-box" @click="onTopbox(tabs.DEVICE_TAB)" :class="equipshow === tabs.DEVICE_TAB?'bgactive':''">
                <p>设备总数（截止今日）</p>
                <p>{{cloudDeviceCount.count}}</p>
                <p>在线设备数（截止今日）</p>
                <p>{{cloudDeviceCount.onlineCount}}</p>
            </div>
            <div class="top-box" @click="onTopbox(tabs.RUNTIME_TAB)" :class="equipshow === tabs.RUNTIME_TAB?'bgactive':''">
                <p>设备总运行时长(截止今日)</p>
                <p>{{cloudDeviceCount.runTimeCount}} 小时</p>
            </div>
            <div class="top-box" @click="onTopbox(tabs.NETWORK_TAB)" :class="equipshow === tabs.NETWORK_TAB?'bgactive':''">
                <p>设备总配网失败率（截止今日）</p>
                <p>{{cloudDeviceCount.deviceNetworkCount | percentageShow }} </p>
            </div>
        </div>
        <div class="cloud-echart">
            <smartequip v-if="equipshow === tabs.DEVICE_TAB" />
            <timeequip ref="timeequip" :totalTime="cloudDeviceCount.runTimeCount" @queryTotalTime="queryTotalTime"  v-if="equipshow === tabs.RUNTIME_TAB"/>
            <networkequip :totalNetworkCount="cloudDeviceCount.deviceNetworkCount" @queryTotalNetworkCount="queryNetworkCount" v-if="equipshow === tabs.NETWORK_TAB"/>
        </div>

    </div>
</template>
<script>
import smartequip from './equipcoms/smartequip'
import timeequip from './equipcoms/timeequip'
import networkequip from './equipcoms/networkequip'

import { mapActions, mapGetters, mapState } from 'vuex'

const _tabs = {
    DEVICE_TAB: 'DEVICE_TAB',
    RUNTIME_TAB: 'RUNTIME_TAB',
    NETWORK_TAB: 'NETWORK_TAB'
}

export default {
    data () {
        return {
            tabs: _tabs,
            equipshow: _tabs.DEVICE_TAB
        }
    },
    components: {
        smartequip,
        timeequip,
        networkequip
    },
    computed: {
        ...mapGetters({
            cloudDeviceCount: 'cloudDeviceCount'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onTopbox (target) {
            this.equipshow = target
        },
        ...mapActions({
            findCloudDeviceCount: 'findCloudDeviceCount'
        }),
        queryTotalTime (params) {
            this.findCloudDeviceCount(params)
        },
        queryNetworkCount (params) {
            this.findCloudDeviceCount(params)
        }
    },
    mounted () {
        if (this.$route.params.tab) {
            this.equipshow = this.$route.params.tab
        }
        if (this.$route.params.phone) {
            this.$nextTick(() => {
                this.$refs['timeequip'].queryByPhone(this.$route.params.phone)
            })
        }
        this.findCloudDeviceCount()
    }
}
</script>
<style lang="scss" >
.cloud-top {
    display: flex;
    justify-content: flex-start;
    .top-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        line-height: 25px;
        height: 130px;
        background: #ffffff;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 3px 3px #e5e5e5;
        padding: 10px 20px;
        box-sizing:border-box;
        cursor: pointer;
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
