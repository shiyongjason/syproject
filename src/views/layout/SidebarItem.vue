<template>
    <div>
        <template v-if="item.children && item.children.length > 0">
            <el-submenu :index="item.path">
                <template slot="title">
                    <template v-if="item.meta.icon">
                        <i :class="`iconfont ${item.meta.icon}`"></i>
                    </template>
                    <span>{{item.meta.title}}</span>
                </template>
                <SidebarItem
                    v-for="(item2, index) in item.children"
                    :key="index"
                    :item="item2"
                    :parentPath="item2.children && item2.children.length > 0 ? '' : item.path"
                >
                </SidebarItem>
            </el-submenu>
        </template>
        <template v-else>
            <template v-if="item.path === '/oldsystem'">
                <a :href="`${iframeUrl}/default.html#/index`" target="_blank" class="el-menu-item" style="display:block">
                    <template v-if="item.meta.icon">
                        <i :class="`iconfont ${item.meta.icon}`"></i>
                    </template>
                    <span>{{item.meta.title}}</span>
                </a>
            </template>
            <template v-else-if="item.path === '/oldsystem'">
                <a :href="`${jinyunHref}/default.html#/index`" target="_blank" class="el-menu-item" style="display:block">
                    <template v-if="item.meta.icon">
                        <i :class="`iconfont ${item.meta.icon}`"></i>
                    </template>
                    <span>{{item.meta.title}}</span>
                </a>
            </template>
            <template v-else>
                <el-menu-item :index="parentPath? parentPath + '/' + item.path : item.path">
                    <template v-if="item.meta.icon">
                        <i :class="`iconfont ${item.meta.icon}`"></i>
                    </template>
                    <span>{{item.meta.title}}</span>
                </el-menu-item>
            </template>
        </template>
    </div>
</template>

<script>
import { iframeUrl, jinyun } from '@/api/config'
import { mapState } from 'vuex'
export default {
    name: 'SidebarItem',
    props: {
    // route object
        item: {
            type: Object,
            required: true
        },
        parentPath: {
            type: String
            // required: true
        }
    },
    data () {
        return {
            jinyunHref: '',
            iframeUrl
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    beforeMount () {
        let token = sessionStorage.getItem('token')
        if (token) {
            token = 'Bearer ' + token
        }
        this.jinyunHref = jinyun + 'bossLogin.do?mobileNo=' + this.userInfo.phoneNumber + '&token=' + token
    },
    methods: {

    }
}
</script>
