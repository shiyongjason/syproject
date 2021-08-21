<template>
    <div class="page-body">
        <div class="page-body-bg">
            <el-row>
                <el-col :xs="0" :sm="3" :md="4" :lg="6" :xl="8">&nbsp;</el-col>
                <el-col :xs="24" :sm="18" :md="16" :lg="12" :xl="8">
                    <div class="login-window">
                        <div class="title">
                            <img src="../../assets/images/hosjoy_logo48@2x.png" alt="logo" class="hidden-xs-only">
                            好享家运营后台
                        </div>
                        <div class="login-form">
                            <iframe :src="src" ref="iframe" style="display:none"></iframe>
                            <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
                                <el-form-item prop="phone">
                                    <el-input v-model.trim="loginForm.phone" placeholder="11位手机号" maxlength="11" ref="mobileInput">
                                        <template slot="prepend">
                                            +86
                                        </template>
                                        <template slot="suffix">
                                            <i class="el-icon-success mr5"></i>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="smsCode">
                                    <el-input v-model.trim="loginForm.smsCode" placeholder="输入验证码" maxlength="6"></el-input>
                                    <h-button @click="onMobileVerifica" :disabled="after?false:true">{{content}}</h-button>
                                </el-form-item>

                                <el-form-item class="mt20">
                                    <h-button type='primary' :disabled="!checked" v-loading.fullscreen.lock="$store.state.loading" element-loading-text="处理中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)" @click="onLogin">登录</h-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="0" :sm="3" :md="4" :lg="6" :xl="8"></el-col>
            </el-row>

        </div>
    </div>
</template>
<script>
import { login, getUserdata, findMenuList, sendMobileVerifica, phoneLogin } from './api/index'
import jwtDecode from 'jwt-decode'
import { Phone, VerificationCode } from '@/utils/rules'
import { mapMutations, mapActions } from 'vuex'
import { iframeUrl } from '@/api/config'
import { tracking } from '@/api/index'
import { routerMapping } from '../../router'
import { makeMenus, handleMenuResources } from '@/utils/auth'
export default {
    data () {
        return {
            checked: true,
            passwordType: true,
            loginForm: {
                phone: '',
                smsCode: ''
            },
            loginRules: {
                phone: [
                    { required: true, message: '请输入正确手机号码', trigger: 'blur' },
                    { validator: Phone, trigger: 'blur' }
                ],
                smsCode: [
                    { required: true, message: '请输入短信验证码', trigger: 'blur' },
                    { validator: VerificationCode, trigger: 'blur' }
                ]
            },
            isLogin: true,
            userInfo: '',
            src: iframeUrl,
            iframeWin: {},
            after: true,
            content: '获取验证码',
            time: 60
        }
    },
    methods: {
        sendMessage (userData) {
            // 外部vue向iframe内部传数据
            this.iframeWin.postMessage({
                cmd: 'getFormJson',
                params: userData
            }, '*')
        },
        onMobileVerifica () {
            this.$refs.loginForm.validateField('phone', async (valid) => {
                if (!valid) {
                    this.after = false
                    this.content = '重新发送 ' + this.time
                    this.sendMobileVerifica(this.loginForm.phone)
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
        async sendMobileVerifica () {
            try {
                await sendMobileVerifica({ phone: this.loginForm.phone })
                this.$message.success('验证码已发送，请查收短信')
            } catch (error) {
                clearInterval(this.clock)
                this.content = '获取验证码'
                this.time = 60
                this.after = true
                this.$refs.mobileInput.focus()
            }
        },
        async onLogin () {
            this.$refs['loginForm'].validate(async (valid) => {
                if (valid) {
                    const { data } = await phoneLogin(this.loginForm)
                    const userInfo = jwtDecode(data.access_token)
                    this.userInfo = jwtDecode(data.access_token)
                    localStorage.setItem('token', data.access_token)
                    localStorage.setItem('refreshToken', data.refresh_token)
                    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                    this.setUserInfo(userInfo)
                    tracking({
                        type: 1,
                        user_name: userInfo.employeeName,
                        login_name: userInfo.user_name,
                        job_number: userInfo.jobNumber,
                        user_agent: navigator.userAgent
                    })
                    const { data: userData } = await getUserdata({ loginName: this.loginForm.phone })
                    if (userData.code != 400) {
                        sessionStorage.setItem('user_Data', JSON.stringify(userData.data))
                        this.sendMessage(userData.data)
                    }
                    // await this.findMenuList()
                    await this.next()
                    // this.$router.push('/')
                }
            })
        },
        makeIndex (data) {
            let index = []
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    index.push(data[i].path.replace('/', ''))
                    if (data[i].children) {
                        if (data[i].children.length > 0) {
                            index.push(data[i].children[0].path.replace('/', ''))
                        }
                    }
                    break
                }
                let path = index.join('/')
                if (!path) {
                    path = '/'
                }
                this.$router.push({
                    path: path
                })
            }
        },
        async next () {
            const { data } = await findMenuList()
            sessionStorage.setItem('authResourceKeys', data.resourceKeys)
            let resourceList = []
            handleMenuResources(data.employeeAuthDetailsList, resourceList)
            const menu = makeMenus(routerMapping, resourceList)
            sessionStorage.setItem('menuList', JSON.stringify(menu))
            if (this.$route.query.backUrl) {
                this.$router.push({
                    path: this.$route.query.backUrl
                })
            } else {
                this.makeIndex(menu)
            }
        },
        ...mapMutations({
            setUserInfo: 'USER_INFO',
            tagUpdate: 'TAG_UPDATE'
        }),
        ...mapActions({
            resetVuex: 'resetVuex'
        })
    },
    mounted () {
        localStorage.removeItem('token')
        this.tagUpdate([])
        // 获取iframe 对象
        this.iframeWin = this.$refs.iframe.contentWindow
        document.onkeypress = (e) => {
            const keyCode = document.all ? event.keyCode : e.which
            if (keyCode === 13) {
                this.onLogin()
            }
        }
        // TODO 防止不刷新无法初始vuex数据
        this.resetVuex()
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
    z-index: -10;
    background-image: url("../../assets/images/login_bg@2x.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 0;

    img {
        z-index: 0;
    }
}
.login-window {
    position: absolute;
    top: 50vh;
    left: 50%;
    width: px2rem(370);
    background: $whiteColor;
    z-index: 1;
    padding: px2rem(42);
    box-sizing: border-box;
    border-radius: 4px;
    transform: translate(-50%, -50%);
}
.title {
    text-align: center;
    color: #000000;
    font-size: px2rem(28);
    line-height: px2rem(48);
    img {
        margin-right: 16px;
        width: 48px;
        vertical-align: bottom;
    }
}
.login-form {
    margin-top: 70px;
    .el-form-item {
        &:nth-child(1) {
            .el-input {
                width: 100%;
            }
        }
        &:nth-child(2) {
            .el-input {
                width: 196px;
            }
            .el-button {
                float: right;
                width: 120px;
                padding: 0;
            }
        }

        .el-button {
            width: 100%;
            height: 44px;
        }
    }
}
/deep/ .el-input-group__prepend {
    padding: 0;
    width: 44px;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #333;
}
.el-form-item {
    margin-bottom: 16px;
    .el-input {
        float: left;
        width: 100%;

        &:not(:first-child) {
            margin-left: 0;
        }

        .el-input__inner {
            height: 44px;
        }
    }
}

/deep/ .el-form-item {
    &.is-error {
        margin-bottom: 36px;
        transition: 0.3s;
    }
    &.is-error .el-form-item__error {
        color: $hosjoyColor;
        padding: 5px 0;
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
/deep/ .el-input__suffix-inner {
    line-height: 40px;
}
</style>
