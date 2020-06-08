<template>
    <div class="project-wrap">
        <el-drawer title="项目详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='40%' :before-close="handleClose" :wrapperClosable=false>
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                <template v-for="item in tabs">
                    <template v-if='item.key<status'>
                        <el-tab-pane :label=item.value :name=item.key :key=item.key v-if="form.docAfterStatus!=1"></el-tab-pane>
                    </template>
                </template>
            </el-tabs>
            <projectCom ref="projectCom" :projectForm=form @onBackLoad=onBackLoad @onCompsback=onCompsback v-if="activeName==='1'"></projectCom>
            <datacolCom ref="datacolCom" :colForm=colForm :activeName=activeName :status=status @onBackLoad=onBackLoad @onCompsback=onCompsback v-if="activeName==='2'"></datacolCom>
            <approveCom ref="approveCom" :approveForm=colForm :activeName=activeName :status=status @onBackLoad=onBackLoad @onCompsback=onCompsback v-if="activeName==='3'"></approveCom>
            <approveCom ref="finalCom" :approveForm=colForm :activeName=activeName :status=status @onBackLoad=onBackLoad @onCompsback=onCompsback v-if="activeName==='4'"></approveCom>
            <div class="drawer-footer">
                <div class="drawer-button">
                    <template v-if="activeName==='2'&&status==3">
                        <el-button @click="onCallBack()">打回补充</el-button>
                    </template>
                    <template v-if="hosAuthCheck(newAuth.CRM_GOODWORK_SHENPI)&&status==2">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>
                    <template v-if="status==3&&activeName==='2'&&form.docAfterStatus==2">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>
                    <template v-if="hosAuthCheck(newAuth.CRM_GOODWORK_XINSHEN)&&status==4&&activeName==='3'">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>
                    <template v-if="status==11&&activeName==='4'">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>
                    <template v-if="hosAuthCheck(newAuth.CRM_GOODWORK_QIANYUE)&&status==6">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>
                    <template v-if="hosAuthCheck(newAuth.CRM_GOODWORK_FANGKUAN)&&status==7">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>
                    <template v-if="hosAuthCheck(newAuth.CRM_GOODWORK_HUIKUAN)&&status==8">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>
                    <template v-if="hosAuthCheck(newAuth.CRM_GOODWORK_CHOINGZHI)">
                        <el-button type="warning" v-if="isShowRest(statusList[status-1])" @click="onReststatus(status)">重置状态</el-button>
                    </template>
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button v-if="hosAuthCheck(newAuth.CRM_GOODWORK_BAOCUN)&&activeName!=='2'&&!(activeName=='3'&&status!=4)&&!(activeName=='4'&&status!=11)" type="primary" @click="onSaveproject(activeName)" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</el-button>
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
                            <el-input type="textarea" v-model.trim="statusForm.remark" maxlength="200" :rows="5" show-word-limit></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="onUpdateAudit">确 定</el-button>
                    </span>
                </el-dialog>

            </div>
        </el-drawer>
    </div>
</template>
<script>
import projectCom from './project_com'
import datacolCom from './datacollect_com'
import approveCom from './approve_com'
import { mapState, mapActions, mapGetters } from 'vuex'
import * as newAuth from '@/utils/auth_const'
import { updateAudit, saveStatus } from '../api/index'
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
        projectCom, datacolCom, approveCom
    },
    data () {
        return {
            newAuth,
            loading: false,
            tabs: [{ key: '1', value: '初审' }, { key: '2', value: '项目资料清单' }, { key: '3', value: '立项' }, { key: '4', value: '终审' }],
            activeName: '1',
            statusList: [{ 1: '提交中' }, { 2: '审核' }, { 3: '材料审核通过' }, { 4: '立项结果提交' }, { 5: '合作关闭' }, { 6: '签约' }, { 7: '放款' },
                { 8: '全部回款' }, { 9: '合作完成' }, { 10: '信息待完善' }, { 11: '终审结果提交' }],
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
            colForm: {}

        }
    },
    computed: {
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
            if (tab.index > 0) this.onFindRiskproject(tab.index)
        },
        isShowRest (val) {
            const newVal = val && Object.keys(val)[0]
            if (newVal == 2) {
                return false
            } else {
                return true
            }
        },
        async onFindRiskproject (val) {
            // 材料收集tab
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
        },
        onCallBack () {
            // 打回补充
            this.$refs.datacolCom.onCallback()
        },
        async onAuditstatus (val) {
            let status = Object.keys(val)[0]
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
                // 材料审核通过 显示重置按钮 去调用材料审批流程 需要弹窗
                this.$refs.datacolCom.onShowcollect()
                return
            } else if (status == 4) {
                // status = !!status // H5端待立项 显示重置按钮和立项  这里需要弹窗  通过 不通过
                this.$refs.approveCom.onShowApprove(status)
                return
            } else if (status == 5) {
                // status = !!status //  合作关闭显示 重置
            } else if (status == 6) {
                status = 7 //  H5端 待签约   显示重置和签约按钮
            } else if (status == 7) {
                status = 8 //  H5端 待放款   显示重置和放款按钮
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
        onReststatus (val) {
            if (val == 5) {
                this.statusType = this.newstatusType
            } else if (val == 6 || val == 7 || val == 8) {
                this.statusType = this.newstatusType.slice(0, val - 2)
            } else if (val == 10) {
                this.statusType = this.newstatusType.slice(0, 1)
            } else if (val == 11) {
                this.statusType = this.newstatusType.slice(0, 3)
            } else {
                this.statusType = this.newstatusType.slice(0, val - 2)
            }
            this.statusForm = { ...this.copyStatusForm }
            this.$nextTick(() => {
                this.$refs['statusForm'].clearValidate()
            })
            this.statusForm.reset = true
            this.dialogVisible = true
            this.aduitTitle = '重置状态'
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
                    this.$emit('backEvent')
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
            this.$emit('backEvent')
        },
        onCompsback () {
            this.$emit('backEvent')
        },
        onBackLoad (val) {
            this.loading = val
        }
    }
}
</script>
<style  lang="scss" scoped>
.el-tabs--card {
    margin-left: 20px;
}
/deep/ .el-drawer__body {
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
</style>
