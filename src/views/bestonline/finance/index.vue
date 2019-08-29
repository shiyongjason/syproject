<template>
    <FinanceEdit v-if="canEdit" />
    <FinanceShow v-else />
</template>

<script>
import FinanceEdit from './edit.vue'
import FinanceShow from './show.vue'
import { mapState, mapActions } from 'vuex'

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
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            form: state => state.dueDiligence.financeData
        })
    },
    methods: {
        ...mapActions([
            'findFinanceData'
        ]),
        init () {
            this.form.dueFinanceYearOperatingCreateForms.map((item) => {
                item.assetLiabilityRatio = this.form.totalLiability
            })
        }
    },
    async mounted () {
        await this.findFinanceData({ applyId: this.$route.query.applyId })
        this.init()
        if (this.$route.query.status == 0 || this.$route.query.status == 3) {
            this.canEdit = true
        } else {
            this.canEdit = false
        }
    }
}
</script>
