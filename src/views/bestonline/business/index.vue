<template>
    <BusinessEdit v-if="canEdit" />
    <BusinessShow v-else />
</template>

<script>
import BusinessEdit from './edit.vue'
import BusinessShow from './show.vue'
import { mapActions } from 'vuex'

export default {
    name: 'cotarget',
    components: {
        BusinessEdit, BusinessShow
    },
    data () {
        return {
            canEdit: true
        }
    },
    methods: {
        ...mapActions([
            'findBusinessData'
        ])
    },
    mounted () {
        this.findBusinessData({ applyId: this.$route.query.applyId })
        if (this.$route.query.status == 0 || this.$route.query.status == 3) {
            this.canEdit = true
        } else {
            this.canEdit = false
        }
    }
}
</script>
