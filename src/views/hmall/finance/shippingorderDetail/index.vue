<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form label-width="150px">
                <div class="table-cont-title big-title">
                    <span class="table-title-name">运费订单编号：{{freightOrderNo}}</span>
                    <span class="flr">
                        <span class="black-word">{{freightStatusMap.get(basicInfo.status)}}</span>
                    </span>
                </div>
                <div class="card-cont-row pb30">
                    <div class="card-cont-col">
                        <div class="table-cont-title small-title">
                            <span class="table-title-name">基本信息</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">关联商品订单编号：</span>
                            <span class="card-cont-text">{{basicInfo.childOrderNo||'-'}}</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">商品性质：</span>
                            <span class="card-cont-text">{{merchantTypeMap.get(basicInfo.merchantType)}}</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label is-wrap">商品归属：</span>
                            <span class="card-cont-text is-wrap">{{basicInfo.merchantName||'-'}}</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">支付时间：</span>
                            <span class="card-cont-text">{{basicInfo.payTime}}</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">支付方式：</span>
                            <span class="card-cont-text">
                                <span>{{ payWayMap.get(basicInfo.payMethod) }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="card-cont-col">
                        <div class="table-cont-title small-title">
                            <span class="table-title-name">资金信息</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">系统计算运费总金额：</span>
                            <span class="card-cont-text">￥{{basicInfo.totalAmount}}</span>
                        </div>
                        <div class="card-cont" v-if="basicInfo.discountAmount != ''">
                            <span class="card-cont-label">人工维护后运费总金额：</span>
                            <span class="card-cont-text">￥{{basicInfo.discountAmount}}</span>
                        </div>
                        <!-- <div class="card-cont">
                            <span class="card-cont-label">物流优惠券抵扣金额：</span>
                            <span class="card-cont-text">￥{{basicInfo.commissionAmount}}</span>
                        </div> -->
                        <div class="card-cont">
                            <span class="card-cont-label">实付金额：</span>
                            <span class="card-cont-text">￥{{basicInfo.finalTotalAmount}}</span>
                        </div>
                    </div>
                    <div class="card-cont-col">
                        <div class="table-cont-title small-title">
                            <span class="table-title-name">用户信息</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">客户：</span>
                            <span class="card-cont-text">{{basicInfo.customerName||'-'}}</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label is-wrap">收货人名称：</span>
                            <span class="card-cont-text is-wrap">{{basicInfo.deliveryAddress?basicInfo.deliveryAddress.name:'-'}}</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">收货手机：</span>
                            <span class="card-cont-text">{{basicInfo.deliveryAddress?basicInfo.deliveryAddress.phone:'-'}}</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">收货地址</span>
                            <span class="card-cont-text is-wrap">{{basicInfo.deliveryAddress?basicInfo.deliveryAddress.address:'-'}}</span>
                        </div>
                    </div>
                </div>
                <div class="table-cont-title">
                    <span class="table-title-name">商品运费明细信息</span>
                </div>
                <div class="pb20">
                    <basicTable :tableData="basicInfo.freightOrderSkuList" :tableLabel="tableLabel" :multiSelection.sync="multiSelection" :selectable="selectable" :rowClassName="rowClassName" :isPagination="false" :isMultiple="true" :isShowIndex="true" :isAction="isAction">
                        <template slot="freightSource" slot-scope="scope">
                            {{ sourcesPriceMap.get(scope.data.row.freightSource) || '-' }}
                        </template>
                        <template slot="status" slot-scope="scope">
                            {{ freightStatusMap.get(scope.data.row.status) || '-' }}
                        </template>
                        <template slot="action" slot-scope="scope" v-if="basicInfo.status == 10">
                            <h-button table @click="onseeTask(scope.data.row)">编辑运费价格</h-button>
                        </template>
                    </basicTable>
                </div>
                <div class="table-cont-title">
                    <span class="table-title-name">日志信息</span>
                </div>
                <basicTable :tableData="basicInfo.orderOperateLogList" :tableLabel="logTableLabel" :isPagination="false" :maxHeight="505"></basicTable>
            </el-form>
        </div>
        <div class="page-body-cont btn-cont">
            <h-button @click="onBack">返回</h-button>
        </div>
        <el-dialog title="编辑订单运费" width="560px" :visible.sync="closeOrderDialog" :close-on-click-modal=false>
            <div class="pt50 pl70">
                <span style="width:25%;display: inline-block;">当前运费价格：</span>
                <span style="width:40%;display: inline-block;">{{}}</span>
                <span style="padding: 0 0 0 10px;">元/件</span>
            </div>
            <div class="pt50 pl70">
                <span style="width:25%;display: inline-block;">修改为：</span>
                <el-input type="text" value="" style="width:40%;display: inline-block;" />
                <span style="padding: 0 0 0 10px;">元/件</span>
            </div>
            <span slot="footer">
                <h-button @click="closeOrderDialog = false">取消</h-button>
                <h-button type="primary">确定</h-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { FREIGHT_STATUS_MAP, PAY_WAY_MAP, MERCHANT_TYPE_MAP, SOURCES_PRICE_MAP } from '../const'
export default {
    name: 'shippingorderDetail',
    data () {
        return {
            payWayMap: PAY_WAY_MAP,
            merchantTypeMap: MERCHANT_TYPE_MAP,
            sourcesPriceMap: SOURCES_PRICE_MAP,
            freightStatusMap: FREIGHT_STATUS_MAP,
            basicInfo: {},
            logInfo: [],
            multiSelection: [],
            tableLabel: [
                { label: 'sku编码', prop: 'skuCode' },
                { label: '商品名称', prop: 'skuName' },
                { label: '数量', prop: 'quantity' },
                { label: '单件运费价格', prop: 'originSingleAmount' },
                { label: '价格定义来源', prop: 'freightSource' },
                { label: '运费合计金额', prop: 'originTotalAmount' },
                { label: '物流券抵扣金额', prop: 'finalSingleAmount' },
                { label: '实付运费金额', prop: 'finalTotalAmount' },
                { label: '退款申请时间', prop: 'refundApplyTime' },
                { label: '状态', prop: 'statue' }
            ],
            logTableLabel: [
                { label: '操作时间', prop: 'createTime' },
                { label: '操作人', prop: 'operator' },
                { label: '操作动作', prop: 'operateMotion' },
                { label: '内容', prop: 'operatorContext' }
            ],
            closeOrderDialog: false,
            isAction: true,
            freightOrderNo: ''
        }
    },
    computed: {
        ...mapState({
            freightOrdersInfo: state => state.freightOrdersInfo
        })
    },
    methods: {
        async init () {
            this.freightOrderNo = this.$route.query.id
            if (this.$route.query.id) {
                this.getfreightOrdersInfo()
            }
        },
        async getfreightOrdersInfo () {
            await this.findFreightInfo({ id: this.$route.query.id })
            this.basicInfo = { ...this.freightOrdersInfo }
            if (this.basicInfo.status == 10) {
                this.isAction = true
            } else {
                this.isAction = false
            }
        },
        selectable (row) {
        },
        onBack () {
            this.$router.back()
        },
        rowClassName () { },
        ...mapActions({
            findFreightInfo: 'finance/findFreightInfo'
        })
    },
    watch: {
        $route () {
            this.freightOrderNo = this.$route.query.id
        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
.el-form {
    padding: 0;
}
.annex {
    width: 200px;
    float: left;
}
/deep/ .rowDisabled {
    background: #efefef;
    opacity: 0.5;
}
/deep/ .rowChecked {
    background: #fff2ed;
}
.pb30 {
    padding-bottom: 30px !important;
}
.card-cont-row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 0 5px;
}
.card-cont-col:not(:last-child) {
    margin-right: 30px;
}
.card-cont-col {
    width: calc((100% / 3) - 20px);
}
.table-cont-title.small-title {
    line-height: 28px;
    font-size: 16px;
}
.table-cont-title {
    margin-bottom: 20px;
    padding: 10px;
    line-height: 40px;
    background: #fafafa;
}
.card-cont {
    padding: 10px 5px;
}
</style>
