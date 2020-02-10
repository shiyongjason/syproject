<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="全部" :clearable=true>
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
                        <el-input v-model="queryParams.spuName" placeholder="请输入商品名称" maxlength="50"></el-input>
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
        <el-dialog :title="dialogtitle" :visible.sync="dialogVisible" width="40%" :close-on-click-modal=false>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="供应商名称：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="分部：" prop="region">
                    <el-select placeholder="全部" :clearable=true>
                        <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌：" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品类：" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区域：" required class="region">
                    <el-col :span="8">
                        <el-select placeholder="请选择省" @change="onChangeList(2)" style="width:100% !important">
                            <el-option label="请选择" value=""></el-option>
                            <el-option :key="item.provinceId" :label="item.name" :value="item.provinceId" v-for="item in proviceList">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col class="ml10 " :span="1">-</el-col>
                    <el-col :span="8">
                        <el-select v-model="queryParams.cityId" placeholder="请选择市" style="width:100%">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="(item) in cityList" :key="item.cityId" :label="item.name" :value="item.cityId">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { findProducts, findBossSource, changeSpustatus, getBrands } from './api/index'
import { mapState, mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'supplier',
    data () {
        return {
            branchArr: [],
            proviceList: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                provinceId: '',
                cityId: ''
            },
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '供应商名称', prop: 'spuCode', width: '150' },
                { label: '分部', prop: 'brandName' },
                { label: '供货区域', prop: 'spuName', width: '150' },
                { label: '供应商负责人', prop: 'specification', width: '150' },
                { label: '联系方式', prop: 'categoryNames', width: '150' },
                { label: '品牌', prop: 'integrity' },
                { label: '品类', prop: 'merchantName' }
            ],
            rowKey: '',
            dialogVisible: true,
            dialogtitle: '',
            ruleForm: {
                name: '',
                region: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    components: {
        HAutocomplete
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            branchList: 'branchList',
            nestDdata: 'nestDdata'
        }),
        cityList () {
            const province = this.proviceList.filter(item => item.provinceId == this.queryParams.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
    },
    mounted () {
        this.onFindBranchs()
        this.getFindNest()
    },
    methods: {
        ...mapActions({
            findBranch: 'findBranch',
            findNest: 'findNest'
        }),
        async onFindBranchs () {
            await this.findBranch()
            this.branchArr = this.branchList
        },
        async getFindNest () {
            await this.findNest()
            this.proviceList = this.nestDdata
        },
        onChangeList () {
            this.queryParams.cityId = ''
        },
        onAddsupplier () {
            this.dialogVisible = true
            this.dialogtitle = '新增供应商'
        },
        onRest () {
            this.categoryIdArr = []
            this.queryParams = deepCopy(this.copyParams)
            this.removeValue = true
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
        async  searchList () {
            // this.removeValue = false
            const { ...params } = this.queryParams
            if (params.startTime) {
                params.startTime = this.$root.$options.filters.formatterTime(params.startTime)
            }
            if (params.endTime) {
                params.endTime = this.$root.$options.filters.formatterTime(params.endTime)
            }
            if (params.categoryId) params.categoryId = params.categoryId[params.categoryId.length - 1]
            const { data } = await findProducts(params)
            this.tableData = data.records
            this.paginationInfo = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
            this.removeValue = false
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