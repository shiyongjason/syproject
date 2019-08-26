<template>
    <div class="coupon">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  v-model="queryParams.businessName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">申请时间：</div>
                    <div class="query-col-input">
                        <el-date-picker
                            v-model="queryParams.beginApplyTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="开始日期"
                            :picker-options="pickerOptionsStart"
                        >
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker
                            v-model="queryParams.endApplyTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="结束日期"
                            :picker-options="pickerOptionsEnd"
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
                                  v-model="queryParams.legalPerson" maxlength="50" placeholder="请输入"></el-input>
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
                        <!--0:新申请 10:审核通过 11:审核不通过-->
                        <el-select v-model="queryParams.status" placeholder="全部">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="新申请" :value="0"></el-option>
                            <el-option label="审核通过" :value="10"></el-option>
                            <el-option label="审核不通过" :value="11"></el-option>
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
                    let beginDateVal = this.queryParams.endApplyTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.beginApplyTime
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
                beginApplyTime: '',
                endApplyTime: '',
                businessName: '',
                legalPerson: '',
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
            if (params.beginApplyTime) params.beginApplyTime = this.$root.$options.filters.formatDate(params.beginApplyTime)
            if (params.endApplyTime) params.endApplyTime = this.$root.$options.filters.formatDate(params.endApplyTime)
            const { data } = await findMemberList(params)
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
