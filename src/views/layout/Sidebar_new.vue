<template>
    <el-menu :mode="mode" :default-active="$route.path" :collapse="collapse" active-text-color="#FF7A45" unique-opened router>
        <SidebarItem
            v-for="(item, index) in menus"
            :key="index"
            :item="item"
        >
        </SidebarItem>
    </el-menu>
</template>

<script>
import { iframeUrl, jinyun } from '@/api/config'
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
    components: { SidebarItem },
    props: {
        menus: {
            type: Array,
            default: () => ([])
        },
        mode: {
            type: String,
            default: 'horizontal'
        },
        collapse: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            params: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        generateSidebar (menus, parentPath) {
            const result = []
            let token = sessionStorage.getItem('token')
            if (token) {
                token = 'Bearer ' + token
            }
            const jinyunHref = jinyun + 'bossLogin.do?mobileNo=' + this.userInfo.phoneNumber + '&token=' + token
            menus.forEach((item, index) => {
                const path = parentPath === '' ? `${parentPath}${item.path}` : `${parentPath}/${item.path}`
                if (item.children && item.children.length > 0) {
                    const children = this.generateSidebar(item.children, path)
                    result.push((
                        <el-submenu index={path}>
                            <template slot="title">
                                {item.meta.icon && <i class={`iconfont ${item.meta.icon}`}></i>}
                                <span>{item.meta.title}</span>
                            </template>{children}
                        </el-submenu>
                    ))
                } else {
                    if (item.path === '/oldsystem') {
                        result.push(
                            <a href={`${iframeUrl}/default.html#/index`} target="_blank" class={`el-menu-item `} style={`display:block`}>
                                {item.meta.icon && <i class={`iconfont ${item.meta.icon}`}></i>}
                                <span>{item.meta.title}</span>
                            </a>
                        )
                    } else if (item.path === '/jinyunPlatform') {
                        result.push(
                            <a href={`${jinyunHref}`} target="_blank" class={`el-menu-item `} style={`display:block`}>
                                {item.meta.icon && <i class={`iconfont ${item.meta.icon}`}></i>}
                                <span>{item.meta.title}</span>
                            </a>
                        )
                    } else {
                        result.push(
                            <el-menu-item index={path}>
                                {item.meta.icon && <i class={`iconfont ${item.meta.icon}`}></i>}
                                <span>{item.meta.title}</span>
                            </el-menu-item>
                        )
                    }
                }
            })
            return result
        }
    },
    render (h) {
        return (
            <el-menu mode={this.mode} default-active={this.$route.path} collapse={this.collapse} active-text-color="#FF7A45" unique-opened router>
                {this.generateSidebar(this.menus, '')}
            </el-menu>
        )
    }
}
</script>
