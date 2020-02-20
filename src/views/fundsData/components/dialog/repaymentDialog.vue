<template>
    <!-- <div class="page-body">
        <div class="page-body-cont query-cont"> -->
    <el-dialog :title="detailData[0].title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center custom-class='diyclass'>
        <div class="form">
            {{detailData}}
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="165px" class="demo-ruleForm">
                <!-- <div class="dialogtitle">还款方式：</div> -->
                <div class="query-cont-row" style="height: 40px;">
                    <div class="query-cont-col">
                        <el-form-item prop="repaymentType">
                            <span slot='label' style="color:#000;font-size:18px"><b>还款方式：</b></span>
                            <el-radio v-model.trim="detailData[0].repaymentType" :label=2 @change="onRepaymentTypeChange(2)">334</el-radio>
                            <el-radio v-model.trim="detailData[0].repaymentType" :label=1 @change="onRepaymentTypeChange(1)">一次性还款</el-radio>
                        </el-form-item>
                    </div>
                </div>
                <div v-for="(item,index) in detailData" :key="index">
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
                                <el-input placeholder="请输入宽限期限" v-model.trim="item.graceDay" v-isNum:0='item.graceDay' maxlength='3' v-if="item.exsitGrace==1">
                                    <template slot="append">天</template>
                                </el-input>
                                <span style="margin-left:25px" v-if="item.exsitGrace==1">宽限期利率：</span>
                                <el-input v-model.trim="form.x" v-isNum="form.name" maxlength='20' placeholder="请输入宽限期利率" v-if="item.exsitGrace==1">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="约定还款金额：" prop="capitalAmount">
                                <el-input v-model.trim="item.capitalAmount" v-isNum="item.capitalAmount" maxlength='20' placeholder="请输入还款金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次还利息时间：" prop="name">
                                <el-date-picker v-model="form.name" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次还款金额：" prop="name">
                                <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入还款金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>

                        <div class="query-cont-col">
                            <el-form-item label="剩余还款金额：" prop="name">
                                <!-- 剩余还款金额=约定还款金额-累计还款本金金额 -->
                                <span>1111</span>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="宽限期利息：" prop="name">
                                <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入应收利息">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次还宽限利息时间：" prop="name">
                                <el-date-picker v-model="form.name" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次收取宽限利息：" prop="name">
                                <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入应收利息">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="剩余宽限利息：" prop="name">
                                <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入应收利息">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="endline">逾期</div>
                <div class="query-cont-row" style="margin-top:10px">
                    <div class="query-cont-col">
                        <el-form-item label="阶梯式计息：" prop="name">
                            <el-radio v-model.trim="detailData[0].isStepOverInterest" :label=1>是</el-radio>
                            <el-radio v-model.trim="detailData[0].isStepOverInterest" :label=0>否</el-radio>
                        </el-form-item>
                    </div>
                </div>
                <div v-if="detailData[0].isStepOverInterest==0">
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="逾期利率：" prop="name">
                                <el-input v-model.trim="detailData[0].overdueList[0].dateNum" v-isNum="detailData[0].overdueList[0].dateNum" maxlength='20' placeholder="请输入逾期利息">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="应缴纳逾期罚息：" prop="name">
                                <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入利息金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次还罚息时间：" prop="name">
                                <el-date-picker v-model="form.name" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次缴纳逾期罚息：" prop="name">
                                <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入利息金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="剩余逾期罚息：" prop="name">
                                <el-input v-model.trim="detailData[0].overdueList[0].dateNum" v-isNum="form.name" maxlength='20' placeholder="请输入利息金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div v-if="detailData[0].isStepOverInterest==1">
                    <div class="smalltitle">逾期第一阶段利息：</div>
                    <div class="query-cont-row" v-for="(item,index) in detailData[0].overdueList" :key="index">
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
                        <div class="query-cont-col">
                            <el-button type="primary" size="small" @click="onDeleteRate(index)" icon="el-icon-minus">删除
                            </el-button>
                        </div>
                    </div>
                    <div>
                        <el-button type="primary" size="small" @click="onAddrate" icon="el-icon-plus" v-if="detailData[0].overdueList.length<5">下阶段利息</el-button>
                    </div>
                </div>
                <!-- 分割线 -->
                <div class="fgx"></div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary">保 存</el-button>
        </span>
    </el-dialog>
    <!-- </div>
    </div> -->

</template>

<script>
export default {
    name: 'repaymentDialog',
    data () {
        return {
            radio: '月',
            radiox: '1',
            form: {
                name: '',
                x: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入台账编号', trigger: 'blur' }
                ]
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
    mounted () {
        console.log(this.detailData)
        this.planListItem = { ...this.detailData[0] }
    },
    methods: {
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
        onRepaymentTypeChange (val) {
            this.detailData = []
            if (val === 1) {
                this.detailData.push({ ...this.planListItem })
            } else if (val === 2) {
                for (let i = 0; i < 3; i++) {
                    this.detailData.push({ ...this.planListItem })
                }
            }
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
