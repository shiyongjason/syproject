<template>
    <div class="collect-wrap">
        <el-form :model="approveForm"  ref="approveForm" class="demo-ruleForm">
            <!-- <div class="collect-result">
                <el-form-item label="立项结果:" prop="resource" label-width="100px">
                    <el-radio-group v-model="approveForm.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="说明：" prop="desc" label-width="100px">
                    <el-input type="textarea" v-model="approveForm.desc"></el-input>
                </el-form-item>
            </div> -->
            <div class="collect-wrapbox" v-for="item in approveForm.projectDocList" :key="item.firstCatagoryId">
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
                                        <a :href="item.fileUrl" target="_blank">
                                            <font>{{item.fileName}}</font>
                                        </a>
                                    </template>
                                </span>
                            </p>
                            <p style="flex:0.5">{{item.date}}</p>
                            <p>
                                <font class="fileItemDownLoad" @click="onDelete">删除</font>
                                <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(item.fileUrl, item.fileName)">下载</font>
                                <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                            </p>
                        </div>
                        <hosjoyUpload v-model="fileList" :showPreView=false :fileSize='200' :fileNum='15' :action='action' :uploadParameters='uploadParameters' @successCb="onSuccessCb()" style="margin-top:10px">
                            <el-button type="primary">上 传</el-button>
                        </hosjoyUpload>
                    </el-form-item>
                </template>
            </div>
        </el-form>
    </div>
</template>
<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
import { handleImgDownload } from '../../projectInformation/utils'
export default {
    name: 'approvecom',
    props: {
        approveForm: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        hosjoyUpload
    },
    data () {
        return {
            fileList: [],
            handleImgDownload,
            action: interfaceUrl + 'tms/files/upload',
            dd: [],
            uploadParameters: {
                updateUid: '',
                reservedName: true
            }
        }
    },
    methods: {
        onSaveapprove () {

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
</style>