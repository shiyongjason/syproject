<template>
    <div class="wrapper">
        <div class="page-table">
            <el-table
                :data="totalData"
                border
                stripe
                style="width: 100%"
            >

                <el-table-column
                    prop="companyName"
                    label="公司名称"
                >
                </el-table-column>
                <el-table-column
                    prop="createUserName"
                    label="发起人"
                >
                </el-table-column>
                <el-table-column
                    prop="applyOrganization"
                    label="发起人所在机构"
                >
                </el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        {{
                        scope.row.createTime
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="评审通过/驳回时间">
                    <template slot-scope="scope">
                        {{
                        scope.row.approvalTime
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="评审状态" width="140">
                    <template slot-scope="scope">
                        <span v-if="scope.row.approvalStatus==0">未提交</span>
                        <span class="blue pointer" v-if="scope.row.approvalStatus==1" @click="showProcess(scope.row)">审批中</span>
                        <span class="blue pointer" v-if="scope.row.approvalStatus==2" @click="showProcess(scope.row)">审批通过</span>
                        <span class="blue pointer" v-if="scope.row.approvalStatus==3" @click="showProcess(scope.row)">审批驳回</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="noOperator"
                    label="未操作人"
                    :show-overflow-tooltip='true'
                >
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <span class="blue" @click="onEdit(scope.row)" v-if="scope.row.approvalStatus==0">修改</span>
                        <span class="blue ml10" @click="onDelete(scope.row)"  v-if='scope.row.approvalStatus==0'>删除</span>
                        <span class="blue ml10" @click="onShow(scope.row)"  v-if='scope.row.approvalStatus!=0'>查看</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page clearfix">
            <el-pagination
                class="el-page"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationData.pageNumber"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationData.totalElements"
            >
            </el-pagination>
        </div>
            <el-dialog
            title="审批状态"
            :visible.sync="dialogVisible"
            width="750px"
            center
            :close-on-click-modal=false
        >
            <div class="block">
                <el-timeline >
                    <el-timeline-item
                        v-for="(item, index) in dueApproval"
                        :key="index"
                        :timestamp="item.approvalOpinion"
                         :color="item.color"
                    >

                        {{item.userName}}/{{item.approvalStatus===0?'待审核':item.approvalStatus===1?'同意':'不同意'}}
                    </el-timeline-item>
                </el-timeline>
            </div>
              <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button  type="primary" @click="dialogVisible = false">好 的</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { updateDueapply, getDueApproval } from '../api/index.js'
import { mapMutations } from 'vuex'
export default {
    props: {
        totalData: {
            required: true,
            type: Array
        },
        paginationData: {
            type: Object,
            default () {
                return {
                    totalElements: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        }
    },
    data () {
        return {
            dueApproval: [],
            dialogVisible: false
        }
    },
    methods: {
        ...mapMutations({
            getApplyCompanyName: 'GET_APPLY_COMPANY_NAME'
        }),
        onEdit (val) {
            this.getApplyCompanyName(val.companyName)
            this.$router.push({ path: '/bestonline/applyform', query: { applyId: val.applyId } })
        },
        onShow (val) {
            this.getApplyCompanyName(val.companyName)
            this.$router.push({ path: '/bestonline/applyform', query: { applyId: val.applyId } })
        },
        async showProcess (val) {
            this.dialogVisible = true
            const { data } = await getDueApproval({ applyId: val.applyId })
            this.dueApproval = data.data.dueFlowProcessSeveralFieldsVos
            this.dueApproval && this.dueApproval.reverse().map(value => {
                if (value.approvalStatus === 1) {
                    value.color = '#f88825'
                }
                return value
            })
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
                this.$emit('onCurrentChange', '1')
            }).catch(() => {})
        },
        handleSizeChange (val) {
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.$emit('onCurrentChange', val)
        }
    }
}
</script>
<style scoped>
.wrapper {
    padding: 0 0 100px;
}

.page {
    text-align: center;
    padding: 20px 0;
}
</style>
