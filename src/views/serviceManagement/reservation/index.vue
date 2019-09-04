<template>
    <div class="attribute">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">姓名：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.reservationPerson" placeholder="请输入姓名">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">渠道名称：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.source" style="width: 100%">
                            <el-option label="有赞商城" value="1">
                            </el-option>
                            <el-option label="孩子王成长家" value="2">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">预约状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.reservationStatus" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已预约（未确认）" value="1"></el-option>
                            <el-option label="已预约（已确认）" value="2"></el-option>
                            <el-option label="已完成" value="3"></el-option>
                            <el-option label="取消" value="4"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">预约方式：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.reservationMethod" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="公众号预约" value="1"></el-option>
                            <el-option label="电话预约" value="2"></el-option>
                            <el-option label="管家预约" value="3"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">手机：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.phone" placeholder="请输入手机">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单号：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.channelOrderNo" placeholder="请输入订单号">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">维护时间：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">重置</el-button>
                    </div>
                </div>
            </div>
            <ReservationTable :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
            </ReservationTable>
        </div>
    </div>
</template>

<script>
import ReservationTable from './components/reservationTable'
import { findReservations } from './api/index'
import { mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'reservation',
    components: {
        ReservationTable
    },
    data () {
        return {
            queryParams: {
                reservationPerson: '',
                source: '',
                phone: '',
                reservationStatus: '',
                reservationMethod: '',
                channelOrderNo: '',
                startTime: '',
                endTime: ''
            },
            searchParams: {},
            tableData: [],
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                totalElements: 100
            }
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.endTime)
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
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onQuery () {
            const { ...params } = this.queryParams
            this.searchParams = params
            this.search()
        },
        onReset () {
            this.$set(this.queryParams, 'reservationPerson', '')
            this.$set(this.queryParams, 'source', '')
            this.$set(this.queryParams, 'phone', '')
            this.$set(this.queryParams, 'reservationStatus', '')
            this.$set(this.queryParams, 'reservationMethod', '')
            this.$set(this.queryParams, 'channelOrderNo', '')
            this.$set(this.queryParams, 'startTime', '')
            this.$set(this.queryParams, 'endTime', '')
            this.onQuery()
        },
        async search () {
            this.searchParams.pageSize = this.paginationData.pageSize
            this.searchParams.pageNumber = this.paginationData.pageNumber
            console.log(this.searchParams)
            const { data } = await findReservations(this.searchParams)
            console.log(data)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            this.paginationData.pageNumber = val
            this.search()
        }
    },
    async mounted () {
        this.onQuery()
    }
}
</script>

<style scoped>
.form-add-remove {
    font-size: 22px;
    color: #ff9c31;
    cursor: pointer;
    line-height: 40px;
    vertical-align: top;
}
.flex-wrap-row {
    max-width: 1350px;
}
</style>
