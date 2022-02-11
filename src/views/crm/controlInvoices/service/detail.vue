<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="service-tit">基本信息</div>
            <div class="service-wrap">
                <el-row :gutter="20">
                    <el-col :span="8"><span>申请单号：</span>XXXXX</el-col>
                    <el-col :span="8"><span>项目：</span>项目编号（金华市磐安县玉岑山居空调采购项目）</el-col>
                    <el-col :span="8"><span>所属分部：</span>浙江分部</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>收票人：</span>XXXXX</el-col>
                    <el-col :span="8"><span>经销商：</span>江苏橙智云信息技术有限公司</el-col>
                    <el-col :span="8"><span>发票金额：</span>9,999.99</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>收票人手机：</span>XXXXX</el-col>
                    <el-col :span="16"><span>收票地址：</span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>发票号码：</span>XXXXXXXXXXXX</el-col>
                    <el-col :span="8"><span>寄送快递单号：</span>XXXXXXXXXXX</el-col>
                    <el-col :span="8"><span>开票日期：</span>XXXXXXXXXXX</el-col>

                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24"><span>备注信息：</span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</el-col>
                </el-row>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="发票明细" name="first"></el-tab-pane>
                <el-tab-pane label="操作信息" name="second"></el-tab-pane>
            </el-tabs>
            <div v-if="activeName=='first'">
                <hosJoyTable align="center" border :column="tableLabel" :data="tableData" isAction :max-height="500" :isActionFixed='tableData&&tableData.length>0'>
                </hosJoyTable>
            </div>
            <div v-if="activeName=='second'">
                <hosJoyTable align="center" border :column="recordTableLabel" :data="tableData" actionWidth='100' isAction :max-height="500" :isActionFixed='tableData&&tableData.length>0'>
                </hosJoyTable>
            </div>
            <div class="mb20 mt20">
                <h-button @click="handleGoBack">返回</h-button>
            </div>
        </div>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import filters from '@/utils/filters'
import { RespBossShopFloorDetail } from '@/interface/hbp-shop'
import moment from 'moment'
import { deepCopy } from '@/utils/utils'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
@Component({
    name: 'Flooredit',
    components: {
        hosJoyTable
    }
})

export default class Flooredit extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    @Action('setNewTags') setNewTags!: Function

    activeName:string = 'first'
    private _queryParams = {}
    queryParams: any = {
        pageSize: 10,
        pageNumber: 1,
        name: '',
        categoryContent: '',
        brandName: '',
        isOnShelf: 2
    }

    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableData: any[] = []
    tableLabel: tableLabelProps = [
        { label: '服务流水号', prop: 'code' },
        { label: '支付单号', prop: 'name' },
        { label: '期数', prop: 'categoryPath', width: '300px' },
        { label: '金额', prop: 'brandName' },
        { label: '支付成功时间', prop: 'brandName' }
    ]

    tableForm: any[] = [
    ]

    recordTableLabel: tableLabelProps = [
        { label: '服务流水号', prop: 'code' },
        { label: '支付单号', prop: 'name' },
        { label: '期数', prop: 'categoryPath' },
        { label: '金额', prop: 'brandName' },
        { label: '支付成功时间', prop: 'brandName' },
        { label: '是否全部结清', prop: 'brandName' }
    ]

    handleClick (tab, event) {
        console.log(tab, event)
    }

    async mounted () {
        this.tableData = [{ code: 11111, name: 2222 }]
        this.tableForm = [{ code: 11111, name: 2222, categoryPath: 555 }]
    }

    handleGoBack () {
        this.$router.go(-1)
        this.setNewTags((this.$route.fullPath).split('?')[0])
    }
}
</script>

<style lang='scss' scoped>
@import "./css/css.scss";
</style>