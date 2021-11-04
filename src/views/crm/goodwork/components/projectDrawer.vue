<template>
    <div class="project-wrap">
        <h-drawer title="项目详情" v-if="drawer" :visible.sync="drawer" :beforeClose="handleClose" direction='rtl' size='710px' :wrapperClosable="false">
            <template #connect>
                <div class="fiextab">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <template v-for="item in tabs">
                            <template v-if='isShowTab(item.key,status)'>
                                <el-tab-pane :label=item.value :name=item.key :key=item.key v-if="form.docAfterStatus!=1"></el-tab-pane>
                            </template>
                        </template>
                    </el-tabs>
                </div>
                <projectCom ref="projectCom" :projectForm=form @onBackLoad=onBackLoad @onCompsback=onCompsback v-if="activeName==='1'"></projectCom>
                <datacolCom ref="datacolCom" :colForm=colForm :activeName=activeName :status=status @onBackLoad=onBackLoad @onCompsback=onCompsback @onBackDownzip=onDownZip v-if="activeName==='2'" :showPacking='showPacking'></datacolCom>
                <approveCom ref="approveCom" :approveForm=colForm :activeName=activeName :status=status @onBackLoad=onBackLoad @onCompsback=onCompsback @onBackDownzip=onDownZip v-if="activeName==='3'" :showPacking='showPacking'></approveCom>
                <!-- <approveCom ref="finalCom" :projectForm=form :approveForm=colForm :activeName=activeName :status=status @onBackLoad=onBackLoad @onCompsback=onCompsback @onBackDownzip=onDownZip @refreshDetail="refreshFinalDetail" v-if="activeName==='4'" :showPacking='showPacking'></approveCom> -->
                <finalApproval ref="finalApproval" v-if="activeName==='4'" @onCompsback=onCompsback @onBackLoad=onBackLoad @onHideFoot=onHideFoot :finalFormID=projectId></finalApproval>
                <ProjectOrderTab v-if="activeName==='5'" @onBackLoad=onBackLoad @onCompsback=onCompsback  :id="projectId"></ProjectOrderTab>

                <el-dialog :title="aduitTitle" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false" :modal=false :close-on-click-modal=false>
                    <el-form ref="statusForm" :model="statusForm" :rules="statusRules" label-width="100px">
                        <el-form-item :label="aduitTitle+'结果：'" prop="result" v-if="aduitTitle=='审核' && status !== 3">
                            <el-radio-group v-model="statusForm.result">
                                <el-radio :label=1>通过</el-radio>
                                <el-radio :label=0>不通过</el-radio>
                                <el-radio :label=2>退回</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="重置为：" prop="afterStatus" v-if="aduitTitle=='重置状态' && status !== 3">
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
                        <h-button type="primary" @click="onUpdateAudit">{{status === 3? '确定关闭' : '确定'}}</h-button>
                    </span>
                </el-dialog>
            </template>
            <template #btn>
                <div class="drawer-button" v-if="isShowFoot">
                    <template v-if="activeName==='4'&&status == 11">
                        <h-button @click="onFinalApprove(1)" v-if="hosAuthCheck(newAuth.CRM_WORK_FINAL_NOPASS)&&(resolutionStatus==3||resolutionStatus==1)">终审不通过</h-button>
                        <h-button type="primary" @click="onFinalApprove(2)" v-if="hosAuthCheck(newAuth.CRM_WORK_FINAL_PASS)&&(resolutionStatus==3||resolutionStatus==1)">发起评审决议审批流</h-button>
                    </template>
                    <!-- 这里的权限有后台配置的  还有根据项目的状态  还有 tab切的权限 -->
                    <template v-if="hosAuthCheck(newAuth.CRM_GOODWORK_BACKUP)&&activeName==='2'&&status==12">
                        <h-button @click="onCallBack()">打回补充</h-button>
                    </template>
                    <template v-for="(item, index) in operateBtnList">
                        <h-button type="assist" @click="onAuditstatus(status)" :key="index" v-if="item.isShow">{{item.name}}</h-button>
                    </template>
                    <h-button @click="cancelForm">取消</h-button>
                    <h-button v-if="hosAuthCheck(newAuth.CRM_GOODWORK_BAOCUN)&&activeName!=='2'&&!(activeName=='3'&&status!=4)&&activeName!=='4'&&activeName!=='5'" type="primary" @click="onSaveproject(activeName)" :loading="loading">{{ loading ? '提交中 ...' : '保存' }}</h-button>
                </div>
            </template>
        </h-drawer>
    </div>
</template>
<script>
import projectCom from './project_com'
import datacolCom from './datacollect_com'
import approveCom from './approve_com'
import finalApproval from './finalApproval'
import ProjectOrderTab from './projectOrderTab'
import { mapState, mapActions, mapGetters } from 'vuex'
import * as newAuth from '@/utils/auth_const'
import { updateAudit, saveStatus, downLoadZip } from '../api/index'
import { NEW_STATUS_TYPE } from '../../const'

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
        projectCom, datacolCom, approveCom, ProjectOrderTab, finalApproval
    },
    data () {
        return {
            resolutionStatus: '',
            showPacking: null,
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
                customerRoleArr: [],
                projectUpload: [],
                loanPayTypeRate: '方法定义必填',
                payAcceptanceRemarkTxt: '承兑方法必填',
                upstreamPayTypearr: []
            },
            copyForm: {},
            projectId: '',
            colForm: {},
            bizType: '',
            isShowFoot: true
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
                // {
                //     name: '终审结果提交',
                //     isShow: this.hosAuthCheck(newAuth.CRM_GOODWORK_FINAL) && this.status == 11 && this.activeName === '4'
                // },
                {
                    name: '审核未通过',
                    isShow: this.hosAuthCheck(newAuth.CRM_GOODWORK_CLOSE) && this.status == 3
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
        handleClick (tab, event) {
            this.showPacking = null
            this.isDownLoad = false
            this.isDownLoads = false
            if (tab.index > 0) this.onFindRiskproject(tab.index)
        },
        refreshFinalDetail () {
            this.onFindRiskproject(3)
        },
        isShowTab (key, status) {
            // 由于新加了资料审核状态 status ==12
            // 骚操作 12=》3
            if (status == 12) {
                status = 3
            }
            // 采购单Tab  在5：审核未通过  13：终审通过的时候显示
            let arr = [5, 13, 14] // 采购单tab是否显示
            if (key == '5') {
                return arr.indexOf(status) > -1
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
        },
        async onFindProjectCom (val) {
            this.isShowFoot = true
            this.activeName = '1'
            // 调用初审详情
            this.projectId = val
            await this.findProjectDetail(val)
            this.form = { ...this.form, ...this.projectDetail }
            this.form.projectUpload = this.form.attachmentUrl ? JSON.parse(this.form.attachmentUrl) : []
            this.form.loanPayTypeRate = '方法定义必填'
            this.form.upstreamPayTypearr = this.form.upstreamPayType ? this.form.upstreamPayType.split(',') : []
            this.copyForm = { ...this.form }
        },
        onCallBack () {
            // 打回补充
            this.$refs.datacolCom.onCallback()
        },
        validFormInfo (list) {
            const respTemp = this.colForm.projectDocList[0].respRiskCheckDocTemplateList
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
                this.aduitTitle = '审核未通过'
                this.statusForm = { ...this.copyStatusForm }
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
                // status = !!status //  审核未通过显示 重置
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
                this.$emit('backEvent')
                // 终审详情保存
                // try {
                //     this.$refs.finalCom.onSaveapproveOrfinal(1)
                //     // this.$emit('backEvent')
                // } catch (error) {
                //     this.loading = false
                // }
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
        onBackLoad (val, res) {
            this.loading = val
            this.resolutionStatus = res || ''
        },
        onFinalApprove (val) {
            setTimeout(() => {
                this.$refs.finalApproval._finalApprove(val)
            }, 1000)
        },
        onHideFoot (val) {
            console.log(123)
            this.isShowFoot = val
        }

    }
}
</script>
<style  lang="scss" scoped>
::-webkit-scrollbar-thumb {
    background-color: #d6d1d1 !important;
}
/deep/.drawer__content {
    padding: 0 20px 0 15px;
    box-sizing: border-box;
}
/deep/.el-tabs__header {
    padding: 0 0 0 10px;
    margin: 0;
}
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
    width: 660px;
    z-index: 11;
    top: 66px;
}
.el-textarea /deep/.el-input__count {
    bottom: -45px;
}
</style>
