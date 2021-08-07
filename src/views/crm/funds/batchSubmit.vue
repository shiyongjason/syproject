<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="batch">
                <div class="batch_tit">批量确认账单</div>
                <div class="batch_msg mb20">经销商：{{payDetail.companyName}}</div>
                <HosjoyTable localName="V1.*" ref="hosjoyTable" align="center" :column="tableLabel" :data="tableData">
                </HosjoyTable>
                <div class="batch_msg">支付凭证：</div>
                <div class="batch_img" v-for="(item,index) in payDetail.attachDocs" :key="index">
                    <div class="batch_img-flex">
                        <ImageAddToken :fileUrl="item.fileUrl" alt="" />
                    </div>
                </div>
                <div class="batch_bot">
                    <span>待确认总金额(元)：{{payDetail.totalAmount|fundMoneyHasTail}}</span>
                    <div>
                        <el-button type="primary" @click="onNoReceived">并未收到</el-button>
                        <el-button type="primary" @click="onReceived">确认收到</el-button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import HosjoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import ImageAddToken from '@/components/imageAddToken/index.vue'
import { ccpBaseUrl } from '@/api/config'
import { fundMoneyHasTail } from '@/utils/filters'
import { confirmPay, payReceived, payNoReceived } from './api/index'
export default {
    name: 'batchpay',
    components: { HosjoyTable, ImageAddToken },
    data () {
        return {
            fileDialog: false,
            docPos: [],
            tableLabel: [
                { label: '项目名称', prop: 'projectName' },
                { label: '账单流水号', prop: 'id' },
                { label: '账单类型', prop: 'repaymentType', dicData: [{ value: 1, label: '首付款' }, { value: 2, label: '剩余货款' }, { value: 3, label: '服务费' }] },
                { label: '金额(元)', prop: 'paymentAmount', displayAs: 'money' },
                { label: '状态', prop: 'paymentFlag', dicData: [{ value: 0, label: '待支付' }, { value: 1, label: '支付待确认' }, { value: 2, label: '已支付' }, { value: 3, label: '支付失败' }, { value: 4, label: '已取消' }] },
                { label: '应支付日期', prop: 'schedulePaymentDate', displayAs: 'YYYY-MM-DD' },
                { label: '支付时间', prop: 'paidTime', displayAs: 'YYYY-MM-DD HH:mm' }
            ],
            tableData: [],
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                fundId: ''
            },
            paginationInfo: {

            },
            payDetail: {}
        }
    },
    methods: {
        async onGetList () {
            this.queryParams.fundId = this.$route.query.fundId
            const { data } = await confirmPay(this.queryParams)
            this.payDetail = data
            this.tableData = data.batchFunds
        },
        onNoReceived () {
            const fundId = []
            this.tableData.map(item => {
                fundId.push(item.id)
            })
            this.$confirm('确定后，当前页面所有账单的状态将置为「支付失败」', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await payNoReceived({ fundId: fundId })
                this.$router.push({ path: '/goodwork/funds' })
            }).catch(() => {
            })
        },
        onReceived () {
            const fundId = []
            this.tableData.map(item => {
                fundId.push(item.id)
            })
            this.$confirm('确定后，当前页面所有账单的状态将置为「已支付」', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await payReceived({ fundId: fundId })
                this.$router.push({ path: '/goodwork/funds' })
            }).catch(() => {
            })
        }
    },
    mounted () {
        this.onGetList()
    }
}
</script>
<style lang="scss" scoped>
.batch {
    position: relative;
    width: 100%;
    &_tit {
        font-size: 18px;
    }
    &_msg {
        margin-top: 20px;
        i {
            color: red;
        }
    }
    p {
        color: #909399;
    }
    &_files {
        margin: 10px 0 0 0;
        display: flex;
        i {
            font-size: 18px;
            margin: 0 !important;
            color: #ff6600;
            padding-right: 5px;
        }
        span {
            width: 250px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #ff6600;
        }
        em {
            display: block;
            font-style: normal;
            margin-left: 10px;
            color: #169bd5;
            cursor: pointer;
        }
    }
    &_bot {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-top: 1px solid #e5e5e5;
        span {
            font-size: 25px;
        }
    }
}
.file-icon {
    font-size: 18px;
    margin: 0 !important;
    line-height: 24px !important;
    color: #fff;
}
.batch_img{
    display: flex;
    &-flex{
        width: 150px;
        height: 150px;
margin:10px
    }
}
</style>