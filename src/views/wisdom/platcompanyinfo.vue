<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col" v-if="userInfo.deptType===deptType[2]">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="searchParams.subsectionCode" placeholder="选择分部" :clearable=true>
                            <el-option v-for="item in depArr" :key="item.organizationCode" :label="item.organizationName" :value="item.organizationCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <HAutocomplete ref="HAutocomplete" :selectArr="platList" v-if="platList" @back-event="backPlat" :placeholder="'选择平台公司'"></HAutocomplete>
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
                    <el-button type="primary" @click="findCompanyList(1)">搜索
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
import { findCompanyList, findDepList, findProvinceAndCity, findPaltList } from './api/index.js'
import platCompanyTable from './components/platCompanyTable'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { mapState } from 'vuex'
import { ossUrl } from '@/api/config'
import { DEPT_TYPE } from './store/const'
import { AUTH_WIXDOM_BASIC_INFO_EXPORT } from '@/utils/auth_const'
export default {
    data () {
        return {
            deptType: DEPT_TYPE,
            depArr: [],
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
            userInfo: state => state.userInfo
        })
    },
    async  mounted () {
        this.findDepList()
        this.provinceDataList = await this.findProvinceAndCity(0)
        // 如果 分部角色 => 查看平台下拉   1 传当前角色 组织code 平台下拉传空
        if (this.userInfo.oldDeptCode !== 'top') {
            const code = this.userInfo.oldDeptCode
            this.searchParams.subsectionCode = this.userInfo.oldDeptCode
            // this.findProvinceAndCity(0, code)
            this.platList = await this.findPaltList(code)
            this.findCompanyList()
        } else {
            this.findCompanyList()
            this.platList = await this.findPaltList()
        }
        this.platList.forEach((value) => {
            value.value = value.companyShortName
        })
    },
    watch: {
        async 'searchParams.subsectionCode' (newV, oldV) {
            const code = newV
            this.$refs.HAutocomplete.clearInput()
            this.searchParams.provinceCode = ''
            this.searchParams.cityCode = ''
            this.searchParams.companyCode = ''
            this.platList = await this.findPaltList(code)
            this.platList.forEach((value) => {
                value.value = value.companyShortName
            })
            if (code) {
                // this.provinceDataList = await this.findProvinceAndCity(0, code)
            } else {
                this.$refs.HAutocomplete.clearInput()
                // this.provinceDataList = []
            }
            // this.cityList = []
        },
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
        async findCompanyList (val) {
            if (val) {
                this.searchParams.pageNumber = val || 1
            }
            const { data } = await findCompanyList(this.searchParams)
            this.tableData = data.data.pageContent
            this.paginationData = {
                pageNumber: data.data.pageNumber,
                totalElements: data.data.totalElements
            }
        },
        async findDepList () {
            // const { data } = await findDepList({ pcode: this.userInfo.organizationCode, organizationType: 1 })
            const { data } = await findDepList({ organizationType: 1 })
            this.depArr = data.data
        },
        async findProvinceAndCity (code, subsectionCode) {
            let params = {
                pCode: code,
                subsectionCode: subsectionCode || ''
            }
            const { data } = await findProvinceAndCity(params)
            const arr = data.data
            return arr
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
        backPlat (value) {
            this.searchParams.companyCode = value.value.companyCode ? value.value.companyCode : ''
        },
        exportTable () {
            var url = ''
            delete this.searchParams.pageNumber
            delete this.searchParams.pageSize
            for (var key in this.searchParams) {
                url += (key + '=' + this.searchParams[key] + '&')
            }
            location.href = ossUrl + 'develop/developbasicinfo/exportCompanyList?exportType=2&' + url
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.findCompanyList()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val
            this.findCompanyList()
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-table {
    thead {
        tr:last-child {
            :nth-child(2),:nth-child(3),:nth-child(4),:nth-child(5) {
                color: red;
            }
        }
    }
}
</style>
