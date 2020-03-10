<template>
    <div class="tags-wrapper page-body">
        <apply />
        <!-- <apply @onSearch='onSearch' /> -->
        <attestation />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import apply from './components/enterpriseCA/CAapply'
import attestation from './components/enterpriseCA/CAattestation'

export default {
    name: 'enterpriseCA',
    components: { apply, attestation },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {


        }
    },
    mounted () {

    },
    methods: {

    }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog {
    min-width: 350px;
}
/deep/ .el-dialog__body {
    min-height: 256px;
}
/deep/ .el-table__row .cell {
    white-space: nowrap;
}
.add-tags-dialog {
    padding-top: 20px;
}
</style>
