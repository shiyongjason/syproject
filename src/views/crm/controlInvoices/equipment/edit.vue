<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">基本信息</div>
            <div class="query-cont-row">
                <el-form :model="equipmentForm" :inline="true" :rules="rules" ref="equipmentForm" label-width="150px" class="demo-ruleForm">
                    <el-row>
                        <el-form-item label="申请单号：" prop="floorName">
                            <el-input v-model.trim="equipmentForm.floorName" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="支付单号：" prop="floorName">
                            <el-input v-model.trim="equipmentForm.floorName" maxlength="10">
                                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="项目：" prop="floorName">
                            xxxxx
                        </el-form-item>
                        <el-form-item label="经销商：" prop="floorName">
                            xxxxxxx
                        </el-form-item>
                        <el-form-item label="上游供应商：" prop="floorName">
                            xxxxxxxx
                        </el-form-item>
                        <el-form-item label="所属分部：" prop="floorName">
                            xxxxxxxx
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="采购发票总金额：" prop="floorName">
                            <el-input v-model.trim="equipmentForm.floorName" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="mis采购订单号：" prop="floorName">
                            <el-input v-model.trim="equipmentForm.floorName" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="mis销售订单号：" prop="floorName">
                            <el-input v-model.trim="equipmentForm.floorName" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="销售发票申请金额：" prop="floorName">
                            <el-input v-model.trim="equipmentForm.floorName" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="销售发票收票人：" prop="floorName">
                            <el-input v-model.trim="equipmentForm.floorName" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="收票人手机：" prop="floorName">
                            <el-input v-model.trim="equipmentForm.floorName" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="收票地址：" prop="floorName">
                            <el-input v-model.trim="equipmentForm.floorName" maxlength="10"></el-input>
                        </el-form-item>
                    </el-row>

                    <el-form-item label="备注信息：" prop="floorName">
                        <el-input type="textarea" v-model="equipmentForm.floorName" :autosize="{ minRows: 6, maxRows: 8}"></el-input>
                    </el-form-item>
                    <div class="floor-tit">上传附件</div>
                    <el-form-item label="附件：" prop="imageUrls">
                        <HosJoyUpload v-model="equipmentForm.imageUrls" :multiple='false' :showPreView='true' :fileSize=10 :fileNum=5 :uploadParameters='uploadParameters' :action="action" @successCb="$refs['imageUrls'].clearValidate()" accept=".jpg,.png,.jpeg,.pdf">
                        </HosJoyUpload>
                    </el-form-item>
                </el-form>
            </div>
            <el-dialog title="支付单号开窗" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" :before-close="()=>{dialogVisible = false}">
                <div class="project_wrap">
                    <el-form :model="searchForm" :inline="true" label-width="100px" class="demo-ruleForm">
                        <el-row>
                            <el-form-item label="支付单编号：">
                                <el-input v-model.trim="searchForm.floorName" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="经销商：">
                                <el-input v-model.trim="searchForm.floorName" maxlength="100">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="上游供应商：">
                                <el-input v-model.trim="searchForm.floorName" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="项目名称：">
                                <el-input v-model.trim="searchForm.floorName" maxlength="100"></el-input>
                            </el-form-item>
                            <el-button @click="handleReset">重 置</el-button>
                            <el-button type="primary" @click="getList">查 询</el-button>
                        </el-row>
                    </el-form>
                    <hosJoyTable ref="hosjoyTable2" align="center" border stripe :column="formTableLabel" :data="tableForm" showPagination :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='330'>
                        <template #code="slotProps">
                            <el-radio :label="slotProps.data.$index" v-model="radio" @change.native="getCurrentRow(slotProps.data)">{{''}}</el-radio>
                        </template>
                    </hosJoyTable>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleAddOrder">确 定</el-button>
                </span>
            </el-dialog>
            <div class="mb20 mt20">
                <h-button>取消</h-button>
                <h-button type="primary" @click="handleSave(1)">保存</h-button>
                <h-button type="primary" @click="handleSave(2)">保存并提交</h-button>
            </div>

        </div>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import filters from '@/utils/filters'
import { RespBossShopFloorDetail } from '@/interface/hbp-shop'
import moment from 'moment'
import { deepCopy } from '@/utils/utils'
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { ccpBaseUrl } from '@/api/config'
@Component({
    name: 'Servicededit',
    components: {
        HosJoyUpload,
        hosJoyTable
    }
})

export default class Servicedetail extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    @Action('setNewTags') setNewTags!: Function
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    action=ccpBaseUrl + 'common/files/upload-old'

    queryParams: Record<string, any> = {

    }
    isDisabled: boolean = true
    dialogVisible:boolean = false
    radio:string=''
    selectRow = []
    selectData = []
    equipmentForm: any={
        floorName: '',
        imageUrls: []
    }
    searchForm:Record<any, any>={

    }
    private _searchForm:Record<any, any>={

    }

    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableForm: any[] = [
    ]

    formTableLabel: tableLabelProps = [
        { label: '服务流水号', prop: 'code', slot: 'code' },
        { label: '支付单号', prop: 'name' },
        { label: '期数', prop: 'categoryPath' },
        { label: '金额', prop: 'brandName' },
        { label: '支付成功时间', prop: 'brandName' },
        { label: '是否全部结清', prop: 'brandName' }
    ]
    // 校验
    get rules () {
        let rules = {
            floorName: [
                { required: true, message: '请输入楼层名称', trigger: 'blur' }
            ],
            imageUrls: [
                { required: true, message: '请上传品类图标' }
            ]
        }
        return rules
    }

    handleSelectionChange (val) {
        this.selectData = val
        console.log('val: ', val)
    }
    handleSearch () {
        this.dialogVisible = true
    }

    handleReset () {
    // 重置

    }
    async getList () {

    }

    getCurrentRow (row) {
        console.log('row: ', row.row)
        this.radio = row.$index
    }

    async handleSave (type) {
        // 保存
        this.$refs['equipmentForm'].validate(valid => {
            if (valid) {

            }
        })
    }

    handleAddOrder () {
        // 保存订单信息
        this.dialogVisible = false
    }

    async mounted () {
        this.tableForm = [{ id: 201, code: 32, name: 3234, categoryPath: 555 }, { id: 200, code: 11111, name: 2222 }]
    }
}
</script>

<style lang='scss' scoped>
@import "./css/css.scss";
</style>