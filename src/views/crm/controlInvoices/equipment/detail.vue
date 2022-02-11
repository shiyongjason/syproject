<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="service-tit">基本信息</div>
            <div class="service-wrap">
                <el-row :gutter="20">
                    <el-col :span="8"><span>申请单号：</span>XXXXX</el-col>
                    <el-col :span="8"><span>支付单号：</span>XXXXXXXXXXXXX</el-col>
                    <el-col :span="8"><span>项目：</span>金华市磐安县玉岑山居空调采购项目</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>经销商：</span>江苏橙智云信息技术有限公司</el-col>
                    <el-col :span="8"><span>上游供应商：</span>江苏橙智云信息技术有限公司</el-col>
                    <el-col :span="8"><span>采购发票总金额：</span>9,999.99</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>mis采购订单号：</span>XXXXX</el-col>
                    <el-col :span="8"><span>mis销售订单号：</span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</el-col>
                    <el-col :span="8"><span>采购发票总金额：</span>9,999.99</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>销售发票收票人：</span>XXXXXXXXXXXX</el-col>
                    <el-col :span="8"><span>收票人手机：</span>XXXXXXXXXXX</el-col>
                    <el-col :span="8"><span>收票地址：</span>XXXXXXXXXXX</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12"><span>所属分部：</span>XXXXXXXXXXX</el-col>
                    <el-col :span="12"><span>备注信息：</span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</el-col>
                </el-row>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="采购发票明细" name="first"></el-tab-pane>
                <el-tab-pane label="销售发票明细" name="second"></el-tab-pane>
                <el-tab-pane label="操作信息" name="third"></el-tab-pane>
                <el-tab-pane label="文件信息" name="four"></el-tab-pane>
            </el-tabs>
            <div v-if="activeName=='first'">
                <hosJoyTable align="center" border :column="tableLabel" :data="tableData" :max-height="500" :isActionFixed='tableData&&tableData.length>0'>
                </hosJoyTable>
            </div>
            <div v-if="activeName=='second'">
                <hosJoyTable align="center" border :column="saleTableLabel" :data="tableData" actionWidth='100' :max-height="500" :isActionFixed='tableData&&tableData.length>0'>
                </hosJoyTable>
            </div>
            <div v-if="activeName=='third'">
                <hosJoyTable align="center" border :column="recordTableLabel" :data="tableData" actionWidth='100' :max-height="500" :isActionFixed='tableData&&tableData.length>0'>
                </hosJoyTable>
            </div>
            <div v-if="activeName=='four'">
                <p>XXXX.pdf</p>
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
        { label: '采购发票号码', prop: 'code' },
        { label: '发票金额', prop: 'name' },
        { label: '开票日期', prop: 'name' },
        { label: '状态', prop: 'categoryPath' }

    ]

    saleTableLabel: tableLabelProps = [
        { label: '销售发票号码', prop: 'code' },
        { label: '发票金额', prop: 'name' },
        { label: '开票日期', prop: 'name' },
        { label: '状态', prop: 'categoryPath' }
    ]

    recordTableLabel: tableLabelProps = [
        { label: '时间', prop: 'code' },
        { label: '人员', prop: 'name' },
        { label: '操作', prop: 'categoryPath' },
        { label: '备注', prop: 'brandName' }
    ]

    handleClick (tab, event) {
        console.log(tab, event)
    }

    handleGoBack () {
        // 返回
        this.$router.go(-1)
        this.setNewTags((this.$route.fullPath).split('?')[0])
    }

    async mounted () {
        this.tableData = [{ code: 11111, name: 2222 }]
    }
}
</script>

<style lang='scss' scoped>
@import "./css/css.scss";
</style>