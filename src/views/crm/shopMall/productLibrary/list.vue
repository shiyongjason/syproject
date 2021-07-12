<template>
    <div class="page-body B2b ProductLibrary">
        <div class="page-body-cont">

            <!--  -->
            <el-tabs v-model="activeName" type="card" @tab-click="handleTabsClick">
                <el-tab-pane label="SPU" name="SPU"></el-tab-pane>
                <el-tab-pane label="SKU" name="SKU"></el-tab-pane>
            </el-tabs>
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.name" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品类目：</div>
                    <div class="query-col__input">
                        <el-cascader :options="categoryOptions" :props="props" multiple collapse-tags v-model="queryParams.categoryIds" clearable @change="productCategoryChange"></el-cascader>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品品牌：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.brandName" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品型号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.model" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">SPU编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.spuCode" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col" v-if="activeName=='SKU'">
                    <div class="query-col__label">SKU编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.skuCode" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>

            </div>
            <div class="flexlayout">
                <el-checkbox-group v-model="checkList" @change="handleCheckBox">
                    <el-checkbox :label="item.value" v-for="item in checkboxOptions" :key="item.label">{{item.label}}</el-checkbox>
                </el-checkbox-group>
                <div class="search-btn">
                    <h-button type="primary" @click="getList">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <h-button type="create" class="bulkPull" @click="onAddNew">新增商品</h-button>
            <h-button type="primary" class="bulkPull" style="margin:0 10px" v-if="activeName=='SKU'" @click="Bulk">批量上架</h-button>
            <h-button type="assist" class="bulkPull"  v-if="activeName=='SKU'" @click="Batch">批量下架</h-button>
            <h-button class="bulkPull" style="margin-left:10px"  v-if="activeName=='SKU'" @click="Del">批量删除</h-button>
            <hosJoyTable v-if="resetTable" :isShowselection="activeName=='SKU'" @selection-change="selectChange" :localName="activeName=='SPU'?'V3.10.SPU.*':'V3.10.SKu.*'" ref="hosjoyTable" collapseShow align="center" border stripe showPagination :column="activeName=='SPU'?tableLabel:tableLabelOfSku" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='100' :row-class-name="tableRowClassName" >
            </hosJoyTable>
            <!-- 「编辑」：下架SPU、待编辑SPU可编辑，上架SPU的「编辑」按钮置灰，点击「编辑」按钮，进入SKU详情页； -->
        </div>
        <el-dialog title="上架提醒" :visible.sync="sellDialog" :close-on-click-modal="false" :before-close="()=>sellDialog=false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                请先完善SPU信息，再尝试上架当前商品
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="()=>sellDialog=false">取 消</el-button>
                <el-button type="primary" @click="onGoToEditSPU">去完善</el-button>
            </span>
        </el-dialog>
        <el-dialog title="删除确认" :visible.sync="delDialog" :close-on-click-modal="false" :before-close="()=>delDialog=false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                确定删除当前商品吗？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="()=>delDialog=false">取 消</el-button>
                <el-button type="primary" >确定删除<!--success 删除成功！ --></el-button>
            </span>
        </el-dialog>
        <el-dialog title="上架确认" :visible.sync="onTheShelvesDialog" :close-on-click-modal="false" :before-close="() => onTheShelvesDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                确定上架当前商品吗？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => onTheShelvesDialog = false">取 消</el-button>

                <el-button type="primary" >确定上架<!--success 上架成功！ --></el-button>
            </span>
        </el-dialog>
        <el-dialog title="下架确认" :visible.sync="rackDialog" :close-on-click-modal="false" :before-close="() => onTheShelvesDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                确定下架当前商品吗？
                <!-- 红色提示文字：若当前商品不存在任何推荐位置时，不展示此内容。1 当前商品在【楼层管理】、【品牌管理】、【严选推荐】被选用  2 当前商品在【楼层管理】严选推荐】被选用 3当前商品在【严选推荐】被选用 -->
                <div style="color:#f00;marginTop:10px">当前商品在xxxxx被选用</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => onTheShelvesDialog = false">取 消</el-button>
                <el-button type="primary" >确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang='tsx'>
import { ElForm } from 'element-ui/types/form'
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import elImageAddToken from '@/components/elImageAddToken/index.vue'
import { getSpuList, getSkuList, batchDelete } from './api/index'
import utils from '@/utils/filters'
import { RespBossSku } from '@/interface/hbp-shop'
const _queryParams = {
    name: '',
    categoryIds: [],
    brandName: '',
    model: '',
    spuCode: '',
    skuCode: '',
    status: '',
    isOnShelf: '',
    pageNumber: 1,
    pageSize: 10
}
@Component({
    name: 'crmshopMallProductLibrary',
    components: { hosJoyTable, elImageAddToken }
})
export default class ProductLibrary extends Vue {
    @Getter('category/categoryOptions') categoryOptions: any
    @Action('category/findAllCategory') findAllCategory: Function
    resetTable:boolean = true
    checkList = []
    spuCheckboxOptions = [{ label: '只看上架SPU', value: 'isOnShelf:1' }, { label: '只看下架SPU', value: 'isOnShelf:0' }, { label: '只看待编辑SPU', value: 'status:0' }]
    skuCheckboxOptions = [{ label: '只看上架SKU', value: 'isOnShelf:1' }, { label: '只看下架SKU', value: 'isOnShelf:0' }, { label: '只看待编辑SKU', value: 'status:0' }]
    checkboxOptions = this.spuCheckboxOptions
    activeName = 'SPU'
    props = { multiple: true }
    queryParams: typeof _queryParams = JSON.parse(JSON.stringify(_queryParams))
    page:any = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData:RespBossSku[] = []
    sellDialog:boolean = false
    delDialog:boolean = false
    onTheShelvesDialog:boolean = false
    rackDialog:boolean = false
    Selection = [] // 列表选择

    // spu 列表
    tableLabel: tableLabelProps = [
        { label: 'SPU编码', prop: 'code' },
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'categoryContent' },
        { label: '商品品牌', prop: 'brandName' },
        { label: '商品型号', prop: 'model' },
        {
            label: '销售价', // 销售价是否可见 0：否 1：是
            prop: 'name',
            render: (h, scope) => {
                return (
                    <div>
                        {!scope.row.priceVisible ? '不展示'
                            : scope.row.minSalePrice === null && scope.row.minSalePrice === null ? '-' : <span>{utils.money(scope.row.minSalePrice)}-{utils.money(scope.row.maxSalePrice)}</span>
                        }
                    </div>
                )
            }
        },
        {
            label: '商品类别', // status 编辑状态 0：草稿 1：已提交     isOnShelf 0:下架 1:上架
            prop: 'name',
            render: (h, scope) => {
                return (
                    <div>
                        {
                            !scope.row.status ? '待编辑SPU'
                                : scope.row.isOnShelf == 1 ? '上架SPU'
                                    : scope.row.isOnShelf == 0 ? '下架SPU' : ''
                        }
                    </div>
                )
            }
        },
        {
            label: '操作',
            width: '150px',
            // 「编辑」：下架SPU、待编辑SPU可编辑，上架SPU的「编辑」按钮置灰，点击「编辑」按钮，进入SPU详情页；
            render: (h, scope) => {
                return <h-button table disabled={!!(scope.row.status == 1 && scope.row.isOnShelf == 1)}>编辑</h-button>
            }
        }
    ]

    // sku 列表
    tableLabelOfSku: tableLabelProps = [
        { label: 'SKU编码', prop: 'code' },
        { label: 'SPU编码', prop: 'spuCode' },
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'categoryPath' },
        { label: '商品品牌', prop: 'brandName' },
        { label: '商品型号', prop: 'model' },
        { label: '商品规格', prop: 'optionValues' },
        {
            label: '商品类别', // status 编辑状态 0：草稿 1：已提交     isOnShelf 0:下架 1:上架
            prop: 'name',
            render: (h, scope) => {
                return (
                    <div>
                        {
                            !scope.row.status ? '待编辑SPU'
                                : scope.row.isOnShelf == 1 ? '上架SPU'
                                    : scope.row.isOnShelf == 0 ? '下架SPU' : ''
                        }
                    </div>
                )
            }
        },
        {
            label: '销售价', // 销售价是否可见 0：否 1：是
            prop: 'name',
            render: (h, scope) => {
                return (
                    <div>
                        {!scope.row.priceVisible ? '不展示'
                            : scope.row.minSalePrice === null && scope.row.minSalePrice === null ? '-' : <span>{utils.money(scope.row.minSalePrice)}-{utils.money(scope.row.maxSalePrice)}</span>
                        }
                    </div>
                )
            }
        },
        {
            label: '操作',
            width: '150px',
            // slot: 'action',
            render: (h, scope) => {
                return (
                    <div>
                        <h-button table onClick={this.onOPenSell}>上架</h-button><h-button table onClick={this.onDelDialog}>删除</h-button>
                    </div>
                )
            }
        }
    ]

    // methods:::

    tableRowClassName ({ row, rowIndex }) {
        console.log('🚀 --- tableRowClassName --- row', row)
        return 'warning-row'
    }
    onAddNew () {
        this.$router.push({ path: '/goodwork/commodityManagement/addProduct' })
    }

    // 上架提醒 Dialog
    onOPenSell () {
        this.sellDialog = true
        console.log('onOPenSell::::::')
    }
    // 去完善SPU
    onGoToEditSPU () {
        //
    }

    // 打开删除确认 Dialog
    onDelDialog () {
    }

    // SPU SKU tab 切换
    handleTabsClick (tab, event) {
        this.checkList = []
        if (tab.name === 'SPU') {
            this.checkboxOptions = this.spuCheckboxOptions
        } else {
            this.checkboxOptions = this.skuCheckboxOptions
        }
        this.onReset()
        this.getList()
        this.resetTable = false
        this.$nextTick(() => {
            this.resetTable = true
        })
    }

    // '只看上架SPU'... 状态查询
    handleCheckBox () {
        this.queryParams.status = ''
        this.queryParams.isOnShelf = ''
        if (this.checkList.length == 0) {
            return
        }
        if (this.checkList.length > 1) {
            this.checkList.splice(0, 1)
        }
        let res = this.checkList[0].split(':')
        let key = res[0]
        let val = res[1]
        this.queryParams[key] = val
    }

    // 商品类目Change
    productCategoryChange () {
        console.log('log::::::')
    }

    // 搜索重置
    onReset () {
        this.queryParams = JSON.parse(JSON.stringify(_queryParams))
        this.checkList = []
        this.getList()
    }

    // 列表选择
    selectChange (val:any[]) {
        this.Selection = []
        val.map(i => {
            this.Selection.push(i.id)
        })
    }
    // 批量下架
    async Batch () {
        // await bulkPullSku({ skuIds: [id] })
        // this.getList()
        // this.$message.success('商品已进入好橙工商品库，可进入商品列表编辑')
        // this.Selection = []
    }
    // 批量上架
    Bulk () {

    }
    // 批量删除
    Del () {

    }

    // getList
    async getList () {
        let query = JSON.parse(JSON.stringify(this.queryParams))
        if (query.categoryIds.length > 0) {
            query.categoryIds = query.categoryIds.toString()
        }
        if (this.activeName == 'SKU') {
            const { data } = await getSkuList(query)
            this.tableData = data.records
            this.page.total = data.total
        } else {
            const { data } = await getSpuList(query)
            this.tableData = data.records
            this.page.total = data.total
        }
    }

    mounted () {
        this.findAllCategory()
        this.getList()
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>