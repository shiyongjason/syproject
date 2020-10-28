<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div v-for="(item,index) in detail" :key="index">
                <div class="firstclass">{{item.firstCatagoryName}}</div>
                <div class="secondclass" v-for="(jtem,jndex) in item.respRiskCheckDocTemplateList" :key="jndex">
                    <div class="secondclass-title">
                        <span class="secondclass-start" v-if="jtem.mondatoryFlag==1">*</span>
                        <font class="secondclass-title_font">{{jtem.secondCatagoryName}}</font>
                    </div>
                    <p class="secondclass-remark">备注：{{jtem.remark||'-'}}</p>
                    <div class="secondclass-documents">
                        <p class="secondclass-documents_title">样例：<span v-if="!jtem.riskCheckDocTemplateSamplePos">-</span></p>
                        <div class="secondclass-documents_case" v-if="jtem.riskCheckDocTemplateSamplePos">
                            <div class="secondclass-documents_case_box" v-for="(example,exampleIndex) in jtem.riskCheckDocTemplateSamplePos" :key="exampleIndex">
                                <el-image style="width: 100px; height: 100px" v-if="example.fileUrl" :src="example.fileUrl" :preview-src-list="srcList(jtem,exampleIndex)" />
                            </div>
                        </div>
                        <!--  -->
                        <p class="secondclass-documents_title">规定格式：{{jtem.formatName||"-"}}</p>
                        <template v-if="jtem.creditDocuments">
                            <div class="secondclass-documents_case_documents" v-for="(ktem,kndex) in jtem.creditDocuments" :key="kndex">
                                <div class="posrtv">
                                    <template v-if="ktem&&ktem.fileUrl">
                                        <i class="el-icon-document"></i>
                                        <a :href="ktem.fileUrl" target="_blank">
                                            <font>{{ktem.fileName}}</font>
                                        </a>
                                    </template>
                                </div>
                                <div>{{formatMoment(ktem.updateTime)}}</div>
                                <div>
                                    <!-- <font class="fileItemDownLoad" v-if="ktem.fileName.toLowerCase().indexOf('.png') != -1||ktem.fileName.toLowerCase().indexOf('.jpg') != -1||ktem.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(ktem.fileUrl, ktem.fileName)">下载</font> -->
                                    <a class="fileItemDownLoad" :href="ktem.fileUrl+'?response-content-type=application/octet-stream'" :download="ktem.fileName"
                                        v-if="ktem.fileName.toLowerCase().indexOf('.png') != -1||ktem.fileName.toLowerCase().indexOf('.jpg') != -1||ktem.fileName.toLowerCase().indexOf('.jpeg') != -1">
                                        下载
                                    </a>
                                    <font v-else><a class='fileItemDownLoad' :href="ktem.fileUrl" target='_blank'>下载</a></font>
                                </div>
                            </div>
                        </template>
                        <p v-else>-</p>
                    </div>
                </div>
            </div>
              <div class="bottom-button">
                <p>
                    <h-button style="width:130px;" @click="onBack">返回</h-button>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
import { handleImgDownload } from './utils'
import moment from 'moment'
import { getCreditdocument } from './api'
export default {
    name: 'creditApprove',
    data () {
        return {
            handleImgDownload,
            detail: []
        }
    },
    methods: {
        formatMoment (val) {
            if (!val) return ''
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        },
        srcList (item, index) {
            if (item.riskCheckDocTemplateSamplePos) {
                const res = item.riskCheckDocTemplateSamplePos.filter(item => {
                    return item.fileUrl
                })
                return [res[index].fileUrl]
            }
            return []
        },
        onBack () {
            this.$router.go(-1)
        }
    },
    async mounted () {
        let query = {
            type: 1, // 1:BOSS端查看详情或查看资料 2：小程序端查看详情或BOSS上传资料
            companyId: this.$route.query.companyId
        }
        const { data } = await getCreditdocument(query)
        this.detail = data
    }
}
</script>

<style scoped lang='scss'>
.firstclass {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
.secondclass {
    margin: 10px 0 40px 70px;
    font-weight: 700;
    &-title {
        display: flex;
        align-items: center;
    }
    &-start {
        margin: 0 15px 0 0;
        color: #ff0000;
        font-size: 16px;
    }
    &-title_font {
        font-size: 19px;
        display: flex;
        align-items: center;
        span {
            color: #fff;
            background: #ff0000;
            display: inline-block;
            margin-left: 15px;
            padding: 0 15px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
        }
    }
    &-remark {
        font-size: 14px;
        margin: 10px 0;
    }
    &-documents_title {
        margin: 10px 0;
    }
    &-documents_case {
        display: flex;
        &_box {
            margin-right: 16px;
        }
        &_documents {
            display: flex;
            font-weight: normal;
            color: #504f4f;
            align-items: center;
            margin-bottom: 10px;
            p {
                flex: 1;
            }
            width: 70%;
        }
    }
    &-documents_upload {
        width: 150px;
        margin-top: 5px;
    }
    .fileItemDownLoad {
        font-size: 12px;
        border-radius: 3px;
        padding: 6px 16px;
        color: #fff;
        background-color: #ff7a45;
        border-color: #ff7a45;
        display: block;
        line-height: 13px;
        float: left;
        height: 13px;
        cursor: pointer;
        margin-left: 15px;
    }
    .posrtv {
        position: relative;
        color: #ff7a45;
        display: flex;
        align-items: center;
        flex: 1;
        overflow: hidden;
        a {
            color: #ff7a45;
            margin-left: 10px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
            white-space: nowrap;
            display: flex;
        }
        font {
            font-size: 14px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
            white-space: nowrap;
            display: flex;
        }
    }
}
.errormessage {
    margin-bottom: 15px;
}
.bottom-button {
    display: flex;
    width: 628px;
    margin-left: 50px;
    margin-top: 20px;
    p {
        flex: 1;
        margin-left: 20px;
    }
}
.dialog-box {
    margin-top: 10px;
    p {
        line-height: 2;
    }
}
</style>