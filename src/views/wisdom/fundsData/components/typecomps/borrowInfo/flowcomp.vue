<template>
    <div>
        <!-- 流贷组件-借款信息 -->
        <div class="query-cont-row">
            <div class="query-cont-col">
                <el-form-item label="供货商名称：">
                    <el-input v-model.trim="flowform.supplier" maxlength="100" show-word-limit placeholder="请输入供货商名">
                    </el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="借款金额：" prop="loan.loanAmount" :rules='rules.loanAmount'>
                    <el-input v-model.trim="flowform.loanAmount" v-isNum="flowform.loanAmount" maxlength='20' placeholder="请输入借款金额"><template slot="append">元</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="年利率：" prop="loan.yearRate" :rules='rules.yearRate'>
                    <el-input v-model.trim="flowform.yearRate" v-isNum="flowform.yearRate" maxlength='20' placeholder="请输入年利率"><template slot="append">%</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="放款日期：" prop="loan.loanStartTime" :rules='rules.loanStartTime'>
                    <el-date-picker v-model="flowform.loanStartTime" value-format="yyyy-MM-dd" @change='onChooseTime' format="yyyy-MM-dd" :picker-options="pickerOptionsStart" type="date" placeholder="请选择放款日期">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="借款期限：" prop="loan.loanDateNum" :rules='rules.loanDateNum'>
                    <el-radio v-model.trim="flowform.loanDateType" :label=1>月</el-radio>
                    <el-radio v-model.trim="flowform.loanDateType" :label=2>天</el-radio>
                    <el-input v-if="flowform.loanDateType" v-model.trim="flowform.loanDateNum" @change='onChooseTime' v-isPositiveInt="flowform.loanDateNum" maxlength='5' placeholder="请输入借款期限"><template slot="append">{{flowform.loanDateType==1?'月':'天'}}</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="到期日：" prop="loanEndTime">
                    {{flowform.loanEndTime}}
                </el-form-item>
            </div>
        </div>
        <!-- <div class="dialogtitle">还款信息：</div>
        <div class="query-cont-col">
            <el-form-item label="还款方式：" prop="name">
                <el-radio v-model.trim="flowform.repaymentType" :label=1>一次性还款</el-radio>
            </el-form-item>
        </div> -->
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: 'flowform',
    props: {
        flowform: {
            type: Object,
            default: () => { }
        }
    },
    data () {
        return {
            rules: {
                'loanAmount': [
                    { required: true, message: '请输入借款金额', trigger: 'blur' }
                ],
                'yearRate': [
                    { required: true, message: '请输入年利率', trigger: 'blur' }
                ],
                'loanStartTime': [
                    { required: true, message: '请选择放款日期', trigger: 'blur' }
                ],
                'loanDateNum': [
                    { required: true, message: '请选择时间类型并输入借款期限', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    return time.getTime() > Date.now()
                }
            }
        }
    },
    watch: {
        'flowform.loanDateType' (val) {
            this.flowform.loanDateNum = ''
            this.flowform.loanEndTime = ''
        }
    },
    methods: {
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