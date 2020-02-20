<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center custom-class='diyclass'>
        <div class="form">
            <el-form :model="form.planList[0]" :rules="rules" ref="ruleForm" label-width="175px" class="demo-ruleForm">
                <div class="dialogtitle">还款信息：</div>
                <div class="ftitle">
                    <b>还款方式：</b>一次性还款</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="本次还本金时间：" prop="endTime">
                            <el-date-picker v-model="form.planList[0].endTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次还本金金额：" prop="paidCapital">
                            <el-input v-isNum="form.planList[0].paidCapital" maxlength='20' v-model.trim="form.paidCapital" placeholder="请输入本次还款"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="欠收本金：" prop="capitalOwe">
                            <!-- 欠收本金=借款金额-累计实收借款本金 -->
                            <span>{{form.planList[0].capitalAmount-form.planList[0].capitalPaid}}</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="是否存在宽限期：" prop="exsitGrace">
                            <el-radio style="margin-right:5px" v-model.trim="form.planList[0].exsitGrace" :label="1"></el-radio>
                            <span style="margin-left:15px">宽限日期：</span>
                            <!-- 仅允许输入非负整数，最多允许输入3位 -->
                            <el-input placeholder="请输入宽限期限" v-model.trim="form.planList[0].graceDay" v-isNum:0='form.planList[0].graceDay' maxlength='3'></el-input>
                            <span class="dw">天</span>
                            <span style="margin-left:25px">宽限期利率：</span>
                            <el-input v-model.trim="form.planList[0].graceDay" v-isNum="form.planList[0].graceDay" maxlength='20' placeholder="请输入宽限期利率"></el-input>
                            <span class="dw">%</span>
                            <el-radio style="margin:0 5px 0 15px" v-model.trim="form.planList[0].exsitGrace" :label="0"></el-radio>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="累计宽限期实时利息：" prop="graceInterestAmount">
                            <span>{{form.planList[0].graceInterestAmount}}</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次还宽限利息时间：" prop="graceInterestTime">
                            <el-date-picker v-model="form.planList[0].graceInterestTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次收取宽限利息：" prop="graceInterestPaid">
                            <!-- 支持修改，修改规则同通用样式，仅允许输入数字，允许输入俩位小数，含小数点最多20位 -->
                            <el-input v-isNum="form.planList[0].graceInterestPaid" maxlength='20' v-model.trim="form.planList[0].graceInterestPaid" placeholder="请输入应收利息"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col" style="margin-left: -24px;">
                        <el-form-item label="剩余宽限利息：" prop="graceInterestOwe">
                            <span>{{form.planList[0].graceInterestAmount-form.planList[0].graceInterestPaid}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="累计应收正常利息：" prop="interestPaid">
                            <span>{{form.planList[0].interestAmount}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col" style="margin-left:-25px">
                        <el-form-item label="本次还正常利息时间：" prop="interestTime">
                            <el-date-picker v-model="form.planList[0].interestTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次收取正常利息：" prop="interestPaid">
                            <el-input v-isNum="form.planList[0].interestPaid" maxlength='20' v-model.trim="form.planList[0].interestPaid" placeholder="请输入本次收取利息"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="剩余正常利息：" prop="interestOwe">
                            <span>{{form.planList[0].interestOwe}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="dialogtitle">逾期</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="阶梯式计息：" prop="isStepOverInterest">
                            <el-radio v-model.trim="form.planList[0].isStepOverInterest" :label="0">否</el-radio>
                            <el-radio v-model.trim="form.planList[0].isStepOverInterest" :label="1">是</el-radio>
                        </el-form-item>
                    </div>
                </div>
                <div v-for="(item,index) in form.planList[0].overdueList" :key="index">
                    <div class="smalltitle">
                        逾期第一阶段利息：
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="第一阶段时长：" prop="overdueList.dateNum">
                                <el-input v-model.trim="item.dateNum" v-isNum:0='item.dateNum' maxlength='5' placeholder="请输入逾期时长"></el-input>
                                <span class="dw">月</span>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="该阶段逾期利率：" prop="overdueList.overDueInterest">
                                <el-input v-isNum="item.overDueInterest" maxlength='20' v-model.trim="item.overDueInterest" placeholder="请输入逾期利息"></el-input>
                                <span class="dw">%</span>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="累计应缴纳逾期罚息:" prop="overdueList.dateNum">
                            <span>{{form.planList[0].overDueInterestAmount}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次还罚息时间：" prop="overDueInterestTime">
                            <el-date-picker v-model="form.planList[0].overDueInterestTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次缴纳逾期罚息:" prop="overDueInterestPaid">
                            <span>{{form.planList[0].overDueInterestPaid}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="剩余逾期罚息:" prop="overDueInterestOwe">
                            <span>{{form.planList[0].overDueInterestOwe}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary">保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'AnnualInterestRateDialog',
    data () {
        return {
            radio: '是',
            radio2: '1',
            form: {
                planList: [
                    {
                        id: '',
                        loanId: '',
                        capitalAmount: '',
                        capitalPaid: '',
                        endTime: '',
                        exsitGrace: '', // 是否存在宽限期 0：否 1：是
                        graceDay: '',
                        graceInterest: '',
                        graceInterestAmount: '',
                        graceInterestPaid: '',
                        interestAmount: '',
                        interestPaid: '',
                        isStepOverInterest: 0, // 默认逾期否，0：否 1：是
                        overDueInterest: '',
                        overDueInterestAmount: '',
                        overDueInterestPaid: '',
                        overdueList: [{
                            dateNum: '',
                            dateType: '',
                            overDueInterest: '',
                            planId: '',
                            sort: '',
                            startTime: ''
                        }],
                        startTime: ''
                    }
                ]
            },
            rules: {
                name: [
                    { required: true, message: '请输入台账编号', trigger: 'blur' }
                ]
            }
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
    methods: {
        onCancle () {
            this.$emit('onClose')
        }
    },
    mounted () {
        console.log(this.detailData)
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
