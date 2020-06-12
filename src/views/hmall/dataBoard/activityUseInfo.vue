<template>
    <div class="page-body">
        <div class="page-body-cont">

        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'activityUseInfo',
    data () {
        return {

        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo.principal
        })
    },
    methods: {
        init () {

        },
        ...mapActions([

        ])
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
</style>
