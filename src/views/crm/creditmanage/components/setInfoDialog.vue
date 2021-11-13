<template>
    <div>
        <el-dialog title="临时提额设置" :visible.sync="isVisible" :close-on-click-modal=false width="800px" :before-close="handleCancel">
            <div class="set-wrap">
                <div class="set-wrap-head">
                    江苏舒适云信息技术有限公司
                    <el-button size="mini" type="primary" @click="handleAdd">新增临时额度</el-button>
                </div>
                <hosJoyTable  ref="hosjoyTable" align="center"  border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='100'
                    isAction :isActionFixed='tableData&&tableData.length>0' >
                    <h-button table>确认已网银支付</h-button>
                </hosJoyTable>

            </div>
            <span slot="footer" class="dialog-footer">
                <h-button type="assist" @click="handleCancel">取 消</h-button>
                <h-button type="primary" @click="handleSumbit">确 定</h-button>
            </span>
        </el-dialog>
        <el-dialog title="新增临时额度" :visible.sync="isAddVisible" :close-on-click-modal=false width="650px" :before-close="handleAddBack">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="临时额度：" prop="name">
                    <el-input v-model="ruleForm.name" v-isNum:6 v-inputMAX='100000000'></el-input>
                </el-form-item>
                <el-form-item label="额度到期时间：" prop="date2">
                    <el-date-picker v-model="ruleForm.date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :picker-options="grantOptions" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input type="textarea" v-model="ruleForm.desc" maxlength="200"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button type="assist" @click="handleAddBack">返 回</h-button>
                <h-button type="primary" @click="handleSumbit">保 存</h-button>
            </span>
        </el-dialog>
    </div>

</template>
<script lang="tsx">
import moment from 'moment'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件

@Component({
    name: 'SetInfoDialog',
    components: {
        hosJoyTable
    }
})
export default class SetInfoDialog extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    // 定义变量
    private isVisible:boolean = false
    private isAddVisible:boolean = false
    ruleForm:Record<string, any>={
        date: moment().format('YYYY-MM-DD')
    }
    queryParams:Record<string, any>={
        pageNumber: 1
    }
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData = []
    tableLabel:tableLabelProps = [
        { label: '临时额度（万元）', prop: 'paymentOrderNo', width: '120' },
        { label: '状态', prop: 'deptName', width: '130' },
        { label: '额度到期时间', prop: 'companyName', width: '150' },
        { label: '修改时间', prop: 'supplierCompanyName', width: '180' }
    ]
    // form rules
    get rules () {
        return {
            name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' }
            ]
        }
    }

    get grantOptions () {
        return {
            disabledDate (time) {
                return Date.now() > time.getTime() + 8.64e7// 如果当天可选，就不用减8.64e7
            }
        }
    }

    // methods
    onOpenDialog (val) {
        this.isVisible = true
    }

    getList () {

    }

    handleAdd () {
        this.isAddVisible = true
    }

    handleSumbit () {

    }

    handleCancel () {
        this.isVisible = false
    }

    handleAddBack () {
        this.isAddVisible = false
    }
}

</script>
<style lang="scss" scoped>
/deep/.el-dialog .el-input{
    width: auto !important;
}
.set-wrap{
    &-head{
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }
}
</style>