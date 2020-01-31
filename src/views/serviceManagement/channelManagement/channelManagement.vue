<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">渠道名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.name" placeholder="请输入渠道名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="findChannelManagementList">搜索</el-button>
                    <el-button type="primary" class="ml20" @click="addChannel">新建渠道</el-button>
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
        <el-dialog :title="title" :visible.sync="dialog" :close-on-click-modal="false" width="500px">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item prop="name" label="渠道名称">
                    <el-input v-model="form.name" maxlength="20" style="width: 300px" placeholder="请输入渠道名称"></el-input>
                </el-form-item>
                <el-form-item label="渠道编码">
                    <el-input v-model="form.id" disabled maxlength="20" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="创建人" v-if="!isAdd">
                    <el-input disabled v-model="form.createBy" placeholder="请输入创建人" maxlength="20" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item prop="misCode" label="MIS编码">
                    <el-input v-model="form.misCode" placeholder="请输入MIS编码" maxlength="20" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" v-if="!isAdd">
                    <el-date-picker disabled v-model="form.createTime" type="datetime" format="yyyy-MM-dd  HH:ss" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd = dialog= false">取 消</el-button>
                <el-button type="primary" @click="update" :loading="isSaving" v-if="!isAdd">修 改</el-button>
                <el-button type="primary" @click="save" :loading="isSaving" v-if="isAdd">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { findChannelManagementList, findChannelDetails, updateChannel, createChannel } from './api/index'
import { mapState } from 'vuex'
export default {
    name: 'channelManagement',
    data () {
        return {
            queryParams: {
                name: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            paginationData: {
                pageNumber: 1,
                pageSize: 20,
                total: 10
            },
            tableLabel: [{ label: '渠道名称', prop: 'name' },
                { label: '渠道编码', prop: 'id' },
                { label: 'MIS编码', prop: 'misCode' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
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
                name: [
                    { required: true, whitespace: true, message: '渠道名称不能为空', trigger: 'blur' }
                ],
                misCode: [
                    { required: true, whitespace: true, message: 'MIS编码不能为空', trigger: 'blur' }
                ]
            },
            date: '',
            isSaving: false
        }
    },
    computed: {
        title () {
            return this.isAdd ? '新建渠道' : '编辑渠道'
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findChannelManagementList()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findChannelManagementList()
        },
        addChannel () {
            this.isAdd = this.dialog = true
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
            this.form = {
                name: '',
                channelCode: '',
                misCode: ''
            }
        },
        onEdit (params) {
            this.dialog = true
            this.isAdd = false
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
            this.findChannelDetails(params.id)
        },
        update () {
            const id = this.form.id
            const params = { ...this.form }
            delete params.id
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.updateChannel(id, params)
                }
            })
        },
        save () {
            this.isSaving = true
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    try {
                        await this.createChannel()
                        this.$message({
                            message: '新增渠道成功！',
                            type: 'success'
                        })
                        await this.findChannelManagementList()
                        this.dialog = this.isSaving = false
                    } catch (e) {
                        this.isSaving = false
                    }
                } else {
                    this.isSaving = false
                }
            })
        },
        async findChannelManagementList () {
            const { data } = await findChannelManagementList(this.queryParams)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        async findChannelDetails (id) {
            const { data } = await findChannelDetails(id)
            this.form = data
        },
        async updateChannel (id, params) {
            this.isSaving = true
            try {
                await updateChannel(id, params)
                this.$message({
                    message: '更新渠道成功！',
                    type: 'success'
                })
                await this.findChannelManagementList()
                this.dialog = this.isSaving = false
            } catch (e) {
                this.isSaving = false
            }
        },
        async createChannel () {
            this.form.createBy = this.userInfo.employeeName
            await createChannel(this.form)
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
