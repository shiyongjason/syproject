<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">子订单号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.childOrderNo" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">客户名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.customerName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">支付方式：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.payWay">
                            <el-option v-for="item in paymethodOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.childOrderStatus">
                            <el-option v-for="item in orderStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单渠道：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.source">
                            <el-option v-for="item in orderChannelOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">支付时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startPayTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endPayTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">自有商品：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.own">
                            <el-option v-for="item in selfSupportOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单来源：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.sourceMerchantName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品所属：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.merchantName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="onQuery">查询</el-button>
                        <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <button type="button" class="el-button ml20 el-button--primary" @click="onExport"><span>导出</span></button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo"
                @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isShowIndex='true'>
                <template slot="payWay" slot-scope="scope">
                    {{ paymethodMap.get(scope.data.row.payWay) }}
                </template>
                <template slot="childOrderStatus" slot-scope="scope">
                    {{ orderStatusMap.get(scope.data.row.childOrderStatus) }}
                </template>
                <template slot="source" slot-scope="scope">
                    {{ orderChannelMap.get(scope.data.row.source) }}
                </template>
                <template slot="own" slot-scope="scope">
                    {{ selfSupportMap.get(scope.data.row.own) }}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { ORDER_STATUS_OPTIONS, ORDER_CHANNERL_OPTIONS, SELF_SUPPORT_OPTIONS, ORDER_STATUS_MAP, ORDER_CHANNERL_MAP, SELF_SUPPORT_MAP } from './const'
import { PAY_METHOD_OPTIONS, PAY_METHOD_MAP } from '@/utils/const'
import { mapGetters, mapActions } from 'vuex'
import { B2bUrl } from '@/api/config'
export default {
    data () {
        return {
            orderStatusOptions: ORDER_STATUS_OPTIONS,
            paymethodOptions: PAY_METHOD_OPTIONS,
            orderChannelOptions: ORDER_CHANNERL_OPTIONS,
            selfSupportOptions: SELF_SUPPORT_OPTIONS,
            paymethodMap: PAY_METHOD_MAP,
            orderStatusMap: ORDER_STATUS_MAP,
            orderChannelMap: ORDER_CHANNERL_MAP,
            selfSupportMap: SELF_SUPPORT_MAP,
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
                merchantName: ''
            },
            tableLabel: [
                { label: '子订单号', prop: 'childOrderNo' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: '客户名称', prop: 'customerName' },
                { label: '支付方式', prop: 'payWay' },
                { label: '订单实付金额（元）', prop: 'finalTotalAmount', formatters: 'money' },
                { label: '订单实收金额（元）', prop: 'discountAmount', formatters: 'money' },
                { label: '订单状态', prop: 'childOrderStatus' },
                { label: '订单渠道', prop: 'source' },
                { label: '自有商品', prop: 'own' },
                { label: '订单来源', prop: 'sourceMerchantName' },
                { label: '商品所属', prop: 'merchantName' }
            ]
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
        onQuery () {
            this.findOrders(this.queryParams)
        },
        onReset () {
            this.queryParams = { ...this.initParams }
            this.findOrders()
        },
        onExport () {
            let url = ''
            for (let key in this.queryParams) {
                url += (key + '=' + (this.queryParams[key] ? this.queryParams[key] : '') + '&')
            }
            location.href = B2bUrl + 'order/api/boss/orders/finance-orders/export?' + url
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