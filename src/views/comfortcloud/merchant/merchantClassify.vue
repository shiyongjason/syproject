<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>一键匹配智能辅材</span>
        </div>

        <div class="page-body-cont query-cont">
            <el-popover placement="right" width="200" trigger="hover">
                <div class="popover-btn" @click="addClassifyByProduct">按主营产品</div>
                <div class="popover-btn" @click="addClassifyByMember">按会员标签</div>

                <div class="query-cont-col" slot="reference">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20">新增智能辅材匹配关系</el-button>
                    </div>
                </div>
            </el-popover>

        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantClassifyList" :isShowIndex='true' :pagination="cloudMerchantClassifyListPagination" :isAction="true" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
                <template slot="type" slot-scope="scope">
                    <span>{{scope.data.row.type === 1 ? '按主营产品' : '按会员标签'}}</span>
                </template>
                <template slot="products" slot-scope="scope">
                    <div v-html="productDes(scope.data.row.products)">{{}}</div>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="checkClassify(scope.data.row)">编辑</el-button>
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
        <el-dialog width="600px" :title="isEdith?'匹配商品编辑':'新增匹配商品'" :visible.sync="addByTagDialogVisible" :close-on-click-modal="false" :before-close="onCloseAddByTagDialog">
            <el-form :model="form" :rules="rules" ref="addByTagForm" label-width="90px" label-position="left">
                <el-form-item label="选择会员标签（需至少选择一个标签）" label-width="300px">
                </el-form-item>

                <el-form-item label="手动标签：">
                    <el-select v-model="addByTagForm.manualTags" multiple>
                        <el-option-group v-for="group in cloudMerchantTaglist" :key="group.tagCategory" :label="group.tagCategory">
                            <el-option v-for="item in group.tagDetailBos" :key="item" :label="item" :value="item"></el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="自动标签：">
                    <el-select v-model="addByTagForm.autoTags" value-key="tagId" multiple>
                        <el-option v-for="item in allAutoTags" :key="item.tagId" :label="item.tagName" :value="item"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="推荐搭配产品（同一个产品仅需维护一次匹配关系）" required label-width="400px"></el-form-item>
                <el-form-item label="商品名称：" v-for="(item,index) in addByTagForm.mainProductList" :key="index">
                    <el-select v-model="item.productName" @change='selectItem(item)' placeholder="输入已上架的商品名称" reserve-keyword filterable remote :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="items in options" :key="items.productId" :label="items.productName" :value="items.productName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddByTagClick">取 消</el-button>
                <el-button type="primary" @click="submitAddByTagForm" :loading="isAdding">确 定</el-button>
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
    getMerchantClassifyOfCategoryList,
    getDictionary,
    addMerchantClassifyByTag,
    modifyMerchantClassifyByTag,
    getMerchantClassifyByTag, deleteMerchantClassifyByTag
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
                { label: '匹配类型', prop: 'type' },
                { label: '匹配内容', prop: 'mainCategoryName' },
                { label: '匹配商品', prop: 'products' }
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
            addByTagDialogVisible: false,
            addByTagForm: {
                manualTags: [],
                autoTags: [],
                mainProductList: [{}]
            },
            allAutoTags: []
        }
    },
    async mounted () {
        this.queryList(this.queryParams)
        this.findCloudMerchantTaglist()
        const { data } = await getDictionary({
            item: 'out_store_water_member_auto_tag'
        })
        this.allAutoTags = data.data.map((v) => {
            return {
                tagType: 1,
                tagId: parseInt(v.dataKey),
                tagName: v.dataValue
            }
        })
    },
    computed: {
        ...mapGetters({
            cloudMerchantClassifyList: 'cloudMerchantClassifyList',
            cloudMerchantClassifyListPagination: 'cloudMerchantClassifyListPagination',
            cloudMerchantTaglist: 'cloudMerchantTaglist'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            findCloudMerchantClassifyList: 'findCloudMerchantClassifyList',
            findCloudMerchantTaglist: 'findCloudMerchantTaglist'
        }),
        addClassifyByProduct: function () {
            this.isEdith = false
            this.clearAddFormData()
            this.dialogAddVisible = true
        },
        addClassifyByMember: function () {
            this.isEdith = false
            this.clearAddByMemberTagFromData()
            this.addByTagDialogVisible = true
        },
        checkClassify: async function (item) {
            if (item.type === 1) {
                this.isEdith = true
                this.clearAddFormData()
                const mainProductList = await getMerchantClassifyOfCategoryList({ mainCategoryId: item.id })
                this.form.mainCategoryName = item.mainCategoryName
                this.form.id = item.id
                this.form.mainProductList = mainProductList.data
                console.log(this.form, '查看列表')
                this.dialogAddVisible = true
            } else if (item.type === 2) {
                this.isEdith = true
                this.clearAddByMemberTagFromData()
                const classfyInfo = await getMerchantClassifyByTag({ batchNo: item.batchNo })

                this.addByTagForm = {
                    batchNo: item.batchNo,
                    mainProductList: classfyInfo.data.productList.length > 0 ? classfyInfo.data.productList : [{}], // 如果商品下架，mainProductList为空，则新建一个空元素
                    manualTags: classfyInfo.data.manualTagList.map((v) => v.tagName),
                    autoTags: classfyInfo.data.autoTagList
                }
                console.log(this.addByTagForm)
                console.log(this.allAutoTags)
                this.addByTagDialogVisible = true
            }
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
            this.$confirm('删除后小程序端将不展示该匹配商品，请确认是否继续删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                if (data.type === 1) {
                    await deleteMerchantClassifyList({
                        id: data.id,
                        operateUserName: this.userInfo.employeeName
                    })
                } else {
                    await deleteMerchantClassifyByTag({
                        batchNo: data.batchNo,
                        operator: this.userInfo.employeeName
                    })
                }
                this.$message.success('删除成功')
                this.queryList(this.queryParams)
            }).finally(null)
        },

        productDes (data) {
            let des = ''
            data.map((item) => {
                des += item.productName + '<br>'
            })
            return des
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
        },
        clearAddByMemberTagFromData () {
            if (this.$refs['addByTagForm']) {
                this.$refs['addByTagForm'].clearValidate()
                this.addByTagForm = {
                    manualTags: [],
                    autoTags: [],
                    mainProductList: [{}]
                }
            }
        },
        onCloseAddByTagDialog () {
            this.clearAddByMemberTagFromData()
            this.addByTagDialogVisible = false
        },
        cancelAddByTagClick () {
            this.clearAddByMemberTagFromData()
            this.addByTagDialogVisible = false
        },
        async submitAddByTagForm () {
            if (this.isAdding) {
                return
            }

            if (this.addByTagForm.manualTags.length === 0 && this.addByTagForm.autoTags.length === 0) {
                this.$message.error('请至少选择一个手动标签或自动标签')
                return
            }

            if (this.addByTagForm.mainProductList[0].productId == null) {
                this.$message.error('请选择搭配产品')
                return
            }
            this.isAdding = true
            try {
                await this.sendAddByTagClassify()
                this.isAdding = false
            } catch (e) {
                this.isAdding = false
            }
        },
        async sendAddByTagClassify () {
            let params = {
                operator: this.userInfo.employeeName,
                mainProductList: this.addByTagForm.mainProductList
            }

            let manualTags = this.addByTagForm.manualTags.map((v) => {
                return {
                    tagType: 2,
                    tagName: v,
                    tagId: 0
                }
            })
            let autoTags = this.addByTagForm.autoTags

            params.tagList = manualTags.concat(autoTags)

            if (this.isEdith) {
                params.batchNo = this.addByTagForm.batchNo

                await modifyMerchantClassifyByTag(params)
                this.$message({
                    message: '编辑成功！',
                    type: 'success'
                })
            } else {
                await addMerchantClassifyByTag(params)
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                })
            }
            this.queryList(this.queryParams)
            this.clearAddByMemberTagFromData()
            this.addByTagDialogVisible = false
        }
    }
}
</script>

<style scoped lang="scss">
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}

.popover-btn {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;

    &:hover {
        background-color: $hosjoyColorHover;
        color: white;
    }
}

/deep/.el-form .el-input:not(:first-child) {
    margin-left: 0px;
}
</style>
