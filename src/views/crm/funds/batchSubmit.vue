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
                    <span>待确认总金额(元)：{{payDetail.totalAmount|moneyFormat}}</span>
                    <!-- <div>
                        <el-button type="primary" @click="onNoReceived">并未收到</el-button>
                        <el-button type="primary" @click="onReceived">确认收到</el-button>
                    </div> -->
                    <p>是否确认收到经销商{{payDetail.companyName}}支付的{{payDetail.totalAmount|moneyFormat}}元账单？</p>
                    <p>你可以选择以下方式确认这笔入账👇：</p>
                    <div class="batch_bot-btn">
                        <el-button type="info" @click="handleOffine">线下确认</el-button>
                        <el-button @click="onNoReceived">并未收到</el-button>
                        <el-button type="primary" @click="handleClaim">认领流水</el-button>
                    </div>
                </div>
            </div>
        </div>
         <el-dialog title="再次确认" :visible.sync="offineVisible" :close-on-click-modal=false width="670px" :before-close="()=>offineVisible = false">
            <p style="color:red">是否确认使用线下方式确认，如果确认则后面不可再关联流水。</p>
            <div class="remain_title">请确认收款账户信息：</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="收款方：" prop="payeeName">
                    <!-- <el-radio-group v-model="ruleForm.payeeName" @change="handleChangeRadio">
                        <el-radio :label=item.payeeName v-for="(item,index) in accountList" :key=index>{{item.payeeName}}</el-radio>
                    </el-radio-group> -->
                    <el-select v-model="ruleForm.payeeName" placeholder="请选择" @change="handleChangeRadio">
                        <el-option v-for="(item,index) in accountList" :key="index" :label="item.payeeName" :value="item.payeeName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收款方账户：" prop="id">
                     <el-select v-model="ruleForm.id" placeholder="请选择">
                        <el-option v-for="item in payeeAccountList" :key="item.id" :label="item.payeeBankName" :value="item.id">
                            <span style="float: left">{{ item.payeeBankName }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.payeeBankAccount }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleSubmit">确认收到</el-button>
            </span>
        </el-dialog>
          <ApproveBill :isOpen="isOpen" :payeeName = payDetail.companyName  :payeeMoney = payDetail.totalAmount :bankType="4" @onCancel="()=>isOpen=false" @backonReceived = "onReceived" v-if="isOpen" />
    </div>
</template>
<script>
import HosjoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import ImageAddToken from '@/components/imageAddToken/index.vue'
import ApproveBill from './components/approveBill.vue'
import { confirmPay, updateReceiptBatchBank, payNoReceived, payReceived, findPayeeAccount } from './api/index'
export default {
    name: 'batchpay',
    components: { HosjoyTable, ImageAddToken, ApproveBill },
    data () {
        return {
            fileDialog: false,
            offineVisible: false,
            isOpen: false,
            docPos: [],
            bankBillId: '',
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
            payDetail: {},
            ruleForm: {
                payeeName: '',
                id: ''
            },
            rules: {
                payeeName: [
                    { required: true, message: '请至少选择一个收款方', trigger: 'change' }
                ],
                id: [
                    { required: true, message: '请至少选择一个收款方账户', trigger: 'change' }
                ]
            },
            payeeAccountList: [],
            accountList: []
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
        handleSubmit (val) {
            const fundId = []
            this.tableData.map(item => {
                fundId.push(item.id)
            })
            const params = {
                fundId: fundId,
                payeeAccountId: this.ruleForm.id
                // payeeName: this.ruleForm.payeeName
            }
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    await payReceived(params)
                    this.$router.push({ path: '/goodwork/funds' })
                }
            })
        },
        async onReceived (val) {
            const params = {
                fundList: this.tableData,
                attachDocList: this.payDetail.attachDocs,
                bankBillReceiptList: val,
                totalReceiptAmount: this.payDetail.totalAmount
            }
            await updateReceiptBatchBank(params)
            this.$router.push({ path: '/goodwork/funds' })
            // this.$confirm('确定后，当前页面所有账单的状态将置为「已支付」', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(async () => {
            //     await payReceived({ fundId: fundId })
            //     this.$router.push({ path: '/goodwork/funds' })
            // }).catch(() => {
            // })
        },
        handleChangeRadio (val) {
            this.payeeAccountList = this.accountList.filter(item => item.payeeName == val)[0].payeeAccountList
            this.ruleForm.id = ''
        },
        async handleOffine () {
            const { data } = await findPayeeAccount()
            this.accountList = data
            this.ruleForm.id = ''
            this.ruleForm.payeeName = ''
            this.offineVisible = true
            this.$nextTick(() => {
                this.$refs.ruleForm.clearValidate()
            })
        },
        handleClaim () {
            this.isOpen = true
            this.bankBillId = this.$route.query.fundId
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
        margin-top: 10px;
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
        padding: 20px 0;
        border-top: 1px solid #e5e5e5;
        flex-direction: column;
        span {
            font-size: 25px;
        }
        &-btn{
            margin-top: 10px;
        }
    }
}
.file-icon {
    font-size: 18px;
    margin: 0 !important;
    line-height: 24px !important;
    color: #fff;
}
.batch_img {
    display: flex;
    &-flex {
        width: 150px;
        height: 150px;
        margin: 10px;
        img{
            width: 150px;
        height: 150px;
        }
    }
}
/deep/.el-dialog .el-select{
    width: 100%;
}
/deep/.el-dialog .el-input{
    width: 100%;
}
</style>