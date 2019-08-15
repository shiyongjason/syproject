<template>
    <OrganizationEdit v-if="canEdit" />
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
            canEdit: true
        }
    },
    methods: {
        ...mapActions([
            'findOrganizationData'
        ])
    },
    mounted () {
        this.findOrganizationData({ applyId: this.$route.query.applyId })
    }
}
</script>
