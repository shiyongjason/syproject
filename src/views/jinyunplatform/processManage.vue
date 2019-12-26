<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <h3>审批流程查询</h3>
            </div>
            <div class="padd20">
                <el-form label-position="right" :rules="rules" ref="ruleForm" :inline="true" label-width="100px" :model="queryParams">
                    <el-form-item label="客户名称：" prop="customerName">
                        <el-input v-model="queryParams.customerName" placeholder="请输入客户名称" maxLength='100'></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称：" prop="productName">
                        <el-select v-model="queryParams.productName" placeholder="请选择产品名称">
                            <el-option v-for="item in options" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="流程类型：" prop="processType">
                        <el-select v-model="queryParams.processType" placeholder="请选择流程类型">
                            <el-option v-for="item in flowTypes" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="query-cont-col" style="padding-top: 20px;">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onFormSearch('ruleForm')">搜索</el-button>
                    </div>
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                    </div>
                </div>
            </div>
            <div class="query-cont-col">
                <h3>审批流程展示</h3>
            </div>
            <div class="padd20">
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' isShowIndex>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getProcessesList, getProductsArr } from './api/index'
export default {
    name: 'processManage',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            tableLabel: [
                { label: '任务标题', prop: 'taskTitle' },
                { label: '任务内容', prop: 'taskContent' },
                { label: '待审批人员', prop: 'approver' },
                { label: '创建日期', prop: 'createTime', formatters: 'dateTime' }
            ],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                customerName: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            options: [],
            flowTypes: ['预授信', '授信', '用信'],
            rules: {
                customerName: [
                    { required: true, message: '请输入客户名称', trigger: 'blur' }
                ],
                productName: [
                    { required: true, message: '请选择产品名称', trigger: 'change' }
                ],
                processType: [
                    { required: true, message: '请选择流程类型', trigger: 'change' }
                ]
            }
        }
    },
    async mounted () {
        const { data } = await getProductsArr()
        this.options = data
    },
    methods: {
        async onQuery () {
            // console.log(this.searchParams)
            console.log(this.queryParams)
            const { data } = await getProcessesList(this.queryParams)
            console.log(data)
            this.tableData = data.records
            // 控制页数和页码
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'customerName', '')
            this.$set(this.queryParams, 'productName', '')
            this.$set(this.queryParams, 'processType', '')
            this.$nextTick(() => {
                this.$refs.ruleForm.clearValidate()
            })
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onFormSearch (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.onSearch()
                } else {
                    return false
                }
            })
            // this.onSearch ()
        }
    }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog {
    min-width: 350px;
}
/deep/ .el-dialog__body {
    min-height: 256px;
}
.add-tags-dialog {
    padding-top: 20px;
}
.padd20 {
    padding: 0 20px;
}
</style>
