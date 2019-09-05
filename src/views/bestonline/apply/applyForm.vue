<template>
    <ApplyEdit v-if="canEdit" />
    <ApplyShow v-else />
</template>

<script>
import ApplyEdit from './edit.vue'
import ApplyShow from './show.vue'
import { getDueapplydetail } from '../api/index'
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
    async mounted () {
        if (this.$route.query.id) {
            const { data } = await getDueapplydetail({ applyId: this.$route.query.id })
            this.approvalStatus = data.data.approvalStatus
            if (this.approvalStatus == 1 || this.approvalStatus == 2) {
                this.canEdit = false
            }
        }
    }
}
</script>
