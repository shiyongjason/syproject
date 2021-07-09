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
                        <el-input v-model="queryParams.xxx" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    {{JSON.stringify(queryParams.categoryIdArr)}}
                    <div class="query-col__label">商品类目：</div>
                    <div class="query-col__input">
                        <el-cascader :options="categoryOptions" :props="props" multiple collapse-tags v-model="queryParams.categoryIdArr" clearable @change="productCategoryChange"></el-cascader>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品品牌：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.xxx" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">商品型号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.xxx" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">SPU编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.xxx" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>

            </div>
            <div class="flexlayout">
                <el-checkbox-group v-model="checkList" @change="handleCheckBox">
                    <el-checkbox :label="item.value" v-for="item in checkboxOptions" :key="item.label">{{item.label}}</el-checkbox>
                </el-checkbox-group>
                <div class="search-btn">
                    <h-button type="primary">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <h-button type="create" class="bulkPull">新增商品</h-button>
            <h-button type="primary" class="bulkPull" style="margin:0 10px" v-if="activeName=='SKU'">批量上架</h-button>
            <h-button type="assist" class="bulkPull"  v-if="activeName=='SKU'">批量下架</h-button>
            <h-button class="bulkPull" style="margin-left:10px"  v-if="activeName=='SKU'">批量删除</h-button>
            <hosJoyTable v-if="resetTable" :isShowselection="activeName=='SKU'" @selection-change="selectChange" :localName="activeName=='SPU'?'V3.10.SPU.*':'V3.10.SKu.*'" ref="hosjoyTable" collapseShow align="center" border stripe showPagination :column="activeName=='SPU'?tableLabel:tableLabelOfSku" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='100' >
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
const _queryParams = {
    xxx: '',
    categoryIdArr: [],
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
    spuCheckboxOptions = [{ label: '只看上架SPU', value: '1' }, { label: '只看下架SPU', value: '2' }, { label: '只看待编辑SPU', value: '3' }]
    skuCheckboxOptions = [{ label: '只看上架SKU', value: '4' }, { label: '只看下架SKU', value: '5' }, { label: '只看待编辑SKU', value: '6' }]
    checkboxOptions = this.spuCheckboxOptions
    activeName = 'SPU'
    props = { multiple: true }
    queryParams: any = JSON.parse(JSON.stringify(_queryParams))
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData:any = [
        {
            name: 'xxoo'
        }
    ]
    sellDialog:boolean = false
    delDialog:boolean = false
    onTheShelvesDialog:boolean = false
    rackDialog:boolean = false

    // spu 列表
    tableLabel: tableLabelProps = [
        { label: 'SPU编码', prop: 'name' },
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'name' },
        { label: '商品品牌', prop: 'name' },
        { label: '商品型号', prop: 'name' },
        { label: '销售价', prop: 'name' },
        { label: '商品类别', prop: 'name' },
        {
            label: '操作',
            width: '150px',
            // slot: 'action',
            render: (h, scope) => {
                return <h-button table >编辑</h-button>
            }
        }
    ]

    // sku 列表
    tableLabelOfSku: tableLabelProps = [
        { label: 'SKU编码', prop: 'name' },
        { label: 'SPU编码', prop: 'name' },
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'name' },
        { label: '商品品牌', prop: 'name' },
        { label: '商品型号', prop: 'name' },
        { label: '商品规格', prop: 'name' },
        { label: '商品类别', prop: 'name' },
        { label: '销售价（元）', prop: 'name' },
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
        this.resetTable = false
        this.$nextTick(() => {
            this.resetTable = true
        })
    }

    // '只看上架SPU'... 状态查询
    handleCheckBox () {
        if (this.checkList.length > 1) {
            this.checkList.splice(0, 1)
        }
        console.log('log::::::', this.checkList)
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
        console.log('🚀 --- selectChange --- val', val)
    }

    // getList
    getList () {

    }

    mounted () {
        this.findAllCategory()
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>