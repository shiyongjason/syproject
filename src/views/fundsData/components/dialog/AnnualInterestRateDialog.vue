<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
                <div class="form">
                    <el-form :model="misForm" :rules="rules" ref="ruleForm" label-width="165px" class="demo-ruleForm">
                        <div class="dialogtitle">还款信息：</div>
                        <div class="ftitle"><b>还款方式：</b>一次性还款</div>
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item label="本次还本金时间：" prop="name">
                                    <el-date-picker v-model="misForm.name" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次还款：" prop="name">
                                    <el-input v-model.trim="misForm.name" placeholder="请输入本次还款"></el-input>
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
                                    <el-input v-model.trim="misForm.name" placeholder="请输入宽限期限" max-length='3'></el-input>
                                    <span class="dw">天</span>
                                    <span style="margin-left:25px">宽限日期：</span>
                                    <el-input v-model.trim="misForm.x" placeholder="请输入借款期限"></el-input>
                                    <span class="dw">%</span>
                                    <el-radio style="margin:0 5px 0 15px" v-model.trim="radio" label="否"></el-radio>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="宽限期利息：" prop="name">
                                    <!-- 支持修改，修改规则同通用样式，仅允许输入数字，允许输入俩位小数，含小数点最多20位 -->
                                    <el-input v-isNum="misForm.name" maxlength='20' v-model.trim="misForm.name" placeholder="请输入宽限期利息"></el-input>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次还宽限利息时间：" prop="name">
                                    <el-date-picker v-model="misForm.name" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="本次收取宽限利息：" prop="name">
                                    <!-- 支持修改，修改规则同通用样式，仅允许输入数字，允许输入俩位小数，含小数点最多20位 -->
                                    <el-input v-model.trim="misForm.name" placeholder="请输入应收利息"></el-input>
                                    <span class="dw">元</span>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col" style="margin-left: -24px;">
                                <el-form-item label="剩余宽限利息：" prop="name">
                                    <!-- 支持修改，修改规则同通用样式，仅允许输入数字，允许输入俩位小数，含小数点最多20位 -->
                                    <el-input v-model.trim="misForm.name" placeholder="请输入应收利息"></el-input>
                                    <span class="dw">元</span>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="onCancle">取 消</el-button>
                    <el-button type="primary" @click="onSure">保 存</el-button>
                </span>
            </el-dialog>
        </div>
    </div>

</template>

<script>
export default {
    name: 'AnnualInterestRateDialog',
    data () {
        return {
            title: '好信用—流贷还款信息维护',
            radio: '是',
            misForm: {
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
    watch: {
        detailData (v) {
            console.log(v)
            switch (v.source) {
                case 0:
                    this.title = '好信用—流贷还款信息维护'
                    break
                case 1:
                    this.title = '好信用—分授信还款信息维护'
                    break
                case 2:
                    this.title = '好信用—敞口还款信息维护'
                    break
            }
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
</style>
