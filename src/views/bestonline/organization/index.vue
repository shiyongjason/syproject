<template>
    <OrganizationEdit v-if="canEdit" :applyId="applyId" />
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
            applyId: '',
            canEdit: true
        }
    },
    computed: {
        // canEdit () {
        //     return this.form.operationNode != 1 && this.roleType
        // },
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
        if (this.$route.query.status == 0 || this.$route.query.status == 3) {
            this.canEdit = true
        } else {
            this.canEdit = false
        }
    }
}
</script>
