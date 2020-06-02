<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">SPU编码：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.spuCode" placeholder="请输入SPU编码">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.spuName" placeholder="请输入商品名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品品牌：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.brandName" placeholder="请输入商品品牌">
                        </el-input>
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
                        <el-input type="text" maxlength="50" v-model="queryParams.model" placeholder="请输入商品型号">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品来源：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入商品来源">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">上架状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.isOnShelf" style="width: 100%">
                            <el-option
                                v-for="item in shelfStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">是否共享：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.isShared" style="width: 100%">
                            <el-option
                                v-for="item in shareStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-checkbox v-model="queryParams.isOwnOperated" true-label='true' false-label='false'>自营</el-checkbox>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery">搜索</el-button>
                        <el-button type="primary" class="ml20" @click="onExport">导出</el-button>
                        <el-button type="primary" class="ml20" @click="onOffShelves()">批量下架</el-button>
                        <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <basicTable
                    :tableLabel="tableLabel"
                    :tableData="tableData"
                    :isPagination='true'
                    :pagination='paginationInfo'
                    @onSizeChange="onSizeChange"
                    @onCurrentChange="onCurrentChange"
                    isAction
                    isMultiple
                    :multiSelection.sync='multiSelection'
                >
                    <template slot="isOnShelf" slot-scope="scope">
                        {{ shelfStatusMap.get(scope.data.row.isOnShelf) }}
                    </template>
                    <template slot="isShared" slot-scope="scope">
                        {{ shareStatusMap.get(scope.data.row.isShared) }}
                    </template>
                    <template slot="action" slot-scope="scope">
                        <!-- <el-button class="orangeBtn" @click="">查看</el-button> -->
                        <el-button class="orangeBtn" v-if="scope.data.row.isOnShelf " @click="onOffShelves(scope.data.row.spuId)">下架</el-button>
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import { offShlef } from './api/index'
import { B2bUrl } from '@/api/config'
import { SHELF_STATUS, SHARE_STATUS, SHELF_STATUS_MAP, SHARE_STATUS_MAP } from './const'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    name: 'marketStore',
    data () {
        return {
            shelfStatus: SHELF_STATUS,
            shareStatus: SHARE_STATUS,
            shelfStatusMap: SHELF_STATUS_MAP,
            shareStatusMap: SHARE_STATUS_MAP,
            categoryIdArr: [],
            initParams: {},
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                spuCode: '',
                spuName: '',
                brandName: '',
                categoryId: '',
                model: '',
                merchantName: '',
                isOnShelf: '',
                isShared: '',
                isOwnOperated: false
            },
            tableLabel: [
                { label: '商品编码', prop: 'spuCode' },
                { label: '商品名称', prop: 'spuName' },
                { label: '品牌', prop: 'brandName' },
                { label: '商品类目', prop: 'category' },
                { label: '型号', prop: 'model' },
                // { label: '销售价格', prop: 'categoryNames' },
                { label: '上架状态', prop: 'isOnShelf' },
                { label: '是否共享', prop: 'isShared' },
                { label: '商品来源', prop: 'merchantName' }
            ],
            tableData: [],
            paginationInfo: {
                pageNumber: 1,
                pageSize: 10
            },
            multiSelection: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters('category', {
            categoryOptions: 'categoryOptions'
        }),
        ...mapState('spumanage', {
            productsBazaarListInfo: 'productsBazaarListInfo'
        })
    },
    mounted () {
        this.onQuery()
        this.findAllCategory()
        this.initParams = { ...this.queryParams }
    },
    methods: {
        ...mapActions('category', [
            'findAllCategory'
        ]),
        ...mapActions('spumanage', [
            'findBazaarLists'
        ]),
        productCategoryChange (val) {
            this.queryParams.categoryId = val[val.length - 1]
        },
        onQuery () {
            this.search()
        },
        onReset () {
            this.queryParams = { ...this.initParams }
            this.search()
        },
        // 下架，分单个下架和批量下架
        async onOffShelves (spuId) {
            if (!spuId && this.multiSelection.length < 1) {
                this.$message.warning('请先选择商品！')
                return
            }
            await offShlef({ spuIdList: spuId ? [spuId] : this.multiSelection.map(v => v.spuId) })
            this.$message.success('操作成功')
            this.search()
        },
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无商品信息可导出！')
            } else {
                let url = ''
                for (let key in this.queryParams) {
                    url += (key + '=' + this.queryParams[key] + '&')
                }
                location.href = B2bUrl + 'product/api/spu/boss/manage-page/export?access_token=' + sessionStorage.getItem('tokenB2b') + '&' + url
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.search()
        },
        async search () {
            await this.findBazaarLists(this.queryParams)
            this.tableData = this.productsBazaarListInfo.records
            this.paginationInfo = {
                pageNumber: this.productsBazaarListInfo.current,
                pageSize: this.productsBazaarListInfo.size,
                total: this.productsBazaarListInfo.total
            }
        }
    }
}
</script>

<style scoped>
</style>