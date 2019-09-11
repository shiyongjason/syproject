<template>
    <JusticeEdit v-if="roleType" />
    <JusticeShow v-else />
</template>

<script>
import JusticeEdit from './edit.vue'
import JusticeShow from './show.vue'
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
        JusticeEdit, JusticeShow
    },
    methods: {
        ...mapActions([
            'findJusticeData'
        ])
    },
    mounted () {
        this.findJusticeData({ applyId: this.$route.query.applyId })
    }
}
</script>
