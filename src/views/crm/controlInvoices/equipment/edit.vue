<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">基本信息</div>
            <div class="query-cont-row">
                <el-form :model="floorForm" :inline="true" :rules="rules" ref="floorForm" label-width="150px" class="demo-ruleForm">
                    <el-form-item label="申请单号：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="支付单号：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="项目：" prop="floorName">
                        xxxxx
                    </el-form-item>
                    <el-form-item label="经销商：" prop="floorName">
                        xxxxxxx
                    </el-form-item>
                    <el-form-item label="上游供应商：" prop="floorName">
                        xxxxxxxx
                    </el-form-item>
                    <el-form-item label="采购发票总金额：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="mis采购订单号：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="mis销售订单号：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="销售发票申请金额：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="销售发票收票人：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="收票人手机：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="收票地址：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分部：" prop="floorName">
                        xxxxxxxx
                    </el-form-item>
                    <el-form-item label="备注信息：" prop="floorName">
                        <el-input type="textarea" v-model="floorForm.floorName" :autosize="{ minRows: 6, maxRows: 8}"></el-input>
                    </el-form-item>
                    <div class="floor-tit">上传附件</div>
                    <el-form-item label="附件：" prop="imageUrls">
                    <HosJoyUpload v-model="floorForm.imageUrls" :multiple='false' :showPreView='true' :fileSize=10 :fileNum=5 :uploadParameters='uploadParameters' :action="action" @successCb="$refs['imageUrls'].clearValidate()" accept=".jpg,.png,.jpeg,.pdf">
                    </HosJoyUpload>
                    </el-form-item>
                </el-form>
            </div>
            <div class="mb20 mt20">
                <h-button  @click="handleAdd">取消</h-button>
                <h-button type="primary" @click="handleAdd">保存</h-button>
                <h-button type="primary" @click="handleAdd">保存并提交</h-button>
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
import { ccpBaseUrl } from '@/api/config'
@Component({
    name: 'Servicedetail',
    components: {
        HosJoyUpload
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

    show: boolean = false
    isDisabled: boolean = true
    dialogVisible:boolean = false
    _category=[]
    selectRow = []
    selectData = []
    floorForm: any={
        floorName: '',
        imageUrls: []
    }

    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableData: any[] = []
    tableLabel: tableLabelProps = [
        { label: '服务流水号', prop: 'code' },
        { label: '支付单号', prop: 'name' },
        { label: '期数', prop: 'categoryPath', width: '300px' },
        { label: '金额', prop: 'brandName' },
        { label: '支付成功时间', prop: 'brandName' }
    ]

    tableForm: any[] = [
    ]

    formTableLabel: tableLabelProps = [
        { label: '服务流水号', prop: 'code' },
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
    handleAdd () {
        this.dialogVisible = true
    }

    handleClose () {
        this.dialogVisible = false
    }

    async onFindList () {

    }

    async onFindCateList () {

    }

    // 删除
    handelDelete (val) {
        console.log('val, index: ', val)
        this.tableData.splice(val.$index, 1)
    }

    handleSelect () {
        this.selectData.map(val => {
            console.log(val, this.tableData, this.tableData.includes(val))
            let _index = this.tableData.findIndex(item => val.id == item.id)
            if (_index >= 0) {
                console.log('_index: ', _index)
                this.$set(this.tableData, _index, val)
            } else {
                this.tableData.push(val)
            }
        })
    }

    async mounted () {
        this.tableData = [{ id: 200, code: 11111, name: 2222 }]
        this.tableForm = [{ id: 201, code: 32, name: 3234, categoryPath: 555 }, { id: 200, code: 11111, name: 2222 }]
    }
}
</script>

<style lang='scss' scoped>
// @import "./css.scss";
</style>