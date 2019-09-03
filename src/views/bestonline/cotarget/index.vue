<template>
    <CotargetEdit v-if="roleType" @init="init" />
    <CotargetShow v-else />
</template>

<script>
import CotargetEdit from './edit.vue'
import CotargetShow from './show.vue'
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
        CotargetEdit, CotargetShow
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.cotargetData
        })
    },
    methods: {
        ...mapActions([
            'findCotargetData'
        ]),
        init () {
            this.$emit('parentFun')
        }
    },
    async mounted () {
        await this.findCotargetData({ applyId: this.$route.query.applyId })
        this.form.applyId = this.$route.query.applyId
    }
}
</script>
