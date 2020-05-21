<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">商品品牌：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.brandName" filterable placeholder="请选择">
                            <el-option
                            v-for="item in brandOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品类目：</div>
                    <div class="query-col-input">
                        <el-cascader :options="categoryOptions" v-model="categoryIdArr" clearable @change="productCategoryChange"></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品型号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.model" placeholder="请输入商品型号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.name" placeholder="请输入商品名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="gotoProductAdd">
                        新建商品SPU
                    </el-button>
                    <el-button type="primary" class="ml20" @click="onChangeStatus(2)">批量禁用</el-button>
                    <el-button type="primary" class="ml20" @click="onChangeStatus(1)">批量启用</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey"
                :isShowIndex='true'>
                <template slot="brandName" slot-scope="scope">
                    {{scope.data.row.brandName}}{{scope.data.row.brandNameEn}}
                </template>
                <template slot="status" slot-scope="scope">
                    <span :class="scope.data.row.status==1?'colred':'colgry'">{{scope.data.row.status==1?'启用':'禁用'}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onEditSpu(scope.data.row)">编辑</el-button>
                    <el-button :type="scope.data.row.status ==1?'primary':''" size="mini" plain @click="onChangeSpu(scope.data.row)" v-text="scope.data.row.status === 1 ? '禁用' : '启用'">
                    </el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { changeSpustatus } from './api/index'
import { mapState, mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { clearCache, newCache } from '@/utils/index'
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
                { label: '类目', prop: 'categoryName', width: '200' },
                { label: '来源', prop: 'merchantName' },
                { label: '维护人', prop: 'updateBy' },
                { label: '维护时间', prop: 'lastModifyTime', width: '200' },
                { label: '状态', prop: 'isEnable' }
            ],
            rowKey: '',
            multiSelection: []
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
        async searchList () {
            await this.findProductsTemplate(this.queryParams)
            this.tableData = this.productsTemplateInfo.records
            console.log(this.tableData)
            this.paginationInfo = {
                pageNumber: this.productsTemplateInfo.current,
                pageSize: this.productsTemplateInfo.size,
                total: this.productsTemplateInfo.total
            }
        },
        async onChangeStatus (status) {
            let multiSelection = this.multiSelection && this.multiSelection.map(val => val.id)
            if (multiSelection.length < 1) {
                this.$message({
                    message: '请先选择商品！',
                    type: 'warning'
                })
                return
            }
            const params = {
                spuIdList: multiSelection,
                status: status,
                operator: this.userInfo.employeeName
            }
            await changeSpustatus(params)
            this.$message({
                message: params.status === 2 ? '禁用成功！' : '启用成功！',
                type: 'success'
            })
            this.searchList()
        },
        gotoProductAdd () {
            this.$router.push({ path: '/hmall/spudetail', query: { type: 'add' } })
        },
        onEditSpu (val) {
            this.$router.push({ path: '/hmall/spudetail', query: { type: 'modify', spuCode: val.spuCode, status: val.status } })
        },
        async  onChangeSpu (val) {
            const params = {
                spuIdList: [val.id],
                status: val.status === 1 ? 2 : 1,
                operator: this.userInfo.employeeName
            }
            await changeSpustatus(params)
            this.$message({
                message: params.status === 2 ? '禁用成功！' : '启用成功！',
                type: 'success'
            })
            this.searchList()
        },
        backFindcode (val) {
            this.queryParams.merchantCode = val.value.selectCode
        },
        backFindbrand (val) {
            this.queryParams.brandName = val.value.selectCode
        }
    },
    beforeRouteEnter (to, from, next) {
        newCache('spumange')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'spudetail') {
            clearCache('spumange')
        }
        next()
    }
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