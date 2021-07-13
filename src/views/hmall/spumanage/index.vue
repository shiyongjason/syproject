<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">商品品牌：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.brandId" filterable placeholder="请选择">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品类目：</div>
                    <div class="query-col__input">
                        <el-cascader :options="categoryOptions" v-model="categoryIdArr" clearable @change="productCategoryChange"></el-cascader>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品型号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.model" placeholder="请输入商品型号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.name" placeholder="请输入商品名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="()=>searchList(1)">查询</h-button>
                    <h-button @click="onRest">重置</h-button>
                </div>
            </div>
            <div class="button-cont">
                <h-button type="create" @click="gotoProductAdd">
                    新建SPU模板
                </h-button>
                <h-button @click="onDisable()">批量禁用</h-button>
                <h-button @click="onEnable()">批量启用</h-button>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey"
                :isShowIndex='true'>
                <template slot="brandName" slot-scope="scope">
                    {{scope.data.row.brandName}}{{scope.data.row.brandNameEn}}
                </template>
                <template slot="isEnable" slot-scope="scope">
                    <span :class="scope.data.row.isEnable===1?'colred':'colgry'">{{scope.data.row.isEnable===1?'启用':'禁用'}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onEditSpu(scope.data.row)">编辑</h-button>
                    <template v-if="scope.data.row.isEnable ===1">
                        <h-button table plain @click="onDisable(scope.data.row.id)">禁用</h-button>
                    </template>
                    <template v-else>
                        <h-button table @click="onEnable(scope.data.row.id)">启用</h-button>
                    </template>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { templateDisable, templateEnable } from './api/index'
import { mapState, mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { clearCache } from '@/utils/index'

export default {
    name: 'spumange',
    data () {
        return {
            categoryIdArr: [],
            productSource: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                brandId: '',
                categoryId: '',
                model: '',
                name: ''
            },
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            middleStatus: 0, // 0无文件 1有文件已提交 2有文件未提交
            tableLabel: [
                { label: '品牌', prop: 'brandName' },
                { label: '商品名称', prop: 'name', width: '200' },
                { label: '型号', prop: 'model' },
                { label: '类目', prop: 'categoryPathName', width: '200' },
                { label: '维护人', prop: 'operator' },
                { label: '维护时间', prop: 'lastModifyTime', width: '200', formatters: 'dateTime' },
                { label: '状态', prop: 'isEnable' }
            ],
            rowKey: '',
            multiSelection: [],
            isPending: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapState('spumanage', {
            productsTemplateInfo: 'productsTemplateInfo'
        }),
        ...mapGetters('category', {
            categoryOptions: 'categoryOptions'
        }),
        ...mapGetters('brand', {
            brandOptions: 'brandOptions'
        })
    },

    async mounted () {
        this.findAllCategory()
        this.findAllBrands()
        this.searchList()
        this.copyParams = deepCopy(this.queryParams)
    },
    activated () {
        this.searchList()
    },
    methods: {
        ...mapActions('category', [
            'findAllCategory'
        ]),
        ...mapActions('brand', [
            'findAllBrands'
        ]),
        ...mapActions('spumanage', [
            'findProductsTemplate'
        ]),
        onRest () {
            this.categoryIdArr = []
            this.queryParams = deepCopy(this.copyParams)
            this.searchList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        productCategoryChange (val) {
            this.queryParams.categoryId = val[val.length - 1]
        },
        async searchList (val) {
            try {
                if (this.isPending) {
                    return
                }
                this.isPending = true
                if (val) {
                    this.queryParams.pageNumber = val
                }
                await this.findProductsTemplate(this.queryParams)
                this.tableData = this.productsTemplateInfo.records
                this.paginationInfo = {
                    pageNumber: this.productsTemplateInfo.current,
                    pageSize: this.productsTemplateInfo.size,
                    total: this.productsTemplateInfo.total
                }
                this.isPending = false
            } catch (error) {
                this.isPending = false
            }
        },
        // 批量禁用，根据是否传递单独id区分批量
        async onDisable (templateId) {
            if (!templateId && this.multiSelection.length < 1) {
                this.$message.warning('请先选择SPU模板')
                return
            }
            await templateDisable({ spuTemplateIdList: templateId ? [templateId] : this.multiSelection.map(v => v.id) })
            this.$message.success('操作成功')
            this.searchList()
        },
        // 批量启用，根据是否传递单独id区分批量
        async onEnable (templateId) {
            if (!templateId && this.multiSelection.length < 1) {
                this.$message.warning('请先选择SPU模板')
                return
            }
            await templateEnable({ spuTemplateIdList: templateId ? [templateId] : this.multiSelection.map(v => v.id) })
            this.$message.success('操作成功')
            this.searchList()
        },
        gotoProductAdd () {
            this.$router.push({ path: '/b2b/product/spudetail', query: { type: 'add' } })
        },
        onEditSpu (val) {
            clearCache('spudetail')
            this.$router.push({ path: '/b2b/product/spudetail', query: { type: 'modify', spuTemplateId: val.id } })
        }
    }
    /* beforeRouteEnter (to, from, next) {
        newCache('spumange')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'spudetail') {
            clearCache('spumange')
        }
        next()
    } */
}
</script>
<style lang="scss" scoped>
.colred {
    color: #ff7a45;
}
.colgry {
    color: #ccc;
}
</style>
