<template>
    <!-- 新增流贷弹窗 -->
    <div class="flowbody page-body">
        <div class="page-body-cont query-cont">
            <el-form :model="form" :rules="rules" ref="form" label-width="130px" class="demo-form">
                <div class="dialogtitle">基础信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账编号：" prop="standingBookNo">
                            <el-input v-model.trim="ruleForm.account.standingBookNo" placeholder="请输入台账编号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="金云系统编号：" prop="jinyunArchiveNo">
                            <el-input v-model.trim="ruleForm.account.jinyunArchiveNo" placeholder="如有请输入，无请忽略"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="借款单位：" prop="loanCompanyName">
                            <el-input v-model.trim="ruleForm.account.loanCompanyName" placeholder="请输入平台公司名"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="MIS编码：" prop="misCode">
                            <el-input v-model.trim="ruleForm.account.misCode" placeholder="如有请输入，无请忽略"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="分部：" prop="subsectionName">
                            <el-input v-model.trim="ruleForm.account.subsectionName" placeholder="自动带入"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <!--抽离-->
                <div class="dialogtitle">借款信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="供货商名称：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="请输入供货商名"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="借款金额：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="请输入借款金额"><template slot="append">元</template></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="年利率：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="请输入年利率"><template slot="append">%</template></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="放款日期：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="请输入年利率"><template slot="append">%</template></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="借款期限： " prop="name">
                            <el-radio v-model.trim="radio" label="月"></el-radio>
                            <el-radio v-model.trim="radio" label="天"></el-radio>
                            <el-input v-model.trim="form.name" placeholder="请输入借款期限"><template slot="append">{{radio?'月':'天'}}</template></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="到期日：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="请输入借款期限"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <!--抽离-->
                <div class="dialogtitle">还款信息：</div>
                <div class="query-cont-col">
                    <el-form-item label="还款方式：" prop="name">
                        一次性还款
                    </el-form-item>
                </div>
                <h3>逾期</h3>
                <div class="query-cont-row">
                    <el-form-item label="阶梯式计息：" prop="name">
                        <el-radio v-model.trim="radio" label="1">否</el-radio>
                        <el-radio v-model.trim="radio" label="1">是</el-radio>
                    </el-form-item>
                </div>
                <div class="smalltitle">逾期第一阶段利息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="第一阶段时长：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="请输入逾期时长"><template slot="append">月</template></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="该阶段逾期利率：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="请输入逾期利息"><template slot="append">%</template></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-button type="primary" size="small" @click="onSubmit" icon="el-icon-minus">删除</el-button>
                    </div>
                </div>
                <div>
                    <el-button type="primary" size="small" @click="onSubmit" icon="el-icon-plus">下阶段利息</el-button>
                </div>
                <div class="dialogtitle">档案信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账档案编号：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="请输入台账档案编号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="金云档案编号：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="请输入金云档案编号"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="dialogtitle">备注：</div>
                <div class="query-cont-row">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                    </el-input>
                </div>
                <div class="flow-bottom">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </div>
            </el-form>

        </div>
    </div>
</template>

<script>
export default {
    name: 'newLedger',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            rules: {
                jinyunArchiveNo: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ]
            },
            ruleForm: {
                name: '',
                account: {
                    accountType: '',
                    jinyunArchiveNo: '',
                    loanCompanyCode: '',
                    loanCompanyName: '',
                    misCode: '',
                    productType: '',
                    remark: '',
                    standingBookArchiveNo: '',
                    standingBookNo: '',
                    subsectionCode: '',
                    subsectionName: ''
                },
                loan: {
                    depositPay: '',
                    depositProportion: '',
                    invoiceAmount: '',
                    invoiceTime: '',
                    loanAmount: '',
                    loanDateNum: '',
                    loanDateType: '',
                    loanEndTime: '',
                    loanStartTime: '',
                    registrant: '',
                    repaymentType: '',
                    standingBookId: '',
                    supplier: '',
                    yearRate: ''
                },
                overdue: {
                    dateNum: '',
                    dateType: '',
                    overDueInterest: '',
                    planId: '',
                    sort: '',
                    startTime: ''
                },
                plan: {
                    capitalAmount: '',
                    capitalPaid: '',
                    dealTime: '',
                    exsitGrace: '',
                    graceDay: '',
                    graceInterest: '',
                    graceInterestAmount: '',
                    graceInterestPaid: '',
                    interestAmount: '',
                    interestPaid: '',
                    isStepOverInterest: '',
                    overDueInterest: '',
                    overDueInterestAmount: '',
                    overDueInterestPaid: ''
                }
            }
        }
    },
    methods: {
        onSubmit () {
            // 操作
            this.$refs.ruleForm.validate((valid) => {

            })
        },
        onCancle () {
            this.$emit('onClose')
        }
    }
}
</script>

<style lang="scss" scoped>
h3 {
    font-size: 14px;
}
.dialogtitle {
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
    line-height: 30px;
}
.flowbody {
    .query-cont-col {
        margin-bottom: 10px;
    }
}
.smalltitle {
    color: #f00;
    line-height: 30px;
}
.flow-bottom {
    margin: 20px auto;
}
</style>
