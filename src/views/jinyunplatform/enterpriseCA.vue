<template>
    <div class="tags-wrapper page-body">
        <apply @onSearch='onSearch' />
        <attestation ref="attestation" />
    </div>
</template>

<script>
import apply from './components/enterpriseCA/CAapply'
import attestation from './components/enterpriseCA/CAattestation'
export default {
    name: 'enterpriseCA',
    components: { apply, attestation },
    methods: {
        onSearch () {
            this.$refs.attestation.onSearch()
        }
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
