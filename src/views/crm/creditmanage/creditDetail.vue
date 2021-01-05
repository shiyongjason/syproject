<template>
    <div class="page-body" v-if="detail">
        <div class="page-body-cont">
            <h-button table @click="onLookRefuse" v-if="$route.query.documentStatus==4">打回记录</h-button>
            <div v-for="(item,index) in detail" :key="index">
                <div class="firstclass">{{item.firstCatagoryName}} </div>
                <div class="secondclass" v-for="(jtem,jndex) in item.respRiskCheckDocTemplateList" :key="jndex">
                    <div class="secondclass-title">
                        <span class="secondclass-start" v-if="jtem.mondatoryFlag==1">*</span>
                        <font class="secondclass-title_font">{{jtem.secondCatagoryName}}</font>
                        <span class="secondclass-reason" v-if="jtem.refuse">已打回，待分部补充</span>
                    </div>
                    <p class="secondclass-remark">备注：{{jtem.remark||'-'}}</p>
                    <div class="secondclass-documents">
                        <p class="secondclass-documents_title">样例：<span v-if="!jtem.riskCheckDocTemplateSamplePos">-</span></p>
                        <div class="secondclass-documents_case" v-if="jtem.riskCheckDocTemplateSamplePos">
                            <div class="secondclass-documents_case_box" v-for="(example,exampleIndex) in jtem.riskCheckDocTemplateSamplePos" :key="exampleIndex">
                                <el-image v-if="example.fileUrl" style="width: 100px; height: 100px" :src.sync="DefaultImage" v-oss-sts-element-image="{item: example, key: 'fileUrl'}" :preview-src-list="srcList(jtem,exampleIndex)" />
                            </div>
                        </div>
                        <!--  -->
                        <p class="secondclass-documents_title">规定格式：{{jtem.formatName||"-"}}</p>
                        <template v-if="jtem.creditDocuments&&jtem.creditDocuments.length>=0">
                            <div class="secondclass-documents_case_documents" v-for="(ktem,kndex) in jtem.creditDocuments" :key="kndex">
                                <p>
                                    <span class="posrtv">
                                        <template v-if="ktem&&ktem.fileUrl">
                                            <i class="el-icon-document"></i>
                                            <a  class="oss-sts-download" v-oss-sts-a-download="ktem.fileUrl" key="1" target="_blank">
                                                <font>{{ktem.fileName}}</font>
                                            </a>
                                        </template>
                                    </span>
                                </p>
                                <p style="flex:0.5">{{formatMoment(ktem.createTime)}}</p>
                                <p>
                                    <font class="fileItemDownLoad" @click="()=>{onDelete(jtem,kndex)}" v-if="$route.query.docAfterStatus!=2">删除</font>
                                    <font class="fileItemDownLoad" v-if="ktem.fileName.toLowerCase().indexOf('.png') != -1||ktem.fileName.toLowerCase().indexOf('.jpg') != -1||ktem.fileName.toLowerCase().indexOf('.jpeg') != -1"  v-oss-sts-a-download="ktem.fileUrl">下载</font>
                                    <font v-else><a class='fileItemDownLoad oss-sts-download' v-oss-sts-a-download="ktem.fileUrl" target='_blank'>下载</a></font>
                                </p>
                            </div>
                        </template>
                        <p v-else>-</p>
                    </div>
                    <div class="secondclass-documents_upload" v-if="$route.query.docAfterStatus!=2">
                        <OssFileHosjoyUpload :fileSize=20 :fileNum=100 :limit=100 v-model="jtem.creditDocuments" :showPreView=false :action='action' :uploadParameters='uploadParameters' @successCb='()=>{handleSuccessCb(jtem)}'>
                            <el-button type="primary" style="width:130px">上传</el-button>
                        </OssFileHosjoyUpload>
                    </div>
                </div>
            </div>
            <!-- bottom button -->
            <div class="bottom-button">
                <p>
                    <h-button style="width:130px;" @click="onBack">返回</h-button>
                </p>
                <p v-if="$route.query.docAfterStatus!=2">
                    <h-button type="primary" style="width:130px" @click="onSave" >保存</h-button>
                </p>
                <p v-if="$route.query.docAfterStatus!=2">
                    <h-button type="primary" style="width:130px" @click="onSubmit">提交</h-button>
                </p>
            </div>
        </div>
        <!--  -->
        <el-dialog title="补充原因" :visible.sync="dialogVisible" width="35%" center>
            <div class="dialog-box" v-for="item in refuseInfos" :key="item.id">
                <p>{{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}} 打回操作人：{{item.createBy}}</p>
                <p>待补充类目：{{item.secondCategoryNames}}</p>
                <p>待补充原因：</p>
                <p>
                    {{item.remark}}
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <h-button @click="dialogVisible = false">取 消</h-button>
                <h-button type="primary" @click="dialogVisible = false">确 定</h-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as auths from '@/utils/auth_const'
import { mapState, mapGetters, mapActions } from 'vuex'
import { ccpBaseUrl } from '@/api/config'
import { handleImgDownload } from './utils'
import { submitDoc, getCreditdocumentType, submitcreditDoc } from './api/index'
import DefaultImage from '@/assets/images/img_403@2x.png'

import moment from 'moment'
import OssFileUtils from '@/utils/OssFileUtils'
const _reqRiskCheckProjectDoc = {
    projectId: '', // 工程项目id
    riskCheckProjectDocPoList: [],
    submitStatus: ''// 提交状态 1：提交 2：材料审核通过 3：立项结果提交 4：终审结果提交
}
export default {
    name: 'creditDetail',
    components: {
        OssFileHosjoyUpload: () => import('@/components/OssFileHosjoyUpload/OssFileHosjoyUpload')
    },
    data () {
        return {
            auths,
            moment,
            detail: '',
            tempDetail: '',
            handleImgDownload,
            dialogVisible: false,
            action: ccpBaseUrl + 'common/files/upload-old',
            // 上传时附带的额外参数同el-upload 的 data
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            reqRiskCheckProjectDoc: JSON.parse(JSON.stringify(_reqRiskCheckProjectDoc)),
            mondatoryFlagRes: [],
            refuseInfos: [],
            creditFrom: {},
            DefaultImage: DefaultImage
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            listDetail: 'projectInformation/listDetail',
            creditRecords: 'creditManage/creditRecords'
        })
    },
    methods: {
        ...mapActions({
            findCreditRecords: 'creditManage/findCreditRecords'
        }),
        srcList (item, index) {
            if (item.riskCheckDocTemplateSamplePos) {
                const res = item.riskCheckDocTemplateSamplePos.filter((item, index) => {
                    const key = encodeURI(new URL(item.fileUrl).pathname).replace(/\W/g, '') + index
                    OssFileUtils.Event.listen(async function (item) {
                        item.fileUrl = await OssFileUtils.getUrl(item.fileUrl)
                    }, key, item)
                    return item
                })
                console.log(res)
                return res.length > 0 && [res[index].fileUrl]
            }
            return []
        },
        formatMoment (val) {
            if (!val) return ''
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        },
        handleSuccessCb (row) {
            console.log(row)
            row.creditDocuments.map(item => {
                item.templateId = row.templateId
                item.createTime = item.createTime || moment().format('YYYY-MM-DD HH:mm:ss')
            })
            console.log('this.detail11111', this.detail)
        },
        onDelete (item, index) {
            this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                item.creditDocuments.splice(index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                // do nothing
            })
        },
        onBack () {
            if (JSON.stringify(this.tempDetail) === JSON.stringify(this.detail)) {
                this.$router.go(-1)
                return
            }
            // 资料状态 1：待提交 2：已提交 4：审核驳回
            if (this.$route.query.docAfterStatus != 2) {
                this.$confirm('如信息发生修改，退出后信息将不会保存', '确认退出', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.go(-1)
                }).catch(() => {
                    // do nothing
                })
            } else {
                this.$router.go(-1)
            }
        },
        async getDetail () {
            let query = {
                type: 2, // 1:BOSS端查看详情或查看资料 2：小程序端查看详情或BOSS上传资料
                companyId: this.$route.query.companyId
            }
            const { data } = await getCreditdocumentType(query)
            this.detail = data
            this.detail.map(item => {
                item.respRiskCheckDocTemplateList.map(jtem => {
                    if (!jtem.creditDocuments) {
                        jtem.creditDocuments = []
                    }
                })
            })
            console.log('this.detail: ', this.detail)
            // 筛选出需要必填
            this.detail.map(item => {
                item.respRiskCheckDocTemplateList.map(jtem => {
                    if (jtem.mondatoryFlag == 1) {
                        this.mondatoryFlagRes.push(jtem)
                    }
                })
            })
            this.tempDetail = JSON.parse(JSON.stringify(this.detail))
        },
        // 处理保存、提交资料入参
        dealReqRiskCheckProjectDoc (submitStatus = '') {
            const creditDocumentList = []
            console.log('this.detail', this.detail)
            this.detail.map(item => {
                if (item.respRiskCheckDocTemplateList && item.respRiskCheckDocTemplateList.length > 0) {
                    item.respRiskCheckDocTemplateList.map(jtem => {
                        jtem && jtem.creditDocuments && jtem.creditDocuments.length > 0 && jtem.creditDocuments.map(ktem => {
                            creditDocumentList.push({
                                templateId: ktem.templateId,
                                fileName: ktem.fileName,
                                fileUrl: ktem.fileUrl,
                                createTime: ktem.createTime ? ktem.createTime : null,
                                createBy: ktem.createBy ? ktem.createBy : this.userInfo.employeeName
                            })
                        })
                    })
                }
            })
            this.creditFrom = {
                companyId: this.$route.query.companyId,
                creditDocumentList: creditDocumentList
            }
        },
        checkForm (cb) {
            let res = ''
            for (let i = 0; i < this.mondatoryFlagRes.length; i++) {
                const arr = this.creditFrom.creditDocumentList.filter(jtem => {
                    return jtem.templateId == this.mondatoryFlagRes[i].templateId
                })
                if (arr.length == 0) {
                    res = this.mondatoryFlagRes[i]
                    break
                }
            }
            return res
        },
        async onSave () {
            this.dealReqRiskCheckProjectDoc()
            // this.reqRiskCheckProjectDoc.templateId = submitStatus// 提交状态 1：提交 2：材料审核通过 3：立项结果提交 4：终审结果提交
            await submitcreditDoc(this.creditFrom)
            this.$message.success('保存成功')
            // this.reqRiskCheckProjectDoc = JSON.parse(JSON.stringify(_reqRiskCheckProjectDoc))
            this.$router.go(-1)
        },
        async onSubmit () {
            this.dealReqRiskCheckProjectDoc()
            let res = this.checkForm()
            if (res) {
                this.$message.error(`一级类目：${res.firstCatagoryName}，二级类目：${res.secondCatagoryName}，${res.formatName}必填！`)
            } else {
                this.dealReqRiskCheckProjectDoc()
                // this.reqRiskCheckProjectDoc.templateId = submitStatus// 提交状态 1：提交 2：材料审核通过 3：立项结果提交 4：终审结果提交
                await submitcreditDoc(this.creditFrom)
                await submitDoc({ companyId: this.$route.query.companyId, submitStatus: 1 })
                this.$message.success('提交成功')
                this.reqRiskCheckProjectDoc = JSON.parse(JSON.stringify(_reqRiskCheckProjectDoc))
                this.$router.go(-1)
            }
        },
        async onLookRefuse (val) {
            this.dialogVisible = true
            await this.findCreditRecords(this.$route.query.companyId)
            this.refuseInfos = this.creditRecords
        }
    },
    mounted () {
        this.uploadParameters.updateUid = this.userInfo.employeeName
        this.getDetail()
    }
}
</script>

<style lang="scss" scoped>
.firstclass {
    font-size: 23px;
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
    &-reason {
        background: #ff0000;
        color: #ffff;
        margin-left: 20px;
        border-radius: 10px;
        padding: 0 10px;
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
.oss-sts-download {
    cursor: pointer;
}
</style>
