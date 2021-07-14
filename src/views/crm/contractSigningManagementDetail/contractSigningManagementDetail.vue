<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <!-- contractSignType: 2线下  1线上 -->
            <div class="ctilte"><span>合同详情</span>
                <div type="primary" class="btn-right" v-if="res.contractStatus=='12'&&res.contractSignType==1&&res.downloadUrl"><a :href="res.downloadUrl" target="_blank">下载合同</a></div>
            </div>
            <div class="file_wrap">
                <h-button type="primary" @click="onGetfile" v-if="res.contractStatus=='12'&&res.contractSignType==2&&hosAuthCheck(Auths.CONTRACT_UPDATEPLACE)">
                    更 新 归 档
                </h-button>
                <div class="file_wrap-table" v-if="res.contractArchives&&res.contractArchives.length>0">
                    <div class='file_wrap-table--flex'>
                        <div>归档时间</div>
                        <div>归档人</div>
                        <div>文件详情</div>
                    </div>
                    <div class='file_wrap-table--flex' v-for="(item,index) in res.contractArchives" :key='index'>
                        <div>{{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                        <div>{{item.createBy}}</div>
                        <div><span v-for="(jtem,jdenx) in item.attachDocList" :key='jdenx'>
                                <a :href="jtem.fileUrl" target="_blank">{{jtem.fileName}}</a></span></div>
                    </div>
                </div>
            </div>
            <div class="loader-css" v-if="showLoading&&res.contractUrl">
                <div class="loader"></div>
                <div class="loader-txt">页面拼命加载中...</div>
            </div>
            <iframe id="ifra" v-if="res.contractUrl" :src='res.contractUrl' width='100%' height='1000px' frameborder="0"></iframe>
            <div class="el-image-css" v-else-if="res.attachementList&&res.attachementList.length>0&&res.contractSignType==2">
                <el-image v-for="(item,index) in res._attachementList" :key="index" fit="contain" ref="zoomImage" :src="item.picUrl" :preview-src-list="[item.picUrl]"></el-image>
            </div>
            <div v-html="vHtml" v-else-if="vHtml" class='approvalcontract-content-layout-css'></div>
            <div v-else-if="res.contractSignType==2">线下合同</div>
            <div v-else>暂无数据</div>
            <div class="contract-fujian" v-if="res.attachementList&&res.attachementList.length>0&&res.contractSignType==2">
                <font>上传的合同附件：</font>
                <div>
                    <p v-for="(item,index) in res.attachementList" :key="index"><a :href="item.picUrl" target="_blank">{{item.picName}}</a></p>
                </div>
            </div>
        </div>
        <fileDialog ref="fileDialog" @callBackFun=initFun></fileDialog>
        <!---->
    </div>
</template>
<script>
import fileDialog from '@/views/crm/contractSigningManagement/fileDialog'
import { getContractsContent } from './api/index'
import * as Auths from '@/utils/auth_const'
import moment from 'moment'
export default {
    name: 'SigningManagementDetail',
    components: { fileDialog },
    data () {
        return {
            Auths,
            vHtml: '',
            res: '',
            showLoading: false,
            moment
        }
    },
    methods: {
        init () {
            this.$nextTick(() => {
                let inputDomList = document.getElementsByClassName('approvalcontract-content-layout-css')[0].getElementsByTagName('input')
                console.log('inputDomList: ', inputDomList)
                Array.from(inputDomList).map((item, index) => {
                    item.outerHTML = `<span class="${item.className}" contenteditable="false" style="display:inline;word-break: break-all;">${item.value}</span>`
                })
            })
        },
        unescapeHTM (a) {
            a = '' + a
            return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
        },
        onGetfile (val) {
            this.$nextTick(() => {
                this.$refs.fileDialog.onGetfile(this.$route.query.id, 2)
            })
        },
        async initFun () {
            const { data } = await getContractsContent({ contractId: this.$route.query.id })
            this.res = data
            this.res._attachementList = this.res.attachementList && this.res.attachementList.filter(val => {
                if (val.picUrl.indexOf('.doc') < 0 && val.picUrl.indexOf('.docx') < 0 && val.picUrl.indexOf('.pdf') < 0 && val.picUrl.indexOf('.xlsx') < 0) {
                    return val
                }
            })
            console.log('==', this.res._attachementList)
            if (!this.res.contractUrl && (!this.res.attachementList || this.res.attachementList.length == 0)) {
                this.vHtml = data.contractContent
                if (this.vHtml) {
                    this.vHtml = this.unescapeHTM(this.vHtml)
                    this.init()
                }
            }
            if (this.res.contractUrl) {
                this.$nextTick(() => {
                    this.showLoading = true
                    let _this = this
                    const iframe = document.querySelector('#ifra')
                    if (iframe.attachEvent) {
                        iframe.attachEvent('onload', function () {
                            console.log('iframe已加载完毕')
                            setTimeout(() => {
                                _this.showLoading = false
                            }, 800)
                        })
                    } else {
                        iframe.onload = function () {
                            console.log('iframe已加载完毕')
                            setTimeout(() => {
                                _this.showLoading = false
                            }, 800)
                        }
                    }
                })
            }
        }
    },
    mounted () {
        this.initFun()
    }/* ,
    async activated () {
        const { data } = await getContractsContent({ contractId: this.$route.query.id })
        this.res = data
        this.vHtml = data.contractContent
        if (this.vHtml) {
            this.init()
        }
    } */
}
</script>
<style scoped lang="scss">
.loader-css {
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translateX(-50%);
}
.loader {
    border: 13px solid #f3f3f3;
    border-radius: 50%;
    border-top: 13px solid #3498db;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}
.loader-txt {
    margin-top: 20px;
    text-align: center;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.approvalcontract-content-layout-css {
    width: 1000px;
    margin: 0 auto;
}
.ctilte {
    text-align: center;
    line-height: 41px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
    span {
        font-size: 20px;
    }
}
.btn-right {
    float: right;
    background: #ff7a45;

    border-radius: 10px;
    width: 150px;
    a {
        color: #ffffff;
    }
}

/deep/.inputCont {
    color: #ff7a45;
    display: inline-block;
    height: 22px;
    min-width: 20px;
    // max-width: 100px;
    // background: #efeeee;
    border: none;
    text-align: center;
    margin-right: 3px;
}
.contract-fujian {
    margin-top: 20px;
    display: flex;
    p {
        margin-bottom: 5px;
        a {
            color: #ff7a45;
        }
    }
}
.el-image-css {
    width: 1000px;
    margin: 0 auto;
    text-align: center;
}
.file_wrap {
    margin-bottom: 40px;
    &-table {
        margin: 20px;
        &--flex {
            display: flex;
            justify-content: space-between;
            border: 1px solid #cccccc;
            line-height: 30px;
            border-bottom: none;
            &:first-child {
                display: flex;
                text-align: center;
                height: 40px;
                div {
                    align-items: center;
                    justify-content: center;
                    color: #333333;
                }
            }
            &:last-child {
                border-bottom: 1px solid #cccccc;
            }
            span {
                margin-right: 10px;
            }
            div {
                padding: 0 10px;
                display: flex;
                flex: 2;
                flex-wrap: wrap;
                justify-content: flex-start;
                a {
                    color: #ff7a45;
                    width: 120px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                &:not(:last-child) {
                    color: #333333;
                    flex: 1;
                    border-right: 1px solid #cccccc;
                    justify-content: center;
                }
            }
        }
    }
}
</style>