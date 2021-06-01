<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">运费订单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.childOrderNo" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">关联商品订单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.childOrderNo" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">运费订单状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.childOrderStatus">
                            <el-option v-for="item in orderStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">支付时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startPayTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endPayTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">运费商品性质：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.childOrderStatus">
                            <el-option v-for="item in merchantTypeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">运费价格来源：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.childOrderStatus">
                            <el-option v-for="item in sourcesPriceOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品归属：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.merchantName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">资金同步状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.childOrderStatus">
                            <el-option v-for="item in synchromizedOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">客户名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.customerName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="table-cont-tabs">
                <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                    <el-tab-pane label="全部" name="all"></el-tab-pane>
                    <el-tab-pane label="待支付" name="unpaid"></el-tab-pane>
                    <el-tab-pane label="待完成发货" name="pendingShipment"></el-tab-pane>
                    <el-tab-pane label="已完成发货" name="makeInvoice"></el-tab-pane>
                    <el-tab-pane label="已开票" name="haveMake"></el-tab-pane>
                    <el-tab-pane label="已退款" name="refunded"></el-tab-pane>
                    <el-tab-pane label="已关闭" name="closed"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="table-cont-btn">
                <h-button type='create' @click="onExport">批量导出</h-button>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="true" :actionMinWidth="180" :isAction="true">
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onseeTask(scope.data.row)">查看</h-button>
                    <h-button table @click="onSynchronous(scope.data.row)">资金同步</h-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { ORDER_STATUS_OPTIONS, MERCHANT_TYPE_OPTIONS, SOURCES_PRICE_OPTIONS, SYNCHROMIZED_STATE_OPTIONS } from '../const'
import { mapGetters, mapActions } from 'vuex'
import { B2bUrl } from '@/api/config'
export default {
    name: 'shippingOrder',
    data () {
        return {
            orderStatusOptions: ORDER_STATUS_OPTIONS,
            merchantTypeOptions: MERCHANT_TYPE_OPTIONS,
            sourcesPriceOptions: SOURCES_PRICE_OPTIONS,
            synchromizedOptions: SYNCHROMIZED_STATE_OPTIONS,
            initParams: {},
            queryParams: {
                childOrderNo: '',
                customerName: '',
                payWay: '',
                childOrderStatus: '',
                source: '',
                startPayTime: '',
                endPayTime: '',
                own: '',
                sourceMerchantName: '',
                merchantName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '在线运费订单编号', prop: 'childOrderNo' },
                { label: '关联商品运费订单编号', prop: 'childOrderNo' },
                { label: '运费商品性质', prop: 'natureType' },
                { label: '仓配城市', prop: 'city' },
                { label: '订单生成时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: '状态', prop: 'childOrderStatus' },
                { label: '客户名称', prop: 'customerName' },
                { label: '实付金额', prop: 'finalTotalAmount', formatters: 'moneyShow' },
                { label: '运费价格来源', prop: 'sourceMerchantName' },
                { label: 'MIS资金同步状态', prop: 'synchronous' },
                { label: '商品归属商家', prop: 'merchantName' }
            ],
            tabName: 'all'
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endPayTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startPayTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        tableData () {
            return this.orderList.records
        },
        paginationInfo () {
            return {
                total: this.orderList.total,
                pageNumber: this.orderList.current,
                pageSize: this.orderList.size
            }
        },
        ...mapGetters({
            orderList: 'finance/orderList'
        })
    },
    methods: {
        // 切换状态
        onTab (value) { },
        // 查看操作
        onseeTask (val) {
            this.$router.push({ path: '/b2b/orderfinanceManage/shippingorderDetail' })
        },
        // 资金同步操作
        onSynchronous () { },
        // 查询操作
        onQuery () {
            this.queryParams.pageNumber = 1
            this.findOrders(this.queryParams)
        },
        // 重置操作
        onReset () {
            this.queryParams = { ...this.initParams }
            this.findOrders()
        },
        // 批量导出操作
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无订单明细可导出！')
            } else {
                let url = ''
                for (let key in this.queryParams) {
                    url += (key + '=' + (this.queryParams[key] ? this.queryParams[key] : '') + '&')
                }
                location.href = B2bUrl + 'order/boss/child-orders/finance/export?access_token=' + localStorage.getItem('tokenB2b') + '&' + url
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findOrders(this.queryParams)
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findOrders(this.queryParams)
        },
        ...mapActions({
            findOrders: 'finance/findOrders'
        })
    },
    mounted () {
        this.initParams = { ...this.queryParams }
        this.findOrders()
    }
}
</script>
<style lang="scss" scoped>
.el-tabs__nav .is-active {
    color: #fff !important;
    background: #ff7a45 !important;
}
</style>
