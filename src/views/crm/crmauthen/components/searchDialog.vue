<template>
    <div>
        <el-dialog title="修改客户经理" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" :close-on-click-modal =false>
            <div class="mb20">
                <el-input placeholder="请输入" v-model="name">
                    <template slot="append" ><el-button @click="onSearch">搜索</el-button></template>
                </el-input>
            </div>
            <div class="search_scroll">
            <HosJoyTable localName="V1.*" ref="hosjoyTable" align="center" isShowselection
             :filterMultiplee="false" :column="tableLabel" :data="tableData"  filterMultiple=false
              @select-all="dialogCheck" @select="dialogCheck" @selection-change="dialogCheckChange"
              >
            </HosJoyTable>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onSureSearch">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import HosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { findEmployeeDept, updateCustomerAdmin } from './../api/index'
export default {
    name: 'searchdialog',
    components: { HosJoyTable },
    props: {
        businessDetail: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            name: '',
            dialogVisible: false,
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '姓名', prop: 'psnname' },
                { label: '手机号', prop: 'mobile' },
                { label: '所属分部', prop: 'deptName' }
            ],
            tableData: [],
            paginationInfo: {

            },
            selectioned: '',
            params: {
                'companyId': '',
                'deptDoc': '',
                'deptName': '',
                'name': '',
                'phone': '',
                'userCode': ''
            }
        }
    },
    methods: {
        async onShowSearch (val) {
            this.name = ''
            this.dialogVisible = true
            const { data } = await findEmployeeDept({ name: '' })
            this.tableData = data
            this.params.companyId = val.companyId
        },
        handleClose () {
            this.name = ''
            this.dialogVisible = false
        },
        async onSearch () {
            const { data } = await findEmployeeDept({ name: this.name })
            this.tableData = data
        },
        handleSelectionChange (row) {
            console.log(1, row)
        },
        async onSureSearch () {
            this.params = {
                ...this.params,
                userCode: this.selectioned.psncode,
                phone: this.selectioned.mobile,
                name: this.selectioned.psnname,
                deptName: this.selectioned.deptName,
                deptDoc: this.selectioned.pkDeptDoc
            }
            if (!this.selectioned) {
                this.$message({
                    message: '请先选择客户经',
                    type: 'warning'
                })
                return false
            }
            await updateCustomerAdmin(this.params)
            this.dialogVisible = false
            this.$message({
                message: '修改成功',
                type: 'success'
            })
            this.$emit('onEditCustomerInfo', this.selectioned.psnname)
        },
        dialogCheck (selection, row) {
            this.$refs.hosjoyTable.clearSelection()
            if (selection.length === 0) { // 判断selection是否有值存在
                return
            }
            if (row) {
                this.selectioned = row
                this.$refs.hosjoyTable.toggleRowSelection(row, true)
            }
        },
        dialogCheckChange (row) {
            if (row.length === 0) {
                this.selectioned = null
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.search_scroll{
    height: 400px;
    overflow-y: scroll;
}
</style>