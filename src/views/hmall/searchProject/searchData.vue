<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams_one.startTime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                        <el-date-picker v-model="queryParams_one.endTime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">优惠券名称：</div>
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
        <!-- <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.orderTimeStart" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.orderTimeEnd" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">优惠券名称：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams_one.status">
                            <el-option v-for="item in terminalOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary">查询</h-button>
                    <h-button>重置</h-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" isShowIndex>
                <template slot="action" slot-scope="scope">
                    <h-button table></h-button>
                </template>
            </basicTable>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.orderTimeStart" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.orderTimeEnd" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">优惠券名称：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams_one.status">
                            <el-option v-for="item in terminalOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary">查询</h-button>
                    <h-button>重置</h-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" isShowIndex>
                <template slot="action" slot-scope="scope">
                    <h-button table></h-button>
                </template>
            </basicTable>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.orderTimeStart" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.orderTimeEnd" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">优惠券名称：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams_one.status">
                            <el-option v-for="item in terminalOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary">查询</h-button>
                    <h-button>重置</h-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" isShowIndex>
                <template slot="action" slot-scope="scope">
                    <h-button table></h-button>
                </template>
            </basicTable>
        </div> -->
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { TERMINAL_TYPE } from './const/index'
export default {
    name: 'searchDataList',
    data () {
        return {
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
            pagination_one: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo.principal
        }),
        ...mapState('searchProject', {
            searchWordData: 'searchWordData'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams_one.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams_one.startTime
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

        },
        onSizeChange_one (value) {
            this.queryParams_one.pageSize = value
            this.getSearchWordList()
        },
        onCurrentChange_one (value) {
            this.queryParams_one.pageNumber = value.pageNumber
            this.getSearchWordList()
        },
        ...mapActions('searchProject', [
            'findSearchWordList'
        ]),
        async getSearchWordList () {
            await this.findSearchWordList(this.queryParams_one)
            this.tableData_one = this.searchWordData.records
            this.pagination_one = {
                pageNumber: this.searchWordData.current,
                pageSize: this.searchWordData.size,
                total: this.searchWordData.total
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
