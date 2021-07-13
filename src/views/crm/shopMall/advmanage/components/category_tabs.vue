
<template>
    <div class="banner-tab">
        <div class="baner-btn mb20">
            <el-button type="primary">新增品类推荐</el-button>
        </div>
        <hosJoyTable isShowIndex ref="hosjoyTable" align="center"  border stripe :column="tableLabel" :data="tableData" actionWidth='250'
        :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="onFindList"  isAction :isActionFixed='tableData&&tableData.length>0'>
            <template #action="slotProps">

                <h-button table @click="onDelete(slotProps.data.row)">上移</h-button>
                <h-button table @click="onDelete(slotProps.data.row)">下移</h-button>
                <h-button table @click="onDelete(slotProps.data.row)">取消推荐</h-button>

            </template>
        </hosJoyTable>
        <el-dialog title="新增banner" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="选择品类：" prop="name">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品类图标：" prop="name">
                    <OssFileHosjoyUpload v-model="ruleForm.payVouchers" :showPreView='true' :fileSize=1 :fileNum=1 :uploadParameters='uploadParameters' @successCb="$refs.form.clearValidate()" accept=".jpg,.png,.jpeg">
                    </OssFileHosjoyUpload>
                    <p>（品类图标格式为JGP/JPEG/PNG等主流格式图片，最大不超过1M）</p>
                    <p>注意：推荐后，该品类信息将出现在小程序首页~</p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'

import { CreateElement } from 'vue'

@Component({
    name: 'Categorytabs',
    components: {
        hosJoyTable,
        OssFileHosjoyUpload
    }
})
export default class Categorytabs extends Vue {
        // @Prop({ default: '' }) readonly data!:RespLoanHandoverInfo
        @Prop({ default: '' }) readonly userInfo!:any
        @Prop({ default: '' }) readonly paymentOrderId!:any
        $refs!: {
            form: HTMLFormElement
        }
        uploadParameters = {
            updateUid: '',
            reservedName: false
        }
        dialogVisible:boolean = false
        ruleForm:object={
            payVouchers: []
        }
        page = {
            sizes: [10, 20, 50, 100],
            total: 0
        }

        tableData:any[] | [] = []

        tableLabel: tableLabelProps = [
            { label: '品类顺序', prop: 'deviceBrand', width: '120' },
            { label: '品类名称', prop: 'upstreamSupplierName', width: '120' },
            { label: '品类图标', prop: 'upstreamSupplierType', width: '150' },
            { label: '更新人', prop: 'upstreamPayType', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] },
            { label: '更新时间', prop: 'upstreamPayType', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] }
        ]

        get rules () {
            let rules = {
                name: [
                    { required: true, message: '请选择变更交接状态', trigger: 'change' }
                ]
            }
            return rules
        }

        handleClose () {
            this.dialogVisible = false
            this.$refs['ruleForm'].clearValidate()
        }

        onFindList () {

        }
}
</script>
<style lang='scss' scoped>
// @import "./css.scss";
</style>
