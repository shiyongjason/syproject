<template>
    <div class="tab-layout">
        <div class="tab-layout-wrap">
            <div class="tab-layout-title" style="marginTop:0"><span></span>基本信息：</div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font>项目名称：</font><span>{{data.projectName}}</span>
                </div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 60px">经销商：</font><span>{{data.companyName}}</span>
                </div>
            </div>
            <div class="info-layout">
                <!-- <div class="info-layout-item"><font style="flex: 0 0 85px">收款人名称：</font><span>{{data.supplierCompanyName}}</span></div> -->
                <div class="info-layout-item">
                    <font style="flex: 0 0 70px">所属分部：</font><span>{{data.deptName}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 85px">采购单金额：</font><span>
                        {{ data.poAmount|moneyFormat}} 元</span>
                </div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 120px">上游预付款核销金额：</font><span>
                        {{ data.prepaymentWriteOffAmount|moneyFormat}} 元</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 100px">剩余货款金额：</font><span>
                        {{ data.noPayAmount|moneyFormat}} 元</span>
                </div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 85px">支付单金额：</font><span>
                        {{ data.applyAmount|moneyFormat}} 元</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 85px">首付款比例：</font>
                    <span>{{data.prePercent?data.prePercent+'%':'-'}}</span>
                </div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 130px">剩余货款支付周期：</font>
                    <span>{{data.restPaymentPeriod+'个月'}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 100px">付款主体：</font>
                    <span>{{ data.paymentMain || '-' }}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 100px">监管账户账号：</font>
                    <span>{{data.regulatorAccountNo?data.regulatorAccountNo:'-'}}</span>
                </div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 100px">监管账户户名：</font>
                    <span>{{data.regulatorAccountName||'-'}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 120px">监管账户开户行：</font>
                    <span>{{data.regulatorAccountBank?data.regulatorAccountBank:'-'}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 100px">网银盾照片：</font>
                    <div class="info-layout-img" v-for="(item,index) in data.onlineBankingShields" :key="index">
                        <ImageAddToken :fileUrl="item.fileUrl" alt="" />
                    </div>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 100px">共管户截图：</font>
                    <div class="info-layout-img" v-for="(item,index) in data.screenshots" :key="index">
                        <ImageAddToken :fileUrl="item.fileUrl" alt="" />
                    </div>
                </div>
            </div>
            <!-- 货款申请信息 -->
            <div class="tab-layout-title"><span></span>货款申请信息：<font>申请人：{{data.applyBy||'-'}}</font>
                <font>申请时间：{{data.applyTime|momentFormat}}</font>
            </div>
            <div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 85px">上游供应商：</font><span>{{data.supplierCompanyName||'-'}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 130px">供应商开户行名称：</font><span>{{data.supplierAccountName||'-'}}</span>
  (<em v-if="data.supplierLabel" :class="data.supplierLabel&&className.get(data.supplierLabel.code)">
                                     {{data.supplierLabel.desc}}
                     </em>)
                </div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 85px">银行联行号：</font><span>{{data.supplierBankNo||'-'}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 115px">供应商银行账号：</font><span>{{data.supplierAccountNo||'-'}}</span>
                </div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 130px">期望上游支付日期：</font><span>{{data.expectSupplierPaymentDate||'-'}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 100px">上游支付方式：</font><span>
                        {{paymentType.get(data.supplierPaymentType)}}
                    </span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 70px">备注信息:</font><span>{{data.specialRemark||'-'}}</span>
                </div>
                <div class="info-layout-item" v-if="data.supplierPaymentType==1">
                    <font style="flex: 0 0 90px">银行转账方式:</font><span>{{bankTransferMethodArr.get(data.bankTransferMethod)||'-'}}</span>
                </div>
            </div>
            <!-- 货款申请信息 -->
            <div class="tab-layout-title"><span></span>支付单审核信息：</div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex: 0 0 115px">上游货款方式：</font><span>{{data.supplierPaymentMethod?supplierPaymentMethodArr.get(data.supplierPaymentMethod):'-'}}</span>
                </div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 130px">下游合作方式：</font><span>{{data.dealerCooperationMethod?dealerCooperationMethodArr.get(data.dealerCooperationMethod):'-'}}</span>
                </div>
            </div>
            <!-- 放款交接内容 -->
            <div class="tab-layout-title"><span></span>放款交接内容：<font>申请人：{{data.initiateBy||'-'}}</font>
                <font>申请时间：{{data.initiateTime|momentFormat}}</font>
            </div>
            <div style="margin-left:10px">
                <div class="info_box">
                    <div class="info_box-icon"><i class="el-icon-s-claim"></i>预付款到好享家账户</div>
                    <div class="info_box-txt">
                        <font>预付款金额：{{data.advancePaymentAmount|moneyFormat}}元</font>
                        <font> 确认到账时间：{{data.confirmArrivalTime|momentFormat}}</font>
                        <font>确认人：{{data.confirmArrivalBy}}</font>
                    </div>
                    <div class="info-layout">
                        <div class="info-layout-item">
                            <div class="info-layout-img" v-for="(item,index) in data.advancePaymentVouchers" :key="index">
                                <ImageAddToken :fileUrl="item.fileUrl" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info_box-stit">
                    <h3>质押与终审决议信息</h3>
                </div>
                <div class="info_box">
                    <div class="info_box-icon"><i class="el-icon-s-claim"></i>质押信息：{{data.pledgeNo}}</div>
                </div>
                <!-- <div class="info_box">
              <div class="info_box-icon"><i class="el-icon-s-claim"></i>评审决议流程：{{data.reviewResolutionStatus==1?'已完结':'未完结'}}（{{data.reviewResolutionNo}}）</div>
        </div> -->
                <div class="info_box">
                    <div class="info_box-icon"><i class="el-icon-s-claim"></i>货款支付流程：{{data.oaStatus==1?'已完结':'未完结'}}（{{data.oaNo}}）</div>
                </div>
                <div class="info_box-stit">
                    <h3>采购合同信息</h3>
                </div>
                <div class="info_box">
                    <div class="info_box-icon"><i class="el-icon-s-claim"></i>上游采购合同</div>
                    <div class="info_box-img" v-for="(item,index) in data.archiveContractFiles" :key="index+'L'">
                        {{index+1}}、
                        <downloadFileAddToken isPreview :file-name="item.fileName" :file-url="item.fileUrl" :a-link-words="item.fileName" is-type="main" />
                    </div>
                    <div class="info_box-img" v-if="data.archiveContractFiles.length==0||!data.archiveContractFiles" style="color:#999999">
                        暂无数据
                    </div>
                    <p>单次采购明细附件</p>
                    <div class="info_box-img" v-for="(item,index) in data.purchaseDetailFiles" :key="index">
                        {{index+1}}、
                        <downloadFileAddToken isPreview :file-name="item.fileName" :file-url="item.fileUrl" :a-link-words="item.fileName" is-type="main" />
                    </div>
                    <div class="info_box-img" v-if="data.purchaseDetailFiles.length==0||!data.purchaseDetailFiles" style="color:#999999">
                        暂无数据
                    </div>
                </div>
                <div style="margin-top:20px" v-if="data.supplierPaymentType==2">
                    <div class="info_box-stit">
                        <h3>票面信息</h3>
                    </div>
                    <div class="info_box-txt">
                        <font>更新人：{{data.billAmountResponse.billAmountCreateBy||'-'}}</font>
                        <font>更新时间：{{data.billAmountResponse.billAmountCreateTime|momentFormat}}</font>
                    </div>
                    <div class="info_box-table">
                        <div class="info_box-table--flex">
                            <div class="info_box-table--left">出票张数</div>
                            <div class="info_box-table--left">票面金额（元）</div>
                        </div>
                        <div class="info_box-table--flex" v-for="(item,index) in data.billAmountResponse.billAmountDetail" :key="index">
                            <div class="info_box-table--left">第{{item.number}}张票</div>
                            <div class="info_box-table--left">{{item.amount|moneyFormat}}</div>
                        </div>
                        <div class="info_box-table--flex">
                            <div class="info_box-table--left">合计</div>
                            <div class="info_box-table--left">{{data.billAmountResponse.totalAmount|moneyFormat}}</div>
                        </div>
                    </div>
                    <transition name="fade" mode="out-in">
                        <div class="info_more" @click="onShowMore">{{isMoreBill?`收起更多票面记录`:'展开更多票面记录'}}</div>
                    </transition>
                    <transition name="slide-fade">
                        <div v-if="isMoreBill">
                            <div v-for="(item,index) in billData" :key="index">
                                <p class="info_box-txt">
                                    <font>{{index!=0?'更新人':'创建人'}}：{{item.billAmountCreateBy}}</font>
                                    <font> {{index!=0?'更新时间':'提交时间'}}：{{item.billAmountCreateTime|momentFormat}}</font>
                                </p>
                                <div class="info_box-table">
                                    <div class="info_box-table--flex">
                                        <div class="info_box-table--left">出票张数</div>
                                        <div class="info_box-table--left">票面金额（元）</div>
                                    </div>
                                    <div class="info_box-table--flex" v-for="(jtem,jndex) in item.billAmountDetail" :key="jndex">
                                        <div class="info_box-table--left">第{{jtem.number}}张票</div>
                                        <div class="info_box-table--left">{{jtem.amount|moneyFormat}}</div>
                                    </div>
                                    <div class="info_box-table--flex">
                                        <div class="info_box-table--left">合计</div>
                                        <div class="info_box-table--left">{{item.totalAmount|moneyFormat}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="info_box-txt" style="word-break: break-word;">备注信息：{{data.remark||'-'}}</div>
            </div>
        </div>
        <div class="info_btnbot">
            <div>
                <el-button type="primary" @click="onArchiveDown" v-if="hosAuthCheck(upstreamDownPurchase)">下载采购合同</el-button>
                <el-button type="primary" :disabled="status==2||status==1" @click="onLoanDown" v-if="hosAuthCheck(upstreamPayDown)">下载放款交接单</el-button>
                <el-button type="primary" @click="onExport" v-if="hosAuthCheck(upstreamDownBills)&&data.supplierPaymentType==2">下载出票明细</el-button>
            </div>
            <div style="margin-top:10px">
                <el-button type="primary" @click="onRefuse" v-if="data.loanTransferStatus==1&&hosAuthCheck(upstreamReject)">驳回交接</el-button>
                <el-button type="primary" @click="onConfirm" v-if="data.loanTransferStatus==1&&hosAuthCheck(upstreamConfirm)">确认交接</el-button>
            </div>
        </div>
        <el-dialog :title='title' :visible.sync="infoDialog" width="40%" :modal=false :close-on-click-modal="false" :before-close="onCancelDialog">
            <el-form :model="dialogFormData" :rules="formRules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="驳回原因:" prop="remark" v-if="title=='驳回'">
                    <el-input type="textarea" v-model.trim="dialogFormData.remark" :autosize="{ minRows: 4, maxRows: 6}" maxlength="500" show-word-limit></el-input>
                </el-form-item>
                <!-- v-if="title=='交接'&&data.supplierPaymentType==1"  -->
                <el-form-item v-if="title=='交接'&&data.supplierPaymentType==1"  label="银行转账方式：" prop="bankTransferMethod" >
                    <el-radio-group v-model="dialogFormData.bankTransferMethod">
                        <el-radio label="1">司库线上转账</el-radio>
                        <el-radio label="2">线下网银转账</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="交接备注:" v-if="title=='交接'">
                    <el-input type="textarea" v-model.trim="dialogFormData.remark" :autosize="{ minRows: 4, maxRows: 6}" maxlength="200" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCancelDialog">取 消</el-button>
                <el-button type="primary" @click="onHandleSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
    LoanTransferInfoResponse,
    ReqLoanTransferUpdate,
    BillAmountResponse
} from '@/interface/hbp-project'
import {
    onConfirmApi,
    archiveDown,
    downLoan,
    exportExcel,
    onSubmitReject,
    onSubmitConfirm,
    getMoreBill
} from '../api/index'
import { PAYMENTTYPE } from '../index.vue'
import {
    UPSTREAM_PAY_CONFIRM_EX,
    UPSTREAM_PAY_CONFIRM_LOAN,
    UPSTREAM_PAY_DOWN,
    UPSTREAM_DOWN_PURCHASE,
    UPSTREAM_DOWN_BILLS,
    UPSTREAM_REJECT,
    UPSTREAM_CONFIRM
} from '@/utils/auth_const'
import { interfaceUrl } from '@/api/config'
import ImageAddToken from '@/components/imageAddToken/index.vue'
import downloadFileAddToken from '@/components/downloadFileAddToken/index.vue'
import { downloadFile } from '@/utils'
const className = new Map([[0, 'red'], [10, 'red'], [11, 'red'], [12, 'green'], [20, 'red'], [21, 'red'], [22, 'green'], [30, 'red'], [31, 'red'], [32, 'green']])
@Component({
    name: 'loanHandoverInformation',
    components: {
        ImageAddToken,
        downloadFileAddToken
    }
})
export default class LoanHandoverInformation extends Vue {
    @Prop({ default: '' }) readonly data!: LoanTransferInfoResponse;
    // @Prop({ default: '' }) readonly userInfo!:any  // fix Property 'userInfo' is used before its initialization 假数据开发的时候加了一个非空定义
    @Prop({ type: Object, required: true, default: '' }) userInfo: any;
    @Prop({ default: '' }) readonly paymentOrderId!: any;
    @Prop({ default: '' }) readonly status: number;

    $refs!: {
        form: HTMLFormElement;
    };

    upstreamPayConfirmEx = UPSTREAM_PAY_CONFIRM_EX;
    upstreamPayConfirmLoan = UPSTREAM_PAY_CONFIRM_LOAN;
    upstreamPayDown = UPSTREAM_PAY_DOWN;
    upstreamDownPurchase = UPSTREAM_DOWN_PURCHASE;
    upstreamDownBills = UPSTREAM_DOWN_BILLS;
    upstreamReject = UPSTREAM_REJECT;
    upstreamConfirm = UPSTREAM_CONFIRM;
className = className
    paymentType = PAYMENTTYPE;
    infoDialog: boolean = false;
    isMoreBill: boolean = false;
    title: string = '';
    billData: BillAmountResponse[] = [];
    supplierPaymentMethodArr = new Map([
        [1, '先款后货'],
        [2, '先货后款']
    ]);
    dealerCooperationMethodArr = new Map([
        [1, '垫资代采'],
        [2, '代收代付']
    ]);
    bankTransferMethodArr = new Map([
        [1, '司库线上转账'],
        [2, '线下网银转账']
    ]);
    checkArr = [true, true, true, true, true];

    get formRules () {
        let rules = {
            bankTransferMethod: [{
                required: true, message: '银行转账方式必选', trigger: 'change'

            }],
            remark: [
                {
                    required: true,
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            if (this.title == '驳回') {
                                return callback(new Error('请输入驳回原因'))
                            } else {
                                return callback(new Error('请输入交接备注'))
                            }
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }
            ]

        }
        return rules
    }

    dialogFormData: ReqLoanTransferUpdate = {
        loanTransferId: '',
        remark: '',
        updateBy: '',
        bankTransferMethod: ''
    };

    async onArchiveDown () {
        const { data } = await archiveDown(this.data.loanTransferId)
        window.open(data)
    }

    async onLoanDown () {
        /* const { data } = await downLoan(this.paymentOrderId)
        window.open(data) */
        let apiUrl = `project/api/loan-transfers/boss/${this.paymentOrderId}/download`
        downloadFile(apiUrl)
    }

    getBody = (xhr) => {
        const text = xhr.responseText || xhr.response
        if (!text) {
            return text
        }

        try {
            return JSON.parse(text)
        } catch (e) {
            return text
        }
    };

    getError = (action, xhr) => {
        let msg
        if (xhr.response) {
            msg = `${xhr.response.error || xhr.response}`
        } else if (xhr.responseText) {
            msg = `${xhr.responseText}`
        } else {
            msg = `fail to post ${action} ${xhr.status}`
        }
        return msg
    };

    async onExport () {
        location.href =
            interfaceUrl +
            `project/api/loan-transfers/boss/${this.data.loanTransferId}/bill-amount/export`
    }

    onRefuse () {
        this.infoDialog = true
        this.title = '驳回'
    }

    onConfirm () {
        // 首付款待确认给提示
        if (this.status == 2) {
            this.$message.warning('请确认首付款是否到账~')
            return
        }
        this.infoDialog = true
        this.title = '交接'
    }

    onCancelDialog () {
        this.infoDialog = false
        this.$refs['ruleForm'].clearValidate()
        this.dialogFormData.remark = ''
    }

    async onShowMore () {
        if (this.isMoreBill) {
            this.isMoreBill = false
        } else {
            const { data } = await getMoreBill(this.paymentOrderId)
            console.log(data)
            this.billData = data
            this.isMoreBill = true
        }
    }

    onHandleSubmit () {
        this.dialogFormData.loanTransferId = this.data.loanTransferId
        this.$refs['ruleForm'].validate(async (valid) => {
            console.log(valid)
            if (valid) {
                if (this.title == '驳回') {
                    await onSubmitReject(this.dialogFormData)
                    this.$emit('requestBack')
                } else {
                    // 交接
                    await onSubmitConfirm(this.dialogFormData)
                    this.$emit('requestAgain')
                    this.$emit('requestBack')
                }
                this.$message.success('提交成功！')
                this.infoDialog = false
            } else {
            }
        })
    }

    async onSureInfo (id: any, checkBoxKey: number) {
        console.log('id: ', id)
    }

    mounted () {
        console.log(this.status)
        this.dialogFormData.updateBy = this.userInfo.employeeName
    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>
