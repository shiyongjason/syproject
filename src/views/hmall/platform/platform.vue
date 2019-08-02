<template>
    <div class="platform">
        <div class="page-body">
            <div class="page-body-cont">
                <div class="page-header">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>平台公司功能管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="page-wrap flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">分部：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="queryParams.organizationCode"
                                    placeholder="选择分部"
                                    :clearable=true
                                    @change="branchChange"
                                >
                                    <el-option
                                        v-for="item in depArr"
                                        :key="item.organizationCode"
                                        :label="item.organizationName"
                                        :value="item.organizationCode"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">城市：</div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="queryParams.provinceCode"
                                    @change="onCityChange"
                                    placeholder="省"
                                    :clearable=true
                                >
                                    <el-option
                                        v-for="item in provinceDataList"
                                        :key="item.cityId"
                                        :label="item.cityName"
                                        :value="item.cityId"
                                    >
                                    </el-option>
                                </el-select>
                                <span class="ml10 mr10">-</span>
                                <el-select
                                    v-model="queryParams.cityCode"
                                    placeholder="市"
                                    :clearable=true
                                >
                                    <el-option
                                        v-for="item in cityList"
                                        :key="item.cityId"
                                        :label="item.cityName"
                                        :value="item.cityId"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">状态：</div>
                            <div class="flex-wrap-cont">
                                <el-select v-model="queryParams.status" clearable placeholder="全部">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="未开启" value="0"></el-option>
                                    <el-option label="开启" value="1"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">平台公司名称：</div>
                            <div class="flex-wrap-cont">
                                <el-input type="text"
                                          v-model="queryParams.organizationName" maxlength="50" placeholder="请输入平台公司名称"></el-input>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">开启时间：</div>
                            <div class="flex-wrap-cont">
                                <el-date-picker
                                    v-model="queryParams.startDate"
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="开始日期"
                                    :picker-options="pickerOptionsStart"
                                >
                                </el-date-picker>
                                <span class="ml10 mr10">-</span>
                                <el-date-picker
                                    v-model="queryParams.endDate"
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="结束日期"
                                    :picker-options="pickerOptionsEnd"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-cont">
                                <el-button type="primary" class="ml20" @click="onQuery()">
                                    搜索
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-box page-table">
                    <platTable
                        :tableData="tableData"
                        :paginationData="paginationData"
                        @onQuery="onQuery"
                        @onSizeChange="onSizeChange"
                        @onCurrentChange="onCurrentChange"></platTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import platTable from './components/platTable'
import { mapState } from 'vuex'
import { findplatformList, findDepList, findProvinceAndCity } from './api/index'
export default {
    name: 'platform',
    components: {
        platTable
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
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                organizationCode: '',
                status: ''
            },
            tableData: [],
            paginationData: {},
            provinceDataList: [],
            cityList: [],
            platList: [],
            depArr: []
        }
    },
    async mounted () {
        this.onQuery()
        this.findDepList()
        this.provinceDataList = await this.findProvinceAndCity(0)

        // this.findProvinceAndCity(0, this.userInfo.organizationCode)
    },
    methods: {
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.onQuery()
        },
        async onQuery () {
            const { ...params } = this.queryParams
            if (params.startDate) {
                params.startDate = this.$root.$options.filters.formatDate(params.startDate, 'YYYY-MM-DD HH:mm:ss')
            }
            if (params.endDate) {
                params.endDate = this.$root.$options.filters.formatDate(params.endDate, 'YYYY-MM-DD HH:mm:ss')
            }
            const { data } = await findplatformList(params)
            this.tableData = data.data.pageContent
            this.paginationData = {
                pageNumber: data.data.pageNumber,
                pageSize: data.data.pageSize,
                totalElements: data.data.totalElements
            }
        },
        async findDepList () {
            const { data } = await findDepList({ organizationType: 1 })
            this.depArr = data.data
            this.depArr.splice(0, 0, {
                organizationCode: '',
                organizationName: '全部'
            })
        },
        async findProvinceAndCity (code, subsectionCode) {
            let params = {
                pCode: code,
                subsectionCode: subsectionCode || ''
            }
            const { data } = await findProvinceAndCity(params)
            let result = data.data
            result.splice(0, 0, {
                cityId: '',
                cityName: '全部'
            })
            return result
        },
        async onCityChange () {
            if (this.queryParams.provinceCode === '') {
                this.cityList = []
                this.queryParams.cityCode = ''
                return
            }
            this.$set(this.queryParams, 'cityCode', '')
            this.cityList = await this.findProvinceAndCity(this.queryParams.provinceCode)
        },
        async branchChange () {
            if (this.queryParams.organizationCode) {
                this.provinceDataList = await this.findProvinceAndCity(0, this.queryParams.organizationCode)
            } else {
                this.provinceDataList = await this.findProvinceAndCity(0)
            }
            this.cityList = []
            this.$set(this.queryParams, 'provinceCode', '')
            this.$set(this.queryParams, 'cityCode', '')
        }
    }
}
</script>

<style scoped>
    .flex-wrap-row{
        max-width: 1350px;
    }
</style>
