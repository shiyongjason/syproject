<script>
import { iframeUrl, jinyun } from '@/api/config'
import { gotoJinYun } from "../index/api"
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
                    }else if (item.path === '/jinyunPlatform') {
                        result.push(
                        <a href={`${gotoJinYun(jinyun,this.params)}`} target="_blank" class={`el-menu-item `} style={`display:block`}>
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
        let token = sessionStorage.getItem('token')
        if (token) {
            token = 'Bearer ' + token
        }
        const params = {
            mobileNo: this.userInfo.phoneNumber,
            token: token
        }
        this.params = params
        return (
            <el-menu mode={this.mode} default-active={this.$route.path} collapse={this.collapse} active-text-color="#FF7A45" unique-opened router>
                {this.generateSidebar(this.menus, '')}
            </el-menu>
        )
    }
}
</script>
