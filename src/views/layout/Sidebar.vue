<script>
import { iframeUrl, jinyun } from '@/api/config'
import { mapState } from 'vuex'

export default {
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
        },
        // 当菜单isMenu: false的时候,侧边菜单按父级高亮展示，by sunjun。example:search 'showMenuAs'。
        getDefaultActive () {
            if (this.$route.meta && this.$route.meta.showMenuAs) {
                return this.$route.meta.showMenuAs
            }
            return this.$route.path
        }
    },
    render (h) {
        return (
            <el-menu mode={this.mode} default-active={this.getDefaultActive()} collapse={this.collapse} active-text-color="#FF7A45" unique-opened router>
                {this.generateSidebar(this.menus, '')}
            </el-menu>
        )
    }
}
</script>
