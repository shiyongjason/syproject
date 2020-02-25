<template>
    <el-dialog :title="detailData[0].title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center custom-class='diyclass'>
        <div class="form">
            <el-form :model="detailData[0]" :rules="rules" ref="ruleForm" label-width="175px" class="demo-ruleForm">
                <div class="dialogtitle">还款信息：</div>
                <div class="ftitle">
                    <b>还款方式：</b>一次性还款</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="本次还本金时间：" prop="thisPaidCapitalTime">
                            <el-date-picker v-model="detailData[0].thisPaidCapitalTime" type="date" :picker-options="pickerOptionsStart" value-format='yyyy-MM-dd' placeholder="请输入本次还本金时间">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次还本金金额：" prop="thisPaidCapital">
                            <el-input v-isNegative="detailData[0].thisPaidCapital" maxlength='20' v-model.trim="detailData[0].thisPaidCapital" placeholder="请输入本次还款" :disabled='!detailData[0].thisPaidCapitalTime'>
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="欠收本金：" prop="capitalOwe">
                            <!-- 欠收本金=借款金额capitalAmount-累计实收借款本金capitalPaid-本次还本金金额thisPaidCapital -->
                            <span>{{(detailData[0].capitalAmount-detailData[0].capitalPaid-(detailData[0].thisPaidCapital||0))||0}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="是否存在宽限期：" prop="exsitGrace">
                            <el-radio style="margin-right:5px" v-model.trim="detailData[0].exsitGrace" :label="1">是</el-radio>
                            <el-radio style="margin:0 5px 0 15px" v-model.trim="detailData[0].exsitGrace" :label="0">否</el-radio>
                            <template v-if="detailData[0].exsitGrace">
                                <span style="margin-left:15px">宽限日期：</span>
                                <!-- 仅允许输入非负整数，最多允许输入3位 -->
                                <el-input placeholder="请输入宽限期限" v-model.trim="detailData[0].graceDay" v-isNum:0='detailData[0].graceDay' maxlength='3' @blur="dealCount(detailData[0])">
                                    <template slot="append">天</template>
                                </el-input>
                                <span style="margin-left:25px">宽限期利率：</span>
                                <el-input v-model.trim="detailData[0].graceInterest" v-isNum="detailData[0].graceInterest" maxlength='20' placeholder="请输入宽限期利率" @blur="dealCount(detailData[0])">
                                    <template slot="append">%</template>
                                </el-input>
                            </template>

                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="累计宽限期实时利息：" prop="graceInterestAmount">
                            <!-- 实时从接口获取 -->
                            <span>{{detailData[0].graceInterestAmount||0}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次还宽限利息时间：" prop="thisPaidGraceInterestTime">
                            <el-date-picker v-model="detailData[0].thisPaidGraceInterestTime" :picker-options="pickerOptionsStart" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次收取宽限利息：" prop="thisPaidGraceInterest">
                            <!-- 支持修改，修改规则同通用样式，仅允许输入数字，允许输入俩位小数，含小数点最多20位 -->
                            <el-input v-isNegative="detailData[0].thisPaidGraceInterest" maxlength='20' v-model.trim="detailData[0].thisPaidGraceInterest" placeholder="请输入应收利息" :disabled="!detailData[0].thisPaidGraceInterestTime">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="剩余宽限利息：" prop="graceInterestOwe">
                            <!-- 剩余宽限期利息=累计宽限期实时利息-累计缴纳的宽限期利息-本次收取宽限利息 -->
                            <span>{{(detailData[0].graceInterestAmount-detailData[0].graceInterestPaid-(detailData[0].thisPaidGraceInterest||0))||0}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="累计应收正常利息：" prop="interestAmount">
                            <!-- 实时自动计算 -->
                            <span>{{detailData[0].interestAmount||0}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次还正常利息时间：" prop="thisPaidInterestTime">
                            <el-date-picker v-model="detailData[0].thisPaidInterestTime" :picker-options="pickerOptionsStart" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次收取正常利息：" prop="thisPaidInterest">
                            <el-input v-isNegative="detailData[0].thisPaidInterest" maxlength='20' v-model.trim="detailData[0].thisPaidInterest" placeholder="请输入本次收取利息" :disabled="!detailData[0].thisPaidInterestTime">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="剩余正常利息：" prop="interestOwe">
                            <!-- 自动计算，剩余正常利息=累计应收正常利息interestAmount-累计缴纳的实收正常利息interestPaid-本次收取正常利息 -->
                            <span>{{(detailData[0].interestAmount-detailData[0].interestPaid-(detailData[0].thisPaidInterest||0)).toFixed(2)||0}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                </div>
                <template v-if="detailData[0].overdueList[0]&&detailData[0].overdueList[0].id">
                    <div class="dialogtitle">逾期</div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="阶梯式计息：" prop="isStepOverInterest">
                                <el-radio v-model.trim="detailData[0].isStepOverInterest" :label="0">否</el-radio>
                                <el-radio v-model.trim="detailData[0].isStepOverInterest" :label="1">是</el-radio>
                            </el-form-item>
                        </div>
                    </div>
                    <div v-if="detailData[0].isStepOverInterest==0">
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item label="逾期利率：" prop="overDueInterest">
                                    <el-input v-model.trim="detailData[0].overdueList[0].overDueInterest" v-isNum:0='detailData[0].overdueList[0].overDueInterest' maxlength='5' placeholder="请输入逾期利息">
                                        <template slot="append">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div v-else v-for="(item,index) in detailData[0].overdueList" :key="index">
                        <div class="smalltitle">
                            {{index+1==1?`逾期第一阶段利息：`:`逾期第二阶段利息：`}}
                        </div>
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item :label="index+1==1?`第一阶段时长：`:`第二阶段时长：`" prop="overdueList.dateNum">
                                    <el-input v-model.trim="item.dateNum" v-isNum:0='item.dateNum' maxlength='5' placeholder="请输入逾期时长">
                                        <template slot="append">月</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="该阶段逾期利率：" prop="overdueList.overDueInterest">
                                    <el-input v-isNum="item.overDueInterest" maxlength='20' v-model.trim="item.overDueInterest" placeholder="请输入逾期利息">
                                        <template slot="append">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="累计应缴纳逾期罚息:" prop="overdueList.dateNum">
                                <span>{{detailData[0].overDueInterestAmount||0}}</span>
                                <span class="dw">元</span>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次还罚息时间：" prop="thisPaidOverDueInterestTime">
                                <el-date-picker v-model="detailData[0].thisPaidOverDueInterestTime" :picker-options="pickerOptionsStart" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次缴纳逾期罚息:" prop="thisPaidOverDueInterest">
                                <el-input v-isNegative="detailData[0].thisPaidOverDueInterest" maxlength='20' v-model.trim="detailData[0].thisPaidOverDueInterest" placeholder="请输入逾期利息" :disabled="!detailData[0].thisPaidOverDueInterestTime">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="剩余逾期罚息:" prop="overDueInterestOwe">
                                <!-- 剩余逾期罚息=应缴逾期罚息overDueInterestAmount-累计缴纳的逾期罚息overDueInterestPaid-本次缴纳逾期罚息 -->
                                <span>{{(detailData[0].overDueInterestAmount-detailData[0].overDueInterestPaid-(detailData[0].thisPaidOverDueInterest||0))||0}}</span>
                                <span class="dw">元</span>
                            </el-form-item>
                        </div>
                    </div>
                </template>
                <div class="dialogtitle" v-else>未逾期</div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSave" :loading='loading'>保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { setPlan } from '../../api'
import { setCountMixin } from '../../mixins/setCount'
export default {
    name: 'AnnualInterestRateDialog',
    mixins: [setCountMixin],
    data () {
        return {
            radio: '是',
            radio2: '1',
            rules: {
                name: [
                    { required: true, message: '请输入台账编号', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        detailData: {
            type: Array,
            default: () => {
                return [
                    {
                        'capitalAmount': '',
                        'capitalOwe': '',
                        'capitalPaid': '',
                        'capitalTime': '',
                        'endTime': '',
                        'exsitGrace': '',
                        'graceDay': '',
                        'graceInterest': '',
                        'graceInterestAmount': '',
                        'graceInterestOwe': '',
                        'graceInterestPaid': '',
                        'graceInterestTime': '',
                        'id': '',
                        'interestAmount': '',
                        'interestOwe': '',
                        'interestPaid': '',
                        'interestTime': '',
                        'isStepOverInterest': '',
                        'loanId': '',
                        'overDueInterest': '',
                        'overDueInterestAmount': '',
                        'overDueInterestOwe': '',
                        'overDueInterestPaid': '',
                        'overDueInterestTime': '',
                        'overdueList': [
                            {
                                'dateNum': '',
                                'dateType': '',
                                'id': '',
                                'overDueInterest': '',
                                'planId': '',
                                'sort': '',
                                'startTime': ''
                            }
                        ],
                        'startTime': ''
                    }
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
    methods: {
        async dealCount (query) {
            this.loading = true
            const res = await this.onCount(query)
            this.loading = false
            query.graceInterestAmount = res.graceInterestAmount
            query.interestAmount = res.interestAmount
            query.overDueInterestList = res.overDueInterestList
        },
        onCancle () {
            this.$emit('onClose')
        },
        async onSave () {
            let form = {
                planList: [...this.detailData]
            }
            await setPlan(form)
            this.$message({
                type: 'success',
                message: '修改成功'
            })
            this.onCancle()
            this.$emit('reload')
        }
    },
    async mounted () {
        // console.log('detailData', this.detailData)
        let obj = {
            'dateNum': '',
            'dateType': '',
            'id': '',
            'overDueInterest': '',
            'planId': '',
            'sort': '',
            'startTime': ''
        }
        if (this.detailData[0].overdueList.length < 2) {
            this.detailData[0].overdueList.push(obj)
        }
        await this.dealCount(this.detailData[0])
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding: 20px 24px;
}
/deep/.yuqi .el-form-item__label {
    width: 206px !important;
}
/deep/.yuqi .el-form-item__content {
    width: 298px !important;
}
.dialogtitle {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 30px;
    color: #000;
    border-bottom: none;
}
.ftitle {
    margin-bottom: 15px;
}
.ftitle b {
    color: #000;
}
.dw {
    margin-left: 10px;
}
.smalltitle {
    line-height: 30px;
    margin-left: 27px;
}
/deep/.diyclass {
    max-height: 90%;
    overflow-y: scroll;
}
</style>
