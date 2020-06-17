<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                <el-tab-pane label="特价活动" name="spike"></el-tab-pane>
                <el-tab-pane label="专题活动" name="special"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col" v-if="tabName == 'special'">
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
            <basicTable :tableLabel="tableColumn" :tableData="tableData" :pagination="paginationData" :isAction="true" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onLookInfo(scope.data.row)">查看明细</el-button>
                </template>
            </basicTable>
            <div class="table-cont-title">
                <span class="table-title-name">明细数据</span>
            </div>
            <basicTable :tableLabel="tableLabelInfo" :tableData="tableDataInfo" :pagination="paginationDataInfo" @onSizeChange="onSizeChangeInfo" @onCurrentChange="onCurrentChangeInfo"></basicTable>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { B2bUrl } from '@/api/config'
export default {
    name: 'activityUseInfo',
    data () {
        return {
            tabName: 'spike',
            queryParams: {
                merchantName: '',
                startTime: '',
                endTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            queryParamsInfo: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [],
            tableData: [],
            paginationData: {},
            tableLabelInfo: [],
            tableDataInfo: [],
            paginationDataInfo: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapState('dataBoard', {
            spikePriceData: 'spikePriceData',
            spikePriceInfo: 'spikePriceInfo',
            specialPriceData: 'specialPriceData',
            specialPriceInfo: 'specialPriceInfo'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.startTime)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        tableColumn () {
            return this.tableLabel.filter(item => {
                const itemAuthLen = item.auth ? item.auth.length : 0
                const isShowByTab = itemAuthLen == 0 || item.auth.includes(this.tabName)
                return isShowByTab
            })
        }
    },
    methods: {
        init () {
            this.resetParams = { ...this.queryParams }
            this.onTab()
        },
        onTab () {
            this.onQuery()
            if (this.tabName == 'spike') {
                this.tableLabelInfo = [
                    { label: '订单编号', prop: 'orderNo' },
                    { label: '会员店', prop: 'memberName' },
                    { label: '会员账号', prop: 'userName' },
                    { label: '所属商家', prop: 'merchantName' },
                    { label: '支付方式', prop: 'payMethod' },
                    { label: '支付时间', prop: 'payTime', formatters: 'dateTimes' },
                    { label: '购买数量', prop: 'amount' },
                    { label: '收货地址', prop: 'address' },
                    { label: '收货人', prop: 'name' },
                    { label: '收货电话', prop: 'mobile' }
                ]
            } else if (this.tabName == 'special') {
                this.tableLabelInfo = [
                    { label: '商品SPU', prop: 'spuCode' },
                    { label: '商品名称', prop: 'spuName' },
                    { label: '曝光UV', prop: 'exposureUV' },
                    { label: '曝光PV', prop: 'exposurePV' },
                    { label: '进入UV', prop: 'enterUV' },
                    { label: '进入PV', prop: 'enterPV' },
                    { label: '加购次数', prop: 'addToShopCart' },
                    { label: '提交订单数', prop: 'orderSubmits' },
                    { label: '提交订单金额', prop: 'orderAmount', formatters: 'moneyShow' }
                ]
            }
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            if (this.tabName == 'spike') {
                this.getSpikePriceData()
            } else if (this.tabName == 'special') {
                this.getSpecialPriceData()
            }
            this.tableDataInfo = []
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            if (this.tabName == 'spike') {
                this.getSpikePriceData()
            } else if (this.tabName == 'special') {
                this.getSpecialPriceData()
            }
            this.tableDataInfo = []
        },
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无数据可导出！')
            } else {
                if (this.tabName == 'spike') {
                    window.location = B2bUrl + 'ops/openapi/spike/bi/export?startTime=' + this.queryParams.startTime +
                        '&endTime=' + this.queryParams.endTime +
                        '&access_token=' + sessionStorage.getItem('tokenB2b')
                } else if (this.tabName == 'special') {
                    window.location = B2bUrl + 'ops/openapi/bi/theme-activity/export?startTime=' + this.queryParams.startTime +
                        '&endTime=' + this.queryParams.endTime +
                        '&merchantName=' + this.queryParams.merchantName +
                        '&access_token=' + sessionStorage.getItem('tokenB2b')
                }
            }
        },
        onLookInfo ({ id }) {
            if (this.tabName == 'spike') {
                this.queryParamsInfo.spikeId = id
                this.getSpikePriceInfo()
            } else if (this.tabName == 'special') {
                this.queryParamsInfo.id = id
                this.getSpecialPriceInfo()
            }
            this.tableDataInfo = []
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            if (this.tabName == 'spike') {
                this.getSpikePriceData()
            } else if (this.tabName == 'special') {
                this.getSpecialPriceData()
            }
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            if (this.tabName == 'spike') {
                this.getSpikePriceData()
            } else if (this.tabName == 'special') {
                this.getSpecialPriceData()
            }
        },
        onSizeChangeInfo (val) {
            this.queryParamsInfo.pageSize = val
            if (this.tabName == 'spike') {
                this.getSpikePriceInfo()
            } else if (this.tabName == 'special') {
                this.getSpecialPriceInfo()
            }
        },
        onCurrentChangeInfo (val) {
            this.queryParamsInfo.pageNumber = val.pageNumber
            if (this.tabName == 'spike') {
                this.getSpikePriceInfo()
            } else if (this.tabName == 'special') {
                this.getSpecialPriceInfo()
            }
        },
        ...mapActions('dataBoard', [
            'findSpikePriceData',
            'findSpikePriceInfo',
            'findSpecialPriceData',
            'findSpecialPriceInfo'
        ]),
        async getSpikePriceData () {
            await this.findSpikePriceData(this.queryParams)
            this.tableLabel = [
                { label: '所属商家', prop: 'merchantName', auth: ['special'] },
                { label: '活动名称', prop: 'spikeName' },
                { label: '页面UV', prop: 'pageUv' },
                { label: '页面PV', prop: 'pagePv' },
                { label: '商详页访问UV', prop: 'skuPageUv' },
                { label: '商详页访问PV', prop: 'skuPagePv' },
                { label: '提交订单数', prop: 'orderCommits' },
                { label: '提交订单金额', prop: 'orderCommitsAmount', formatters: 'moneyShow' }
            ]
            this.tableData = this.spikePriceData.records
            this.paginationData = {
                pageNumber: this.spikePriceData.current,
                pageSize: this.spikePriceData.size,
                total: this.spikePriceData.total
            }
        },
        async getSpikePriceInfo () {
            await this.findSpikePriceInfo(this.queryParamsInfo)
            this.tableDataInfo = this.spikePriceInfo.records
            this.paginationDataInfo = {
                pageNumber: this.spikePriceInfo.current,
                pageSize: this.spikePriceInfo.size,
                total: this.spikePriceInfo.total
            }
        },
        async getSpecialPriceData () {
            await this.findSpecialPriceData(this.queryParams)
            this.tableLabel = [
                { label: '所属商家', prop: 'merchantName', auth: ['special'] },
                { label: '活动名称', prop: 'activityName' },
                { label: '页面UV', prop: 'pageUv' },
                { label: '页面PV', prop: 'pagePv' },
                { label: '商详页访问UV', prop: 'productUv' },
                { label: '商详页访问PV', prop: 'productPv' },
                { label: '提交订单数', prop: 'orderCommits' },
                { label: '提交订单金额', prop: 'orderAmount', formatters: 'moneyShow' }
            ]
            this.tableData = this.specialPriceData.records
            this.paginationData = {
                pageNumber: this.specialPriceData.current,
                pageSize: this.specialPriceData.size,
                total: this.specialPriceData.total
            }
        },
        async getSpecialPriceInfo () {
            await this.findSpecialPriceInfo(this.queryParamsInfo)
            this.tableDataInfo = this.specialPriceInfo.records
            this.paginationDataInfo = {
                pageNumber: this.specialPriceInfo.current,
                pageSize: this.specialPriceInfo.size,
                total: this.specialPriceInfo.total
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__header {
    margin: 0;
}
.query-cont {
    margin-top: 0 !important;
}
</style>
