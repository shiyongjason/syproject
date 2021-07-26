<template>
    <div class="page-body B2b ProductLabel">
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
                        <el-cascader :options="categoryOptions" :props="props" multiple collapse-tags v-model="queryParams.categoryIds" clearable></el-cascader>
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
            <h-button v-if="hosAuthCheck(authBatchRecommend)" type="create" class="bulkPull" @click="onOPenSureDialog">批量推荐</h-button>
            <h-button v-if="hosAuthCheck(authBatchCancel)" type="primary" class="bulkPull" style="margin:0 10px" @click="onOPenCancelDialog" >批量取消</h-button>
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
import { getSpuList, getTreeCateGroy } from '../productLibrary/api'
import { CategoryTreeResponse, RespBossSku } from '@/interface/hbp-shop'
import utils from '@/utils/filters'
import { cancelRecommend, recommend } from './api'
import { CRM_SHOPP_PRODUCTLABEL_RECOMMEND, CRM_SHOPP_PRODUCTLABEL_CANCELRECOMMEND, CRM_SHOPP_PRODUCTLABEL_BATCH_RECOMMEND, CRM_SHOPP_PRODUCTLABEL_BATCH_CANCEL } from '@/utils/auth_const'
import { getCategoryList } from '../addProduct/api'

const _queryParams = {
    name: '',
    categoryIds: [],
    brandName: '',
    model: '',
    spuCode: '',
    skuCode: '',
    status: '',
    isOnShelf: 2,
    recommend: '',
    pageNumber: 1,
    pageSize: 10
}
@Component({
    name: 'crmshopMallProductLabel',
    components: { hosJoyTable, elImageAddToken }
})
export default class ProductLabel extends Vue {
    authRecommend = CRM_SHOPP_PRODUCTLABEL_RECOMMEND
    authCancelRecommend = CRM_SHOPP_PRODUCTLABEL_CANCELRECOMMEND
    authBatchRecommend = CRM_SHOPP_PRODUCTLABEL_BATCH_RECOMMEND
    authBatchCancel = CRM_SHOPP_PRODUCTLABEL_BATCH_CANCEL
    categoryOptions:CategoryTreeResponse[] = []
    checkList = [] // 赛选
    Selection = [] // 列表选择
    checkboxOptions = [{ label: '只看严选产品', value: 'recommend:true' }, { label: '只看非严选产品', value: 'recommend:false' }]
    props = {
        emitPath: false,
        multiple: true,
        children: 'subCategoryList',
        label: 'name',
        value: 'id'
    }
    queryParams: any = JSON.parse(JSON.stringify(_queryParams))
    page:any = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    tableData:RespBossSku[] = []
    onSureDialog:boolean = false
    onCancelDialog:boolean = false

    //  列表
    tableLabel: tableLabelProps = [
        { label: 'SPU编码', prop: 'code' },
        {
            label: '商品名称',
            prop: 'name',
            render: (h, scope) => {
                return (
                    <div>
                        {scope.row.recommend && <span class="selection">严选</span>}
                        <font>{scope.row[scope.column.property]}</font>
                    </div>
                )
            }
        },
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
            // slot: 'action',
            render: (h, scope) => {
                return (
                    <div>
                        {scope.row.recommend && this.hosAuthCheck(this.authCancelRecommend) && <h-button table onClick={() => this.onCancelRecommend(scope.row)}>取消推荐</h-button>}
                        {!scope.row.recommend && this.hosAuthCheck(this.authRecommend) && <h-button table onClick={() => this.onRecommend(scope.row)}>推荐</h-button>}
                    </div>
                )
            }
        }
    ]

    // methods:::

    // 推荐
    async onRecommend ({ id }) {
        await recommend([id])
        this.$message.success('推荐成功')
        this.getList()
    }

    // 取消推荐
    async onCancelRecommend ({ id }) {
        await cancelRecommend([id])
        this.$message.success('取消推荐成功')
        this.getList()
    }
    // 推荐提醒 Dialog
    onOPenSureDialog () {
        let res = this.Selection.find(item => !item.recommend)
        if (this.Selection.length == 0 || !res) {
            this.$message.error('请选择需要推荐的商品')
            return
        }
        this.onSureDialog = true
    }

    // 打开取消确认 Dialog
    onOPenCancelDialog () {
        let res = this.Selection.find(item => item.recommend)
        console.log('🚀 --- onOPenCancelDialog --- res', res)
        if (this.Selection.length == 0 || !res) {
            this.$message.error('请选择需要取消推荐的商品')
            return
        }
        this.onCancelDialog = true
    }
    // 批量推荐确认
    async onHandleSure () {
        let ref:any = this.$refs.hosjoyTable
        let query:any[] = []
        this.Selection.map(item => {
            query.push(item.id)
        })
        await recommend(query)
        this.$message.success('推荐成功')
        ref.clearSelection()
        this.onSureDialog = false
        this.getList()
    }
    // 批量取消确认
    async onHandleDel () {
        let ref:any = this.$refs.hosjoyTable
        let query:any[] = []
        this.Selection.map(item => {
            query.push(item.id)
        })
        await cancelRecommend(query)
        ref.clearSelection()
        this.onCancelDialog = false
        this.$message.success('取消推荐成功')
        this.getList()
    }

    // '只看严选产品'... 状态查询
    handleCheckBox () {
        this.queryParams.recommend = ''
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
        this.Selection = val
    }

    // getList
    async getList () {
        let query = JSON.parse(JSON.stringify(this.queryParams))
        query.categoryIds = query.categoryIds.toString()
        const { data } = await getSpuList(query)
        this.tableData = data.records
        this.page.total = data.total
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