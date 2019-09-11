<template>
    <BusinessEdit v-if="roleType" />
    <BusinessShow v-else />
</template>

<script>
import BusinessEdit from './edit.vue'
import BusinessShow from './show.vue'
import { mapActions } from 'vuex'

export default {
    name: 'cotarget',
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    components: {
        BusinessEdit, BusinessShow
    },
    methods: {
        ...mapActions([
            'findBusinessData'
        ])
    },
    mounted () {
        this.findBusinessData({ applyId: this.$route.query.applyId })
    }
}
</script>
