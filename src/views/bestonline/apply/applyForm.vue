<template>
    <ApplyEdit v-if="canEdit" />
    <ApplyShow v-else />
</template>

<script>
import ApplyEdit from './edit.vue'
import ApplyShow from './show.vue'
import { getDueapplydetail } from '../api/index'
import { mapState } from 'vuex'
import { AUTH_BESTONLINE_APPLY_EDIT } from '@/utils/auth_const'
export default {
    name: 'applyform',
    components: {
        ApplyEdit, ApplyShow
    },
    data () {
        return {
            canEdit: true
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    async mounted () {
        if (this.$route.query.id) {
            const { data } = await getDueapplydetail({ applyId: this.$route.query.id })
            this.approvalStatus = data.data.approvalStatus
            const deptType = this.userInfo.deptType
            const role = this.userInfo.role
            // 提交审批之后就不能修改了，审批不通过也不能修改
            // 不是分部发展权限的也不可以修改,权限没有配置的也不可以修改
            // todo: 这里最好将连接改成两个，一个链接不好处理
            if (this.approvalStatus > 0 || !(deptType === 2 && role.indexOf('fenbufazhan') !== -1 && this.hosAuthCheck(AUTH_BESTONLINE_APPLY_EDIT))) {
                this.canEdit = false
            }
        }
    }
}
</script>
