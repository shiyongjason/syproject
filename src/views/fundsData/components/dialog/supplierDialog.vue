<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
        <div class="form">
            <el-form :model="misForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <div class="dialogtitle">借款信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="供货商名称：" prop="name">
                            <el-input v-model.trim="misForm.name" placeholder="请输入供货商名称"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="借款金额：" prop="name">
                            <el-input v-model.trim="misForm.name" placeholder="请输入借款金额"></el-input>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="年利率：" prop="name">
                            <el-input v-model.trim="misForm.name" placeholder="请输入年利率"></el-input>
                            <span class="dw">%</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="放款日期：" prop="name">
                            <el-date-picker v-model="misForm.name" type="date" value-format='yyyy-MM-dd' placeholder="请选择放款日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="借款期限： " prop="name">
                            <el-radio style="margin-right:5px" v-model.trim="radio" label="月"></el-radio>
                            <el-input v-model.trim="misForm.name" placeholder="请输入借款期限"></el-input>
                            <span class="dw">月</span>
                            <el-radio style="margin:0 5px 0 10px" v-model.trim="radio" label="天"></el-radio>
                            <el-input v-model.trim="misForm.name" placeholder="请输入借款期限"></el-input>
                            <span class="dw">天</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="到期日：" prop="name">
                            <!-- 自动计算，到期日=开票日期+借款期限 -->
                            <span>2020-11-18</span>
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
</template>

<script>
export default {
    name: 'supplierDialog',
    data () {
        return {
            radio: '月',
            form: {
                name: ''
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
}
.dw {
  margin-left: 10px;
}
</style>
