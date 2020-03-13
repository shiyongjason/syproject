<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <h3>客户基本信息</h3>
            </div><br>
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
                <el-form-item label="企业名称:" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="社会信用统一代码:" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="老公司平台名称:">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="公司代码:">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="实际控制人姓名:" prop='name'>
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="上线日期:" required>
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择上线日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="实际控制人手机号:" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="实际控制人身份证号:" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商铺门头名称:">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="注册资本:">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="法人代表:">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="注册日期:">
                    <el-form-item>
                        <el-date-picker type="date" placeholder="选择注册日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="操作人名称:" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="操作人手机号:" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="公司类型:">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经营行业:">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="营业地址:">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细营业地址:">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="是否还在经营:" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="销售模式:" prop="type">
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="零售" name="type"></el-checkbox>
                        <el-checkbox label="批发" name="type"></el-checkbox>
                        <el-checkbox label="工程" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="mis编码:" prop="desc">
                    <el-input type="test" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="权益等级:" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户所属组织:" prop="desc">
                    <el-input type="test" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="企业类别:" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <div class="form_sumbit">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
                        <el-button @click="resetForm('ruleForm')">重 置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data () {
        return {
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.setNewTags((this.$route.fullPath).split('?')[0])
                    this.$router.push('/jinyun/businessCustomer')
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style lang='scss' scoped>
.el-form {
    width: 900px;
    display: flex;
    flex-wrap: wrap;
}
/deep/.el-form-item__content {
    width: 224px;
}
.form_sumbit {
    margin-left: 338px;
    text-align: center;
}
</style>
