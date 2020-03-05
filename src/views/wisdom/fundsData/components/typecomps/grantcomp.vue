<template>
    <div>
        <!-- 敞口组件 -->
        <div class="dialogtitle">借款信息：</div>
        <div class="query-cont-row">
            <div class="query-cont-col">
                <el-form-item label="开票金额：" prop="invoiceAmount">
                    <el-input v-model.trim="flowform.invoiceAmount" @input="(val)=>{setDepositProportion(val)}" v-isNum:2="flowform.invoiceAmount" maxlength='20' placeholder="请输入开票金额">
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
                <el-form-item label="保证金比例：" prop="depositProportion">
                    <el-input v-model='flowform.depositProportion' @input="(val)=>{setDepositProportion(val)}" v-isNum:2="flowform.depositProportion" maxlength='20' placeholder="请输入保证金比例">
                        <template slot="append">%</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="保证金缴纳：" prop="自动计算">
                    <el-input v-model.trim="flowform.depositPay" placeholder="请输入保证金缴纳" :disabled='!flowform.invoiceAmount' @blur="doCompute">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="敞口金额：" prop="">
                    <el-input v-model.trim="flowform.loanAmount" placeholder="请输入敞口金额" :disabled='!flowform.invoiceAmount'>
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="承兑期限：" prop="loanDateNum">
                    <el-radio v-model.trim="flowform.loanDateType" :label=1 @change="loanDateTypeChange">月</el-radio>
                    <el-radio v-model.trim="flowform.loanDateType" :label=2 @change="loanDateTypeChange" :disabled="flowform.repaymentType===2">天</el-radio>
                    <el-input v-if="flowform.loanDateType" v-model.trim="flowform.loanDateNum" @change='onChooseTime' v-isPositiveInt="flowform.loanDateNum" maxlength='5' placeholder="请输入借款期限" :disabled="flowform.repaymentType===2"><template slot="append">{{flowform.loanDateType==1?'月':'天'}}</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="开票日期：" prop="">
                    <el-date-picker v-model="flowform.loanStartTime" value-format="yyyy-MM-dd" @change='onChooseTime' format="yyyy-MM-dd" :picker-options="pickerOptionsStart" type="date" placeholder="请选择出票日期">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="到期日：" prop="loanEndTime">
                    {{flowform.loanEndTime}}
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
    name: 'grantform',
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
                }
            }
        }
    },
    methods: {
        doCompute () {
            this.flowform.loanAmount = this.flowform.invoiceAmount - this.flowform.depositPay
        },
        setDepositProportion (val) {
            this.flowform.depositPay = (this.flowform.invoiceAmount * (this.flowform.depositProportion / 100)).toFixed(2)
            this.flowform.loanAmount = (this.flowform.invoiceAmount - (this.flowform.depositPay ? this.flowform.depositPay : 0)).toFixed(2)
        },
        setDepositPay (val) {
            this.flowform.depositProportion = (val / this.flowform.invoiceAmount) * 100
            this.flowform.depositPay = val
        },
        onChooseTime (val) {
            if (this.flowform.loanDateType == 1) {
                this.flowform.loanEndTime = this.flowform.loanStartTime && moment(this.flowform.loanStartTime, 'YYYY-MM-DD').add(this.flowform.loanDateNum, 'months').format('YYYY-MM-DD')
            }
            if (this.flowform.loanDateType == 2) {
                this.flowform.loanEndTime = this.flowform.loanStartTime && moment(this.flowform.loanStartTime, 'YYYY-MM-DD').add(this.flowform.loanDateNum, 'days').format('YYYY-MM-DD')
            }
        },
        loanDateTypeChange () {
            this.flowform.loanDateNum = ''
            this.flowform.loanEndTime = ''
        }
    }
}
</script>
<style scoped>
</style>