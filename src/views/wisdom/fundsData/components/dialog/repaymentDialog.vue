<template>
    <el-dialog :title="detailData[0].title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center custom-class='diyclass'>
        <div class="form">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="165px" class="demo-ruleForm">
                <!-- <div class="dialogtitle">还款方式：</div> -->
                <div class="query-cont-row" style="height: 40px;">
                    <div class="query-cont-col">
                        <el-form-item prop="repaymentType">
                            <span slot='label' style="color:#000;font-size:18px"><b>还款方式：</b></span>
                            <el-radio v-model.trim="detailData[0].repaymentType" :label=2 @change="()=>{$emit('repaymentTypeChange',2)}">334</el-radio>
                            <el-radio v-model.trim="detailData[0].repaymentType" :label=1 @change="()=>{$emit('repaymentTypeChange',1)}">一次性还款</el-radio>
                        </el-form-item>
                    </div>
                </div>
                <div v-for="(item,index) in detailData" :key="index">
                    <div class="ftitle" v-if="item.overdueList.length==0">未逾期</div>
                    <div class="ftitle">第{{index+1}}次性还款：</div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="约定还款日期：" prop="endTime">
                                <el-date-picker v-model="item.endTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="是否存在宽限期：" prop="graceDay">
                                <el-radio style="margin-right:5px" v-model.trim="item.exsitGrace" :label=1>是</el-radio>
                                <el-radio style="margin-right:5px" v-model.trim="item.exsitGrace" :label=0>否</el-radio>
                                <span style="margin-left:15px" v-if="item.exsitGrace==1">宽限日期：</span>
                                <!-- 仅允许输入非负整数，最多允许输入3位 -->
                                <el-input placeholder="请输入宽限期限" v-model.trim="item.graceDay" v-isNum:0='item.graceDay' maxlength='3' @blur="dealCount(item)" v-if="item.exsitGrace==1">
                                    <template slot="append">天</template>
                                </el-input>
                                <span style="margin-left:25px" v-if="item.exsitGrace==1">宽限期利率：</span>
                                <el-input v-model.trim="item.graceInterest" v-isNum:0="item.graceInterest" maxlength='3' placeholder="请输入宽限期利率" @blur="dealCount(item)" v-if="item.exsitGrace==1">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="约定还款金额：" prop="capitalAmount">
                                <el-input v-model.trim="item.capitalAmount" disabled v-isNegative="item.capitalAmount" maxlength='20' placeholder="请输入还款金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次还本金时间：" prop="thisPaidCapitalTime">
                                <el-date-picker v-model="item.thisPaidCapitalTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择还本金时间">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次本金还款金额：" prop="thisPaidCapital">
                                <el-input v-model.trim="item.thisPaidCapital" :disabled='!item.thisPaidCapitalTime' v-isNegative="item.thisPaidCapital" maxlength='20' placeholder="请输入还款金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>

                        <div class="query-cont-col">
                            <el-form-item label="剩余本金金额：" prop="thisPaidCapital">
                                <!-- 剩余还款金额=约定还款金额-累计还款本金金额 -->
                                <span>{{(item.capitalAmount||0)-(item.capitalPaid?item.capitalPaid:0)-(item.thisPaidCapital?item.thisPaidCapital:0)}}元</span>
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
                                <el-date-picker v-model="item.thisPaidGraceInterestTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次收取宽限利息：" prop="thisPaidGraceInterest">
                                <el-input v-model.trim="item.thisPaidGraceInterest" v-isNegative="item.thisPaidGraceInterest" maxlength='20' placeholder="请输入应收利息">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="剩余宽限利息：" prop="name">
                                <!-- <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入应收利息">
                                    <template slot="append">元</template>
                                </el-input> -->
                                {{(item.graceInterestAmount||0)-(item.graceInterestPaid?item.graceInterestPaid:0)}}元
                            </el-form-item>
                        </div>
                    </div>
                    <div v-if="item.account_accountType==3">
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item label="累计应收正常利息：" prop="name">
                                    {{item.interestAmount||0}}元
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次还正常利息时间：" prop="thisPaidInterestTime">
                                    <el-date-picker v-model="item.thisPaidInterestTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次收取正常利息：" prop="thisPaidInterest">
                                    <el-input v-model.trim="item.thisPaidInterest" v-isNegative="item.thisPaidGraceInterest" maxlength='20' placeholder="请输入应收利息">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="剩余正常利息：" prop="name">
                                    <!-- <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入应收利息">
                                    <template slot="append">元</template>
                                </el-input> -->
                                    {{(item.interestAmount||0)-(item.interestPaid?item.interestPaid:0)}}元
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="endline" v-if="item.overdueList.length>0">逾期</div>
                    <div class="query-cont-row" style="margin-top:10px" v-if="item.overdueList.length>0">
                        <div class="query-cont-col">
                            <el-form-item label="阶梯式计息：" prop="name">
                                <el-radio v-model.trim="item.isStepOverInterest" @change="()=>{$emit('stepOver',1,item)}" :label=0>否</el-radio>
                                <el-radio v-model.trim="item.isStepOverInterest" @change="()=>{$emit('stepOver',2,item)}" :label=1>是</el-radio>
                            </el-form-item>
                        </div>
                    </div>
                    <div v-if="item.isStepOverInterest==0&&item.overdueList.length>0">
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item label="逾期利率：" prop="overDueInterest">
                                    <el-input v-model.trim="item.overdueList[0].overDueInterest" v-isNum="item.overdueList[0].dateNum" maxlength='20' placeholder="请输入逾期利息">
                                        <template slot="append">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item label="应缴纳逾期罚息：" prop="overDueInterestAmount">
                                    {{item.overDueInterestAmount}} 元
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次还罚息时间：" prop="overDueInterestTime">
                                    <el-date-picker v-model="item.overDueInterestTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择还罚息时间">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次缴纳逾期罚息：" prop="thisPaidOverDueInterest">
                                    <el-input v-model.trim="item.thisPaidOverDueInterest" v-isNegative="item.thisPaidOverDueInterest" maxlength='20' placeholder="请输入利息金额">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="剩余逾期罚息：" prop="name">
                                    <!-- <el-input v-model.trim="detailData[0].overdueList[0].dateNum" v-isNum="form.name" maxlength='20' placeholder="请输入利息金额">
                                    <template slot="append">元</template>
                                </el-input> -->
                                    {{(item.overDueInterestAmount||0)-(item.overDueInterestPaid?item.overDueInterestPaid:0)}}元
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.isStepOverInterest==1">
                        <div class="" v-for="(item,index) in item.overdueList" :key="index">
                            <div class="smalltitle">逾期第{{index+1}}阶段利息：</div>
                            <div class="query-cont-row">
                                <div class="query-cont-col">
                                    <el-form-item :label="'第' +(index+1)+'阶段时长：'">
                                        <el-input v-model.trim="item.dateNum" v-isNum:0="item.dateNum" maxlength='5' placeholder="请输入逾期时长"><template slot="append">月</template>
                                        </el-input>
                                    </el-form-item>
                                </div>
                                <div class="query-cont-col">
                                    <el-form-item label="该阶段逾期利率：">
                                        <el-input v-model.trim="item.overDueInterest" v-isNum:0="item.overDueInterest" maxlength='5' placeholder="请输入逾期利息"><template slot="append">%</template></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 分割线 -->
                <div class="fgx"></div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSaveplan()">保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { setPlan } from './../../api'
import { setCountMixin } from '../../mixins/setCount'
export default {
    name: 'repaymentDialog',
    mixins: [setCountMixin],
    data () {
        return {
            radio: '月',
            radiox: '1',
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
    methods: {
        async dealCount (query) {
            const res = await this.onCount(query)
            console.log('res: ', res)
            /* res格式: {
                "graceInterestAmount": '', // 宽限期利息
                "interestAmount": '', // 利息
                "overDueInterestList": [] // 逾期利息集合
            } */
            query.graceInterestAmount = res.graceInterestAmount
            query.interestAmount = res.interestAmount
            // "overDueInterestList": [] // 逾期利息集合 这个我也不知道。
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
            await setPlan({ planList: this.detailData })
            this.$message({ type: 'success', message: '修改成功' })
            this.onCancle()
            this.$emit('reload')
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding: 20px 24px;
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
