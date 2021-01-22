<template>
    <div class="collect-wrap">
        <el-form :model="finalForm" ref="colForm" class="demo-ruleForm">
            <div class="collect-wrapbox" v-for="item in finalForm.projectDocList" :key="item.firstCatagoryId">
                <div class="collect-title">{{item.firstCatagoryName}}</div>
                <template v-for="obj in item.respRiskCheckDocTemplateList">
                    <el-form-item label="" prop="type" :key="'item'+obj.templateId">
                        <div class="collect-box">
                            <el-checkbox label="" name="type" size="medium" v-model="obj.callback"></el-checkbox>
                            <div class="collect-boxtxt">
                                <h3>{{obj.secondCatagoryName}}</h3>
                                <p>备注：{{obj.remark}}</p>
                                <p>规定格式：{{obj.formatName}}</p>
                            </div>
                        </div>
                        <div class="upload-file_list" v-for="(item,index) in dd" :key="index">
                            <p>
                                <span class="posrtv">
                                    <template v-if="item&&item.fileUrl">
                                        <i class="el-icon-document"></i>
                                        <downloadFileAddToken isPreview
                                                              :file-name="item.fileName"
                                                              :file-url="item.fileUrl"
                                                              :a-link-words="item.fileName"
                                                              is-type="main" />
                                    </template>
                                </span>
                            </p>
                            <p style="flex:0.5">{{item.date}}</p>
                            <p>
                                <font class="fileItemDownLoad" @click="onDelete">删除</font>
                                <downloadFileAddToken :file-name="item.fileName" :file-url="item.fileUrl" :a-link-words="'下载'" is-type="btn"></downloadFileAddToken>
                            </p>
                        </div>
                        <OssFileHosjoyUpload v-model="fileList" :showPreView=false :fileSize='200' :fileNum='15' :action='action' :uploadParameters='uploadParameters' @successCb="onSuccessCb()" style="margin-top:10px">
                            <el-button>上传</el-button>
                        </OssFileHosjoyUpload>
                    </el-form-item>
                </template>
            </div>
        </el-form>
    </div>
</template>
<script>
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload'
import downloadFileAddToken from '@/components/downloadFileAddToken/index'
import { ccpBaseUrl } from '@/api/config'
import { handleImgDownload } from '@/utils/utils'
export default {
    props: {
        finalForm: {
            type: Object,
            default: () => { }
        }
    },
    components: {
        OssFileHosjoyUpload,
        downloadFileAddToken
    },
    data () {
        return {
            handleImgDownload,
            dd: [{
                fileUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                fileName: 'asd.jpeg'
            }],
            colForm: {},
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            fileList: []
        }
    },
    methods: {
        onDelete () {

        }
    }
}
</script>
<style lang="scss" scoped>
.collect-wrap {
    padding: 0 10px 100px 10px;
}
.collect-title {
    font-size: 20px;
    color: #ff7a45;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 10px;
}
.collect-box {
    display: flex;
    .el-checkbox {
        margin-right: 10px;
    }
}
.collect-wrapbox {
    margin-left: 20px;
}
.upload-file_list {
    display: flex;
}
.fileItemDownLoad {
    font-size: 12px;
    border-radius: 3px;
    padding: 8px 16px;
    color: #fff;
    background-color: #ff7a45;
    border-color: #ff7a45;
    display: block;
    line-height: 13px;
    float: left;
    height: 13px;
    cursor: pointer;
    margin-left: 10px;
}
.posrtv {
    position: relative;
    color: #ff7a45;
    a {
        color: #ff7a45;
        margin-left: 10px;
    }
    font {
        font-size: 14px;
    }
}
</style>
