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
                    <div class="query-col__lable">支付方式：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.payMethod">
                            <el-option v-for="[key,value] in paymentMethodOptions" :label="value" :value="key" :key="key"></el-option>
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
                        <el-select v-model="queryParams.ncSyncStatus">
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
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :actionMinWidth="230" :isAction="true">
                <template slot="status" slot-scope="scope">
                    {{ freightStatusMap.get(scope.data.row.status) || '-' }}
                </template>
                <template slot="freightSource" slot-scope="scope">
                    {{ sourcesPriceMap.get(scope.data.row.freightSource) || '-' }}
                </template>
                <template slot="payMethod" slot-scope="scope">
                    <!-- {{ paymentMethodOptions.get(scope.data.row.payMethod+'') || '-' }} -->
                    {{ scope.data.row.payMethodDesc || '-' }}
                </template>
                <template slot="ncSyncStatus" slot-scope="scope">
                    {{ synchromizedMap.get(scope.data.row.ncSyncStatus) || '-' }}
                </template>
                <template slot="merchantType" slot-scope="scope">
                    {{ merchantTypeMap.get(scope.data.row.merchantType) || '-' }}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onseeTask(scope.data.row)">查看</h-button>
                    <!-- 付过款，未关闭，资金同步状态为“已同步”，操作列表不展示“同步”按钮 -->
                    <h-button table @click="onSynchronous(scope.data.row)" v-if="scope.data.row.status>10&&scope.data.row.status<60&&scope.data.row.ncSyncStatus!=40&&scope.data.row.status!=50">同步</h-button>
                    <div class="freightpopover" v-if="scope.data.row.status<=10">
                        <el-popover placement="left" width='200' :ref="`popover-${scope.data.$index}`" trigger="click" title='运费修改'
                         @show="onPopoverShow">
                            <p>运费金额：{{typeof scope.data.row.finalTotalAmount === 'number'?`￥${scope.data.row.finalTotalAmount}`:'-'}}</p>
                            <p class="amountinput"><el-input v-model="amount" v-isNum:2 v-inputMAX='100000' maxlength="50" placeholder="请输入修改的运费金额" size="mini"></el-input></p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="()=>closeFreightVisible(scope.data.$index)">取消</el-button>
                                <el-button type="primary" size="mini" @click="()=>ConfirmFreightVisible(scope.data.row,scope.data.$index)">确定</el-button>
                            </div>
                            <h-button table slot="reference" @click="()=>theFreightChanges(scope.data.row,scope.data.$index)">运费修改</h-button>
                        </el-popover>
                    </div>

                </template>
            </basicTable>

        </div>
    </div>
</template>

<script>
import { FREIGHT_STATUS_OPTIONS, MERCHANT_TYPE_OPTIONS, SOURCES_PRICE_OPTIONS, SYNCHROMIZED_STATE_OPTIONS, FREIGHT_STATUS_MAP, SOURCES_PRICE_MAP, SYNCHROMIZED_STATE_MAP, PAY_WAY_MAP, MERCHANT_TYPE_MAP, PAYMENT_METHOD } from '../const'
import { mapGetters, mapActions, mapState } from 'vuex'
import { B2bUrl } from '@/api/config'
import { syncToNc, putFreightAmount } from '../api/index'
export default {
    name: 'shippingOrder',
    data () {
        return {
            paymentMethodOptions: PAYMENT_METHOD,
            orderStatusOptions: FREIGHT_STATUS_OPTIONS,
            merchantTypeOptions: MERCHANT_TYPE_OPTIONS,
            sourcesPriceOptions: SOURCES_PRICE_OPTIONS,
            synchromizedOptions: SYNCHROMIZED_STATE_OPTIONS,
            freightStatusMap: FREIGHT_STATUS_MAP,
            sourcesPriceMap: SOURCES_PRICE_MAP,
            synchromizedMap: SYNCHROMIZED_STATE_MAP,
            payWayMap: PAY_WAY_MAP,
            merchantTypeMap: MERCHANT_TYPE_MAP,
            amount: '',
            queryParams: {
                payMethod: '', // 支付方式
                freightOrderNo: '',
                childOrderNo: '',
                status: '',
                payStartTime: '',
                payEndTime: '',
                merchantType: '',
                freightSource: '',
                merchantName: '',
                ncSyncStatus: '',
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
                { label: '支付方式', prop: 'payMethod' },
                { label: '订单生成时间', prop: 'orderTime', formatters: 'dateTime' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: '状态', prop: 'status' },
                { label: '客户名称', prop: 'memberName' },
                { label: '实付金额', prop: 'finalTotalAmount', formatters: 'moneyShow' },
                { label: '运费价格来源', prop: 'freightSource' },
                { label: '资金同步状态', prop: 'ncSyncStatus' },
                { label: '同步备注', prop: 'ncSyncRemark' },
                { label: '退款时间', prop: 'refundTime', formatters: 'dateTime' },
                { label: '商品归属商家', prop: 'merchantName' }
            ],
            tabName: '0',
            tab: true
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
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
        onPopoverShow () {
            this.amount = ''
        },
        /** 关闭修改运费 */
        closeFreightVisible (index) {
            // this.$refs[`popover-${index}`].doClose()
            document.body.click()
            this.amount = ''
        },
        /** 确认修改运费 */
        async ConfirmFreightVisible (row, index) {
            if (this.amount === '') {
                this.$message.error('请输入正确金额')
                return
            }
            await putFreightAmount({
                freightOrderId: row.id,
                amount: this.amount,
                operator: this.userInfo.employeeName
            })
            // this.$refs[`popover-${index}`].doClose()
            document.body.click()
            this.$message.success('修改成功')
            this.amount = ''
            this.findFreightOrders(this.queryParams)
        },
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
        /** 运费修改 */
        theFreightChanges (row, index) {
            this.$forceUpdate()
            setTimeout(() => {
                this.$set(row, 'freightVisible', true)
            }, 10)
        },
        /** 资金同步操作 */
        async onSynchronous (row) {
            try {
                await syncToNc(row.id)
                this.$message.success('同步成功')
                this.findFreightOrders(this.queryParams)
            } catch (error) {
                this.findFreightOrders(this.queryParams)
            }
        },
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
<style lang="scss" scoped>
.freightpopover{
    display:inline-block;
}
/deep/.freightpopover span{
    margin-left: 5px !important;
}
.amountinput {
    margin:10px 0
}
</style>