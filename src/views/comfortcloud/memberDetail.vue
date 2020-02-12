<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">登录时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="date" value-format='yyyy-MM-dd' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="date" value-format='yyyy-MM-dd' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">手机号： </div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.phone" placeholder="输入用户手机号" maxlength="50"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :isShowIndex='true' :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="false" :actionMinWidth='280'>

            </basicTable>
        </div>
    </div>
</template>
<script>
// import { interfaceUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'memberdetail',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            memberDetail: 'iotmemberDetail'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                endTime: '',
                startTime: '',
                phone: this.$route.query.phone
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '手机号', prop: 'phone' },
                { label: '登录时间', prop: 'loginTime', width: '120px' },
                { label: '登录地址', prop: 'loginAddress' },
                { label: '登录时APP的版本号', prop: 'appVer' },
                { label: '手机操作系统', prop: 'phoneType' },
                { label: '登录终端操作系统版本', prop: 'phoneOsVer' },
                { label: '登录终端品牌 ', prop: 'phoneBrand' },
                { label: '登录终端机型 ', prop: 'phoneModel' }
            ]
        }
    },
    watch: {

    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findIotMemberDetail: 'findIotMemberDetail'
        }),
        async onQuery () {
            // console.log(this.searchParams)
            await this.findIotMemberDetail(this.searchParams)
            console.log(this.memberDetail)
            this.tableData = this.memberDetail.pageContent
            this.pagination = {
                pageNumber: this.memberDetail.pageNumber,
                pageSize: this.memberDetail.pageSize,
                total: this.memberDetail.totalElements
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'product', '')
            this.$set(this.queryParams, 'platformType', '')
            this.$set(this.queryParams, 'beginDate', '')
            this.$set(this.queryParams, 'endDate', '')
            this.onSearch()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        }
    }
}
</script>
<style lang='scss' scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        flex: 1;
        &:first-child {
            font-size: 16px;
        }
        &:last-child {
            text-align: right;
        }
    }
}
</style>
