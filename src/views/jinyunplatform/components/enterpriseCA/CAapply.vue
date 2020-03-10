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
                <el-input v-model="ruleForm.operatorName" placeholder='请输入操作人姓名'></el-input>
            </el-form-item>
            <el-form-item label="操作人手机号：" label-width='150px' prop="operatorPhone">
                <el-input v-model="ruleForm.operatorPhone" placeholder='请输入操作人手机号' :maxlength='11'></el-input>
            </el-form-item>
            <el-form-item label="操作人邮箱：" label-width='150px' prop="operatorEmail">
                <el-input v-model="ruleForm.operatorEmail" placeholder='请输入操作人邮箱'></el-input>
            </el-form-item>
            <el-form-item label="操作人身份证号：" label-width='150px' prop="operatorIdNumber">
                <el-input v-model="ruleForm.operatorIdNumber" placeholder='请输入操作人身份证号' :maxlength='18'></el-input>
            </el-form-item>
            <el-form-item label="企业类型：" label-width='150px' prop="companyType">
                <el-select v-model="ruleForm.companyType" placeholder='请选择企业类型'>
                    <el-option v-for="(item,index) in companyType" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="企业名称：" label-width='150px' prop="companyName">
                <el-input v-model="ruleForm.companyName" placeholder='请选择企业名称' disabled></el-input>
                <el-button class="applyBtn" @click="onChoose">选择</el-button>
            </el-form-item>
            <el-form-item label="组织机构代码：" label-width='150px' prop="companyLicenseNumber">
                <el-input v-model="ruleForm.companyLicenseNumber" placeholder='请输入组织机构代码'></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" label-width='150px' prop="legalName">
                <el-input v-model="ruleForm.legalName" placeholder='请输入法人姓名'></el-input>
            </el-form-item>
            <el-form-item label="法人手机号：" label-width='150px' prop="legalPhone">
                <el-input v-model="ruleForm.legalPhone" placeholder='请输入法人手机号' :maxlength='11'></el-input>
            </el-form-item>
            <el-form-item label="法人身份证号：" label-width='150px' prop="legalIdNumber">
                <el-input v-model="ruleForm.legalIdNumber" placeholder='请输入法人身份证号' :maxlength='18'></el-input>
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
import { getSignSelector, signCa } from '../../api/index'
import { PHONE, checkIdCard, Email } from '@/utils/rules'
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
                    { required: true, message: '请输入操作人邮箱', trigger: 'blur' },
                    { validator: Email, trigger: 'blur' }
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
        onSubmit (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.$store.dispatch('tracking', {
                        type: 9,
                        event: 1,
                        page: 1,
                        page_name: '企业CA',
                        page_path_name: 'enterpriseCA'
                    })
                    await signCa(this.ruleForm)
                    this.$emit('onSearch')
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
            if (!this.ruleForm.companyType) {
                this.$message.warning('请先选择企业类型！')
                return
            }
            const params = {
                companyType: this.ruleForm.companyType
            }
            const { data } = await getSignSelector(params)
            if (this.ruleForm.companyType == 1) {
                this.productSource = data.corporations
                this.productSource.map(item => {
                    item.value = item.name
                    item.selectCode = item.name
                })
            } else if (this.ruleForm.companyType == 2) {
                this.productSource = data.fundProviders
                this.productSource.map(item => {
                    item.value = item.name
                    item.selectCode = item.name
                })
            } else {
                this.productSource = []
            }
            this.dialogVisible = true
        },
        backFindcode (val) {
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