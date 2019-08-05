<template>
    <div class="coupon-table">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column
                prop="couponCode"
                align="center"
                label="优惠券编号">
            </el-table-column>
            <el-table-column
                prop="couponName"
                align="center"
                label="优惠券名称">
            </el-table-column>
            <el-table-column
                align="center"
                label="优惠券类型">
                <!--优惠券类型(1,满减 2,无门槛)-->
                <template slot-scope="scope">
                    {{scope.row.couponType === 1 ? '满减' : '无门槛'}}
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                align="center"
                label="优惠券状态">
                <!--2.进行中 3.未审核 4.已结束 5.未通过-->
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 2">进行中</span>
                    <span v-if="scope.row.status === 3">未审核</span>
                    <span v-if="scope.row.status === 4">已结束</span>
                    <span v-if="scope.row.status === 5">未通过</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="totalQuantity"
                align="center"
                label="发放数量（张）">
            </el-table-column>
            <el-table-column
                align="center"
                label="审核状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.auditStatus === 0">未审核</span>
                    <span v-if="scope.row.auditStatus === 1">已审核</span>
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
                    <!--当审核状态=待审核时，展示查看与审核-->
                    <!--当审核状态=审核通过时，展示查看-->
                    <!--当审核状态=审核不通过时，展示查看-->
                    <!--2.进行中 3.未审核 4.已结束 5.未通过-->
                    <el-button type="text"  v-if="scope.row.status === 3"
                               size="small" @click="showDialog(scope.row.id,'review')">审核
                    </el-button>
                    <el-button type="text"
                               size="small" @click="showDialog(scope.row.id,'watch')">查看
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
        <el-dialog :title="dialogParams.title" :visible.sync="dialogParams.show" width="650px" center
                   :close-on-click-modal="false">
            <el-form class="base" :inline="true">
                <div>
                    <h2 class="sub-title">基本信息</h2>
                    <el-form-item label="优惠券编号：">
                        {{couponDetails.couponCode}}
                    </el-form-item>
                    <el-form-item label="活动范围：">
                        <!--目标范围(1,全部会员店 2,部分会员店)-->
                        <span v-if="couponDetails.targetRange === 1">全部会员店</span>
                        <span v-if="couponDetails.targetRange === 2">部分会员店</span>
                    </el-form-item>
                    <el-form-item label="优惠券名称：">
                        {{couponDetails.couponName}}
                    </el-form-item>
                    <el-form-item label="指定门店：">
                        {{couponDetails.memberNameList? couponDetails.memberNameList.join(','): ''}}
                    </el-form-item>
                    <el-form-item label="平台公司名称：">
                        {{couponDetails.merchantName}}
                    </el-form-item>
                    <el-form-item label="发放时间：">
                        {{couponDetails.effectiveDays}}天
                    </el-form-item>
                    <el-form-item label="创建时间：">
                        {{couponDetails.createTime | formatterTime}}天
                    </el-form-item>
                    <el-form-item label="优惠券类型：">
                        {{couponDetails.couponType === 1 ? '满减' : '无门槛'}}
                    </el-form-item>
                    <el-form-item label="活动规则：">
                        {{couponDetails.rule}}
                    </el-form-item>
                    <el-form-item label="优惠券状态：">
                        <!--2.进行中 3.未审核 4.已结束 5.未通过-->
                        <span v-if="couponDetails.status === 2">进行中</span>
                        <span v-if="couponDetails.status === 3">未审核</span>
                        <span v-if="couponDetails.status === 4">已结束</span>
                        <span v-if="couponDetails.status === 5">未通过</span>
                    </el-form-item>
                    <el-form-item label="限领数量：">
                        {{couponDetails.receiveNumLimit}}张
                    </el-form-item>
                    <el-form-item label="活动备注：">
                        {{couponDetails.description}}
                    </el-form-item>
                    <el-form-item label="发放数量：">
                        {{couponDetails.totalQuantity}}
                    </el-form-item>
                    <el-form-item label="审核状态：">
                        <!--审核状态0,未审核 1,已审核 2,审核失败-->
                        <span v-if="couponDetails.auditStatus === 0">未审核</span>
                        <span v-if="couponDetails.auditStatus === 1">已审核</span>
                        <span v-if="couponDetails.auditStatus === 2">审核失败</span>
                    </el-form-item>
                    <el-form-item label="参与方式：">
                        <span v-if="couponDetails.joinType === 1">全场参加</span>
                        <span v-if="couponDetails.joinType === 2">指定类目</span>
                        <span v-if="couponDetails.joinType === 3">指定商品</span>
                    </el-form-item>
                    <el-form-item label="类目名称：" v-if="couponDetails.joinType === 2">
                        {{couponDetails.categoryNameList ? couponDetails.categoryNameList.join(',') : '-'}}
                    </el-form-item>
                    <el-form-item label="商品名称：" v-if="couponDetails.joinType === 3">
                        {{couponDetails.productNameList ? couponDetails.productNameList.join(',') : '-'}}
                    </el-form-item>
                </div>
            </el-form>
            <el-form ref="form" :rules="rules" :model="suggest">
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
                            <el-input type="textarea" v-model="suggest.auditRemark" rows="4"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="suggest-btn">
                    <el-form-item v-if="dialogParams.type === 'review'">
                        <el-button type="primary" @click="createCouponReview">确认</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                    <el-form-item v-if="dialogParams.type === 'watch'">
                        <el-button @click="close">关闭</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { findCouponDetails, createCouponReview } from '../api/index'
import { mapState } from 'vuex'
export default {
    name: 'couponTable',
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
            couponDetails: {},
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
        showDialog (id, type) {
            this.openId = id
            this.suggest = {}
            if (type === 'review') {
                this.dialogParams.title = '审核优惠券'
                this.dialogParams.type = type
            } else if (type === 'watch') {
                this.dialogParams.title = '审核优惠券'
                this.dialogParams.type = type
            }
            this.dialogParams.show = true
            this.findCouponDetails(id)
        },
        close () {
            this.dialogParams.show = false
        },
        cancel () {
            this.dialogParams.show = false
        },
        async findCouponDetails (id) {
            const { data } = await findCouponDetails({ id: id })
            this.couponDetails = data
        },
        async createCouponReview () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    const params = {
                        id: this.openId,
                        operatorUserName: this.userInfo.employeeName,
                        ...this.suggest
                    }
                    try {
                        await createCouponReview(params)
                        this.$message({
                            type: 'success',
                            message: '已提交审核结果'
                        })
                        this.dialogParams.show = false
                    } catch (e) {
                        this.$message({
                            type: 'error',
                            message: '提交审核结果失败'
                        })
                    }
                    this.onQuery()
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
    text-align: center;
}
    .sub-title{
        font-size: 18px;
        margin: 0;
        padding: 0;
    }
</style>
<style>
    .el-form--inline .el-form-item {
        width: 45%;
    }
    .el-form-item {
        margin-bottom: 5px;
    }
</style>
