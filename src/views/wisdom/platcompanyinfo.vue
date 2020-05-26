<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col" v-if="branch">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入分部名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <HAutocomplete @back-event="backPlat($event,'P')" :selectArr="platformData" :placeholder="'选择平台公司'" :selectObj="selectAuth.platformObj"></HAutocomplete>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">城市：</div>
                    <div class="query-col-input" style="display: flex;">
                        <el-select v-model="searchParams.provinceCode" placeholder="省" :clearable=true>
                            <el-option v-for="item in provinceDataList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                            </el-option>
                        </el-select>
                        <div class="line ml5 mr5">-</div>
                        <el-select v-model="searchParams.cityCode" placeholder="市" :clearable=true>
                            <el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">上线时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="searchParams.onlineTime" :editable="false" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="开始日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col pl20">
                    <el-button type="primary" @click="findCompanyList({...searchParams, pageNumber: 1})">搜索
                    </el-button>
                    <el-button v-if="hosAuthCheck(exportAuth)" type="primary" @click="exportTable()">导出
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <platCompanyTable ref="baseTable" :tableData="tableData" :paginationData="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange" />
        </div>
    </div>
</template>
<script>
import { findCompanyList, findPaltList, findProvinceAndCity } from './api/index.js'
import platCompanyTable from './components/platCompanyTable'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { departmentAuth } from '@/mixins/userAuth'
import { mapState } from 'vuex'
import { interfaceUrl } from '@/api/config'
import { DEPT_TYPE } from './store/const'
import { AUTH_WIXDOM_BASIC_INFO_EXPORT } from '@/utils/auth_const'

export default {
    mixins: [departmentAuth],
    data () {
        return {
            deptType: DEPT_TYPE,
            provinceDataList: [],
            cityList: [],
            platList: [],
            searchParams: {
                cityCode: '',
                companyCode: '',
                companyShortName: '',
                onlineTime: '',
                pageNumber: 1,
                pageSize: 10,
                provinceCode: '',
                subsectionCode: ''
                // sortInfos: [{ 'field': 'updateTime', 'sort': 'desc' }]
            },
            selectAuth: {
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            },
            tableData: [],
            paginationData: {},
            paltData: {
                url: 'companyTarget/queryCompanyShortName',
                otherParams: {
                    keys: 'companyShortName',
                    keyName: 'companyShortName',
                    keyValue: 'misCode'
                }
            },
            exportAuth: AUTH_WIXDOM_BASIC_INFO_EXPORT
        }
    },
    components: {
        HAutocomplete,
        platCompanyTable
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            branchList: state => state.branchList,
            platformData: state => state.platformData
        })
    },
    async  mounted () {
        this.provinceDataList = await this.findProvinceAndCity(0)
        this.findCompanyList(this.searchParams)
        this.newBossAuth(['F', 'P'])
    },
    watch: {
        async 'searchParams.provinceCode' (newV, oldV) {
            const code = newV
            this.searchParams.cityCode = ''
            if (code) {
                this.cityList = await this.findProvinceAndCity(this.searchParams.provinceCode)
            } else {
                this.cityList = []
            }
        }
    },
    methods: {
        async onCityChange () {
            this.cityList = await this.findProvinceAndCity(this.searchParams.provinceCode)
        },
        async findCompanyList (params, val) {
            this.queryParamsTemp = { ...params }
            if (val) {
                this.searchParams.pageNumber = val || 1
            }
            const { data } = await findCompanyList(params)
            this.tableData = data.data.pageContent
            this.tableData.map(i => {
                if (i.mainFormat == 0) i.mainFormatName = '零售'
                if (i.mainFormat == 1) i.mainFormatName = '批发'
                if (i.mainFormat == 2) i.mainFormatName = '工程'
                if (i.mainFormat == 3) i.mainFormatName = '零售>批发、工程'
                if (i.mainFormat == 4) i.mainFormatName = '批发>零售、工程'
                if (i.mainFormat == 5) i.mainFormatName = '工程>批发、零售'
                i.aoCompany = i.companyOrderVo.misKjdwVo.kjdwQc
            })
            this.paginationData = {
                pageSize: data.data.pageSize,
                pageNumber: data.data.pageNumber,
                total: data.data.totalElements
            }
        },
        async findProvinceAndCity (code, subsectionCode) {
            let params = {
                pCode: code,
                subsectionCode: subsectionCode || ''
            }
            const { data } = await findProvinceAndCity(params)
            return data.data
        },
        async findPaltList (subsectionCode) {
            const params = {
                subsectionCode: subsectionCode
            }
            const { data } = await findPaltList(params)
            for (let i of data.data.pageContent) {
                i.value = i.companyName
                i.selectCode = i.companyCode
            }
            this.platList = data.data.pageContent
            return this.platList
        },
        backPlat (val, dis) {
            if (dis === 'F') {
                this.searchParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                if (val.value.pkDeptDoc) {
                    this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
                } else {
                    this.findPlatformslist()
                }
                !val.value.pkDeptDoc && this.linkage()
            } else if (val.value && dis === 'P') {
                this.searchParams.companyCode = val.value.companyCode ? val.value.companyCode : ''
            }
        },
        linkage () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.searchParams.companyCode = ''
            this.selectAuth.platformObj = obj
        },
        exportTable () {
            var url = ''
            delete this.searchParams.pageNumber
            delete this.searchParams.pageSize
            for (var key in this.searchParams) {
                url += (key + '=' + this.searchParams[key] + '&')
            }
            location.href = interfaceUrl + 'develop/developbasicinfo/exportCompanyList?exportType=2&' + url
        },
        onSizeChange (val) {
            this.queryParamsTemp.pageSize = val
            this.findCompanyList(this.queryParamsTemp)
        },
        onCurrentChange (val) {
            this.queryParamsTemp.pageNumber = val.pageNumber
            this.findCompanyList(this.queryParamsTemp)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
