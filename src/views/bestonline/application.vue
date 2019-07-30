<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">
                        公司：
                    </div>
                    <div class="query-col-input">
                        <el-input
                            placeholder="请输入公司名称"
                            v-model="params.companyName"
                            maxlength="25">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        状态：
                    </div>
                    <div class="query-col-input">
                        <el-select
                            v-model="params.approvalStatus"
                            placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button
                        type="primary"
                        @click="onSearch()"
                    >搜索
                    </el-button>
                </div>
            </div>

        </div>
        <div class="page-body-cont">
            <div class="table-cont-btn">
                <el-button
                    type="primary"
                    class="addbutton"
                    @click="addNewApply">
                    添加申请
                </el-button>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" :pagination="pagination" @onCurrentChange="onCurrentChange">
                <template slot="approvalStatus" slot-scope="scope">
                    <span v-if="scope.data.row.approvalStatus == 0">未提交</span>
                    <span v-if="scope.data.row.approvalStatus == 1"
                          @click="showProcess(scope.data.row.applyId)">审批中</span>
                    <span class="isGreenColor" v-if="scope.data.row.approvalStatus == 2"
                          @click="showProcess(scope.data.row.applyId)">审批通过</span>
                    <span class="isRedColor" v-if="scope.data.row.approvalStatus == 3"
                          @click="showProcess(scope.data.row.applyId)">审批驳回</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)"
                               v-if="scope.data.row.approvalStatus==0">修改
                    </el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)"
                          v-if='scope.data.row.approvalStatus==0'>删除</el-button>
                    <el-button class="orangeBtn" @click="onShow(scope.data.row)"
                          v-if='scope.data.row.approvalStatus!=0'>查看</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="审批状态" :visible.sync="dialogVisible" width="750px" center :close-on-click-modal=false>
            <div class="block">
                <el-timeline>
                    <el-timeline-item v-for="(item, index) in dueApproval" :key="index" :timestamp="item.approvalOpinion" :color="item.color">
                        {{item.userName}}/{{item.approvalStatus===0?'待审核':item.approvalStatus===1?'同意':'不同意'}}
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
import { getDueapply, getDueApproval, updateDueapply } from './api/index.js'
import { mapState, mapMutations } from 'vuex'
import { APPROVAL_STATUS_OPTIONS } from './const'
export default {
    name: 'application',
    data () {
        return {
            tableLabel: [
                { label: '公司名称', prop: 'companyName', align: 'left' },
                { label: '发起人', prop: 'createUserName', align: 'left' },
                { label: '发起人所在机构', prop: 'createUser', align: 'left' },
                { label: '创建时间', prop: 'createTime' },
                { label: '评审通过/驳回时间', prop: 'approvalTime' },
                { label: '评审状态', prop: 'approvalStatus', width: '60px' },
                { label: '未操作人', prop: 'noOperator', align: 'left' }
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
        this.getDueapply()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
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
            this.dialogVisible = true
            const { data } = await getDueApproval({ applyId: applyId })
            this.dueApproval = data.data.dueFlowProcessSeveralFieldsVos
            this.dueApproval && this.dueApproval.reverse().map(value => {
                if (value.approvalStatus === 1) {
                    value.color = '#f88825'
                }
                return value
            })
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
                await updateDueapply({ deleted: 1, applyId: val.applyId })
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
