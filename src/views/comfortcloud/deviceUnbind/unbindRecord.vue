<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont spanflex">
            <span>解绑记录</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入手机号" v-model="queryParams.serviceNo" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">设备ID</div>
                <div class="query-col-input">
                    <el-input placeholder="输入设备ID" v-model="queryParams.serviceNo" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="serviceType" slot-scope="scope">
                    {{scope.data.row.serviceType==1?'预约维修':'清洗保养'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
export default {
    name: 'unbindRecord',
    data () {
        return {
            pic: {
                marginLeft: '20px',
                width: '100px',
                height: '100px'
            },
            firstPic: {
                width: '100px',
                height: '100px'
            },
            queryParams: {
                serviceNo: '',
                pageNumber: 1,
                pageSize: 10,
                operator: '',
                endTime: '',
                startTime: ''
            },
            searchParams: {},
            tableData: [],
            tableLabel: [
                { label: '申请时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '服务单号', prop: 'serviceNo' },
                { label: '申请人账号', prop: 'operator', width: '120px' },
                { label: '客户姓名', prop: 'customerName' },
                { label: '客户电话', prop: 'customerPhone' },
                { label: '客户地址', prop: 'customerAddress' },
                { label: '服务类型', prop: 'serviceType' },
                { label: '服务产品', prop: 'product' }
            ],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            detailData: {},
            detailDialogVisible: false,
            addOrderDialogVisible: false
        }
    },
    methods: {
        ...mapActions({
            getServiceManageHistoryList: 'getServiceManageHistoryList'
        }),
        async onQuery () {
            await this.getServiceManageHistoryList(this.searchParams)
            this.tableData = this.serviceHistory.records
            this.pagination = {
                pageNumber: this.serviceHistory.current,
                pageSize: this.serviceHistory.size,
                total: this.serviceHistory.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        createComplaintOrder () {
            this.addOrderDialogVisible = true
        },
        onEdit (val) {
            this.detailData = val
            if (val.pictureUrl) {
                let urls = val.pictureUrl.split(',')
                this.detailData.picUlrs = urls
            } else {
                this.detailData.picUlrs = []
            }
            console.log(this.detailData)
            this.detailDialogVisible = true
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
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
            serviceHistory: 'serviceManageHistoryList'
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
.detailLine {
    color: black;
    margin-top: 20px;
}
.lastLine {
    margin-bottom: 20px;
}
.centerLine {
    position: absolute;
    left: 33%;
}
.rightLine {
    position: absolute;
    left: 66%;
}
.picContainer {
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
</style>
