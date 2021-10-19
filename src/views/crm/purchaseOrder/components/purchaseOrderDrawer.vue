<template>
    <div class="drawer-wrap">
        <!-- <el-drawer title="采购单详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='65%'
                   :before-close="handleClose" :wrapperClosable=false> -->
        <h-drawer title="采购单详情" :visible.sync="drawer" direction='rtl' size='65%' :wrapperClosable="false" :beforeClose="handleClose">
            <template #connect>
                <div class="drawer-content">
                    <div class="info-content">
                        <div class="row-filed">
                            <p class="col-filed">
                                经销商: {{ purchaseOrderDetail.purchaseOrder.companyName }}
                            </p>
                            <p class="col-filed">
                                项目编号: {{ purchaseOrderDetail.purchaseOrder.projectNo }}
                            </p>
                        </div>
                        <div class="row-filed">
                            <p class="col-filed">
                                <span class="info-title">采购单</span>
                                <span class="info-status">
                                    {{
                                    purchaseOrderDetail.purchaseOrder.status | attributeComputed(PurchaseOrderDict.status.list)
                                }}
                                </span>
                            </p>
                        </div>
                        <div class="row-filed">
                            <p class="col-filed">
                                采购单名称: {{ purchaseOrderDetail.purchaseOrder.poName }}
                            </p>
                            <p class="col-filed">
                                采购单编号: {{ purchaseOrderDetail.purchaseOrder.purchaseOrderNo }}
                            </p>
                        </div>
                        <div class="row-filed">
                            <p class="col-filed">
                                创建人:
                                {{ `${purchaseOrderDetail.purchaseOrder.createBy}（${purchaseOrderDetail.purchaseOrder.createPhone}）` }}
                            </p>
                            <p class="col-filed">
                                创建时间: {{ purchaseOrderDetail.purchaseOrder.createTime | momentFormat }}
                            </p>
                        </div>
                        <div class="row-filed">
                            <div class="col-filed info-img-group">
                                <span class="label">网银盾照片： </span>
                                <div class="content" v-if="purchaseOrderDetail.onlineBankingShields && purchaseOrderDetail.onlineBankingShields.length > 0">
                                    <p class="img-box" :key="item.fileUrl" v-for="item in purchaseOrderDetail.onlineBankingShields">
                                          <ImageAddToken :fileUrl="item.fileUrl" alt="" />
                                    </p>
                                </div>
                                <p v-else>-</p>
                            </div>
                            <div class="col-filed info-img-group">
                                <span class="label">共管户截图： </span>
                                <div class="content" v-if="purchaseOrderDetail.screenshots && purchaseOrderDetail.screenshots.length > 0">
                                    <p class="img-box" :key="item.fileUrl" v-for="item in purchaseOrderDetail.screenshots">
                                          <ImageAddToken :fileUrl="item.fileUrl" alt="" />
                                    </p>
                                </div>
                                <p v-else>-</p>
                            </div>
                        </div>

                        <template v-if="purchaseOrderDetail.purchaseOrder.status !== PurchaseOrderDict.status.list[0].key">
                            <div class="row-filed">
                                <p class="col-filed">
                                    提交人：{{ `${purchaseOrderDetail.purchaseOrder.submitBy}（${purchaseOrderDetail.purchaseOrder.submitPhone}）` }}
                                </p>
                                <p class="col-filed">
                                    提交时间：{{ purchaseOrderDetail.purchaseOrder.submitTime | momentFormat }}
                                </p>
                            </div>
                            <template v-if="purchaseOrderDetail.purchaseOrder && purchaseOrderDetail.purchaseOrder.status !== PurchaseOrderDict.status.list[1].key">
                                <div class="row-filed">
                                    <p class="col-filed">
                                        采购单金额： {{ purchaseOrderDetail.purchaseOrder.poAmount | fundMoneyHasTail }}元
                                    </p>
                                    <template v-if="purchaseOrderDetail.poInfo">
                                        <p class="col-filed">
                                            经销商预付款比例： {{ purchaseOrderDetail.poInfo.prePercent }}%
                                        </p>
                                        <p class="col-filed">
                                            剩余货款支付周期： {{ purchaseOrderDetail.poInfo.restPaymentPeriod }}个月
                                        </p>
                                    </template>
                                </div>
                                <div class="row-filed" v-if="purchaseOrderDetail.poInfo">
                                    <div class="col-filed info-img-group">
                                        <span class="label">
                                            采购明细表：
                                        </span>
                                        <p class="content" v-if="purchaseOrderDetail.poInfo && purchaseOrderDetail.poInfo.poDetail">
                                            <span class="img-box" :key="item.url" v-for="item in purchaseOrderDetail.poInfo.poDetail">
                                                <img :src="item.url" alt="" @click="goDetail(item.url)">
                                            </span>
                                        </p>

                                    </div>
                                </div>
                                <template v-if="purchaseOrderDetail.poInfo">
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            采购批次： {{ purchaseOrderDetail.poInfo.poNumber | attributeComputed(PaymentOrderDict.applyType.list) }}
                                        </p>
                                        <p class="col-filed">
                                            最迟发货日期： {{ purchaseOrderDetail.poInfo.lastGoodsDate }}
                                        </p>
                                    </div>
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            收货地址：
                                            {{ purchaseOrderDetail.poInfo.goodsAddress }}
                                        </p>
                                    </div>
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            监管户户名：
                                            {{ purchaseOrderDetail.poInfo.regulatorAccountName }}
                                        </p>
                                        <p class="col-filed">
                                            收款账户户名：
                                            {{ purchaseOrderDetail.poInfo.receiverAccountName }}
                                        </p>
                                    </div>
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            监管户银行账号：
                                            {{ purchaseOrderDetail.poInfo.regulatorAccountNo }}
                                        </p>
                                        <p class="col-filed">
                                            收款账户银行账号：
                                            {{ purchaseOrderDetail.poInfo.receiverAccountNo }}
                                        </p>
                                    </div>
                                    <div class="row-filed">
                                        <p class="col-filed">
                                            监管户开户行：
                                            {{ purchaseOrderDetail.poInfo.regulatorAccountBank }}
                                        </p>
                                        <p class="col-filed">
                                            收款账户开户行：
                                            {{ purchaseOrderDetail.poInfo.receiverAccountBank }}
                                        </p>
                                    </div>
                                </template>
                                <div class="row-filed">
                                    <p class="col-filed">
                                        免息方式：
                                        {{ purchaseOrderDetail.purchaseOrder.freeInterestType | attributeComputed(PurchaseOrderDict.freeInterestType.list) }}
                                    </p>
                                </div>
                                <div class="row-filed">
                                    <p class="col-filed">
                                        更新时间：{{ purchaseOrderDetail.purchaseOrder.updateTime | momentFormat }}
                                    </p>
                                    <p class="col-filed">
                                        更新人：{{ purchaseOrderDetail.purchaseOrder.updateBy }}（{{ purchaseOrderDetail.purchaseOrder.updatePhone }}）
                                    </p>
                                </div>
                            </template>
                            <!--                多种状态判断-->
                            <template v-if="purchaseOrderDetail.poChanges">
                                <div class="row-filed" :key="item.id" v-for="item in purchaseOrderDetail.poChanges">
                                    <div class="jumbotron">
                                        <div class="jumbotron-status">
                                            <img src="../../../../assets/images/good-job-status-icon.png" alt="">
                                        </div>
                                        <div>
                                            <p class="jumbotron-title">采购单变更：{{ item.changeResult | attributeComputed(PurchaseOrderDict.changeResult.list) }}！</p>
                                            <p>
                                                提交变更人：{{ item.submitBy }}（{{ item.submitPhone }}） 提交变更时间：{{
                                                item.submitTime | momentFormat
                                            }}
                                            </p>
                                            <p>
                                                变更备注：{{ item.changeReason || '-' }}
                                            </p>
                                            <p v-if="item.changeResult === PurchaseOrderDict.changeResult.list[0].key">
                                                确认变更人：{{ item.updateBy }}（{{ item.updatePhone }}） 确认变更时间：{{item.updateTime | momentFormat}} 免息方式：{{ item.freeInterestType | attributeComputed(PurchaseOrderDict.freeInterestType.list)}}
                                            </p>
                                            <p v-if="item.changeResult === PurchaseOrderDict.changeResult.list[1].key">
                                                驳回变更人：{{ item.updateBy }}（{{ item.updatePhone }}） 驳回变更时间：{{item.updateTime | momentFormat}}
                                            </p>
                                            <p v-if="item.changeResult === PurchaseOrderDict.changeResult.list[1].key">
                                                驳回原因：{{item.remark || '-'}}
                                            </p>
                                            <!-- <p v-if="item.changeResult !== PurchaseOrderDict.changeResult.list[0].key &&
                                                        item.changeResult !== PurchaseOrderDict.changeResult.list[1].key">
                                                <h-button table @click="purchaseOrderChangeConfirm">确认变更</h-button>
                                            </p> -->
                                            <p v-else>
                                                <h-button table @click="purchaseOrderWatchConfirm(item.id)">查看变更</h-button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                    <div class="info-content">
                        <div class="info-title info-title-main-color">合同</div>
                        <div class="table-header">
                            <div class="th">合同编号</div>
                            <div class="th">合同名称</div>
                            <div class="th"></div>
                            <div class="th">合同状态</div>
                            <div class="th">签约完成时间</div>
                            <div class="th">发起人</div>
                            <div class="th">操作</div>
                        </div>
                        <el-collapse v-model="activeNames">
                            <el-collapse-item title="销售合同" name="1">
                                <div class="table-body">
                                    <PureCollapseTr :contracts="purchaseOrderDetail.contracts.filter(value => value.contractTypeId === PurchaseOrderDict.contractType.list[3].key)"></PureCollapseTr>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="采购合同" name="2">
                                <div class="table-body">
                                    <PureCollapseTr :contracts="purchaseOrderDetail.contracts.filter(value => value.contractTypeId === PurchaseOrderDict.contractType.list[4].key)"></PureCollapseTr>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="担保合同" name="3">
                                <div class="table-body">
                                    <PureCollapseTr :contracts="purchaseOrderDetail.contracts.filter(value => value.contractTypeId === PurchaseOrderDict.contractType.list[1].key)"></PureCollapseTr>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="应收账款质押合同" name="4">
                                <div class="table-body">
                                    <PureCollapseTr :contracts="purchaseOrderDetail.contracts.filter(value => value.contractTypeId === PurchaseOrderDict.contractType.list[2].key)"></PureCollapseTr>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="其他合同" name="5">
                                <div class="table-body">
                                    <PureCollapseTr :contracts="purchaseOrderDetail.contracts.filter(value => value.contractTypeId === PurchaseOrderDict.contractType.list[0].key)"></PureCollapseTr>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                        <template v-if="purchaseOrderDetail.purchaseOrder.status > PurchaseOrderDict.status.list[1].key">
                            <div class="info-title info-title-main-color">支付单</div>
                            <div class="payment-table">
                                <basicTable :tableData="purchaseOrderDetail.payOrderDetails" :tableLabel="tableLabel" :isMultiple="false" :isAction="false" :isShowIndex='true'>
                                    <template slot="paymentOrderNo" slot-scope="scope">
                                        <span class="link-cell" @click="goPaymentDetail(scope.data.row.paymentOrderNo)">{{ scope.data.row.paymentOrderNo }}</span>
                                    </template>
                                    <template slot="status" slot-scope="scope">
                                        <span>{{ scope.data.row.status | attributeComputed(PaymentOrderDict.status.list) }}</span>
                                    </template>
                                    <template slot="applyAmount" slot-scope="scope">
                                        <span>{{ scope.data.row.applyAmount | fundMoneyHasTail }}</span>
                                    </template>
                                </basicTable>
                            </div>
                        </template>
                    </div>

                    <div class="drawer-footer">
                        <div class="drawer-button">
                            <!-- <h-button type="assist" @click="purchaseOrderConfirm" v-if="purchaseOrderDetail.purchaseOrder.status === PurchaseOrderDict.status.list[1].key">
                                确认采购单
                            </h-button> -->
                            <!--                        <h-button type="primary">审核通过</h-button>-->
                            <h-button type="default" @click="handleClose">取消</h-button>
                        </div>
                    </div>
                </div>
            </template>
            <template #btn>
                <h-button @click="drawer=false">取 消</h-button>
            </template>
        </h-drawer>
    </div>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'
import PaymentOrderDict from '@/views/crm/paymentOrder/paymentOrderDict'
import PureCollapseTr from '@/views/crm/purchaseOrder/components/pureCollapseTr'
import PurchaseOrderDialogStatus from '@/views/crm/purchaseOrder/dialogStatus'
import ImageAddToken from '@/components/imageAddToken'
export default {
    name: 'purchaseOrderDrawer',
    props: {
        drawer: {
            type: Boolean,
            default: false
        },
        row: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            options: {
                direction: 'rtl',
                size: '40%',
                wrapperClosable: false
            },
            activeNames: ['1', '2', '3', '4', '5'],
            tableLabel: [
                { label: '支付单编号', prop: 'paymentOrderNo' },
                { label: '金额', prop: 'applyAmount', align: 'right' },
                { label: '状态', prop: 'status' },
                { label: '申请时间', prop: 'applyDate', formatters: 'dateTime', width: '150' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTime' }
            ],
            PurchaseOrderDict,
            PaymentOrderDict
        }
    },
    components: { PureCollapseTr, ImageAddToken },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            purchaseOrderDetail: 'crmPurchaseOrder/purchaseOrderDetail'
        })
    },
    methods: {
        ...mapActions({
            findPurchaseOrderDetail: 'crmPurchaseOrder/findPurchaseOrderDetail'
        }),
        purchaseOrderConfirm () {
            this.$emit('openDialog', PurchaseOrderDialogStatus.enter.status, this.row)
        },
        purchaseOrderChangeConfirm () {
            this.$emit('openDialog', PurchaseOrderDialogStatus.changeEnter.status, this.row)
        },
        purchaseOrderWatchConfirm (id) {
            this.$emit('openDialog', PurchaseOrderDialogStatus.watch.status, { id: id })
        },
        handleClose () {
            this.$emit('backEvent')
        },
        goDetail (url) {
            window.open(url)
            //
        },
        goPaymentDetail (id) {
            let routeUrl = this.$router.resolve({
                path: '/goodwork/paymentOrder',
                query: {
                    id: id
                }
            })
            window.open(routeUrl.href, '_blank')
        }
    },
    watch: {
        drawer (value) {
            if (value) {
                this.findPurchaseOrderDetail(this.row.id)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.info-content {
    padding: 0 20px;

    .row-filed {
        display: flex;
        padding: 10px;

        .col-filed {
            display: flex;
            align-items: center;
            padding-right: 30px;
            font-size: 14px;
            color: #333333;
            font-weight: 400;
            cursor: default;
            line-height: 15px;
            width: 100%;
        }
    }

    .info-title {
        font-size: 15px;
        color: #000000;
        font-weight: 600;
        padding-right: 20px;
        line-height: 30px;
    }

    .info-status {
        background: #ff7a45;
        font-size: 12px;
        color: #ffffff;
        padding: 4px 14px;
        border-radius: 4px;
    }

    .info-title-main-color {
        color: #ff7a45;
        line-height: 30px;
        padding: 15px 0;
    }

    .jumbotron {
        width: 100%;
        background: #fffbe6;
        border: 1px solid #ffe58f;
        border-radius: 12px;
        padding: 12px;
        font-size: 14px;
        display: flex;
        margin-bottom: 20px;

        .jumbotron-status {
            padding: 0 15px;
        }

        .jumbotron-status img {
            width: 30px;
        }

        .jumbotron-title {
            font-size: 16px;
            font-weight: 400;
            padding: 8px 0 10px;
        }

        p {
            padding: 6px 0;
            line-height: 16px;
        }
    }

    .table-header {
        display: flex;
        height: 54px;
        font-weight: 600;
        font-size: 12px;
        color: #000000;
        background: #fafafa;

        div {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        > :nth-child(1) {
            width: 15%;
        }

        > :nth-child(2) {
            width: 15%;
        }

        > :nth-child(3) {
            width: 10%;
        }

        > :nth-child(4) {
            width: 10%;
        }

        > :nth-child(5) {
            width: 15%;
        }

        > :nth-child(6) {
            width: 10%;
        }

        > :nth-child(7) {
            width: 25%;
        }
    }
    .info-img-group {
        display: flex;
        .content {
            display: flex;
            flex-wrap: wrap;
            .img-box {
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
}

/deep/ .el-drawer__body {
    overflow-y: scroll;
}

.drawer-content {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 100px;

    .drawer-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px 24px;
        border-top: 1px solid #e5e5ea;
        background: #fff;
        z-index: 1000;

        button {
            flex: 1;
        }

        .drawer-button {
            text-align: right;
        }
    }
}

/deep/ .el-tabs__nav-scroll {
    padding-left: 20px;
}

/deep/ .el-drawer__header {
    padding: 20px 20px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
    font-size: 16px;
}

/deep/ .el-collapse-item__header {
    font-weight: 600;
    color: #000000;
    font-size: 14px;
}
.payment-table {
    padding-bottom: 100px;
}
</style>
