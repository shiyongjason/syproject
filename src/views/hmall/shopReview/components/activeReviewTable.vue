<template>
    <div class="page-body-cont">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column
                prop="activityCode"
                align="center"
                label="活动编号">
            </el-table-column>
            <el-table-column
                prop="activityName"
                align="center"
                label="活动名称">
            </el-table-column>
            <el-table-column
                align="center"
                label="活动类型">
                <!--优惠券类型(1,满减 2,无门槛)-->
                <template slot-scope="scope">
                    {{scope.row.activityType === 1 ? '满减' : '折扣'}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="活动状态">
                <!--2.进行中 3.未审核 4.已结束 5.未通过-->
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 2">进行中</span>
                    <span v-if="scope.row.status === 3">未审核</span>
                    <span v-if="scope.row.status === 4">已结束</span>
                    <span v-if="scope.row.status === 5">未通过</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="审核状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.auditStatus === 0">待审核</span>
                    <span v-if="scope.row.auditStatus === 1">审核通过</span>
                    <span v-if="scope.row.auditStatus === 2">审核不通过</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="活动范围">
                <!--(1,全部会员店 2,部分会员店)-->
                <template slot-scope="scope">
                    {{scope.row.targetRange === 1 ? '全部会员店' : '部分会员店'}}
                </template>
            </el-table-column>
            <el-table-column
                prop="merchantName"
                align="center"
                label="平台公司名称">
            </el-table-column>
            <el-table-column
                align="center"
                label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.createTime | formatterTime}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <!--2.进行中 3.未审核 4.已结束 5.未通过-->
                    <el-button class="orangeBtn" v-if="scope.row.status === 3"
                               @click="showDialog(scope.row.id,'review')">审核
                    </el-button>
                    <el-button class="orangeBtn" @click="showDialog(scope.row.id,'watch')">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination
                class="el-page"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationData.pageNumber"
                :page-sizes="[10,20,30,40,50]"
                layout="total, sizes, prev, pager, next, jumper"
                :onQuery="onQuery"
                :total="paginationData.totalElements">
            </el-pagination>
        </div>
        <el-dialog :title="dialogParams.title" :visible.sync="dialogParams.show" width="850px" center
                   :close-on-click-modal="false">
            <el-form class="base" :inline="true">
                <div>
                    <h2 class="sub-title">基本信息</h2>
                    <el-form-item label="活动编号：">
                        {{activeDetails.activityCode}}
                    </el-form-item>
                    <el-form-item label="活动范围：">
                        <!--目标范围(1,全部会员店 2,部分会员店)-->
                        <span v-if="activeDetails.targetRange === 1">全部会员店</span>
                        <span v-if="activeDetails.targetRange === 2">部分会员店</span>
                    </el-form-item>
                    <el-form-item label="活动名称：">
                        {{activeDetails.activityName}}
                    </el-form-item>
                    <el-form-item label="指定会员店：">
                        {{activeDetails.memberNameList? activeDetails.memberNameList.join(','): '-'}}
                    </el-form-item>
                    <el-form-item label="发放时间：">
                        <span v-if="activeDetails.releaseTime">
                            {{activeDetails.releaseTime | formatDateDuration}}
                        </span>
                    </el-form-item>
                    <el-form-item label="平台公司名称：">
                        {{activeDetails.merchantName}}
                    </el-form-item>
                    <el-form-item label="活动类型：">
                        {{activeDetails.activityType === 1 ? '满减' : '折扣'}}
                    </el-form-item>
                    <el-form-item label="活动规则：">
                        <!--1,满xx减xx 2,每满xx减xx 3.折扣)-->
                        {{activeDetails.rule}}
                    </el-form-item>
                    <el-form-item label="活动状态：">
                        <!--活动状态(2,进行中 3,待审核 4,已结束 5,未通过)-->
                        <span v-if="activeDetails.activityStatus === 2">进行中</span>
                        <span v-if="activeDetails.activityStatus === 3">待审核</span>
                        <span v-if="activeDetails.activityStatus === 4">已结束</span>
                        <span v-if="activeDetails.activityStatus === 5">未通过</span>
                    </el-form-item>
                    <el-form-item label="参与方式：">
                        <!--1,全场参加,无限制 2,指定类目 3,指定商品)-->
                        <span v-if="activeDetails.joinType === 1">全场参加,无限制</span>
                        <span v-if="activeDetails.joinType === 2">指定类目</span>
                        <span v-if="activeDetails.joinType === 3">指定商品</span>
                    </el-form-item>
                    <el-form-item label="活动时间：">
                        {{(activeDetails.effectiveStartDate)+ '-' + (activeDetails.effectiveEndDate)}}
                    </el-form-item>
                    <el-form-item label="类目：">
                        <span v-if="activeDetails.categoryNameList">{{activeDetails.categoryNameList.join(',')}}</span>
                        <span v-else>-</span>
                    </el-form-item>
                    <el-form-item label="审核状态：">
                        <!--(0,未审核 1,已审核 2,审核不通过)-->
                        <span v-if="activeDetails.auditStatus === 0">未审核</span>
                        <span v-if="activeDetails.auditStatus === 1">已审核</span>
                        <span v-if="activeDetails.auditStatus === 2">审核不通过</span>
                    </el-form-item>
                    <el-form-item label="是否与优惠卷同享：">
                        <!--0,不可同享券 1,可同享所有券 2,指定券同享)-->
                        <span v-if="activeDetails.couponExistType === 0">不可同享券</span>
                        <span v-if="activeDetails.couponExistType === 1">可同享所有券</span>
                        <span v-if="activeDetails.couponExistType === 2">指定券同享</span>
                    </el-form-item>
                    <el-form-item label="活动备注：">
                        {{activeDetails.description ? activeDetails.description : '-'}}
                    </el-form-item>
                    <el-form-item label="优惠券编号：">
                        <span v-if="activeDetails.couponCodeList">{{activeDetails.couponCodeList.join(',')}}</span>
                        <span v-else>-</span>
                    </el-form-item>
                </div>
            </el-form>
            <el-form ref="form" :rules="rules" :model="suggest" class="suggest">
                <div v-if="dialogParams.type === 'review'">
                    <h2>审核意见</h2>
                    <div>
                        <el-form-item label="审核结果" prop="auditResult">
                            <el-radio v-model="suggest.auditResult" label="1">审核通过</el-radio>
                            <el-radio v-model="suggest.auditResult" label="2">审核不通过</el-radio>
                        </el-form-item>
                    </div>
                    <div class="remark">
                        <el-form-item label="备注原因">
                            <el-input type="textarea" v-model="suggest.auditRemark" rows="3" maxlength="50"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="suggest-btn">
                    <el-form-item v-if="dialogParams.type === 'review'">
                        <el-button name="hosjoy-color" @click="createActiveReview">确认</el-button>
                        <el-button name="white-color" @click="cancel">取消</el-button>
                    </el-form-item>
                    <el-form-item v-if="dialogParams.type === 'watch'">
                        <el-button name="white-color" @click="close">关闭</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { createActiveReview, findActiveDetails } from '../api/index'
import { mapState } from 'vuex'
export default {
    name: 'activeReviewTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
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
            dialogParams: {
                show: false,
                title: '审核优惠券',
                type: 'review'
            },
            suggest: {},
            activeDetails: {},
            openId: '',
            rules: {
                auditResult: [
                    { required: true, message: '审核结果不能为空！' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onQuery () {
            this.$emit('onQuery')
        },
        handleSizeChange (val) {
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.$emit('onCurrentChange', val)
        },
        async showDialog (id, type) {
            this.openId = id
            this.suggest = {}
            if (type === 'review') {
                this.dialogParams.title = '审核活动'
                this.dialogParams.type = type
            } else if (type === 'watch') {
                this.dialogParams.title = '查看活动'
                this.dialogParams.type = type
            }
            await this.findActiveDetails(id)
            this.dialogParams.show = true
        },
        close () {
            this.dialogParams.show = false
        },
        cancel () {
            this.dialogParams.show = false
        },
        async findActiveDetails (id) {
            const { data } = await findActiveDetails({ activityId: id })
            this.activeDetails = data
        },
        async createActiveReview () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    const params = {
                        activityId: this.openId,
                        operatorUserName: this.userInfo.employeeName,
                        ...this.suggest
                    }
                    try {
                        await createActiveReview(params)
                        this.$message({
                            type: 'success',
                            message: '已提交审核结果'
                        })
                        this.onQuery()
                    } catch (e) {}
                    this.dialogParams.show = false
                }
            })
        }
    },
    mounted () {

    }
}
</script>

<style scoped>
    .suggest-btn {
        padding-top: 20px;
        text-align: right;
    }
    .sub-title{
        font-size: 18px;
        margin: 0;
        padding: 0;
    }
</style>
<style>
    .el-dialog .el-form .el-form-item{
        margin-bottom: 0;
    }
    .el-dialog--center .el-dialog__body{
        padding: 12px 25px 15px;
    }
    .el-form--inline .el-form-item {
        width: 45%;
    }
    .el-form-item {
        margin-bottom: 5px;
    }
    .el-form-item__label,.el-form-item__content{
        line-height: 25px
    }
    .suggest .el-form-item {
        margin-bottom: 15px!important;
    }
</style>
