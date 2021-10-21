<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <!-- <div class="title-cont">
                <span class="title-cont__label">账户概览</span>
                <span class="title-cont__btn">
                    <h-button type='assist' @click="onWithdrawal">提现</h-button>
                    <span>(请预留部分资金应对退款))</span>
                </span>
            </div> -->
            <div class="balance-cont-row">
                <div class="balance-cont-col">
                    <div class="balance-col-icon">
                        <i class="icon iconfont hosjoy_money"></i>
                    </div>
                    <div class="balance-col-money">
                        <p>{{freightBankAccountInfo.totalBalance | moneyFormat}}</p>
                        <p>APP运费总资产<span>（元）</span></p>
                    </div>

                    <span class="title-cont__btn pl60">
                        <h-button type='assist' @click="onWithdrawal">提现</h-button>
                        <span class="pl20">(请预留部分资金应对退款)</span>
                    </span>
                </div>
            </div>
            <div class="title-cont">
                <span class="title-cont__label">线上运费资金明细</span>
            </div>
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">时间范围：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-ddTHH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-ddTHH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.type">
                            <el-option v-for="item in freightTypeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">在线运费订单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.freightNo" maxlength="50" placeholder="请输入在线运费订单编号"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">客户名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.customerName" maxlength="50" placeholder="请输入客户名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">渠道：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.source">
                            <el-option v-for="item in orderChannerlOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="searchList()">查询</h-button>
                    <h-button class="ml20" @click="onRest()">重置</h-button>
                    <h-button @click="onExport">导出</h-button>

                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isShowIndex='true'>
                <template slot="type" slot-scope="scope">
                    {{ freightTypeMap.get(scope.data.row.type) || '-' }}
                </template>
                <template slot="source" slot-scope="scope">
                    {{ orderChannerlMap.get(scope.data.row.source) || '-' }}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { B2bUrl } from '@/api/config'
import { ORDER_CHANNERL_OPTIONS, FREIGHT_TYPE_OPTIONS, FREIGHT_TYPE_MAP, ORDER_CHANNERL_MAP } from '../const'
import axios from 'axios'
export default {
    name: 'freightDetails',
    data () {
        return {
            orderChannerlOptions: ORDER_CHANNERL_OPTIONS,
            freightTypeOptions: FREIGHT_TYPE_OPTIONS,
            freightTypeMap: FREIGHT_TYPE_MAP,
            orderChannerlMap: ORDER_CHANNERL_MAP,
            queryParams: {
                startTime: '',
                endTime: '',
                type: '',
                freightNo: '',
                customerName: '',
                source: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '时间', prop: 'time', formatters: 'dateTime' },
                { label: '金额', prop: 'freightAmount', formatters: 'moneyShow', sortable: true },
                { label: '类型', prop: 'type' },
                { label: '在线运费订单编号', prop: 'freightNo' },
                { label: '客户名称', prop: 'customerName' },
                { label: '渠道', prop: 'source' }
            ],
            initParams: {}
        }
    },
    computed: {
        ...mapGetters('finance', {
            freightBankAccountInfo: 'freightBankAccountInfo',
            freightList: 'freightList'
        }),
        tableData () {
            return this.freightList.records
        },
        paginationInfo () {
            return {
                pageNumber: this.freightList.current,
                pageSize: this.freightList.size,
                total: this.freightList.total
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
        this.initParams = { ...this.queryParams }
        this.findFreightList()
        this.findFreightBankAccountInfo()
    },
    methods: {
        ...mapActions('finance', {
            findFreightList: 'findFreightList',
            findFreightBankAccountInfo: 'findFreightBankAccountInfo'
        }),
        onWithdrawal () {
            this.$router.push('/b2b/finance/withdrawalFreight')
        },
        // 查询操作
        searchList () {
            this.queryParams.pageNumber = 1
            this.findFreightList(this.queryParams)
        },
        // 重置操作
        onRest () {
            this.queryParams = { ...this.initParams }
            this.findFreightList()
        },
        // 导出操作
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无订单明细可导出！')
            } else {
                let url = ''
                for (let key in this.queryParams) {
                    url += (key + '=' + (this.queryParams[key] ? this.queryParams[key] : '') + '&')
                }
                url += 'access_token=' + localStorage.getItem('token')
                location.href = B2bUrl + 'order/boss/freight-orders/fund/export?' + url
            }
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findFreightList(this.queryParams)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.findFreightList(this.queryParams)
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
