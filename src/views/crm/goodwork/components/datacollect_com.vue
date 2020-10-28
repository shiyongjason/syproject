<template>
    <div class="collect-wrap">
        <div class="fullbg" v-if="showPacking">
            <div class="fullbg-img">
                <img src="https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20201027/01791ef9-5a1f-4e26-8b52-d6ab69548e3b.png" width="100px">
                <p>
                    <i class="el-icon-loading" style="font-size:23px;margin-right:3px"></i>
                    <font>文件打包中，请耐心等待，请勿关闭页面...</font>
                </p>
            </div>
        </div>
        <el-form :model="colForm" :rules="colFormrules" ref="colForm" label-width="" class="demo-ruleForm">
            <div class="collect-wrap_btnflex">
                <p>
                    <h-button table @click="onGetrefuse">打回记录</h-button>
                </p>
                <template v-if="hosAuthCheck(Auths.CRM_ZL_DOWN)">
                    <p>
                        <h-button table @click="onDownzip" v-if="showPacking==null">一键下载</h-button>
                        <span v-if="showPacking!=null&&showPacking">文件打包中，请稍等</span>
                        <span v-if="showPacking!=null&&!showPacking">打包完成</span>
                    </p>
                </template>
            </div>
            <div class="collect-wrapbox" v-for="item in colForm.projectDocList" :key="item.firstCatagoryId">
                <div class="collect-title">{{item.firstCatagoryName}}</div>
                <template v-for="obj in item.respRiskCheckDocTemplateList">
                    <el-form-item label="" prop="type" :key="'item'+obj.templateId">
                        <div class="collect-box">
                            <div class="collect-boxflex">
                                <div v-if="activeName=='2'&&status==12">
                                    <el-checkbox label="" name="type" size="medium" v-model="obj.callback" :disabled=obj.refuse></el-checkbox>
                                </div>
                                <div class="collect-boxtxt">
                                    <h3><i v-if="obj.mondatoryFlag">*</i>{{obj.secondCatagoryName}}<span class="collect-call" v-if="obj.refuse">已打回，待分部补充</span></h3>
                                    <p>备注：{{obj.remark?obj.remark:'-'}}</p>
                                    <p>规定格式：{{obj.formatName}}</p>
                                </div>
                            </div>
                            <div class="upload-file_list" v-for="(item,index) in obj.riskCheckProjectDocPos" :key="index">
                                <div>
                                    <span class="posrtv">
                                        <template v-if="item&&item.fileUrl">
                                            <i class="el-icon-document"></i>
                                            <a :href="item.fileUrl" target="_blank">
                                                <font>{{item.fileName}}</font>
                                            </a>
                                        </template>
                                    </span>
                                </div>
                                <div> {{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                                <div>
                                    <!-- <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(item.fileUrl, item.fileName)">下载</font> -->
                                    <a class="fileItemDownLoad" :href="item.fileUrl+'?response-content-type=application/octet-stream'" :download="item.fileName"
                                        v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1">
                                        下载
                                    </a>
                                    <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                                </div>

                            </div>
                            <hosjoyUpload v-model="obj.riskCheckProjectDocPos" :showPreView=false :fileSize=20 :fileNum=100 :limit=100 :action='action' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb(obj)}" @successArg="(val)=>{handleSuccessArg(val)}"
                                style="margin:10px 0 0 5px">
                                <el-button type="primary">上 传</el-button>
                            </hosjoyUpload>
                        </div>

                    </el-form-item>
                </template>
            </div>
        </el-form>
        <el-dialog title="打回记录" :visible.sync="recordsVisible" width="30%" :before-close="()=>recordsVisible = false" :modal=false>
            <div class="project-record">
                <template v-if="refuseRecord.length>0">
                    <el-timeline>
                        <el-timeline-item :timestamp="moment(item.createTime).format('YYYY-MM-DD  HH:mm:ss')+' 打回操作人：'+item.createBy" placement="top" v-for="item in refuseRecord" :key=item.id>
                            <el-card>
                                <p>待补充类目:{{item.secondCategoryNames}}</p>
                                <p>待补充原因：{{item.remark}}</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </template>
                <template v-else>
                    <p>暂无记录</p>
                </template>
            </div>
            <span slot="footer" class="dialog-footer">
                <h-button @click="recordsVisible = false">取消</h-button>
            </span>
        </el-dialog>
        <el-dialog title="打回原因" :visible.sync="reasonVisible" width="30%" :before-close="onCloseCol" :modal=false>
            <el-form ref="refuseForm" :model="refuseForm" :rules="refuseFormRules" label-width="100px" style="margin-top:20px">
                <el-form-item label="打回原因：" prop="remark">
                    <el-input type="textarea" v-model.trim="refuseForm.remark" maxlength="500" :rows="5" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseCol">取消</el-button>
                <el-button type="primary" @click="onRefuse" :loading=loading>{{loading?'确定':'保存'}}</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="collectTitle" :visible.sync="collectVisible" width="30%" :before-close="onCloseCol" :modal=false :close-on-click-modal=false>
            <el-form ref="approveForm" :model="coldataForm" :rules="collectRules" label-width="100px" style="margin-top:20px">
                <el-form-item label="审核结果：" prop="submitStatus">
                    <el-radio-group v-model="coldataForm.submitStatus">
                        <el-radio :label=2>通过</el-radio>
                        <el-radio :label=3>不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="审核意见：" prop="remark">
                    <el-input type="textarea" v-model.trim="coldataForm.remark" maxlength="500" :rows="5" show-word-limit></el-input>
                </el-form-item>
                <template v-if="coldataForm.submitStatus == 2">
                    <div class="subTitle">项目评级</div>
                    <div class="horizontalLayout">
                        <el-form-item label="项目级别：">
                            <el-select v-model="coldataForm.levels" placeholder="请选择项目级别">
                                <el-option label="A+" value="A+"></el-option>
                                <el-option label="A" value="A"></el-option>
                                <el-option label="B+" value="B+"></el-option>
                                <el-option label="B" value="B"></el-option>
                                <el-option label="C+" value="C+"></el-option>
                                <el-option label="C" value="C"></el-option>
                            </el-select>
                        </el-form-item>
                        <div class="special">
                            <el-form-item label="项目服务费：" prop="serviceCharge">
                                <el-input v-model="coldataForm.serviceCharge"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </template>
                <div class="subTitle">经销商评级
                    <span v-if="projectLevels.expired">（评级已过期）</span>
                    <span v-else-if="!projectLevels.companyCreditLevel">（待评级）</span>
                    <span v-else>
                        （信用有效期：
                        {{ projectLevels.startTime ? moment(projectLevels.startTime).format('YYYY-MM-DD') : '-'}}
                        至
                        {{ projectLevels.endTime ? moment(projectLevels.endTime).format('YYYY-MM-DD') : '-'}}
                        ）
                    </span>
                </div>
                <div class="horizontalLayout">
                    <!-- 评级过期不显示 -->
                    <template v-if="projectLevels.expired"></template>
                    <template v-else>
                        <template v-if="projectLevels.companyCreditLevel">
                            <el-form-item label="经销商级别：">
                                <el-input placeholder="请输入内容" :value="projectLevels.companyCreditLevel || '-'" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="企业服务费：">
                                <el-input placeholder="请输入内容" :value="projectLevels.companyServiceCharge || ''" :disabled="true"></el-input>
                            </el-form-item>
                        </template>
                        <el-form-item label="资料状态：">
                            <el-input placeholder="请输入内容" :value="getcompanyServiceCharge(projectLevels.companyDocumentStatus)" :disabled="true"></el-input>
                        </el-form-item>
                    </template>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="onCloseCol">取消</h-button>
                <h-button type="primary" @click="onUpdatecolApprove">确定</h-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import * as Auths from '@/utils/auth_const'
import moment from 'moment'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { refuseDoc, submitProjectdoc, checkTemplatedoc, getProjectLevels, setProjectLevels } from '../api/index'
import { mapState, mapGetters, mapActions } from 'vuex'
import { handleImgDownload } from '../../projectInformation/utils'
import { interfaceUrl } from '@/api/config'
export default {
    name: 'datacollectcom',
    props: {
        colForm: {
            type: Object,
            default: () => { }
        },
        activeName: {
            type: String,
            default: ''
        },
        status: {
            type: Number,
            default: 0
        },
        showPacking: {
            default: null
        }
    },
    data () {
        return {
            // 经销商信息
            projectLevels: {},
            Auths,
            handleImgDownload,
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            moment,
            colFormrules: {},
            recordsVisible: false,
            reasonVisible: false,
            refuseRecord: [],
            refuseForm: {
                createBy: '',
                projectId: '',
                remark: '',
                status: 1,
                templateIds: '',
                createMobile: ''
            },
            refuseFormRules: {
                remark: [
                    { required: true, message: '请输入打回原因', trigger: 'blur' }
                ]
            },
            loading: false,
            collectVisible: false,
            collectTitle: '',
            collectRules: {
                remark: [
                    { required: true, message: '请输入意见', trigger: 'blur' }
                ],
                submitStatus: [
                    { required: true, message: '请选择审核结果', trigger: 'blur' }
                ],
                serviceCharge: [
                    {
                        validator: (r, v, callback) => {
                            const reg = /^\d+(\.\d{1})?$/
                            const abs = Math.abs(v)
                            if (isNaN(abs)) {
                                callback(new Error('请输入数字值'))
                            } else if (!reg.test(abs)) {
                                callback(new Error('请输入数字'))
                            } else if (abs > 10) {
                                callback(new Error('请输入-10到10的数字'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            },
            coldataForm: {
                remark: '',
                submitStatus: 2,
                // 项目评级
                serviceCharge: '',
                levels: ''
            },
            isDownLoad: false
        }
    },
    components: {
        hosjoyUpload
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            refusedata: 'crmmanage/refusedata'
        })
    },
    methods: {
        ...mapActions({
            findRefuseData: 'crmmanage/findRefuseData'
        }),
        getcompanyServiceCharge (val) {
            if (val == 1 || !val) {
                return '未提交'
            }
            if (val == 2) {
                return '已提交'
            }
            if (val == 3) {
                return '已通过'
            }
            if (val == 4) {
                return '已打回'
            }
            return '-'
        },
        async onShowcollect () {
            // 获取经销商信息
            const { data } = await getProjectLevels(this.colForm.projectId)
            console.log('data: ', data)
            this.projectLevels = data
            this.collectVisible = true
            this.collectTitle = '材料审核'
            this.coldataForm.levels = data.levels
            this.coldataForm.serviceCharge = data.serviceCharge
        },
        onDownzip () {
            this.isDownLoad = true
            this.$emit('onBackDownzip')
        },
        onCallback () {
            const newTempid = []
            const newList = this.colForm.projectDocList
            newList && newList.map(val => {
                val.respRiskCheckDocTemplateList.map(item => {
                    if (item.callback) newTempid.push(item.templateId)
                })
            })
            this.refuseForm.templateIds = newTempid.toString()
            if (newTempid.length > 0) {
                this.reasonVisible = true
            } else {
                this.$message.warning('请选择打回的选项')
            }
        },
        onRefuse () {
            this.loading = true
            this.refuseForm.createBy = this.userInfo.employeeName
            this.refuseForm.createMobile = this.userInfo.phoneNumber
            this.refuseForm.projectId = this.colForm.projectId
            this.$refs.refuseForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await refuseDoc(this.refuseForm)
                        this.$message.success('打回成功')
                        this.reasonVisible = false
                        this.loading = false
                        this.$emit('onCompsback')
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        },
        async onUpdatecolApprove () {
            const projectDocList = this.colForm.projectDocList
            let riskCheckProjectDocPoList = []
            const params = {}
            projectDocList && projectDocList.map(val => {
                val.respRiskCheckDocTemplateList.map(obj => {
                    if (obj.mondatoryFlag) { riskCheckProjectDocPoList = riskCheckProjectDocPoList.concat(obj.riskCheckProjectDocPos) }
                })
            })
            params.bizType = 1
            params.projectId = this.colForm.projectId
            params.riskCheckProjectDocPoList = riskCheckProjectDocPoList
            params.submitStatus = this.coldataForm.submitStatus
            params.remark = this.coldataForm.remark
            this.$refs.approveForm.validate(async (valid) => {
                if (valid) {
                    try {
                        if (!this.coldataForm.levels === !this.coldataForm.serviceCharge) {
                            const setParams = {
                                serviceCharge: this.serviceCharge,
                                levels: this.levels,
                                id: this.colForm.projectId,
                                updateBy: this.userInfo.employeeName
                            }
                            // 设置项目评级
                            await setProjectLevels(setParams)
                        }
                        // 审核
                        await submitProjectdoc(params)
                        this.$message({
                            message: `材料审核成功`,
                            type: 'success'
                        })
                        this.collectVisible = false
                        this.$emit('onCompsback')
                    } catch (error) {

                    }
                }
            })
        },
        async onGetrefuse () {
            await this.findRefuseData(this.colForm.projectId)
            this.refuseRecord = this.refusedata
            this.recordsVisible = true
        },
        onCloseCol () {
            this.coldataForm.remark = ''
            this.collectVisible = false
            this.refuseForm.remark = ''
            this.reasonVisible = false
        },
        handleSuccessCb (row) {
            console.log('row', row)
            row.riskCheckProjectDocPos.map(item => {
                item.templateId = row.templateId
                item.createTime = item.createTime || moment().format('YYYY-MM-DD HH:mm:ss')
                item.projectId = this.colForm.projectId
            })
        },
        handleSuccessArg (val) {
            checkTemplatedoc({ projectTemplateDocList: [val] })
        }
    }
}
</script>
<style lang="scss" scoped>
.fullbg{
    background-color: #211f1f;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0.5;
    position: fixed;
    top: 0;
    z-index: 9999;
    .fullbg-img{
        width: 377px;
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        p{
            color: #fff;
            font-size: 18px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
/deep/.el-form {
    padding: 0;
}
/deep/.el-form-item__content {
    line-height: 24px;
}
.collect-wrap {
    padding: 0 10px 100px 10px;
    margin-left: 15px;
    &_btnflex {
        width: 140px;
        text-align: right;
        margin: 0 10px;
        display: flex;
        justify-content: flex-end;
        position: fixed;
        top: 130px;
        right: 0;
        z-index: 11;
        background: #fff;
        flex-direction: column;
        p {
            margin-bottom: 10px;
        }
        span {
            color: #ff7a45;
            font-size: 14px;
            margin-left: 10px;
        }
    }
}
.collect-wrapbox {
    margin-top: 80px;
}
.collect-title {
    font-size: 20px;
    border-bottom: 1px solid #e5e5e5;
    padding: 20px 0;
    font-weight: bold;
}
.collect-box {
    display: flex;
    flex-direction: column;
    .el-checkbox {
        margin-right: 10px;
    }
}
.collect-boxflex {
    display: flex;
    flex-direction: row;
    padding: 30px 0 0 0;
}
.collect-boxtxt {
    h3 {
        font-size: 16px;
        margin: 0;
    }
    i {
        color: #ff0000;
        vertical-align: middle;
        padding: 0 2 0 0px;
        font-style: normal;
    }
    p {
        font-size: 14px;
        margin: 0;
        padding: 16px 0 0 0;
        line-height: auto;
    }
}
.collect-call {
    background: #ff7a45;
    color: #fff;
    font-size: 12px;
    border-radius: 6px;
    margin-left: 10px;
    padding: 2px 8px;
}
.upload-file_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 0 0;
    div {
        &:first-child {
            display: flex;
            flex: 5;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
            white-space: nowrap;
        }
        &:nth-child(2) {
            display: flex;
            flex: 2;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
            white-space: nowrap;
        }
        &:nth-child(3) {
            word-break: keep-all;
        }
    }
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
    display: flex;
    align-items: center;

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
.project-record {
    margin-top: 15px;
}

/deep/.el-card__body {
    padding: 5px;
    p {
        line-height: 30px;
    }
}
/deep/ .special .el-input {
    width: 180px;
    margin-left: 0 !important;
}
.subTitle {
    margin: 20px 0;
    font-weight: 700;
    font-size: 15px;
}
.horizontalLayout {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .el-form-item {
        width: 50%;
    }
}
/deep/ .is-error {
    width: 100% !important;
}
</style>