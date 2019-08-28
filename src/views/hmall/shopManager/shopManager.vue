<template>
    <div class="shop-manager">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">商品编码：</div>
                        <div class="flex-wrap-cont">
                            <el-input v-model="queryParams.productCode" placeholder="请输入商品编码" maxlength="50"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">商品名称：</div>
                        <div class="flex-wrap-cont">
                            <el-input v-model="queryParams.productName" placeholder="请输入商品名称" maxlength="50"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">商品品牌：</div>
                        <div class="flex-wrap-cont">
                            <el-input v-model="queryParams.brandName" placeholder="请输入商品品牌" maxlength="50"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">商品状态：</div>
                        <div class="flex-wrap-cont">
                            <el-select v-model="queryParams.status" style="width: 100%">
                                <el-option label="全部" value="">
                                </el-option>
                                <el-option label="上架" value="1">
                                </el-option>
                                <el-option label="下架" value="2">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">商品来源：</div>
                        <div class="flex-wrap-cont">
                            <el-select v-model="queryParams.sourceCode" style="width: 100%">
                                <el-option label="全部" value="">
                                </el-option>
                                <el-option :key="item.sourceCode" :label="item.sourceName" :value="item.sourceCode" v-for="item in productSource">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">商品类目：</div>
                        <div class="flex-wrap-cont">
                            <el-cascader :options="productCategoryList" v-model="queryParams.categoryId" :change-on-select="true" @change="productCategoryChange" style="width: 100%"></el-cascader>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">维护时间：</div>
                        <div class="flex-wrap-cont">
                            <el-date-picker v-model="queryParams.startDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10">-</span>
                            <el-date-picker v-model="queryParams.endDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">维护人：</div>
                        <div class="flex-wrap-cont">
                            <el-input type="text" maxlength="50" v-model="queryParams.updateBy" placeholder="请输入维护人姓名">
                            </el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="flex-wrap-cont">
                            <el-button type="primary" class="ml20" @click="onQuery()">
                                搜索
                            </el-button>
                            <el-button type="primary" class="ml20" @click="onExport()">
                                导出
                            </el-button>
                            <el-button type="primary" class="ml20" @click="dialogFormVisible = true">
                                导入
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <shopManagerTable ref="shopManagerTable" :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateBrand="updateBrandChange" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></shopManagerTable>
        </div>
        <el-dialog title="商品库导入" :visible.sync="dialogFormVisible">
            <div class="table-cont-title clearfix">
                <span class="table-title-name fll">选择商品类目</span>
            </div>
            <div class="buildGoods-cont-select mb20 clearfix">
                <div class="goods-select-item">
                    <ul>
                        <li :class="item.selected ? 'selected' : ''" v-for="item in categoryFirst" :key="item.id" @click="onNext(item,1)">
                            <span :title="item.value">{{item.categoryName}}</span>
                            <i class="iconfont icon-hosjoy_right"></i>
                        </li>
                    </ul>
                </div>
                <div class="goods-select-item">
                    <ul>
                        <li :class="item.selected ? 'selected' : ''" v-for="item in categorySecond" :key="item.id" @click="onNext(item,2)">
                            <span :title="item.value">{{item.categoryName}}</span>
                            <i class="iconfont icon-hosjoy_right"></i>
                        </li>
                    </ul>
                </div>
                <div class="goods-select-item">
                    <ul>
                        <li :class="item.selected ? 'selected' : ''" v-for="item in categoryThird" :key="item.id">
                            <span :title="item.value">{{item.categoryName}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <span clas bvs="current-select">当前选择：{{ this.selectedCategoryValue }}</span>
            <div class="table-cont-title clearfix">
                <span class="table-title-name fll">下载模板</span>
            </div>
            <el-button type="primary" class="ml20" @click="downloadTem()">点击下载模板</el-button>
            <div class="table-cont-title clearfix">
                <span class="table-title-name fll">上传模板</span>
            </div>
            <input type="file" accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
            <!-- <el-upload
                class="upload-demo"
                ref="upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                accept=".txt,.xls"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import shopManagerTable from './components/shopManagerTable'
import { findProducts, findProductSource, findProductCategory } from './api/index'
import { findCategoryByParent } from '@/views/hmall/category/api/index'
import { B2bUrl } from '@/api/config'
import { mapMutations } from 'vuex'
import { Message } from 'element-ui'
export default {
    name: 'shopManager',
    components: {
        shopManagerTable
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endDate
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startDate
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    data () {
        return {
            dialogFormVisible: false,
            queryParams: {
                productCode: '',
                productName: '',
                updateBy: '',
                brandName: '',
                pageNumber: 1,
                status: '',
                startDate: '',
                endDate: '',
                categoryId: [],
                sourceCode: ''
            },
            tableData: [],
            paginationData: {},
            productSource: [],
            productCategoryList: [],
            categoryFirst: [],
            categorySecond: [],
            categoryThird: [],
            selectedCategoryValue: '',
            secondCategoryId: '' // 选中二级类目id
        }
    },
    methods: {
        handlePreview () {
            console.log('handlePreview')
        },
        handleRemove () {
            console.log('handleRemove')
        },
        fileList () {
            console.log('fileList')
        },
        ...mapMutations({
            changePage: 'CHANGE_MANAGE_PAGE_NUMBER'
        }),
        onNext (item, index) {
            console.log(item)
            if (index === 1) {
                this.selectedCategoryValue = item.categoryName
                this.categoryThird = []
                this.categoryFirst.map((i) => {
                    i.selected = false
                })
            } else if (index === 2) {
                this.secondCategoryId = item.id
                const first = this.selectedCategoryValue.split('>')[0]
                this.selectedCategoryValue = first + '>' + item.categoryName
                this.categorySecond.map((i) => {
                    i.selected = false
                })
            }
            item.selected = true
            this.findCategoryByParent(item.id, index)
        },
        async findCategoryByParent (parentId, index) {
            const { data } = await findCategoryByParent({
                parentId
            })
            data.map((item) => {
                item.selected = false
            })
            if (parentId === 0) {
                this.categoryFirst = data
            } else if (index === 1) {
                this.categorySecond = data
            } else if (index === 2) {
                this.categoryThird = data
            }
        },
        async onQuery () {
            const { ...params } = this.queryParams
            if (params.startDate) {
                params.startDate = this.$root.$options.filters.formatterTime(params.startDate)
            }
            if (params.endDate) {
                params.endDate = this.$root.$options.filters.formatterTime(params.endDate)
            }
            if (params.categoryId) params.categoryId = params.categoryId[params.categoryId.length - 1]
            const { data } = await findProducts(params)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.changePage(val)
            this.queryParams.pageNumber = val
            this.onQuery()
        },
        updateBrandChange (col) {
            this.modifyId = col.id
            this.form = this.tempForm
            this.findBrandDetails()
        },
        productCategoryChange (val) {
            this.queryParams.categoryId = val
        },
        onExport () {
            window.location = B2bUrl + 'product/api/boss/products/export?status=' + this.queryParams.status +
                '&startDate=' + this.queryParams.startDate +
                '&endDate=' + this.queryParams.endDate +
                '&categoryId=' + this.queryParams.categoryId +
                '&sourceCode=' + this.queryParams.sourceCode +
                '&productName=' + this.queryParams.productName +
                '&productCode=' + this.queryParams.productCode +
                '&updateBy=' + this.queryParams.updateBy +
                '&brandName=' + this.queryParams.brandName
        },
        async downloadTem () {
            if (!this.secondCategoryId) {
                Message({ message: '请选择二级类目', type: 'warning' })
                return
            }
            if (this.categoryThird.length === 0) {
                Message({ message: '二级类目下无三级类目', type: 'warning' })
                return
            }
            window.location = B2bUrl + 'product/api/products/import/template?templateType=1&secondCategoryId=' + this.secondCategoryId
        }
    },
    async mounted () {
        this.queryParams.pageNumber = this.$store.state.hmall.managePageNumber
        this.onQuery()
        this.findCategoryByParent(0)
        const { data } = await findProductSource()
        this.productSource = data
        const { data: productCategory } = await findProductCategory()
        let productCategoryTemp = []
        productCategoryTemp = productCategory.map((value) => {
            let obj = {
                value: value.id,
                label: value.categoryName,
                children: value.categoryList ? value.categoryList.map(value1 => {
                    let obj1 = {
                        value: value1.id,
                        label: value1.categoryName,
                        children: value1.categoryList ? value1.categoryList.map(value2 => {
                            let obj2 = {
                                value: value2.id,
                                label: value2.categoryName
                            }
                            return obj2
                        }) : null
                    }
                    return obj1
                }) : null
            }
            return obj
        })
        productCategoryTemp.splice(0, 0, {
            value: '',
            label: '全部'
        })
        this.productCategoryList = productCategoryTemp
    }
}
</script>

<style lang="scss" scoped>
.status-on {
    color: #999999;
}
.flex-wrap-row {
    max-width: 1350px;
}
.buildGoods-cont-select {
    display: flex;
    justify-content: flex-start;
    .goods-select-item {
        width: 33%;
        height: 100px;
        overflow-y: scroll;
        border: 2px solid #f0f0f0;
        margin-right: 10px;
        li {
            padding: 5px 0 0 10%;
        }
    }
}
.selected {
    background-color: #ff7a45;
    color: #ffffff;
}
</style>
