<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">运费订单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.freightOrderNo" maxlength="50" placeholder="请输入运费订单编号"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">关联商品订单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.childOrderNo" maxlength="50" placeholder="请输入关联商品订单编号"></el-input>
                    </div>
                </div>
                <div class="query-cont__col" v-if="tabName == '0'">
                    <div class="query-col__lable">运费订单状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status">
                            <el-option v-for="item in orderStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">支付时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.payStartTime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-ddTHH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.payEndTime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-ddTHH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">运费商品性质：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.merchantType">
                            <el-option v-for="item in merchantTypeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">运费价格来源：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.freightSource">
                            <el-option v-for="item in sourcesPriceOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品归属：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.merchantName" maxlength="50" placeholder="请输入商品归属"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">资金同步状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.capitalSyncStatus">
                            <el-option v-for="item in synchromizedOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">客户名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.memberName" maxlength="50" placeholder="请输入客户名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                    <h-button @click="onExport">导出</h-button>
                </div>
            </div>
            <div class="table-cont-tabs">
                <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                    <el-tab-pane v-for="item in orderStatusOptions" :label="item.label" :value="item.value" :key="item.value" :name="item.value"></el-tab-pane>
                </el-tabs>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :actionMinWidth="180" :isAction="true">
                <template slot="status" slot-scope="scope">
                    {{ freightStatusMap.get(scope.data.row.status) || '-' }}
                </template>
                <template slot="freightSource" slot-scope="scope">
                    {{ sourcesPriceMap.get(scope.data.row.freightSource) || '-' }}
                </template>
                <template slot="capitalSyncStatus" slot-scope="scope">
                    {{ synchromizedMap.get(scope.data.row.capitalSyncStatus) || '-' }}
                </template>
                <template slot="payMethod" slot-scope="scope">
                    {{ payWayMap.get(scope.data.row.payMethod) || '-' }}
                </template>
                <template slot="merchantType" slot-scope="scope">
                    {{ merchantTypeMap.get(scope.data.row.merchantType) || '-' }}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onseeTask(scope.data.row)">查看</h-button>
                    <!-- <h-button table @click="onSynchronous(scope.data.row)">资金同步</h-button> -->
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { FREIGHT_STATUS_OPTIONS, MERCHANT_TYPE_OPTIONS, SOURCES_PRICE_OPTIONS, SYNCHROMIZED_STATE_OPTIONS, FREIGHT_STATUS_MAP, SOURCES_PRICE_MAP, SYNCHROMIZED_STATE_MAP, PAY_WAY_MAP, MERCHANT_TYPE_MAP } from '../const'
import { mapGetters, mapActions } from 'vuex'
import { B2bUrl } from '@/api/config'
export default {
    name: 'shippingOrder',
    data () {
        return {
            orderStatusOptions: FREIGHT_STATUS_OPTIONS,
            merchantTypeOptions: MERCHANT_TYPE_OPTIONS,
            sourcesPriceOptions: SOURCES_PRICE_OPTIONS,
            synchromizedOptions: SYNCHROMIZED_STATE_OPTIONS,
            freightStatusMap: FREIGHT_STATUS_MAP,
            sourcesPriceMap: SOURCES_PRICE_MAP,
            synchromizedMap: SYNCHROMIZED_STATE_MAP,
            payWayMap: PAY_WAY_MAP,
            merchantTypeMap: MERCHANT_TYPE_MAP,
            queryParams: {
                freightOrderNo: '',
                childOrderNo: '',
                status: '',
                payStartTime: '',
                payEndTime: '',
                merchantType: '',
                freightSource: '',
                merchantName: '',
                capitalSyncStatus: '',
                memberName: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            tableLabel: [
                { label: '在线运费订单编号', prop: 'freightOrderNo' },
                { label: '关联商品运费订单编号', prop: 'childOrderNo' },
                { label: '运费商品性质', prop: 'merchantType' },
                { label: '仓配城市', prop: 'cityName' },
                { label: '订单生成时间', prop: 'orderTime', formatters: 'dateTime' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: '状态', prop: 'status' },
                { label: '客户名称', prop: 'memberName' },
                { label: '实付金额', prop: 'finalTotalAmount', formatters: 'moneyShow' },
                { label: '运费价格来源', prop: 'freightSource' },
                { label: 'MIS资金同步状态', prop: 'capitalSyncStatus' },
                { label: '商品归属商家', prop: 'merchantName' }
            ],
            tabName: '0',
            tab: true
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.payEndTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.payStartTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        tableData () {
            return this.freightOrdersList.records
        },
        paginationInfo () {
            return {
                total: this.freightOrdersList.total,
                pageNumber: this.freightOrdersList.current,
                pageSize: this.freightOrdersList.size
            }
        },
        ...mapGetters({
            freightOrdersList: 'finance/freightOrdersList'
        })
    },
    methods: {
        // 切换状态
        // this.tabName == '0' ? this.queryParams.orderStatus = this.queryParams.orderStatus : this.queryParams.orderStatus = this.tabName
        onTab (value) {
            this.queryParams.pageNumber = 1
            this.orderStatusOptions.map(item => {
                if (value.name == item.value) {
                    this.queryParams.status = item.value
                }
            })
            this.findFreightOrders(this.queryParams)
        },
        // 查看操作
        onseeTask (val) {
            this.$router.push({ path: '/b2b/finance/shippingorderDetail', query: { id: val.id } })
        },
        // 资金同步操作
        // onSynchronous () { },
        // 查询操作
        onQuery () {
            this.queryParams.pageNumber = 1
            this.tabName == '0' ? this.queryParams.status = this.queryParams.status : this.queryParams.status = this.tabName
            this.findFreightOrders(this.queryParams)
        },
        // 重置操作
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.tabName == '0' ? this.queryParams.status = '' : this.queryParams.status = this.tabName
            this.findFreightOrders(this.queryParams)
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
                url += 'access_token=' + localStorage.getItem('token')
                location.href = B2bUrl + 'order/boss/freight-orders/export?' + url
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findFreightOrders(this.queryParams)
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findFreightOrders(this.queryParams)
        },
        ...mapActions({
            findFreightOrders: 'finance/findFreightOrders'
        })
    },
    mounted () {
        this.resetParams = { ...this.queryParams }
        this.onQuery()
    },
    activated () {
        this.findFreightOrders()
    }
}
</script>
