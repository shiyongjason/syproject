<template>
    <div class="project-wrap">

        <el-drawer title="项目详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='40%' :before-close="handleClose" :wrapperClosable=false>
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="fiextab">
                <template v-for="item in tabs">
                    <template v-if='isShowTab(item.key,status)'>
                        <el-tab-pane :label=item.value :name=item.key :key=item.key v-if="form.docAfterStatus!=1"></el-tab-pane>
                    </template>
                </template>
            </el-tabs>
            <projectCom ref="projectCom" :projectForm=form @onBackLoad=onBackLoad @onCompsback=onCompsback  v-if="activeName==='1'"></projectCom>
            <datacolCom ref="datacolCom" :colForm=colForm :activeName=activeName :status=status @onBackLoad=onBackLoad @onCompsback=onCompsback @onBackDownzip=onDownZip v-if="activeName==='2'" :showPacking='showPacking'></datacolCom>
            <approveCom ref="approveCom" :approveForm=colForm :activeName=activeName :status=status @onBackLoad=onBackLoad @onCompsback=onCompsback @onBackDownzip=onDownZip v-if="activeName==='3'" :showPacking='showPacking'></approveCom>
            <approveCom ref="finalCom" :approveForm=colForm :activeName=activeName :status=status @onBackLoad=onBackLoad @onCompsback=onCompsback @onBackDownzip=onDownZip v-if="activeName==='4'" :showPacking='showPacking'></approveCom>
            <div class="drawer-footer">
                <div class="drawer-button">
                    <!-- 这里的权限有后台配置的  还有根据项目的状态  还有 tab切的权限 -->
                    <template v-if="hosAuthCheck(newAuth.CRM_GOODWORK_BACKUP)&&activeName==='2'&&status==12">
                        <h-button @click="onCallBack()">打回补充</h-button>
                    </template>
                    <template v-for="(item, index) in operateBtnList">
                        <h-button type="assist" @click="onAuditstatus(status)" :key="index" v-if="item.isShow">{{item.name}}</h-button>
                    </template>
                    <h-button @click="cancelForm">取消</h-button>
                    <h-button v-if="hosAuthCheck(newAuth.CRM_GOODWORK_BAOCUN)&&activeName!=='2'&&!(activeName=='3'&&status!=4)&&!(activeName=='4'&&status!=11)" type="primary" @click="onSaveproject(activeName)" :loading="loading">{{ loading ? '提交中 ...' : '保存' }}</h-button>
                </div>
                <el-dialog :title="aduitTitle" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false" :modal=false :close-on-click-modal=false>
                    <el-form ref="statusForm" :model="statusForm" :rules="statusRules" label-width="100px">
                        <el-form-item :label="aduitTitle+'结果：'" prop="result" v-if="aduitTitle=='审核'">
                            <el-radio-group v-model="statusForm.result">
                                <el-radio :label=1>通过</el-radio>
                                <el-radio :label=0>不通过</el-radio>
                                <el-radio :label=2>退回</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="重置为：" prop="afterStatus" v-if="aduitTitle=='重置状态'">
                            <el-radio-group v-model="statusForm.afterStatus">
                                <el-radio :label=item.key v-for="item in statusType" :key="item.key">{{item.value}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="说明：" prop="remark">
                            <el-input type="textarea" placeholder="请输入说明" v-model.trim="statusForm.remark" maxlength="200" :rows="5" show-word-limit></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <h-button @click="dialogVisible = false">取消</h-button>
                        <h-button type="primary" @click="onUpdateAudit">确定</h-button>
                    </span>
                </el-dialog>
            </div>
        </el-drawer>
        <!-- 签约和放款使用弹窗 -->
        <el-dialog :title="signOrLoanVisibleTitle" :visible.sync="signOrLoanVisible" width="35%" :before-close="onColseSignOrLoan" :modal=false :close-on-click-modal=false>
            <el-form ref="signOrLoanDialog" :model="signOrLoanForm" :rules="signOrLoanRules" label-width="100px" class="el-dialog__form">
                <el-form-item label="审核结果：" prop="result">
                    <el-radio-group v-model="signOrLoanForm.result">
                        <el-radio :label=1>{{status==6?'确认签约':'确认放款'}}</el-radio>
                        <el-radio :label=0>合作关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="说明：" prop="remark">
                    <el-input type="textarea" placeholder="请输入说明" v-model.trim="signOrLoanForm.remark" maxlength="500" :rows="8" show-word-limit></el-input>
                </el-form-item>

                <div style="margin-top:5px">附件：</div>
                <hosjoyUpload v-model="signOrLoanForm.attachment" :fileSize=20 :fileNum=100 :limit=15 :action='action' :uploadParameters='uploadParameters' style="margin:0px 0 20px 5px">
                    <!-- <el-button type="primary">上 传</el-button> -->
                </hosjoyUpload>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="onColseSignOrLoan">取消</h-button>
                <h-button type="primary" @click="onSubmitSignOrLoan">确定</h-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import projectCom from './project_com'
import datacolCom from './datacollect_com'
import approveCom from './approve_com'
import { mapState, mapActions, mapGetters } from 'vuex'
import * as newAuth from '@/utils/auth_const'
import { updateAudit, saveStatus, signAudit, downLoadZip } from '../api/index'
import { NEW_STATUS_TYPE } from '../../const'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'

export default {
    name: 'projectdrawer',
    props: {
        drawer: {
            type: Boolean,
            default: false
        },
        status: {
            type: Number
        }
    },
    components: {
        projectCom, datacolCom, approveCom, hosjoyUpload
    },
    data () {
        return {
            showPacking: null,
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            signOrLoanForm: {
                'attachment': [], // 附件
                'createBy': '', // 创建人
                'createByMobile': '', // 审核人手机
                'projectId': '', // 项目工程id
                'remark': '', // 说明
                'result': ''// 审核结果 1：确认签约或确认放款 0：合作关闭
            },
            signOrLoanVisibleTitle: '',
            signOrLoanVisible: false,
            newAuth,
            loading: false,
            tabs: [
                { key: '1', value: '初审' },
                { key: '2', value: '项目资料清单' },
                { key: '3', value: '立项' },
                { key: '4', value: '终审' },
                { key: '5', value: '项目采购单' }
            ],
            activeName: '1',
            newstatusType: NEW_STATUS_TYPE,
            dialogVisible: false,
            aduitTitle: '',
            remark: '',
            statusForm: {
                afterStatus: '',
                createBy: '',
                createByMobile: '',
                projectId: '',
                remark: '',
                result: '',
                reset: ''
            },
            statusRules: {
                result: [
                    { required: true, message: '请选择审核状态', trigger: 'change' }],
                remark: [
                    { required: true, message: '请输入说明', trigger: 'blur' }
                ],
                afterStatus: [
                    { required: true, message: '请选择重置状态', trigger: 'blur' }
                ]
            },
            copyStatusForm: {},
            form: {
                projectUpload: [],
                loanPayTypeRate: '方法定义必填',
                payAcceptanceRemarkTxt: '承兑方法必填',
                upstreamPayTypearr: []
            },
            copyForm: {},
            projectId: '',
            colForm: {},
            signOrLoanRules: {
                result: [
                    { required: true, message: '请选择审核状态', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请输入说明', trigger: 'blur' }
                ]
            },
            bizType: ''

        }
    },
    computed: {
        operateBtnList () {
            return [
                { name: '审核', isShow: this.hosAuthCheck(newAuth.CRM_GOODWORK_SHENPI) && this.status == 2 },
                {
                    name: '材料审核',
                    isShow: this.hosAuthCheck(newAuth.CRM_GOODWORK_APPROVED) && this.status == 12 && this.activeName === '2' && this.form.docAfterStatus == 2
                },
                {
                    name: '立项结果提交',
                    isShow: this.hosAuthCheck(newAuth.CRM_GOODWORK_XINSHEN) && this.status == 4 && this.activeName === '3'
                },
                {
                    name: '终审结果提交',
                    isShow: this.hosAuthCheck(newAuth.CRM_GOODWORK_FINAL) && this.status == 11 && this.activeName === '4'
                },
                {
                    name: '签约',
                    isShow: this.hosAuthCheck(newAuth.CRM_GOODWORK_QIANYUE) && this.status == 6
                },
                {
                    name: '放款',
                    isShow: this.hosAuthCheck(newAuth.CRM_GOODWORK_FANGKUAN) && this.status == 7
                },
                {
                    name: '全部回款',
                    isShow: this.hosAuthCheck(newAuth.CRM_GOODWORK_HUIKUAN) && this.status == 8
                },
                {
                    name: '合作关闭',
                    // isShow: this.hosAuthCheck(newAuth.CRM_GOODWORK_CLOSE) && this.status == 3
                    // TODO: 测试
                    isShow: true
                }
            ]
        },
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            projectDetail: 'crmmanage/projectDetail',
            collectdata: 'crmmanage/collectdata'
        })
    },
    mounted () {
        this.copyStatusForm = { ...this.statusForm }
    },
    methods: {
        ...mapActions('crmmanage', {
            findProjectDetail: 'findProjectDetail',
            findRiskprojectdata: 'findRiskprojectdata'
        }),
        onSubmitSignOrLoan () {
            this.$refs.signOrLoanDialog.validate(async valid => {
                if (valid) {
                    this.signOrLoanForm.createBy = this.userInfo.employeeName
                    this.signOrLoanForm.createByMobile = this.userInfo.phoneNumber
                    this.signOrLoanForm.projectId = this.form.id
                    let query = { ...this.signOrLoanForm }
                    if (this.signOrLoanForm.attachment.length == 0) {
                        query.attachment = ''
                    } else {
                        query.attachment = JSON.stringify(this.signOrLoanForm.attachment)
                    }
                    await signAudit(query)
                    this.signOrLoanVisible = false
                    this.signOrLoanForm.attachment = []
                    this.signOrLoanForm.remark = ''
                    this.signOrLoanForm.result = ''
                    this.$refs['signOrLoanDialog'].clearValidate()
                    this.$emit('backEvent')
                }
            })
        },
        onColseSignOrLoan () {
            this.signOrLoanVisible = false
            this.signOrLoanForm.attachment = []
            this.signOrLoanForm.remark = ''
            this.signOrLoanForm.result = ''
            this.$refs['signOrLoanDialog'].clearValidate()
        },
        // 签约和放款使用弹窗
        onShowSignOrLoan () {
            console.log('onShowSignOrLoan', this.status)
            this.signOrLoanVisible = true
            this.signOrLoanVisibleTitle = this.status == 6 ? '签约' : '放款'
            this.$refs['signOrLoanDialog'].clearValidate()
        },
        handleClick (tab, event) {
            this.showPacking = null
            this.isDownLoad = false
            this.isDownLoads = false
            if (tab.index > 0) this.onFindRiskproject(tab.index)
        },
        isShowTab (key, status) {
            // 由于新加了资料审核状态 status ==12
            // 骚操作 12=》3
            if (status == 12) {
                status = 3
            }
            if (key < status) {
                return true
            }
        },
        async onFindRiskproject (val) {
            // 材料收集tab
            this.bizType = val
            await this.findRiskprojectdata({ bizType: val, projectId: this.projectId, status: this.form.status })
            this.colForm = { ...this.collectdata }
            this.colForm.projectDocList.map(item => {
                item.respRiskCheckDocTemplateList.map(jtem => {
                    if (!jtem.riskCheckProjectDocPos) {
                        jtem.riskCheckProjectDocPos = []
                    }
                })
            })
            console.log('this.colForm: ', this.colForm)
        },
        async onFindProjectCom (val) {
            this.activeName = '1'
            // 调用初审详情
            this.projectId = val
            await this.findProjectDetail(val)
            this.form = { ...this.form, ...this.projectDetail }
            this.form.projectUpload = this.form.attachmentUrl ? JSON.parse(this.form.attachmentUrl) : []
            this.form.loanPayTypeRate = '方法定义必填'
            this.form.upstreamPayTypearr = this.form.upstreamPayType ? this.form.upstreamPayType.split(',') : []
            this.copyForm = { ...this.form }
            console.log('this.form: ', this.form)
        },
        onCallBack () {
            // 打回补充
            this.$refs.datacolCom.onCallback()
        },
        validFormInfo (list) {
            const respTemp = this.colForm.projectDocList[0].respRiskCheckDocTemplateList
            console.log(list, respTemp)
            let res = ''
            for (let i = 0; i < respTemp.length; i++) {
                if (respTemp[i].mondatoryFlag == 1 && respTemp[i].riskCheckProjectDocPos.length == 0) {
                    res = respTemp[i]
                    break
                }
            }
            return res
        },
        async onAuditstatus (val) {
            let status = val
            let statusTxt = ''
            if (status == 2) {
                // status = !!status + 1 // H5端审核中 显示审核 这里需要弹窗  通过 不通过
                this.dialogVisible = true
                this.aduitTitle = '审核'
                this.statusForm = { ...this.copyStatusForm }
                this.statusForm.reset = false
                this.$nextTick(() => {
                    this.$refs['statusForm'].clearValidate()
                })
                return
            } else if (status == 3) {
                this.dialogVisible = true
                this.aduitTitle = '合作关闭'
                this.statusForm = {}
                // TODO: 这里待确认参数的意义
                this.statusForm.afterStatus = 5
                this.statusForm.reset = false
                this.$nextTick(() => {
                    this.$refs['statusForm'].clearValidate()
                })
                return
            } else if (status == 12) {
                // 材料审核通过 显示重置按钮 去调用材料审批流程 需要弹窗
                // 这里新加了材料审核通过所以要多判断一个字段
                this.$refs.datacolCom.onShowcollect()
                return
            } else if (status == 4) {
                const projectDocList = this.colForm.projectDocList
                let riskCheckProjectDocPoList = []
                let newriskCheckProjectDocPoList = []
                projectDocList && projectDocList.map(val => {
                    val.respRiskCheckDocTemplateList.map(obj => {
                        newriskCheckProjectDocPoList = newriskCheckProjectDocPoList.concat(obj.riskCheckProjectDocPos)
                        if (obj.mondatoryFlag) { riskCheckProjectDocPoList = riskCheckProjectDocPoList.concat(obj.riskCheckProjectDocPos) }
                    })
                })
                const params = {}
                params.bizType = this.status == 4 ? '2' : '3'
                params.projectId = this.colForm.projectId
                params.riskCheckProjectDocPoList = newriskCheckProjectDocPoList
                let res = this.validFormInfo(riskCheckProjectDocPoList)
                if (res) {
                    this.$message.error(`二级类目：${res.secondCatagoryName}，${res.formatName}必填！`)
                    this.$emit('onBackLoad', false)
                } else {
                    this.$refs.approveCom.onShowApprove(status)
                }
                // status = !!status // H5端待立项 显示重置按钮和立项  这里需要弹窗  通过 不通过
                return
            } else if (status == 5) {
                // status = !!status //  合作关闭显示 重置
            } else if (status == 6) {
                this.onShowSignOrLoan()
                return
                // status = 7 //  H5端 待签约   显示重置和签约按钮
            } else if (status == 7) {
                this.onShowSignOrLoan()
                return
            } else if (status == 8) {
                status = 9 //  H5端 贷种   显示重置和全部回款
            } else if (status == 9) {
                // status = !!status + 1 //  H5端 合作完成   显示重置
            } else if (status == 11) {
                // status = !!status + 1 //  H5端 合作完成   显示重置
                this.$refs.finalCom.onShowApprove(status)
                return
            }
            this.statusForm.reset = false
            await saveStatus(
                {
                    projectId: this.form.id,
                    status: status,
                    updateBy: this.userInfo.employeeName,
                    createByMobile: this.userInfo.phoneNumber
                })
            this.$message({
                message: `${statusTxt}成功`,
                type: 'success'
            })
            this.$emit('backEvent')
        },
        async onUpdateAudit (val) {
            const msg = this.aduitTitle
            this.statusForm.createBy = this.userInfo.employeeName
            this.statusForm.createByMobile = this.userInfo.phoneNumber
            this.statusForm.projectId = this.form.id
            this.$refs.statusForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await updateAudit(this.statusForm)
                        this.dialogVisible = false
                        this.$message({
                            message: `${msg}成功`,
                            type: 'success'
                        })
                        this.$emit('backEvent')
                    } catch (error) {

                    }
                }
            })
        },
        async onUpdatecolApprove () {
            // 材料审核通过
            this.$refs.datacolCom.onSaveColdata()
        },
        onSaveproject (val) {
            this.loading = true
            if (val == 1) {
                // 初审详情保存
                try {
                    this.$refs.projectCom.onSaveproject()
                    // this.$emit('backEvent')
                } catch (error) {
                    this.loading = false
                }
            } else if (val == 3) {
                // 立项详情保存
                try {
                    this.$refs.approveCom.onSaveapproveOrfinal(1)
                    // this.$emit('backEvent')
                } catch (error) {
                    this.loading = false
                }
            } else if (val == 4) {
                // 终审详情保存
                try {
                    this.$refs.finalCom.onSaveapproveOrfinal(1)
                    // this.$emit('backEvent')
                } catch (error) {
                    this.loading = false
                }
            }
        },
        cancelForm () {
            if (JSON.stringify(this.form) != JSON.stringify(this.copyForm)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗？', '是否确认取消修改？', {
                    confirmButtonText: '确认取消',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(async () => {
                    this.$emit('backEvent')
                })
            } else {
                this.$emit('backEvent')
            }
        },
        handleClose () {
            this.showPacking = null
            this.isDownLoad = false
            this.isDownLoads = false
            this.$emit('backEvent')
        },
        onCompsback () {
            this.$emit('backEvent')
        },
        async onDownZip () {
            this.showPacking = true
            const { data } = await downLoadZip({ projectId: this.projectId, status: this.status, bizType: this.bizType })
            console.log(data)
            this.showPacking = false
            window.location.href = data
        },
        onBackLoad (val) {
            this.loading = val
        }
    }
}
</script>
<style  lang="scss" scoped>
/deep/.el-dialog {
    min-width: 745px;
}
.el-tabs--card {
    margin-left: 20px;
}
/deep/ .el-drawer__body {
    overflow-y: scroll;
}
/deep/.el-dialog__form {
    height: 500px;
    overflow-y: scroll;
}
.project-wrap {
    position: relative;
}
.drawer-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 24px;
    border-top: 1px solid #e5e5ea;
    background: #fff;
    z-index: 1000;
    button {
        flex: 1;
    }
    .drawer-button {
        text-align: right;
    }
}
.dialogattachment {
    max-height: 300px;
}
.fiextab {
    position: fixed;
    background: #ffffff;
    width: 100%;
    z-index: 11;
}
</style>
