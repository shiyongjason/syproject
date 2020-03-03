<template>
    <div>
        <!-- 分授信组件 -->
        <div class="dialogtitle">借款信息：</div>
        <div class="query-cont-row">
            <div class="query-cont-col">
                <el-form-item label="开票金额：" prop="invoiceAmount">
                    <el-input v-model.trim="flowform.invoiceAmount" v-isNum:2="flowform.invoiceAmount" maxlength='20' placeholder="请输入开票金额">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="供货商名称：" prop="supplier">
                    <el-input v-model.trim="flowform.supplier" maxlength="30" show-word-limit placeholder="请输入供货商名">
                    </el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="借款金额：" prop="loanAmount">
                    <el-input v-model.trim="flowform.loanAmount" v-isNum:2="flowform.depositProportion" maxlength='20' placeholder="请输入借款金额"><template slot="append">元</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="年利率" prop="yearRate">
                    <el-input v-model.trim="flowform.yearRate" placeholder="请输入年利率" v-isNum:2="flowform.yearRate" maxlength='20'><template slot="append">%</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="开票日期：" prop="invoiceTime">
                    <!-- <el-input v-model.trim="flowform.name" placeholder="请输入年利率"><template slot="append">%</template></el-input> -->
                    <el-date-picker v-model="flowform.invoiceTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="请选择出票日期">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="借款期限：" prop="loanDateNum">
                    <el-radio v-model.trim="flowform.loanDateType" :label=1 @change="loanDateTypeChange">月</el-radio>
                    <el-radio v-model.trim="flowform.loanDateType" :label=2 @change="loanDateTypeChange" :disabled="flowform.repaymentType===2">天</el-radio>
                    <el-input v-if="flowform.loanDateType" v-model.trim="flowform.loanDateNum" v-isPositiveInt='flowform.loanDateNum' @change='onChooseTime' maxlength='5' placeholder="请输入借款期限" :disabled="flowform.repaymentType===2"><template slot="append">{{flowform.loanDateType==1?'月':'天'}}</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="借款日期：" prop="">
                    <!-- <el-input v-model.trim="flowform.name" placeholder="请输入年利率"><template slot="append">%</template></el-input> -->
                    <el-date-picker v-model="flowform.loanStartTime" value-format="yyyy-MM-dd" @change='onChooseTime' format="yyyy-MM-dd" :picker-options="pickerOptionsStart" type="date" placeholder="请选择借款日期">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="到期日：" prop="loanEndTime">
                    {{flowform.loanEndTime}}
                    <!-- <el-date-picker v-model="flowform.loanEndTime" type="datetime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptionsEnd" placeholder="请选择还款日期"></el-date-picker> -->
                </el-form-item>
            </div>
        </div>
        <div class="dialogtitle">还款信息：</div>
        <div class="query-cont-col">
            <el-form-item label="还款方式：" prop="name">
                <el-radio v-model.trim="flowform.repaymentType" :label=1 @change="()=>{$emit('repaymentTypeChange',1)}">一次性还款</el-radio>
                <el-radio v-model.trim="flowform.repaymentType" :label=2 @change="()=>{$emit('repaymentTypeChange',2)}">334</el-radio>
            </el-form-item>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: 'openform',
    props: {
        flowform: {
            type: Object,
            default: () => { }
        }
    },
    data () {
        return {

        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    // let endDateVal = this.flowform.loanEndTime
                    // if (endDateVal) {
                    //     return time.getTime() > new Date(endDateVal).getTime() || time.getTime() <= Date.now() - 1 * 24 * 60 * 60 * 1000
                    // }
                    return time.getTime() > Date.now()
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.flowform.loanStartTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        depositPay: {
            get: function () {
                return this.flowform.invoiceAmount * this.flowform.depositProportion
            },
            set: function (value) {
                this.flowform.depositPay = value
            }

        }
    },
    methods: {
        loanDateTypeChange () {
            this.flowform.loanDateNum = ''
            this.flowform.loanEndTime = ''
        },
        onChooseTime (val) {
            if (this.flowform.loanDateType == 1) {
                this.flowform.loanEndTime = this.flowform.loanStartTime && moment(this.flowform.loanStartTime, 'YYYY-MM-DD').add(this.flowform.loanDateNum, 'months').format('YYYY-MM-DD')
            }
            if (this.flowform.loanDateType == 2) {
                this.flowform.loanEndTime = this.flowform.loanStartTime && moment(this.flowform.loanStartTime, 'YYYY-MM-DD').add(this.flowform.loanDateNum, 'days').format('YYYY-MM-DD')
            }
        }
    }
}
</script>
<style scoped>
</style>