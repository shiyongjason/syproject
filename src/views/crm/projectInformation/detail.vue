<template>
    <div class="page-body" v-if="detail">
        <div class="page-body-cont">
            <div class="errormessage">
                <el-alert center title="资料待补充" v-if="$route.query.docAfterStatus==4" effect="dark" style="background: #ff0000;height:40px" :closable='false' />
                <el-alert v-if="$route.query.docAfterStatus==2" center title="资料审核中" effect="dark" style="background: #FF7A45;height:40px" :closable='false' />
            </div>
            <div v-for="(item,index) in detail.projectDocList" :key="index">
                <div class="firstclass">{{item.firstCatagoryName}}</div>
                <div class="secondclass" v-for="(jtem,jndex) in item.respRiskCheckDocTemplateList" :key="jndex">
                    <div class="secondclass-title">
                        <span class="secondclass-start" v-if="jtem.mondatoryFlag==1">*</span>
                        <font class="secondclass-title_font">{{jtem.secondCatagoryName}}</font>
                        <span class="secondclass-reason" v-if="jtem.refuse" @click="onLookRefuse(jtem.templateId)">待补充，点击查看原因</span>
                    </div>
                    <p class="secondclass-remark">备注：{{jtem.remark||'-'}}</p>
                    <div class="secondclass-documents">
                        <p class="secondclass-documents_title">样例：<span v-if="!jtem.riskCheckDocTemplateSamplePos">-</span></p>
                        <div class="secondclass-documents_case" v-if="jtem.riskCheckDocTemplateSamplePos">
                            <div class="secondclass-documents_case_box" v-for="(example,exampleIndex) in jtem.riskCheckDocTemplateSamplePos" :key="exampleIndex">
                                <el-image v-if="example.fileUrl" style="width: 100px; height: 100px" :src="example.fileUrl" :preview-src-list="srcList(jtem,exampleIndex)" />
                            </div>
                        </div>
                        <!--  -->
                        <p class="secondclass-documents_title">规定格式：{{jtem.formatName||"-"}}</p>
                        <template v-if="jtem.riskCheckProjectDocPos&&jtem.riskCheckProjectDocPos.length>=0">
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
                                <p style="flex:0.5">{{formatMoment(ktem.createTime)}}</p>
                                <p>
                                    <font class="fileItemDownLoad" @click="()=>{onDelete(jtem,kndex)}" v-if="$route.query.docAfterStatus!=2">删除</font>
                                    <font class="fileItemDownLoad" v-if="ktem.fileName.toLowerCase().indexOf('.png') != -1||ktem.fileName.toLowerCase().indexOf('.jpg') != -1||ktem.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(ktem.fileUrl, ktem.fileName)">下载</font>
                                    <font v-else><a class='fileItemDownLoad' :href="ktem.fileUrl" target='_blank'>下载</a></font>
                                </p>
                            </div>
                        </template>
                        <p v-else>-</p>
                    </div>
                    <div class="secondclass-documents_upload" v-if="$route.query.docAfterStatus!=2">
                        <hosjoyUpload :fileSize='20' :fileNum='100' v-model="jtem.riskCheckProjectDocPos" :showPreView=false :action='action' :uploadParameters='uploadParameters' @successCb='()=>{handleSuccessCb(jtem)}'>
                            <el-button type="primary" style="width:130px">上传</el-button>
                        </hosjoyUpload>
                    </div>
                </div>
            </div>
            <!-- bottom button -->
            <div class="bottom-button">
                <p>
                    <el-button style="width:130px;" @click="onBack">返回</el-button>
                </p>
                <p v-if="$route.query.docAfterStatus!=2">
                    <el-button type="primary" style="width:130px" @click="onSave">保存</el-button>
                </p>
                <p v-if="$route.query.docAfterStatus!=2">
                    <el-button type="primary" style="width:130px" @click="onSubmit">提交</el-button>
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
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { interfaceUrl } from '@/api/config'
import { handleImgDownload } from './utils'
import { saveDoc, submitDoc } from './api/index'
import moment from 'moment'
const _reqRiskCheckProjectDoc = {
    bizType: 1, // 业务类型 1：项目材料 2：立项材料 3：终审材料
    projectId: '', // 工程项目id
    riskCheckProjectDocPoList: [],
    submitStatus: ''// 提交状态 1：提交 2：材料审核通过 3：立项结果提交 4：终审结果提交
}
export default {
    name: 'detail',
    components: {
        hosjoyUpload: () => import('@/components/HosJoyUpload/HosJoyUpload')
    },
    data () {
        return {
            moment,
            detail: '',
            handleImgDownload,
            dialogVisible: false,
            action: interfaceUrl + 'tms/files/upload',
            // 上传时附带的额外参数同el-upload 的 data
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            reqRiskCheckProjectDoc: JSON.parse(JSON.stringify(_reqRiskCheckProjectDoc)),
            mondatoryFlagRes: [],
            refuseInfos: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            listDetail: 'projectInformation/listDetail',
            refuseInfo: 'projectInformation/refuseInfo'
        })
    },
    methods: {
        ...mapActions({
            findInformationEditDetail: 'projectInformation/findInformationEditDetail',
            findRefuseinfo: 'projectInformation/findRefuseinfo'
        }),
        srcList (item, index) {
            if (item.riskCheckDocTemplateSamplePos) {
                const res = item.riskCheckDocTemplateSamplePos.filter(item => {
                    return item.fileUrl
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
            row.riskCheckProjectDocPos.map(item => {
                item.templateId = row.templateId
                item.createTime = item.createTime || moment().format('YYYY-MM-DD HH:mm:ss')
            })
            console.log('this.detail', this.detail)
        },
        onDelete (item, index) {
            this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                item.riskCheckProjectDocPos.splice(index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                // do nothing
            })
        },
        onBack () {
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
                bizType: 1, // 业务类型 1：项目材料 2：立项材料 3：终审材料
                projectId: this.$route.query.projectId,
                status: this.$route.query.status// 工程状态
            }
            await this.findInformationEditDetail(query)
            this.detail = this.listDetail
            this.detail.projectDocList.map(item => {
                item.respRiskCheckDocTemplateList.map(jtem => {
                    if (!jtem.riskCheckProjectDocPos) {
                        jtem.riskCheckProjectDocPos = []
                    }
                })
            })
            console.log('this.detail: ', this.detail)
            // 筛选出需要必填
            this.detail.projectDocList.map(item => {
                item.respRiskCheckDocTemplateList.map(jtem => {
                    if (jtem.mondatoryFlag == 1) {
                        this.mondatoryFlagRes.push(jtem)
                    }
                })
            })
        },
        // 处理保存、提交资料入参
        dealReqRiskCheckProjectDoc (submitStatus = '') {
            this.reqRiskCheckProjectDoc.riskCheckProjectDocPoList = []
            console.log('this.detail', this.detail)
            this.detail.projectDocList.map(item => {
                if (item.respRiskCheckDocTemplateList && item.respRiskCheckDocTemplateList.length > 0) {
                    item.respRiskCheckDocTemplateList.map(jtem => {
                        jtem && jtem.riskCheckProjectDocPos && jtem.riskCheckProjectDocPos.length > 0 && jtem.riskCheckProjectDocPos.map(ktem => {
                            this.reqRiskCheckProjectDoc.riskCheckProjectDocPoList.push({
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
            this.reqRiskCheckProjectDoc.projectId = this.$route.query.projectId
            this.reqRiskCheckProjectDoc.submitStatus = submitStatus// 提交状态 1：提交 2：材料审核通过 3：立项结果提交 4：终审结果提交
        },
        checkForm (cb) {
            let res = ''
            for (let i = 0; i < this.mondatoryFlagRes.length; i++) {
                const arr = this.reqRiskCheckProjectDoc.riskCheckProjectDocPoList.filter(jtem => {
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
            await saveDoc(this.reqRiskCheckProjectDoc)
            this.$message.success('保存成功')
            this.reqRiskCheckProjectDoc = JSON.parse(JSON.stringify(_reqRiskCheckProjectDoc))
            this.$router.go(-1)
        },
        async onSubmit () {
            this.dealReqRiskCheckProjectDoc(1)
            let res = this.checkForm()
            if (res) {
                this.$message.error(`一级类目：${res.firstCatagoryName}，二级类目：${res.secondCatagoryName}，${res.formatName}必填！`)
            } else {
                await submitDoc(this.reqRiskCheckProjectDoc)
                this.$message.success('提交成功')
                this.reqRiskCheckProjectDoc = JSON.parse(JSON.stringify(_reqRiskCheckProjectDoc))
                this.$router.go(-1)
            }
        },
        async onLookRefuse (val) {
            this.dialogVisible = true
            await this.findRefuseinfo({ projectId: this.reqRiskCheckProjectDoc.projectId, templateId: val })
            this.refuseInfos = this.refuseInfo
        }
    },
    mounted () {
        this.uploadParameters.updateUid = this.userInfo.employeeName
        this.reqRiskCheckProjectDoc.projectId = this.$route.query.projectId
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
    &-reason{
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
</style>