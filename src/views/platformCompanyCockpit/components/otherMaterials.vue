<template>
    <div class="otherMaterials">
        <!-- 投资履约担保函归档 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span class="labeldiy">其他材料归档：</span>
            </template>
            <hosjoyUpload v-model="fileNameList" showAsFileName :action='action' :uploadParameters='uploadParameters'>
                <el-button size="small" type="primary">点击上传</el-button>
            </hosjoyUpload>
            <span>{{otherMaterials.num}}</span>
        </el-form-item>
    </div>
</template>

<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { fileUploadUrl } from '@/api/config'
export default {
    name: 'otherMaterials',
    props: ['value'],
    components: { hosjoyUpload },
    data () {
        return {
            action: fileUploadUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '张功伟x'
            },
            radio: '', // 1
            options: [],
            fileNameList: [],
            otherRadio: ''
        }
    },
    computed: {
        otherMaterials: {
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

<style scoped lang='scss'>
/deep/.el-input-group__append{ color:#909399}
.otherMaterials {
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
.labeldiy{ color: #000; font-weight:bold;}
</style>