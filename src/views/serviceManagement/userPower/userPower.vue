<template>
    <div class="user-power">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <!--<div class="query-cont-col">-->
                <!--<div class="query-col-title">客户姓名：</div>-->
                <!--<div class="query-col-input">-->
                <!--<el-input type="text" maxlength="50" v-model="queryParams.disabledName" placeholder="请输入姓名" disabled>-->
                <!--</el-input>-->
                <!--</div>-->
                <!--</div>-->
                <div class="query-cont-col">
                    <div class="query-col-title">手机号：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="11" v-model="queryParams.mobile" placeholder="请输入手机号">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">渠道名称：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.channelType" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label="item.name" :value="item.code" v-for="item in channelType" :key="item.code"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">重置</el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont" v-show="isShow">
                <div class="sub-title">用户权益</div>
                <el-table :data="tableData" class="table">
                    <el-table-column label="序号" align="center" width="80px" type="index">
                    </el-table-column>
                    <el-table-column prop="channelName" align="center" label="渠道名称">
                    </el-table-column>
                    <el-table-column prop="serviceResourceName" align="center" label="服务项目">
                    </el-table-column>
                    <el-table-column prop="availableTimes" align="center" label="可用次数">
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClickShowDialog(scope.row)">新增工单</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="sub-title">权益操作记录</div>
                <div class="page-body-cont query-cont">
                    <div class="query-cont-col">
                        <div class="query-col-title">创建时间：</div>
                        <div class="query-col-input">
                            <el-date-picker v-model="queryParamsTrace.operateBeginTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10">-</span>
                            <el-date-picker v-model="queryParamsTrace.operateEndTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">订单号：</div>
                        <div class="query-col-input">
                            <el-input type="text" maxlength="50" v-model="queryParamsTrace.orderNo" placeholder="内部订单号">
                            </el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">变动类型：</div>
                        <div class="query-col-input">
                            <el-select v-model="queryParamsTrace.operateType" clearable style="width: 100%" placeholder="全部">
                                <el-option v-for="(item,index) in operateType" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">
                            <el-button type="primary" class="ml20" @click="onQueryTrace()">搜索</el-button>
                            <el-button type="primary" class="ml20" @click="onResetTrace()">重置</el-button>
                        </div>
                    </div>
                </div>
                <el-table :data="tableDataTrace" class="table">
                    <el-table-column label="序号" align="center" width="80px" type="index">
                    </el-table-column>
                    <el-table-column prop="channelName" align="center" label="渠道名称">
                    </el-table-column>
                    <el-table-column prop="orderNo" align="center" label="订单号">
                    </el-table-column>
                    <el-table-column prop="serviceResourceName" align="center" label="服务项目">
                    </el-table-column>
                    <el-table-column prop="createTime" align="center" label="变动时间">
                    </el-table-column>
                    <el-table-column prop="operateName" align="center" label="变动类型">
                    </el-table-column>
                    <el-table-column prop="operateTimes" align="center" label="变动次数">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <workOrder ref='workOrder' :houseKeeperData="houseKeeperData" @clickHandle='clickHandle' :form='form' :dialog='dialog' @onDialog='dialog = false' />
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { getAggregate, getUserRightsTrace, createWorkUserRights } from './api/index'
import { findServiceManagementList } from '../orderCenter/api/index'
import { findChannelDict } from '../common/dictApi'
import workOrder from '../components/workOrder'
import { phoneRegular } from '@/utils/regular'

export default {
    name: 'userPower',
    computed: {
        ...mapGetters(['doneWorkOrderUserInfo']),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParamsTrace.operateEndTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParamsTrace.operateBeginTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    components: {
        workOrder
    },
    data () {
        return {
            queryParams: { mobile: '', channelType: '' },
            queryParamsTrace: { mobile: '', channelType: '' },
            dialog: false,
            tableData: [], // 用户权益
            tableDataTrace: [], // 权益操作记录
            form: {},
            channelType: [],
            operateType: [
                {
                    label: '订单（下单）新增',
                    value: 1
                },
                {
                    label: '订单（退单）扣减',
                    value: 2
                },
                {
                    label: '工单（取消）新增',
                    value: 3
                },
                {
                    label: '工单（预约）扣减',
                    value: 4
                }
            ],
            houseKeeperData: [],
            userRightRow: {},
            isShow: false
        }
    },
    watch: {
        'queryParams.channelType' (val) {
            this.queryParamsTrace.channelType = val
        }
    },
    async mounted () {
        this.propsParams = { ...this.$route.query }
        await this.findChannelDict()
        if (this.propsParams.orderNo) {
            this.queryParamsTrace.orderNo = this.propsParams.orderNo
        }
        if (this.propsParams.mobile && this.propsParams.source) {
            this.queryParams.mobile = this.propsParams.mobile
            this.queryParams.channelType = this.propsParams.source - 0
            this.queryParamsTrace.channelType = this.propsParams.source - 0
            this.onQuery()
            this.getWorkOrderUserInfo({
                mobile: this.propsParams.mobile,
                channelType: this.propsParams.source
            })
        }
    },
    methods: {
        ...mapActions(['getWorkOrderUserInfo']),
        async onQuery () {
            if (!this.queryParams.mobile) {
                this.$message.error('手机号码必填')
                return
            }
            if (this.queryParams.mobile && !phoneRegular.test(this.queryParams.mobile)) {
                this.$message.error('手机号码格式错误')
                return
            }
            this.isShow = true
            this.getAggregate()
            this.onQueryTrace()
        },
        async getAggregate () {
            const { data } = await getAggregate(this.queryParams)
            this.tableData = data
        },
        async onQueryTrace () {
            const { data: dataTrace } = await getUserRightsTrace({ ...this.queryParamsTrace, mobile: this.queryParams.mobile })
            this.tableDataTrace = dataTrace
        },
        onReset () {
            this.$set(this.queryParams, 'mobile', '')
            this.$set(this.queryParams, 'channelType', '')
            this.isShow = false
        },
        onResetTrace () {
            this.$set(this.queryParamsTrace, 'operateBeginTime', '')
            this.$set(this.queryParamsTrace, 'operateEndTime', '')
            this.$set(this.queryParamsTrace, 'orderNo', '')
            this.$set(this.queryParamsTrace, 'operateType', '')
            this.onQueryTrace()
        },
        async handleClickShowDialog (row) {
            const userMapper = this.doneWorkOrderUserInfo
            const params = {
                mobile: this.queryParams.mobile,
                channelType: row.channelType
            }
            const { data } = await getAggregate(params)
            this.userRightRow = row
            this.form = {
                ...row,
                status: 2,
                AloneData: '',
                AloneDataTimeStart: '',
                AloneDataTimeEnd: '',
                reserveMode: 2,
                userRightMobile: this.queryParams.mobile,
                serviceResourceArr: data,
                customerName: userMapper.name,
                customerMobile: userMapper.mobile,
                customerAddress: userMapper.address
            }
            this.findServiceManagementList() // 查询线下管家
            this.dialog = true
            this.$refs.workOrder.clearValidate()
        },
        async findServiceManagementList () {
            const { data } = await findServiceManagementList({ pageSize: 1000, pageNumber: 1, role: 1 }) // 管家人少，查出所有管家
            this.houseKeeperData = data.records
        },
        async findChannelDict () {
            const { data } = await findChannelDict()
            this.channelType = data
        },
        async clickHandle (form) {
            if (form.serviceNum > this.userRightRow.availableTimes) {
                this.$message.error('服务可用次数不足')
                this.$refs.workOrder.closeIsSaving()
                return
            }
            // 新增工单
            form.createBy = this.userInfo.employeeName
            await createWorkUserRights(form)
            this.$refs.workOrder.onCloseDialog()
            this.onQuery()
        }
    }
}
</script>

<style scoped lang="scss">
.sub-title {
    line-height: 15px;
    padding: 6px 15px;
    border-left: 3px solid #ff7a45;
    margin-top: 15px;
    margin-bottom: 30px;
}

.table {
    width: 80%;
    margin: 20px 50px;
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
}
/deep/.el-table th {
    border-right: 1px solid #ebeef5;
}
/deep/.el-table__row td {
    border-right: 1px solid #ebeef5;
}
/deep/ .is-scrolling-none {
    box-sizing: border-box;
    border-right: 1px solid #ebeef5;
}
</style>
