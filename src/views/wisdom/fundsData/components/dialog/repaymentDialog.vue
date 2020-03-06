<template>
    <el-dialog :title="detailData[0].title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center custom-class='diyclass'>
        <el-dialog width="30%" title="确认切换" :visible.sync="innerVisible" append-to-body>
            <span>切换后，所有还款数据（含明细表内该笔台账关联的所有还款明细）均会被清空且无法恢复</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSureCut">确 定</el-button>
            </span>
        </el-dialog>
        <div class="form">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="165px" class="demo-ruleForm">
                <!-- <div class="dialogtitle">还款方式：</div> -->
                <div class="query-cont-row" style="height: 40px;">
                    <div class="query-cont-col">
                        <el-form-item prop="repaymentType">
                            <span slot='label' style="color:#000;font-size:18px"><b>还款方式：</b></span>
                            <el-radio v-model.trim="detailData[0].repaymentType" :label=2 @change="capitalPaidChange(2)">334</el-radio>
                            <el-radio v-model.trim="detailData[0].repaymentType" :label=1 @change="capitalPaidChange(1)">一次性还款</el-radio>
                        </el-form-item>
                    </div>
                </div>
                <div v-for="(item,index) in detailData" :key="index">
                    <div class="ftitle">第{{index+1}}次性还款：</div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="约定还款日期：" prop="endTime">
                                <el-date-picker v-model="item.endTime" type="date" value-format='yyyy-MM-dd' :picker-options="pickerOptionsStart" placeholder="请选择约定还款日期" :disabled='true'>
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="是否存在宽限期：" prop="graceDay">
                                <el-radio style="margin-right:5px" v-model.trim="item.exsitGrace" @change="dealCount(item)" :label=1>是</el-radio>
                                <el-radio style="margin-right:5px" v-model.trim="item.exsitGrace" @change="dealCount(item)" :label=0>否</el-radio>
                                <span style="margin-left:15px" v-if="item.exsitGrace==1">宽限日期：</span>
                                <!-- 仅允许输入非负整数，最多允许输入3位 -->
                                <el-input placeholder="请输入宽限期限" v-model.trim="item.graceDay" v-isNum:0='item.graceDay' maxlength='3' @blur="dealCount(item)" v-if="item.exsitGrace==1">
                                    <template slot="append">天</template>
                                </el-input>
                                <span style="margin-left:25px" v-if="item.exsitGrace==1">宽限期利率：</span>
                                <el-input v-model.trim="item.graceInterest" v-isNum:2="item.graceInterest" maxlength='16' placeholder="请输入宽限期利率" @blur="dealCount(item)" v-if="item.exsitGrace==1">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="约定还款金额：" prop="capitalAmount">
                                <el-input v-model.trim="item.capitalAmount" disabled v-isNegative="item.capitalAmount" maxlength='16' placeholder="请输入还款金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次还本金时间：" prop="thisPaidCapitalTime">
                                <el-date-picker v-model="item.thisPaidCapitalTime" @blur="dealCount(item)" type="date" value-format='yyyy-MM-dd' :picker-options="pickerOptionsStart" placeholder="请选择还本金时间">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次本金还款金额：" prop="thisPaidCapital">
                                <el-input v-model.trim="item.thisPaidCapital" @blur="dealCount(item)" :disabled='!item.thisPaidCapitalTime' v-isNegative="item.thisPaidCapital" maxlength='16' placeholder="请输入还款金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>

                        <div class="query-cont-col">
                            <el-form-item label="剩余本金金额：" prop="thisPaidCapital">
                                <!-- 本金-已还-本次还本金 -->
                                <span>{{((item.capitalAmount||0)-(item.capitalPaid||0)-(item.thisPaidCapital||0)).toFixed(2)}}元</span>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="累计实时宽限期利息：" prop="name">
                                {{item.graceInterestAmount||0}}元
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次还宽限利息时间：" prop="thisPaidGraceInterestTime">
                                <el-date-picker v-model="item.thisPaidGraceInterestTime" type="date" value-format='yyyy-MM-dd' :picker-options="pickerOptionsStart" placeholder="请选择本次还宽限利息时间：">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次收取宽限利息：" prop="thisPaidGraceInterest">
                                <el-input v-model.trim="item.thisPaidGraceInterest" v-isNegative="item.thisPaidGraceInterest" maxlength='16' :disabled="!item.thisPaidGraceInterestTime" placeholder="请输入本次收取宽限利息：">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="剩余宽限利息：" prop="name">
                                <!-- 总宽限期利息-已还-本次还宽限期利息 -->
                                {{((item.graceInterestAmount||0)-(item.graceInterestPaid||0)-(item.thisPaidGraceInterest||0)).toFixed(2)}}元
                            </el-form-item>
                        </div>
                    </div>
                    <div v-if="detailData[0].account_accountType==3">
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item label="累计应收正常利息：" prop="name">
                                    {{item.interestAmount||0}}元
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次还正常利息时间：" prop="thisPaidInterestTime">
                                    <el-date-picker v-model="item.thisPaidInterestTime" type="date" :picker-options="pickerOptionsStart" value-format='yyyy-MM-dd' placeholder="请选择本次还正常利息时间">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次收取正常利息：" prop="thisPaidInterest">
                                    <el-input v-model.trim="item.thisPaidInterest" v-isNegative="item.thisPaidInterest" maxlength='16' :disabled="!item.thisPaidInterestTime" placeholder="请输入本次收取正常利息">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="剩余正常利息：" prop="name">
                                    <!-- 总利息-已还-本次还利息 -->
                                    {{((item.interestAmount||0)-(item.interestPaid||0)-(item.thisPaidInterest||0)).toFixed(2)}}元
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <!-- isOverDue true逾期 false未逾期 -->
                    <template v-if="item.isOverDue">
                        <div class="endline">逾期</div>
                        <div class="query-cont-row" style="margin-top:10px">
                            <div class="query-cont-col">
                                <el-form-item label="阶梯式计息：" prop="name">
                                    <el-radio v-model.trim="item.isStepOverInterest" @change="onChange(1, item)" :label=0>否</el-radio>
                                    <el-radio v-model.trim="item.isStepOverInterest" @change="onChange(2, item)" :label=1>是</el-radio>
                                </el-form-item>
                            </div>
                        </div>
                        <div v-if="item.isStepOverInterest==0">
                            <div class="query-cont-row">
                                <div class="query-cont-col">
                                    <el-form-item label="逾期利率：" prop="overDueInterest">
                                        <el-input v-model.trim="item.overDueInterest" v-isNum:2="item.dateNum" maxlength='16' placeholder="请输入逾期利率" @blur="dealCount(item)">
                                            <template slot="append">%</template>
                                        </el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                        <div v-if="item.isStepOverInterest==1">
                            <div class="" v-for="(i,index) in item.overdueList" :key="index">
                                <div class="smalltitle">逾期第{{index+1}}阶段利息：</div>
                                <div class="query-cont-row">
                                    <div class="query-cont-col">
                                        <el-form-item :label="'第' +(index+1)+'阶段时长：'">
                                            <el-input v-model.trim="i.dateNum" v-isNum:0="i.dateNum" maxlength='5' placeholder="请输入逾期时长" @blur="dealCount(item)">
                                                <template slot="append">月</template>
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="query-cont-col">
                                        <el-form-item label="该阶段逾期利率：">
                                            <el-input v-model.trim="i.overDueInterest" v-isNum:2="i.overDueInterest" maxlength='20' placeholder="请输入逾期利率" @blur="dealCount(item)"><template slot="append">%</template></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item label="应缴纳逾期罚息：" prop="overDueInterestAmount">
                                    {{item.overDueInterestAmount}} 元
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次还罚息时间：" prop="thisPaidOverDueInterestTime">
                                    <el-date-picker v-model="item.thisPaidOverDueInterestTime" type="date" :picker-options="pickerOptionsStart" value-format='yyyy-MM-dd' placeholder="请选择本次还罚息时间">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次缴纳逾期罚息：" prop="thisPaidOverDueInterest">
                                    <el-input v-model.trim="item.thisPaidOverDueInterest" v-isNegative="item.thisPaidOverDueInterest" maxlength='16' :disabled="!item.thisPaidOverDueInterestTime" placeholder="请输入本次缴纳逾期罚息">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="剩余逾期罚息：" prop="name">
                                    <!-- 总逾期利息-已还-本次还逾期 -->
                                    {{((item.overDueInterestAmount||0)-(item.overDueInterestPaid||0)-(item.thisPaidOverDueInterest||0)).toFixed(2)||0}}元
                                </el-form-item>
                            </div>
                        </div>
                    </template>
                    <div class="ftitle" v-else>未逾期</div>
                </div>
                <!-- 分割线 -->
                <div class="fgx"></div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSaveplan()" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { setPlan } from './../../api'
import { mapState } from 'vuex'
import { setCountMixin } from '../../mixins/setCount'
export default {
    name: 'repaymentDialog',
    mixins: [setCountMixin],
    data () {
        return {
            radio: '月',
            radiox: '1',
            loading: false,
            innerVisible: false,
            form: {
                name: '',
                x: ''
            },
            rules: {
                // name: [
                //     { required: true, message: '请输入台账编号', trigger: 'blur' }
                // ]
            },
            newRata: {
                dateNum: '',
                dateType: '',
                overDueInterest: '',
                planId: '',
                sort: '',
                startTime: ''
            },
            planListItem: {}
        }
    },
    watch: {
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        detailData: {
            type: Array,
            default: () => []
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
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        async dealCount (query) {
            const res = await this.onCount(query)
            /* res格式: {
                "graceInterestAmount": '', // 宽限期利息
                "interestAmount": '', // 利息
                "overDueInterestList": '' // 逾期利息
            } */
            query.graceInterestAmount = res.graceInterestAmount || 0
            query.interestAmount = res.interestAmount || 0
            query.overDueInterestAmount = res.overDueInterestAmount || 0
            this.$forceUpdate()
        },
        async onChange (val, item) {
            await this.$emit('stepOver', val, item)
            this.dealCount(item)
        },
        capitalPaidChange (val) {
            if (val == 1) this.detailData[0].repaymentType = 2
            if (val == 2) this.detailData[0].repaymentType = 1
            this.innerVisible = true
        },
        async onSureCut () {
            await this.$emit('repaymentTypeChange', this.detailData[0])
            this.innerVisible = false
        },
        onCancle () {
            this.$emit('onClose')
        },
        onAddrate () {
            let newObj = { ...this.newRata }
            this.detailData[0].overdueList.push(newObj)
        },
        onDeleteRate (index) {
            this.detailData[0].overdueList.splice(index, 1)
        },
        async onSaveplan () {
            this.loading = true
            try {
                await this.setPlan(this.detailData)
                this.$message({ type: 'success', message: '修改成功' })
                this.onCancle()
                this.$emit('reload')
                this.loading = false
            } catch (error) {
                this.loading = false
            }
        },
        async setPlan (planList) {
            console.log(planList)
            await setPlan({
                planList,
                createBy: this.userInfo.employeeName
            })
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding: 20px 24px;
    min-height: auto;
}
/deep/.el-form .el-input {
    width: 250px;
}
.dialogtitle {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 30px;
    color: #000;
    border-bottom: none;
}
.dw {
    margin-left: 10px;
}
.ftitle {
    padding: 5px 0 14px 0;
    font-weight: bold;
    font-size: 18px;
    color: #000;
}
/deep/.diyclass {
    max-height: 90%;
    overflow-y: scroll;
}
.endline {
    font-size: 18px;
    font-weight: bold;
    color: #000;
}
.fgx {
    width: 100%;
    margin: 15px auto;
    height: 1px;
    border-bottom: 1px solid #dcdfe6;
}
</style>
