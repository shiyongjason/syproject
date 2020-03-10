<template>
    <el-dialog class="customeredit" :title="getTitle" :visible.sync="dialog" :close-on-click-modal="false" :before-close="onCancel">
        <div class="detail">
            <el-form ref="customerForm" :model="customerForm" :rules="rules" label-width="150px">
                <div class="title">基本信息</div>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="操作人姓名：" prop="">
                            {{customerForm.operatorName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="操作人手机号：" prop="">
                            {{customerForm.operatorPhone}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="操作人邮箱：" prop="">
                            {{customerForm.operatorEmail}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="操作人身份证号：" prop="">
                            {{customerForm.operatorIdNumber}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="企业类型：" prop="">
                            {{customerForm.companyTypeN}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="企业名称：" prop="">
                            {{customerForm.companyName}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="法人姓名：" prop="legalName">
                            <el-input v-model="customerForm.legalName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="法人身份证号：" prop="legalIdNumber">
                            <el-input :maxlength='18' v-model="customerForm.legalIdNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="法人手机号：" prop="legalPhone">
                            <el-input :maxlength='11' v-model="customerForm.legalPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="组织机构代码：" prop="">
                            {{customerForm.companyLicenseNumber}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="title">印章图片:</div>
                <!-- <span>{{customerForm.companySealImage}}</span> -->
                <div v-if="customerForm.companySealImage" class="showPicture">
                    <a :href="customerForm.companySealImage" target="_blank">
                        <img :src="customerForm.companySealImage" alt="印章图片">
                    </a>
                </div>
                <span v-else>无</span>
                <div class="footer-close">
                    <el-button type="primary" @click="onSubmit" :loading="loading">{{ loading ? '提交中 ...' : '确认提交' }}</el-button>
                    <el-button type="primary" @click="onCancel">取 消</el-button>
                </div>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import { PHONE, checkIdCard } from '@/utils/rules'
import { editSign } from '../../../api/index'
export default {
    name: 'CAeditdialog',
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        customerForm: {
            type: Object
            // default: {}
        }
    },
    data () {
        return {
            getTitle: '企业CA认证信息修改',
            loading: false,
            rules: {
                legalName: [
                    { required: true, message: '请输入法人姓名', trigger: 'blur' }
                ],
                legalIdNumber: [
                    { required: true, message: '请输入法人身份证号', trigger: 'blur' },
                    { validator: checkIdCard, trigger: 'blur' }
                ],
                legalPhone: [
                    { required: true, message: '请输入法人手机号', trigger: 'blur' },
                    { validator: PHONE, trigger: 'blur' }
                ]
            }
        }
    },
    mounted () {

    },
    methods: {
        onRrestFrom () {
            this.$nextTick(() => {
                this.$refs['customerForm'].clearValidate()
            })
        },
        onCancel () {
            this.$emit('onCancel')
        },
        onSubmit () {
            this.loading = true
            try {
                this.$refs['customerForm'].validate(async (valid) => {
                    if (valid) {
                        await editSign({
                            legalIdNumber: this.customerForm.legalIdNumber,
                            legalName: this.customerForm.legalName,
                            legalPhone: this.customerForm.legalPhone,
                            id: this.customerForm.id
                        })
                        this.$message.success('修改成功！')
                        this.$emit('onSearcqyery')
                        this.$emit('onCancel')
                    }
                    this.loading = false
                })
            } catch (error) {
                this.loading = false
            }
        }
    }
}
</script>

<style>
.el-dialog {
    min-width: 600px;
}
</style>
<style scoped lang="scss">
.el-col {
    margin-bottom: 20px;
}
.detail-name {
    display: inline-block;
    width: 120px;
    text-align: right;
}
.footer-close {
    margin-top: 50px;
    text-align: right;
    padding-bottom: 20px;
}
.title {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
}
.showPicture {
    width: 200px;
    height: 200px;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
