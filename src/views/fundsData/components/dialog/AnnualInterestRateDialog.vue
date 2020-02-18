<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center custom-class='diyclass'>
        <div class="form">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="165px" class="demo-ruleForm">
                <div class="dialogtitle">还款信息：</div>
                <div class="ftitle">
                    <b>还款方式：</b>一次性还款</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="本次还本金时间：" prop="name">
                            <el-date-picker v-model="form.name" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次还款：" prop="name">
                            <el-input v-isNum="form.name" maxlength='20' v-model.trim="form.name" placeholder="请输入本次还款"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="欠收本金：" prop="name">
                            <!-- 欠收本金=借款金额-累计实收借款本金 -->
                            <span>111</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="是否存在宽限期：" prop="name">
                            <el-radio style="margin-right:5px" v-model.trim="radio" label="是"></el-radio>
                            <span style="margin-left:15px">宽限日期：</span>
                            <!-- 仅允许输入非负整数，最多允许输入3位 -->
                            <el-input placeholder="请输入宽限期限" v-model.trim="form.name" v-isNum:0='form.name' maxlength='3'></el-input>
                            <span class="dw">天</span>
                            <span style="margin-left:25px">宽限期利率：</span>
                            <el-input v-model.trim="form.x" v-isNum="form.x" maxlength='20' placeholder="请输入宽限期利率"></el-input>
                            <span class="dw">%</span>
                            <el-radio style="margin:0 5px 0 15px" v-model.trim="radio" label="否"></el-radio>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="宽限期利息：" prop="name">
                            <!-- 支持修改，修改规则同通用样式，仅允许输入数字，允许输入俩位小数，含小数点最多20位 -->
                            <el-input v-isNum="form.name" maxlength='20' v-model.trim="form.name" placeholder="请输入宽限期利息"></el-input>
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
                            <!-- 支持修改，修改规则同通用样式，仅允许输入数字，允许输入俩位小数，含小数点最多20位 -->
                            <el-input v-isNum="form.name" maxlength='20' v-model.trim="form.name" placeholder="请输入应收利息"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col" style="margin-left: -24px;">
                        <el-form-item label="剩余宽限利息：" prop="name">
                            <!-- 支持修改，修改规则同通用样式，仅允许输入数字，允许输入俩位小数，含小数点最多20位 -->
                            <el-input v-isNum="form.name" maxlength='20' v-model.trim="form.name" placeholder="请输入应收利息"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="应收利息：" prop="name">
                            <el-input v-isNum="form.name" maxlength='20' v-model.trim="form.name" placeholder="请输入应收利息"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col" style="margin-left:-25px">
                        <el-form-item label="本次还利息时间：" prop="name">
                            <el-date-picker v-model="form.name" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次收取利息：" prop="name">
                            <el-input v-isNum="form.name" maxlength='20' v-model.trim="form.name" placeholder="请输入本次收取利息"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="剩余利息：" prop="name">
                            <!-- 默认自动计算,剩余利息=应收利息-累计实收利息,2、支持修改，修改规则同通用样式，仅允许输入数字，允许输入俩位小数，含小数点最多20位 -->
                            <el-input v-isNum="form.name" maxlength='20' v-model.trim="form.name" placeholder="请输入剩余利息"></el-input>
                            <span class="dw">月</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="dialogtitle">逾期</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="阶梯式计息：" prop="name">
                            <el-radio v-model.trim="radio2" label="1">否</el-radio>
                            <el-radio v-model.trim="radio2" label="2">是</el-radio>
                        </el-form-item>
                    </div>
                </div>
                <div class="smalltitle">
                    逾期第一阶段利息：
                    <span class="query-cont-col" style="margin-left:162px">
                        <el-button type="primary" size="small">删除</el-button>
                    </span>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="第一阶段时长：" prop="name">
                            <el-input v-model.trim="form.name" v-isNum:0='form.name' maxlength='5' placeholder="请输入逾期时长"></el-input>
                            <span class="dw">月</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="该阶段逾期利率：" prop="name">
                            <el-input v-isNum="form.name" maxlength='20' v-model.trim="form.name" placeholder="请输入逾期利息"></el-input>
                            <span class="dw">%</span>
                        </el-form-item>
                    </div>
                </div>
                <div style="margin-left:20px;margin-bottom: 20px;">
                    <el-button type="primary" size="small" icon="el-icon-plus">下阶段利息</el-button>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="应缴纳逾期罚息：" prop="name">
                            <el-input v-model.trim="form.name" v-isNum='form.name' maxlength='20' placeholder="请输入利息金额"></el-input>
                            <span class="dw">元</span>
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
                            <el-input v-model.trim="form.name" v-isNum='form.name' maxlength='20' placeholder="请输入利息金额"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="剩余逾期罚息：" prop="name">
                            <el-input v-model.trim="form.name" v-isNum='form.name' maxlength='20' placeholder="请输入利息金额"></el-input>
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
                name: '', x: ''
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
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        onCancle () {
            this.$emit('onClose')
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
