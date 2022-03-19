<template>
<div style="z-index:9999;position: absolute;">
    <el-dialog :title="title" :visible.sync="isOpen" width="1000px" :before-close="()=> onClose()"
               :close-on-click-modal="false" :destroy-on-close="true" :modal-append-to-body="false">
        <div class="info-content">
            <div class="row-filed">
                <div class="col-filed left" v-if="dialogDetail.poInfo && dialogStatus.enter.status === openStatus">
                    <div class="info-title">采购单信息</div>
                    <ul class="purchase-order-info">
                        <li>
                            <span class="label">采购单金额：</span>
                            <span>{{ dialogDetail.poInfo.poAmount | moneyFormat }}元</span>
                        </li>
                        <li class="info-img-group">
                            <span class="label">采购明细表：</span>
                            <p class="content">
                                <template v-if="dialogDetail.poInfo && dialogDetail.poInfo.poDetail">
                                    <span class="img-box" :key="item.url" @click="goDetail(item.url)"  v-for="item in dialogDetail.poInfo.poDetail">
                                        <imageAddToken :file-url="item.url" class="info-img"/>
                                    </span>
                                </template>
                            </p>

                        </li>
                        <li>
                            <span class="label">采购批次：</span>
                            <span>{{ dialogDetail.poInfo.poNumber | attributeComputed(PaymentOrderDict.applyType.list) }}</span>
                        </li>
                        <li>
                            <span class="label">经销商预付款比例： </span>
                            <span>{{ dialogDetail.poInfo.prePercent || '-' }}%</span>
                        </li>
                        <li>
                            <span class="label">剩余货款支付周期： </span>
                            <span>{{ dialogDetail.poInfo.restPaymentPeriod || '-' }}个月</span>
                        </li>
                        <li>
                            <span class="label">最迟发货日期：</span>
                            <span>{{ dialogDetail.poInfo.lastGoodsDate || '-' }}</span>
                        </li>
                        <li>
                            <span class="label">收货地址：</span>
                            <span>{{ dialogDetail.poInfo.goodsAddress || '-' }}</span>
                        </li>
                        <li>
                            <span class="label">监管账户户名： </span>
                            <span>{{ dialogDetail.poInfo.regulatorAccountName || '-' }}</span>
                        </li>
                        <li>
                            <span class="label">监管账户银行账号：</span>
                            <span>{{ dialogDetail.poInfo.regulatorAccountNo || '-' }}</span>
                        </li>
                        <li>
                            <span class="label">监管账户开户行： </span>
                            <span>{{ dialogDetail.poInfo.regulatorAccountBank || '-' }}</span>
                        </li>
                        <li>
                            <span class="label">收款账户户名：</span>
                            <span>{{ dialogDetail.poInfo.receiverAccountName || '-' }}</span>
                        </li>
                        <li>
                            <span class="label">收款账户银行账号： </span>
                            <span>{{ dialogDetail.poInfo.receiverAccountNo || '-' }}</span>
                        </li>
                        <li>
                            <span class="label">收款账户开户行：</span>
                            <span>{{ dialogDetail.poInfo.receiverAccountBank || '-' }}</span>
                        </li>
                    </ul>
                </div>
                <div class="col-filed left" v-if="dialogStatus.enter.status !== openStatus">
                    <div class="info-title">变更的内容</div>
                    <table class="see-change">
                        <tr>
                            <th>变更字段</th>
                            <th>变更前</th>
                            <th>变更后</th>
                        </tr>
                        <tr :key="item.id" v-for="item in dialogDetail.poChangeFields">
                            <td>{{ item.fieldName | attributeComputed(purchaseOrderDict.fileName.list)}}</td>
                            <td>
                                <template v-if="Array.isArray(checkedIsJson(item.originalValue))">
                                    <imageAddToken :file-url="item.fileUrl"  v-for="item in checkedIsJson(item.originalValue)"  :key="item.url" class="info-img" />
                                </template>
                                <template v-else>
                                    <template v-if="item.fieldName === 'purch_order_purch_batch'">
                                        {{ (item.originalValue - 0 ) | attributeComputed(PaymentOrderDict.applyType.list)}}
                                    </template>
                                    <template v-else>
                                        {{ item.originalValue + (item.unit || '') }}
                                    </template>
                                </template>
                            </td>
                            <td>
                                <template v-if="Array.isArray(checkedIsJson(item.changedValue))">
                                    <imageAddToken :file-url="item.fileUrl"  v-for="item in checkedIsJson(item.changedValue)"  :key="item.url" class="info-img"/>
                                </template>
                                <template v-else>
                                    <template v-if="item.fieldName === 'purch_order_purch_batch'">
                                        {{ (item.changedValue -0) | attributeComputed(PaymentOrderDict.applyType.list)}}
                                    </template>
                                    <template v-else>
                                        {{ item.changedValue + (item.unit || '') }}
                                    </template>
                                </template>
                            </td>
                        </tr>
                    </table>
                    <p class="change-tips" v-if="dialogDetail.poChangeFields && dialogDetail.poChangeFields.length === 0">
                        暂无数据
                    </p>
                </div>
                <div class="col-filed project-info">
                    <div class="info-title">项目信息</div>
                    <template v-if="dialogDetail.purchaseOrder">
                        <p>
                            项目： {{ dialogDetail.purchaseOrder.projectName }}
                        </p>
                        <p>
                            经销商： {{ dialogDetail.purchaseOrder.companyName }}
                        </p>
                    </template>
                    <template v-if="dialogStatus.enter.status === openStatus">
                        <div class="info-title">相关合同</div>
                        <table class="contracts-table">
                            <tr>
                                <th>合同</th>
                                <th>合同类型</th>
                            </tr>
                            <tr :key="item.id"
                                v-for="item in dialogDetail.contracts">
                                <td>
                                    <span class="go-contract" @click="goContractDetail(item.contractId)">
                                        {{ item.contractName || '-' }}
                                    </span>
                                </td>
                                <td>{{
                                        item.contractTypeId | attributeComputed(purchaseOrderDict.contractType.list)
                                    }}
                                </td>
                            </tr>
                        </table>
                    </template>
                    <!--采购单变更和查看变更 变更合同模板一样-->
                    <template v-if="dialogStatus.enter.status !== openStatus">
                        <div class="info-title">变更的合同</div>
                        <table>
                            <tr>
                                <th>新合同</th>
                                <th>变更类型</th>
                                <th>合同类型</th>
                                <th>原合同</th>
                            </tr>
                            <tr :key="item.id" v-for="item in dialogDetail.poChangeContracts">
                                <td>
                                    <span class="go-contract" @click="goContractDetail(item.changedContractId)">{{item.changedContractName}}</span>
                                </td>
                                <td>{{ item.status | attributeComputed(purchaseOrderDict.changedContract.list) }}</td>
                                <td>{{ item.contractTypeId | attributeComputed(purchaseOrderDict.contractType.list) }}</td>
                                <td>
                                    <span class="go-contract"  @click="goContractDetail(item.originalContractId)" v-if="item.originalContractId">{{item.originalContractName}}</span>
                                    <span v-else>/</span>
                                </td>
                            </tr>
                        </table>
                    </template>
                </div>
            </div>
            <div class="row-filed result">
                <div class="col-filed" v-if="dialogDetail.purchaseOrder">
                    <div class="info-title">
                        <template v-if="dialogStatus.enter.status === openStatus">签约结果</template>
                        <template v-else>变更结果</template>
                    </div>
                    <!--采购单变更和采购单确认变更 变更结果模板一样-->
                    <el-form ref="form" :model="formData" v-if="dialogStatus.watch.status !== openStatus" :rules="rules"
                             label-width="120px">
                        <template v-if="dialogStatus.enter.status === this.openStatus">
                            <el-form-item label="签约结果：" prop="signResult">
                                <el-radio-group v-model="formData.signResult">
                                    <el-radio :label="item.key" :key="item.key"
                                              v-for="item in purchaseOrderDict.signResult.list">{{ item.value }}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </template>
                        <template v-if="dialogStatus.changeEnter.status === this.openStatus">
                            <el-form-item label="变更结果：" prop="signResult">
                                <el-radio-group v-model="formData.signResult">
                                    <el-radio :label="item.key" :key="item.key"
                                              v-for="item in purchaseOrderDict.changeResultDialog.list">{{ item.value }}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </template>
                        <el-form-item label="驳回原因："
                                      v-if="formData.signResult === purchaseOrderDict.changeResult.list[1].key"
                                      prop="remark">
                            <el-input type="textarea" v-model="formData.remark" maxlength="200" class="remark"
                                      :rows="5"></el-input>
                        </el-form-item>
                        <el-form-item label="免息方式："
                                      v-if="formData.signResult === purchaseOrderDict.changeResult.list[0].key"
                                      prop="freeInterestType">
                            <el-radio-group v-model="formData.freeInterestType">
                                <el-radio :label="item.key" :key="item.key"
                                          v-for="item in purchaseOrderDict.freeInterestType.list">{{ item.value }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <template v-if="dialogStatus.watch.status === openStatus">
                        <p>
                            变更结果：
                            {{ dialogDetail.poChange.changeResult | attributeComputed(purchaseOrderDict.changeResult.list)}}
                        </p>
                        <p v-if="dialogDetail.poChange.changeResult === purchaseOrderDict.changeResult.list[0].key">免息方式：{{ dialogDetail.poChange.freeInterestType | attributeComputed(purchaseOrderDict.freeInterestType.list) }}</p>
                        <p v-if="dialogDetail.poChange.changeResult === purchaseOrderDict.changeResult.list[1].key">驳回原因：{{ dialogDetail.poChange.remark }}</p>
                    </template>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer" v-if="dialogStatus.watch.status !== openStatus">
                <h-button @click="onClose">取消</h-button>
                <h-button type="primary" @click="onEnter">确定</h-button>
            </span>
    </el-dialog>
</div>

</template>

<script>
import PurchaseOrderDialogStatus from '../dialogStatus'
import {
    updatePurchaseOrderChangeConfirmStatus,
    updatePurchaseOrderConfirmStatus,
    getPurchaseOrderConfirmDetail,
    getPurchaseOrderConfirmChangeDetail, getPurchaseOrderSeeDetail
} from '@/views/crm/purchaseOrder/api'
import PurchaseOrderDict from '../purchaseOrderDict'
import filters from '@/utils/filters'
import { mapState } from 'vuex'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'
import imageAddToken from '@/components/imageAddToken'
export default {
    name: 'purchaseOrderChangeDialog',
    components: {
        imageAddToken
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        openStatus: {
            type: Number,
            required: true
        },
        dialogParams: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            dialogStatus: PurchaseOrderDialogStatus,
            PaymentOrderDict,
            purchaseOrderDict: PurchaseOrderDict,
            dialogDetail: {},
            formData: {
                signResult: '',
                freeInterestType: '',
                remark: ''
            },
            rules: {
                signResult: [
                    { required: true, message: '请选择签约结果', trigger: 'change' }
                ],
                freeInterestType: [
                    { required: true, message: '请选择免息方式', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请输入驳回原因', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        title () {
            let title = ''
            if (this.openStatus === PurchaseOrderDialogStatus.enter.status) {
                title = PurchaseOrderDialogStatus.enter.title
            }
            if (this.openStatus === PurchaseOrderDialogStatus.changeEnter.status) {
                title = PurchaseOrderDialogStatus.changeEnter.title
            }
            if (this.openStatus === PurchaseOrderDialogStatus.watch.status) {
                title = PurchaseOrderDialogStatus.watch.title
            }
            return title
        },
        ...mapState({
            userinfo: state => state.userInfo
        })
    },
    methods: {
        goContractDetail (id) {
            let routeUrl = this.$router.resolve({
                path: '/goodwork/contractSigningManagementDetail',
                query: {
                    id: id
                }
            })
            window.open(routeUrl.href, '_blank')
        },
        goDetail (url) {
            window.open(url)
        },
        fundMoneys (val) {
            if (val) {
                return filters.money(val)
            }
            return '-'
        },
        onEnter () {
            this.$refs.form.validate(async (value, rules) => {
                if (value) {
                    const params = {
                        poId: this.dialogParams.id,
                        updateBy: this.userinfo.employeeName,
                        updatePhone: this.userinfo.phoneNumber,
                        ...this.formData
                    }
                    // if (this.dialogDetail.poInfo && params.freeInterestType > this.dialogDetail.poInfo.restPaymentPeriod) {
                    //     this.$message.error('免息周期不能超过剩余货款支付周期')
                    //     return
                    // }
                    let message = ''
                    if (PurchaseOrderDialogStatus.enter.status === this.openStatus) {
                        await updatePurchaseOrderConfirmStatus(params)
                        message = '采购单确认成功'
                    }
                    if (PurchaseOrderDialogStatus.changeEnter.status === this.openStatus) {
                        await updatePurchaseOrderChangeConfirmStatus(params)
                        message = '采购单确认变更成功'
                    }
                    this.$message.success(message)
                    this.onClose()
                    this.$emit('closeDrawer')
                } else {
                    this.$nextTick(() => {
                        const dom = document.querySelector('.is-error')
                        const _dom = dom.querySelector('input') || dom.querySelector('textarea')
                        _dom.focus()
                    })
                }
            })
        },
        checkedIsJson (string) {
            try {
                return JSON.parse(string)
            } catch (e) {
                return string
            }
        },
        onClose () {
            this.formData = {
                signResult: '',
                freeInterestType: '',
                remark: ''
            }
            this.$emit('backEvent')
        }
    },
    watch: {
        async isOpen (val) {
            if (val) {
                let _data = {}
                if (PurchaseOrderDialogStatus.enter.status === this.openStatus) {
                    const { data } = await getPurchaseOrderConfirmDetail(this.dialogParams.id)
                    _data = data
                }
                if (PurchaseOrderDialogStatus.changeEnter.status === this.openStatus) {
                    const { data } = await getPurchaseOrderConfirmChangeDetail(this.dialogParams.id)
                    _data = data
                }
                if (PurchaseOrderDialogStatus.watch.status === this.openStatus) {
                    const { data } = await getPurchaseOrderSeeDetail(this.dialogParams.id)
                    _data = data
                }
                _data.contracts && _data.contracts.sort((value1, value2) => value1.contractTypeId - value2.contractTypeId)
                this.dialogDetail = _data
                if (this.dialogStatus.changeEnter.status === this.openStatus) {
                    this.rules.signResult[0].message = '请选择变更结果'
                } else if (this.dialogStatus.enter.status === this.openStatus) {
                    this.rules.signResult[0].message = '请选择签约结果'
                }
                this.$nextTick(() => {
                    this.$refs.form && this.$refs.form.clearValidate()
                })
            }
        },
        'formData.signResult' () {
            this.formData.remark = ''
            if (this.formData.signResult && PurchaseOrderDialogStatus.changeEnter.status === this.openStatus) {
                this.$set(this.formData, 'freeInterestType', this.dialogDetail.purchaseOrder.freeInterestType)
            } else {
                this.formData.freeInterestType = ''
            }

            this.$nextTick(() => {
                this.$refs.form && this.$refs.form.clearValidate()
            })
        }
    }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog__body {
    max-height: 480px;
    padding: 0 20px 20px;
    overflow-x: hidden;
    overflow-y: scroll;
}

.info-content {
    .row-filed {
        display: flex;

        .col-filed.left {
            width: 50%;
            box-sizing: content-box;
            padding-right: 20px;
        }

        .info-title {
            font-size: 14px;
            font-weight: 600;
            color: #FF7A45;
            padding: 12px 0;
        }
        .see-change {
            th:nth-child(1){
                width: 50px;
            }
        }
    }

    .purchase-order-info {
        line-height: 20px;

        li {
            padding: 6px 0;
            display: flex;

            .label {
                flex: 0 0 140px;
                text-align: right;
                padding-right: 10px;
                box-sizing: border-box;
            }

            span:last-child {
                padding-right: 10px;
                text-align: justify;
            }
        }
    }

    .result {
        p {
            line-height: 30px;
            padding: 5px 0;
        }

        /deep/ .el-radio ::after {
            transition: none !important;
        }
    }

    .project-info {
        width: 50%;

        p {
            line-height: 18px;
            padding: 5px 0;
        }
    }

    table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;

        th {
            border: 1px solid #EBEEF5;
            background: #f2f2f4;
            padding: 5px;
        }
        th:nth-child(2){
            width: 80px;
        }
        th:nth-child(3){
            width: 80px;
        }

        td {
            border: 1px solid #EBEEF5;
            padding: 5px;
        }
    }

    .info-img {
        width: 80px;
        height: 80px;
        cursor: pointer;
    }

    .contracts-table {
        th {
            width: 50%;
        }

        td {
            padding: 8px;
            font-size: 12px;
        }
    }
}

.remark {
    width: 350px;
}
.go-contract {
    color: #ff7a45;
    cursor: pointer;
}
.info-img-group {
    display: flex;
    .content {
        display: flex;
        flex-wrap: wrap;
        span {
            display: flex;
            width: 80px;
            height: 80px;
            margin-bottom: 12px;
            margin-right: 12px;
            cursor: pointer;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;
        }
        img {
            display: block;
            margin: auto;
            max-height: 78px;
            max-width: 78px;
        }
    }
    .label {
        flex: 0 0 100px;
    }
}
.change-tips {
    text-align: center;
    font-size: 12px;
    color: #333333;
    line-height: 20px;
    padding: 12px;
    border: 1px solid #EBEEF5;
}
</style>
