<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">
                        公司：
                    </div>
                    <div class="query-col-input">
                        <el-input placeholder="请输入公司名称" v-model="params.companyName" maxlength="25">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        状态：
                    </div>
                    <div class="query-col-input">
                        <el-select v-model="params.approvalStatus" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" @click="onSearch()">搜索
                    </el-button>
                </div>
            </div>

        </div>
        <div class="page-body-cont">
            <div class="table-cont-title" v-if="addbtn">
                <span class="table-title-name"></span>
                <el-button type="info" @click="addNewApply">
                    添加申请
                </el-button>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" :pagination="pagination" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange">
                <template slot="approvalStatus" slot-scope="scope">
                    <span v-if="scope.data.row.approvalStatus == 0">未提交</span>
                    <span class="isOrangeColor" v-if="scope.data.row.approvalStatus == 1" @click="showProcess(scope.data.row.applyId)">审批中</span>
                    <span class="isGreenColor" v-if="scope.data.row.approvalStatus == 2" @click="showProcess(scope.data.row.applyId)">审批通过</span>
                    <span class="isRedColor" v-if="scope.data.row.approvalStatus == 3" @click="showProcess(scope.data.row.applyId)">审批驳回</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)" v-if="(scope.data.row.approvalStatus==0 || scope.data.row.approvalStatus==3) && updatebtn">修改</el-button>
                    <el-button class="orangeBtn" @click="onShow(scope.data.row)" v-else>查看</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)" v-if="scope.data.row.approvalStatus==0 && deletebtn">删除</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="审批状态" :visible.sync="dialogVisible" width="750px" center :close-on-click-modal=false>
            <div class="block">
                <el-timeline>
                    <el-timeline-item v-for="(item, index) in dueApproval" :key="index" :timestamp="item.approvalOpinion" :color="item.color">
                        {{item.userName}}<span v-if="item.userName">/</span>{{item.approvalStatus===0?'待审核':item.approvalStatus===1?'同意':'不同意'}}<span> {{item.updateTime | formatDate('YYYY-MM-DD HH:mm:ss')}}</span>
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
import { getDueapply, getDueApproval, deleteDueapply } from '../api/index.js'
import { mapState, mapMutations } from 'vuex'
import { APPROVAL_STATUS_OPTIONS } from '../const'
export default {
    name: 'application',
    data () {
        return {
            addbtn: false,
            updatebtn: false,
            deletebtn: false,
            tableLabel: [
                { label: '公司名称', prop: 'companyName', align: 'left' },
                { label: '发起人', prop: 'createUserName' },
                { label: '发起人所在机构', prop: 'applyOrganization' },
                { label: '创建时间', prop: 'createTime', width: '160px' },
                { label: '评审通过/驳回时间', prop: 'approvalTime', width: '160px' },
                { label: '评审状态', prop: 'approvalStatus' },
                { label: '未操作人', prop: 'noOperator' }
            ],
            tableData: [],
            pagination: {},
            dueApproval: [],
            dialogVisible: false,
            params: {
                companyName: '',
                approvalStatus: '',
                organizationCode: '',
                role: '',
                pageNumber: 1,
                pageSize: 10,
                radio: '1'
            },
            options: APPROVAL_STATUS_OPTIONS
        }
    },
    mounted () {
        console.log(this.userInfo)
        console.log(this.userInfo.role.indexOf('fenbufazhan') !== -1)
        this.getDueapply()
        this.Permission()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        // 权限判断
        Permission () {
            const deptType = this.userInfo.deptType
            const role = this.userInfo.role
            // 分部发展
            if (deptType === 2 && (role.indexOf('fenbufazhan') !== -1)) {
                this.addbtn = true
                this.updatebtn = true
                this.deletebtn = true
            }
        },
        ...mapMutations({
            getApplyCompanyName: 'GET_APPLY_COMPANY_NAME'
        }),
        addNewApply () {
            this.getApplyCompanyName('申请')
            this.$router.push({ path: '/bestonline/applyform' })
        },
        onSizeChange (val) {
            this.params.pageSize = val
            this.getDueapply()
        },
        onCurrentChange (val) {
            this.params.pageNumber = val.pageNumber
            this.getDueapply()
        },
        onSearch () {
            this.params.pageNumber = 1
            this.getDueapply()
        },
        async showProcess (applyId) {
            const { data } = await getDueApproval({ applyId: applyId })
            this.dueApproval = data.data.dueFlowProcessSeveralFieldsVos
            this.dueApproval && this.dueApproval.reverse().map(value => {
                if (value.approvalStatus === 1 || value.approvalStatus === 2) {
                    value.color = '#f88825'
                }
                return value
            })
            this.dialogVisible = true
        },
        async getDueapply () {
            this.params.organizationCode = this.userInfo.organizationCode
            this.params.role = this.userInfo.positionCode
            const { data } = await getDueapply(this.params)
            this.tableData = data.data.pageContent
            this.pagination = {
                pageNumber: data.data.pageNumber,
                pageSize: data.data.pageSize,
                total: data.data.totalElements
            }
        },
        onEdit (val) {
            this.$router.push({ path: './applyform', query: { id: val.applyId } })
        },
        onDelete (val) {
            this.$confirm(`是否确认删除该公司平台?`, '确认删除', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消'
            }).then(async () => {
                await deleteDueapply(val.applyId)
                this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                })
                this.getDueapply()
            })
        },
        onShow (val) {
            this.$router.push({ path: './applyform', query: { id: val.applyId } })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
