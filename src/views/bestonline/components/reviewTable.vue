<template>
    <div class="wrapper">
        <div class="page-table">
            <el-table
                :data="totalData"
                border
                style="width: 100%"
            >
                <el-table-column
                    prop="companyName"
                    label="公司名称"
                >
                    <template slot-scope="scope">
                        <span
                            @click="onLinkKpl(scope.row)"
                            class="blue"
                        >{{scope.row.companyName?scope.row.companyName:'-'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="originatorName"
                    label="发起人"
                    width="200"
                >
                </el-table-column>
                <el-table-column
                    prop="institution"
                    label="发起人所在机构"
                >
                </el-table-column>
                <el-table-column
                    label="发起时间"
                    width="160"
                >
                    <template slot-scope="scope">
                        {{
                        scope.row.originTime | formatDate
                        }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="全部提交时间"
                    width="160"
                >
                    <template slot-scope="scope">
                        {{
                        scope.row.allSubmitTime | formatDate
                        }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="评审通过/驳回时间"
                    width="160"
                >
                    <template slot-scope="scope">
                        {{
                        scope.row.handleTime | formatDate
                        }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="finalScore"
                    label="最终得分"
                >
                </el-table-column>
                <el-table-column
                    prop="standardScore"
                    label="标准分数"
                >
                </el-table-column>
                <el-table-column
                    label="状态"
                    width="120"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">未提交</span>
                        <span
                            v-if="scope.row.status==1"
                            class="blue pointer"
                            @click="showProcess(scope.row)"
                        >审批中</span>
                        <span
                            v-if="scope.row.status==2"
                            class="blue pointer"
                            @click="showProcess(scope.row)"
                        >审批通过</span>
                        <span
                            v-if="scope.row.status==3"
                            class="blue pointer"
                            @click="showProcess(scope.row)"
                        >审批驳回</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="noOperator"
                    label="未操作人"
                    min-width="150"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div v-if='scope.row.status==0||scope.row.status==3'>
                            <span
                                class="blue"
                                v-if="roleType"
                                @click="onSubmit(scope.row)"
                            >提交评审</span>
                            <span
                                class="blue ml10"
                                @click="onEdit(scope.row)"
                            >修改</span>
                        </div>
                        <div v-else>
                            <span
                                class="blue ml10"
                                @click="onShow(scope.row)"
                            >查看</span>
                        </div>
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
import { postDuemain, getDueapprovalconclusion } from '../api/index.js'
import { mapState, mapMutations } from 'vuex'
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
            dialogVisible: false,
            reverse: true,
            dueApproval: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        roleType () {
            if (this.userInfo.positionCode === 'JDgroup-SegmentOperation' || this.userInfo.positionCode === 'JDgroup-SegmentFinance' ||
                this.userInfo.positionCode === 'JDmanager' || this.userInfo.positionCode === 'fenbufazhan') {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        ...mapMutations({
            getCompanyName: 'GET_COMPANY_NAME'
        }),
        onEdit (val) {
            this.getCompanyName(val.companyName)
            this.$router.push({ path: '/bestonline/reviewform', query: { applyId: val.applyId, target: val.signScale } })
        },
        onShow (val) {
            this.getCompanyName(val.companyName)
            this.$router.push({ path: '/bestonline/reviewform', query: { applyId: val.applyId } })
        },
        onLinkKpl (val) {
            this.getCompanyName(val.companyName)
            this.$router.push({ path: '/bestonline/evaluation', query: { applyId: val.applyId } })
        },
        async showProcess (val) {
            this.dialogVisible = true
            const { data } = await getDueapprovalconclusion({ applyId: val.applyId })
            this.dueApproval = data.data.dueFlowProcessSeveralFieldsVos
            this.dueApproval && this.dueApproval.map(value => {
                if (value.approvalStatus === 1) {
                    value.color = '#f88825'
                }
                return value
            })
        },
        async onSubmit (val) {
            const formData = {
                applyId: val.applyId,
                createUser: val.createUser
            }
            if (val.signScale === 0) {
                this.$message({
                    showClose: true,
                    message: '请先提交合作目标信息',
                    type: 'warning'
                })
                return false
            } else {
                if (val.signScale < 3000) {
                    if (val.financalFag === 1) {
                        this.$message({
                            showClose: true,
                            message: '请先提交财务尽调信息',
                            type: 'warning'

                        })
                        return false
                    }
                    if (val.legalFlag === 1) {
                        this.$message({
                            showClose: true,
                            message: '请先提交法务尽调信息',
                            type: 'warning'

                        })
                        return false
                    }
                    await postDuemain(formData)
                    this.$emit('onCurrentChange', 1)
                    this.$message({
                        showClose: true,
                        message: '提交成功',
                        type: 'success'
                    })
                } else {
                    if (val.businessFlag === 1) {
                        this.$message({
                            showClose: true,
                            message: '请先提交商业尽调信息',
                            type: 'warning'

                        })
                        return false
                    }
                    if (val.financalFag === 1) {
                        this.$message({
                            showClose: true,
                            message: '请先提交财务尽调信息',
                            type: 'warning'

                        })
                        return false
                    }
                    if (val.legalFlag === 1) {
                        this.$message({
                            showClose: true,
                            message: '请先提交法务尽调信息',
                            type: 'warning'

                        })
                        return false
                    }
                    if (val.organizationFlag === 1) {
                        this.$message({
                            showClose: true,
                            message: '请先提交组织尽调信息',
                            type: 'warning'

                        })
                        return false
                    }
                    await postDuemain(formData)
                    this.$emit('onCurrentChange', 1)
                    this.$message({
                        showClose: true,
                        message: '提交成功',
                        type: 'success'
                    })
                }
            }
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
