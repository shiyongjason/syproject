<template>
    <div class="otherFiles">
        <!-- 投资履约担保函归档 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span class="labeldiy">其他材料归档：</span>
            </template>
            <hosjoyUpload v-if="isEdit" v-model="otherFiles.fileList" showAsFileName :fileSize='100' :fileNum='100' :action='action' :uploadParameters='uploadParameters' @successCb="onSuccessCb('fileList','d-other')">
                <el-button size="small" type="primary">点击上传</el-button>
            </hosjoyUpload>
            <div class="filename" v-else>
                <span v-if="otherFiles.fileList.length===0">-</span>
                <template v-else>
                    <span v-for="(item,index) in otherFiles.fileList" :key="index" class="posrtv">
                        <template v-if="item&&item.fileUrl">
                            <i class="el-icon-document"></i>
                            <a :href="item.fileUrl" target="_blank">
                                <font >{{item.fileName}}</font>
                            </a>
                        </template>
                    </span>
                </template>
            </div>
        </el-form-item>
    </div>
</template>

<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { fileUploadUrl } from '@/api/config'
import { mapState } from 'vuex'

export default {
    name: 'otherFiles',
    props: ['value', 'isEdit'],
    components: { hosjoyUpload },
    data () {
        return {
            action: fileUploadUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        otherFiles () {
            return this.value
        }
    },
    methods: {
        onSuccessCb (key, str) {
            this.otherFiles[key].map(item => {
                this.$set(item, 'docType', str)
            })
        }
    },
    mounted () {
        this.uploadParameters.updateUid = this.userInfo.employeeName
    }
}
</script>

<style scoped lang='scss'>
/deep/.el-input-group__append{ color:#909399}
.otherFiles {
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
.labeldiy{ color: #000; font-weight:bold;}
.filename{
    color: #6e6f73;
    display: flex;
    flex-wrap: wrap;
    span{
            display: flex;
            align-items: center;
            margin-right: 15px;
        i {
            font-size: 21px;
            font-weight: bold;
        }
        a {color: #6e6f73; margin-left: 10px}
    }
    .posrtv{ position: relative;}
}
</style>