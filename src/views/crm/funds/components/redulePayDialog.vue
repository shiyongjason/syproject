<template>
    <div>
        <el-dialog :title="title" :visible.sync="isOpen" :close-on-click-modal=false width="670px" :before-close="()=> $emit('onClose',false)">
            <template v-if="repaymentType==3">
                <div class="remain_head">
                    <div>总金额：<b>{{dialogDetail.paymentAmount|moneyFormat}}</b></div>
                    <div>已支付金额：<b>{{dialogDetail.paidAmount|moneyFormat}}</b></div>
                    <div>待支付金额：<b>{{dialogDetail.unpaidAmount|moneyFormat}}</b></div>
                    <div>支付待确认金额：<b>{{dialogDetail.unconfirmedAmount|moneyFormat}}</b></div>
                    <div>应支付日期：<b>{{dialogDetail.schedulePaymentDate?moment(dialogDetail.schedulePaymentDate).format('yyyy-MM-DD HH:mm:ss'):'-'}}</b></div>
                </div>
                <div class="remain_manual" v-if="dialogDetail&&dialogDetail.fundDetailResponseList.length==0&&!lookBoolean">
                    <h-button type="primary" @click="handleBill(dialogDetail,3)">认领流水</h-button> &nbsp;点击可读取当前经销商的入账流水
                </div>
                <div class="remain_wrap" v-for="(item) in dialogDetail&&dialogDetail.fundDetailResponseList" :key="item.id">
                    <div class="remian_wrap-top">

                        <el-row v-if="lookBoolean&&(item.receiptType == OFFINE_APPROVEL||item.receiptType == MANUAL_CLAIM_DETAIL)">
                            <el-row>
                                <el-col :span="12">
                                    本次支付金额（元）：{{item.paymentAmount|moneyFormat}}
                                </el-col>
                                <el-col :span="12">
                                    支付时间：{{moment(item.createTime).format('yyyy-MM-DD HH:mm:ss')}}
                                </el-col>
                                <el-col :span="12">
                                    支付凭证：
                                    <div class="remian_voucher">
                                        <span class="img-box" :key="i.id" v-for="(i) in item.attachDocResponseList">
                                            <imageAddToken :file-url="i.fileUrl" />
                                        </span>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    操作人：{{item.createBy}} ({{item.createPhone||'-'}})
                                </el-col>
                            </el-row>
                            <el-col :span="12">
                                {{item.receiptType == MANUAL_CLAIM_DETAIL?'认领人':'审核人'}}：{{item.updateBy}}
                            </el-col>
                            <el-col :span="12">
                                审核结果：{{paymentFlagMap&&paymentFlagMap.get(item.paymentFlag)}}
                            </el-col>
                            <el-col :span="12">
                                 {{item.receiptType == MANUAL_CLAIM_DETAIL?'认领时间':'审核时间'}}：{{item.paymentConfirmTime | momentFormat}}
                            </el-col>
                            <el-col :span="12">
                                确认方式：{{receiptTypeMap.get(item.receiptType)}}
                            </el-col>
                            <el-col :span="12" v-if="item.receiptType == OFFINE_APPROVEL">
                                是否批量：{{item.payBatch?'是':'否'}}
                            </el-col>
                            <el-col :span="12">
                                收款方：{{item.createBy}} ({{item.createPhone||'-'}})
                            </el-col>
                            <el-col :span="12">
                                收款方账户：{{item.bankAccountNo}}
                            </el-col>
                        </el-row>
                        <el-row v-if="lookBoolean&&(item.receiptType==ORDER_CANCEL||item.receiptType==MANUAL_CANCELLATION)">
                            <!--取消认领 预付款支付单/支付单取消  -->
                            <el-col :span="12">
                                取消金额（元）：{{item.receiptAmount|moneyFormat}}
                            </el-col>
                            <el-col :span="12">
                                取消时间：{{moment(item.receiptTime).format('yyyy-MM-DD HH:mm:ss')}}
                            </el-col>
                            <el-col :span="12">
                                取消流水号：{{item.billNo}}
                            </el-col>
                            <el-col :span="12">
                                取消人：{{item.receiptUser}}
                            </el-col>
                            <el-col :span="12">
                                确认方式：{{receiptTypeMap.get(item.receiptType)}}
                            </el-col>
                            <el-col :span="12">
                                收款方：{{item.paymentConfirmTime | momentFormat}}
                            </el-col>
                            <el-col :span="12">
                                收款方账户：{{item.bankAccountNo}}
                            </el-col>
                        </el-row>
                        <el-row v-if="lookBoolean&&(item.receiptType==SYSTEM_CLAIM||item.receiptType==MANUAL_CLAIM)">
                            <!--系统自动 手动认领  -->
                            <el-col :span="12">
                                认领金额（元）：{{item.receiptAmount|moneyFormat}}
                            </el-col>
                            <el-col :span="12">
                                认领时间：{{moment(item.receiptTime).format('yyyy-MM-DD HH:mm:ss')}}
                            </el-col>
                            <el-col :span="12">
                                认领流水号：{{item.billNo}}
                            </el-col>
                            <el-col :span="12">
                                认领人：{{item.receiptUser}}
                            </el-col>
                            <el-col :span="12">
                                确认方式：{{receiptTypeMap.get(item.receiptType)}}
                            </el-col>
                            <el-col :span="12">
                                收款方：{{item.paymentConfirmTime | momentFormat}}
                            </el-col>
                            <el-col :span="12">
                                收款方账户：{{item.bankAccountNo}}
                            </el-col>
                        </el-row>
                    </div>
                    <el-row class="mt10" v-if="!lookBoolean">
                        <el-row>
                            <el-col :span="12">
                                本次支付金额（元）：{{item.paymentAmount|moneyFormat}}
                            </el-col>
                            <el-col :span="12">
                                支付时间：{{moment(item.createTime).format('yyyy-MM-DD HH:mm:ss')}}
                            </el-col>
                            <el-col :span="12">
                                支付凭证：
                                <div class="remian_voucher">
                                    <span class="img-box" :key="i.id" v-for="(i) in item.attachDocResponseList">
                                        <imageAddToken :file-url="i.fileUrl" />
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                操作人：{{item.createBy}} ({{item.createPhone||'-'}})
                            </el-col>
                        </el-row>
                        <p style="color:#9999">是否确认收到经销商<span style="color:red">{{companyName}}</span>支付的<span style="color:red">{{item.paymentAmount|moneyFormat}}</span>元服务费</p>
                        <strong style="color:red">你可以选择以下方式确认这笔入账👇：</strong>
                    </el-row>
                    <div class="mt10" v-if="!lookBoolean">
                        <h-button type="assist" @click="handleOffine">线下确认</h-button>
                        <h-button @click="handleReceived(2,item)">并未收到</h-button>
                        <h-button type="primary" @click="handleBill(item,2)">认领流水</h-button>
                    </div>
                </div>
                <div class="remain_wrap" v-if="dialogDetail&&dialogDetail.fundDetailResponseList.length==0">
                    <p style="text-align:center">暂无待确认的凭证</p>
                </div>
            </template>
            <template v-else>
                <div class="remain_wrap" v-for="(item) in dialogDetail&&dialogDetail.fundDetailResponseList" :key="item.id">
                    <div class="remian_wrap-top">
                        <el-row>
                            <el-col :span="12">
                                本次支付金额（元）：{{item.paymentAmount|moneyFormat}}
                            </el-col>
                            <el-col :span="12">
                                支付时间：{{moment(item.createTime).format('yyyy-MM-DD HH:mm:ss')}}
                            </el-col>
                            <el-col :span="12" class="mt10">
                                支付成功时间：{{item.paymentConfirmTime | momentFormat}}
                            </el-col>
                            <el-col class="mt10" :span="12">
                                操作人：{{item.createBy}} ({{item.createPhone||'-'}})
                            </el-col>
                        </el-row>
                        <el-row class="mt10">
                            支付凭证：
                            <div class="remian_voucher">
                                <span class="img-box" :key="i.id" v-for="(i) in item.attachDocResponseList">
                                    <imageAddToken :file-url="i.fileUrl" />
                                </span>
                            </div>
                        </el-row>
                        <el-row class="mt10" v-if="!lookBoolean">
                            <p style="color:#9999">是否确认收到经销商<span style="color:red">{{companyName}}</span>支付的<span style="color:red">{{item.paymentAmount|moneyFormat}}</span>元{{repaymentType==3?'服务费':'贷款'}}？</p>
                        </el-row>
                    </div>
                    <div class="remian_wrap-bot" v-if="!lookBoolean && repaymentType!==3">
                        <span class="mr10"><i class="el-icon-warning" style="color:#E6A23C"></i> 确认到账后，将释放掉经销商 <span>{{item.paymentAmount|moneyFormat}}</span> 元的可用额度</span>
                    </div>
                    <div class="mt10" v-if="!lookBoolean">
                        <h-button type="assist" @click="handleReceived(1,item)">确认收到</h-button>
                        <h-button @click="handleReceived(2,item)">并未收到</h-button>
                    </div>
                </div>
                <p class="remain_mes" v-if="dialogDetail.fundDetailResponseList.length==0">暂无数据</p>
                <span slot="footer" class="dialog-footer" v-if="lookBoolean">
                    <span>支付进度：{{dialogDetail.paidAmount | moneyFormat}}/{{dialogDetail.paymentAmount | moneyFormat}}</span>
                    <el-button @click="()=> $emit('onClose',false)">取 消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog title="再次确认" :visible.sync="offineVisible" :close-on-click-modal=false width="670px" :before-close="()=>offineVisible = false">
            <p style="color:red">是否确认使用线下方式确认，如果确认则后面不可再关联流水。</p>
            <div class="remain_title">请确认收款账户信息：</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="收款方" prop="resource">
                    <el-radio-group v-model="ruleForm.resource" @change="handleChangeRadio">
                        <el-radio :label=item v-for="(item,index) in accountList" :key=index>{{item.payeeName}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="收款方账户" prop="resource">
                    <el-radio-group v-model="ruleForm.resource1">
                        <el-radio :label=item.id v-for="(item,index) in payeeAccountList" :key=index>{{item.payeeBankName + item.payeeBankAccount}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleSubmit">确认收到</el-button>
            </span>
        </el-dialog>
        <ApproveBill :isOpen="isApproveShow" :bankBillId="bankBillId" :bankType="bankType" @onCancel="()=>isApproveShow=false" v-if="isApproveShow" />

    </div>
</template>
<script>
import {
    findRemainPayDetail,
    findRemainPayConfirm,
    updateRemainPayConfirm,
    findPayeeAccount
} from '../api'
import { mapState } from 'vuex'
import imageAddToken from '@/components/imageAddToken'
import ApproveBill from './approveBill.vue'
import moment from 'moment'
import FiltUtil from '@/utils/filters'

const paymentFlagMap = new Map([[1, '支付待确认'], [2, '确认收到'], [3, '并未收到']])

const receiptTypeMap = new Map([[1, '凭证线下审核'], [2, '手动认领流水'], [3, '系统自动认领'], [4, '手动认领'], [5, '手动取消'], [6, '支付单/预付款支付单取消']])

export default {
    name: 'redulePayDialog',
    components: {
        imageAddToken,
        ApproveBill
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            paymentFlagMap,
            receiptTypeMap,
            OFFINE_APPROVEL: 1, // 凭证线下审核
            MANUAL_CLAIM_DETAIL: 2, // 手动认领流水
            SYSTEM_CLAIM: 3, // 系统自动认领
            MANUAL_CLAIM: 4, // 手动认领
            MANUAL_CANCELLATION: 5, // 手动取消
            ORDER_CANCEL: 6, // 支付单/预付款支付单取消
            offineVisible: false,
            isApproveShow: false,
            bankType: 2,
            dialogDetail: { fundDetailResponseList: [] },
            title: '',
            companyName: '',
            repaymentType: 0,
            lookBoolean: false,
            bankBillId: '',
            ruleForm: {

            },
            rules: {
                name: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ]
            },
            accountList: [],
            payeeAccountList: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        moment,
        async handleReceived (val, item) {
            const params = {
                fundDetailId: item.id,
                updateBy: JSON.parse(sessionStorage.getItem('userInfo')).employeeName,
                updatePhone: JSON.parse(sessionStorage.getItem('userInfo')).phoneNumber,
                confirmType: val
            }
            await updateRemainPayConfirm(params)
            this.$emit('onClose')
        },
        async getFundsTicket (val, bol) {
            const { data } = await findRemainPayDetail(val.id)
            this.dialogDetail = data
            this.lookBoolean = true
            this.repaymentType = bol // 来源服务费tab
            this.title = '查看凭证'
        },
        async findRemainConfirm (val, bol) {
            const { data } = await findRemainPayConfirm(val.id)
            this.dialogDetail = data
            this.companyName = val.companyName
            this.lookBoolean = false
            this.repaymentType = bol // 来源服务费tab
            // 针对服务费进行了处理
            if (bol == 3) {
                this.title = `服务费支付确认`
            } else {
                this.title = `支付确认 | 剩余货款支付进度:${FiltUtil.moneyFormat(data.paidAmount)}/${FiltUtil.moneyFormat(data.paymentAmount)}`
            }
        },
        async handleOffine () {
            const { data } = await findPayeeAccount()
            console.log(data)
            this.accountList = data
            this.offineVisible = true
        },
        handleSubmit () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.offineVisible = false
                    this.$emit('onClose')
                }
            })
        },
        handleChangeRadio (val) {
            this.payeeAccountList = this.accountList.filter(item => item == val)[0].payeeAccountList
        },
        handleBill (val, type) {
            this.bankBillId = type == 2 ? val.id : val.fundId
            this.bankType = type
            this.isApproveShow = true
        }
    }
}
</script>

<style scoped lang="scss">
/deep/.el-dialog__body {
    max-height: 450px;
    overflow-y: scroll;
}
.remain_head {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    div {
        margin-bottom: 10px;
        b {
            color: #ff7a45;
        }
    }
}
.remain_manual {
    margin-bottom: 10px;
}
.remain_wrap {
    border: 1px solid #e5e5ee;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 2px 2px 3px #e5e5e5;
    /deep/.el-col {
        margin-top: 10px;
    }
}
.remian_voucher {
    display: flex;
    flex-wrap: wrap;
}
.remain_mes {
    display: flex;
    justify-content: center;
    align-items: center;
}
.img-box {
    width: 60px;
    height: 60px;
    border: 1px solid #e5e5e5;
    margin: 10px 0 0 10px;
    display: block;
    box-shadow: 1px 1px 2px #e5e5e5;
    overflow: hidden;
    img {
        width: 60px;
        height: 60px;
    }
}
</style>
