
<template>
    <div class="banner-tab">
        <div class="baner-btn mb20">
            <el-button type="primary" @click="onAddBanner">新增banner</el-button>
        </div>
        <hosJoyTable isShowIndex ref="hosjoyTable" align="center"  border stripe :column="tableLabel" :data="tableData" actionWidth='250' isAction :isActionFixed='tableData&&tableData.length>0'>
            <template #action="slotProps">
                <div v-if="!slotProps.data.row.homePage">
                    <h-button table @click="onEditLive(slotProps.data.row)">编辑</h-button>
                    <h-button table v-if="slotProps.data.row.status==1" @click="onPutHome(slotProps.data.row)">删除</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)">启用</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)">上移</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)">下移</h-button>
                </div>
                <div v-else>
                    <h-button table @click="onNoHome(slotProps.data.row)">停用</h-button>
                </div>
            </template>
        </hosJoyTable>
        <el-dialog title="新增banner" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="banner名称：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="bannar位置：" prop="name">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转链接：" >
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                 <el-form-item label="banner图：" prop="name">
                        <OssFileHosjoyUpload v-model="ruleForm.payVouchers" :showPreView='true' :fileSize=20 :fileNum=1 :uploadParameters='uploadParameters' @successCb="$refs.form.clearValidate()" accept=".jpg,.png,.jpeg">
                        </OssFileHosjoyUpload>
                        <p>图片尺寸为750*300，不超过2M，仅支持jpeg、jpg、png格式</p>
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
    name: 'Bannertabs',
    components: {
        hosJoyTable,
        OssFileHosjoyUpload
    }
})
export default class Bannertabs extends Vue {
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
            { label: 'bannar名称', prop: 'deviceBrand', width: '120' },
            { label: 'bannar图', prop: 'upstreamSupplierName', width: '120' },
            { label: '跳转链接', prop: 'upstreamSupplierType', width: '150', dicData: [{ value: 1, label: '厂商' }, { value: 2, label: '代理商' }, { value: 3, label: '经销商' }] },
            { label: 'banner位置', prop: 'upstreamPayType', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] },
            { label: '创建时间',
                prop: 'deviceCategoryType',
                render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                    return (
                        <div>
                        1
                        </div>
                    )
                }
            },
            { label: 'bannar状态', prop: 'upstreamPayType', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '银行承兑' }] }
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
        onAddBanner () {
            this.dialogVisible = true
        }
}
</script>
<style lang='scss' scoped>
// @import "./css.scss";
</style>
