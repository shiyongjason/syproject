<template>
    <div class="attribute">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">姓名：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.customerName" placeholder="请输入姓名">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">渠道名称：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.channelType" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label="item.name" :value="item.code" v-for="item in channelType" :key="item.code"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">预约状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.status" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已预约（未确认）" value="1"></el-option>
                            <el-option label="已预约（已确认）" value="2"></el-option>
                            <el-option label="已完成" value="3"></el-option>
                            <el-option label="取消" value="4"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">预约方式：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.reserveMode" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="公众号预约" value="1"></el-option>
                            <el-option label="电话预约" value="2"></el-option>
                            <el-option label="管家预约" value="3"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">手机：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.customerMobile" placeholder="请输入手机">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单号：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.orderNo" placeholder="请输入订单号">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">预约时间：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker v-model="queryParams.reserveBeginTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.reserveEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">重置</el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <basicTable :isShowIndex="true" :isAction="true" :isPagination='true' :tableLabel="tableLabel" :tableData="tableData" :pagination="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                    <template slot="orderNo" slot-scope="scope">
                        <div class="order-no" v-for="item in scope.data.row.workOrderExtList" :key="item.orderNo" v-text="item.orderNo"></div>
                    </template>
                    <template slot="houseKeeper" slot-scope="scope">
                        <span>{{scope.data.row.houseKeeper}}</span><br />
                        <span>{{scope.data.row.houseKeeperMobile}}</span>
                    </template>
                    <template slot="engineer" slot-scope="scope">
                        <span>{{scope.data.row.engineer}}</span><br />
                        <span>{{scope.data.row.engineerMobile}}</span>
                    </template>
                    <template slot="reserveMode" slot-scope="scope">
                        <span v-if="scope.data.row.reserveMode === 1">公众号预约</span>
                        <span v-if="scope.data.row.reserveMode === 2">电话预约</span>
                        <span v-if="scope.data.row.reserveMode === 3">管家预约</span>
                    </template>
                    <template slot="reserveBeginTime" slot-scope="scope">
                        <span>{{scope.data.row.reserveBeginTime | formatDate}}</span> -
                        <span>{{scope.data.row.reserveEndTime | formatDate}}</span>
                    </template>
                    <template slot="status" slot-scope="scope">
                        <!--1：已预约（待确认） 2：已预约（已确认） 3：已完成  4：取消-->
                        <span v-if="scope.data.row.status === 1">已预约（待确认）</span>
                        <span v-if="scope.data.row.status === 2">已预约（已确认）</span>
                        <span v-if="scope.data.row.status === 3">已完成</span>
                        <span v-if="scope.data.row.status === 4">取消</span>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <el-button :disabled="scope.data.row.status > 2" class="orangeBtn" @click="onEdit(scope.data.row)">修改</el-button>
                    </template>
                </basicTable>
            </div>
        </div>
        <workOrder ref='workOrder' :houseKeeperData="houseKeeperData" @clickHandle='clickHandle' :form='form' :dialog='dialog' @onDialog='dialog = false' />
    </div>
</template>

<script>
import { findWorkOrderList, findServiceManagementList, findWorkOrderDetail, updateWorkOrder } from './api/index'
import { mapState } from 'vuex'
import workOrder from '../components/workOrder'
import { findChannelDict } from '../common/dictApi'
export default {
    name: 'reservation',
    components: {
        workOrder
    },
    data () {
        const checkMobile = (rule, value, callback) => {
            const Reg = /^1\d{10}$/
            if (!value) {
                if (rule.field === 'customerMobile') {
                    callback(new Error('请输入手机号码'))
                } else {
                    callback(new Error('请输入管家电话'))
                }
            } else if (Reg.test(value) === false) {
                callback(new Error('手机号码格式不正确'))
            } else {
                callback()
            }
        }
        const validServiceNum = (rule, value, callback) => {
            // const Reg = /\d{5}/
            const N = /^\+?[0-9]\d*$/
            if (!value) {
                callback(new Error('请输入服务数量'))
            } else if (!N.test(value)) {
                callback(new Error('服务数量格式不正确'))
            } else {
                callback()
            }
        }
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            searchParams: {},
            tableData: [],
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '渠道名称', prop: 'channelName' },
                { label: '订单号', prop: 'orderNo', width: 240 },
                { label: '工单号', prop: 'workOrderNo' },
                { label: '姓名', prop: 'customerName' },
                { label: '手机号', prop: 'customerMobile' },
                { label: '线下管家', prop: 'houseKeeper' },
                { label: '地址', prop: 'customerAddress' },
                { label: '预约方式', prop: 'reserveMode' },
                { label: '服务项目', prop: 'serviceResourceName' },
                { label: '服务商', prop: 'serviceProvider' },
                { label: '工程师', prop: 'engineer' },
                { label: '服务时间', prop: 'reserveBeginTime' },
                { label: '服务状态', prop: 'status' },
                { label: '服务数量', prop: 'serviceNum' },
                { label: '买家备注', prop: 'buyerRemark' },
                { label: '卖家备注', prop: 'sellerRemark' }
            ],
            channelType: [],
            dialog: false,
            form: {
                reserveBeginTime: '',
                reserveEndTime: ''
            },
            rules: {
                customerName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                customerMobile: [
                    { required: true, validator: checkMobile, trigger: 'blur' }
                ],
                houseKeeperId: [
                    { required: true, message: '管家不能为空', trigger: 'blur' }
                ],
                houseKeeperMobile: [
                    { required: true, validator: checkMobile, trigger: 'blur' }
                ],
                customerAddress: [
                    { required: true, message: '地址不能为空', trigger: 'blur' }
                ],
                reserveMode: [
                    { required: true, message: '预约方式不能为空', trigger: 'blur' }
                ],
                serviceResourceName: [
                    { required: true, message: '服务项目不能为空', trigger: 'blur' }
                ],
                serviceNum: [
                    { required: true, validator: validServiceNum, trigger: 'blur' }
                ]
            },
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() < Date.now() - 60 * 60 * 24 * 1000
                }
            },
            houseKeeperData: [],
            editId: '',
            isSaving: false,
            AloneData: '',
            AloneDataTimeStart: '',
            AloneDataTimeEnd: ''
        }
    },
    watch: {
        'form.houseKeeperId' (val) {
            let mobile = ''
            this.houseKeeperData.map(value => {
                if (value.userId === val) {
                    mobile = value.mobile
                    this.$set(this.form, 'houseKeeperMobile', mobile)
                    this.$set(this.form, 'houseKeeper', value.name)
                    return false
                }
            })
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.endTime)
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.startTime)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        async findWorkOrderDetail (id) {
            const { data } = await findWorkOrderDetail(id)
            console.log(data)
            this.form = { ...data, webisEdit: true }
            try { // 新增非必填
                this.form.AloneData = this.form.reserveBeginTime.split(' ')[0]
                this.form.AloneDataTimeStart = this.form.reserveBeginTime.split(' ')[1]
                this.form.AloneDataTimeEnd = this.form.reserveEndTime.split(' ')[1]
                // delete this.form.reserveBeginTime
                // delete this.form.reserveEndTime
            } catch (e) {
            }
        },
        async findServiceManagementList () {
            const { data } = await findServiceManagementList({ pageSize: 1000, pageNumber: 1, role: 1 }) // 管家人少，查出所有管家
            this.houseKeeperData = data.records
        },
        onEdit (row) {
            // console.log(row)
            this.form = {}
            this.dialog = true
            this.editId = row.id
            this.findWorkOrderDetail(this.editId)
            this.$refs.workOrder.clearValidate()
        },
        async clickHandle (form) {
            // if (form.serviceNum > this.userRightRow.availableTimes) {
            //     this.$message.error('服务可用次数不足')
            //     return
            // }
            // 修改工单
            // console.log(form)
            this.form.updateBy = this.userInfo.employeeName
            await updateWorkOrder(form)
            this.$refs.workOrder.onCloseDialog()
            this.onQuery()
        },
        onQuery () {
            const { ...params } = this.queryParams
            this.searchParams = params
            this.search()
        },
        onReset () {
            this.queryParams = {
                pageNumber: 1,
                pageSize: 10
            }
            this.onQuery()
        },
        async search () {
            this.searchParams.pageSize = this.paginationData.pageSize
            this.searchParams.pageNumber = this.paginationData.pageNumber
            const { data } = await findWorkOrderList(this.searchParams)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.search()
        },
        async findChannelDict () {
            const { data } = await findChannelDict()
            this.channelType = data
        }
    },
    async mounted () {
        let orderNo = this.$route.query.orderNo
        if (orderNo) {
            this.$set(this.queryParams, 'orderNo', orderNo)
        }
        let defaultMobile = this.$route.query.mobile
        if (defaultMobile) {
            this.$set(this.queryParams, 'customerMobile', defaultMobile)
        }
        this.findServiceManagementList()
        this.findChannelDict()
        this.onQuery()
    }
}
</script>

<style scoped lang="scss">
.edit-work-order {
    /deep/.el-form-item {
        width: 300px;
        float: left;
    }
    .edit-work-order-form {
        overflow: hidden;
        padding-bottom: 20px;
    }
    .el-dialog .el-input {
        width: 190px;
    }
}
.order-no {
    position: relative;
    padding: 10px 0;
}
.order-no:after{
    content: "";
    border-bottom: 1px solid #EBEEF5;
    height: 1px;
    position: absolute;
    left: -10px;
    width: 240px;
    bottom: 0;
}
.order-no:last-child:after{
    border-bottom: 0;
}

</style>
