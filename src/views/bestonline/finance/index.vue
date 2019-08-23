<template>
    <FinanceEdit v-if="canEdit" />
    <FinanceShow v-else />
</template>

<script>
import FinanceEdit from './edit.vue'
import FinanceShow from './show.vue'
import { mapActions } from 'vuex'

export default {
    name: 'cotarget',
    components: {
        FinanceEdit, FinanceShow
    },
    data () {
        return {
            canEdit: true
        }
    },
    methods: {
        ...mapActions([
            'findFinanceData'
        ])
    },
    async mounted () {
        const data = await this.findFinanceData({ applyId: this.$route.query.applyId })
        console.log(data)
    }
}
</script>
