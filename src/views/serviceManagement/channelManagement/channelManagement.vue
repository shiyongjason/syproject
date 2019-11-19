<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">渠道名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.name" placeholder="请输入姓名">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="findChannelManagementList">搜索</el-button>
                    <el-button type="primary" class="ml20" @click="isAdd = dialog= true">新建渠道</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :isAction="true" :isPagination='true' :tableLabel="tableLabel"  :tableData="tableData" :pagination="paginationData"
                        @onSizeChange="onSizeChange"
                        @onCurrentChange="onCurrentChange">
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">修改</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog :title="title" :visible.sync="dialog">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="渠道名称">
                    <el-input v-model="form.name" maxlength="20" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="渠道编码">
                    <el-input v-model="form.channelCode" disabled maxlength="20" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="创建人" v-if="!isAdd">
                    <el-input disabled v-model="form.reservationName" placeholder="请输入创建人" maxlength="20" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="MIS编码">
                    <el-input v-model="form.misCode" placeholder="请输入MIS编码" maxlength="20" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" v-if="!isAdd">
                    <el-date-picker disabled v-model="date" type="datetime" format="yyyy-MM-dd  HH:ss" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd = dialog= false">取 消</el-button>
                <el-button type="primary" @click="update">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { findChannelManagementList, findChannelDetails, updateChannel, createChannel } from './api/index'
export default {
    name: 'channelManagement',
    data () {
        return {
            queryParams: {
                name: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [ { sourceName: 'dd' } ],
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                total: 10
            },
            tableLabel: [{ label: '渠道名称', prop: 'name' },
                { label: '渠道编码', prop: 'id', width: '150' },
                { label: 'MIS编码', prop: 'misCode', width: '200' },
                { label: '创建时间', prop: 'createTime', width: '200', formatters: 'dateTime' },
                { label: '创建人', prop: 'createBy' }
            ],
            dialog: false,
            isAdd: true,
            form: {
                name: '',
                channelCode: '',
                misCode: ''
            },
            rules: {
                type: [
                    { required: true, message: '属性类型不能为空', trigger: 'change' }
                ]
            },
            date: ''
        }
    },
    computed: {
        title () {
            return this.isAdd ? '新建标签' : '编辑标签'
        }
    },
    methods: {
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            this.paginationData.pageNumber = val
            this.search()
        },
        async search () {
            this.searchParams.pageSize = this.paginationData.pageSize
            this.searchParams.pageNumber = this.paginationData.pageNumber
        },
        onReset () {
            console.log(1)
        },
        onEdit () {
            this.dialog = true
            this.isAdd = false
            console.log(1)
        },
        onAddChannel () {
            console.log(1)
        },
        update () {
            console.log(1)
        },
        async findChannelManagementList () {
            console.log(this.queryParams)
            const { data } = await findChannelManagementList(this.queryParams)
            console.log(data)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        async findChannelDetails () {
            const { data } = await findChannelDetails({})
        },
        async updateChannel () {
            const { data } = await updateChannel({})
        },
        async createChannel () {
            const { data } = await updateChannel({})
        }
    },
    mounted () {
        this.findChannelManagementList()
    }
}
</script>

<style scoped>
    .el-date-editor.el-input{
        width: 300px;
    }
</style>
