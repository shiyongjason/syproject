<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">基本信息</div>
            <div class="query-cont-row">
                <el-form :model="floorForm" :inline="true" :rules="rules" ref="floorForm" label-width="130px" class="demo-ruleForm">
                    <el-row>
                        <el-form-item label="申请单号：" prop="floorName">
                            <el-input v-model.trim="floorForm.floorName" maxlength="30"></el-input>
                        </el-form-item>
                        <el-form-item label="项目：" prop="floorName">
                            <el-input v-model.trim="floorForm.floorName" @blur="onInputBlur" maxlength="30">
                                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                            </el-input>
                            xxxxxx
                        </el-form-item>
                        <el-form-item label="所属分部：">
                            <el-input v-model.trim="floorForm.floorName" maxlength="10" disabled></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="经销商：">
                            <el-input v-model.trim="floorForm.floorName" maxlength="10" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="收票人：" prop="floorName">
                            <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="发票金额：" prop="floorName">
                            <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="收票人手机：" prop="floorName">
                            <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-form-item label="收票地址：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息：" prop="floorName">
                        <el-input type="textarea" v-model="floorForm.floorName" :autosize="{ minRows: 6, maxRows: 8}"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="floor-tit">发票明细</div>
            <div class="mb20 mt20">
                <h-button type="primary" @click="handleAdd">添加</h-button>
            </div>
            <hosJoyTable ref="multipleTable" align="center" border :column="tableLabel" :data="tableData" actionWidth='100' isAction :max-height="500" :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <el-button size="mini" type="primary" @click="handelDelete(slotProps.data)">删除</el-button>
                </template>
            </hosJoyTable>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
                <hosJoyTable ref="hosjoyTable2" align="center" border stripe @selection-change="handleSelectionChange" isShowselection :column="formTableLabel" :data="tableForm" actionWidth='200'>
                </hosJoyTable>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSelect">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="项目" :visible.sync="projectVisible" width="50%" :before-close="()=>{projectVisible = false}">
                <div class="project_wrap">
                    <el-row class="mb20">
                         <el-input v-model="input" placeholder="可输入项目编号或者项目名称模糊查询"><el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button></el-input>
                    </el-row>
                    <hosJoyTable ref="hosjoyTable2" align="center" border stripe :column="projectTableLabel" :data="tableForm" showPagination :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='330'>
                        <template #code="slotProps">
                            <el-radio :label="slotProps.data.$index" v-model="radio" @change.native="getCurrentRow(slotProps.data)">{{''}}</el-radio>
                        </template>
                    </hosJoyTable>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="projectVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSelect">确 定</el-button>
                </span>
            </el-dialog>
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
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
@Component({
    name: 'Servicedetail',
    components: {
        hosJoyTable
    }
})

export default class Serviceedit extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    @Action('setNewTags') setNewTags!: Function

    isDisabled: boolean = true
    dialogVisible:boolean = false
    projectVisible:boolean = false
    selectRow = []
    selectData = []
    radio = ''
    queryParams:Record<string, any>={
        pageNumber: 1,
        pageSize: 10
    }
    floorForm: any={
        floorName: '',
        reqBossFloorSpuList: []
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
    projectTableLabel: tableLabelProps = [
        { label: '选择',
            prop: 'code',
            slot: 'code'
        },
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
            ]
        }
        return rules
    }

    handleSelectionChange (val) {
        this.selectData = val
        console.log('val: ', val)
    }
    handleAdd () {
        // 发票添加
        this.dialogVisible = true
    }

    handleClose () {
        this.dialogVisible = false
    }
    handleSearch () {
        // 查询项目
        this.projectVisible = true
    }
    getCurrentRow (row) {
        console.log('row: ', row.row)
        this.radio = row.$index
    }

    async onInputBlur ({ target }) {
        console.log('val: ', target.value)
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

    getList () {

    }

    async mounted () {
        this.tableData = [{ id: 200, code: 11111, name: 2222 }]
        this.tableForm = [{ id: 201, code: 32, name: 3234, categoryPath: 555 }, { id: 200, code: 11111, name: 2222 }]
    }
}
</script>

<style lang='scss' scoped>
@import "./css/css.scss";
</style>