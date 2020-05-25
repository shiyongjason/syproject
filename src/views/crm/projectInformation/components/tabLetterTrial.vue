<template>
    <div class="page-body-cont">
        <div>
            <div class="firstclass">信审结果：通过</div>
            <div class="firstclass">说明：</div>
            <div class="explanation">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam
                fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
            </div>
            <div class="firstclass">信审材料：</div>
            <div class="firstclass">终审</div>
            <div class="secondclass">
                <div class="secondclass-title">
                    <font class="secondclass-title_font">风控</font>
                </div>
                <div class="secondclass-title" style="margin-top:8px">
                    <font class="secondclass-title_font">定价方案</font>
                </div>
                <p class="secondclass-remark">备注：原则上工商局打印（工商章）</p>
                <div class="secondclass-documents">
                    <p class="secondclass-documents_title">规定格式：复印件</p>
                    <div class="secondclass-documents_case_documents" v-for="(item,index) in dd" :key="index">
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
                            <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(item.fileUrl, item.fileName)">下载</font>
                            <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { handleImgDownload } from '../utils'
export default {
    name: 'tabLetterTrial',
    data () {
        return {
            handleImgDownload,
            dd: [
                { fileUrl: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', fileName: '备注：原则上工商局打印（工商章）.jpg', date: '2020-05-22 14:29:00' }
            ]
        }
    },
    methods: {

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