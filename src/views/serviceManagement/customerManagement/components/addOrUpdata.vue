<template>
    <el-dialog class="customeredit" :title="isAdd?'编辑客户信息':'新增客户信息'" :visible.sync="dialog" :close-on-click-modal="false">
        <el-form :model="customerForm" class="customerForm" :rules="rules" ref="dialogForm" label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item prop="channelType" label="渠道名称">
                        <el-select v-model="customerForm.channelType" style="width:100%">
                            <template v-if="isAdd">
                                <el-option label="好享家" :value="0"></el-option>
                            </template>
                            <template v-else>
                                <el-option v-for="(item,index) in Object.values(channelTypes)" :key="index" :label="item" :value="index">
                                </el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="role" label="客户身份">
                        <el-select v-model="customerForm.role" style="width: 100%">
                            <el-option v-for="(item,index) in Object.values(roles)" :key="index" :label="item" :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item prop="name" label="姓名">
                        <el-input v-model="customerForm.name" :disabled="isAdd" placeholder="请输入姓名"></el-input>
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
                        <el-input v-model="customerForm.mobile" :disabled="isAdd" placeholder="请输入姓名" maxlength='11'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="nickname" label="微信昵称">
                        <el-input placeholder="微信昵称" v-model="customerForm.nickname"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" v-if="!isAdd" >
                    <el-form-item prop="createTime" label="成为客户">
                        <el-date-picker v-model="customerForm.createTime" type="date" format="yyyy-MM-dd" placeholder="成为客户日期">
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
            <el-button type="primary" @click="submitForm('dialogForm')" :loading="isSaving">保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { editCustomerInfo, addCustomerInfo } from '../api/index'
const form = {
    channelType: '',
    role: '',
    name: '',
    d: ''
}

export default {
    name: 'addOrUpdata',
    props: ['visible', 'value'],
    inject: ['getTypes', 'getData'],
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
            // customerForm: JSON.parse(JSON.stringify(form)),
            rules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                role: [{ required: true, message: '请选择客户身份', trigger: 'blur' }],
                mobile: [{ required: true, validator: checkMobile, trigger: 'blur' }]
            },
            isSaving: false
        }
    },
    computed: {
        channelTypes () {
            return this.getTypes('channelType')
        },
        roles () {
            return this.getTypes('role')
        },
        isAdd () {
            return !!this.value.id
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
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                console.log(this.customerForm)
                if (valid) {
                    this.isSaving = true
                    let res = ''
                    if (this.isAdd) {
                        res = await editCustomerInfo(this.customerForm)
                    } else {
                        res = await addCustomerInfo(this.customerForm)
                    }
                    console.log(res)
                    if (res.status == 200) {
                        this.isSaving = false
                        this.dialog = false
                        this.getData()
                    } else {
                        this.isSaving = false
                    }
                }
            })
        },
        onCancel () {
            this.dialog = false
            this.customerForm = JSON.parse(JSON.stringify(form))
        }
    }
}
</script>

<style scoped>
.el-col {
    margin-bottom: 20px
}
</style>