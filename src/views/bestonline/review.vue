<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">公司：</div>
                    <div class="query-col-input">
                        <el-input placeholder="输入公司名称" v-model="params.companyName" maxlength="16">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="params.status" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" @click="onSearch()">查询</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" :isAction="isAction" :actionMinWidth="160" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange">
                <template slot="status" slot-scope="scope">
                    <span v-if="scope.data.row.status == 0">未提交</span>
                    <span class="isOrangeColor" v-if="scope.data.row.status == 1" @click="showProcess(scope.data.row.applyId)">审批中</span>
                    <span class="isGreenColor" v-if="scope.data.row.status == 2" @click="showProcess(scope.data.row.applyId)">审批通过</span>
                    <span class="isRedColor" v-if="scope.data.row.status == 3" @click="showProcess(scope.data.row.applyId)">审批驳回</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <template v-if="(scope.data.row.status ==0||scope.data.row.status ==3) && updatebtn && ((scope.data.row.signScale && ((scope.data.row.signScale >= 3000) === iszongbu || isfawu)) || isfazhang)">
                        <el-button class="orangeBtn" v-if="hosAuthCheck(editAuthCode)" @click="onEdit(scope.data.row)">修改</el-button>
                        <el-button class="orangeBtn" v-if="hosAuthCheck(showAuthCode)" @click="onCheck(scope.data.row)">查看</el-button>
                    </template>
                    <template v-else>
                        <el-button class="orangeBtn" v-if="hosAuthCheck(showAuthCode)" @click="onCheck(scope.data.row)">查看</el-button>
                    </template>
                    <el-button class="orangeBtn" v-if="(scope.data.row.status == 0||scope.data.row.status ==3) && submitbtn && hosAuthCheck(commitAuthCode)" @click="onCommit(scope.data.row.applyId)">提交审核</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="审批状态" :visible.sync="dialogVisible" width="750px" center :close-on-click-modal=false>
            <div class="block">
                <el-timeline>
                    <el-timeline-item v-for="(item, index) in dueApproval" :key="index" :color="item.color">
                        {{item.userName}}/
                        {{item.approveStatus===0?'待审核':item.approveStatus===2?'已驳回':item.approveStatus===1&&item.isCooperate==0?'可以合作':'不可合作'}}
                        &nbsp;&nbsp;&nbsp;&nbsp;{{item.updateTime}}<br />
                        {{item.approvalOpinion}}
                    </el-timeline-item>
                </el-timeline>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">好 的</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getDuemain, getDuemainDetail, postDuemain, getFlow } from './api/index.js'
import { APPROVAL_STATUS_OPTIONS } from './const'
import { mapState } from 'vuex'
import { AUTH_BESTONLINE_REVIEW_EDIT, AUTH_BESTONLINE_REVIEW_SHOW, AUTH_BESTONLINE_REVIEW_COMMIT, AUTH_BESTONLINE_REVIEW_OPERATE } from '@/utils/auth_const'
export default {
    name: 'reviewform',
    data () {
        return {
            updatebtn: true,
            submitbtn: false,
            // 是否是总部的角色
            iszongbu: true,
            isfawu: false,
            isfazhang: false,
            params: {
                status: '',
                companyName: '',
                organizationCode: '',
                role: '',
                pageNumber: 1,
                pageSize: 10
            },
            paginationData: {},
            totalTableData: [],
            options: APPROVAL_STATUS_OPTIONS,
            tableLabel: [
                { label: '公司名称', prop: 'companyName', align: 'left' },
                { label: '发起人', prop: 'originatorName', align: 'left' },
                { label: '发起人所在机构', prop: 'institution' },
                { label: '发起时间', prop: 'originTime' },
                { label: '全部提交时间', prop: 'allSubmitTime' },
                { label: '评审通过/驳回时间', prop: 'handleTime' },
                { label: '最终得分', prop: 'finalScore' },
                { label: '标准分数', prop: 'standardScore' },
                { label: '状态', prop: 'status' },
                { label: '未操作人', prop: 'noOperator' }
            ],
            tableData: [],
            pagination: {},
            dialogVisible: false,
            dueApproval: [],
            editAuthCode: AUTH_BESTONLINE_REVIEW_EDIT,
            showAuthCode: AUTH_BESTONLINE_REVIEW_SHOW,
            commitAuthCode: AUTH_BESTONLINE_REVIEW_COMMIT
        }
    },
    mounted () {
        this.getDuemain()
        this.Permission()
    },
    computed: {
        isAction () {
            return this.hosAuthCheck(AUTH_BESTONLINE_REVIEW_OPERATE)
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        // 权限判断
        Permission () {
            const deptType = this.userInfo.deptType
            const role = this.userInfo.role
            // 尽调管理员
            if (role.indexOf('JDmanager') !== -1) {
                this.updatebtn = false
                this.iszongbu = false
            }
            // 总部法务
            if (deptType === 0 && role.indexOf('JDgroup-LegalAffairs') !== -1) {
                this.isfawu = true
            }
            // 总部发展
            if (deptType === 0 && role.indexOf('JDgroup-ChiefBD') !== -1) {
                this.isfazhang = true
            }
            // 分部发展
            if ((deptType === 2 || deptType === 3) && (role.indexOf('fenbufazhan') !== -1)) {
                this.iszongbu = false
                this.updatebtn = false
                this.submitbtn = true
            }
            // 分部财务
            if ((deptType === 2 || deptType === 3) && (role.indexOf('JDgroup-SegmentFinance') !== -1)) {
                this.iszongbu = false
            }
            // 分部运营
            if ((deptType === 2 || deptType === 3) && (role.indexOf('JDgroup-SegmentOperation') !== -1)) {
                this.iszongbu = false
            }
        },
        onSizeChange (val) {
            this.params.pageSize = val
            this.getDuemain()
        },
        onCurrentChange (val) {
            this.params.pageNumber = val.pageNumber
            this.getDuemain()
        },
        onSearch () {
            this.params.pageNumber = 1
            this.getDuemain()
        },
        async  getDuemain () {
            this.params.organizationCode = this.userInfo.belongDeptCode
            this.params.role = sessionStorage.getItem('user_Data') ? JSON.parse(sessionStorage.getItem('user_Data')).positionCode : ''
            const { data } = await getDuemain(this.params)
            this.tableData = data.data.pageContent
            this.pagination = {
                pageNumber: data.data.pageNumber,
                pageSize: data.data.pageSize,
                total: data.data.totalElements
            }
        },
        async showProcess (applyId) {
            this.dialogVisible = true
            const { data } = await getFlow({ applyId: applyId, origin: 1 })
            this.dueApproval = data.data.pageContent
            this.dueApproval && this.dueApproval.map(value => {
                if (value.approveStatus == 1 || value.approveStatus == 2) {
                    value.color = '#f88825'
                }
                return value
            })
        },
        onEdit (row) {
            sessionStorage.setItem('companyName', row.companyName)
            this.$router.push({ path: '/bestonline/reviewform', query: { applyId: row.applyId, target: row.signScale, status: row.status, companyName: row.companyName, canEidt: 1 } })
        },
        onCheck (row) {
            this.$router.push({ path: '/bestonline/reviewform', query: { applyId: row.applyId, status: row.status, companyName: row.companyName, canEidt: 2 } })
        },
        async onCommit (applyId) {
            const { data } = await getDuemainDetail(applyId)
            const row = data.data
            if (row.cooperativeFlag == 1) {
                this.$message.warning({ showClose: true, message: '请先提交合作目标信息' })
                return false
            } else {
                if (row.signScale < 3000 && row.signScale > 0) {
                    if (row.financalFlag == 1) {
                        this.$message.warning({ showClose: true, message: '请先提交财务尽调信息' })
                        return false
                    }
                    if (row.legalFlag == 1) {
                        this.$message.warning({ showClose: true, message: '请先提交法务尽调信息' })
                        return false
                    }
                } else {
                    if (row.businessFlag == 1) {
                        this.$message.warning({ showClose: true, message: '请先提交商业尽调信息' })
                        return false
                    }
                    if (row.financalFlag == 1) {
                        this.$message.warning({ showClose: true, message: '请先提交财务尽调信息' })
                        return false
                    }
                    if (row.legalFlag == 1) {
                        this.$message.warning({ showClose: true, message: '请先提交法务尽调信息' })
                        return false
                    }
                    if (row.organizationFlag == 1) {
                        this.$message.warning({ showClose: true, message: '请先提交组织尽调信息' })
                        return false
                    }
                }
            }
            await postDuemain({ applyId: row.applyId, createUser: row.createUser })
            this.$message.success({ showClose: true, message: '提交成功' })
            this.getDuemain()
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-dialog__body {
    height: 500px;
    overflow-y: auto;
}
</style>
