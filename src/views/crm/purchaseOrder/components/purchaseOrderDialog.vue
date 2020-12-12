<template>
    <el-dialog :title="title" :visible.sync="isOpen" width="800px" :before-close="()=> $emit('backEvent')" :close-on-click-modal="false">
        <div class="info-content">
            <div class="row-filed">
                <div class="col-filed left" v-if="dialogDetail.poInfo && dialogStatus.enter.status === openStatus">
                    <div class="info-title">采购单信息</div>
                    <ul class="purchase-order-info">
                        <li>
                            <span class="label">采购单金额：</span>
                            <span>{{fundMoneys(dialogDetail.poInfo.poAmount)}}元</span>
                        </li>
                        <li>
                            <span class="label">采购明细表：</span>
                            <template v-if="dialogDetail.poInfo && dialogDetail.poInfo.poDetail">
                                <img :src="item.url" class="info-img" :key="item.url" alt="" @click="goDetail(item.url)"
                                     v-for="item in JSON.parse(dialogDetail.poInfo.poDetail)">
                            </template>
                        </li>
                        <li>
                            <span class="label">采购批次：</span>
                            <span>{{ dialogDetail.poInfo.poNumber || '-' }}</span>
                        </li>
                        <li>
                            <span class="label">经销商预付款比例： </span>
                            <span>{{ dialogDetail.poInfo.prePercent || '-' }}%</span>
                        </li>
                        <li>
                            <span class="label">剩余货款支付周期： </span>
                            <span>{{ dialogDetail.poInfo.restPaymentPeriod || '-'  }}</span>
                        </li>
                        <li>
                            <span class="label">最迟发货日期：</span>
                            <span>{{ dialogDetail.poInfo.lastGoodsDate || '-'  }}</span>
                        </li>
                        <li>
                            <span class="label">收货地址：</span>
                            <span>{{ dialogDetail.poInfo.goodsAddress || '-'  }}</span>
                        </li>
                        <li>
                            <span class="label">监管账户户名： </span>
                            <span>{{ dialogDetail.poInfo.regulatorAccountName || '-'  }}</span>
                        </li>
                        <li>
                            <span class="label">监管账户银行账号：</span>
                            <span>{{ dialogDetail.poInfo.regulatorAccountNo || '-'  }}</span>
                        </li>
                        <li>
                            <span class="label">监管账户开户行： </span>
                            <span>{{ dialogDetail.poInfo.regulatorAccountBank || '-'  }}</span>
                        </li>
                        <li>
                            <span class="label">收款账户户名：</span>
                            <span>{{ dialogDetail.poInfo.receiverAccountName || '-'  }}</span>
                        </li>
                        <li>
                            <span class="label">收款账户银行账号： </span>
                            <span>{{ dialogDetail.poInfo.receiverAccountNo || '-'  }}</span>
                        </li>
                        <li>
                            <span class="label">收款账户开户行：</span>
                            <span>{{dialogDetail.poInfo.receiverAccountBank || '-'  }}</span>
                        </li>
                    </ul>
                </div>
                <div class="col-filed left" v-if="dialogStatus.enter.status !== openStatus">
                    <div class="info-title">变更的内容</div>
                    <table>
                        <tr>
                            <th>变更字段</th>
                            <th>变更前</th>
                            <th>变更后</th>
                        </tr>
                        <tr :key="item.id" v-for="item in dialogDetail.poChangeFields">
                            <td>{{ item.fieldName || '-'  }}</td>
                            <td>{{ item.originalValue || '-'  }}</td>
                            <td>{{ item.changedValue || '-'  }}</td>
                        </tr>
                    </table>
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
                            <tr :key="item.id" v-for="item in dialogDetail.contracts">
                                <td>{{ item.contractName || '-'  }}</td>
                                <td>{{ item.contractTypeId || '-'  }}</td>
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
                                <td>{{ item.contractTypeId }}</td>
                                <td>{{ item.status }}</td>
                                <td>{{ item.contractTypeId }}</td>
                                <td>{{ item.originalContractId }}</td>
                            </tr>
                        </table>
                    </template>
                </div>
            </div>
            <div class="row-filed result">
                <div class="col-filed">
                    <div class="info-title">变更结果</div>
                    <!--采购单变更和采购单确认变更 变更结果模板一样-->
                    <template v-if="dialogStatus.watch.status !== openStatus">
                        <p>
                            变更结果：
                            <el-radio-group v-model="resultRadioGroup">
                                <el-radio :label="item.key" :key="item.key"
                                          v-for="item in purchaseOrderDict.changeResult.list">{{ item.value }}
                                </el-radio>
                            </el-radio-group>
                        </p>
                        <p>
                            {{purchaseOrderDict.changeResult.remark}}
                        </p>
                        <p>
                            免息方式：
                            <el-radio-group v-model="InterestFreeRadioGroup">
                                <el-radio :label="item.key" :key="item.key"
                                          v-for="item in purchaseOrderDict.freeInterestType.list">{{ item.value }}
                                </el-radio>
                            </el-radio-group>
                        </p>
                    </template>
                    <template v-if="dialogStatus.watch.status === openStatus">
                        <p>变更结果：已驳回</p>
                        <p>驳回原因：这里显示驳回的原因</p>
                    </template>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer" v-if="dialogStatus.watch.status !== openStatus">
                <h-button @click="$emit('backEvent')">取消</h-button>
                <h-button type="primary" @click="onEnter">确定</h-button>
            </span>
    </el-dialog>
</template>

<script>
import PurchaseOrderDialogStatus from '../dialogStatus'
import { updatePurchaseOrderChangeConfirmStatus, updatePurchaseOrderConfirmStatus, getPurchaseOrderConfirmDetail, getPurchaseOrderConfirmChangeDetail } from '@/views/crm/purchaseOrder/api'
import PurchaseOrderDict from '../purchaseOrderDict'
import filters from '@/utils/filters'
import { mapState } from 'vuex'

export default {
    name: 'purchaseOrderChangeDialog',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        openStatus: {
            type: Number,
            required: true
        },
        row: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            resultRadioGroup: [],
            InterestFreeRadioGroup: [],
            dialogStatus: PurchaseOrderDialogStatus,
            purchaseOrderDict: PurchaseOrderDict,
            dialogDetail: {}
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
        goDetail (url) {
            window.open(url)
        },
        fundMoneys (val) {
            if (val) {
                return filters.money(val)
            }
            return '-'
        },
        async onEnter () {
            const params = {
                poId: this.row.id,
                signResult: this.resultRadioGroup,
                updateBy: this.userinfo.employeeName,
                updatePhone: this.userinfo.phoneNumber,
                remark: 'remark',
                freeInterestType: this.InterestFreeRadioGroup
            }
            if (PurchaseOrderDialogStatus.enter.status === this.openStatus) {
                await updatePurchaseOrderConfirmStatus(params)
            }
            if (PurchaseOrderDialogStatus.changeEnter.status === this.openStatus) {
                await updatePurchaseOrderChangeConfirmStatus(params)
            }
            this.$emit('backEvent')
        }
    },
    watch: {
        async isOpen (val) {
            if (val) {
                if (PurchaseOrderDialogStatus.enter.status === this.openStatus) {
                    const { data } = await getPurchaseOrderConfirmDetail(this.row.id)
                    this.dialogDetail = data
                }
                if (PurchaseOrderDialogStatus.changeEnter.status === this.openStatus) {
                    const { data } = await getPurchaseOrderConfirmDetail(this.row.id)
                    this.dialogDetail = data
                }
            }
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
            width: 60%;
            box-sizing: content-box;
            padding-right: 20px;
        }

        .info-title {
            font-size: 14px;
            font-weight: 600;
            color: #FF7A45;
            padding: 12px 0;
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
        width: 40%;

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

        td {
            border: 1px solid #EBEEF5;
            padding: 5px;
        }
    }
    .info-img {
        width: 80px;
        cursor: pointer;
    }
    .contracts-table {
        th{
            width: 50%;
        }
        td{
            padding: 8px;
            font-size: 12px;
        }
    }
}
</style>
