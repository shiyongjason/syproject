<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams_one.startTime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart_one"></el-date-picker>
                        <el-date-picker v-model="queryParams_one.endTime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd_one" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">终端：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams_one.source">
                            <el-option v-for="item in terminalOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="onQuery_one">查询</h-button>
                    <h-button @click="onReset_one">重置</h-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel_one" :tableData="tableData_one" :pagination="pagination_one" isShowIndex isAction @onSizeChange="onSizeChange_one" @onCurrentChange="onCurrentChange_one">
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onSeeInfo(scope.data.row)">查看详情</h-button>
                </template>
            </basicTable>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams_two.startTime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart_two"></el-date-picker>
                        <el-date-picker v-model="queryParams_two.endTime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd_two" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">终端：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams_two.source">
                            <el-option v-for="item in terminalOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="onQuery_two">查询</h-button>
                    <h-button @click="onReset_two">重置</h-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel_two" :tableData="tableData_two" :pagination="pagination_two" @onSizeChange="onSizeChange_two" @onCurrentChange="onCurrentChange_two">
            </basicTable>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams_three.startTime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart_three"></el-date-picker>
                        <el-date-picker v-model="queryParams_three.endTime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd_three" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">终端：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams_three.source">
                            <el-option v-for="item in terminalOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="onQuery_three">查询</h-button>
                    <h-button @click="onReset_three">重置</h-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel_three" :tableData="tableData_three" :pagination="pagination_three" @onSizeChange="onSizeChange_three" @onCurrentChange="onCurrentChange_three">
            </basicTable>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams_four.startTime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart_four"></el-date-picker>
                        <el-date-picker v-model="queryParams_four.endTime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd_four" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">终端：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams_four.source">
                            <el-option v-for="item in terminalOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="onQuery_four">查询</h-button>
                    <h-button @click="onReset_four">重置</h-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel_four" :tableData="tableData_four" :pagination="pagination_four" @onSizeChange="onSizeChange_four" @onCurrentChange="onCurrentChange_four">
            </basicTable>
        </div>
        <el-drawer class="page-body-drawer" title="详情" :visible.sync="drawer" size='640px'>
            <basicTable :tableLabel="tableLabel_info" :tableData="tableData_info" :pagination="pagination_info" @onSizeChange="onSizeChange_info" @onCurrentChange="onCurrentChange_info">
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onSeeInfo(scope.data.row)">查看详情</h-button>
                </template>
            </basicTable>
            <div class="drawer-footer">
                <h-button @click="drawer = false">关闭</h-button>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { TERMINAL_TYPE } from './const/index'
export default {
    name: 'searchDataList',
    data () {
        return {
            drawer: false,
            queryParams_one: {
                source: '',
                startTime: '',
                endTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams_one: {},
            terminalOption: TERMINAL_TYPE,
            tableLabel_one: [
                { label: '会员名称', prop: 'memberName' },
                { label: '会员账号', prop: 'account' },
                { label: '搜索词', prop: 'searchWord' },
                { label: '时间', prop: 'time', formatters: 'dateTime' },
                { label: '点击商品次数', prop: 'spuClicks' },
                { label: '点击商品个数', prop: 'spuCount' }
            ],
            tableData_one: [],
            pagination_one: {},
            queryParams_info: {
                searchId: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel_info: [
                { label: '商品编码', prop: 'spuCode' },
                { label: '商品名称', prop: 'spuName' }
            ],
            tableData_info: [],
            pagination_info: {},
            queryParams_two: {
                source: '',
                startTime: '',
                endTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams_two: {},
            tableLabel_two: [
                { label: '日期', prop: 'date', formatters: 'date' },
                { label: '搜索UV', prop: 'searchUv' },
                { label: '搜索PV', prop: 'searchCount' },
                { label: '首页UV', prop: 'homepageUv' },
                { label: '搜索UV占比', prop: 'searchUserPercent' },
                { label: '有效搜索PV占比', prop: 'effectiveSearchPercent' }
            ],
            tableData_two: [],
            pagination_two: {},
            // 点击率
            queryParams_three: {
                source: '',
                startTime: '',
                endTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams_three: {},
            tableLabel_three: [
                { label: '搜索词（次数前10）', prop: 'word' },
                { label: '位置（前10）', prop: 'position' },
                { label: '点击率', prop: 'clickRate' }
            ],
            tableData_three: [],
            pagination_three: {},
            // 无结果
            queryParams_four: {
                source: '',
                startTime: '',
                endTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams_four: {},
            tableLabel_four: [
                { label: '日期', prop: 'time', formatters: 'date' },
                { label: '账号', prop: 'account' },
                { label: '会员名称', prop: 'memberName' },
                { label: '无结果词', prop: 'word' }
            ],
            tableData_four: [],
            pagination_four: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo.principal
        }),
        ...mapState('searchProject', {
            searchWordData: 'searchWordData',
            searchWordInfo: 'searchWordInfo',
            validSearchData: 'validSearchData',
            clickRateData: 'clickRateData',
            noResultData: 'noResultData'
        }),
        pickerOptionsStart_one () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams_one.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd_one () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams_one.startTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsStart_two () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams_two.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd_two () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams_two.startTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsStart_three () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams_three.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd_three () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams_three.startTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsStart_four () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams_four.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd_four () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams_four.startTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    methods: {
        init () {
            this.resetParams_one = { ...this.queryParams_one }
            this.onQuery_one()
            this.resetParams_two = { ...this.queryParams_two }
            this.onQuery_two()
            this.resetParams_three = { ...this.queryParams_three }
            this.onQuery_three()
            this.resetParams_four = { ...this.queryParams_four }
            this.onQuery_four()
        },
        onQuery_one () {
            this.queryParams_one.pageNumber = 1
            this.getSearchWordList()
        },
        onReset_one () {
            this.queryParams_one = { ...this.resetParams_one }
            this.getSearchWordList()
        },
        onSeeInfo ({ searchId }) {
            this.drawer = true
            this.queryParams_info.searchId = searchId
            this.getSearchWordInfo()
        },
        onSizeChange_one (value) {
            this.queryParams_one.pageSize = value
            this.getSearchWordList()
        },
        onCurrentChange_one (value) {
            this.queryParams_one.pageNumber = value.pageNumber
            this.getSearchWordList()
        },
        onSizeChange_info (value) {
            this.queryParams_info.pageSize = value
            this.getSearchWordInfo()
        },
        onCurrentChange_info (value) {
            this.queryParams_info.pageNumber = value.pageNumber
            this.getSearchWordInfo()
        },
        onQuery_two () {
            this.queryParams_two.pageNumber = 1
            this.getValidSearchList()
        },
        onReset_two () {
            this.queryParams_two = { ...this.resetParams_two }
            this.getValidSearchList()
        },
        onSizeChange_two (value) {
            this.queryParams_two.pageSize = value
            this.getValidSearchList()
        },
        onCurrentChange_two (value) {
            this.queryParams_two.pageNumber = value.pageNumber
            this.getValidSearchList()
        },
        onQuery_three () {
            this.queryParams_three.pageNumber = 1
            this.getClickRateList()
        },
        onReset_three () {
            this.queryParams_three = { ...this.resetParams_three }
            this.getClickRateList()
        },
        onSizeChange_three (value) {
            this.queryParams_three.pageSize = value
            this.getClickRateList()
        },
        onCurrentChange_three (value) {
            this.queryParams_three.pageNumber = value.pageNumber
            this.getClickRateList()
        },
        onQuery_four () {
            this.queryParams_four.pageNumber = 1
            this.getNoResultList()
        },
        onReset_four () {
            this.queryParams_four = { ...this.resetParams_four }
            this.getNoResultList()
        },
        onSizeChange_four (value) {
            this.queryParams_four.pageSize = value
            this.getNoResultList()
        },
        onCurrentChange_four (value) {
            this.queryParams_four.pageNumber = value.pageNumber
            this.getNoResultList()
        },
        ...mapActions('searchProject', [
            'findSearchWordList',
            'findSearchWordInfo',
            'findValidSearchList',
            'findClickRateList',
            'findNoResultList'
        ]),
        async getSearchWordList () {
            await this.findSearchWordList(this.queryParams_one)
            this.tableData_one = this.searchWordData.records
            this.pagination_one = {
                pageNumber: this.searchWordData.current,
                pageSize: this.searchWordData.size,
                total: this.searchWordData.total
            }
        },
        async getSearchWordInfo () {
            await this.findSearchWordInfo(this.queryParams_info)
            this.tableData_info = this.searchWordInfo.records
            this.pagination_info = {
                pageNumber: this.searchWordInfo.current,
                pageSize: this.searchWordInfo.size,
                total: this.searchWordInfo.total
            }
        },
        async getValidSearchList () {
            await this.findValidSearchList(this.queryParams_two)
            this.tableData_two = this.validSearchData.records
            this.pagination_two = {
                pageNumber: this.validSearchData.current,
                pageSize: this.validSearchData.size,
                total: this.validSearchData.total
            }
        },
        async getClickRateList () {
            await this.findClickRateList(this.queryParams_three)
            this.tableData_three = this.clickRateData.records
            this.pagination_three = {
                pageNumber: this.clickRateData.current,
                pageSize: this.clickRateData.size,
                total: this.clickRateData.total
            }
        },
        async getNoResultList () {
            await this.findNoResultList(this.queryParams_four)
            this.tableData_four = this.noResultData.records
            this.pagination_four = {
                pageNumber: this.noResultData.current,
                pageSize: this.noResultData.size,
                total: this.noResultData.total
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
