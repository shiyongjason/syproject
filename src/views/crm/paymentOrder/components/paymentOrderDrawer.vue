<template>
    <div class="drawer-wrap">
        <el-drawer title="支付单详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%'
                   :before-close="handleClose" :wrapperClosable=false>
            <div class="drawer-content">
                <div class="info-content">
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="info-title">项目信息</span>
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="label">项目： </span>{{ paymentOrderDetail.projectInfo.projectName }}
                        </p>
                        <p class="col-filed">
                            <span class="label">经销商：</span>{{ paymentOrderDetail.projectInfo.companyName }}
                        </p>
                        <p class="col-filed">
                            <span class="label">所属分部：</span>{{ paymentOrderDetail.projectInfo.deptName }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="info-title">采购单信息</span>
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-50">
                            <span class="label">采购单金额：</span> {{ paymentOrderDetail.payOrderPoDetail.poAmount }}元
                        </p>
                        <p class="col-filed col-50">
                            <span class="label">最迟发货日期：</span> {{ paymentOrderDetail.payOrderPoDetail.lastGoodsDate }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-50">
                            <span class="label">采购明细表：</span>
                            <img :src="item.url" :key="item.url" alt="" @click="goDetail(item.url)"
                                 v-for="item in JSON.parse(paymentOrderDetail.payOrderPoDetail.poDetail)">
                        </p>
                        <p class="col-filed col-50">
                            <span class="label address">收货地址：</span>
                            {{ paymentOrderDetail.payOrderDetail.goodsAddress || '-' }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-25">
                            <span class="label">采购批次：</span>
                            {{ paymentOrderDetail.payOrderDetail.poNumber }}
                        </p>
                        <p class="col-filed col-25">
                            <span class="label">经销商预付款比例：</span> {{ paymentOrderDetail.payOrderDetail.prePercent }}%
                        </p>
                        <p class="col-filed col-25">
                            <span class="label">剩余货款支付周期：</span>{{
                                paymentOrderDetail.payOrderDetail.restPaymentPeriod
                            }}月
                        </p>
                        <p class="col-filed col-25">
                            <span class="label">免息方式：</span>{{ paymentOrderDetail.payOrderDetail.freeInterestType }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="info-title">支付单信息</span>
                            <span class="info-status">
                                {{ paymentOrderDetail.payOrderDetail.status }}
                            </span>
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-50">
                            <span class="label">申请支付金额：</span> {{ paymentOrderDetail.payOrderDetail.applyAmount }}元
                        </p>
                        <p class="col-filed col-50">
                            <span class="label">最迟发货日期：</span> {{ paymentOrderDetail.payOrderDetail.lastGoodsDate }}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-50">
                            <span class="label">上游供应商：</span>{{ paymentOrderDetail.payOrderDetail.supplierCompanyId }}
                        </p>
                        <p class="col-filed col-50">
                            <span class="label address">收货地址：</span>
                            {{paymentOrderDetail.payOrderDetail.goodsAddress}}
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="label">采购明细表：</span>
                            <img :src="item.url" :key="item.url" alt="" @click="goDetail(item.url)"
                                 v-for="item in JSON.parse(paymentOrderDetail.payOrderDetail.poDetail)">
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed">
                            <span class="label">申请时间：</span>
                            {{ paymentOrderDetail.payOrderDetail.applyDate }}
                        </p>
                        <p class="col-filed">
                            <span class="label">申请人：</span>
                            {{ paymentOrderDetail.payOrderDetail.createBy }}（{{ paymentOrderDetail.payOrderDetail.createPhone }}）
                        </p>
                    </div>
                    <div class="row-filed">
                        <h-button type="assist">支付单审核</h-button>
                    </div>
                    <!--                    首付款待支付start-->
                    <div class="row-filed">
                        <p class="col-filed col-33">
                            <span class="label">审核人：</span>赵娟（15195954045）
                        </p>
                        <p class="col-filed col-33">
                            <span class="label">审核时间：</span>2019-06-11 16:32
                        </p>
                        <p class="col-filed col-33">
                            <span class="label">审核结果：</span>通过
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-33">
                            <span class="label">应收账款质押：</span>已质押
                        </p>
                        <p class="col-filed col-33">
                            <span class="label">上游支付方式：</span> 银行转帐
                        </p>
                        <p class="col-filed col-33">
                            <span class="label">上游货款方式：</span>先货后款
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-50">
                            <span class="label">经销商首付款：</span>200,000元
                        </p>
                        <p class="col-filed col-50">
                            <span class="label">剩余货款：</span> 200,000元
                        </p>
                    </div>
                    <div class="row-filed">
                        <p class="col-filed col-50">
                            <span class="label">预计服务费总额：</span>200,000元
                        </p>
                        <p class="col-filed col-50">
                            <span class="label">预计每期服务费：</span> 200,000元
                        </p>
                    </div>
                    <div class="row-filed">
                        《订单及服务费确认函》： <span class="info-status-words">未签约</span>
                        <!--                        首付款待签约以后-->
                        <h-button type="primary">查看合同</h-button>
                        <!--                        首付款待签约以后-->
                    </div>
                    <!--                    首付款待支付end-->
                </div>
                <div class="drawer-footer">
                    <div class="drawer-button">
                        <!--                        <h-button type="assist">支付单审核</h-button>-->
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
import { getPaymentOrderDetail } from '@/views/crm/paymentOrder/api'

export default {
    name: 'paymentOrderDrawer',
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
            activeNames: ['1'],
            tableData: [],
            tableLabel: [
                { label: '支付单编号', prop: 'creditLevel', width: '120' },
                { label: '金额', prop: 'creditLevel', width: '100' },
                { label: '状态', prop: 'creditLevel', width: '100' },
                { label: '申请时间', prop: 'creditLevel', width: '150', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'creditLevel', width: '150', formatters: 'dateTimes' }
            ],
            paymentOrderDetail: {
                projectInfo: {},
                payOrderDetail: {},
                payOrderPoDetail: {},
                respFundResults: []
            }
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            nestDdata: 'nestDdata'
        })
    },
    methods: {
        ...mapActions({
            findNest: 'findNest',
            findBusinessDetail: 'crmauthen/findBusinessDetail'

        }),
        onChangeCheckbox (b, key) {
            if (!b) {
                this.businessType[key] = ''
            }
        },
        serviceCapabilityChange () {
            if (this.businessDetail.serviceCapability == 2) {
                this.serviceCapabilityDetail = []
            }
        },
        handleChange (val) {
            console.log(val)
        },
        onClickRecord () {
        },
        handleClose () {
            this.$emit('backEvent')
        },
        goDetail (url) {
            window.open(url)
        }
    },
    watch: {
        async drawer (val) {
            if (val) {
                const { data } = await getPaymentOrderDetail(this.row.id)
                this.paymentOrderDetail = data
            }
        }
    },
    mounted () {

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
            padding-right: 15px;
            font-size: 14px;
            color: #333333;
            font-weight: 400;
            cursor: default;
            line-height: 15px;
            box-sizing: border-box;

            .address {
                width: 120px;
            }
        }

        .col-50 {
            flex: 0 0 50%;
        }

        .col-33 {
            flex: 0 0 33%;
        }

        .col-25 {
            flex: 0 0 25%;
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

    .info-status-words {
        color: #FF7A45;
    }

    .info-title-main-color {
        color: #FF7A45;
        line-height: 30px;
        padding: 15px 0;
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
