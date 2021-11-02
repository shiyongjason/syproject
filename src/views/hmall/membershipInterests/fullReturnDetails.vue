<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="balance-cont-row">
                <div class="balance-cont-col">
                    <div class="balance-col-icon">
                        <i class="icon iconfont hosjoy_money"></i>
                    </div>
                    <div class="balance-col-money">
                        <p>{{ totalBalances| moneyShow}}</p>
                        <p>平台服务费总资产<span>（元）</span></p>
                    </div>
                </div>
            </div>
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">会员账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.memberAccount" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商家账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.merchantAccount" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.flowType">
                            <el-option v-for="item in detailType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" placeholder="开始日期" value-format="yyyy-MM-ddTHH:mm:ss" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="searchList()">查询</h-button>
                    <h-button class="ml20" @click="onRest()">重置</h-button>
                    <h-button @click="onExport">导出</h-button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" @onSortChange="onSortChange">
                <template slot="flowType" slot-scope="scope">
                    {{arrayToMap(detailType).get(scope.data.row.flowType)}}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { B2bUrl } from '@/api/config'
import { DETAIL_TYPE } from './const'
export default {
    name: 'fullReturnDetails',
    data () {
        return {
            detailType: DETAIL_TYPE,
            queryParams: {
                memberAccount: '',
                merchantAccount: '',
                flowType: '',
                startTime: '',
                endTime: '',
                minAmount: '',
                maxAmount: '',
                sourceNo: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '金额(元)', prop: 'flowAmount', formatters: 'moneyShow' },
                { label: '类型', prop: 'flowType' },
                { label: '可用余额（元）', prop: 'availableBalance', formatters: 'moneyShow' },
                { label: '会员账号', prop: 'memberAccount' },
                { label: '会员名称', prop: 'memberName' },
                { label: '商家账号', prop: 'merchantAccount' },
                { label: '商家名称', prop: 'merchantName' },
                { label: '来源单号', prop: 'sourceNo' }
            ]
        }
    },
    computed: {
        ...mapState({
            fullReturnDetailsList: state => state.hmall.membershipInterests.fullReturnDetailsList,
            totalBalances: state => state.hmall.membershipInterests.totalBalances
        }),
        tableData () {
            return this.fullReturnDetailsList.records
        },
        paginationInfo () {
            return {
                pageNumber: this.fullReturnDetailsList.current,
                pageSize: this.fullReturnDetailsList.size,
                total: this.fullReturnDetailsList.total
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() >= new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    mounted () {
        this.findServiceChargeAction()
    },
    methods: {
        ...mapActions({
            fullReturnDetails: 'membershipInterests/fullReturnDetails',
            totalBalance: 'membershipInterests/totalBalance'
        }),
        onWithdrawal () {
            this.$router.push('/b2b/finance/withdrawal')
        },

        searchList () {
            this.queryParams.pageNumber = 1
            this.findServiceChargeAction()
        },

        onRest () {
            this.queryParams = {
                memberAccount: '',
                merchantAccount: '',
                flowType: '',
                startTime: '',
                endTime: '',
                minAmount: '',
                maxAmount: '',
                sourceNo: '',
                pageNumber: 1,
                pageSize: 10
            }
            this.findServiceChargeAction()
        },

        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无商品可导出！')
            } else {
                let url = ''
                for (let key in this.queryParams) {
                    url += (key + '=' + (this.queryParams[key] == null ? '' : this.queryParams[key]) + '&')
                }
                location.href = B2bUrl + 'ops/boss/rebate/flow/export?access_token=' + localStorage.getItem('tokenB2b') + '&' + url
            }
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

        async findServiceChargeAction () {
            await this.fullReturnDetails(this.queryParams)
            await this.totalBalance()
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
