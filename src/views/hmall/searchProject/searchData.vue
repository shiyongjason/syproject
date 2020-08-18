<template>
    <div class="page-body">
        <div class="page-body-cont">
            <h-button>默认按钮</h-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'searchDataList',
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
