<template>
    <el-container class="body-container">
        <el-header class="header">
            <NavMenuHead/>
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
                        :include="cachedInclude.join(',')"
                        :exclude="cachedExclude.join(',')"
                    >
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </el-main>
        </el-container>
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
            isCollapse: false
        }
    },
    computed: {
        ...mapState({
            loading: state => state.loading,
            cachedInclude: state => state.cachedInclude,
            cachedExclude: state => state.cachedExclude
        })
    },
    methods: {
        menuBack (val) {
            this.isCollapse = val
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
</style>
