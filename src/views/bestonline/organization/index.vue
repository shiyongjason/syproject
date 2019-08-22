<template>
    <OrganizationEdit v-if="canEdit" :applyId="applyId" />
    <OrganizationShow v-else />
</template>

<script>
import OrganizationEdit from './edit.vue'
import OrganizationShow from './show.vue'
import { mapActions } from 'vuex'

export default {
    name: 'cotarget',
    components: {
        OrganizationEdit, OrganizationShow
    },
    data () {
        return {
            canEdit: true,
            applyId: ''
        }
    },
    methods: {
        ...mapActions([
            'findOrganizationData'
        ])
    },
    mounted () {
        this.applyId = this.$route.query.applyId
        this.findOrganizationData({ applyId: this.$route.query.applyId })
    }
}
</script>
