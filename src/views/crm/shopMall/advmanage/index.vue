<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <!-- tab页签 -->
                 <el-tabs v-model="activeName" @tab-click="handleTabClick">
                    <el-tab-pane label="banner管理" name="banner">
                        <!-- <loanHandoverInformation v-if="editorDrawer" :data='loanHandoverInformation' :userInfo='userInfo' @requestAgain='onRequest' @requestBack='getList' :paymentOrderId='paymentOrderId'></loanHandoverInformation> -->
                        <Bannertabs/>
                    </el-tab-pane>
                    <el-tab-pane label="楼层管理" name="floor" >
                        <!-- <upstreamPaymentInformation :data='upstreamPaymentInformation' :userInfo='userInfo' @requestAgain='onRequest'></upstreamPaymentInformation> -->
                        <Floortabs/>
                    </el-tab-pane>
                    <el-tab-pane label="品类推荐" name="category" >
                        <!-- <upstreamPaymentInformation :data='upstreamPaymentInformation' :userInfo='userInfo' @requestAgain='onRequest'></upstreamPaymentInformation> -->
                        <Categorytabs/>
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

import filters from '@/utils/filters'

import moment from 'moment'

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

    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    activeName:string='banner'
    innerVisible:boolean = false
    brandVideoUrl:string = ''
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableData:any[] | [] = []

    private _queryParams = {}
    queryParams: any = {
        roomName: '',
        roomId: ''

    }

    PAYMENTSTATUS: Map<number | null, string> = new Map([
        [null, '-'],
        [1, '待支付'],
        [2, '部分支付']
    ])
    @State('userInfo') userInfo: any

    handleTabClick (tab, event): void {
    }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>
