<template>
    <el-dialog class="customeredit" title="新增/修改 客户信息" :visible.sync="dialog" :close-on-click-modal="false">
        <el-form :model="customerForm" class="customerForm" :rules="rules" ref="form" label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item prop="a" label="渠道名称">
                        <el-input v-model="customerForm.a" placeholder="请输入品牌中文名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="a" label="渠道名称">
                        <el-select v-model="customerForm.b" style="width:100%">
                            <el-option label="好享家" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item prop="b" label="客户身份">
                        <el-select v-model="customerForm.c" style="width:100%">
                            <el-option label="客户" value="1"></el-option>
                            <el-option label="线上管家" value="2"></el-option>
                            <el-option label="线下管家" value="3"></el-option>
                            <el-option label="员工" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="c" label="姓名">
                        <el-input v-model="customerForm.c" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item prop="d" label="微信昵称">
                        <el-input placeholder="请输入微信昵称" v-model="customerForm.d"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="d" label="地址">
                        <el-input type="textarea" placeholder="请输入地址" v-model="customerForm.d"></el-input>
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
const form = {
    a: '',
    b: '',
    c: '',
    d: ''
}
export default {
    name: 'addOrUpdata',
    props: ['visible'],
    data () {
        return {
            customerForm: JSON.parse(JSON.stringify(form)),
            rules: {
                a: [
                    { required: true, whitespace: true, message: '请输入品牌中文名称', trigger: 'blur' }
                ],
                b: [
                    { required: true, whitespace: true, message: '请输入品牌中文名称', trigger: 'blur' }
                ]
            },
            isSaving: false
        }
    },
    computed: {
        dialog: {
            get () {
                return this.visible
            },
            set (val) {
                this.$emit('update:visible', val)
            }
        },
        title () {
            // todo 标题
            return ''
        }
    },
    methods: {
        onCancel () {
            this.dialog = false
            this.customerForm = JSON.parse(JSON.stringify(form))
        }
    },
    mounted () {}
}
</script>

<style scoped>
.el-col {
    margin-bottom: 20px
}
</style>