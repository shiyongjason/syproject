<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <!-- tab页签 -->
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane :label='"banner管理("+`${numInfo.bannerNum}`+")"' name="banner">
                    <!-- <loanHandoverInformation v-if="editorDrawer" :data='loanHandoverInformation' :userInfo='userInfo' @requestAgain='onRequest' @requestBack='getList' :paymentOrderId='paymentOrderId'></loanHandoverInformation> -->
                    <Bannertabs v-if="activeName=='banner'" @backEvent = onFindNum />
                </el-tab-pane>
                <el-tab-pane :label='"楼层管理("+`${numInfo.floorNum}`+")"' name="floor">
                    <!-- <upstreamPaymentInformation :data='upstreamPaymentInformation' :userInfo='userInfo' @requestAgain='onRequest'></upstreamPaymentInformation> -->
                    <Floortabs v-if="activeName=='floor'" @backEvent = onFindNum ref="floors"/>
                </el-tab-pane>
                <el-tab-pane label="品类推荐" name="category">
                    <!-- <upstreamPaymentInformation :data='upstreamPaymentInformation' :userInfo='userInfo' @requestAgain='onRequest'></upstreamPaymentInformation> -->
                    <Categorytabs v-if="activeName=='category'" />
                </el-tab-pane>
            </el-tabs>
            <!-- end search bar -->
        </div>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import Bannertabs from './components/banner_tabs.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import Categorytabs from './components/category_tabs.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import Floortabs from './components/floor_tabs.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { newCache } from '@/utils/index'
import filters from '@/utils/filters'
import moment from 'moment'
import { getEnableNum } from './api/index'
import { FloorAndBannerEnableNumResponse } from '@/interface/hbp-shop'

@Component({
    name: 'Advmanage',
    components: {
        Bannertabs,
        Categorytabs,
        Floortabs
    }
})

export default class Advmanage extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    numInfo:FloorAndBannerEnableNumResponse={
        bannerNum: '',
        floorNum: ''
    }
    activeName: string='banner'

    handleTabClick (tab, event): void {
    }
    async onFindNum () {
        const { data } = await getEnableNum()
        this.numInfo = data
    }

    mounted () {
        this.onFindNum()
        if (this.$route.params.tabs) {
            this.activeName = this.$route.params.tabs
        }
    }
    activated () {
        if (this.activeName == 'floor') {
            this.$nextTick(() => {
                this.$refs['floors'].onGetFloorPage()
            })
        }
    }

    beforeUpdate () {
        newCache('Advmanage')
    }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>
