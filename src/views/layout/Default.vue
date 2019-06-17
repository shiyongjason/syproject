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
        <el-dialog title="密码修改" :visible.sync="editPasswordVisible">
            <el-form ref="editPassword" :model="editPassword" :rules="passwordRules" class="edit-password">
                <el-form-item prop="username" label="登陆手机号" label-width="132px">
                    <el-input
                        v-model="editPassword.username"
                        placeholder="请输入您的手机号码"
                        maxlength="11"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password" label="旧密码" label-width="132px">
                    <el-input
                        v-model="editPassword.username"
                        placeholder="请输入您的旧密码"
                        maxlength="16"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password" label="新密码" label-width="132px">
                    <el-input
                        v-model="editPassword.username"
                        placeholder="请输入8-16位密码"
                        maxlength="16"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password" label="确认新密码" label-width="132px">
                    <el-input
                        v-model="editPassword.username"
                        placeholder="请再次输入你的新密码"
                        maxlength="16"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="editPasswordVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
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
        return {
            isCollapse: false,
            editPasswordVisible: true,
            editPassword: {},
            passwordRules: {
                username: [
                    { required: true, message: '请输入登录帐号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            loading: state => state.loading
        })
    },
    methods: {
        menuBack (val) {
            this.isCollapse = val
        },
        editPasswordShow (show) {
            this.editPasswordVisible = show
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
