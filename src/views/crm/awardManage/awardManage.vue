<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">推荐人姓名/账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.userAccount" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">发放状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true>
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已发放" :value="1"></el-option>
                            <el-option label="待发放" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">信用评审通过时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">认证时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="onQuery">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tag size="medium" class="eltagtop">
                已筛选 {{0}} 项 &nbsp; 待发放：{{5}}个；已发放：{{10}}个；
            </el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120 :isShowIndex='true'>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="doPlay(scope.data.row)" v-if="scope.data.row.sendSatus === 1">发放</h-button>
                    <span v-else-if="scope.data.row.sendSatus === 2">已发放</span>
                    <span v-else>-</span>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { updateRecommenderPaid } from '@/views/crm/recommender/api'
import { deleteAppVersion } from '@/views/appUpdate/api'

export default {
    name: 'awardManage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '200' },
                { label: '信用评级', prop: 'creditLevel', width: '100' },
                { label: '推荐人账号', prop: 'recommenderUserMobile', width: '120' },
                { label: '推荐人', prop: 'recommenderUserName', width: '150' },
                { label: '应奖励金额', prop: 'rewardAmount', width: '150' },
                { label: '发放状态', prop: 'sendSatus', width: '100' },
                { label: '信用评审通过时间', prop: 'creditApprovedTime', width: '200', sortable: 'creditApprovedTime', formatters: 'dateTimes' },
                { label: '认证时间', prop: 'authenticationTime', width: '150', sortable: 'authenticationTime', formatters: 'dateTimes' }
            ]
        }
    },
    computed: {
        pickerOptionsStart (date) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = date
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd (date) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = date
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        ...mapState({
            rcommenderRewardList: state => state.crmRecommeder.rcommenderRewardList
        })
    },
    methods: {
        ...mapActions({
            getRecommenderRewardList: 'crmRecommeder/getRecommenderRewardList'
        }),
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams.createTimeSortType = val.order === 'descending' ? '2' : '1'
                this.onQuery()
            }
        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
        },
        doPlay (row) {
            console.log(row)
            this.$confirm(`是否确认已给推荐官发放这笔奖励？`, '确认发放', {
                confirmButtonText: '确认已发放',
                cancelButtonText: '暂未发放'
            }).then(async () => {
                await updateRecommenderPaid(row)
                this.onQuery()
            })
        },
        async onQuery () {
            await this.getRecommenderRewardList(this.queryParams)
            this.tableData = this.rcommenderRewardList.records || []
            this.paginationInfo = {
                pageNumber: this.rcommenderRewardList.current,
                pageSize: this.rcommenderRewardList.size,
                total: this.rcommenderRewardList.total
            }
        }
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        this.onQuery()
    }
}
</script>

<style scoped>
    .eltagtop {
        margin-bottom: 10px;
    }
</style>
