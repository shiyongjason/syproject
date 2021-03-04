<template>
    <div class="B2b export-excel-file-test">
        <div class="page-body-cont">
            <el-select v-model="name">
                <el-option v-for="item in nameList" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
            <hosjoyUpload :fileSize='100' :fileNum='100' v-model="uploadParams" showAsFileName :action='action' :uploadParameters='uploadParameters'>
                <el-button size="small" type="primary">点击上传</el-button>
            </hosjoyUpload>
        </div>
    </div>
</template>

<script>
export default {
    name: 'exportExcelFileTest',
    data () {
        return {
            name: '',
            nameList: [],
            uploadParams: {

            }
        }
    }
}
</script>

<style scoped>

</style>
