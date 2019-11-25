<template>
    <div class="page-body-cont">
        <el-table :data="tableData" border ref="attributeTable" @selection-change="selectionChange" style="width: 100%">
            <el-table-column prop="sourceName" label="渠道名称" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.sourceName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="channelOrderNo" label="渠道编码" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.channelOrderNo }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="reservationNo" label="MIS编码" align="center">
                <template slot-scope="scope">
                    {{scope.row.reservationNo ? scope.row.reservationNo : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="reservationPerson" label="创建时间" align="center">
                <template slot-scope="scope">
                    {{ scope.row.reservationPerson }}
                </template>
            </el-table-column>
            <el-table-column prop="offlineHousekeeper" label="创建人" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="onEdit(scope.row)" class="orangeBtn" :disabled="scope.row.status == '已完成' || scope.row.status == '取消'">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination class="el-page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" :page-sizes="[10,20,30,40,50]" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.totalElements">
            </el-pagination>
        </div>
        <el-dialog :title="title" :visible.sync="dialogTableVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="渠道名称">
                    <el-input v-model="form.channelOrderNo" disabled maxlength="25" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="渠道编码">
                    <el-input v-model="form.reservationNo" disabled maxlength="25" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input v-model="form.reservationName" placeholder="请输入预约内容" maxlength="25" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="MIS编码">
                    <el-input v-model="form.reservationPerson" placeholder="请输入姓名" maxlength="25" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker v-model="date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                    <el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
                    </el-time-select>
                    <el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
                    </el-time-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" v-show="show">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="updata">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
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
            // const { data } = await findReservationsDetail(row.id)
            // this.form = data
            // const time = this.form.startTime.split(' ')
            // this.date = time[0]
            // this.startTime = time[1]
            // this.endTime = this.form.endTime.split('-')[1]
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
</style>
