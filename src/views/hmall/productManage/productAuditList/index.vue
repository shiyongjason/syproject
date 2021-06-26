<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="table-cont-tabs">
                <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                    <el-tab-pane v-for="item in productStatus" :key="item.value" :label="item.label" :name="item.value"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.name" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                    </div>
                </div>
                <template v-if="showAllConditions">
                    <div class="query-cont__col">
                        <div class="query-col__lable">SPU编码：</div>
                        <div class="query-col__input">
                            <el-input v-model="queryParams.spuCode" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                        </div>
                    </div>
                    <div class="query-cont__col" v-if="productType == 'SKU'">
                        <div class="query-col__lable">SKU编码：</div>
                        <div class="query-col__input">
                            <el-input v-model="queryParams.skuCode" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                        </div>
                    </div>
                    <div class="query-cont__col">
                        <div class="query-col__lable">商品品牌：</div>
                        <div class="query-col__input">
                            <el-autocomplete v-model="queryParams.brandName" value-key="name" :fetch-suggestions="querySearchAsyncBrand" @select="handleSelectBrand" @blur="handleBlurBrand" :debounce="500" :maxlength="30" placeholder="请输入"></el-autocomplete>
                        </div>
                    </div>
                    <div class="query-cont__col">
                        <div class="query-col__lable">商品类目：</div>
                        <div class="query-col__input">
                            <el-input v-model="queryParams.model" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                        </div>
                    </div>
                    <div class="query-cont__col">
                        <div class="query-col__lable">商品型号：</div>
                        <div class="query-col__input">
                            <el-input v-model="queryParams.model" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                        </div>
                    </div>
                    <div class="query-cont__col" v-if="tabName == '4'">
                        <div class="query-col__lable">审核状态：</div>
                        <div class="query-col__input">
                            <el-select v-model="queryParams.auditStatus">
                                <el-option v-for="item in productStatus" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont__col">
                        <div class="query-col__lable">提交时间：</div>
                        <div class="query-col__input">
                            <el-date-picker v-model="queryParams.createTimeFrom" type="datetime" placeholder="起始" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-ddTHH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                            <span class="ml10 mr10">-</span>
                            <el-date-picker v-model="queryParams.createTimeTo" type="datetime" placeholder="截止" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-ddTHH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
                        </div>
                    </div>
                </template>
                <div class="query-cont__col">
                    <h-button type='primary' @click="onQuery">查询</h-button>
                    <h-button @click="onExport" v-if="showAllConditions">导出</h-button>
                    <h-button @click="onReset" v-if="showAllConditions">重置</h-button>
                    <span class="more-condition" @click="showAllConditions = false" v-if="showAllConditions">收起<i class="el-icon-arrow-up"></i></span>
                    <span class="more-condition" @click="showAllConditions = true" v-else>高级搜索<i class="el-icon-arrow-down"></i></span>
                </div>
            </div>
            <div class="button-cont">
                <h-button type="create" @click="onBatchAduit()">批量审核</h-button>
                <template v-if="productType == 'SPU'">
                    <h-button type='assist' @click="onTabProductType('SKU')" class="margin-left__auto">切换SKU</h-button>
                </template>
                <template v-else-if="productType == 'SKU'">
                    <h-button type='assist' @click="onTabProductType('SPU')" class="margin-left__auto">切换SPU</h-button>
                </template>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" :multiSelection.sync="multiSelection" :actionMinWidth="200" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isShowCollapse="true" :isMultiple="true" :isAction="true">
                <template slot="auditStatus" slot-scope="scope">
                    {{ productMap.get(scope.data.row.auditStatus) || '-' }}
                </template>
                <template slot="action" slot-scope="scope">
                    <template v-if="scope.data.row.auditStatus== '0'">
                        <h-button table @click="onAduit(scope.data.row)">审核</h-button>
                    </template>
                    <template v-else-if="scope.data.row.auditStatus== '1' || scope.data.row.auditStatus== '2'">
                        <h-button table @click="onseeTask(scope.data.row)">查看</h-button>
                    </template>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { clearCache, newCache } from '@/utils/index'
import { PRODUCT_AUDIT_STATUS, PRODUCT_AUDIT_MAP } from '../const/index'
import { batchOperator } from '../../utils/index'
export default {
    name: 'productList',
    data () {
        return {
            productStatus: PRODUCT_AUDIT_STATUS,
            productMap: PRODUCT_AUDIT_MAP,
            showAllConditions: false,
            tabName: '4',
            productType: 'SPU',
            queryParams: {
                name: '',
                spuCode: '',
                skuCode: '',
                brandName: '',
                brandId: '',
                model: '',
                auditStatus: '',
                enabled: '',
                createTimeFrom: '',
                createTimeTo: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            multiSelection: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            brandData: state => state.hmall.productManage.brandData,
            productSpuData: state => state.hmall.productManage.productSpuData,
            productSkuData: state => state.hmall.productManage.productSkuData
        }),
        tableLabel () {
            return this.productType == 'SPU' ? [
                { label: 'SPU编码', prop: 'spuCode' },
                { label: '商品名称', prop: 'name' },
                { label: '品牌', prop: 'brandName' },
                { label: '商品类目', prop: 'category' },
                { label: '型号', prop: 'model' },
                { label: '审核状态', prop: 'auditStatus' },
                { label: '提交时间', prop: 'createTime', formatters: 'dateTime' }
            ] : [
                { label: 'SPU编码', prop: 'spuCode' },
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '商品名称', prop: 'name' },
                { label: '品牌', prop: 'brandName' },
                { label: '商品类目', prop: 'category' },
                { label: '型号', prop: 'model' },
                { label: '规格', prop: 'optionValues' },
                { label: '审核状态', prop: 'auditStatus' },
                { label: '提交时间', prop: 'createTime', formatters: 'dateTime' }
            ]
        },
        tableData () {
            return this.productType == 'SPU' ? this.productSpuData.records : this.productSkuData.records
        },
        pagination () {
            return this.productType == 'SPU' ? {
                pageNumber: this.productSpuData.current,
                pageSize: this.productSpuData.size,
                total: this.productSpuData.total
            } : {
                pageNumber: this.productSkuData.current,
                pageSize: this.productSkuData.size,
                total: this.productSkuData.total
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.createTimeTo
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.createTimeFrom
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    methods: {
        init () {
            this.resetParams = { ...this.queryParams }
            this.getBrandOptions()
            this.onQuery()
        },
        // 回车搜索
        onQueryEnter (e) {
            const keyCode = document.all ? event.keyCode : e.which
            if (keyCode === 13) {
                this.productType == 'SPU' ? this.getProductSpuList() : this.getProductSkuList()
            }
        },
        // 搜索操作
        onQuery () {
            this.queryParams.pageNumber = 1
            this.tabParams(this.tabName)
            this.productType == 'SPU' ? this.getProductSpuList() : this.getProductSkuList()
        },
        // 重置操作
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.onQuery()
        },
        onTab (value) {
            this.queryParams = { ...this.resetParams }
            this.onQuery()
        },
        // SPU or SKU 切换
        onTabProductType (productType) {
            this.queryParams = { ...this.resetParams }
            this.tabParams(this.tabName)
            if (productType == 'SPU') {
                this.getProductSpuList()
                this.productType = productType
            } else if (productType == 'SKU') {
                this.getProductSkuList()
                this.productType = productType
            }
        },
        // 品牌搜索建议处理
        async querySearchAsyncBrand (queryString, cb) {
            const data = !queryString ? this.brandData : this.brandData.filter(item => item.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1)
            cb(data)
        },
        handleSelectBrand (item) {
            this.queryParams.brandName = item.name
            this.queryParams.brandId = item.id
        },
        handleBlurBrand () {
            const data = this.brandData.filter(item => item.name.toLowerCase() == this.queryParams.brandName.toLowerCase())
            if (!(data.length > 0 && data[0].id === this.queryParams.brandId)) {
                this.queryParams.brandName = ''
                this.queryParams.brandId = ''
            }
        },
        onseeTask (row) {
            console.log(row)
            if (this.productType == 'SPU') {
                this.$router.push({ path: '/b2b/product/editSpuAudit', query: { id: row.id, seeTask: false } })
            } else if (this.productType == 'SKU') {
                this.$router.push({ path: '/b2b/product/editSkuAudit', query: { id: row.id, seeTask: false } })
            }
        },
        onAduit (row) {
            if (this.productType == 'SPU') {
                this.$router.push({ path: '/b2b/product/editSpuAudit', query: { id: row.id, seeTask: true } })
            } else if (this.productType == 'SKU') {
                this.$router.push({ path: '/b2b/product/editSkuAudit', query: { id: row.id, seeTask: true } })
            }
        },
        // 批量审核
        onBatchAduit (multiSelection) {
            // TODO: 确认批量删除提醒没有
            if (this.productType == 'SPU') {
                batchOperator(multiSelection || this.multiSelection, async (multiSelection) => {
                    this.$confirm('是否批量审核通过', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(async () => {
                        try {
                            await this.batchAduitSpu({
                                ids: multiSelection,
                                operator: this.userInfo.employeeName
                            })
                            this.$message.success('商品批量审核通过！')
                            this.getProductSpuList()
                        } catch (error) {
                            this.getProductSpuList()
                        }
                    }).catch(() => { })
                })
            } else {
                batchOperator(multiSelection || this.multiSelection, async (multiSelection) => {
                    this.$confirm('是否批量审核通过', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(async () => {
                        try {
                            await this.batchAduitSku({
                                ids: multiSelection,
                                operator: this.userInfo.employeeName
                            })
                            this.$message.success('商品批量审核通过！')
                            this.getProductSkuList()
                        } catch (error) {
                            this.getProductSkuList()
                        }
                    }).catch(() => { })
                })
            }
        },
        // 翻页操作
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.productType == 'SPU' ? this.getProductSpuList() : this.getProductSkuList()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.productType == 'SPU' ? this.getProductSpuList() : this.getProductSkuList()
        },
        onExport () {
            if (this.productType == 'SPU') {
                if (this.tableDataSpu.length <= 0) {
                    this.$message.warning('无商品可导出！')
                } else {
                    requestDownload({
                        url: interfaceUrl + 'product/api/spu/page/export',
                        method: 'get',
                        data: {
                            ...this.queryParams
                        }
                    })
                }
            } else {
                if (this.tableDataSku.length <= 0) {
                    this.$message.warning('无商品可导出！')
                } else {
                    requestDownload({
                        url: interfaceUrl + 'product/api/sku/page/export',
                        method: 'get',
                        data: {
                            ...this.queryParams
                        }
                    })
                }
            }
        },
        tabParams (tabName) {
            if (tabName == '4') {
                this.queryParams.auditStatus = ''
                this.queryParams.enabled = true
            } else if (tabName == '0') {
                this.queryParams.auditStatus = 0
                // this.queryParams.enabled = false
            } else if (tabName == '1') {
                this.queryParams.auditStatus = 1
            } else if (tabName == '2') {
                this.queryParams.auditStatus = 2
            }
        },
        ...mapActions({
            getBrandOptions: 'productManage/findBrandOptions',
            findProductSpuList: 'productManage/findProductSpuList',
            findProductSkuList: 'productManage/findProductSkuList',
            batchEffective: 'productManage/batchEffective',
            batchEfficacy: 'productManage/batchEfficacy',
            batchAduitSku: 'productManage/batchAduitSku',
            batchAduitSpu: 'productManage/batchAduitSpu',
            effectiveSKU: 'productManage/effectiveSKU',
            efficacySKU: 'productManage/efficacySKU',
            deleteSKU: 'productManage/deleteSKU'
        }),
        async getProductSpuList () {
            await this.findProductSpuList(this.queryParams)
        },
        async getProductSkuList () {
            await this.findProductSkuList(this.queryParams)
            console.log(this.productSkuData)
        }
    },
    mounted () {
        this.init()
    },
    activated () {
        this.productType == 'SPU' ? this.getProductSpuList() : this.getProductSkuList()
    }
    // ,
    // beforeRouteEnter (to, from, next) {
    //     newCache('productList')
    //     next()
    // },
    // beforeRouteLeave (to, from, next) {
    //     if (!(to.name == 'editProduct' || to.name == 'editSku')) {
    //         clearCache('productList')
    //     }
    //     next()
    // }
}
</script>
<style lang="scss" scoped>
// 处理input type = number的上下箭头
/deep/input::-webkit-outer-spin-button,
/deep/input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
/deep/input[type="number"] {
    -moz-appearance: textfield;
}
.more-condition {
    margin-left: 10px;
    font-size: 14px;
    color: #999;
    cursor: pointer;
}

.button-cont {
    display: flex;
}

.margin-left__auto {
    margin-left: auto;
}
.isHot {
    display: inline-block;
    position: absolute;
    top: -6px;
    right: 0px;
    font-size: 8px;
    color: $redColor !important;
    width: 30px;
}
.h-button.orangeBtn {
    width: 68px;
    padding: 5px 0;
}
.upload-cont {
    display: inline-block;
    margin-left: 10px;
    width: 68px;
}
.isGrayColor {
    cursor: default !important;
}
.icon {
    margin-left: 5px;
    font-size: 18px;
    color: $hosjoyColor;
    cursor: pointer;
}
.affix-info-list {
    padding: 20px 0;
}
.affix-list-item {
    padding: 5px;

    .list-item-left {
        float: left;
        width: 90%;
    }

    .list-item-right {
        float: right;
    }

    .list-item-icon {
        float: left;
        width: 40px;
        height: 40px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .list-item-name {
        margin-left: 10px;
        float: left;
        width: calc(100% - 60px);
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .list-item-delete {
        float: right;
        width: 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;

        &:hover {
            color: $hosjoyColor;
        }
    }

    .list-item-download {
        float: right;
        width: 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;

        &:hover {
            color: $hosjoyColor;
        }
    }

    &:hover {
        background: #f2f2f4;
    }
}
</style>
