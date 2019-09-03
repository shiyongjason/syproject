<template>
    <FinanceEdit v-if="roleType" />
    <FinanceShow v-else />
</template>

<script>
import FinanceEdit from './edit.vue'
import FinanceShow from './show.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'cotarget',
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    components: {
        FinanceEdit, FinanceShow
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
    }
}
</script>
