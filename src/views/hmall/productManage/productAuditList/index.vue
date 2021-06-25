<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="table-cont-tabs">
                <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                    <el-tab-pane v-for="item in productAuditStatus" :key="item.value" :label="item.label" :name="item.value"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="query-cont__row">
                <div class="query-cont__col" v-if="productType == 'SPU'">
                    <div class="query-col__lable">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.spuName" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                    </div>
                </div>
                <div class="query-cont__col" v-if="productType == 'SKU'">
                    <div class="query-col__lable">商品名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.skuName" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                    </div>
                </div>
                <template v-if="showAllConditions">
                    <div class="query-cont__col" v-if="productType == 'SPU'">
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
                        <div class="query-col__lable">商品型号：</div>
                        <div class="query-col__input">
                            <el-input v-model="queryParams.model" maxlength="30" placeholder="请输入" @keyup.enter.native="onQuery"></el-input>
                        </div>
                    </div>
                    <div class="query-cont__col" v-if="tabName == 'onShelf'">
                        <div class="query-col__lable">是否共享：</div>
                        <div class="query-col__input">
                            <el-select v-model="queryParams.isShared" @keyup.enter.native="onQuery">
                                <el-option v-for="item in isSharedOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                </template>
                <div class="query-cont__col">
                    <h-button type='primary' @click="onQuery">查询</h-button>
                    <h-button @click="onReset" v-if="showAllConditions">重置</h-button>
                    <h-button @click="onExport" v-if="showAllConditions">导出</h-button>
                    <span class="more-condition" @click="showAllConditions = false" v-if="showAllConditions">收起<i class="el-icon-arrow-up"></i></span>
                    <span class="more-condition" @click="showAllConditions = true" v-else>高级搜索<i class="el-icon-arrow-down"></i></span>
                </div>
            </div>
            <div class="button-cont">
                <template v-if="productType == 'SPU'">
                    <h-button type='create' @click="onCreateProduct">新建商品</h-button>
                    <h-button @click="onBatchOnShelf()" v-if="tabName == 'offShelf'">批量生效</h-button>
                    <h-button @click="onBatchOffShelf()" v-if="tabName == 'onShelf'">批量失效</h-button>
                    <h-button @click="onBatchDel()" v-if="tabName != 'onShelf'">批量删除</h-button>
                    <h-button type='assist' @click="onTabProductType('SKU')" class="flr mb10" v-if="tabName == 'onShelf' || tabName == 'offShelf'">切换SKU</h-button>
                </template>
                <template v-if="productType == 'SKU'">
                    <h-button type='assist' @click="onTabProductType('SPU')" class="flr mb10" v-if="tabName == 'onShelf' || tabName == 'offShelf'">切换SPU</h-button>
                </template>
            </div>
            <basicTable>

            </basicTable>
            <basicTable :tableData="tableDataSpu" :tableLabel="tableLabelSpu" :actionMinWidth="340" :pagination="paginationDataSpu" :multiSelection.sync="multiSelection" @onCurrentChange="onCurrentChangeSpu" :isMultiple="true" :isAction="true" v-if="productType=='SPU'">
                <template slot="spuName" slot-scope="scope">
                    <span>{{scope.data.row.spuName}}</span>
                    <span class="isHot"><span v-if="scope.data.row.isSpike">特价</span></span>
                </template>
                <template slot="attachmentCount" slot-scope="scope">
                    <a class="isLink" @click="onGoodInfo(scope.data.row.spuId)">{{scope.data.row.attachmentCount}}</a>
                </template>
                <template slot="isShared" slot-scope="scope">
                    <span v-if="scope.data.row.isShared==0">否</span>
                    <span v-if="scope.data.row.isShared==1">是</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onToEditProduct(scope.data.row)" :disabled="scope.data.row.isSpike">编辑</h-button>
                    <template v-if="tabName == 'onShelf'">
                        <h-button table @click="onOffShelf(scope.data.row)" :disabled="scope.data.row.isSpike">下架</h-button>
                        <h-button table @click="onOnMarket(scope.data.row)" v-if="scope.data.row.isShared == '0'">设置共享</h-button>
                        <h-button table @click="onOffMarket(scope.data.row)" v-else :disabled="scope.data.row.isSpike">取消共享</h-button>
                    </template>
                    <h-button table @click="onOnShelf(scope.data.row)" v-if="tabName == 'offShelf'">上架</h-button>
                    <h-button table @click="onDelete(scope.data.row)" v-if="tabName == 'checkPending' || tabName == 'reject'">删除</h-button>
                </template>
            </basicTable>
            <basicTable :tableData="tableDataSku" :tableLabel="tableLabelSku" :actionMinWidth="340" :pagination="paginationDataSku" @onCurrentChange="onCurrentChangeSku" :isAction="true" v-if="productType=='SKU'">
                <template slot="skuName" slot-scope="scope">
                    <span>{{scope.data.row.skuName}}</span>
                    <span class="isHot"><span v-if="scope.data.row.isSpike">特价</span></span>
                </template>
                <template slot="commission" slot-scope="scope">
                    <span>{{scope.data.row.commission?scope.data.row.commission+'%':'-'}}</span>
                </template>
                <template slot="isShared" slot-scope="scope">
                    <span v-if="scope.data.row.isShared==0">否</span>
                    <span v-if="scope.data.row.isShared==1">是</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onToEditProduct(scope.data.row)" :disabled="scope.data.row.isSpike">编辑</h-button>
                    <h-button table @click="onOnShelfSKU(scope.data.row)" v-if="tabName == 'offShelf'">上架</h-button>
                    <h-button table @click="onOffShelfSKU(scope.data.row)" v-if="tabName == 'onShelf'" :disabled="scope.data.row.isSpike">下架</h-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
// import requestDownload from '@/utils/download'
// import { uploadGoodAffixInfo, delGoodAffixInfo, setShared, cancelShared, onShelf, offShelf, delProduct, onShelfSku } from '../api/index'
// import { IS_SHARED_OPTIONS } from '../const'
// import { interfaceUrl, uploadUrl } from '@/api/config'
import { mapState, mapActions } from 'vuex'
import { clearCache, newCache } from '@/utils/index'
import { PRODUCT_AUDIT_STATUS, EFFECTIVE, EFFICACY, AUDIT } from '../const/index'
import { getProductsArr } from '@/views/jinyunplatform/api'
// import { batchOperator } from '../utils/index'
export default {
    name: 'productAuditList',
    data () {
        return {
            productAuditStatus: PRODUCT_AUDIT_STATUS,
            showAllConditions: false,
            productType: 'SPU',
            queryParams: {
                spuCode: '',
                spuName: '',
                skuCode: '',
                skuName: '',
                brandName: '',
                brandId: '',
                model: '',
                merchantCode: '',
                isShared: '',
                auditStatus: '',
                isOnShelf: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            //             isSharedOption: IS_SHARED_OPTIONS,
            //             tableLabelSpu: [],
            //             tableDataSpu: [],
            //             paginationDataSpu: {},
            //             multiSelection: [],
            //             tableLabelSku: [],
            //             tableDataSku: [],
            //             paginationDataSku: {},
            //             visible: false,
            //             uploadAttr: {
            //                 name: 'multiFile',
            //                 showFileList: false
            //             },
            //             fileList: [],
            //             beforeList: [],
            //             successList: [],
            //             uploadSpuId: '',
            tabName: 'onShelf'
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo.principal,
            brandData: state => state.goodsModules.brandData,
            productSpuData: state => state.hmall.productManage.productSpuData,
            productSkuData: state => state.hmall.productManage.productSkuData
        })
    },
    methods: {
        // 回车搜索
        onQueryEnter (e) {
            const keyCode = document.all ? event.keyCode : e.which
            if (keyCode === 13) {
                if (this.productType == 'SPU') {
                    this.getSPUProuducts()
                } else {
                    this.getSKUProuducts()
                }
            }
        },
        // 搜索操作
        onQuery () {
            this.queryParams.pageNumber = 1
            this.queryParams.merchantCode = this.userInfo.merchantCode
            this.tabParams(this.tabName)
            if (this.productType == 'SPU') {
                this.getSPUProuducts()
            } else {
                this.getSKUProuducts()
            }
        },
        // 重置操作
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.onQuery()
        },
        //         onTab (value) {
        //             this.queryParams = { ...this.resetParams }
        //             console.log(value)
        //             if (!(value.name == 'onShelf' || value.name == 'offShelf')) {
        //                 this.productType = 'SPU'
        //             }
        //             this.onQuery()
        //         },
        //         // 品牌搜索建议处理
        //         async querySearchAsyncBrand (queryString, cb) {
        //             const data = !queryString ? this.brandData : this.brandData.filter(item => item.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1)
        //             cb(data)
        //         },
        //         handleSelectBrand (item) {
        //             this.queryParams.brandName = item.name
        //             this.queryParams.brandId = item.id
        //         },
        //         handleBlurBrand () {
        //             const data = this.brandData.filter(item => item.name.toLowerCase() == this.queryParams.brandName.toLowerCase())
        //             if (!(data.length > 0 && data[0].id === this.queryParams.brandId)) {
        //                 this.queryParams.brandName = ''
        //                 this.queryParams.brandId = ''
        //             }
        //         },
        // 跳转到新增商品页面
        onCreateProduct () {
            this.$router.push('/b2b/product/createProduct')
        },
        //         // 跳转到修改商品页面
        //         async onToEditProduct (row) {
        //             // await this.findValidateSpike({ spuId: row.spuId })
        //             if (this.productType === 'SPU') {
        //                 this.$router.push({ path: '/goods/editProduct', query: { id: row.spuId } })
        //             } else {
        //                 this.$router.push({ path: '/goods/editSku', query: { id: row.skuId } })
        //             }
        //         },
        //         // SKU列表显示
        //         onTabProductType (productType) {
        //             this.queryParams = { ...this.resetParams }
        //             this.tabParams(this.tabName)
        //             if (productType == 'SPU') {
        //                 this.getSPUProuducts()
        //                 this.productType = productType
        //             } else {
        //                 this.getSKUProuducts()
        //                 this.productType = productType
        //             }
        //         },
        //         // 批量上集市
        //         onBatchOnMarket (multiSelection) {
        //             batchOperator(multiSelection || this.multiSelection, async (multiSelection) => {
        //                 await setShared({
        //                     spuIdList: multiSelection
        //                 })
        //                 this.$message.success('商品设置共享成功！')
        //                 this.getSPUProuducts()
        //             })
        //         },
        //         // 上集市
        //         onOnMarket (val) {
        //             this.onBatchOnMarket([{ spuId: val.spuId }])
        //         },
        //         // 批量下集市
        //         onBatchOffMarket (multiSelection) {
        //             batchOperator(multiSelection || this.multiSelection, async (multiSelection) => {
        //                 try {
        //                     await cancelShared({
        //                         spuIdList: multiSelection
        //                     })
        //                     this.$message.success('商品取消共享成功！')
        //                     this.getSPUProuducts()
        //                 } catch (error) {
        //                     this.getSPUProuducts()
        //                 }
        //             })
        //         },
        //         // 下集市
        //         onOffMarket (val) {
        //             this.onBatchOffMarket([{ spuId: val.spuId }])
        //         },
        //         // 批量上架
        //         onBatchOnShelf (multiSelection) {
        //             batchOperator(multiSelection || this.multiSelection, async (multiSelection) => {
        //                 try {
        //                     await onShelf({
        //                         spuIdList: multiSelection
        //                     })
        //                     this.$message.success('商品上架成功！')
        //                     this.getSPUProuducts()
        //                 } catch (error) {
        //                     this.getSPUProuducts()
        //                 }
        //             })
        //         },
        //         // 上架
        //         onOnShelf (val) {
        //             this.onBatchOnShelf([{ spuId: val.spuId }])
        //         },
        //         // 批量下架
        //         onBatchOffShelf (multiSelection) {
        //             batchOperator(multiSelection || this.multiSelection, async (multiSelection) => {
        //                 try {
        //                     await offShelf({
        //                         spuIdList: multiSelection
        //                     })
        //                     this.$message.success('商品下架成功！')
        //                     this.getSPUProuducts()
        //                 } catch (error) {
        //                     this.getSPUProuducts()
        //                 }
        //             })
        //         },
        //         // 下架
        //         onOffShelf (val) {
        //             this.onBatchOffShelf([{ spuId: val.spuId }])
        //         },
        //         // 批量删除
        //         onBatchDel (multiSelection) {
        //             // TODO: 确认批量删除提醒没有
        //             batchOperator(multiSelection || this.multiSelection, async (multiSelection) => {
        //                 this.$confirm('是否删除商品?', '提示', {
        //                     confirmButtonText: '确定',
        //                     cancelButtonText: '取消'
        //                 }).then(async () => {
        //                     await delProduct({
        //                         spuIdList: multiSelection
        //                     })
        //                     this.$message.success('商品删除成功！')
        //                     this.getSPUProuducts()
        //                 }).catch(() => { })
        //             })
        //         },
        //         // 删除
        //         onDelete (val) {
        //             this.onBatchDel([{ spuId: val.spuId }])
        //         },
        //         async onOnShelfSKU ({ skuId }) {
        //             await onShelfSku({ skuId: skuId, shelfOperation: 1 })
        //             this.$message.success('商品上架成功！')
        //             this.getSKUProuducts()
        //         },
        //         async onOffShelfSKU ({ skuId }) {
        //             await onShelfSku({ skuId: skuId, shelfOperation: 0 })
        //             this.$message.success('商品下架成功！')
        //             this.getSKUProuducts()
        //         },
        //         // 翻页操作
        //         onCurrentChangeSpu (val) {
        //             this.queryParams.pageNumber = val.pageNumber
        //             this.getSPUProuducts()
        //         },
        //         // 翻页操作
        //         onCurrentChangeSku (val) {
        //             this.queryParams.pageNumber = val.pageNumber
        //             this.getSKUProuducts()
        //         },
        //         onUpload (row) {
        //             this.uploadSpuId = row.spuId
        //         },
        //         onGoodInfo (spuId) {
        //             this.visible = true
        //             this.uploadSpuId = spuId
        //             this.getGoodAffixInfo()
        //         },
        //         beforeUpload (file) {
        //             if (file.type != 'application/pdf') {
        //                 this.$message.error('上传文件格式不正确!')
        //                 return false
        //             }
        //             const fileSize = file.size / 1024 / 1024 < 20
        //             if (!fileSize) {
        //                 this.$message.error('上传图片大小不能超过 20MB!')
        //                 return false
        //             }
        //             this.beforeList.push(file)
        //             return fileSize
        //         },
        //         async handleSuccess (file, fileList) {
        //             this.successList.push(file)
        //             const formData = {
        //                 spuAttachmentBoList: file.data.map(item => {
        //                     return {
        //                         name: item.fileName,
        //                         url: item.accessUrl,
        //                         spuId: this.uploadSpuId
        //                     }
        //                 })
        //             }
        //             await uploadGoodAffixInfo(formData)
        //             if (this.beforeList.length == this.successList.length) {
        //                 this.$message.success('商品资料上传成功！')
        //                 await this.getGoodAffixInfo()
        //                 await this.getSPUProuducts()
        //             }
        //         },
        //         onDelAffix (item) {
        //             this.$confirm('确定要删除 ' + item.name + ' 吗？', '提示', {
        //                 confirmButtonText: '确定',
        //                 cancelButtonText: '取消'
        //             }).then(async () => {
        //                 await delGoodAffixInfo({ id: item.id })
        //                 this.$message.success(item.name + '删除成功！')
        //                 await this.getGoodAffixInfo()
        //                 await this.getSPUProuducts()
        //             }).catch(() => {
        //                 this.$message.info(item.name + '取消删除！')
        //             })
        //         },
        //         onDownAffix (item) {
        //             window.open(item.url)
        //         },
        //         onExport () {
        //             if (this.productType == 'SPU') {
        //                 if (this.tableDataSpu.length <= 0) {
        //                     this.$message.warning('无商品可导出！')
        //                 } else {
        //                     requestDownload({
        //                         url: interfaceUrl + 'product/api/spu/page/export',
        //                         method: 'get',
        //                         data: {
        //                             ...this.queryParams
        //                         }
        //                     })
        //                 }
        //             } else {
        //                 if (this.tableDataSku.length <= 0) {
        //                     this.$message.warning('无商品可导出！')
        //                 } else {
        //                     requestDownload({
        //                         url: interfaceUrl + 'product/api/sku/page/export',
        //                         method: 'get',
        //                         data: {
        //                             ...this.queryParams
        //                         }
        //                     })
        //                 }
        //             }
        //         },
        //         async getGoodAffixInfo () {
        //             await this.findSpuAttachments({
        //                 spuId: this.uploadSpuId
        //             })
        //         },
        //         tabParams (tabName) {
        //             if (tabName == 'checkPending') {
        //                 this.queryParams.auditStatus = '0'
        //                 this.queryParams.isOnShelf = ''
        //             } else if (tabName == 'reject') {
        //                 this.queryParams.auditStatus = '2'
        //                 this.queryParams.isOnShelf = ''
        //             } else if (tabName == 'onShelf') {
        //                 this.queryParams.auditStatus = ''
        //                 this.queryParams.isOnShelf = '1'
        //             } else if (tabName == 'offShelf') {
        //                 this.queryParams.auditStatus = '1'
        //                 this.queryParams.isOnShelf = '0'
        //             }
        //         },
        ...mapActions({
            findProductSpuList: 'productManage/findProductSpuList',
            findProductSkuList: 'productManage/findProductSkuList'
        }),
        async getProductList () {
            await this.findProductSpuList(this.queryParams)
        }
        //         async getSPUProuducts () {
        //             await this.findSpuList(this.queryParams)
        //             if (this.tabName == 'onShelf') {
        //                 this.tableLabelSpu = [
        //                     { label: 'SPU编码', prop: 'spuCode' },
        //                     { label: '商品名称', prop: 'spuName' },
        //                     { label: '品牌', prop: 'brandName' },
        //                     { label: '型号', prop: 'model' },
        //                     { label: '可销售库存', prop: 'saleableStock' },
        //                     { label: '活动库存', prop: 'activityStock' },
        //                     { label: '商品资料', prop: 'attachmentCount' },
        //                     { label: '是否共享', prop: 'isShared' }
        //                 ]
        //             } else {
        //                 this.tableLabelSpu = [
        //                     { label: 'SPU编码', prop: 'spuCode' },
        //                     { label: '商品名称', prop: 'spuName' },
        //                     { label: '品牌', prop: 'brandName' },
        //                     { label: '型号', prop: 'model' },
        //                     { label: '可销售库存', prop: 'saleableStock' },
        //                     { label: '活动库存', prop: 'activityStock' },
        //                     { label: '商品资料', prop: 'attachmentCount' }
        //                 ]
        //             }
        //             this.tableDataSpu = this.spuList.records
        //             this.paginationDataSpu = {
        //                 pageNumber: this.spuList.current,
        //                 pageSize: this.spuList.size,
        //                 total: this.spuList.total
        //             }
        //         },
        //         async getSKUProuducts () {
        //             await this.findSkuList(this.queryParams)
        //             if (this.tabName == 'onShelf') {
        //                 this.tableLabelSku = [
        //                     { label: 'SKU编码', prop: 'skuCode' },
        //                     { label: '商品名称', prop: 'skuName' },
        //                     { label: '品牌', prop: 'brandName' },
        //                     { label: '型号', prop: 'model' },
        //                     { label: '销售价', prop: 'salesPrice', formatter: 'money' },
        //                     { label: '建议零售价', prop: 'retailPrice', formatter: 'money' },
        //                     { label: '库存', prop: 'availableStock' },
        //                     { label: '销售库存', prop: 'saleableStock' },
        //                     { label: '佣金', prop: 'commission' },
        //                     { label: '是否共享', prop: 'isShared' }
        //                 ]
        //             } else {
        //                 this.tableLabelSku = [
        //                     { label: 'SKU编码', prop: 'skuCode' },
        //                     { label: '商品名称', prop: 'skuName' },
        //                     { label: '品牌', prop: 'brandName' },
        //                     { label: '型号', prop: 'model' },
        //                     { label: '销售价', prop: 'salesPrice', formatter: 'money' },
        //                     { label: '建议零售价', prop: 'retailPrice', formatter: 'money' },
        //                     { label: '库存', prop: 'availableStock' },
        //                     { label: '销售库存', prop: 'saleableStock' },
        //                     { label: '佣金', prop: 'commission' }
        //                 ]
        //             }
        //             this.tableDataSku = this.skuList.records
        //             this.paginationDataSku = {
        //                 pageNumber: this.skuList.current,
        //                 pageSize: this.skuList.size,
        //                 total: this.skuList.total
        //             }
        //         }
    },
    mounted () {
        this.queryParams.merchantCode = this.userInfo.merchantCode
        this.resetParams = { ...this.queryParams }
        //         this.queryParams.isOnShelf = '1'
        this.onQuery()
        //         this.findAllBrands()
    }
    //     activated () {
    //         if (this.productType == 'SPU') {
    //             this.getSPUProuducts()
    //         } else {
    //             this.getSKUProuducts()
    //         }
    //     },
    //     beforeRouteEnter (to, from, next) {
    //         newCache('productList')
    //         next()
    //     },
    //     beforeRouteLeave (to, from, next) {
    //         if (!(to.name == 'editProduct' || to.name == 'editSku')) {
    //             clearCache('productList')
    //         }
    //         next()
    //     }
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
