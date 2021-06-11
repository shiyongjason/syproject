<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">支付时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.payTimeStart" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-ddTHH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.payTimeEnd" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-ddTHH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status">
                            <el-option v-for="item in onlineFreightOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品归属商家名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.merchantName" maxlength="50" placeholder="请输入商品归属商家名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                    <h-button @click="onExport">导出</h-button>

                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :actionMinWidth="180">
                <template slot="merchantType" slot-scope="scope">
                    {{ merchantTypeMap.get(scope.data.row.merchantType) || '-' }}
                </template>
                <template slot="status" slot-scope="scope">
                    {{ onlineFreightStatusMap.get(scope.data.row.status) || '-' }}
                </template>
                <template slot="freightSource" slot-scope="scope">
                    {{ sourcesPriceMap.get(scope.data.row.freightSource) || '-' }}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { ONLINE_FREIGHT_STATUS_OPTIONS, ONLINE_FREIGHT_STATUS_MAP, MERCHANT_TYPE_MAP, SOURCES_PRICE_MAP } from '../const'
import { mapGetters, mapActions } from 'vuex'
import { B2bUrl } from '@/api/config'
export default {
    name: 'onlinefreightDetails',
    data () {
        return {
            onlineFreightOptions: ONLINE_FREIGHT_STATUS_OPTIONS,
            onlineFreightStatusMap: ONLINE_FREIGHT_STATUS_MAP,
            merchantTypeMap: MERCHANT_TYPE_MAP,
            sourcesPriceMap: SOURCES_PRICE_MAP,
            initParams: {},
            queryParams: {
                payTimeStart: '',
                payTimeEnd: '',
                status: '',
                merchantName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: 'sku编码', prop: 'productCode' },
                { label: '商品名称', prop: 'productName' },
                { label: '商品性质', prop: 'merchantType' },
                { label: '商品归属商家', prop: 'merchantName' },
                { label: '仓配城市', prop: 'cityName' },
                { label: '运费订单编码', prop: 'freightNo' },
                { label: '状态', prop: 'status' },
                { label: '数量', prop: 'quantity' },
                { label: '单件运费', prop: 'finalSingleAmount', formatters: 'moneyShow' },
                { label: '价格定义来源', prop: 'freightSource' },
                { label: '维护人', prop: 'updateBy' },
                { label: '运费合计', prop: 'finalTotalAmount', formatters: 'moneyShow' },
                { label: '实付运费金额', prop: 'actualPaidAmount', formatters: 'moneyShow' },
                { label: '收货地址', prop: 'shippingAddress' },
                { label: '客户名称', prop: 'customerName' }
            ]
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.payTimeEnd
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.payTimeStart
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        tableData () {
            return this.onlinefreightList.records
        },
        paginationInfo () {
            return {
                total: this.onlinefreightList.total,
                pageNumber: this.onlinefreightList.current,
                pageSize: this.onlinefreightList.size
            }
        },
        ...mapGetters({
            onlinefreightList: 'finance/onlinefreightList'
        })
    },
    methods: {
        // 查看操作
        onseeTask (val) {
            this.$router.push({ path: '/b2b/orderfinanceManage/shippingorderDetail' })
        },
        // 资金同步操作
        onSynchronous () { },
        // 查询操作
        onQuery () {
            this.queryParams.pageNumber = 1
            this.findOnlinefreightList(this.queryParams)
        },
        // 重置操作
        onReset () {
            this.queryParams = { ...this.initParams }
            this.findOnlinefreightList()
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
                location.href = B2bUrl + 'order/boss/freight-orders/detail/export?access_token=' + localStorage.getItem('tokenB2b') + '&' + url
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findOnlinefreightList(this.queryParams)
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findOnlinefreightList(this.queryParams)
        },
        ...mapActions({
            findOnlinefreightList: 'finance/findOnlinefreightList'
        })
    },
    mounted () {
        this.initParams = { ...this.queryParams }
        this.findOnlinefreightList()
    }
}
</script>
<style lang="scss" scoped>
.el-tabs__nav .is-active {
    color: #fff !important;
    background: #ff7a45 !important;
}
</style>
