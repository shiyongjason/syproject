<template>
    <div class="page-body B2b ProductLabel">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.xxx" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
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
            <h-button type="create" class="bulkPull" @click="onOPenSureDialog">批量推荐</h-button>
            <h-button type="primary" class="bulkPull" style="margin:0 10px" @click="onOPenCancelDialog" >批量取消</h-button>
            <hosJoyTable isShowselection @selection-change="selectChange" :localName="'V3.10.*'" ref="hosjoyTable" collapseShow align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='100' >
            </hosJoyTable>
        </div>
        <el-dialog title="批量推荐确认" :visible.sync="onSureDialog" :close-on-click-modal="false" :before-close="() => onSureDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                你确定要批量推荐这些商品吗？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => onSureDialog = false">取 消</el-button>
                <el-button type="primary" @click="onHandleSure">继 续</el-button>
            </span>
        </el-dialog>
        <el-dialog title="批量取消确认" :visible.sync="onCancelDialog" :close-on-click-modal="false" :before-close="() => onCancelDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                你确定要批量取消推荐这些商品吗？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => onCancelDialog = false">取 消</el-button>
                <el-button type="primary" @click="onHandleDel">继 续</el-button>
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
    name: 'crmshopMallProductLabel',
    components: { hosJoyTable, elImageAddToken }
})
export default class ProductLabel extends Vue {
    @Getter('category/categoryOptions') categoryOptions: any
    @Action('category/findAllCategory') findAllCategory: Function
    checkList = [] // 赛选
    Selection = [] // 列表选择
    checkboxOptions = [{ label: '只看严选产品', value: '1' }, { label: '只看非严选产品', value: '2' }]
    props = { multiple: true }
    queryParams: any = JSON.parse(JSON.stringify(_queryParams))
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData:any = [
        {
            name: '西门子啦啦啦啦啦西门子啦啦啦啦啦西门子啦啦啦啦啦'
        }
    ]
    onSureDialog:boolean = false
    onCancelDialog:boolean = false

    //  列表
    tableLabel: tableLabelProps = [
        { label: 'SPU编码', prop: 'name' },
        {
            label: '商品名称',
            prop: 'name',
            render: (h, scope) => {
                return (
                    <div class="rowcss">
                        <span class="selection">严选</span>
                        <font>{scope.row[scope.column.property]}</font>
                    </div>
                )
            }
        },
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
                return <h-button table >取消推荐</h-button>
            }
        }
    ]

    // methods:::

    // 推荐提醒 Dialog
    onOPenSureDialog () {
        if (this.Selection.length == 0) {
            this.$message.error('请选择需要推荐的商品')
            return
        }
        this.onSureDialog = true
    }

    // 打开取消确认 Dialog
    onOPenCancelDialog () {
        if (this.Selection.length == 0) {
            this.$message.error('请选择需要取消推荐的商品')
            return
        }
        this.onCancelDialog = true
    }
    // 批量推荐确认
    onHandleSure () {
        let ref:any = this.$refs.hosjoyTable
        ref.clearSelection()
        this.onSureDialog = false
    }
    // 批量删除确认
    onHandleDel () {
        let ref:any = this.$refs.hosjoyTable
        ref.clearSelection()
        this.onCancelDialog = false
    }

    // '只看严选产品'... 状态查询
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
        this.Selection = val
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