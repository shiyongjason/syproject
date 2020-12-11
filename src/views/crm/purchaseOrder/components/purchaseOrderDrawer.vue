<template>
    <div class="drawer-wrap">
        <el-drawer title="采购单详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%'
                   :before-close="handleClose" :wrapperClosable=false>
            <div class="drawer-content">
                <div class="info-content">
                    <div class="row-filed">
                        <p class="col-filed">
                            经销商: {{ purchaseOrderDetail.purchaseOrder.companyName }}
                        </p>
                        <p class="col-filed">
                            项目编号: {{ purchaseOrderDetail.purchaseOrder.purchaseOrderNo }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="info-title">采购单</span>
                            <span class="info-status">
                                {{
                                    attributeComputed(PurchaseOrderDict.status.list, purchaseOrderDetail.purchaseOrder.status)
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
                            {{ `${purchaseOrderDetail.purchaseOrder.createBy}（${purchaseOrderDetail.purchaseOrder.createMobile}）` }}
                        </p>
                        <p class="col-filed">
                            创建时间: {{ purchaseOrderDetail.purchaseOrder.createTime | formatDate }}
                        </p>
                    </div>
                    <!--                多种状态判断 -->
                    <template v-if="purchaseOrderDetail.purchaseOrder.status > PurchaseOrderDict.status.list[0].key">
                        <template
                            v-if="purchaseOrderDetail.purchaseOrder.status > PurchaseOrderDict.status.list[1].key">
                            <div class="row-filed">
                                <p class="col-filed">
                                    提交人：{{ `${purchaseOrderDetail.purchaseOrder.submitBy}（${purchaseOrderDetail.purchaseOrder.submitMobile}）` }}
                                </p>
                                <p class="col-filed">
                                    提交时间：{{ purchaseOrderDetail.purchaseOrder.submitTime | formatDate }}
                                </p>
                            </div>
                        </template>
                        <template
                            v-if="purchaseOrderDetail.purchaseOrder && purchaseOrderDetail.purchaseOrder.status > PurchaseOrderDict.status.list[2].key">
                            <div class="row-filed">
                                <p class="col-filed">
                                    采购单金额： {{ fundMoneys(purchaseOrderDetail.purchaseOrder.poAmount) }}元
                                </p>
                                <template v-if="purchaseOrderDetail.poInfo">
                                    <p class="col-filed">
                                        经销商预付款比例： {{ purchaseOrderDetail.poInfo.prePercent }}%
                                    </p>
                                    <p class="col-filed">
                                        剩余货款支付周期： {{ purchaseOrderDetail.poInfo.restPaymentPeriod }}月
                                    </p>
                                </template>
                            </div>
                            <div class="row-filed" v-if="purchaseOrderDetail.poInfo">
                                <p class="col-filed">
                                    采购明细表：
                                    <span class="img-group"
                                          v-if="purchaseOrderDetail.poInfo && purchaseOrderDetail.poInfo.poDetail">
                                        <img :src="item.url" :key="item.url" alt="" @click="goDetail(item.url)"
                                             v-for="item in JSON.parse(purchaseOrderDetail.poInfo.poDetail)">
                                    </span>
                                </p>
                            </div>
                            <template v-if="purchaseOrderDetail.poInfo">
                                <div class="row-filed">
                                    <p class="col-filed">
                                        采购批次： 一次性采购 {{ purchaseOrderDetail.poInfo.poNumber }}
                                    </p>
                                    <p class="col-filed">
                                        最迟发货日期： {{ purchaseOrderDetail.poInfo.lastestGoodsDate }}
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
                                        {{ purchaseOrderDetail.poInfo.receiverAccountBank }}
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
                                    {{ attributeComputed(PurchaseOrderDict.freeInterestType.list, purchaseOrderDetail.purchaseOrder.freeInterestType) }}
                                </p>
                            </div>
                            <div class="row-filed">
                                <p class="col-filed">
                                    更新时间：{{ purchaseOrderDetail.purchaseOrder.updateTime }}
                                </p>
                                <p class="col-filed">
                                    更新人：{{ purchaseOrderDetail.purchaseOrder.updateBy }}（{{ purchaseOrderDetail.purchaseOrder.updateBy }}）
                                </p>
                            </div>
                        </template>
                        <!--                多种状态判断-->
                        <template
                            v-if="purchaseOrderDetail.purchaseOrder.status > PurchaseOrderDict.status.list[3].key">
                            <div class="row-filed" v-if="purchaseOrderDetail.poChanges">
                                <div class="jumbotron" :key="item.id" v-for="item in purchaseOrderDetail.poChanges">
                                    <div class="jumbotron-status">
                                        <img src="../../../../assets/images/good-job-status-icon.png" alt="">
                                    </div>
                                    <div>
                                        <p class="jumbotron-title">订单变更：已确认！</p>
                                        <p>
                                            提交变更人：赵娟（15195954045） 提交变更时间：2019-06-11 16:32
                                        </p>
                                        <p>
                                            变更备注：{{ item.remark }}
                                        </p>
                                        <p>
                                            确认变更人：赵娟（15195954045） 确认变更时间：2019-06-11 16:32
                                        </p>
                                        <p>
                                            <h-button table @click="purchaseOrderChangeConfirm">查看变更</h-button>
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
                                <PureCollapseTr
                                    :contracts="purchaseOrderDetail.contracts.filter(value => value.contractTypeId === PurchaseOrderDict.contractType.list[3].key)"></PureCollapseTr>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="采购合同" name="2">
                            <div class="table-body">
                                <PureCollapseTr
                                    :contracts="purchaseOrderDetail.contracts.filter(value => value.contractTypeId === PurchaseOrderDict.contractType.list[4].key)"></PureCollapseTr>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="担保合同" name="3">
                            <div class="table-body">
                                <PureCollapseTr
                                    :contracts="purchaseOrderDetail.contracts.filter(value => value.contractTypeId === PurchaseOrderDict.contractType.list[1].key)"></PureCollapseTr>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="应收账款质押合同" name="4">
                            <div class="table-body">
                                <PureCollapseTr
                                    :contracts="purchaseOrderDetail.contracts.filter(value => value.contractTypeId === PurchaseOrderDict.contractType.list[2].key)"></PureCollapseTr>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="其他合同" name="5">
                            <div class="table-body">
                                <PureCollapseTr
                                    :contracts="purchaseOrderDetail.contracts.filter(value => value.contractTypeId === PurchaseOrderDict.contractType.list[0].key)"></PureCollapseTr>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <template v-if="purchaseOrderDetail.purchaseOrder.status > PurchaseOrderDict.status.list[2].key">
                        <div class="info-title info-title-main-color">支付单</div>
                        <basicTable :tableData="purchaseOrderDetail.payOrderDetails" :tableLabel="tableLabel" :isMultiple="false" :isAction="true"
                                    :actionMinWidth=100 :isShowIndex='true'>
<!--                            <template slot="No" slot-scope="scope">-->
<!--                                <span :class="scope.data.row.No?'colgry':'colred'">{{ scope.data.row.No }}</span>-->
<!--                            </template>-->
                        </basicTable>
                    </template>
                </div>
                <div class="drawer-footer">
                    <div class="drawer-button">
                        <h-button type="assist"
                                  @click="purchaseOrderConfirm"
                                  v-if="purchaseOrderDetail.purchaseOrder.status === PurchaseOrderDict.status.list[1].key">
                            确认采购单
                        </h-button>
                        <!--                        <h-button type="primary">审核通过</h-button>-->
                        <h-button type="default" @click="handleClose">取消</h-button>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'
import PureCollapseTr from '@/views/crm/purchaseOrder/components/pureCollapseTr'
import filters from '@/utils/filters'
import PurchaseOrderDialogStatus from '@/views/crm/purchaseOrder/dialogStatus'

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
            activeNames: ['1', '2', '3', '4', '5'],
            tableData: [],
            tableLabel: [
                { label: '支付单编号', prop: 'paymentOrderNo', width: '120' },
                { label: '金额', prop: 'applyAmount', width: '100' },
                { label: '状态', prop: 'status', width: '100' },
                { label: '申请时间', prop: 'applyDate', width: '150', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes' }
            ],
            PurchaseOrderDict
        }
    },
    components: { PureCollapseTr },
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
        handleClose () {
            this.$emit('backEvent')
        },
        attributeComputed (list, key) {
            let value = ''
            list.forEach(val => {
                if (val.key === key) {
                    value = val.value
                }
            })
            return value
        },
        fundMoneys (val) {
            if (val) {
                return filters.money(val)
            }
            return '-'
        },
        goDetail (url) {
            window.open(url)
        }
    },
    watch: {
        drawer (value) {
            if (value) {
                this.findPurchaseOrderDetail(this.row.id)
            }
        }
    },
    mounted () {
        // this.findPurchaseOrderDetail(this.orderId)
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
        background: #FF7A45;
        font-size: 12px;
        color: #ffffff;
        padding: 4px 14px;
        border-radius: 4px;

    }

    .info-title-main-color {
        color: #FF7A45;
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

    .img-group  img{
        width: 80px;
        cursor: pointer;
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
</style>
