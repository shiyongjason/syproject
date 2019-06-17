<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="110px"
                label-position="right"
            >
                <el-form-item label="原登录密码：" prop="currentPassword">
                    <el-input v-model="form.currentPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPassword">
                    <el-input v-model="form.newPassword" placeholder="6-20位数字或字母"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="verificationCode">
                    <el-input class="fll" v-model="form.verificationCode" maxlength="4"></el-input>
                    <span class="resetVerifica" @click="resetVerifica">
                        <img :src="'data:image/jpeg;base64,' + verificaImg" alt="验证码">
                    </span>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-body-cont btn-cont">
            <el-button name="white-color" @click="onCancel">取消</el-button>
            <el-button name="hosjoy-color" @click="onSave">确定</el-button>
        </div>
    </div>
</template>
<script>
import { getVerifica, editPassword } from './api/index'
import { Password } from '@/utils/rules'
export default {
    data () {
        return {
            form: {
                currentPassword: '',
                newPassword: '',
                verificationCode: '',
                signCode: ''
            },
            rules: {
                currentPassword: [
                    { required: true, message: '请输入原登录密码', trigger: 'blur' },
                    { validator: Password, trigger: 'blur' },
                    { min: 6, max: 20, message: '长度为6-20位数字或字母', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: Password, trigger: 'blur' },
                    { min: 6, max: 20, message: '长度为6-20位数字或字母', trigger: 'blur' }
                ],
                verificationCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            verificaImg: ''
        }
    },
    methods: {
        async getVerifica () {
            const { data } = await getVerifica()
            this.verificaImg = data.verificationCodeBase64
            this.form.signCode = data.signCode
        },
        resetVerifica () {
            this.getVerifica()
        },
        onSave () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    await editPassword({
                        currentPassword: this.form.currentPassword,
                        newPassword: this.form.newPassword,
                        verificationCode: this.form.verificationCode,
                        signCode: this.form.signCode
                    })
                    sessionStorage.removeItem('userInfo')
                    sessionStorage.removeItem('token')
                    this.$router.push('/login')
                }
            })
        },
        onCancel () {
            this.$confirm('是否取消修改密码？取消修改密码将返回首页！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.$router.push('/')
            })
        }
    },
    mounted () {
        this.getVerifica()
    }
}
</script>
<style lang="scss" scoped>
.resetVerifica {
    margin-left: 16px;
    float: left;
    width: 128px;
    height: 40px;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>
