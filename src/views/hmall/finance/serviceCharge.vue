<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="table-cont-title">
                <span class="table-title-name">账户概览</span>
                <el-button name="hosjoy-color" @click="onWithdrawal">提现</el-button>
            </div>
            <div class="balance-cont-row">
                <div class="balance-cont-col">
                    <div class="balance-col-icon">
                        <i class="icon iconfont hosjoy_money"></i>
                    </div>
                    <div class="balance-col-money">
                        <p>{{bankAccountInfo.totalBalance | money}}</p>
                        <p>平台服务费总资产<span>（元）</span></p>
                    </div>
                </div>
            </div>
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
                        <el-date-picker v-model="queryParams.withdrawTimeStart" type="date" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.withdrawTimeEnd" type="date" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">查询</el-button>
                        <!-- <el-button type="primary" class="ml20" @click="onRest()">重置</el-button> -->
                        <button type="button" class="el-button ml20 el-button--primary" @click="onExport"><span>导出</span></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- :rowKey="rowKey" -->
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" @onSortChange="onSortChange"
                :isShowIndex='true'>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { B2bUrl } from '@/api/config'
export default {
    data () {
        return {
            queryParams: {
                companyName: '',
                withdrawTimeStart: '',
                withdrawTimeEnd: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '客户名称', prop: 'companyName' },
                { label: '提现时间', prop: 'withdrawTime', formatters: 'dateTime' },
                { label: '提现金额（元）', prop: 'amount', formatters: 'money', sortable: true },
                { label: '服务费（元）', prop: 'serviceFee', formatters: 'money', sortable: true }
            ]
        }
    },
    computed: {
        ...mapGetters('finance', {
            serviceChargeInfo: 'serviceChargeInfo',
            bankAccountInfo: 'bankAccountInfo'
        }),
        tableData () {
            return this.serviceChargeInfo.records
        },
        paginationInfo () {
            return {
                pageNumber: this.serviceChargeInfo.current,
                pageSize: this.serviceChargeInfo.size,
                total: this.serviceChargeInfo.total
            }
        },
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
    mounted () {
        this.findServiceChargeAction()
        this.findBankAccountInfo()
    },
    methods: {
        ...mapActions('finance', {
            findServiceCharge: 'findServiceCharge',
            findBankAccountInfo: 'findBankAccountInfo'
        }),
        onWithdrawal () {
            this.$router.push('/hmall/finance/withdrawal')
        },

        searchList () {
            this.queryParams.pageNumber = 1
            this.findServiceChargeAction()
        },

        onRest () {
            this.queryParams = {
                companyName: '',
                withdrawTimeStart: '',
                withdrawTimeEnd: '',
                pageNumber: 1,
                pageSize: 10
            }
            this.findServiceChargeAction()
        },

        onExport () {
            let url = ''
            for (let key in this.queryParams) {
                url += (key + '=' + (this.queryParams[key] ? this.queryParams[key] : '') + '&')
            }
            url += 'access_token=' + sessionStorage.getItem('token')
            location.href = B2bUrl + 'payment/api/boss/service-fee/withdraws/received/export?' + url
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findServiceChargeAction()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findServiceChargeAction()
        },

        onSortChange (val) {
            if (val.prop === 'amount') {
                this.queryParams['sort.property'] = 'amount'
                this.queryParams['sort.direction'] = val.order === 'descending' ? 'DESC' : 'ASC'
            }
            if (val.prop === 'serviceFee') {
                this.queryParams['sort.property'] = 'service_fee'
                this.queryParams['sort.direction'] = val.order === 'descending' ? 'DESC' : 'ASC'
            }
            this.findServiceChargeAction()
        },

        findServiceChargeAction () {
            this.findServiceCharge(this.queryParams)
        }
    }
}
</script>

<style lang="scss" scoped>
.balance-cont-row {
    display: flex;
    padding: 10px 10px 40px 10px;
}
.balance-cont-col {
    display: inline-flex;
    flex: 1;
    align-items: center;

    .balance-col-icon {
        display: inline-block;
        width: 64px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        border-radius: 50%;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);

        i {
            font-size: 30px;
            color: $whiteColor;
        }
    }

    &:nth-child(1) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(255, 120, 117, 1) 0%,
                rgba(255, 77, 79, 1) 100%
            );
        }
    }
    &:nth-child(2) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(255, 120, 117, 1) 0%,
                rgba(255, 77, 79, 1) 100%
            );
        }
    }
    &:nth-child(3) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(153, 153, 153, 1) 0%,
                rgba(102, 102, 102, 1) 100%
            );
        }
    }
    &:nth-child(4) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(105, 192, 255, 1) 0%,
                rgba(24, 144, 255, 1) 100%
            );
        }
    }

    .balance-col-money {
        margin-left: 16px;
        display: inline-block;

        p:first-child {
            line-height: 45px;
            font-size: 32px;
        }
        p:last-child {
            line-height: 20px;
            span {
                color: #666;
            }
        }
    }
}
</style>