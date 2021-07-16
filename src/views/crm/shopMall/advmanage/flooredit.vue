<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="floor-tit">楼层信息</div>
            <div class="query-cont-row">
                <el-form :model="floorForm" :rules="rules" ref="floorForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="楼层名称：" prop="floorName">
                        <el-input v-model="floorForm.floorName"></el-input>
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
                    <h-button>重置</h-button>
                </div>
            </div>
            <div class="mb20">
                <h-button type="primary">批量选择</h-button>
            </div>
            <hosJoyTable ref="hosjoyTable" align="center" border showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="onFindList" :tableRowClassName="rowClass"  :selectable="selectable"   :pageSizes='page.sizes'
               actionWidth='250' isAction :height="500" @selection-change="handleSelectionChange" isShowselection :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table v-if="!slotProps.data.row.checked" @click="onSelect(slotProps.data)">选择</h-button>
                    <h-button table v-if="slotProps.data.row.checked" @click="onNoSelect(slotProps.data)">取消选择</h-button>
                </template>
            </hosJoyTable>
            <div class="floor-tit mt20">已选择该楼层的商品</div>
            <!-- 表格操作 -->
            <hosJoyTable ref="hosjoyTable" align="center" border stripe :column="formTableLabel" :data="tableForm" isAction>
                <template #action="slotProps">
                    <h-button table @click="onMove(slotProps.data, 'up')" v-if="slotProps.data.$index!=0">上移</h-button>
                    <h-button table @click="onMove(slotProps.data, 'down')" v-if="slotProps.data.$index!=tableForm.length-1">下移</h-button>
                    <h-button table @click="onCancelChoose(slotProps.data.row)">取消选择</h-button>
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
import { getFloorDetail, getSpuPage, saveFloor, getListCategory } from './api/index'
import filters from '@/utils/filters'
import { RespBossShopFloorDetail } from '@/interface/hbp-shop'
import moment from 'moment'

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
        @State('userInfo') userInfo: any
        uploadParameters = {
            updateUid: '',
            reservedName: false
        }
        category=[]
        selectRow = []
        selectData = []
        private _queryParams = {}
        queryParams: any = {
            pageSize: 10,
            pageNumber: 1,
            name: '',
            categoryContent: '',
            brandName: ''
        }

        floorForm:object={
            floorName: '',
            reqBossFloorSpuList: []
        }

        page = {
            // sizes: [15, 25, 50, 100],
            sizes: [10, 15, 50, 100],
            total: 0
        }

        tableData:any[] = []
        tableLabel:tableLabelProps = [
            { label: 'SPU编码', prop: 'code' },
            { label: '商品名称', prop: 'name' },
            { label: '商品类目', prop: 'categoryPath' },
            { label: '品牌', prop: 'brandName' }
        ]

        tableForm: any[] = [
        ]
        formTableLabel: tableLabelProps = [
            { label: 'SPU编码', prop: 'spuCode' },
            { label: '商品名称', prop: 'spuName' },
            { label: '商品类目', prop: 'categoryPath' },
            { label: '品牌', prop: 'brandName' },
            {
                label: '类目关联品类',
                prop: 'frontCategoryName',
                width: '300',
                className: 'form-table-header',
                showOverflowTooltip: false,
                render: (h: CreateElement, scope: TableRenderParam) => {
                    return (
                        <div>
                          123  {this.category}
                            <el-select
                                class="miniSelect"
                                size="mini"
                                placeholder="请选择"
                                value={scope.row[scope.column.frontCategoryId]}
                                onInput={(val) => {
                                    scope.row[scope.column.frontCategoryId] = val
                                }}
                            >
                                {this.category.map((item, index) => {
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
        }
        // 选中行 换色
        rowClass ({ row, rowIndex }) {
            if (row.checked) {
                return 'slecleRowColor '
            }
        }

        async onFindList () {
            const { data: spu } = await getSpuPage(this.queryParams)
            this.tableData = spu.records
            this.page.total = spu.total as number
            // 查询时候 查下状态

            if (this.tableForm.length > 0) {
                this.tableData && this.tableData.map((item, index) => {
                    console.log(22)
                    this.tableForm.map((jtem, index) => {
                        if (jtem.id == item.id) {
                            item.checked = true
                        }
                    })
                })
            }
        }

        async onFindCateList () {
            const { data } = await getListCategory()
            this.category = data
            console.log(this.category)
        }

        onSelect (val) {
            console.log('spuCode', val)
            // val.row.checked = true
            this.$set(this.tableData[val.$index], 'checked', true)
            this.tableForm.push(val.row)
            setTimeout(() => {
                this.onFindCateList()
            }, 0)
        }
        onNoSelect (val) {
            this.$set(val.row, 'checked', false)
            let _arr = this.tableForm.filter(i => val.id == i.id)
            let one = _arr.length > 0 && this.tableForm.indexOf(_arr[0])
            console.log('one', one)
            this.tableForm.splice(one, 1)
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
            console.log(val)
            let _arr = this.tableData.filter(i => val.id == i.id)
            if (_arr.length > 0) {
                let one = this.tableData.indexOf(_arr[0])
                this.$set(this.tableData[one], 'checked', false)
                this.tableForm.splice(val.$index, 1)
            }
        }

        onSave () {
            saveFloor(this.floorForm)
        }

        onCancel () {
            this.$router.push('/goodwork/advmanage')
        }
        async mounted () {
            if (this.$route.query.id) {
                const { data } = await getFloorDetail(this.$route.query.id)
                this.tableForm = data.respBossFloorSpuList || []
            }
            this.onFindList()
        }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>
