<template>
    <div class="page-body-cont query-cont">
        <div class="query-cont-col">
            <h3>银行账户导入</h3>
        </div>
        <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="企业名称：" label-width='150px' prop="companyName">
                <el-input v-model="ruleForm.companyName" placeholder='请选择企业名称' disabled></el-input>
                <el-button class="applyBtn" @click="onChoose">选择</el-button>
            </el-form-item>
            <el-form-item label="客户号" label-width='150px' prop="operatorIdNumber">
                <el-input v-model="ruleForm.operatorIdNumber" placeholder='自动获取' disabled></el-input>
            </el-form-item>
            <el-form-item label="账户名称" label-width='150px' prop="operatorEmail">
                <el-input v-model="ruleForm.operatorEmail" placeholder='请输入账户名称'></el-input>
            </el-form-item>
            <el-form-item label="开户银行" label-width='150px' prop="companyLicenseNumber">
                <el-input v-model="ruleForm.companyLicenseNumber" placeholder='请输入组织机构代码'></el-input>
            </el-form-item>
            <el-form-item label="银行账号" label-width='150px' prop="legalName">
                <el-input v-model="ruleForm.legalName" placeholder='请输入法人姓名' width='500'></el-input>
            </el-form-item>
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSubmit('ruleForm')">
                        提交
                    </el-button>
                </div>
            </div>
        </el-form>
        <el-dialog title="选择客户" :visible.sync="dialogVisible" :close-on-click-modal="false" width='25%'>
            <!-- <div class="add-tags-dialog">
                <div class="query-cont-col">
                    <div class="query-col-title">标签名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="20" v-model="addTags.labelName" placeholder="请输入标签名">
                        </el-input>
                    </div>
                </div>
            </div> -->
            <div class="dialogContent">
                <div class="query-cont-col">
                    <div class="query-col-title">客户名称：</div>
                    <div class="query-col-input">
                        <HAutocomplete :placeholder="'输入客户名称'" @back-event="backFindcode" :selectArr="productSource" :remove-value='removeValue' />
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="onSave">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { getSignSelector, signCa } from '../api/index'
import { PHONE, checkIdCard } from '@/utils/rules'
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
            ruleForm: {
                companyDocumentType: 1
            },
            rules: {
                operatorName: [
                    { required: true, message: '请输入操作人姓名', trigger: 'blur' }
                ],
                operatorPhone: [
                    { required: true, message: '请输入操作人手机号', trigger: 'blur' },
                    { validator: PHONE, trigger: 'blur' }
                ],
                operatorEmail: [
                    { required: true, message: '请输入操作人邮箱', trigger: 'blur' }
                ],
                operatorIdNumber: [
                    { required: true, message: '请输入操作人身份证号', trigger: 'blur' },
                    { validator: checkIdCard, trigger: 'blur' }
                ],
                companyType: [
                    { required: true, message: '请选择企业类型', trigger: 'change' }
                ],
                companyName: [
                    { required: true, message: '请选择企业名称', trigger: 'blur' }
                ],
                companyLicenseNumber: [
                    { required: true, message: '请输入组织机构代码', trigger: 'blur' },
                    { validator: this.checkOIBCode, trigger: 'blur' }
                ],
                legalName: [
                    { required: true, message: '请输入法人姓名', trigger: 'blur' }
                ],
                legalPhone: [
                    { required: true, message: '请输入法人手机号', trigger: 'blur' },
                    { validator: PHONE, trigger: 'blur' }
                ],
                legalIdNumber: [
                    { required: true, message: '请输入法人身份证号', trigger: 'blur' },
                    { validator: checkIdCard, trigger: 'blur' }
                ]
            },
            companyType: [
                { value: 1, label: '借款方' },
                { value: 2, label: '资金方' },
                { value: 3, label: '合作方' },
                { value: 4, label: '组织方' },
                { value: 5, label: '担保方' }
            ],
            productSource: [],
            removeValue: false,
            companyName: ''
        }
    },
    components: {
        HAutocomplete
    },
    methods: {
        // 组织机构代码检验正则
        checkOIBCode (rule, value, callback) {
            var reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g
            if (!value) {
                return callback(new Error('请输入组织机构代码'))
            } else if (value && reg.test(value) === false) {
                return callback(new Error('组织机构代码输入不合法'))
            } else {
                return callback()
            }
        },
        onQuery () {
            this.$emit('onSearch')
        },
        async signCa () {
            await signCa(this.ruleForm)
        },
        onSubmit (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await this.signCa()
                    this.onQuery()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        onSave () {
            this.ruleForm.companyName = this.companyName
            this.dialogVisible = false
        },
        cancel () {
            this.dialogVisible = false
            this.addTags.labelName = ''
        },
        async onChoose () {
            // const params = {
            //     companyType: this.ruleForm.companyType
            // }
            // const { data } = await getSignSelector(params)
            // if (this.ruleForm.companyType == 1) {
            //     this.productSource = data.corporations
            //     this.productSource.map(item => {
            //         item.value = item.name
            //         item.selectCode = item.name
            //     })
            // } else if (this.ruleForm.companyType == 2) {
            //     this.productSource = data.fundProviders
            //     this.productSource.map(item => {
            //         item.value = item.name
            //         item.selectCode = item.name
            //     })
            // } else {
            //     this.productSource = []
            // }
            this.dialogVisible = true
        },
        backFindcode (val) {
            console.log(val.value.value)
            this.companyName = val.value.value
        }
    }
}
</script>

<style lang='scss' scoped>
.applyBtn {
    position: absolute;
    right: 0;
    border: 1px solid #f56c6c;
}
/deep/ .el-dialog__body {
    min-height: auto;
}
.dialogContent {
    padding-top: 30px;
}
</style>