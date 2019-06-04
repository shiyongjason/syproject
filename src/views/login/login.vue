<template>
    <div class="login">

    </div>
</template>
<script>
import { getVerifica, getMobileVerifica, confirmMobileVerifica, resetPassword, login } from './api/index'
import { Phone, Password } from '@/utils/rules'
import { mapMutations } from 'vuex'
export default {
    data () {
        const checkPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.resetForm.newPassword) {
                callback(new Error('两次密码不一致'))
            } else {
                callback()
            }
        }
        return {
            verificaImg: '',
            imgStyle: '',
            loginForm: {
                username: '',
                password: '',
                verificationCode: '',
                signCode: ''
            },
            forgetForm: {
                mobile: '',
                smsCode: ''
            },
            resetForm: {
                key: '',
                mobile: '',
                newPassword: '',
                checkPassword: ''
            },
            loginRules: {
                username: [
                    { required: true, message: '请输入登录帐号', trigger: 'blur' },
                    { validator: Phone, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: Password, trigger: 'blur' },
                    { min: 6, max: 20, message: '长度为6-20位数字或字母', trigger: 'blur' }
                ],
                verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
            forgetRules: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: Phone, trigger: 'blur' }
                ],
                smsCode: [
                    { required: true, message: '请输入短信验证码', trigger: 'blur' }
                ]
            },
            resetRules: {
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: Password, trigger: 'blur' },
                    { min: 6, max: 20, message: '长度为6-20位数字或字母', trigger: 'blur' }
                ],
                checkPassword: [
                    { required: true, validator: checkPassword, trigger: 'blur' },
                    { validator: Password, trigger: 'blur' }
                ]
            },
            isForget: false,
            isReset: false,
            isLogin: true,
            after: true,
            content: '获取验证码',
            time: 60
        }
    },
    methods: {
        handleIconClick () {

        },
        async getVerifica () {
            const { data } = await getVerifica()
            this.verificaImg = data.verificationCodeBase64
            this.loginForm.signCode = data.signCode
        },
        async onLogin () {
            console.log(1)
            // this.$refs['loginForm'].validate(async (valid) => {
            //     if (valid) {
            //         const { data } = await login(this.loginForm)
            //         const userInfo = jwtDecode(data.access_token)
            //         sessionStorage.setItem('token', data.access_token)
            //         sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
            //         this.setUserInfo(userInfo)
            //         this.$router.push('/')
            //     }
            // })
            this.$router.push('/')
        },
        resetVerifica () {
            this.getVerifica()
        },
        toForget () {
            this.$refs['forgetForm'].resetFields()
            this.isLogin = false
            this.isForget = true
        },
        onMobileVerifica () {
            this.$refs['forgetForm'].validateField('mobile', async (valid) => {
                if (!valid) {
                    this.after = false
                    this.content = '重新发送 ' + this.time
                    this.getMobileVerifica()
                    this.clock = setInterval(() => {
                        this.time--
                        this.content = '重新发送' + this.time
                        if (this.time <= 0) {
                            clearInterval(this.clock)
                            this.content = '获取验证码'
                            this.time = 60
                            this.after = true
                        }
                    }, 1000)
                }
            })
        },
        async getMobileVerifica () {
            try {
                await getMobileVerifica({ mobile: this.forgetForm.mobile })
            } catch (error) {
                clearInterval(this.clock)
                this.content = '获取验证码'
                this.time = 60
                this.after = true
            }
        },
        toReset () {
            this.$refs['resetForm'].resetFields()
            this.$refs['forgetForm'].validate(async (valid) => {
                if (valid) {
                    const { data } = await confirmMobileVerifica(this.forgetForm)
                    this.resetForm.key = data.key
                    this.resetForm.mobile = data.mobile
                    this.isForget = false
                    this.isReset = true
                }
            })
        },
        async toLogin () {
            this.$refs['resetForm'].validate(async (valid) => {
                if (valid) {
                    await resetPassword({ key: this.resetForm.key, mobile: this.resetForm.mobile, newPassword: this.resetForm.newPassword })
                    this.$message.success('密码重置成功！')
                    this.isReset = false
                    this.isLogin = true
                }
            })
        },
        backLogin () {
            this.isForget = false
            this.isLogin = true
        },
        backForget () {
            this.isReset = false
            this.isForget = true
        },
        ...mapMutations({
            setUserInfo: 'USER_INFO'
        })
    },
    mounted () {
        this.getVerifica()
        let that = this
        document.onkeypress = function (e) {
            const keyCode = document.all ? event.keyCode : e.which
            if (keyCode === 13) {
                that.onLogin()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.page-body-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1280px;
    z-index: -10;
    background-image: url("../../assets/images/login_bg@2x.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 0;

    img {
        z-index: 0;
    }
}
.login-window,
.forget-window,
.reset-window {
    position: absolute;
    top: 50%;
    margin-left: -240px;
    margin-top: -240px;
    width: 480px;
    height: 480px;
    background: $whiteColor;
    z-index: 1;
}

.fadeIn {
    left: 50%;
    opacity: 0.96;
    transition: 1s;
}

.fadeOut {
    left: 75%;
    opacity: 0;
    transition: 1s;
}

// 登录窗口
.logo {
    margin-top: 44px;
    padding: 0 97px;
    height: 48px;

    .web-logo {
        float: left;
        width: 48px;
        height: 48px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .web-name {
        float: left;
        margin-left: 16px;
        height: 48px;
        line-height: 48px;
        font-size: 28px;
        color: $blackColor;
    }
}

.login-form {
    margin-top: 60px;
    padding: 0 70px;

    .el-form-item {
        margin-bottom: 16px;

        .form-icon {
            position: absolute;
            top: 1px;
            left: 1px;
            z-index: 99;
            width: 42px;
            height: 42px;
            color: $blackLight;
            text-align: center;
            background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 1) 0%,
                rgba(245, 245, 245, 1) 100%
            );
            border-radius: 4px 0px 0px 4px;
            border-right: 1px solid rgba(229, 229, 234, 1);
        }
        .el-input {
            width: 100%;
            float: left;

            &:not(:first-child) {
                margin-left: 0;
            }

            /deep/ .el-input__inner {
                padding-left: 57px;
                height: 44px;
            }
        }

        &:nth-child(3) {
            .el-input {
                width: 196px;

                /deep/ .el-input__inner {
                    padding-left: 15px;
                    height: 44px;
                    border-radius: 4px;
                }
            }

            span {
                margin-left: 16px;
                float: left;
                width: 128px;
                height: 44px;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .el-button {
            width: 100%;
        }
    }
}

.forget {
    position: absolute;
    bottom: 30px;
    left: 50%;
    margin-left: -28px;
    color: $hosjoyColor;
    font-size: 14px;

    span {
        cursor: pointer;
    }
}

// 忘记密码窗口
.forget-form {
    margin-top: 100px;
    padding: 0 70px;

    .el-form-item {
        margin-bottom: 16px;

        .el-input {
            width: 100%;
            float: left;

            /deep/ .el-input__inner {
                height: 44px;
            }
        }

        &:nth-child(1) {
            .el-input {
                width: 196px;
            }

            .el-button {
                float: right;
                width: 128px;
                height: 44px;
                padding: 0;
            }
        }

        .el-button {
            width: 100%;
        }
    }
}

// 重置密码窗口
.reset-form {
    margin-top: 100px;
    padding: 0 70px;

    .el-form-item {
        margin-bottom: 16px;

        .el-input {
            float: left;
            width: 100%;

            /deep/ .el-input__inner {
                height: 44px;
            }
        }

        .el-button {
            width: 100%;
        }
    }
}

//忘记和重置公共style
.title {
    margin-top: 40px;
    padding: 0 70px;
    text-align: center;
    height: 28px;
    line-height: 28px;

    i {
        float: left;
        font-size: 18px;
        cursor: pointer;
        // margin-top: 6px;
    }

    span {
        font-size: 20px;
    }
}

.getBefore {
    float: right;
    width: 128px !important;
    border: 1px solid $hosjoyColor;
    color: $hosjoyColor;
    background: $whiteColor;
}

.getAfter {
    float: right;
    width: 128px !important;
    border: 1px solid $hosjoyColor;
    color: $hosjoyColor;
    background: $whiteColor;
}

/deep/ .el-form-item {
    &.is-error {
        margin-bottom: 32px;
        transition: 0.3s;
    }
    &.is-error .el-form-item__error {
        color: $hosjoyColor;
        padding: 10px 0;
    }
}
/deep/ .el-icon-success {
    display: none;
    color: #67c23a;
}
/deep/ .el-form-item.is-success {
    .el-icon-success {
        display: inline;
    }
}
</style>
