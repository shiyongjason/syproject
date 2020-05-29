<template>
    <div class="page-body-cont" v-if="informationDetail">
        <div v-if="!informationDetail.approveResult">
            待立项
        </div>
        <div v-else>
            <div class="firstclass">信审结果：{{informationDetail.approveResult||'-'}}</div>
            <div class="firstclass">说明：{{!informationDetail.remark?'-':''}}</div>
            <div class="explanation" v-if="informationDetail.remark">
                {{!informationDetail.remark}}
            </div>
            <div class="firstclass">信审材料：</div>
            <div v-for="(item,index) in informationDetail.projectDocList" :key="index">
                <div class="firstclass">{{item.firstCatagoryName}}</div>
                <div class="secondclass" v-for="(jtem,jndex) in item.respRiskCheckDocTemplateList" :key="jndex">
                    <div class="secondclass-title" style="margin-top:8px">
                        <font class="secondclass-title_font">{{jtem.secondCatagoryName}}</font>
                    </div>
                    <p class="secondclass-remark">备注：{{jtem.remark||'-'}}</p>
                    <div class="secondclass-documents">
                        <p class="secondclass-documents_title">规定格式：{{jtem.formatName||'-'}}</p>
                        <template v-if="jtem.riskCheckProjectDocPos">
                            <div class="secondclass-documents_case_documents" v-for="(ktem,kndex) in jtem.riskCheckProjectDocPos" :key="kndex">
                                <p>
                                    <span class="posrtv">
                                        <template v-if="ktem&&ktem.fileUrl">
                                            <i class="el-icon-document"></i>
                                            <a :href="ktem.fileUrl" target="_blank">
                                                <font>{{ktem.fileName}}</font>
                                            </a>
                                        </template>
                                    </span>
                                </p>
                                <p style="flex:0.5">{{formatMoment(ktem.updateTime)}}</p>
                                <p>
                                    <font class="fileItemDownLoad" v-if="ktem.fileName.toLowerCase().indexOf('.png') != -1||ktem.fileName.toLowerCase().indexOf('.jpg') != -1||ktem.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(ktem.fileUrl, ktem.fileName)">下载</font>
                                    <font v-else><a class='fileItemDownLoad' :href="ktem.fileUrl" target='_blank'>下载</a></font>
                                </p>
                            </div>
                        </template>
                        <p v-else>-</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { handleImgDownload } from '../utils'
import moment from 'moment'

export default {
    name: 'tabLetterTrial',
    props: ['informationDetail'],
    data () {
        return {
            handleImgDownload,
            dd: [
                { fileUrl: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', fileName: '备注：原则上工商局打印（工商章）.jpg', date: '2020-05-22 14:29:00' }
            ]
        }
    },
    methods: {
        formatMoment (val) {
            if (!val) return ''
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    mounted () {

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
            p {
                flex: 1;
            }
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
        margin-left: 10px;
        margin-bottom: 5px;
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
.explanation {
    font-size: 14px;
    margin-bottom: 20px;
}
</style>