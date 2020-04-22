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
                    <div class="query-col-title">券编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.couponCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">券名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.couponName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">券类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.couponType">
                            <el-option v-for="item in couponsTypeOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">活动编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.activityCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">活动名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.activityName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">活动类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.activityType">
                            <el-option v-for="item in activityTypeOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.childOrderStatus">
                            <el-option v-for="item in orderStatusOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单渠道：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.source">
                            <el-option v-for="item in orderChannelOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">支付方式：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.payWay">
                            <el-option v-for="item in paymethodOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">支付时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startPayTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart"></el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endPayTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">完成时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startCompleteTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsCompleteStart"></el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endCompleteTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsCompleteEnd"></el-date-picker>
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
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange"
                :isShowIndex='true'>
                <template slot="payWay" slot-scope="scope">
                    {{ paymethodMap.get(scope.data.row.payWay) || '-' }}
                </template>
                <template slot="childOrderStatus" slot-scope="scope">
                    {{ orderStatusMap.get(scope.data.row.childOrderStatus) || '-' }}
                </template>
                <template slot="source" slot-scope="scope">
                    {{ orderChannelMap.get(scope.data.row.source) || '-' }}
                </template>
                <template slot="couponType" slot-scope="scope">
                    {{ couponsTypeMap.get(scope.data.row.couponType) || '-' }}
                </template>
                <template slot="activityType" slot-scope="scope">
                    {{ activityTypeMap.get(scope.data.row.activityType) || '-' }}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import {
    ORDER_STATUS_OPTIONS, ORDER_CHANNERL_OPTIONS, SELF_SUPPORT_OPTIONS, COUPONS_TYPE_OPTIONS, ACTIVITY_TYPE_OPTIONS,
    ORDER_STATUS_MAP, ORDER_CHANNERL_MAP, COUPONS_TYPE_MAP, ACTIVITY_TYPE_MAP } from './const'
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
            activityTypeOptions: ACTIVITY_TYPE_OPTIONS,
            couponsTypeOptions: COUPONS_TYPE_OPTIONS,
            paymethodMap: PAY_METHOD_MAP,
            orderStatusMap: ORDER_STATUS_MAP,
            orderChannelMap: ORDER_CHANNERL_MAP,
            couponsTypeMap: COUPONS_TYPE_MAP,
            activityTypeMap: ACTIVITY_TYPE_MAP,
            initParams: {},
            queryParams: {
                childOrderNo: '',
                customerName: '',
                couponCode: '',
                couponName: '',
                couponType: '',
                activityCode: '',
                activityName: '',
                activityType: '',
                childOrderStatus: '',
                source: '',
                payWay: '',
                startPayTime: '',
                endPayTime: '',
                startCompleteTime: '',
                endCompleteTime: '',
                sourceMerchantName: '',
                merchantName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '子订单号', prop: 'childOrderNo' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: '完成时间', prop: 'completeTime', formatters: 'dateTime' },
                { label: '订单总金额（元）', prop: 'totalAmount', formatters: 'money' },
                { label: '订单实付（元）', prop: 'finalTotalAmount', formatters: 'money' },
                { label: '订单实收（元）', prop: 'discountAmount', formatters: 'money' },
                { label: '券编码', prop: 'couponCode' },
                { label: '券名称', prop: 'couponName' },
                { label: '券类型', prop: 'couponType' },
                { label: '券金额（元）', prop: 'couponAmount', formatters: 'money' },
                { label: '活动编码', prop: 'activityCode' },
                { label: '活动名称', prop: 'activityName' },
                { label: '活动类型', prop: 'activityType' },
                { label: '活动金额（元）', prop: 'activityAmount', formatters: 'money' },
                { label: '订单状态', prop: 'childOrderStatus' },
                { label: '订单渠道', prop: 'source' },
                { label: '支付方式', prop: 'payWay' },
                { label: '客户名称', prop: 'customerName' },
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
        pickerOptionsCompleteStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endCompleteTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsCompleteEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startCompleteTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        tableData () {
            return this.marketingList.records
        },
        paginationInfo () {
            return {
                total: this.marketingList.total,
                pageNumber: this.marketingList.current,
                pageSize: this.marketingList.size
            }
        },
        ...mapGetters({
            marketingList: 'finance/marketingList'
        })
    },
    methods: {
        onQuery () {
            this.queryParams.pageNumber = 1
            this.findMarketing(this.queryParams)
        },
        onReset () {
            this.queryParams = { ...this.initParams }
            this.findMarketing()
        },
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无营销明细可导出！')
            } else {
                let url = ''
                for (let key in this.queryParams) {
                    url += (key + '=' + (this.queryParams[key] ? this.queryParams[key] : '') + '&')
                }
                location.href = B2bUrl + 'order/api/boss/orders/finance-market/export?access_token=' + sessionStorage.getItem('tokenB2b') + '&' + url
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findMarketing(this.queryParams)
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findMarketing(this.queryParams)
        },
        ...mapActions({
            findMarketing: 'finance/findMarketing'
        })
    },
    mounted () {
        this.initParams = { ...this.queryParams }
        this.findMarketing()
    }
}
</script>