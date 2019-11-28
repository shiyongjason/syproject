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
                <basicTable :isShowIndex="true" :isAction="true" :isPagination='true' :tableLabel="tableLabel"  :tableData="tableData" :pagination="paginationData"
                            @onSizeChange="onSizeChange"
                            @onCurrentChange="onCurrentChange">
                    <template slot="houseKeeper" slot-scope="scope">
                        <span>{{scope.data.row.houseKeeper}}</span>
                        <span>{{scope.data.row.houseKeeperMobile}}</span>
                    </template>
                    <template slot="engineer" slot-scope="scope">
                        <span>{{scope.data.row.engineer}}</span>
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
            <el-dialog title="修改工单" :visible.sync="dialog" class="edit-work-order" width="1000px" :close-on-click-modal="false">
                <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="edit-work-order-form">
                    <el-form-item label="渠道名称">
                        <el-select disabled v-model="form.channelType">
                            <el-option :label="item.name" :value="item.code" v-for="item in channelType" :key="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单号">
                        <el-input v-model="form.orderId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工单号">
                        <el-input v-model="form.workOrderNo" disabled maxlength="25"></el-input>
                    </el-form-item>
                    <el-form-item prop="customerName" label="姓名">
                        <el-input v-model="form.customerName" placeholder="请输入姓名" maxlength="25"></el-input>
                    </el-form-item>
                    <el-form-item prop="customerMobile" label="手机号">
                        <el-input v-model="form.customerMobile" placeholder="请输入手机号" maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item prop="houseKeeper" label="线下管家">
                        <el-select v-model="form.houseKeeperId" >
                            <el-option :label="item.name" :value="item.userId" v-for="item in houseKeeperData" :key="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="houseKeeperMobile"  label="管家电话">
                        <el-input v-model="form.houseKeeperMobile" placeholder="请输入管家电话" maxlength="11" ></el-input>
                    </el-form-item>
                    <el-form-item prop="customerAddress" label="地址">
                        <el-input v-model="form.customerAddress" placeholder="请输入地址" maxlength="50" ></el-input>
                    </el-form-item>
                    <el-form-item prop="reserveMode" label="预约方式">
                        <el-select v-model="form.reserveMode">
                            <el-option label="公众号预约" :value="1"></el-option>
                            <el-option label="电话预约" :value="2"></el-option>
                            <el-option label="管家预约" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="goodsName" label="服务项目">
                        <el-input v-model="form.goodsName" placeholder="请输入服务项目" maxlength="20"  ></el-input>
                    </el-form-item>
                    <el-form-item label="服务商">
                        <el-input v-model="form.serviceProvider" placeholder="请输入服务商" maxlength="20"  ></el-input>
                    </el-form-item>
                    <el-form-item prop="type" label="服务状态">
                        <el-select v-model="form.status"  >
                            <el-option label="已预约（待确认）" :value="1"></el-option>
                            <el-option label="已预约（已确认）" :value="2"></el-option>
                            <el-option label="已完成" :value="3"></el-option>
                            <el-option label="取消" :value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工程师">
                        <el-input v-model="form.engineer" placeholder="请输入工程师" maxlength="10"  ></el-input>
                    </el-form-item>
                    <el-form-item label="工程师电话">
                        <el-input v-model="form.engineerMobile" placeholder="请输入工程师电话" maxlength="11"  ></el-input>
                    </el-form-item>
                    <el-form-item prop="serviceNum" label="服务数量">
                        <el-input v-model="form.serviceNum" placeholder="请输入服务数量" maxlength="5" ></el-input>
                    </el-form-item>
                    <el-form-item label="买家备注">
                        <el-input disabled v-model="form.buyerRemark" placeholder="" ></el-input>
                    </el-form-item>
                    <el-form-item label="卖家备注">
                        <el-input disabled v-model="form.sellerRemark" placeholder=""  ></el-input>
                    </el-form-item>
                    <el-form-item label="服务时间" style="width: 100%">
                        <el-date-picker v-model="AloneData" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                        placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                        <el-time-select placeholder="起始时间" v-model="AloneDataTimeStart" :picker-options="{
                                      start: '08:30',
                                      step: '00:15',
                                      end: '18:30'
                                    }">
                        </el-time-select>
                        <el-time-select placeholder="结束时间" v-model="AloneDataTimeEnd" :picker-options="{
                                  start: '08:30',
                                  step: '00:15',
                                  end: '18:30',
                                  minTime: AloneDataTimeStart
                                }">
                        </el-time-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">取 消</el-button>
                <el-button type="primary" @click="update" :loading="isSaving">修 改</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { findWorkOrderList, findServiceManagementList, findWorkOrderDetail, updateWorkOrder } from './api/index'
import { mapState } from 'vuex'
import { findChannelDict } from '../common/dictApi'
export default {
    name: 'reservation',
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
            if (!N.test(value)) {
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
            tableLabel: [{ label: '渠道名称', prop: 'channelName' },
                { label: '订单号', prop: 'orderNo' },
                { label: '工单号', prop: 'workOrderNo' },
                { label: '姓名', prop: 'customerName' },
                { label: '手机号', prop: 'customerMobile' },
                { label: '线下管家', prop: 'houseKeeper' },
                { label: '地址', prop: 'customerAddress' },
                { label: '预约方式', prop: 'reserveMode' },
                { label: '服务项目', prop: 'goodsName' },
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
                goodsName: [
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
            this.form = {
                channelType: data.channelType,
                orderId: data.orderId,
                workOrderNo: data.workOrderNo,
                customerName: data.customerName,
                customerMobile: data.customerMobile,
                houseKeeperId: data.houseKeeperId,
                houseKeeperMobile: data.houseKeeperMobile,
                customerAddress: data.customerAddress,
                reserveMode: data.reserveMode,
                goodsName: data.goodsName,
                serviceProvider: data.serviceProvider,
                status: data.status,
                engineer: data.engineer,
                engineerMobile: data.engineerMobile,
                serviceNum: data.serviceNum,
                buyerRemark: data.buyerRemark,
                sellerRemark: data.sellerRemark,
                reserveBeginTime: data.reserveBeginTime,
                reserveEndTime: data.reserveEndTime
            }
            try { // 新增非必填
                this.AloneData = this.form.reserveBeginTime.split(' ')[0]
                this.AloneDataTimeStart = this.form.reserveBeginTime.split(' ')[1]
                this.AloneDataTimeEnd = this.form.reserveEndTime.split(' ')[1]
            } catch (e) {
            }
        },
        async findServiceManagementList () {
            const { data } = await findServiceManagementList({ pageSize: 1000, pageNumber: 1, role: 1 }) // 管家人少，查出所有管家
            this.houseKeeperData = data.records
        },
        onEdit (row) {
            this.dialog = true
            this.editId = row.id
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
            this.findWorkOrderDetail(this.editId)
        },
        async update () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    try {
                        this.isSaving = true
                        this.form.updateBy = this.userInfo.employeeName
                        if (this.AloneData) {
                            this.form.reserveBeginTime = this.form.reserveEndTime = ''
                            this.form.reserveBeginTime += this.AloneData
                            this.form.reserveEndTime += this.AloneData
                        } else {
                            this.form.reserveBeginTime = this.form.reserveEndTime = ''
                        }
                        if (this.AloneDataTimeStart) {
                            this.form.reserveBeginTime += ' ' + this.AloneDataTimeStart
                        }
                        if (this.AloneDataTimeEnd) {
                            this.form.reserveEndTime += ' ' + this.AloneDataTimeEnd
                        }
                        this.houseKeeperData.forEach(value => {
                            if (value.id === this.form.houseKeeperId) {
                                this.form.houseKeeper = value.name
                            }
                        })
                        await updateWorkOrder(this.editId, this.form)
                        this.onQuery()
                        this.isSaving = false
                        this.dialog = false
                    } catch (e) {
                        this.isSaving = false
                    }
                } else {
                    this.isSaving = false
                }
            })
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
    /deep/.el-form-item{
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
</style>
