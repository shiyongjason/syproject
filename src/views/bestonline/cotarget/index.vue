<template>
    <CotargetEdit v-if="canEdit" />
    <CotargetShow v-else />
</template>

<script>
import CotargetEdit from './edit.vue'
import CotargetShow from './show.vue'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'cotarget',
    components: {
        CotargetEdit, CotargetShow
    },
    data () {
        return {
            canEdit: true
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.cotargetData
        })
    },
    methods: {
        ...mapActions([
            'findCotargetData'
        ])
    },
    mounted () {
        this.findCotargetData({ applyId: this.$route.query.applyId })
        if(this.form.id){
            this.canEdit = false
        }
    }
}
</script>
