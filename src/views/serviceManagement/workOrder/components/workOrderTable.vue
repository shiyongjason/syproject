<template>
    <div class="page-body-cont">
        <el-table :data="tableData" border ref="attributeTable" @selection-change="selectionChange" style="width: 100%">
            <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="60">
            </el-table-column>
            <el-table-column prop="channelName" label="渠道名称" align="center">
            </el-table-column>
            <el-table-column prop="orderNo" label="订单号" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.orderNo }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="workOrderNo" label="工单号" align="center">
                <template slot-scope="scope">
                    {{scope.row.workOrderNo ? scope.row.workOrderNo : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="customerName" label="姓名" align="center">
                <template slot-scope="scope">
                    {{ scope.row.customerName }}
                </template>
            </el-table-column>
            <el-table-column prop="customerMobile" label="手机号" align="center">
                <template slot-scope="scope">
                    {{ scope.row.customerMobile }}
                </template>
            </el-table-column>
            <el-table-column label="线下管家" align="center">
                <template slot-scope="scope">
                    {{scope.houseKeeper}}
                    {{scope.houseKeeperMobile}}
                </template>
            </el-table-column>
            <el-table-column prop="customerAddress" label="地址" align="center">
                <template slot-scope="scope">
                    {{ scope.row.customerAddress }}
                </template>
            </el-table-column>
            <el-table-column prop="reserveMode" label="预约方式" align="center">
            </el-table-column>
            <el-table-column prop="serviceProvider" label="服务项目" align="center">
                <template slot-scope="scope">
                    {{ scope.row.serviceProvider }}
                </template>
            </el-table-column>
            <el-table-column prop="serviceProvider" label="服务商" align="center">
            </el-table-column>
            <el-table-column label="工程师" align="center">
                <template slot-scope="scope">
                    {{ scope.row.engineer}}
                    {{ scope.row.engineerMobile}}
                </template>
            </el-table-column>
            <el-table-column label="服务时间" align="center">
                <template slot-scope="scope">
                    {{ scope.row.reserveBeginTime + scope.row.reserveEndTime}}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="服务状态" align="center">
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column prop="serviceNum" label="服务数量" align="center">
            </el-table-column>
            <el-table-column prop="buyerRemark" label="买家备注" align="center">
            </el-table-column>
            <el-table-column prop="sellerRemark" label="卖家备注" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="onEdit(scope.row)" class="orangeBtn two-row"
                               :disabled="scope.row.status == '已完成' || scope.row.status == '取消'">修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination class="el-page" background @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" :current-page="paginationData.pageNumber"
                           :page-sizes="[10,20,30,40,50]" layout="total, sizes, prev, pager, next, jumper"
                           :total="paginationData.totalElements">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { findReservationsDetail, updataReservations } from '../api/index'
import {
    Message
} from 'element-ui'

export default {
    name: 'customerRecordTable',
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
            selectId: [],
            dialogTableVisible: false,
            activeName: '1',
            data: [],
            childArchiveNodes: [],
            title: '修改预约单',
            show: false,
            form: {
                start: '',
                end: ''
            },
            rules: {},
            date: '',
            startTime: '',
            endTime: '',
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() < Date.now() - 60 * 60 * 24 * 1000
                }
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        selectionChange (val) {
            this.selectId = []
            val.forEach((value) => {
                this.selectId.push(value.id)
            })
        },
        async onEdit (row) {
            this.show = true
            this.dialogTableVisible = true
            const { data } = await findReservationsDetail(row.id)
            this.form = data
            const time = this.form.startTime.split(' ')
            this.date = time[0]
            this.startTime = time[1]
            this.endTime = this.form.endTime.split('-')[1]
        },
        async updata () {
            this.form.reservationStartTime = this.date + ' ' + this.startTime
            this.form.reservationEndTime = this.date + ' ' + this.endTime
            await updataReservations(this.form)
            Message({ message: '修改成功', type: 'success' })
            this.dialogTableVisible = false
            this.$emit('updateStatus')
        },
        handleClick () {
            this.childArchiveNodes = this.data[this.activeName - 1].childArchiveNodes
        },
        handleSizeChange (val) {
            this.loading = true
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val)
        },
        indexMethod (index) {
            return this.paginationData.pageSize * (this.paginationData.pageNumber - 1) + index + 1
        }
    }
}
</script>

<style lang="scss" scoped>
    /deep/ .el-form {
        display: flex;
        flex-wrap: wrap;
    }

    /deep/ .el-dialog {
        width: 70%;
        height: auto;
    }

    table {
        border-collapse: collapse;
    }

    table td,
    table th {
        text-align: center;
    }

    .header {
        background: #f0f0f0;
        margin: 10px 0;
    }

    .status-on {
        color: #999999;
    }

    .parameter-link {
        color: #409eff;
        cursor: pointer;
    }

    .invalid-status {
        color: #ccc;
    }

    .valid-status {
        color: #ff7a45;
    }

    .two-row {
        margin-bottom: 10px;
    }
</style>
