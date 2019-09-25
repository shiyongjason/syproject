<template>
    <div class="coupon">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.companyName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">申请时间：</div>
                    <div class="query-col-input">
                        <el-date-picker
                            v-model="queryParams.startTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="开始日期"
                            :picker-options="pickerOptionsStart"
                        >
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker
                            v-model="queryParams.endTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="结束日期"
                            :picker-options="pickerOptionsEnd"
                            default-time="23:59:59"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">会员店名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" v-model="queryParams.memberName"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">法人姓名：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.legalPersonName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">法人手机号：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.legalPersonMobile" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">审核状态：</div>
                    <div class="query-col-input">
                        <!--0：审核通过，10：待提交认证资料，20：待审核，30：审核不通过-->
                        <el-select v-model="queryParams.status" placeholder="全部">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="审核通过" :value="0"></el-option>
                            <el-option label="待提交认证资料" :value="10"></el-option>
                            <el-option label="待审核" :value="20"></el-option>
                            <el-option label="审核不通过" :value="30"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">所属平台公司：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.merchantName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="findMemberList">
                            搜索
                        </el-button>
                        <el-button type="primary" class="ml20" @click="reset">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
            <memberTable
                :tableData="tableData"
                :paginationData="paginationData"
                @onQuery="findMemberList"
                @onSizeChange="onSizeChange"
                @onCurrentChange="onCurrentChange"></memberTable>
        </div>
    </div>
</template>

<script>
import memberTable from './components/memberTable'
import { findMemberList } from './api/index'
export default {
    name: 'member',
    components: {
        memberTable
    },
    computed: {
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
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    data () {
        return {
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                startTime: '',
                endTime: '',
                companyName: '',
                legalPersonName: '',
                legalPersonMobile: '',
                memberName: '',
                merchantName: '',
                status: ''
            },
            tableData: [{ id: 1, orderNo: 'xx8888888' }],
            paginationData: {},
            tempQueryParams: {}
        }
    },
    methods: {
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findMemberList()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.findMemberList()
        },
        async findMemberList () {
            const { ...params } = this.queryParams
            if (params.startTime) params.startTime = this.$root.$options.filters.formatDate(params.startTime, 'YYYY-MM-DD HH:mm:ss')
            if (params.endTime) params.endTime = this.$root.$options.filters.formatDate(params.endTime, 'YYYY-MM-DD HH:mm:ss')
            const { data } = await findMemberList(params)
            console.log(data)
            // const { data } = await findMemberList({
            //     pageSize: 10,
            //     pageNumber: 1
            // })
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        reset () {
            this.queryParams = { ...this.tempQueryParams }
            this.findMemberList()
        }
    },
    mounted () {
        this.findMemberList()
        this.tempQueryParams = { ...this.queryParams }
    }
}
</script>

<style scoped>

</style>
