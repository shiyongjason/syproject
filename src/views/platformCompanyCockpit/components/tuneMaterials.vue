<template>
    <div class="tunematerials">
        <el-form-item label="尽调材料归档：">
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
        </el-form-item>
        <el-form-item v-if="radio==='1'" label="尽调材料：">
            <hosjoyUpload v-model="fileNameList" showAsFileName :action='action' :uploadParameters='uploadParameters'>
                <el-button size="small" type="primary">点击上传</el-button>
            </hosjoyUpload>
        </el-form-item>
    </div>
</template>

<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { fileUploadUrl } from '@/api/config'
export default {
    name: 'tuneMaterials',
    props: ['value'],
    components: { hosjoyUpload },
    data () {
        return {
            action: fileUploadUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '张功伟x'
            },
            radio: '',
            fileNameList: []
        }
    },
    computed: {
        tuneMaterials: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {

    },
    mounted () {

    }
}
</script>

<style scoped>
.tunematerials{
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
</style>