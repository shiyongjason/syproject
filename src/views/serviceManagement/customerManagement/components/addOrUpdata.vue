<template>
    <el-dialog class="customeredit" :title="getTitle" :visible.sync="dialog" :close-on-click-modal="false" :before-close="onCancel">
        <template v-if="!this.isShowDetail">
            <el-form :model="customerForm" class="customerForm" :rules="rules" ref="dialogForm" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="channelType" label="渠道名称">
                            <el-select v-model="customerForm.channelType" :disabled='!isAdd' style="width:100%">
                                <template v-if="isAdd">
                                    <el-option label="好享家" :value="0"></el-option>
                                </template>
                                <template v-else>
                                    <el-option v-for="(item,index) in channelType" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </template>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="role" label="客户身份">
                            <el-select v-model="customerForm.role" style="width: 100%">
                                <el-option v-for="(item,index) in getRole" :key="index" :label="item.label" :value="item.value" :disabled="index===0||index===3">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="name" label="姓名">
                            <el-input v-model="customerForm.name" :disabled="!isAdd" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="wechatId" label="微信号">
                            <el-input placeholder="请输入微信号" v-model="customerForm.wechatId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="mobile" label="手机号">
                            <el-input v-model="customerForm.mobile" :disabled="!isAdd" placeholder="请输入姓名" maxlength='11'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="nickname" label="微信昵称">
                            <el-input placeholder="微信昵称" v-model="customerForm.nickname"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" v-if="!isAdd">
                        <el-form-item prop="createTime" label="成为客户">
                            <el-date-picker v-model="customerForm.createTime" :disabled="!isAdd" type="date" format="yyyy-MM-dd" placeholder="成为客户日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="address" label="地址">
                            <el-input type="textarea" placeholder="请输入地址" v-model="customerForm.address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onSubmitForm('dialogForm')" :loading="isSaving">保 存</el-button>
            </div>
        </template>
        <template v-else>
            <div class="detail">
                <el-row :gutter="10">
                    <el-col :span="11"><span class="detail-name">渠道名称：</span>{{getTypes('channelType',customerForm.channelType)}}</el-col>
                    <el-col :span="11"><span class="detail-name">客户身份：</span>{{getTypes('role',customerForm.role)}}</el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="11"><span class="detail-name">姓名：</span>{{customerForm.name}}</el-col>
                    <el-col :span="11"><span class="detail-name">微信号：</span>{{customerForm.wechatId}}</el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="11"><span class="detail-name">手机号：</span>{{customerForm.mobile}}</el-col>
                    <el-col :span="11"><span class="detail-name">微信昵称：</span>{{customerForm.nickname}}</el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="11"><span class="detail-name">成为客户：</span>{{formatTime(customerForm.createTime)}}</el-col>
                    <el-col :span="11"><span class="detail-name">地址：</span>{{customerForm.address}}</el-col>
                </el-row>
                <div slot="footer" class="footer-close">
                    <el-button type="primary" @click="onCancel">关 闭</el-button>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import Api from '../api/index'
import moment from 'moment'

export default {
    name: 'addOrUpdata',
    props: ['visible', 'value', 'isShowDetail', 'role', 'channelType'],
    inject: ['getData'],
    data () {
        var checkMobile = (rule, value, callback) => {
            const Reg = /^1\d{10}$/
            if (!value) {
                callback(new Error('请输入手机号码'))
            } else if (Reg.test(value) === false) {
                callback(new Error('手机号码格式不正确'))
            } else {
                callback()
            }
        }
        return {
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                role: [
                    {
                        required: true,
                        message: '请选择客户身份',
                        trigger: 'blur'
                    }
                ],
                mobile: [
                    { required: true, validator: checkMobile, trigger: 'blur' }
                ]
            },
            isSaving: false
        }
    },
    computed: {
        getRole () {
            let dialogRole = []
            if (!this.isAdd) {
                dialogRole = this.role.concat()
                dialogRole.splice(0, 1)
            }
            return dialogRole
        },
        getTitle () {
            if (this.isShowDetail) return '客户信息详情'
            else return this.isAdd ? '新增客户信息' : '编辑客户信息'
        },
        isAdd () {
            return !this.value.id
        },
        customerForm: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        },
        dialog: {
            get () {
                return this.visible
            },
            set (val) {
                this.$emit('update:visible', val)
            }
        }
    },
    methods: {
        getTypes (obj, key) {
            let query = key + 1
            return this[obj][query].label
        },
        onSubmitForm (formName) {
            this.$refs[formName].validate(async valid => {
                this.isSaving = true
                if (valid) {
                    try {
                        let method = 'editCustomerInfo'
                        if (this.isAdd) method = 'addCustomerInfo'
                        await Api[method](this.customerForm)
                        this.$message.success(
                            `${this.isAdd ? '新增' : '编辑'}成功！`
                        )
                        this.onCancel()
                        this.isSaving = false
                        // this.$emit('getList')
                        this.getData()
                    } catch (e) {
                        this.isSaving = false
                    }
                } else {
                    this.isSaving = false
                }
            })
        },
        onCancel () {
            this.dialog = false
            !this.isShowDetail && (this.customerForm = {})
            !this.isShowDetail && this.$refs['dialogForm'].clearValidate()
        },
        formatTime (time, type) {
            let dateType = 'YYYY-MM-DD HH:mm:ss'
            type && (dateType = type)
            return moment(time).format(dateType)
        }
    }
}
</script>

<style scoped>
.el-col {
    margin-bottom: 20px
}
.detail{ margin: 30px 0 0 0}
.detail-name{ display: inline-block; width:80px;text-align: right;}
.footer-close{ text-align: right}
</style>