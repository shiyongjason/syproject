<template>
    <OrganizationEdit v-if="roleType" :applyId="applyId" />
    <OrganizationShow v-else />
</template>

<script>
import OrganizationEdit from './edit.vue'
import OrganizationShow from './show.vue'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'cotarget',
    components: {
        OrganizationEdit, OrganizationShow
    },
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            applyId: ''
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.organizationData
        })
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
