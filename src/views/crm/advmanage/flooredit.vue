<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">11</div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
            </div>
            <div class="floor-tit">11</div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
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
