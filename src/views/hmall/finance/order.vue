<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">订单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.childOrderNo" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">客户名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.customerName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">支付方式：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.payWay">
                            <el-option v-for="item in paymethodOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">订单状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.childOrderStatus">
                            <el-option v-for="item in orderStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">订单渠道：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.source">
                            <el-option v-for="item in orderChannelOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
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
                    <div class="query-col__lable">自有商品：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.own">
                            <el-option v-for="item in selfSupportOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">订单来源：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.sourceMerchantName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品所属：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.merchantName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                    <h-button class="ml20" @click="onExport">导出</h-button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isShowIndex='true'>
                <template slot="payWay" slot-scope="scope">
                    {{ paymethodMap.get(scope.data.row.payWay) || '-' }}
                </template>
                <template slot="childOrderStatus" slot-scope="scope">
                    {{ orderStatusMap.get(scope.data.row.childOrderStatus) || '-' }}
                </template>
                <template slot="source" slot-scope="scope">
                    {{ orderChannelMap.get(scope.data.row.source) || '-' }}
                </template>
                <template slot="own" slot-scope="scope">
                    {{ selfSupportMap.get(scope.data.row.own) || '-' }}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { ORDER_STATUS_OPTIONS, ORDER_CHANNERL_OPTIONS, SELF_SUPPORT_OPTIONS, ORDER_STATUS_MAP, ORDER_CHANNERL_MAP, SELF_SUPPORT_MAP, PAY_METHOD_OPTIONS, PAY_METHOD_MAP } from './const'
import { mapGetters, mapActions } from 'vuex'
import { B2bUrl } from '@/api/config'
export default {
    name: 'financeorder',
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
                merchantName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '订单编号', prop: 'childOrderNo' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: '客户名称', prop: 'customerName' },
                { label: '支付方式', prop: 'payWay' },
                { label: '订单实付金额（元）', prop: 'finalTotalAmount', formatters: 'moneyShow' },
                { label: '订单实收金额（元）', prop: 'actualReceivedAmount', formatters: 'moneyShow' },
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
            this.queryParams.pageNumber = 1
            this.findOrders(this.queryParams)
        },
        onReset () {
            this.queryParams = { ...this.initParams }
            this.findOrders()
        },
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
