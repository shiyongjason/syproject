<template>
    <div class="customerManagement page-body">
        <div class="query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">姓名：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.name" placeholder="请输入姓名" clearable maxlength='20' />
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">身份：</div>
                <div class="query-col-input">
                    <!--{ value: 1, label: '线下管家' }, { value: 2, label: '线上管家' }-->
                    <el-select v-model="queryParams.role" clearable style="width: 100%">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="线下管家" :value="1"></el-option>
                        <el-option label="线上管家" :value="2"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input v-model="queryParams.mobile" clearable placeholder="请输入手机号" maxlength='11' />
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createTimeStart" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10"> --</span>
                    <el-date-picker v-model="queryParams.createTimeEnd" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="onQuery">
                    搜索
                </el-button>
                <el-button type="primary" @click="onAddCustomerManagement">
                    新增管家
                </el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :isAction="true" :isPagination='true' :tableLabel="tableLabel"  :tableData="tableData" :pagination="paginationData"
                        @onSizeChange="onSizeChange"
                        @onCurrentChange="onCurrentChange">
                <template slot="role" slot-scope="scope">
                    <span v-if="scope.data.row.role == 1">线下管家</span>
                    <span v-if="scope.data.row.role == 2">线上管家</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog class="house-keeper-edit" title="新增管家信息" :visible.sync="dialog" :close-on-click-modal="false">
            <el-form :model="houseKeeperForm" class="houseKeeperForm" :rules="rules" ref="houseKeeperForm" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="name" label="姓名">
                            <el-input v-model="houseKeeperForm.name" placeholder="请输入姓名" maxlength='20'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="mobile" label="手机号">
                            <el-input v-model="houseKeeperForm.mobile"  placeholder="请输入手机号" maxlength='11'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="nickname" label="微信昵称">
                            <el-input placeholder="请输入微信昵称" v-model="houseKeeperForm.nickname" maxlength='20'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="wechatId" label="微信号">
                            <el-input placeholder="请输入微信号" v-model="houseKeeperForm.wechatId" maxlength='20'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="role" label="身份">
                            <el-select v-model="houseKeeperForm.role" clearable>
                                <el-option label="线下管家" :value="1"></el-option>
                                <el-option label="线上管家" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onSave" :loading="isSaving">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { findServiceManagementList, createServiceManagement, deleteServiceManagement } from './api/index'

export default {
    name: 'houseKeeperManagement',
    data () {
        const checkMobile = (rule, value, callback) => {
            const Reg = /^1\d{10}$/
            if (!value) {
                callback(new Error('请输入手机号码'))
            } else if (Reg.test(value) === false) {
                callback(new Error('手机号码格式不正确'))
            } else {
                callback()
            }
        }
        return {
            queryParams: {
                pageSize: 10,
                pageNumber: 1
            },
            channelData: [],
            tableData: [],
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                total: 10
            },
            tableLabel: [{ label: '姓名', prop: 'name' },
                { label: '手机号', prop: 'mobile' },
                { label: '微信昵称', prop: 'nickname' },
                { label: '微信号', prop: 'wechatId' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '身份', prop: 'role' }
            ],
            dialog: false,
            houseKeeperForm: {
                mobile: '',
                name: '',
                role: ''
            },
            rules: {
                mobile: [
                    { required: true, validator: checkMobile, trigger: 'blur' }
                ],
                name: [
                    { required: true, whitespace: true, message: '姓名不能为空' }
                ],
                role: [
                    { required: true, message: '身份不能为空' }
                ]
            },
            isSaving: false
        }
    },
    computed: {
        channelType () {
            const arr = this.channelData.map(value => {
                value.value = value.code
                value.label = value.name
                return value
            })
            arr.unshift({ value: '', label: '全部' })
            return arr
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createTimeEnd
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createTimeStart
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        }
    },
    methods: {
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onAddCustomerManagement () {
            this.houseKeeperForm = {}
            this.dialog = true
            this.$nextTick(() => {
                this.$refs.houseKeeperForm.clearValidate()
            })
        },
        onSave () {
            this.$refs['houseKeeperForm'].validate((valid) => {
                if (valid) {
                    this.createServiceManagement(this.houseKeeperForm)
                }
            })
        },
        async onQuery () {
            let params = { ...this.queryParams }
            const { data } = await findServiceManagementList(params)
            this.tableData = data.records
            this.paginationData.total = data.total
        },
        async createServiceManagement (params) {
            this.isSaving = true
            try {
                await createServiceManagement(params)
                this.$message({
                    message: '新增成功！',
                    type: 'success'
                })
                await this.onQuery()
                this.dialog = this.isSaving = false
            } catch (e) {
                this.isSaving = false
            }
        },
        async deleteServiceManagement (id) {
            this.$confirm('删除该管家?', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
            }).then(async () => {
                try {
                    await deleteServiceManagement(id)
                    this.$message({
                        message: '删除管家成功！',
                        type: 'success'
                    })
                    await this.onQuery()
                } catch (e) {
                }
            }).catch(() => {
            })
        },
        onCancel () {
            this.dialog = false
            this.houseKeeperForm = {}
        },
        onDelete (row) {
            this.deleteServiceManagement(row.id)
        }
    },
    mounted () {
        this.onQuery()
    }
}
</script>

<style lang='scss' scoped>
.house-keeper-edit .el-row{
    margin-bottom: 20px;
}
</style>
