<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="service-tit">基本信息</div>
            <div class="service-wrap">
                <el-row :gutter="20">
                    <el-col :span="8"><span>申请单号：</span>{{invoiceDetail.invoiceNo}}</el-col>
                    <el-col :span="8"><span>项目：</span>{{invoiceDetail.projectName}}</el-col>
                    <el-col :span="8"><span>所属分部：</span>{{invoiceDetail.deptName}}</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>收票人：</span>{{invoiceDetail.deptName}}</el-col>
                    <el-col :span="8"><span>经销商：</span>{{invoiceDetail.companyName}}</el-col>
                    <el-col :span="8"><span>发票金额：</span>{{invoiceDetail.invoiceAmount|moneyFormat}}</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>收票人手机：</span>{{invoiceDetail.receiverMobile}}</el-col>
                    <el-col :span="16"><span>收票地址：</span>{{invoiceDetail.receiverAddress}}</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>发票号码：</span>{{invoiceDetail.invoiceId}}</el-col>
                    <el-col :span="8"><span>寄送快递单号：</span>{{invoiceDetail.deliveryNo}}</el-col>
                    <el-col :span="8"><span>开票日期：</span>{{moment(invoiceDetail.openTime).format('yyyy-MM-DD')}}</el-col>

                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24"><span>备注信息：</span>{{invoiceDetail.remark}}</el-col>
                </el-row>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="发票明细" name="first"></el-tab-pane>
                <el-tab-pane label="操作信息" name="second"></el-tab-pane>
            </el-tabs>
            <div v-if="activeName=='first'">
                <hosJoyTable align="center" border :column="tableLabel" :data="tableData"  :max-height="500" >
                </hosJoyTable>
            </div>
            <div v-if="activeName=='second'">
                <hosJoyTable align="center" border :column="recordTableLabel" :data="tableForm" actionWidth='100'  :max-height="500">
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
import moment from 'moment'
import { deepCopy } from '@/utils/utils'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { getInvoiceDetail } from '../api/index'

const operateTyps = [{ value: 1, label: '服务费发票' }, { value: 2, label: '设备发票' }]

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
    moment = moment
    activeName:string = 'first'
    private invoiceDetail = {}
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
        { label: '服务流水号', prop: 'billId' },
        { label: '支付单号', prop: 'paymentOrderNo' },
        { label: '期数', prop: 'qishu' },
        { label: '金额', prop: 'amount', displayAs: 'money' },
        { label: '支付成功时间', prop: 'paySuccessTime', displayAs: 'YYYY-MM-DD HH:mm:ss' }
    ]

    tableForm: any[] = [
    ]

    recordTableLabel: tableLabelProps = [
        { label: '时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '人员', prop: 'name' },
        { label: '操作', prop: 'operationType', dicData: operateTyps },
        { label: '备注', prop: 'operationDesc' }
    ]

    handleClick (tab, event) {
        console.log(tab, event)
    }

    public async getDetail () {
        const { data } = await getInvoiceDetail('111')
        this.invoiceDetail = data
        this.tableData = data.resourceList
        this.tableForm = data.logs
    }

    async mounted () {
        // this.tableData = [{ code: 11111, name: 2222 }]
        // this.tableForm = [{ code: 11111, name: 2222, categoryPath: 555 }]
        this.getDetail()
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