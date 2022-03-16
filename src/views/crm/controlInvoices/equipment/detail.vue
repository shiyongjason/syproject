<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="service-tit">基本信息</div>
            <div class="service-wrap">
                <el-row :gutter="20">
                    <el-col :span="8"><span>申请单号：</span>{{formDetail.invoiceNo}}</el-col>
                    <el-col :span="8"><span>支付单号：</span>{{formDetail.id}}</el-col>
                    <el-col :span="8"><span>项目：</span>{{formDetail.projectName}}</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>经销商：</span>{{formDetail.companyName}}</el-col>
                    <el-col :span="8"><span>上游供应商：</span>{{formDetail.supplierCompanyName}}</el-col>
                    <el-col :span="8"><span>采购发票总金额：</span>{{formDetail.purchaseInvoiceAmount|moneyFormat}}</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>mis采购订单号：</span>{{formDetail.misPurchaseOrderNo}}</el-col>
                    <el-col :span="8"><span>mis销售订单号：</span>{{formDetail.misSalesOrderNo}}</el-col>
                    <el-col :span="8"><span>采购发票总金额：</span>{{formDetail.purchaseInvoiceAmount|moneyFormat}}</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><span>销售发票收票人：</span>{{formDetail.receiver}}</el-col>
                    <el-col :span="8"><span>收票人手机：</span>{{formDetail.receiverMobile}}</el-col>
                    <el-col :span="8"><span>收票地址：</span>{{formDetail.receiverAddress}}</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12"><span>所属分部：</span>{{formDetail.deptName}}</el-col>
                    <el-col :span="12"><span>备注信息：</span>{{formDetail.remark}}</el-col>
                </el-row>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="采购发票明细" name="first"></el-tab-pane>
                <el-tab-pane label="销售发票明细" name="second"></el-tab-pane>
                <el-tab-pane label="操作信息" name="third"></el-tab-pane>
                <el-tab-pane label="文件信息" name="four"></el-tab-pane>
            </el-tabs>
            <div v-if="activeName=='first'">
                <p>已核销采购发票金额：{{formDetail.verificationPurchaseInvoiceAmount|moneyFormat}} 在途采购发票金额：{{formDetail.intransitPurchaseInvoiceAmount|moneyFormat}}</p>
                <hosJoyTable align="center" border :column="tableLabel" :data="tableData" :max-height="500" >
                </hosJoyTable>
            </div>
            <div v-if="activeName=='second'">
                     <p>销售发票金额：{{formDetail.normalSalesInvoiceAmount|moneyFormat}}</p>
                <hosJoyTable align="center" border :column="saleTableLabel" :data="saleData" actionWidth='100' :max-height="500" >
                </hosJoyTable>
            </div>
            <div v-if="activeName=='third'">
                <hosJoyTable align="center" border :column="recordTableLabel" :data="recordData" actionWidth='100' :max-height="500" >
                </hosJoyTable>
            </div>
            <div v-if="activeName=='four'">
                <!-- <p v-for="(item,index) in fileLists">{{item.fileName}}</p> -->
                 <elImageAddToken style="width: 100px; height: 100px;margin-right:10px; border:1px solid #dad5d5;    border-radius: 5px;" :fileUrl="pic.fileUrl" :fit="'contain'" v-for="(pic,index) in fileLists" :key='index'></elImageAddToken>
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
import { getEqpDetail } from '../api/index'
import moment from 'moment'
import elImageAddToken from '@/components/elImageAddToken/index.vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
@Component({
    name: 'equipmentdetail',
    components: {
        hosJoyTable,
        elImageAddToken
    }
})

export default class Equipmentdetail extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    @Action('setNewTags') setNewTags!: Function

    activeName:string = 'first'

    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    fileLists = []
    tableData: any[] = []
    tableLabel: tableLabelProps = [
        { label: '采购发票号码', prop: 'misPurchaseInvoiceNo' },
        { label: '发票金额', prop: 'invoiceAmount' },
        { label: '开票日期', prop: 'openDate', displayAs: 'YYYY-MM-DD' },
        { label: '状态', prop: 'status', dicData: [{ value: 10, label: '正常' }, { value: 20, label: '作废' }] }
    ]

    formDetail = {}

    saleData: any[] = []
    saleTableLabel: tableLabelProps = [
        { label: '销售发票号码', prop: 'misSaleInvoiceNo' },
        { label: '发票金额', prop: 'invoiceAmount' },
        { label: '开票日期', prop: 'openDate', displayAs: 'YYYY-MM-DD' },
        { label: '状态', prop: 'status', dicData: [{ value: 10, label: '正常' }, { value: 20, label: '作废' }] }
    ]

    recordData: any[] = []
    recordTableLabel: tableLabelProps = [
        { label: '时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm' },
        { label: '人员', prop: 'operator' },
        { label: '操作', prop: 'operationType', dicData: [{ value: 1, label: '申请' }, { value: 2, label: '提交' }, { value: 3, label: '驳回' }, { value: 4, label: '开票' }] },
        { label: '备注', prop: 'note' }
    ]

    handleClick (tab, event) {
        console.log(tab, event)
    }

    handleGoBack () {
        // 返回
        this.$router.go(-1)
        this.setNewTags((this.$route.fullPath).split('?')[0])
    }

    async getEquipDetail (id) {
        const { data } = await getEqpDetail(id)
        this.formDetail = data
        this.tableData = data.purchaseInvoiceDetails
        this.saleData = data.saleInvoiceDetails
        this.recordData = data.logs
        this.fileLists = data.attachDocs
    }

    async mounted () {
        // this.tableData = [{ code: 11111, name: 2222 }]
        if (this.$route.query.id) {
            this.getEquipDetail(this.$route.query.id)
        }
    }
}
</script>

<style lang='scss' scoped>
@import "./css/css.scss";
</style>