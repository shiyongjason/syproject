<template>
    <div v-if="accountForm">
        <el-form :model="accountForm" :rules="baseRules" ref="accountForm" label-width="150px" class="demo-baseForm">
            <el-form-item label="账户类型：">
                <el-radio-group v-model.trim="accountForm.accountType">
                    <el-radio :label=1>对公</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="银行账户名称：">
                <el-input v-model.trim="accountForm.accountBank" :disabled=true  placeholder="请输入银行账户名称" maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="开户行：" >
                <el-input v-model.trim="accountForm.openBank" placeholder="请输入开户行" maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="账号：" prop="accountNumber">
                <el-input v-model.trim="accountForm.accountNumber" placeholder="请输入账号"  maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="银行行号：" prop="bankCode">
                <el-input v-model.trim="accountForm.bankCode" placeholder="请输入输入银行行号"  maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="联行号：" prop="coupletNumber">
                <el-input v-model.trim="accountForm.coupletNumber" placeholder="请输入联行号"  maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="开户行地址：">
                <el-input v-model.trim="accountForm.accountAddress" placeholder="请输入开户行地址" maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="默认费率(%)：" required>
                <el-col :span="4">
                    <el-form-item label="支付宝" prop="alipayRate" label-width="80px">
                        <el-input v-model.trim="accountForm.alipayRate" placeholder="请输入支付宝费率"  v-isNum:0="accountForm.alipayRate" maxlength="8" class="rateInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="微信" prop="wechatRate" label-width="80px">
                        <el-input v-model.trim="accountForm.wechatRate" placeholder="请输入微信费率"  v-isNum:0="accountForm.wechatRate" maxlength="8" class="rateInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="借记卡" prop="debitRate" label-width="80px">
                        <el-input v-model.trim="accountForm.debitRate" placeholder="请输入借记卡费率"  v-isNum:0="accountForm.debitRate" maxlength="8" class="rateInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="贷记卡" prop="creditRate" label-width="80px">
                        <el-input v-model.trim="accountForm.creditRate" placeholder="请输入贷记卡费率" v-isNum:0="accountForm.creditRate" maxlength="8" class="rateInput"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
          <el-button style="margin-top: 12px;" @click="onSaveaccount" v-if="type=='edit'" :loading="loading">{{loading?'提交中':'保存'}}</el-button>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { IsInteger } from '@/utils/rules'
import { updateDevelopaccount } from '../../api'
export default {
    name: 'accountForm',
    props: {
        accountForm: {
            type: Object,
            default: () => { }
        }
    },
    data () {
        return {
            loading: false,
            type: this.$route.query.type,
            baseRules: {
                alipayRate: [
                    { required: true, message: '请输入支付宝费率', trigger: 'blur' }
                ],
                wechatRate: [
                    { required: true, message: '请输入微信费率', trigger: 'blur' }
                ],
                debitRate: [
                    { required: true, message: '请输入借记卡费率', trigger: 'blur' }
                ],
                creditRate: [
                    { required: true, message: '请输贷记卡费率', trigger: 'blur' }
                ],
                accountNumber: [
                    { required: false },
                    { validator: IsInteger, message: '请输入数字', trigger: 'blur' }
                ],
                bankCode: [
                    { required: false },
                    { validator: IsInteger, message: '请输入数字', trigger: 'blur' }
                ],
                coupletNumber: [
                    { required: false },
                    { validator: IsInteger, message: '请输入数字', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted () {
        // this.accountForm.companyCode = this.userInfo.oldDeptCode

    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        onSaveaccountFrom () {
            this.$refs.accountForm.validate((valid) => {
                if (valid) {
                    this.$emit('backadd')
                }
            })
        },
        onSaveaccount () {
            this.loading = true
            this.$refs.accountForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await updateDevelopaccount(this.accountForm)
                        this.$message.success('平台公司更新成功！')
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                        this.$router.push('/developonline/developlist')
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.deveInput {
    width: 50%;
}
.rateInput{
     width: 100%;
}
.demo-baseForm {
    width: 90%;
    margin: 10px auto;
}
.line {
    text-align: center;
}
</style>
