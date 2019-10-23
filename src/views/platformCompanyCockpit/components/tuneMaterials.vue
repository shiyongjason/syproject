<template>
    <div class="tunematerials">
        <el-form-item label="尽调材料归档：">
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
        </el-form-item>
        <el-form-item v-if="radio==='1'" label="尽调材料：">
            <el-upload multiple class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
            :on-exceed="handleExceed" :file-list="fileList" :on-change="onChange">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
    </div>
</template>

<script>
export default {
    name: 'tuneMaterials',
    props: ['value'],
    data () {
        return {
            radio: '',
            fileList: []
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
        handleRemove (file, fileList) {
            console.log(file, fileList)
        },
        handlePreview (file) {
            console.log(file)
        },
        handleExceed (files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        beforeRemove (file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`)
        },
        onChange (file, fileList) {
            const isJPG = file.raw.type === 'image/jpeg'
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
                fileList.pop()
            }
            let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)
            if (existFile) {
                this.$message.error('当前文件已经存在!')
                fileList.pop()
            }
            this.fileList = fileList
        }
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