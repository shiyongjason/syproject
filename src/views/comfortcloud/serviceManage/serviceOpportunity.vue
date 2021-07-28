<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont spanflex">
            <span>服务机会</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">经销商名称：</div>
                <div class="query-col-input">
                    <el-input
                        placeholder="请输入经销商名称"
                        v-model="queryParams.agentCompanyName"
                        maxlength="50"
                        clearable
                    ></el-input>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">经销商手机号：</div>
                <div class="query-col-input">
                    <el-input
                        v-model="queryParams.agentPhone"
                        placeholder="请输入经销商手机号"
                        maxlength="11"
                        clearable
                    ></el-input>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">业主手机号：</div>
                <div class="query-col-input">
                    <el-input
                        v-model="queryParams.ownerPhone"
                        placeholder="请输入业主手机号"
                        maxlength="11"
                        clearable
                    ></el-input>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">提醒时间：</div>
                <div class="query-col-input">
                    <el-date-picker
                        v-model="queryParams.startTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="开始日期"
                        :picker-options="pickerOptionsStart"
                    >
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker
                        v-model="queryParams.endTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="结束日期"
                        :picker-options="pickerOptionsEnd"
                    >
                    </el-date-picker>
                </div>
            </div>

            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch"
                    >查 询</el-button
                    >
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudServiceMindList" :isShowIndex='true' :pagination="cloudServiceMindListPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="serviceReminds" slot-scope="scope">
                    <div class="remind" v-for="(info,index) in scope.data.row.serviceReminds" :key="index" v-html="info"></div>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDetail(scope.data.row)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'serviceOpportunity',
    data () {
        return {
            queryParams: {
                agentCompanyName: '',
                ownerPhone: '',
                pageNumber: 1,
                pageSize: 10,
                agentPhone: '',
                endTime: '',
                startTime: ''
            },
            tableLabel: [
                { label: '提醒时间', prop: 'time', formatters: 'dateTime' },
                { label: '业主手机号', prop: 'phone' },
                { label: '服务机会', prop: 'serviceReminds' },
                { label: '经销商名称', prop: 'agentCompanyName' },
                { label: '经销商手机号', prop: 'agentPhone' }
            ],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    methods: {
        ...mapActions({
            findCloudServiceMindList: 'findCloudServiceMindList'
        }),
        async onQuery () {
            await this.findCloudServiceMindList(this.queryParams)
        },
        onSearch () {
            this.onQuery()
        },
        onDetail (val) {
            this.$router.push({
                name: 'equipemtOverview',
                params: {
                    tab: 'RUNTIME_TAB',
                    phone: val.phone
                }
            })
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        }
    },
    mounted () {
        this.onSearch()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudServiceMindList: 'cloudServiceMindList',
            cloudServiceMindListPagination: 'cloudServiceMindListPagination'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .detailLine{
        color: black;
        margin-top: 20px;
    }
    .lastLine{
        margin-bottom: 20px;
    }
    .centerLine{
        position: absolute;
        left: 33%;
    }
    .rightLine{
        position: absolute;
        left: 66%;
    }
    .picContainer{
        display: flex;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .spanflex {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        span {
            &:first-child {
                font-size: 16px;
            }
        }
    }

    .remind {
        text-align: left;
        white-space: normal;
    }

</style>
