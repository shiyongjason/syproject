<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
                <div class="form">
                    <el-form :model="misForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item label="台账编号：" prop="name">
                                    <el-input v-model.trim="misForm.name" placeholder="请输入台账编号"></el-input>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="金云系统编号：" prop="name">
                                    <el-input v-model.trim="misForm.name" placeholder="如有请输入，无请忽略"></el-input>
                                </el-form-item>
                            </div>
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
                    <el-button type="primary" @click="onSure">保 存</el-button>
                </span>
            </el-dialog>
        </div>
    </div>

</template>

<script>
export default {
    name: 'misDialog',
    data () {
        return {
            title: '好信用—流贷基础信息维护',
            misForm: {
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
    watch: {
        detailData (v) {
            console.log(v)
            switch (v.source) {
                case 0:
                    this.title = '好信用—流贷基础信息维护'
                    break
                case 1:
                    this.title = '好信用—分授信基础信息维护'
                    break
                case 2:
                    this.title = '好信用—敞口基础信息维护'
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
</style>
