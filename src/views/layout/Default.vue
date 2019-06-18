<template>
    <el-container class="body-container">
        <el-header class="header">
            <NavMenuHead @editPassword="editPasswordShow"/>
        </el-header>
        <el-container class="container clearfix">
            <el-aside class="aside" :class="isCollapse?'close':'open'">
                <NavMenuAside @back-event="menuBack"/>
            </el-aside>
            <el-main class="content">

                <Breadcrumb :class="isCollapse?'minLeft':'maxLeft'"/>
                <div
                    v-loading="loading"
                    element-loading-text="处理中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.5)"
                >
                    <keep-alive
                    >
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </el-main>
        </el-container>
        <el-dialog title="密码修改" :visible.sync="editPasswordVisible" class="recharge-password">
            <el-form ref="editPassword" :model="editPassword" :rules="passwordRules" class="edit-password">
                <el-form-item label="登陆手机号" label-width="132px">
                    {{userInfo.user_name}}
                </el-form-item>
                <el-form-item prop="currentPassword" label="旧密码" label-width="132px">
                    <el-input
                        type="password"
                        v-model="editPassword.currentPassword"
                        placeholder="请输入您的旧密码"
                        maxlength="16"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="newPassword" label="新密码" label-width="132px">
                    <el-input
                        type="password"
                        v-model="editPassword.newPassword"
                        placeholder="请输入8-16位密码"
                        maxlength="16"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认新密码" label-width="132px">
                    <el-input
                        type="password"
                        v-model="editPassword.confirmPassword"
                        placeholder="请再次输入你的新密码"
                        maxlength="16"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="onChangePassword">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
import { changePassword } from './api/index'
import NavMenuHead from './NavMenuHead'
import NavMenuAside from './NavMenuAside'
import Breadcrumb from '@/components/Breadcrumb'
import { mapState } from 'vuex'
export default {
    name: 'default-layout',
    components: {
        NavMenuHead,
        NavMenuAside,
        Breadcrumb
    },
    data () {
        const checkPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入您的新密码'))
            } else if (value !== this.editPassword.newPassword) {
                callback(new Error('两次密码不一致'))
            } else {
                callback()
            }
        }

        return {
            isCollapse: false,
            editPasswordVisible: false,
            editPassword: {
                telephone: '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            passwordRules: {
                currentPassword: [
                    { required: true, message: '请输入您的旧密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入您的密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度为6-20位数字或字母', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, validator: checkPassword, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            loading: state => state.loading,
            userInfo: state => state.userInfo
        })
    },
    methods: {
        menuBack (val) {
            this.isCollapse = val
        },
        editPasswordShow (show) {
            this.editPasswordVisible = show
        },
        async onChangePassword () {
            this.$refs[ 'editPassword' ].validate(async (valid) => {
                if (valid) {
                    try {
                        const {...params} = this.editPassword
                        delete params.confirmPassword
                        await changePassword(params)
                        this.$message({
                            type: 'success',
                            message: '修改密码成功！'
                        })
                        this.editPasswordVisible = false
                        sessionStorage.removeItem('token')
                        sessionStorage.removeItem('userInfo')
                        this.$alert('密码修改成功，现在去登陆！', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        })
                    } catch (e) {
                        this.$message({
                            type: 'error',
                            message: '修改密码错误，请稍后重试！'
                        })
                    }
                }
            })
        }
    },
    mounted () {

    }

}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    height: 50px !important;
    background-color: $blackColor;
}
.container {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #efeff4;
}
.aside {
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: $blackLight;
}
.content {
    position: relative;
}
.minLeft {
    left: 64px;
    transition: 0.3s;
}
.maxLeft {
    left: 200px;
    transition: 0.3s;
}
/deep/ .el-loading-spinner i {
    color: $hosjoyColor;
}
/deep/ .el-loading-spinner .el-loading-text {
    color: $hosjoyColor;
}
/deep/ .el-loading-parent--relative {
    position: relative !important;
    overflow: hidden;
}
/deep/ .el-loading-mask {
    position: absolute;
    z-index: 2000;
    background-color: rgba(255, 255, 255, 0.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
}
    .edit-password{
        padding: 34px 0;
    }
    .recharge{
    }
</style>
<style  lang="scss">
    .el-form .el-form-item__label{
        color: #000000;
    }
    .el-form .el-input__inner{
        border: 1px solid #E5E5EA;
        /*width: 224px;*/
        /*line-height: 40px;*/
    }
    .dialog-footer {
        .el-button{
            border: 1px solid #E5E5EA;
            border-radius: 4px;
            color: #666666;
        }
        .el-button--primary{
            border: 1px solid #FF7A45;
            background: #FF7A45;
            color: #ffffff;
        }
        .el-button--primary:hover{
            border: 1px solid #FF7A45;
            background: #FF7A45;
            color: #ffffff;
        }
    }
    .el-form-item.is-error .el-input__inner{
        border: 1px solid #E02020;
    }
</style>
