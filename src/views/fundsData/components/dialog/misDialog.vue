<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
        <div class="form">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账编号：" prop="name">
                            <el-input v-isNum:0="form.name" v-model.trim="form.name" placeholder="请输入台账编号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="金云系统编号：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="如有请输入，无请忽略"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="借款单位：" prop="name">
                            <el-input v-model.trim="form.name"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="MIS编码：" prop="name">
                            <el-input v-model.trim="form.name"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="分部：" prop="name">
                            <el-input v-model.trim="form.name"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="query-cont-row">
            <div class="query-cont-col">
                <el-form-item label="借款单位：" prop="name">
                    <el-input v-model.trim="misForm.name"></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="MIS编码：" prop="name">
                    <el-input v-model.trim="misForm.name"></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="分部：" prop="name">
                    <el-input v-model.trim="misForm.name"></el-input>
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
    name: 'misDialog',
    data () {
        return {
            // title: '好信用—流贷基础信息维护',
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
</style>
