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
                        <el-input v-model="queryParams.name" placeholder="请输入" maxlength="50" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品类目：</div>
                    <div class="query-col__input">
                        <el-cascader :options="categoryOptions" :props="props" multiple collapse-tags v-model="queryParams.categoryIds" clearable ></el-cascader>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品品牌：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.brandName" placeholder="请输入" maxlength="50" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品型号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.model" placeholder="请输入" maxlength="50" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">SPU编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.spuCode" placeholder="请输入" maxlength="50" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col" v-if="activeName=='SKU'">
                    <div class="query-col__label">SKU编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.skuCode" placeholder="请输入" maxlength="50" clearable></el-input>
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
            <div>
                <h-button type="create" class="bulkPull" @click="onAddNew" v-show="activeName=='SPU'" v-if="hosAuthCheck(authSpuAdd)" >新增商品</h-button>
                <h-button type="primary" class="bulkPull" style="margin:0 10px" v-show="activeName=='SKU'" @click="Bulk" v-if="hosAuthCheck(authSkuOn)">批量上架</h-button>
                <h-button type="assist" class="bulkPull"  v-show="activeName=='SKU'" @click="onBatch" v-if="hosAuthCheck(authSkuOff)">批量下架</h-button>
                <h-button class="bulkPull" style="margin-left:10px"  v-show="activeName=='SKU'" @click="Del" v-if="hosAuthCheck(authSkuDel)">批量删除</h-button>
            </div>
            <hosJoyTable v-if="resetTable" :isShowselection="activeName=='SKU'" @selection-change="selectChange" :localName="activeName=='SPU'?'V3.10.SPU.*':'V3.10.SKu.*'" ref="hosjoyTable" collapseShow align="center" border stripe showPagination :column="activeName=='SPU'?tableLabel:tableLabelOfSku" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='100' :pageSizes='page.sizes'>
            </hosJoyTable>
            <!-- 「编辑」：下架SPU、待编辑SPU可编辑，上架SPU的「编辑」按钮置灰，点击「编辑」按钮，进入SKU详情页； -->
        </div>
        <el-dialog title="批量上架确认" :visible.sync="BulkDialog" :close-on-click-modal="false" :before-close="()=>BulkDialog=false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0" v-if="dialogSKU.length==0">
                确定上架这{{Selection.length}}条商品吗？
            </div>
            <div v-else >
                请先完善以下SPU信息，再尝试上架当前商品
                <div style="marginTop:5px">
                    <p v-for="item in dialogSKU" :key="item.id">SPU编码：{{item.spuCode}}</p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer"  v-if="dialogSKU.length==0">
                <el-button @click="()=>BulkDialog=false">取 消</el-button>
                <el-button type="primary" @click="handleBulk">确定上架</el-button>
            </span>
            <span slot="footer" class="dialog-footer" v-else>
                <el-button @click="() => {BulkDialog = false;dialogSKU=[]}">我知道了</el-button>
            </span>
        </el-dialog>
        <el-dialog title="上架提醒" :visible.sync="sellDialog" :close-on-click-modal="false" :before-close="()=>{sellDialog=false;itemSKU=''}" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                请先完善SPU信息，再尝试上架当前商品
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="()=>{sellDialog=false;itemSKU=''}">取 消</el-button>
                <el-button type="primary" @click="onGoToEditSPU">去完善</el-button>
            </span>
        </el-dialog>
        <el-dialog title="上架确认" :visible.sync="onTheShelvesDialog" :close-on-click-modal="false" :before-close="() => onTheShelvesDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                确定上架当前商品吗？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => onTheShelvesDialog = false">取 消</el-button>
                <el-button type="primary" @click="handleOnTheShelves">确定上架<!--success 上架成功！ --></el-button>
            </span>
        </el-dialog>
        <!-- 删除 -->
        <el-dialog :title="delDialogTitle" :visible.sync="delDialog" :close-on-click-modal="false" :before-close="()=>delDialog=false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                {{Selection.length>1?`确定删除这${Selection.length}条商品吗？`:'确定删除当前商品吗？'}}
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="()=>delDialog=false">取 消</el-button>
                <el-button type="primary" @click="handleDel">确定删除<!--success 删除成功！ --></el-button>
            </span>
        </el-dialog>
        <!-- 下架 -->
        <el-dialog :title="rackDialogTitle" :visible.sync="rackDialog" :close-on-click-modal="false" :before-close="() => rackDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0" v-if="dialogSKU.length==0">
                确定下架当前商品SKU吗？
                <!-- 红色提示文字：若当前商品不存在任何推荐位置时，不展示此内容。1 当前商品在【楼层管理】、【品牌管理】、【严选推荐】被选用  2 当前商品在【楼层管理】严选推荐】被选用 3当前商品在【严选推荐】被选用 -->
                <div style="color:#f00;marginTop:10px" v-if="itemSKU.recommend||itemSKU.existFloor">当前商品在{{itemSKU.recommend?'【严选推荐】':''}}{{itemSKU.existFloor?'【楼层管理】':''}}被选用，确定下架后，该SKU在以上位置不可见。</div>
            </div>
            <div v-else>
                确定下架这{{dialogSKU.length}}条SKU吗？
                <div style="margin:8px 0 10px">
                   <el-table stripe :data="dialogSKU" style="width: 100%" size='mini'  >
                        <el-table-column prop="code" label="SKU编码" min-width="180" show-overflow-tooltip align='center'>
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.code||'-' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品推荐位置" min-width="180" show-overflow-tooltip align='center'>
                            <template slot-scope="scope">
                                <span style="margin-left: 10px" v-if="scope.row.recommend||scope.row.existFloor">{{scope.row.recommend?'【严选推荐】':''}}{{scope.row.existFloor?'【楼层管理】':''}}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => {rackDialog = false;dialogSKU=[]}">取 消</el-button>
                <el-button type="primary" @click="onDetermine">确定下架</el-button>
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
import { getSpuList, getSkuList, batchDelete, skuhelftatus, getTreeCateGroy } from './api/index'
import utils from '@/utils/filters'
import { CategoryTreeResponse, RespBossSku } from '@/interface/hbp-shop'
import { CRM_SHOPP_PRODUCTLIBRARY_EDITOR, CRM_SHOPP_PRODUCTLIBRARY_ADD, CRM_SHOPP_PRODUCTLIBRARY_SKU_ONTHESHELVES, CRM_SHOPP_PRODUCTLIBRARY_SKU_RACK, CRM_SHOPP_PRODUCTLIBRARY_SKU_DEL } from '@/utils/auth_const'
import { getCategoryList } from '../addProduct/api'
const _queryParams = {
    name: '',
    categoryIds: [],
    brandName: '',
    model: '',
    spuCode: '',
    skuCode: '',
    status: '',
    isOnShelf: '',
    editStatus: false, // 要查待编辑的，传个true
    pageNumber: 1,
    pageSize: 10
}
@Component({
    name: 'crmshopMallProductLibrary',
    components: { hosJoyTable, elImageAddToken }
})
export default class ProductLibrary extends Vue {
    authSpuEdit = CRM_SHOPP_PRODUCTLIBRARY_EDITOR
    authSpuAdd = CRM_SHOPP_PRODUCTLIBRARY_ADD

    authSkuOn = CRM_SHOPP_PRODUCTLIBRARY_SKU_ONTHESHELVES
    authSkuOff = CRM_SHOPP_PRODUCTLIBRARY_SKU_RACK
    authSkuDel = CRM_SHOPP_PRODUCTLIBRARY_SKU_DEL
    categoryOptions:CategoryTreeResponse[] = []
    rackDialogTitle:string = ''
    BulkDialog:boolean = false
    resetTable:boolean = true
    delDialogTitle:string = ''
    checkList:any[] = []
    spuCheckboxOptions = [{ label: '只看上架SPU', value: 'isOnShelf:2' }, { label: '只看下架SPU', value: 'isOnShelf:1' }, { label: '只看待编辑SPU', value: 'editStatus:true' }]
    skuCheckboxOptions = [{ label: '只看上架SKU', value: 'isOnShelf:2' }, { label: '只看下架SKU', value: 'isOnShelf:1' }, { label: '只看待编辑SKU', value: 'editStatus:true' }]
    checkboxOptions = this.spuCheckboxOptions
    activeName = 'SPU'
    props = {
        emitPath: false,
        multiple: true,
        children: 'subCategoryList',
        label: 'name',
        value: 'id'
    }
    queryParams: typeof _queryParams = JSON.parse(JSON.stringify(_queryParams))
    page:any = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    itemSKU:any = ''
    tableData:RespBossSku[] = []
    sellDialog:boolean = false
    delDialog:boolean = false
    onTheShelvesDialog:boolean = false
    rackDialog:boolean = false
    Selection = [] // 列表选择
    dialogSKU:RespBossSku[] = []

    // spu 列表
    tableLabel: tableLabelProps = [
        { label: 'SPU编码', prop: 'code' },
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'categoryPath' },
        { label: '商品品牌', prop: 'brandName' },
        { label: '商品型号', prop: 'model' },
        {
            label: '销售价', // 销售价是否可见 0：否 1：是
            prop: 'price',
            render: (h, scope) => {
                return (
                    <div>
                        {scope.row.priceVisible === null ? '-' : scope.row.priceVisible == 0 ? '不展示'
                            : scope.row.minSalePrice === null && scope.row.maxSalePrice === null ? '-' : <span>{utils.money(scope.row.minSalePrice)}-{utils.money(scope.row.maxSalePrice)}</span>
                        }
                    </div>
                )
            }
        },
        {
            label: '商品类别', // status 编辑状态 0：草稿 1：已提交     isOnShelf 1:下架 2:上架
            prop: 'status',
            render: (h, scope) => {
                return (
                    <div>
                        {
                            scope.row.isOnShelf === null ? '待编辑SPU'
                                : scope.row.isOnShelf == 2 ? '上架SPU'
                                    : scope.row.isOnShelf == 1 ? '下架SPU' : '-'
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
                return (
                    <div>
                        {this.hosAuthCheck(this.authSpuEdit) && <h-button table disabled={scope.row.isOnShelf == 2} onClick={() => this.onEditSPU(scope.row)}>编辑</h-button>}
                    </div>
                )
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
            label: '商品类别', // isOnShelf 1:下架 2:上架
            prop: 'status',
            render: (h, scope) => {
                return (
                    <div>
                        {
                            scope.row.isOnShelf === null ? '待编辑SKU'
                                : scope.row.isOnShelf == 2 ? '上架SKU'
                                    : scope.row.isOnShelf == 1 ? '下架SKU' : '-'
                        }
                    </div>
                )
            }
        },
        {
            label: '销售价', // 销售价是否可见 0：否 1：是
            prop: 'price',
            render: (h, scope) => {
                return (
                    <div>
                        {
                            scope.row.priceVisible === null ? '-' : scope.row.priceVisible == 0 ? '不展示'
                                : scope.row.minSalePrice === null && scope.row.maxSalePrice === null ? '-' : <span>{utils.money(scope.row.minSalePrice)}-{utils.money(scope.row.maxSalePrice)}</span>
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
                        {
                            scope.row.isOnShelf == 2 && this.hosAuthCheck(this.authSkuOff) && <h-button table onClick={() => this.onRackSKU(scope.row)}>下架</h-button>
                        }
                        {
                            scope.row.isOnShelf != 2 &&
                            <span>
                                {this.hosAuthCheck(this.authSkuOn) && <h-button table onClick={() => this.onOpenSell(scope.row)}>上架</h-button>}
                                {this.hosAuthCheck(this.authSkuDel) && <h-button table onClick={() => this.onDelDialog(scope.row)}>删除</h-button>}
                            </span>
                        }
                    </div>
                )
            }
        }
    ]

    // methods:::

    onEditSPU (data) {
        this.$router.push({ path: '/goodwork/commodityManagement/spuEdit', query: { id: data.id, spuCode: data.code } })
    }

    // 确定上架
    async handleOnTheShelves () {
        await skuhelftatus({
            'skuIdList': [this.itemSKU.id],
            'isOnShelf': 2 // 1:下架 2:上架
        })
        this.getList()
        this.$message.success('上架成功')
        this.Selection = []
        this.onTheShelvesDialog = false
    }

    // 确定下架
    async onDetermine () {
        await skuhelftatus({
            'skuIdList': this.itemSKU ? [this.itemSKU.id] : this.Selection,
            'isOnShelf': 1 // 1:下架 2:上架
        })
        this.getList()
        this.$message.success('下架成功')
        this.Selection = []
        this.rackDialog = false
        this.itemSKU = ''
    }

    onRackSKU (d) {
        this.rackDialogTitle = '下架确认'
        this.itemSKU = d
        this.rackDialog = true
    }

    onAddNew () {
        this.$router.push({ path: '/goodwork/commodityManagement/addProduct' })
    }

    // 上架提醒 Dialog
    onOpenSell (d) {
        // （未编辑销售价格、可售卖区域...)
        this.itemSKU = d
        if (!d.salesAreaStatus) {
            this.sellDialog = true
            return
        }
        if (d.priceVisible == 1 && (d.minSalePrice === null || d.maxSalePrice === null)) {
            this.sellDialog = true
        } else {
            this.onTheShelvesDialog = true
        }
    }
    // 去完善SPU
    onGoToEditSPU () {
        this.$router.push({ path: '/goodwork/commodityManagement/spuEdit', query: { id: this.itemSKU.spuId, spuCode: this.itemSKU.spuCode } })
    }

    // 打开删除确认 Dialog
    onDelDialog (row) {
        this.delDialogTitle = '删除确认'
        this.Selection = [row.id]
        this.delDialog = true
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
        this.resetTable = false
        this.$nextTick(() => {
            this.resetTable = true
        })
    }

    // '只看上架SPU'... 状态查询
    handleCheckBox () {
        this.queryParams.status = ''
        this.queryParams.isOnShelf = ''
        this.queryParams.editStatus = false
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
    async onBatch () {
        this.itemSKU = ''
        this.dialogSKU = []
        if (this.Selection.length == 0) {
            this.$message.error('请先选择需要下架的SKU~')
            return
        }
        let temp:any = ''
        for (const item of this.Selection) {
            let res = this.tableData.find(jtem => jtem.id == item)
            if (res && res.isOnShelf != 2) {
                temp = res
                break
            }
            this.dialogSKU.push(res)
        }
        if (temp) {
            this.$message.error('仅可对上架SKU进行此操作~')
            return
        }
        this.rackDialogTitle = '批量下架确认'
        this.rackDialog = true
    }
    // 批量上架
    Bulk () {
        this.dialogSKU = []
        if (this.Selection.length == 0) {
            this.$message.error('请先选择需要上架的SKU~')
            return
        }
        let temp:any = ''
        for (const item of this.Selection) {
            let res: RespBossSku = this.tableData.find(jtem => jtem.id == item)
            if (res && res.isOnShelf == 2) {
                temp = res
                break
            }
            // （未编辑销售价格、可售卖区域...)
            if (res) {
                if (!res.salesAreaStatus) {
                    this.dialogSKU.push(res)
                    continue
                }
                if (res.priceVisible == 1 && (res.minSalePrice === null || res.maxSalePrice === null)) {
                    this.dialogSKU.push(res)
                }
            }
        }
        if (temp) {
            this.$message.error('已上架SKU不可再上架，请重新选择')
            return
        }
        let tempDialogSKU = {}
        this.dialogSKU = this.dialogSKU.reduce((prev, curv) => {
            if (tempDialogSKU[curv.spuCode]) {
                // do nothing
            } else {
                tempDialogSKU[curv.spuCode] = true
                prev.push(curv)
            }
            return prev
        }, [])
        this.BulkDialog = true
    }
    // 确定批量上架
    async handleBulk () {
        await skuhelftatus({
            'skuIdList': this.Selection,
            'isOnShelf': 2 // 1:下架 2:上架
        })
        this.getList()
        this.$message.success('上架成功')
        this.Selection = []
        this.BulkDialog = false
    }

    // 批量删除
    Del () {
        if (this.Selection.length == 0) {
            this.$message.error('请先选择需要删除的SKU~')
            return
        }

        let temp:any = ''
        for (const item of this.Selection) {
            let res = this.tableData.find(jtem => jtem.id == item)
            if (res && res.isOnShelf == 2) {
                temp = res
                break
            }
        }
        if (temp) {
            this.$message.error('上架SKU不可被删除，请重新选择')
            return
        }
        this.delDialogTitle = '批量删除确认'
        this.delDialog = true
    }
    // 确定删除
    async handleDel () {
        await batchDelete({
            skuIds: this.Selection
        })
        this.getList()
        this.$message.success('删除成功')
        this.Selection = []
        this.delDialog = false
    }

    // getList
    async getList () {
        let query = JSON.parse(JSON.stringify(this.queryParams))
        query.categoryIds = query.categoryIds.toString()
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

    async mounted () {
        this.getList()
        const { data } = await getCategoryList({ searchContent: '' })
        this.categoryOptions = data
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>