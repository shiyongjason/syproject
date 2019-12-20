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
                        <el-input type="text" maxlength="50" v-model="queryParams.customerName" placeholder="请输入姓名">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">渠道名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.customerName" placeholder="请输入姓名">
                        </el-input>
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
                <div class="sub-title">用户权益</div>
                <el-table :data="tableData" class="table">
                    <el-table-column label="序号" align="center" width="80px" type="index">
                    </el-table-column>
                    <el-table-column prop="date" align="center" label="渠道名称">
                    </el-table-column>
                    <el-table-column prop="name" align="center" label="服务项目">
                    </el-table-column>
                    <el-table-column prop="address" align="center" label="可用次数">
                    </el-table-column>
                    <el-table-column prop="address" align="center" label="操作">
                    </el-table-column>
                </el-table>
                <div class="sub-title">权益操作记录</div>
                <div class="page-body-cont query-cont">
                    <div class="query-cont-col">
                        <div class="query-col-title">创建时间：</div>
                        <div class="query-col-input">
                            <el-date-picker v-model="queryParams.startDate" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10">-</span>
                            <el-date-picker v-model="queryParams.endDate" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">订单号：</div>
                        <div class="query-col-input">
                            <el-input type="text" maxlength="50" v-model="queryParams.customerName" placeholder="内部订单号">
                            </el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">变动类型：</div>
                        <div class="query-col-input">
                            <el-select>
                                <option label="全部" value=""></option>
                                <option label="订单新增" value="1"></option>
                                <option label="工单减扣" value="2"></option>
                                <option label="工单新增" value="3"></option>
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
                <el-table :data="tableData" class="table">
                    <el-table-column label="序号" align="center" width="80px" type="index">
                    </el-table-column>
                    <el-table-column prop="date" align="center" label="渠道名称">
                    </el-table-column>
                    <el-table-column prop="name" align="center" label="订单号">
                    </el-table-column>
                    <el-table-column prop="address" align="center" label="服务项目">
                    </el-table-column>
                    <el-table-column prop="address" align="center" label="变动时间">
                    </el-table-column>
                    <el-table-column prop="address" align="center" label="变动类型">
                    </el-table-column>
                    <el-table-column prop="address" align="center" label="变动次数">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userPower',
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endDate
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startDate
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
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    mounted () {
        console.log(1)
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
