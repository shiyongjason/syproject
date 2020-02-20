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
                            <el-radio v-model.trim="detailData[0].repaymentType" :label=2>334</el-radio>
                            <el-radio v-model.trim="detailData[0].repaymentType" :label=1>一次性还款</el-radio>
                        </el-form-item>
                    </div>
                </div>
                <div class="ftitle">第一次性还款：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="约定还款日期：" prop="name">
                            <el-date-picker v-model="form.name" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="是否存在宽限期：" prop="name">
                            <el-radio style="margin-right:5px" v-model.trim="radio" label="是"></el-radio>
                            <span style="margin-left:15px">宽限日期：</span>
                            <!-- 仅允许输入非负整数，最多允许输入3位 -->
                            <el-input placeholder="请输入宽限期限" v-model.trim="form.name" v-isNum:0='form.name' maxlength='3'></el-input>
                            <span class="dw">天</span>
                            <span style="margin-left:25px">宽限期利率：</span>
                            <el-input v-model.trim="form.x" v-isNum="form.name" maxlength='20' placeholder="请输入宽限期利率"></el-input>
                            <span class="dw">%</span>
                            <el-radio style="margin:0 5px 0 15px" v-model.trim="radio" label="否"></el-radio>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="约定还款金额：" prop="name">
                            <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入还款金额"></el-input>
                            <span class="dw">元</span>
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
                            <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入还款金额"></el-input>
                            <span class="dw">元</span>
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
                            <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入应收利息"></el-input>
                            <span class="dw">元</span>
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
                            <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入应收利息"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="剩余宽限利息：" prop="name">
                            <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入应收利息"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="endline">逾期</div>
                <div class="query-cont-row" style="margin-top:10px">
                    <div class="query-cont-col">
                        <el-form-item label="阶梯式计息：" prop="name">
                            <el-radio v-model.trim="radiox" label="1">否</el-radio>
                            <el-radio v-model.trim="radiox" label="0">是</el-radio>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="逾期利率：" prop="name">
                            <el-input v-model.trim="form.x" v-isNum="form.name" maxlength='20' placeholder="请输入逾期利息"></el-input>
                            <span class="dw">%</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="应缴纳逾期罚息：" prop="name">
                            <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入利息金额"></el-input>
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
                            <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入利息金额"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="剩余逾期罚息：" prop="name">
                            <el-input v-model.trim="form.name" v-isNum="form.name" maxlength='20' placeholder="请输入利息金额"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
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
            }
        }
    },
    watch: {
        detailData (val) {
            // this.form = { ...val }
        }
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
        console.log(this.form)
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
