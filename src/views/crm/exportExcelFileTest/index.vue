<template>
    <div class="B2b export-excel-file-test">
        <div class="page-body-cont">
            <el-select>
                <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'exportExcelFileTest',
    data () {
        return {
            message: ''
        }
    }
}
</script>

<style scoped>

</style>
