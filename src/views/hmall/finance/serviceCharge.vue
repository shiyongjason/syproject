<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="table-cont-title">账户概览</div>
            <div class="table-cont-title">服务费收取明细</div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">客户名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">提现时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.withdrawTimeStart" type="date" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.withdrawTimeEnd" type="date" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">查询</el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">重置</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="serviceChargeList" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :rowKey="rowKey"
                :isShowIndex='true'>
                <!-- <template slot="brandName" slot-scope="scope">
                    {{scope.data.row.brandName}}{{scope.data.row.brandNameEn}}
                </template>
                <template slot="status" slot-scope="scope">
                    <span :class="scope.data.row.status==1?'colred':'colgry'">{{scope.data.row.status==1?'启用':'禁用'}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onEditSpu(scope.data.row)">编辑</el-button>
                    <el-button :type="scope.data.row.status ==1?'primary':''" size="mini" plain @click="onChangeSpu(scope.data.row)" v-text="scope.data.row.status === 1 ? '禁用' : '启用'">
                    </el-button>
                </template> -->
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            queryParams: {
                companyName: '',
                withdrawTimeStart: '',
                withdrawTimeEnd: ''
            },
            tableLabel: [
                { label: '客户名称', prop: 'companyName' },
                { label: '提现时间', prop: 'withdrawTime', formatters: 'dateTime' },
                { label: '提现金额（元）', prop: 'amount', formatters: 'money' },
                { label: '服务费（元）', prop: 'serviceFee', formatters: 'money' }
            ]
        }
    },
    computed: {
        ...mapGetters({
            serviceChargeList: 'finance/serviceChargeList'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.queryParams.withdrawTimeEnd
                    if (endDateVal) {
                        return time.getTime() >= new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.withdrawTimeStart
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    methods: {
        ...mapActions({
            findServiceCharge: 'finance/findServiceCharge'
        })
    },
    mounted () {
        this.findServiceCharge()
    }
}
</script>