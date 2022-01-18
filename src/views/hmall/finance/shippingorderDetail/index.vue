<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form label-width="150px">
                <div class="table-cont-title big-title">
                    <span class="table-title-name">运费订单编号：{{basicInfo.freightOrderNo}}</span>
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
                            <span class="card-cont-text">{{payTime || "-"}}</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">支付方式：</span>
                            <span class="card-cont-text">
                                <span>{{ basicInfo.payMethodDesc || "-" }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="card-cont-col">
                        <div class="table-cont-title small-title">
                            <span class="table-title-name">资金信息</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">系统计算运费总金额：</span>
                            <span class="card-cont-text">￥{{basicInfo.totalAmount || "-" }}</span>
                        </div>
                        <div class="card-cont" v-if="sourceFreight">
                            <span class="card-cont-label">人工维护后运费总金额：</span>
                            <span class="card-cont-text">￥{{basicInfo.finalTotalAmount}}</span>
                        </div>
                        <!-- <div class="card-cont">
                            <span class="card-cont-label">物流优惠券抵扣金额：</span>
                            <span class="card-cont-text">￥{{basicInfo.commissionAmount}}</span>
                        </div> -->
                        <div class="card-cont">
                            <span class="card-cont-label">实付金额：</span>
                            <span class="card-cont-text">￥{{basicInfo.finalTotalAmount || "-" }}</span>
                        </div>
                    </div>
                    <div class="card-cont-col">
                        <div class="table-cont-title small-title">
                            <span class="table-title-name">用户信息</span>
                        </div>
                        <div class="card-cont">
                            <span class="card-cont-label">客户：</span>
                            <span class="card-cont-text">{{basicInfo.memberName||'-'}}</span>
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
                            <span class="card-cont-label">收货地址：</span>
                            <span class="card-cont-text is-wrap">{{basicInfo.deliveryAddress?basicInfo.deliveryAddress.address:'-'}}</span>
                        </div>
                    </div>
                </div>
                <div class="table-cont-title between">
                    <span class="table-title-name">运费信息</span>
                    <span class="table-title-name between">
                        <el-input v-model="queryParams.freight" v-isNum:2 v-inputMAX='100000' placeholder="请输入修改后的运费" size="small"></el-input>
                        <el-button size="small" type="primary" style="margin-left:10px">确定</el-button>
                    </span>
                </div>
                <div class="pb20">
                    <!-- <basicTable :tableData="basicInfo.freightOrderSkuList" :tableLabel="tableLabel" :multiSelection.sync="multiSelection" :isPagination="false" :isShowIndex="true" :isAction="isAction"> -->
                    <basicTable :tableData="basicInfo.freightOrderSkuList" :tableLabel="tableLabel" :multiSelection.sync="multiSelection" :isPagination="false" :isShowIndex="true">
                        <template slot="freightSource" slot-scope="scope">
                            {{ sourcesPriceMap.get(scope.data.row.freightSource) || '-' }}
                        </template>
                        <template slot="status" slot-scope="scope">
                            {{ freightStatusMap.get(scope.data.row.status) || '-' }}
                        </template>
                        <!-- <template slot="action" slot-scope="scope" v-if="basicInfo.status == 10">
                            <h-button table @click="onseeTask(scope.data.row)">编辑运费价格</h-button>
                        </template> -->
                    </basicTable>
                </div>
                <div class="table-cont-title">
                    <span class="table-title-name">商品运费明细信息</span>
                </div>
                <div class="pb20">
                    <basicTable :tableData="basicInfo.freightOrderSkuList" :tableLabel="tableLabel" :multiSelection.sync="multiSelection" :isPagination="false" :isShowIndex="true" :isAction="isAction">
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
                <basicTable :tableData="basicInfo.orderOperateLogList" :tableLabel="logTableLabel" :isPagination="false" :maxHeight="505">
                    <template slot="operateMotion" slot-scope="scope">
                        {{ operatonalMap.get(scope.data.row.operateMotion) || '-' }}
                    </template>
                </basicTable>
            </el-form>
        </div>
        <div class="page-body-cont btn-cont">
            <h-button @click="onBack">返回</h-button>
        </div>
        <el-dialog title="编辑订单运费" width="560px" :visible.sync="closeOrderDialog" :close-on-click-modal=false>
            <el-form :model="createform" :rules="rules" ref="createform" label-width="130px" class="createPrice">
                <el-form-item label="当前运费价格：">
                    <span style="width:60%;display: inline-block;">{{ finalSingleAmount || '-' }}</span>
                    <span style="padding: 0 0 0 10px;">元/件</span>
                </el-form-item>
                <el-form-item label="修改为：" prop="price" :rules="rules.price">
                    <el-input v-model="createform.price" placeholder="请输入金额" maxlength="6" style="width:60%;display: inline-block;">
                    </el-input>
                    <span style="padding: 0 0 0 10px;">元/件</span>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <h-button @click="onCancel">取消</h-button>
                <h-button type="primary" @click="onEdit">确定</h-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { FREIGHT_STATUS_MAP, MERCHANT_TYPE_MAP, SOURCES_PRICE_MAP, OPERATIONAL_MAP } from '../const'
import { withinDetail } from '@/utils/rules.js'
import { putFreightPrice } from '../api/index'
export default {
    name: 'shippingorderDetail',
    data () {
        return {
            merchantTypeMap: MERCHANT_TYPE_MAP,
            sourcesPriceMap: SOURCES_PRICE_MAP,
            freightStatusMap: FREIGHT_STATUS_MAP,
            operatonalMap: OPERATIONAL_MAP,
            basicInfo: {},
            logInfo: [],
            multiSelection: [],
            tableLabel: [
                { label: 'sku编码', prop: 'skuCode' },
                { label: '商品名称', prop: 'skuName' },
                { label: '数量', prop: 'quantity' },
                { label: '单件运费价格', prop: 'finalSingleAmount' },
                { label: '价格定义来源', prop: 'freightSource' },
                { label: '运费合计金额', prop: 'finalTotalAmount' },
                // { label: '物流券抵扣金额', prop: 'finalSingleAmount' },
                { label: '实付运费金额', prop: 'finalTotalAmount' },
                { label: '退款申请时间', prop: 'refundApplyTime', formatters: 'dateTime' },
                { label: '状态', prop: 'status' }
            ],
            logTableLabel: [
                { label: '操作时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '操作人', prop: 'operator' },
                { label: '操作动作', prop: 'operateMotion' },
                { label: '内容', prop: 'operateContext' }
            ],
            closeOrderDialog: false,
            isAction: true,
            createform: {
                id: '',
                price: '',
                operator: ''
            },
            finalSingleAmount: '',
            rules: {
                price: [
                    { required: true, message: '请输入999以内数字', trigger: 'blur' },
                    { validator: withinDetail, trigger: 'blur' }
                ]
            },
            sourceFreight: false,
            queryParams: {
                freight: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            freightOrdersInfo: 'finance/freightOrdersInfo'
        }),
        payTime () {
            return this.basicInfo.payTime && this.basicInfo.payTime.replace('T', ' ')
        }
    },
    methods: {
        async init () {
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
            const array = this.basicInfo.freightOrderSkuList
            array.map(item => {
                if (item.freightSource == 2) {
                    this.sourceFreight = true
                }
            })
        },
        onseeTask (row) {
            this.closeOrderDialog = true
            this.$nextTick(() => {
                this.$refs['createform'].resetFields()
            })
            this.finalSingleAmount = row.finalSingleAmount
            this.createform.id = row.id
            this.createform.operator = this.userInfo.employeeName
        },
        onBack () {
            this.$router.back()
        },
        onCancel () {
            this.closeOrderDialog = false
        },
        onEdit () {
            if (this.createform.operator != '') {
                this.$refs['createform'].validate(async (valid) => {
                    if (valid) {
                        this.closeOrderDialog = false
                        this.createform.price = Number(this.createform.price)
                        await putFreightPrice(this.createform)
                        this.getfreightOrdersInfo()
                    }
                })
            } else {
                this.closeOrderDialog = false
            }
        },
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
    },
    activated () {
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
.createPrice {
    padding: 50px 70px;
}
.between{
    justify-content: space-between;
    display: flex;
    align-items: center;
}
</style>
