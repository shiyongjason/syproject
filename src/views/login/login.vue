<template>
    <div class="page-body">
        <div class="page-body-bg">
            <div class="login-window">
                <div class="title">
                    <img src="../../assets/images/hosjoy_logo48@2x.png" alt="logo">
                    好享家运营后台
                </div>
                <div class="login-form">
                    <iframe :src="src" ref="iframe" style="display:none"></iframe>
                    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
                        <el-form-item prop="username">
                            <span class="form-icon">
                                <i class="iconfont hosjoy_account"></i>
                            </span>
                            <el-input v-model="loginForm.username" placeholder="请输入您的手机号码" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <span class="form-icon">
                                <i class="iconfont hosjoy_password"></i>
                            </span>
                            <el-input v-model.trim="loginForm.password" :type="passwordType? 'password' : 'text'" placeholder="请输入您的密码"></el-input>
                            <span class="form-icon-end" @click="passwordType = !passwordType">
                                <i class="iconfont" :class="passwordType? 'hosjoy_eye_close' : 'hosjoy_eye'"></i>
                            </span>
                        </el-form-item>
                        <el-form-item>
                            <el-button name="hosjoy-color" @click="onLogin" :disabled="!checked">登录</el-button>
                        </el-form-item>
                    </el-form>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { login, getUserdata, findMenuList } from './api/index'
import jwtDecode from 'jwt-decode'
import { Phone } from '@/utils/rules'
import { mapMutations, mapActions } from 'vuex'
import { iframeUrl } from '@/api/config'
import { tracking } from '@/api/index'
import { routerMapping } from '../../router'
import { makeMenus, handleMenuResources } from '@/utils/auth'
export default {
    data () {
        return {
            checked: true,
            passwordType: true, // true password false text
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [
                    { required: true, message: '请输入登录帐号', trigger: 'blur' },
                    { validator: Phone, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                    // { validator: Password, trigger: 'blur' },
                    // { min: 8, max: 16, message: '长度为8-16位数字或字母', trigger: 'blur' }
                ]
            },
            isLogin: true,
            userInfo: '',
            src: iframeUrl,
            iframeWin: {}
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
        async onLogin () {
            this.$refs['loginForm'].validate(async (valid) => {
                if (valid) {
                    const { data } = await login(this.loginForm)
                    const userInfo = jwtDecode(data.access_token)
                    this.userInfo = jwtDecode(data.access_token)
                    sessionStorage.setItem('token', data.access_token)
                    sessionStorage.setItem('refreshToken', data.refresh_token)
                    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                    this.setUserInfo(userInfo)
                    tracking({
                        type: 1,
                        user_name: userInfo.employeeName,
                        login_name: userInfo.user_name,
                        job_number: userInfo.jobNumber,
                        user_agent: navigator.userAgent
                    })
                    const { data: userData } = await getUserdata({ loginName: this.loginForm.username })
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
            this.makeIndex(menu)
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
        sessionStorage.removeItem('token')
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
.login-window {
    position: absolute;
    top: 50%;
    margin-left: -240px;
    margin-top: -240px;
    width: 480px;
    background: $whiteColor;
    z-index: 1;
    left: 50%;
    padding: 70px;
    box-sizing: border-box;
    border-radius: 4px;
}
.title {
    text-align: center;
    color: #000000;
    font-size: 28px;
    line-height: 48px;
    img {
        margin-right: 16px;
        width: 48px;
        vertical-align: bottom;
    }
}
.login-form {
    margin-top: 70px;
    .el-form-item {
        margin-bottom: 36px;

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
        .form-icon-end {
            position: absolute;
            top: 1px;
            right: 1px;
            z-index: 99;
            width: 42px;
            height: 42px;
            color: $blackLight;
            text-align: center;
            cursor: pointer;
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
            height: 44px;
        }
    }
    .el-form-item:last-child {
        margin-bottom: 0;
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
</style>
