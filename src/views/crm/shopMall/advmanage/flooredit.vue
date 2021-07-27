<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">楼层信息</div>
            <div class="query-cont-row">
                <el-form :model="floorForm" :rules="rules" ref="floorForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="楼层名称：" prop="floorName">
                        <el-input v-model.trim="floorForm.floorName" maxlength="10"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="floor-tit">选择商品</div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.name" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品类目：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.categoryContent" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品品牌：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.brandName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onFindList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="mb20">
                <h-button type="primary" @click="onBatch" :disabled=isDisabled>批量选择</h-button>
            </div>
            <hosJoyTable ref="multipleTable" v-if="tableData" align="center" isShowIndex border showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="onFindList" :tableRowClassName="rowClass"
                :selectable="selectable" :pageSizes='page.sizes' actionWidth='100' isAction :max-height="500" @selection-change="handleSelectionChange" isShowselection :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <el-button  size="mini" type="primary" v-if="!slotProps.data.row.checked" @click="onSelect(slotProps.data)">选择</el-button>
                    <el-button  size="mini"  v-if="slotProps.data.row.checked" @click="onNoSelect(slotProps.data)">取消选择</el-button>
                </template>
            </hosJoyTable>
            <div class="floor-tit mt20">已选择该楼层的商品</div>
            <!-- 表格操作 -->
            <hosJoyTable ref="hosjoyTable2" v-if="show" align="center" border isShowIndex stripe :column="formTableLabel" :data="tableForm" actionWidth='200' isAction>
                <template #action="slotProps">
                    <h-button table @click="onMove(slotProps.data, 'up')" v-if="slotProps.data.$index!=0">上移</h-button>
                    <h-button table @click="onMove(slotProps.data, 'down')" v-if="slotProps.data.$index!=tableForm.length-1">下移</h-button>
                    <h-button table @click="onCancelChoose(slotProps.data)">取消选择</h-button>
                </template>
            </hosJoyTable>
            <div class="floot-bot">
                <h-button type="" @click="onCancel">取消</h-button>
                <h-button type="primary" @click="onSave">保存</h-button>
            </div>
        </div>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import Bannertabs from './components/banner_tabs.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import Categorytabs from './components/category_tabs.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import Floortabs from './components/floor_tabs.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { getFloorDetail, getSpuPage, saveFloor, getListCategory, editFloor } from './api/index'
import filters from '@/utils/filters'
import { RespBossShopFloorDetail } from '@/interface/hbp-shop'
import moment from 'moment'
import { deepCopy } from '@/utils/utils'

@Component({
    name: 'Flooredit',
    components: {
        Bannertabs,
        Categorytabs,
        Floortabs,
        hosJoyTable
    }
})

export default class Flooredit extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    @Action('setNewTags') setNewTags!: Function

    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    show: boolean = false
    isDisabled: boolean = true
    _category=[]
    selectRow = []
    selectData = []
    private _queryParams = {}
    queryParams: any = {
        pageSize: 10,
        pageNumber: 1,
        name: '',
        categoryContent: '',
        brandName: '',
        isOnShelf: 2
    }

    floorForm: any={
        floorName: '',
        reqBossFloorSpuList: []
    }

    page = {
        sizes: [15, 25, 50, 100],
        // sizes: [10, 15, 50, 100],
        total: 0
    }

    tableData: any[] = []
    tableLabel: tableLabelProps = [
        { label: 'SPU编码', prop: 'code' },
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'categoryPath', width: '300px' },
        { label: '品牌', prop: 'brandName' }
    ]

    tableForm: any[] = [
    ]

    category () {
        return this._category
    }
    formTableLabel: tableLabelProps = [
        { label: 'SPU编码', prop: 'code' },
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'categoryPath' },
        { label: '品牌', prop: 'brandName' },
        {
            label: '类目关联品类',
            prop: 'frontCategoryId',
            width: '300',
            className: 'form-table-header',
            showOverflowTooltip: false,
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        {
                            <el-select
                                class="miniSelect"
                                size="mini"

                                placeholder="请选择"
                                value={scope.row[scope.column.property]}
                                onInput={(val) => {
                                    scope.row[scope.column.property] = val
                                }}
                            // v-model={scope.row[scope.column.frontCategoryId]}
                            >
                                {this.category().map((item, index) => {
                                    return (
                                        <el-option
                                            key={index + 'option'}
                                            value={item.id}
                                            label={item.frontCategoryName}
                                        >
                                            {item.frontCategoryName}
                                        </el-option>
                                    )
                                })}
                            </el-select>
                        }

                    </div>
                )
            }
        }
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

    selectable (row) {
        return !row.checked
    }

    handleSelectionChange (val) {
        this.selectData = val
        this.isDisabled = !(val.length > 0)
    }
    onBatch () {
        if (this.selectData.length > 0) {
            let _data = this.selectData
            _data.map((item) => {
                if (this.tableForm.length > 0) {
                    let _index = this.tableForm.findIndex(val => val.id == item.id)
                    if (_index == -1) {
                        // 去重 push 到下面的table表格里面
                        this.tableForm.push(item)
                    }
                } else {
                    this.tableForm.push(item)
                }
                this.$set(item, 'checked', true)
            })
        } else {
            this.$message.warning('请选择商品')
        }
    }
    // 选中行 换色
    rowClass ({ row, rowIndex }) {
        if (row.checked) {
            return 'slectRowColor '
        }
    }

    onReset () {
        this.queryParams = deepCopy(this._queryParams)
        this.onFindList()
    }

    async onFindList () {
        const { data: spu } = await getSpuPage(this.queryParams)
        this.page.total = spu.total as number
        // 查询时候 查下最新的是否选中状态
        if (this.tableForm.length > 0) {
            this.tableForm.map((jtem, jndex) => {
                spu.records.length > 0 && spu.records.map((item:any, index) => {
                    if (jtem.id == item.id) {
                        item.checked = true
                    }
                })
            })
        }
        this.tableData = [...spu.records]
        console.log(this.tableData)
    }

    async onFindCateList () {
        const { data } = await getListCategory()
        this._category = data
        this.show = true
    }

    onSelect (val) {
        this.$set(this.tableData[val.$index], 'checked', true)
        this.tableForm.push(val.row)
        this.$refs['multipleTable'].toggleRowSelection(val.row)
        this.$forceUpdate()
    }
    onNoSelect (val) {
        this.$set(this.tableData[val.$index], 'checked', false)
        // this.$set(val.row, 'checked', false)
        let _arr = this.tableForm.filter(i => val.row.id == i.id)
        if (_arr.length > 0) {
            let one = this.tableForm.findIndex(value => {
                return value.id == _arr[0].id
            })
            this.tableForm.splice(one, 1)
        }
        this.$refs['multipleTable'].clearSelection()
    }
    onMove (val, type) {
        let index = val.$index
        if (type == 'up') {
            let temp = this.tableForm[index - 1]
            this.$set(this.tableForm, index - 1, this.tableForm[index])
            this.$set(this.tableForm, index, temp)
        } else {
            let i = this.tableForm[index + 1]
            this.$set(this.tableForm, index + 1, this.tableForm[index])
            this.$set(this.tableForm, index, i)
        }
    }

    // @Watch('selectData') private onSelectData (data) {
    //     console.log(111, data)
    //     this.selectRow = []
    //     if (data.length > 0) {
    //         data.forEach((item, index) => {
    //             this.selectRow.push(item.id)
    //         })
    //     }
    // }
    onCancelChoose (val) {
        let _arr = this.tableData.filter(i => val.row.id == i.id)
        if (_arr.length > 0) {
            let one = this.tableData.findIndex(value => {
                return value.id == _arr[0].id
            })
            console.log('one', one)
            this.$set(this.tableData[one], 'checked', false)
        }
        this.tableForm.splice(val.$index, 1)
        this.$refs['multipleTable'].clearSelection()
    }

    async onSave () {
        this.floorForm.reqBossFloorSpuList = this.tableForm
        console.log(this.floorForm)
        this.$refs['floorForm'].validate(async (valid) => {
            if (valid) {
                // 保存楼层检验
                if (this.floorForm.reqBossFloorSpuList.length == 0) {
                    this.$message.warning('请选择楼层的商品')
                    return false
                }
                if (this.$route.query.id) {
                    await editFloor(this.floorForm)
                } else {
                    await saveFloor(this.floorForm)
                }
                this.$router.go(-1)

                this.setNewTags((this.$route.fullPath).split('?')[0])
            }
        })
    }

    onCancel () {
        this.$router.go(-1)

        this.setNewTags((this.$route.fullPath).split('?')[0])
    }
    async mounted () {
        if (this.$route.query.id) {
            const { data } = await getFloorDetail(this.$route.query.id)
            this.tableForm = data.respBossFloorSpuList || []
            this.floorForm = { ...data }
        }
        this.onFindList()
        this.onFindCateList()
        this._queryParams = deepCopy(this.queryParams)
    }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>