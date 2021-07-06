<template>
    <div class="page-body B2b shopMallLayout">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.xxx" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <!-- <div class="query-cont__col">
                    <div class="query-col__label">商品类目：</div>
                    <div class="query-col__input">
                        <el-cascader :options="categoryOptions" multiple v-model="queryParams.categoryIdArr" clearable @change="productCategoryChange"></el-cascader>
                    </div>
                </div> -->
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
                <div class="query-cont__col">
                    <div class="query-col__label">SKU编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.xxx" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <h-button type="primary" class="bulkPull">批量拉取</h-button>
            <!--  -->
            <hosJoyTable isShowselection @selection-change="selectChange" localName="V3.*" ref="hosjoyTable" collapseShow align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='200' isAction :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table >拉取</h-button>

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

const _queryParams = {
    xxx: '',
    categoryIdArr: [],
    pageNumber: 1,
    pageSize: 10
}
@Component({
    name: 'crmshopMall',
    components: { hosJoyTable, elImageAddToken }
})
export default class ShopMallAddProduct extends Vue {
    // @Ref('searchForm') readonly searchForm: ElForm;

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
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'name' },
        { label: '商品品牌', prop: 'name' },
        { label: '商品型号', prop: 'name' },
        { label: '商品规格', prop: 'name' },
        { label: 'SKU编码', prop: 'name' },
        {
            label: 'SPU编码',
            prop: 'name',
            render: (h, scope): JSX.Element => {
                return (
                    <div>
                    23
                        <elImageAddToken fileUrl='https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png'/>
                    </div>

                )
            }
        }

    ]

    // methods:::

    // 商品类目
    productCategoryChange () {
        console.log('log::::::')
    }

    // 搜索重置
    onReset () {
        this.queryParams = JSON.parse(JSON.stringify(_queryParams))
    }
    // 列表选择
    selectChange (val:any[]) {
        console.log('🚀 --- selectChange --- val', val)
    }

    // getList
    getList () {

    }

    mounted () {
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>