<template>
    <div class="page-body B2b shopMallLayout">
        <div class="page-body-cont">
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
                        <el-cascader :options="categoryOptions" :props="props" multiple collapse-tags v-model="queryParams.categoryIdList" clearable></el-cascader>
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
                <div class="query-cont__col">
                    <div class="query-col__label">SKU编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.skuCode" placeholder="请输入" maxlength="50" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <!-- 没有选择列表项，点击「批量拉取」，提示：“请先选择需要拉取的数据” -->
            <h-button type="primary" class="bulkPull" @click="bulkPull" v-if="hosAuthCheck(authBatchPull)">批量拉取</h-button>
            <!--  -->
            <hosJoyTable isShowselection @selection-change="selectChange" localName="V3.*" ref="hosjoyTable" collapseShow align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='200' isAction :isActionFixed='tableData&&tableData.length>0' :selectable='handleSelectable'>
                <template #action="slotProps">
                    <h-button table v-if="!slotProps.data.row.isPullAble&&hosAuthCheck(authPull)" @click="()=>handlePull(slotProps.data.row.id)">拉取</h-button>
                    <span style="marginRight:10px" v-if="slotProps.data.row.isPullAble">已拉取</span>
                    <h-button table v-if="slotProps.data.row.isPullAble&&hosAuthCheck(authEdit)" @click="()=>onEditor(slotProps.data.row)">编辑商品</h-button>
                </template>
            </hosJoyTable>
        </div>
    </div>
</template>
<script lang='tsx'>
import { ElForm } from 'element-ui/types/form'
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import elImageAddToken from '@/components/elImageAddToken/index.vue'
import { getSkuList, pullSku, bulkPullSku, getCategoryList } from './api/index'
import { CategoryTreeResponse, RespBossB2bSkuPage } from '@/interface/hbp-shop'
import { getTreeCateGroy } from '../productLibrary/api'
import { CRM_SHOPP_ADDPRODUCT_PULL, CRM_SHOPP_ADDPRODUCT_BATCH_PULL, CRM_SHOPP_ADDPRODUCT_EDITOR } from '@/utils/auth_const'
import { newCache } from '@/utils/index'

const _queryParams = {
    name: '',
    brandName: '',
    model: '',
    spuCode: '',
    skuCode: '',
    categoryIdList: [],
    pageNumber: 1,
    pageSize: 10
}
@Component({
    name: 'crmshopMall',
    components: { hosJoyTable, elImageAddToken }
})
export default class ShopMallAddProduct extends Vue {
    categoryOptions:any[] = []
    authPull = CRM_SHOPP_ADDPRODUCT_PULL
    authBatchPull = CRM_SHOPP_ADDPRODUCT_BATCH_PULL
    authEdit = CRM_SHOPP_ADDPRODUCT_EDITOR
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
    tableData:RespBossB2bSkuPage[] = []
    Selection = [] // 列表选择

    tableLabel: tableLabelProps = [
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'category' },
        { label: '商品品牌', prop: 'brandName' },
        { label: '商品型号', prop: 'model' },
        { label: '商品规格', prop: 'optionValues' },
        { label: 'SKU编码', prop: 'skuCode' },
        { label: 'SPU编码', prop: 'spuCode' }

    ]

    // methods:::

    // 处理勾选状态
    handleSelectable (row, index) {
        return !row.isPullAble
    }

    // 搜索重置
    onReset () {
        this.queryParams = JSON.parse(JSON.stringify(_queryParams))
        this.Selection = []
        this.getList()
    }
    // 列表选择
    selectChange (val:any[]) {
        this.Selection = []
        val.map(i => {
            this.Selection.push(i.id)
        })
    }

    // getList
    async getList () {
        let query = JSON.parse(JSON.stringify(this.queryParams))
        query.categoryIdList = query.categoryIdList.toString()
        const { data } = await getSkuList(query)
        this.tableData = data.records
        this.page.total = data.total
    }

    // pullSku
    async handlePull (id) {
        await bulkPullSku({ skuIds: [id] })
        this.getList()
        this.$message.success('商品已进入好橙工商品库，可进入商品列表编辑')
        this.Selection = []
    }

    // bulkPull
    async bulkPull () {
        if (this.Selection.length == 0) {
            this.$message.error('请先选择需要拉取的数据')
            return
        }
        await bulkPullSku({
            skuIds: this.Selection
        })
        this.getList()
        this.$message.success('商品已进入好橙工商品库，可进入商品列表编辑')
        this.Selection = []
    }

    // Edit
    onEditor (row) {
        console.log('log::::::', row)
        this.$router.push({ path: '/goodwork/commodityManagement/spuEdit', query: { id: row.spuId, spuCode: row.spuCode } })
    }

    async mounted () {
        this.getList()
        const { data } = await getCategoryList({ searchContent: '' })
        this.categoryOptions = data
    }

    beforeUpdate () {
        newCache('crmshopMall')
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>