<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>推荐榜单</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="addRecommend">新增推荐商品</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantRecommendList" :pagination="cloudMerchantRecommendListPagination" :isAction="true" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
                <template slot="sellingPoints" slot-scope="scope">
                    <div style="color: red" @click="editSellingPoints(scope.data.row)">{{scope.data.row.sellingPoints}}</div>
                </template>
                <template slot="discountPrice" slot-scope="scope">
                    <div style="color: red" @click="editDiscountPrice(scope.data.row)">{{scope.data.row.discountPrice}}</div>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                    <el-button v-if="canMoveDown(scope)" class="orangeBtn" @click="onMoveDown(scope.data.row)">下移</el-button>
                    <el-button v-if="canMoveUp(scope)" class="orangeBtn" @click="onMoveUp(scope.data.row)">上移</el-button>
                </template>
            </basicTable>
        </div>

        <el-dialog width="1200px" title="新增推荐商品" :visible.sync="dialogAddVisible" :close-on-click-modal="false" :before-close="onCloseAddDialog">
            <el-form :model="form" :rules="rules" ref="addForm" label-width="140px">
                <el-form-item label="商品名称：" prop="productName">
                    <el-input style="width: 300px" placeholder="输入已上架的商品名称" v-model="form.productName"></el-input>
                </el-form-item>
                <el-form-item label="商品卖点：" prop="sellingPoints">
                    <el-input type="textarea"  placeholder="输入商品卖点，不超过100个字符" maxlength="100" v-model="form.sellingPoints"></el-input>
                </el-form-item>
                <el-form-item label="特惠价：" prop="discountPrice">
                    <el-input v-model="form.discountPrice" v-on:input="addDiscountPriceChanged" style="width: 150px" maxlength="10" placeholder="请输入特惠价"></el-input> 元
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddClick">取 消</el-button>
                <el-button type="primary" @click="submitAddForm" :loading="isAdding">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog class="edit-dialog" width="800px" title="商品卖点编辑" :visible.sync="dialogSellingPointsVisible" :close-on-click-modal="false" :before-close="onCloseSellingPointsDialog">
            <el-form :model="sellingPointsForm" :rules="sellingPointsRules" ref="sellingPointsForm" label-width="140px">
                <el-form-item label="商品卖点：" prop="sellingPoints">
                    <el-input type="textarea" placeholder="输入商品卖点，不超过100个字符" maxlength="100" v-model="sellingPointsForm.sellingPoints"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelSellingPointsClick">取 消</el-button>
                <el-button type="primary" @click="submitSellingPointsForm" :loading="isAdding">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog class="edit-dialog" width="600px" title="商品特惠价编辑" :visible.sync="dialogDiscountPriceVisible" :close-on-click-modal="false" :before-close="onCloseDiscountPriceDialog">
            <el-form :model="discountPriceForm" :rules="discountPriceFormRules" ref="discountPriceForm" label-width="140px">
                <el-form-item label="特惠价：" prop="discountPrice">
                    <el-input v-model="discountPriceForm.discountPrice" v-on:input="editDiscountPriceChanged" style="width: 150px" maxlength="10" placeholder="请输入特惠价"></el-input> 元
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDiscountPriceClick">取 消</el-button>
                <el-button type="primary" @click="submitDiscountPriceForm" :loading="isAdding">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex'
import {
    addCloudMerchantRecommend,
    changeCloudMerchantRecommend,
    deleteCloudMerchantRecommend,
    moveCloudMerchantRecommend
} from '../api'

export default {
    name: 'merchantRecommendList',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            form: {
                productName: '',
                sellingPoints: '',
                discountPrice: ''
            },
            tableLabel: [
                { label: '品类', prop: 'categoryName' },
                { label: '商品型号', prop: 'specificationName' },
                { label: '商品名称', prop: 'productName' },
                { label: '商品卖点', prop: 'sellingPoints' },
                { label: '特惠价（元）', prop: 'discountPrice', formatters: 'money' }],
            dialogAddVisible: false,
            isAdding: false,
            rules: {
                productName: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                sellingPoints: [
                    { required: true, message: '请输入商品卖点', trigger: 'blur' }
                ],
                discountPrice: [
                    { required: true, message: '请输入特惠价', trigger: 'blur' }
                ]
            },
            focusRowData: null,
            dialogSellingPointsVisible: false,
            sellingPointsForm: {
                sellingPoints: ''
            },
            sellingPointsRules: {
                sellingPoints: [
                    { required: true, message: '请输入商品卖点', trigger: 'blur' }
                ]
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
            cloudMerchantRecommendList: 'cloudMerchantRecommendList',
            cloudMerchantRecommendListPagination: 'cloudMerchantRecommendListPagination'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            findCloudMerchantRecommendList: 'findCloudMerchantRecommendList'
        }),
        addDiscountPriceChanged: function(value) {
            this.form.discountPrice = value.replace(/[^\d.]/g,'')
        },
        editDiscountPriceChanged: function(value) {
            this.discountPriceForm.discountPrice = value.replace(/[^\d.]/g,'')
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
            this.findCloudMerchantRecommendList(params)
        },
        editSellingPoints (row) {
            this.focusRowData = row
            this.clearSellingPointsDialogData()
            this.sellingPointsForm.sellingPoints = row.sellingPoints
            this.dialogSellingPointsVisible = true
        },
        editDiscountPrice (row) {
            this.focusRowData = row
            this.clearDiscountPriceDialogData()
            this.discountPriceForm.discountPrice = row.discountPrice
            this.dialogDiscountPriceVisible = true
        },
        canMoveDown (scope) {
            return scope.data.$index + (this.cloudMerchantRecommendListPagination.pageNumber - 1) * this.cloudMerchantRecommendListPagination.pageSize < this.cloudMerchantRecommendListPagination.total - 1
        },
        canMoveUp (scope) {
            return scope.data.$index + (this.cloudMerchantRecommendListPagination.pageNumber - 1) * this.cloudMerchantRecommendListPagination.pageSize > 0
        },
        onDelete (data) {
            this.$confirm('删除后小程序端将不展示该推荐商品，请确认是否继续删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteCloudMerchantRecommend({
                    id: data.id,
                    currentSort: data.sort,
                    operator: this.userInfo.employeeName
                })
                this.$message.success('删除成功')
                this.queryList(this.queryParams)
            }).finally(null)
        },
        onMoveDown (data) {
            this.moveProduct(data, -1)
        },
        onMoveUp (data) {
            this.moveProduct(data, 1)
        },
        async moveProduct (data, moveType) { // 1=上移, -1=下移
            await moveCloudMerchantRecommend({
                id: data.id,
                moveType: moveType,
                currentSort: data.sort,
                operator: this.userInfo.employeeName
            })
            this.$message.success('移动成功')
            this.queryList(this.queryParams)
        },
        clearAddFormData () {
            if (this.$refs['addForm']) {
                this.$refs['addForm'].clearValidate()
                this.form = {
                    productName: '',
                    sellingPoints: '',
                    discountPrice: ''
                }
            }
        },
        onCloseAddDialog () {
            this.clearAddFormData()
            this.dialogAddVisible = false
        },
        addRecommend () {
            // 新增商品
            this.clearAddFormData()
            this.dialogAddVisible = true
        },
        cancelAddClick () {
            this.clearAddFormData()
            this.dialogAddVisible = false
        },
        submitAddForm () {
            if (this.isAdding) {
                return
            }
            this.isAdding = true
            this.$refs['addForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        await this.sendAddRecommend()
                        this.isAdding = false
                    } catch (e) {
                        this.isAdding = false
                    }
                } else {
                    this.isAdding = false
                }
            })
        },
        async sendAddRecommend () {
            console.log(this.form)
            let { ...params } = this.form
            params.operator = this.userInfo.employeeName

            await addCloudMerchantRecommend(params)

            this.$message({
                message: '添加成功！',
                type: 'success'
            })
            this.queryList(this.queryParams)
            this.clearAddFormData()
            this.dialogAddVisible = false
        },
        clearSellingPointsDialogData () {
            if (this.$refs['sellingPointsForm']) {
                this.$refs['sellingPointsForm'].clearValidate()
                this.form = {
                    sellingPoints: '',
                    discountPrice: ''
                }
            }
        },
        onCloseSellingPointsDialog () {
            this.clearSellingPointsDialogData()
            this.dialogSellingPointsVisible = false
        },
        cancelSellingPointsClick () {
            this.clearSellingPointsDialogData()
            this.dialogSellingPointsVisible = false
        },
        submitSellingPointsForm (data) {
            if (this.isAdding) {
                return
            }
            this.isAdding = true
            this.$refs['sellingPointsForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        await this.sendEditSellingPoints(data)
                        this.isAdding = false
                    } catch (e) {
                        this.isAdding = false
                    }
                } else {
                    this.isAdding = false
                }
            })
        },
        async sendEditSellingPoints () {
            await changeCloudMerchantRecommend({
                id: this.focusRowData.id,
                sellingPoints: this.sellingPointsForm.sellingPoints,
                operator: this.userInfo.employeeName
            })
            this.$message({
                message: '修改成功！',
                type: 'success'
            })
            this.queryList(this.queryParams)
            this.clearSellingPointsDialogData()
            this.dialogSellingPointsVisible = false
        },
        clearDiscountPriceDialogData () {
            if (this.$refs['discountPriceForm']) {
                this.$refs['discountPriceForm'].clearValidate()
                this.form = {
                    discountPrice: ''
                }
            }
        },
        onCloseDiscountPriceDialog () {
            this.clearDiscountPriceDialogData()
            this.dialogDiscountPriceVisible = false
        },
        cancelDiscountPriceClick () {
            this.clearDiscountPriceDialogData()
            this.dialogDiscountPriceVisible = false
        },
        submitDiscountPriceForm () {
            if (this.isAdding) {
                return
            }
            this.isAdding = true
            this.$refs['discountPriceForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        await this.sendEditDiscountPrice()
                        this.isAdding = false
                    } catch (e) {
                        this.isAdding = false
                    }
                } else {
                    this.isAdding = false
                }
            })
        },
        async sendEditDiscountPrice () {
            await changeCloudMerchantRecommend({
                id: this.focusRowData.id,
                discountPrice: this.discountPriceForm.discountPrice,
                operator: this.userInfo.employeeName
            })
            this.$message({
                message: '修改成功！',
                type: 'success'
            })
            this.queryList(this.queryParams)
            this.clearDiscountPriceDialogData()
            this.dialogDiscountPriceVisible = false
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
