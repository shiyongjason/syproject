<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.branchCode" placeholder="全部" :clearable=true>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">地区：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.provinceId" placeholder="请选择省" @change="onChangeList(1)">
                            <el-option label="请选择" value=""></el-option>
                            <el-option :key="item.provinceId" :label="item.name" :value="item.provinceId" v-for="item in proviceList">
                            </el-option>
                        </el-select>
                    </div>
                    <span class="ml10 mr10">-</span>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.cityId" placeholder="请选择市">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="(item) in cityList" :key="item.cityId" :label="item.name" :value="item.cityId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">供应商名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.supplierName" placeholder="请输入供应商名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onAddsupplier">新建</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey" :isShowIndex='true'>
                <template slot="provinceName" slot-scope="scope">
                    {{scope.data.row.provinceName}}{{scope.data.row.cityName}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onEditSpu(scope.data.row)">编辑</el-button>
                    <el-button type="warning" size="mini" plain @click="onDelete(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog :title="dialogtitle" :visible.sync="dialogVisible" width="40%" :close-on-click-modal=false>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="供应商名称：" prop="supplierName">
                    <el-input v-model="ruleForm.supplierName"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="principal">
                    <el-input v-model="ruleForm.principal"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：" prop="contactDetails">
                    <el-input v-model="ruleForm.contactDetails"></el-input>
                </el-form-item>
                <el-form-item label="分部：" prop="branchCode">
                    <el-select placeholder="全部" v-model="ruleForm.branchCode" :clearable=true>
                        <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌：" prop="brandId">
                    <el-select placeholder="全部" v-model="ruleForm.brandId" :clearable=true>
                        <el-option :label="item.brandName" :value="item.id" v-for="item in brandList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品类：" prop="categoryId">
                    <el-cascader :options="categoryList" v-model="categoryIdArr" clearable @change="productCategoryChange"></el-cascader>
                </el-form-item>
                <el-form-item label="区域：" required class="">
                    <el-col :span="8">
                        <el-form-item prop="provinceId">
                            <el-select placeholder="请选择省" v-model="ruleForm.provinceId" @change="onChangeList(2)" style="width:100% !important">
                                <el-option label="请选择" value=""></el-option>
                                <el-option :key="item.provinceId" :label="item.name" :value="item.provinceId" v-for="item in rproviceList">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="ml10 " :span="1">-</el-col>
                    <el-col :span="8">
                        <el-form-item prop="cityId">
                            <el-select v-model="ruleForm.cityId" placeholder="请选择市" style="width:100%">
                                <el-option label="请选择" value=""></el-option>
                                <el-option v-for="(item) in cityLists" :key="item.cityId" :label="item.name" :value="item.cityId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onOperate()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { addSupplier, deleteSupplier, getSupplier } from './api/index'
import { mapState, mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'supplier',
    data () {
        return {
            branchArr: [],
            proviceList: [],
            rproviceList: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                provinceId: '',
                cityId: '',
                branchCode: '',
                supplierName: ''
            },
            copyForm: {},
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '供应商名称', prop: 'supplierName', width: '150' },
                { label: '分部', prop: 'branchName' },
                { label: '供货区域', prop: 'provinceName', width: '150' },
                { label: '供应商负责人', prop: 'principal', width: '150' },
                { label: '联系方式', prop: 'contactDetails', width: '150' },
                { label: '品牌', prop: 'brandName' },
                { label: '品类', prop: 'categoryName' }
            ],
            rowKey: '',
            dialogVisible: false,
            dialogtitle: '',
            brandList: [],
            categoryIdArr: [],
            ruleForm: {
                branchCode: '',
                branchName: '',
                brandId: '',
                categoryId: '',
                cityId: '',
                cityName: '',
                contactDetails: '',
                principal: '',
                provinceId: '',
                provinceName: '',
                supplierName: ''
            },
            rules: {
                supplierName: [
                    { required: true, message: '请输入供应商', trigger: 'blur' }
                ],
                principal: [
                    { required: true, message: '请输入联系人', trigger: 'blur' }
                ],
                contactDetails: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' }
                ],
                branchCode: [
                    { required: true, message: '请选择分部', trigger: 'change' }
                ],
                brandId: [
                    { required: true, message: '请选择品牌', trigger: 'change' }
                ],
                categoryId: [
                    { required: true, message: '请选择品类', trigger: 'change' }
                ],
                provinceId: [
                    { required: true, message: '请选择省', trigger: 'change' }
                ],
                cityId: [
                    { required: true, message: '请选择市', trigger: 'change' }
                ]
            },
            loading: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            categoryList: state => state.hmall.categoryList
        }),
        ...mapGetters({
            branchList: 'branchList',
            nestDdata: 'nestDdata',
            supplierData: 'supplierData',
            brandData: 'brandData'
        }),
        cityList () {
            const province = this.proviceList.filter(item => item.provinceId == this.queryParams.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        cityLists () {
            const province = this.rproviceList.filter(item => item.provinceId == this.ruleForm.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
    },
    mounted () {
        this.onFindBranchs()
        this.getFindNest()
        this.getSupplier()
        this.onFindBrand()
        this.onFindCategoryList()
        this.copyForm = deepCopy(this.ruleForm)
    },
    methods: {
        ...mapActions({
            findBranch: 'findBranch',
            findNest: 'findNest',
            findSupplierlist: 'findSupplierlist',
            findBrand: 'findBrand',
            findCategoryList: 'findCategoryList'
        }),
        async onFindBranchs () {
            await this.findBranch()
            this.branchArr = this.branchList
        },
        async onFindBrand () {
            await this.findBrand()
            this.brandList = this.brandData
        },
        async getFindNest () {
            await this.findNest()
            this.proviceList = this.nestDdata
            this.rproviceList = this.nestDdata
        },
        async onFindCategoryList () {
            await this.findCategoryList()
        },
        async getSupplier () {
            await this.findSupplierlist(this.queryParams)
            this.tableData = this.supplierData.records
            this.paginationInfo = {
                pageNumber: this.supplierData.current,
                pageSize: this.supplierData.size,
                total: this.supplierData.total
            }
        },
        onChangeList (val) {
            if (val == 1) this.queryParams.cityId = ''
            else this.ruleForm.cityId = ''
        },
        onAddsupplier () {
            this.dialogVisible = true
            this.ruleForm = deepCopy(this.copyForm)
            this.categoryIdArr = []
            his.$refs.ruleForm.resetFields()
            this.dialogtitle = '新增供应商'
        },
        async onDelete (val) {
            await deleteSupplier(val.id)
            this.$message({
                message: '删除成！',
                type: 'success'
            });
            this.searchList()
        },
        onOperate () {
            this.loading = true
            this.$refs['ruleForm'].validate(async (valid) => {
                if (valid) {
                    this.ruleForm.branchName = this.branchArr && this.branchArr.filter(item => item.organizationCode == this.ruleForm.branchCode)[0].organizationName
                    this.ruleForm.provinceName = this.rproviceList && this.rproviceList.filter(item => item.provinceId == this.ruleForm.provinceId)[0].name
                    this.ruleForm.cityName = this.cityLists && this.cityLists.filter(item => item.cityId == this.ruleForm.cityId)[0].name
                    console.log(this.ruleForm)
                    await addSupplier(this.ruleForm)
                    this.loading = false
                    this.dialogVisible = false
                    this.searchList()
                    this.$message({
                        message: '新增供应商成功！',
                        type: 'success'
                    });
                } else {
                    this.loading = false
                }
            })
        },
        productCategoryChange (val) {
            this.ruleForm.categoryId = val && val[2]
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        async  searchList () {
            // this.removeValue = false
            this.queryParams.pageNumber = 1
            this.getSupplier()
        }
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

/deep/ .el-form .el-input {
    width: 100% !important;
}
</style>