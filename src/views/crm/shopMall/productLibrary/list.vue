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
            <h-button type="primary" class="bulkPull">新增商品</h-button>
            <hosJoyTable isShowselection @selection-change="selectChange" localName="V3.*" ref="hosjoyTable" collapseShow align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='100' isAction :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table >编辑</h-button>
                </template>
            </hosJoyTable>
            <!-- 「编辑」：下架SPU、待编辑SPU可编辑，上架SPU的「编辑」按钮置灰，点击「编辑」按钮，进入SKU详情页； -->
        </div>
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
    // @Ref('searchForm') readonly searchForm: ElForm;
    @Getter('category/categoryOptions') categoryOptions: any
    @Action('category/findAllCategory') findAllCategory: Function

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

    tableLabel: tableLabelProps = [
        { label: 'SPU编码', prop: 'name' },
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'name' },
        { label: '商品品牌', prop: 'name' },
        { label: '商品型号', prop: 'name' },
        { label: '销售价', prop: 'name' },
        { label: '商品类别', prop: 'name' }

    ]

    // methods:::

    // SPU SKU tab 切换
    handleTabsClick (tab, event) {
        this.checkList = []
        if (tab.name === 'SPU') {
            this.checkboxOptions = this.spuCheckboxOptions
        } else {
            this.checkboxOptions = this.skuCheckboxOptions
        }
        this.onReset()
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