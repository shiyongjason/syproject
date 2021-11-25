<template>
    <div>
        <el-dialog title="临时提额设置" :visible.sync="isVisible" :close-on-click-modal=false width="800px" :before-close="handleCancel">
            <div class="set-wrap">
                <div class="set-wrap-head">
                    {{ $parent.companyName }}
                    <el-button size="mini" type="primary" @click="handleAdd">新增临时额度</el-button>
                </div>
                <hosJoyTable ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='100' isAction :isActionFixed='tableData&&tableData.length>0'>
                    <template #status="slotProps">
                        <el-tag :type="slotProps.data.row.status == 0 ? 'success':'info'">{{ slotProps.data.row.status == 0 ? '生效中' : '已失效' }}</el-tag>
                    </template>
                    <template #action="slotProps">
                        <h-button table v-if="slotProps.data.row.status == 0" @click="handleLose(slotProps.data.row)">手动失效</h-button>
                    </template>
                </hosJoyTable>

            </div>
            <span slot="footer" class="dialog-footer">
                <h-button type="assist" @click="handleCancel">取 消</h-button>
            </span>
        </el-dialog>
        <el-dialog title="新增临时额度" :visible.sync="isAddVisible" :close-on-click-modal=false width="650px" :before-close="handleAddBack">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
                <el-form-item label="临时额度：" prop="quotaAmount">
                    <el-input v-model="ruleForm.quotaAmount" v-isNum:6 v-inputMAX='10000'><template slot="append">万元</template></el-input>
                </el-form-item>
                <el-form-item label="额度到期时间：" prop="expireTime">
                    <el-date-picker v-model="ruleForm.expireTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :picker-options="grantOptions" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input type="textarea" v-model="ruleForm.remark" maxlength="200"></el-input>
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import * as Api from '../api/index'
import { deepCopy } from '@/utils/utils'
@Component({
    name: 'SetInfoDialog',
    components: {
        hosJoyTable
    }
})
export default class SetInfoDialog extends Vue {
    $refs!: { form: HTMLFormElement, ruleForm: HTMLFormElement }
    @State('userInfo') userInfo: any
    // 定义变量
    private isVisible:boolean = false
    private isAddVisible:boolean = false
    ruleForm:Record<string, any>={
        expireTime: '',
        quotaAmount: '',
        remark: ''
    }
    _ruleForm:Record<string, any>={
        expireTime: '',
        quotaAmount: '',
        remark: ''
    }
    queryParams:Record<string, any>={
        pageNumber: 1,
        pageSize: 10
    }
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData = []
    tableLabel:tableLabelProps = [
        { label: '临时额度（万元）', prop: 'quotaAmount', width: '120' },
        { label: '状态', prop: 'status', width: '130', slot: 'status' },
        { label: '额度到期时间', prop: 'expireTime', width: '150' },
        { label: '修改人', prop: 'updateBy', width: '150' },
        { label: '修改时间', prop: 'updateTime', width: '180' }
    ]

    get rules () {
        return {
            quotaAmount: [
                { required: true, message: '请输入临时额度', trigger: 'blur' }
            ],
            expireTime: [
                { required: true, message: '请选择额度到期时间', trigger: 'change' }
            ]
        }
    }

    get grantOptions () {
        return {
            disabledDate (time) {
                return Date.now() > time.getTime()
            }
        }
    }

    // methods
    onOpenDialog () {
        this.isVisible = true
        this.getList()
    }

    async getList () {
        const dataJson = {
            ...this.queryParams,
            companyId: (this as any).$parent?.companyId
        }
        const { data } = await Api.temporaryQuotaList(dataJson)
        this.tableData = data.records
        this.page.total = data.total
    }
    handleAdd () {
        this.isAddVisible = true
        this.ruleForm = deepCopy(this._ruleForm)
    }
    // 手动失效
    handleLose (value) {
        const h = this.$createElement
        this.$msgbox({
            message: h('div', null, [
                h('p', null, '是否确认手动失效该额度？'),
                h('p', [
                    h('span', { style: 'color: red' }, '失效后额度将不可用，'),
                    h('span', null, '你还要继续吗？')
                ])
            ]),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: async (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true
                    instance.confirmButtonText = '执行中...'
                    try {
                        await Api.manualLose({ id: value.id })
                        this.getList()
                        this.$message.success('设置成功，已失效')
                    } catch (error) {
                        this.$message.error('设置失败，请重试')
                    }
                    done()
                    instance.confirmButtonLoading = false
                } else {
                    done()
                }
            }
        })
    }
    // 新增临时额度提交
    handleSumbit () {
        this.$refs['ruleForm'].validate(async (valid) => {
            if (valid) {
                const dataJson = {
                    ...this.ruleForm,
                    createBy: this.userInfo.employeeName,
                    companyId: (this as any).$parent?.companyId
                }
                await Api.temporaryQuotaAdd(dataJson)
                this.isAddVisible = false
                this.getList()
            }
        })
    }
    // 新增临时额度关闭
    handleAddBack () {
        this.isAddVisible = false
        this.$refs.ruleForm.resetFields()
    }
    // 临时提额设置关闭
    handleCancel () {
        this.isVisible = false
    }
}

</script>
<style lang="scss" scoped>
/deep/.el-dialog .el-input {
    width: auto !important;
}
.set-wrap {
    &-head {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }
}
</style>