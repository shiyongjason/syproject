<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">优惠券名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.couponName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">优惠券状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status">
                            <el-option label="全部" value=""></el-option>
                            <!-- （boss没有1.未开始） 2.进行中 3.未审核 4.已结束 5.未通过 6.已中止-->
                            <el-option label="进行中" :value="2"></el-option>
                            <el-option label="未审核" :value="3"></el-option>
                            <el-option label="已结束" :value="4"></el-option>
                            <el-option label="未通过" :value="5"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">创建时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.startDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">审核状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.auditStatus">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已审核" value="1"></el-option>
                            <el-option label="未审核" value="0"></el-option>
                            <el-option label="审核不通过" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">优惠券类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.couponType">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="满减" value="1"></el-option>
                            <el-option label="无门槛" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">平台公司名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.merchantName" maxlength="50" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">是否可叠加：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.stackable">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="是" value="true"></el-option>
                            <el-option label="否" value="false"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">承担部门：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.attachDept">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="item in branchTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <h-table :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" :tableAttrs="tableAttrs" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange">
                <template slot="stackable" slot-scope="scope">
                    {{scope.data.row.stackable ? '是' : '否'}}
                </template>
                <template slot="attachDept" slot-scope="scope">
                    <span v-if="scope.data.row.attachDept == 10">供应链</span>
                    <span v-else-if="scope.data.row.attachDept == 20">活动</span>
                    <span v-else-if="scope.data.row.attachDept == 30">现金</span>
                    <span v-else-if="scope.data.row.attachDept == 40">服务</span>
                </template>
                <template slot="couponType" slot-scope="scope">
                    {{scope.data.row.couponType === 1 ? '满减' : '无门槛'}}
                </template>
                <template slot="status" slot-scope="scope">
                    <span v-if="scope.data.row.status === 2">进行中</span>
                    <span v-if="scope.data.row.status === 3">未审核</span>
                    <span v-if="scope.data.row.status === 4">已结束</span>
                    <span v-if="scope.data.row.status === 5">未通过</span>
                </template>
                <template slot="auditStatus" slot-scope="scope">
                    <span v-if="scope.data.row.auditStatus === 0">未审核</span>
                    <span v-if="scope.data.row.auditStatus === 1">已审核</span>
                    <span v-if="scope.data.row.auditStatus === 2">审核不通过</span>
                </template>
                <template slot="targetRange" slot-scope="scope">
                    {{scope.data.row.targetRange === 1 ? '全部归属会员店' : scope.data.row.targetRange === 2 ? '指定会员店' : '全部平台会员店'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table v-if="scope.data.row.status == 3" @click="onCheck(scope.data.row.id,'review')">审核</h-button>
                    <h-button table @click="onCheck(scope.data.row.id,'watch')">查看</h-button>
                </template>
            </h-table>
            <!-- <couponTable
                :tableData="tableData"
                :paginationData="paginationData"
                @onQuery="findCouponList"
                @onSizeChange="onSizeChange"
                @onCurrentChange="onCurrentChange">
            </couponTable> -->
        </div>
        <el-drawer :title="title" :visible="visible" :wrapperClosable="false" @close="handleClose">
            <div class="drawer-content">
                <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                    <p class="form-item-title">基本信息</p>
                    <el-form-item label="优惠券编号：">
                        {{couponInfo.couponCode}}
                    </el-form-item>
                    <el-form-item label="活动范围：">
                        <!--目标范围(1,全部会员店 2,部分会员店 3,全部平台会员店)-->
                        <span v-if="couponInfo.targetRange === 1">全部归属会员店</span>
                        <span v-if="couponInfo.targetRange === 2">指定会员店</span>
                        <span v-if="couponInfo.targetRange === 3">全部平台会员店</span>
                    </el-form-item>
                    <el-form-item label="优惠券名称：">
                        {{couponInfo.couponName}}
                    </el-form-item>
                    <el-form-item label="指定门店：">
                        {{couponInfo.memberNameList? couponInfo.memberNameList.join(','): '-'}}
                    </el-form-item>
                    <el-form-item label="平台公司名称：">
                        {{couponInfo.merchantName}}
                    </el-form-item>
                    <el-form-item label="发放时间：">
                        {{couponInfo.effectiveDays | formatDateDuration}}
                    </el-form-item>
                    <el-form-item label="优惠券类型：">
                        {{couponInfo.couponType === 1 ? '满减' : '无门槛'}}
                    </el-form-item>
                    <el-form-item label="创建时间：">
                        {{couponInfo.createTime | formatterTime}}
                    </el-form-item>
                    <el-form-item label="优惠券状态：">
                        <!--2.进行中 3.未审核 4.已结束 5.未通过-->
                        <span v-if="couponInfo.status === 2">进行中</span>
                        <span v-if="couponInfo.status === 3">未审核</span>
                        <span v-if="couponInfo.status === 4">已结束</span>
                        <span v-if="couponInfo.status === 5">未通过</span>
                    </el-form-item>
                    <el-form-item label="有效时间：">
                        {{couponInfo.effectiveStartDate | formatterTime}} - {{ couponInfo.effectiveEndDate | formatterTime}}
                    </el-form-item>
                    <el-form-item label="是否可叠加：">
                        <span v-text="couponInfo.stackable ? '是' : '否'"></span>
                    </el-form-item>
                    <el-form-item label="活动规则：">
                        {{couponInfo.rule}}
                    </el-form-item>
                    <el-form-item label="限领数量：">
                        {{couponInfo.receiveNumLimit === 0 ? '不限量' : couponInfo.receiveNumLimit +'张'}}
                    </el-form-item>
                    <el-form-item label="活动备注：">
                        {{couponInfo.description || '-'}}
                    </el-form-item>
                    <el-form-item label="发放数量：">
                        {{couponInfo.totalQuantity}}
                    </el-form-item>
                    <el-form-item label="审核状态：">
                        <!--审核状态0,未审核 1,已审核 2,审核失败-->
                        <span v-if="couponInfo.auditStatus === 0">未审核</span>
                        <span v-if="couponInfo.auditStatus === 1">已审核</span>
                        <span v-if="couponInfo.auditStatus === 2">审核失败</span>
                    </el-form-item>
                    <el-form-item label="参与方式：">
                        <span v-if="couponInfo.joinType === 1">全场参加</span>
                        <span v-if="couponInfo.joinType === 2">指定类目</span>
                        <span v-if="couponInfo.joinType === 3">指定商品</span>
                    </el-form-item>
                    <el-form-item label="审核备注：">
                        {{couponInfo.auditRemark || '-'}}
                    </el-form-item>
                    <el-form-item label="类目名称：" v-if="couponInfo.joinType === 2">
                        {{couponInfo.categoryNameList ? couponInfo.categoryNameList.join(',') : '-'}}
                    </el-form-item>
                    <el-form-item label="商品名称：" v-if="couponInfo.joinType === 3">
                        {{couponInfo.productNameList ? couponInfo.productNameList.join(',') : '-'}}
                    </el-form-item>
                    <template v-if="drawerType == 'review'">
                        <p class="form-item-title">审核意见</p>
                        <el-form-item label="审核结果：" prop="auditResult">
                            <el-radio-group v-model="form.auditResult" @change="onChange">
                                <el-radio label="1">审核通过</el-radio>
                                <el-radio label="2">审核不通过</el-radio>
                            </el-radio-group>

                        </el-form-item>
                        <el-form-item label="备注原因：" :prop="form.auditResult==2?'auditRemark':'none'">
                            <el-input type="textarea" v-model="form.auditRemark" rows="3" maxlength="50"></el-input>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <div class="drawer-footer">
                <div class="drawer-footer-btn flr">
                    <template v-if="drawerType == 'review'">
                        <h-button type='primary' @click="createCouponReview">确认</h-button>
                        <h-button @click="handleClose">取消</h-button>
                    </template>
                    <template v-if="drawerType == 'watch'">
                        <h-button @click="handleClose">关闭</h-button>
                    </template>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { BRANCH_TYPE } from './const'
import { findCouponList, findCouponDetails, createCouponReview } from './api/index'
export default {
    name: 'coupon',
    data () {
        return {
            branchTypeOptions: BRANCH_TYPE,
            queryParams: {
                couponName: '',
                status: '',
                startDate: '',
                endDate: '',
                auditStatus: '',
                couponType: '',
                merchantName: '',
                stackable: '',
                attachDept: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            tableLabel: [
                { label: '优惠券编号', prop: 'couponCode' },
                { label: '优惠券名称', prop: 'couponName' },
                { label: '是否可叠加', prop: 'stackable' },
                { label: '承担部门', prop: 'attachDept' },
                { label: '优惠券类型', prop: 'couponType' },
                { label: '优惠券状态', prop: 'status' },
                { label: '发放数量（张）', prop: 'totalQuantity' },
                { label: '审核状态', prop: 'auditStatus' },
                { label: '活动范围', prop: 'targetRange' },
                { label: '平台公司名称', prop: 'merchantName' },
                { label: '创建时间', prop: 'createTime', format: { name: 'time' } }
            ],
            tableData: [],
            pagination: {},
            tableAttrs: {
                'min-width': 180
            },
            title: '审核优惠券',
            visible: false,
            drawerType: '',
            couponInfo: {},
            form: {
                id: '',
                auditStatus: '',
                auditRemark: '',
                operatorUserName: ''
            },
            rules: {
                auditResult: [
                    { required: true, message: '请选择审核结果', trigger: 'change' }
                ],
                auditRemark: [
                    { required: true, message: '请输入备注原因', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startDate
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    methods: {
        init () {
            this.resetParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.findCouponList()
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.findCouponList()
        },
        onCurrentChange (value) {
            this.queryParams.pageNumber = value.pageNumber
            this.findCouponList()
        },
        onSizeChange (value) {
            this.queryParams.pageSize = value
            this.findCouponList()
        },
        async onCheck (id, type) {
            this.form.id = id
            if (type === 'review') {
                this.title = '审核优惠券'
                this.drawerType = type
            } else if (type === 'watch') {
                this.title = '查看优惠券'
                this.drawerType = type
            }
            await this.findCouponDetails(id)
            this.visible = true
        },
        onChange (val) {
            this.form.auditRemark = ''
            this.$refs.form.clearValidate()
        },
        async createCouponReview () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const form = {
                        ...this.form,
                        operatorUserName: this.userInfo.employeeName
                    }
                    try {
                        await createCouponReview(form)
                        this.$message.success('已提交审核结果')
                        this.visible = false
                    } catch (e) {
                        this.$message.error('提交审核结果失败')
                    }
                    this.findCouponList()
                }
            })
        },
        handleClose () {
            this.visible = false
            this.$refs.form.resetFields()
        },
        async findCouponList () {
            const { data } = await findCouponList(this.queryParams)
            this.tableData = data.records
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        async findCouponDetails (id) {
            const { data } = await findCouponDetails({ id: id })
            this.couponInfo = data
        }
    },
    mounted () {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
// 抽屉
/deep/ .el-drawer__header {
    padding: 20px 24px;
    margin-bottom: 0;
    border-bottom: 1px solid #e5e5e5;

    span {
        color: #000000;
    }
}

/deep/ .el-drawer__body {
    margin-bottom: 65px;
    overflow-y: overlay;
}
.drawer-content {
    padding: 20px 24px;
}

.drawer-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 24px;
    border-top: 1px solid #e5e5ea;
    background: #ffffff;
}
.form-item-title {
    margin-bottom: 20px;
    font-size: 16px;
    color: #666666;
}
</style>
