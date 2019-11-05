<template>
    <div class="tunematerials">
        <el-form-item label="尽调材料归档：">
            <el-radio v-if="isEdit" v-model="platformBasicInfoPO.ddDocFlag" label="1">是</el-radio>
            <el-radio v-if="isEdit" v-model="platformBasicInfoPO.ddDocFlag" label="0">否</el-radio>
            <span v-else>{{platformBasicInfoPO.ddDocFlag==='1'?'是':platformBasicInfoPO.ddDocFlag==='0'?'否':'-'}}</span>
        </el-form-item>
        <el-form-item v-if="platformBasicInfoPO.ddDocFlag==='1'" label="尽调材料：">
            <hosjoyUpload :fileSize='100' :fileNum='100' v-if="isEdit" v-model="platformBasicInfoPO.dd" showAsFileName :action='action' :uploadParameters='uploadParameters'>
                <el-button size="small" type="primary">点击上传</el-button>
            </hosjoyUpload>
            <div class="filename" v-else>
                <span v-if="platformBasicInfoPO.dd.length===0">-</span>
                <template v-else>
                    <span v-for="(item,index) in platformBasicInfoPO.dd" :key="index" class="posrtv">
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
    name: 'tuneMaterials',
    props: ['value', 'commonDocPOs', 'isEdit'],
    components: { hosjoyUpload },
    data () {
        return {
            loading: false,
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
        platformBasicInfoPO () {
            return this.value
        }
    },
    watch: {
        'platformBasicInfoPO.dd' (val) {
            console.log(val)
        }
    },
    methods: {

    },
    mounted () {
        this.uploadParameters.updateUid = this.userInfo.employeeName
    }
}
</script>

<style scoped lang='scss'>
.tunematerials{
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
.filename{
    color: #6e6f73;
    display: flex;
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