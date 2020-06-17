<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.createEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">所属商家：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入所属商家">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="onQuery">搜索</el-button>
                <el-button type="primary" @click="onReset">重置</el-button>
                <el-button type="primary" @click="onExport">导出</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                <template slot="couponType" slot-scope="scope">
                    <span v-if="scope.data.row.couponType == 1">满减</span>
                    <span v-if="scope.data.row.couponType == 2">无门槛</span>
                    <span v-if="scope.data.row.couponType == 3">折扣</span>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { B2bUrl } from '@/api/config'
export default {
    name: 'couponsUseInfo',
    data () {
        return {
            queryParams: {
                merchantName: '',
                createStartTime: '',
                createEndTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '所属商家', prop: 'merchantName' },
                { label: '优惠券名称', prop: 'couponName' },
                { label: '优惠券ID', prop: 'couponCode' },
                { label: '优惠券类型', prop: 'couponType' },
                { label: '优惠券金额（元）', prop: 'couponValue', formatters: 'moneyShow' },
                { label: '制作张数', prop: 'totalQuantity' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTimes' },
                { label: '发放张数', prop: 'distributeQuantity' },
                { label: '领取张数', prop: 'receiveQuantity' },
                { label: '使用张数', prop: 'usedQuantity' },
                { label: '使用金额', prop: 'amountUsed', formatters: 'moneyShow' },
                { label: '使用此优惠券商品总金额', prop: 'totalAmount', formatters: 'moneyShow' }
            ],
            tableData: [],
            paginationData: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapState('dataBoard', {
            couponUseData: 'couponUseData'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.createEndTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.createStartTime)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        init () {
            this.resetParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getCouponUseData()
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.getCouponUseData()
        },
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无数据可导出！')
            } else {
                window.location = B2bUrl + 'ops/api/coupon/statistics/use-detail/page/export?merchantName=' + this.queryParams.merchantName +
                    '&createStartTime=' + this.queryParams.createStartTime +
                    '&createEndTime=' + this.queryParams.createEndTime +
                    '&access_token=' + sessionStorage.getItem('tokenB2b')
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.getCouponUseData()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getCouponUseData()
        },
        ...mapActions('dataBoard', [
            'findCouponUseData'
        ]),
        async getCouponUseData () {
            await this.findCouponUseData(this.queryParams)
            this.tableData = this.couponUseData.records
            this.paginationData = {
                pageNumber: this.couponUseData.current,
                pageSize: this.couponUseData.size,
                total: this.couponUseData.total
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
</style>
