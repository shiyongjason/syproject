<template>
    <div class="project-wrap">
        <el-drawer title="项目详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='40%' :before-close="handleClose" :wrapperClosable=false>
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                <el-tab-pane :label=item.value :name=item.key v-for="item in tabs" :key=item.key></el-tab-pane>
            </el-tabs>
            <projectCom ref="projectCom" :projectForm=form @onBackLoad = onBackLoad v-if="activeName==='1'"></projectCom>
            <datacolCom ref="datacolCom" v-if="activeName==='2'"></datacolCom>
            <approveCom ref="approveCom" v-if="activeName==='3'"></approveCom>
            <div class="drawer-footer">
                <div class="drawer-button">
                    <template v-if="hosAuthCheck(crm_goodwork_shenpi)&&status==2">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                        <!-- <el-button type="warning" v-if="isShowRest(statusList[form.status-1])" @click="onReststatus(form.status)">重置状态2</el-button> -->
                    </template>
                    <!-- <template  v-if="hosAuthCheck(crm_goodwork_wanshan)&&form.status==10">
                        <el-button type="info"  @click="onAuditstatus(statusList[form.status-1])">信息待完善</el-button>
                    </template> -->
                    <template v-if="hosAuthCheck(crm_goodwork_xinshen)&&status==4">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>
                    <template v-if="hosAuthCheck(crm_goodwork_qianyue)&&status==6">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>
                    <template v-if="hosAuthCheck(crm_goodwork_fangkuan)&&status==7">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>
                    <template v-if="hosAuthCheck(crm_goodwork_huikuan)&&status==8">
                        <el-button type="info" @click="onAuditstatus(statusList[status-1])">{{status&&statusList[status-1][status]}}</el-button>
                    </template>

                    <template v-if="hosAuthCheck(crm_goodwork_chongzhi)">
                        <el-button type="warning" v-if="isShowRest(statusList[status-1])" @click="onReststatus(status)">重置状态</el-button>
                    </template>
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button v-if="hosAuthCheck(crm_goodwork_baocun)" type="primary" @click="onSaveproject()" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</el-button>
                </div>
            </div>
        </el-drawer>

    </div>
</template>
<script>
import projectCom from './project_com'
import datacolCom from './datacollect_com'
import approveCom from './approve_com'
import { mapActions, mapGetters } from 'vuex'
import * as newAuth from '@/utils/auth_const'
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
            loading: false,
            tabs: [{ key: '1', value: '初审' }, { key: '2', value: '项目资料清单' }, { key: '3', value: '立项' }, { key: '4', value: '终审' }],
            activeName: '1',
            crm_goodwork_shenpi: newAuth.CRM_GOODWORK_SHENPI,
            crm_goodwork_xinshen: newAuth.CRM_GOODWORK_XINSHEN, // 信审
            crm_goodwork_qianyue: newAuth.CRM_GOODWORK_QIANYUE, // 签约
            crm_goodwork_fangkuan: newAuth.CRM_GOODWORK_FANGKUAN, // 放款
            crm_goodwork_huikuan: newAuth.CRM_GOODWORK_HUIKUAN, // 回款
            crm_goodwork_baocun: newAuth.CRM_GOODWORK_BAOCUN, // 保存
            crm_goodwork_chongzhi: newAuth.CRM_GOODWORK_CHOINGZHI, // 重置
            crm_goodwork_wanshan: newAuth.CRM_GOODWORK_WANSHAN, // 重置
            statusList: [{ 1: '提交中' }, { 2: '审核' }, { 3: '资料收集中' }, { 4: '信审' }, { 5: '合作关闭' }, { 6: '签约' }, { 7: '放款' },
                { 8: '全部回款' }, { 9: '合作完成' }, { 10: '信息待完善' }],
            form: {
                projectUpload: [],
                loanPayTypeRate: '方法定义必填',
                payAcceptanceRemarkTxt: '承兑方法必填',
                upstreamPayTypearr: []
            },
            copyForm: {}
        }
    },
    computed: {
        ...mapGetters({
            projectDetail: 'crmmanage/projectDetail'
        })
    },
    mounted () {
        this.copyStatusForm = { ...this.statusForm }
    },
    methods: {
        ...mapActions('crmmanage', {
            findProjectDetail: 'findProjectDetail'
        }),
        handleClick (tab, event) {

        },

        isShowRest (val) {
            const newVal = val && Object.keys(val)[0]
            if (newVal == 2) {
                return false
            } else {
                return true
            }
        },
        async onFindProjectCom (val) {
            // 调用初审详情
            await this.findProjectDetail(val)
            this.form = { ...this.form, ...this.projectDetail }
            this.form.projectUpload = this.form.attachmentUrl ? JSON.parse(this.form.attachmentUrl) : []
            this.form.loanPayTypeRate = '方法定义必填'
            this.form.upstreamPayTypearr = this.form.upstreamPayType ? this.form.upstreamPayType.split(',') : []
            this.copyForm = { ...this.form }
        },
        onAuditstatus () {
            // 调用子组件
        },
        onReststatus () {

        },
        onSaveproject () {
            // 初审详情保存
            this.loading = true
            try {
                this.$refs.projectCom.onSaveproject()
                this.$emit('backEvent')
            } catch (error) {
                this.loading = false
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