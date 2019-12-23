<template>
    <div class="user-power">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">客户姓名：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.customerName" placeholder="请输入姓名">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">手机号：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.mobile" placeholder="请输入姓名">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">渠道名称：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.channelType" clearable style="width: 100%">
                            <el-option v-for="(item,index) in channelType" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                        <el-button type="primary" class="ml20" @click="onResetRight()">重置</el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
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
                            <el-button @click="handleClick(scope.row)">新增工单</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="sub-title">权益操作记录</div>
                <div class="page-body-cont query-cont">
                    <div class="query-cont-col">
                        <div class="query-col-title">创建时间：</div>
                        <div class="query-col-input">
                            <el-date-picker v-model="queryParamsTrace.operateBeginTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10">-</span>
                            <el-date-picker v-model="queryParamsTrace.operateEndTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
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
                            <el-select v-model="queryParamsTrace.operateType" clearable style="width: 100%">
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
                    <el-table-column prop="operateType" align="center" label="变动类型">
                    </el-table-column>
                    <el-table-column prop="operateTimes" align="center" label="变动次数">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { getAggregate, getUserRightsTrace } from './api/index'
export default {
    name: 'userPower',
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParamsTrace.operateEndTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParamsTrace.operateBeginTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    data () {
        return {
            queryParams: {},
            queryParamsTrace: {},
            tableData: [], // 用户权益
            tableDataTrace: [], // 权益操作记录
            channelType: [],
            operateType: [
                {
                    value: '订单新增',
                    lable: 1
                },
                {
                    value: '订单扣减',
                    lable: 2
                },
                {
                    value: '工单新增',
                    lable: 3
                },
                {
                    value: '工单扣减',
                    lable: 4
                }
            ]
        }
    },
    mounted () {

    },
    methods: {
        async onQuery () {
            if (!this.queryParams.mobile) return
            const { data } = await getAggregate(this.queryParams)
            console.log(data)
            this.tableData = data

        },
        async onQueryTrace () {
            if (!this.queryParams.mobile) return
            const { data: dataTrace } = await getUserRightsTrace({ ...this.queryParamsTrace, mobile: this.queryParams.mobile })
            console.log(dataTrace)
            this.tableDataTrace = dataTrace
        },
        onResetRight () {

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
    width: 1000px;
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
</style>
