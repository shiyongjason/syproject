<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <h3>人脸识别验证</h3>
            </div><br>
            <div class="query-cont-col">
                <div class="query-col-title">姓名：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.name" placeholder="请输入企业名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">身份证号：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.idCardNumber" placeholder="请输入企业名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" isShowIndex :actionMinWidth='120'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onupdate(scope.data.row)">修改</el-button>
                </template>
            </basicTable>
            <el-dialog title="人脸识别确认验证详情页" :visible.sync="dialogPicture" width='50%' :close-on-click-modal='false'>
                <div class='dialogLayout'>
                    <el-form label-position="right" :rules="rules" ref="ruleForm" label-width="80px" :model="formBank">
                        <el-form-item label="企业名称" prop="customerName">
                            <el-input v-model="formBank.customerName" disabled width='150'></el-input>
                        </el-form-item>
                        <el-form-item label="客户号" prop="customerId">
                            <el-input v-model="formBank.customerId" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="账户名称" prop="accountName">
                            <el-input v-model="formBank.accountName"></el-input>
                        </el-form-item>
                        <el-form-item label="开户银行" prop="bankName">
                            <el-input v-model="formBank.bankName"></el-input>
                        </el-form-item>
                        <el-form-item label="银行账号" prop="accountNumber">
                            <el-input v-model="formBank.accountNumber"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="onCancle">取 消</el-button>
                    <el-button type="primary" @click="onSure('ruleForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getRecognitions, updataBankAccount, deleteBankAccount } from './api/index'
export default {
    name: 'enterpriseCA',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            tableLabel: [
                { label: '用户唯一标识', prop: 'accountId' },
                { label: '姓名', prop: 'customerName' },
                { label: '身份证号', prop: 'customerId' },
                { label: '创建日期', prop: 'createTime', formatters: 'dateTime' },
                { label: '身份证认证结果', prop: 'accountName' },
                { label: '人脸识别认证结果', prop: 'bankName' }
            ],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                idCardNumber: '',
                name: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            dialogPicture: false,
            formBank: {},
            rules: {
                customerName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                customerId: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                accountName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                bankName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                accountNumber: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ]
            }
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        async onQuery () {
            const { data } = await getRecognitions(this.queryParams)
            // console.log(data)
            this.tableData = data.records
            // 控制页数和页码
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        onSearch (val) {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'idCardNumber', '')
            this.$set(this.queryParams, 'name', '')
            this.onSearch()
        },
        async createTags () { },
        async cancel () { },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        async onupdate (row) {
            this.formBank = { ...row }
            this.dialogPicture = true
            this.$nextTick(() => {
                this.$refs.ruleForm.clearValidate()
            })
        },
        onSure (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await updataBankAccount(this.formBank)
                    this.dialogPicture = false
                    this.onQuery()
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    })
                } else {
                    return false
                }
            })
        },
        onCancle () {
            this.dialogPicture = false
        }
    }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog {
    min-width: 525px;
}
.dialogLayout {
    padding: 20px 24px;
}
/deep/ .el-dialog__body {
    min-height: 256px;
}
.add-tags-dialog {
    padding-top: 20px;
}
.el-dialog .el-input {
    width: 300px;
}
</style>
