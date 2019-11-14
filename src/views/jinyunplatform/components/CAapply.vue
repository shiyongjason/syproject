<template>
    <div class="page-body-cont query-cont">
        <div class="query-cont-col">
            <div>请先提交创建人和企业的基本信息，然后点击上传印章图片按钮，跳到对应页面上传印章图片（注：印章图片必须为清晰的白色背景的扫描图片或高清拍照图片）</div>
        </div>
        <hr><br>
        <div class="query-cont-col">
            <div>企业CA认证申请</div>
        </div><br>
        <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="操作人姓名：" label-width='150px' prop="operatorName">
                <el-input v-model="ruleForm.operatorName"></el-input>
            </el-form-item>
            <el-form-item label="操作人手机号：" label-width='150px' prop="operatorPhone">
                <el-input v-model="ruleForm.operatorPhone"></el-input>
            </el-form-item>
            <el-form-item label="操作人邮箱：" label-width='150px' prop="operatorEmail">
                <el-input v-model="ruleForm.operatorEmail"></el-input>
            </el-form-item>
            <el-form-item label="操作人身份证号：" label-width='150px' prop="operatorIdNumber">
                <el-input v-model="ruleForm.operatorIdNumber"></el-input>
            </el-form-item>
            <el-form-item label="企业类型：" label-width='150px' prop="companyType">
                <el-select v-model="ruleForm.companyType">
                    <el-option v-for="(item,index) in companyType" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="企业名称：" label-width='150px' prop="companyName">
                <el-input v-model="ruleForm.companyName" disabled></el-input>
                <el-button class="applyBtn" @click="dialogVisible = true">选择</el-button>
            </el-form-item>
            <el-form-item label="组织机构代码：" label-width='150px' prop="companyDocumentType">
                <el-input v-model="ruleForm.companyDocumentType"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" label-width='150px' prop="legalName">
                <el-input v-model="ruleForm.legalName"></el-input>
            </el-form-item>
            <el-form-item label="法人手机号：" label-width='150px' prop="legalPhone">
                <el-input v-model="ruleForm.legalPhone"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证号：" label-width='150px' prop="legalIdNumber">
                <el-input v-model="ruleForm.legalIdNumber"></el-input>
            </el-form-item>
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSubmit('ruleForm')">
                        提交
                    </el-button>
                    <el-button type="primary" class="ml20" @click="uploadSeal">上传印章图片</el-button>
                </div>
            </div>
        </el-form>
        <el-dialog title="新建标签" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <div class="add-tags-dialog">
                <div class="query-cont-col">
                    <div class="query-col-title">标签名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="20" v-model="addTags.labelName" placeholder="请输入标签名">
                        </el-input>
                    </div>
                </div>
            </div>
            <div>
                <div class="query-cont-col">
                    <div class="query-col-title">标签类型：</div>
                    <div class="query-col-input">
                        <el-radio v-model="addTags.labelType" label="1">手动标签</el-radio>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="createTags">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'caApply',
    data () {
        return {
            dialogVisible: false,
            addTags: {},
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                keywords: '',
                companyType: ''
            },
            ruleForm: {},
            rules: {
                operatorName: [
                    { required: true, message: '请输入操作人姓名', trigger: 'blur' }
                ],
                operatorPhone: [
                    { required: true, message: '请输入操作人手机号', trigger: 'blur' }
                ],
                operatorEmail: [
                    { required: true, message: '请输入操作人邮箱', trigger: 'blur' }
                ],
                operatorIdNumber: [
                    { required: true, message: '请输入操作人身份证号', trigger: 'blur' }
                ],
                companyType: [
                    { required: true, message: '请选择企业类型', trigger: 'change' }
                ],
                companyName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                companyDocumentType: [
                    { required: true, message: '请输入机构代码', trigger: 'blur' }
                ],
                legalName: [
                    { required: true, message: '请输入法人姓名', trigger: 'blur' }
                ],
                legalPhone: [
                    { required: true, message: '请输入法人手机号', trigger: 'blur' }
                ],
                legalIdNumber: [
                    { required: true, message: '请输入法人身份证号', trigger: 'blur' }
                ]
            },
            companyType: [
                { value: '', label: '全部' },
                { value: 1, label: '借款方' },
                { value: 2, label: '资金方' },
                { value: 3, label: '合作方' },
                { value: 4, label: '组织方' },
                { value: 5, label: '担保方' }
            ]
        }
    },
    methods: {
        onQuery () {
            this.$emit('onQuery')
        },
        onSubmit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                    this.onQuery()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        createTags () { },
        uploadSeal () {
            this.onQuery()
        },
        cancel () {
            this.dialogVisible = false
            this.addTags.labelName = ''
        }
    }
}
</script>

<style scoped>
.applyBtn {
    position: absolute;
    right: 0;
    border: 1px solid #f56c6c;
}
</style>