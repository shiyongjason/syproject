<template>
    <div>
        <el-dialog title="添加签署方" :visible.sync="tract_visible" width="30%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="签署方名称：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="签署方名称：" prop="name">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="企业"></el-radio>
                        <el-radio label="个人"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="请选择合同企业：">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经办人：" prop="name">
                    经办人由发起人指定
                </el-form-item>
                <el-form-item label="签署要求：" prop="name">
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="tract_visible = false">取 消</el-button>
                <el-button type="primary" @click="tract_visible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: '',
    data () {
        return {
            tract_visible: false,
            ruleForm: {
                name: '',
                region: '',
                resource: '',
                type: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            }

        }
    },
    methods: {
        onShowDialog (val) {
            this.tract_visible = true
        },
        handleClose () {

        }
    }
}
</script>
<style lang="scss" scoped>
</style>