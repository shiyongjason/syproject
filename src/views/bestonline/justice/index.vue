<template>
    <JusticeEdit v-if="canEdit" />
    <JusticeShow v-else />
</template>

<script>
import JusticeEdit from './edit.vue'
import JusticeShow from './show.vue'
import { mapActions } from 'vuex'

export default {
    name: 'cotarget',
    components: {
        JusticeEdit, JusticeShow
    },
    data () {
        return {
            canEdit: true
        }
    },
    methods: {
        ...mapActions([
            'findJusticeData'
        ])
    },
    mounted () {
        this.findJusticeData({ applyId: this.$route.query.applyId })
        if (this.$route.query.status != 0) {
            this.canEdit = false
        }
    }
}
</script>
