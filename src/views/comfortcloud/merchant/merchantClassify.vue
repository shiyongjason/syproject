<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>一键匹配智能辅材</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="addClassify">新增智能辅材匹配关系</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantClassifyList" :isShowIndex='true' :pagination="cloudMerchantClassifyListPagination" :isAction="true" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="checkClassify(scope.data.row)">查看匹配商品</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>

        <el-dialog width="600px" :title="isEdith?'匹配商品编辑':'新增匹配商品'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" :before-close="onCloseAddDialog">
            <el-form :model="form" :rules="rules" ref="addForm" label-width="140px">
                <el-form-item label="主营产品：" prop="mainCategoryName">
                    <el-input style="width: 250px" placeholder="输入主营产品" maxlength='20' v-model="form.mainCategoryName"></el-input>
                </el-form-item>
                <el-form-item label="推荐搭配商品：">
                    <el-button type="primary" @click="addClassifyMerchants">新增</el-button>
                </el-form-item>
                <el-form-item label="商品名称：" v-for="(item,index) in form.mainProductList" :key="index" :prop="'mainProductList.'+index+'.productId'" :rules="rules.productId">
                    <el-select v-model="item.productName" @change='selectItem(item)' placeholder="输入已上架的商品名称" reserve-keyword filterable remote :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="items in options" :key="items.productId" :label="items.productName" :value="items.productName">
                        </el-option>
                    </el-select>
                    <el-button type="danger" style="margin-left:20px" @click="deleteClassifyMerchants(index)">删除</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddClick">取 消</el-button>
                <el-button type="primary" @click="submitAddForm" :loading="isAdding">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex'
import {
    getLikeMerchantList,
    editMerchantClassifyList,
    addMerchantClassifyList,
    deleteMerchantClassifyList,
    getMerchantClassifyOfCategoryList
} from '../api'

export default {
    name: 'merchantClassify',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            form: {
                id: null,
                mainCategoryName: '',
                mainProductList: []
            },
            loading: false,
            options: [],
            isEdith: false, // 是否是新增
            tableLabel: [
                { label: '主营产品', prop: 'mainCategoryName' }
            ],
            dialogAddVisible: false,
            isAdding: false,
            rules: {
                mainCategoryName: [
                    { required: true, message: '请输入主营产品名称', trigger: 'blur' }
                ],
                productId: [
                    { required: true, message: '请选择商品', trigger: 'change' }
                ]
            },
            focusRowData: null,
            dialogSellingPointsVisible: false,
            sellingPointsForm: {
                sellingPoints: ''
            },

            dialogDiscountPriceVisible: false,
            discountPriceForm: {
                discountPrice: ''
            },
            discountPriceFormRules: {
                discountPrice: [
                    { required: true, message: '请输入特惠价', trigger: 'blur' }
                ]
            }
        }
    },
    mounted () {
        this.queryList(this.queryParams)
    },
    computed: {
        ...mapGetters({
            cloudMerchantClassifyList: 'cloudMerchantClassifyList',
            cloudMerchantClassifyListPagination: 'cloudMerchantClassifyListPagination'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            findCloudMerchantClassifyList: 'findCloudMerchantClassifyList'
        }),
        addClassify: function () {
            this.isEdith = false
            this.clearAddFormData()
            this.dialogAddVisible = true
        },
        checkClassify: async function (item) {
            this.isEdith = true
            this.clearAddFormData()
            const mainProductList = await getMerchantClassifyOfCategoryList({ mainCategoryId: item.id })
            this.form.mainCategoryName = item.mainCategoryName
            this.form.id = item.id
            this.form.mainProductList = mainProductList.data
            console.log(this.form, '查看列表')
            this.dialogAddVisible = true
        },
        addClassifyMerchants: function () {
            this.form.mainProductList.push({ productId: '', productName: '' })
        },
        deleteClassifyMerchants: function (index) {
            this.form.mainProductList.splice(index, 1)
        },
        remoteMethod: async function (query) {
            if (query !== '') {
                this.loading = true
                // 请求数据
                this.loading = false
                const merchantList = await getLikeMerchantList({ productName: query })
                this.options = merchantList.data
            } else {
                this.options = []
            }
        },
        selectItem: function (item) {
            let sel = null
            for (let index = 0; index < this.options.length; index++) {
                const element = this.options[index]
                if (element.productName == item.productName) {
                    sel = element
                    break
                }
            }
            if (sel) {
                item.productId = sel.productId
            }
        },

        onCurrentChange: function (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.queryList(this.queryParams)
        },
        onSizeChange: function (val) {
            this.queryParams.pageSize = val
            this.queryList(this.queryParams)
        },
        queryList: function (params) {
            this.findCloudMerchantClassifyList(params)
        },

        onDelete (data) {
            if (this.cloudMerchantClassifyList.length <= 1) {
                this.$message.error('至少需保留1个主营产品推荐')
                return
            }
            this.$confirm('请确认是否继续删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteMerchantClassifyList({
                    id: data.id,
                    operateUserName: this.userInfo.employeeName
                })
                this.$message.success('删除成功')
                this.queryList(this.queryParams)
            }).finally(null)
        },

        clearAddFormData () {
            if (this.$refs['addForm']) {
                this.$refs['addForm'].clearValidate()
                this.form = {
                    mainCategoryName: '',
                    mainProductList: []
                }
            }
        },
        onCloseAddDialog () {
            this.clearAddFormData()
            this.dialogAddVisible = false
        },
        cancelAddClick () {
            this.clearAddFormData()
            this.dialogAddVisible = false
        },
        submitAddForm () {
            if (this.isAdding) {
                return
            }
            if (this.form.mainProductList.length === 0) {
                this.$message.error('请选择搭配产品')
                return
            }
            this.isAdding = true
            this.$refs['addForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        await this.sendAddClassify()
                        this.isAdding = false
                    } catch (e) {
                        this.isAdding = false
                    }
                } else {
                    this.isAdding = false
                }
            })
        },
        async sendAddClassify () {
            console.log(this.form)
            let { ...params } = this.form
            console.log(params, '新增分类')
            params.operator = this.userInfo.employeeName
            if (this.isEdith) {
                await editMerchantClassifyList(params)
                this.$message({
                    message: '编辑成功！',
                    type: 'success'
                })
            } else {
                await addMerchantClassifyList(params)
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                })
            }
            this.queryList(this.queryParams)
            this.clearAddFormData()
            this.dialogAddVisible = false
        }
    }
}
</script>

<style scoped>
.upload-tips {
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
    height: 80px;
    padding-left: 10px;
}
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}

.address {
    overflow: hidden;
    text-overflow: ellipsis;
}

/deep/ .edit-dialog .el-dialog__body {
    min-height: 60px;
}
</style>
