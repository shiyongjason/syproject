<template>
    <div class="nav-menu-head clearfix">
        <div class="head-logo fll mt10" @click="onBackIndex">
            <div class="head-logo-img">
                <img src="../../assets/images/hosjoy_logo48@2x.png" alt="logo">
            </div>
            <div class="head-logo-name">B2b后台管理系统</div>
        </div>
        <div class="user-info flr">
            <div class="user-info-select">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{userName}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="exit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'NavMenuHead',
    data () {
        return {
            userName: 'Hosjoy'
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        handleCommand (command) {
            if (command === 'exit') {
                sessionStorage.removeItem('userInfo')
                sessionStorage.removeItem('token')
                this.$router.push('/login')
            } else if (command === 'editPassword') {
                this.$router.push('/editPassword')
            }
        },
        onBackIndex () {
            this.$router.push('/')
        }
    },
    mounted () {
        // this.userName = this.userInfo.principal.name
    }
}
</script>
<style lang="scss" scoped>
.nav-menu-head {
    height: 50px;
    line-height: 50px;
}
.head-logo {
    cursor: pointer;
    .head-logo-img {
        float: left;
        width: 30px;
        height: 30px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .head-logo-name {
        float: left;
        margin-left: 17px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: $grayLight;
    }
}
.user-info {
    .user-info-select {
        float: left;
        margin-left: 40px;
        .el-dropdown {
            span {
                font-size: 12px;
                color: #bfbfbf;
            }
        }
        .el-dropdown:hover,
        .el-dropdown:active {
            span {
                font-size: 12px;
                color: $hosjoyColor;
            }
        }
    }
}
.el-dropdown-menu {
    background: rgba(25, 25, 25, 1) !important;
    opacity: 0.9;
    z-index: 100000 !important;
    .el-dropdown-menu__item {
        color: #bfbfbf;
        font-size: 12px;
    }
    .el-dropdown-menu__item:focus,
    .el-dropdown-menu__item:not(.is-disabled):hover {
        background: $blackColor;
        color: $hosjoyColor;
        font-size: 12px;
    }
}
.el-popper[x-placement^="bottom"] {
    margin-top: 2px !important;
}
.el-popper[x-placement^="bottom"] .popper__arrow {
    display: none;
}
</style>
