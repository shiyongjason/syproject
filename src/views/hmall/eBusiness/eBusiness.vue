<template>
    <div class="shop-manager">
        <div class="page-body">
            <div class="page-body-cont">
                <div class="page-wrap flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">平台公司：</div>
                            <div class="flex-wrap-cont">
                                <!-- <el-input
                                    v-model="queryParams.pOrganizationName"
                                    placeholder="请输入平台公司"
                                    maxlength="50"
                                ></el-input> -->
                                <HAutocomplete
                                    ref="HAutocomplete"
                                    :selectArr="platComList"
                                    @back-event="backPlat"
                                    :placeholder="'全部'"
                                    @clearInput="clearInput"
                                    :selectObj="selectPlatObj"
                                ></HAutocomplete>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">会员店名称：</div>
                            <div class="flex-wrap-cont">
                                <!-- <el-input
                                    v-model="queryParams.organizationName"
                                    placeholder="请输入会员店"
                                    maxlength="50"
                                ></el-input> -->
                                <HAutocomplete
                                    ref="HAutocomplete"
                                    :selectArr="MenberStoreList"
                                    @back-event="backMenber"
                                    :placeholder="'全部'"
                                    @clearInput="clearInput"
                                    :selectObj="selectMenberObj"
                                ></HAutocomplete>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">钱包支付开通时间：</div>
                            <div class="flex-wrap-cont">
                                <el-date-picker
                                    v-model="queryParams.startTime"
                                    type="datetime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="开始时间"
                                    :picker-options="pickerOptionsStart"
                                >
                                </el-date-picker>
                                <span class="ml10 mr10">-</span>
                                <el-date-picker
                                    v-model="queryParams.endTime"
                                    type="datetime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="结束时间"
                                    :picker-options="pickerOptionsEnd"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">钱包支付开通状态：</div>
                            <div class="flex-wrap-cont">
                                <el-select v-model="queryParams.registerStatus" style="width: 100%">
                                    <el-option
                                        v-for="item in wsOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">单分享开通状态：</div>
                            <div class="flex-wrap-cont">
                                <el-select v-model="queryParams.singleShareOpen" style="width: 100%">
                                    <el-option
                                        v-for="item in dfxOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-cont">
                                <el-button type="primary" class="ml20" @click="onQuery(true)">
                                    搜索
                                </el-button>
                                <el-button type="primary" class="ml20" @click="clear()">
                                    清空筛选条件
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <eBusinessTable
                    ref="shopManagerTable"
                    :tableData="tableData"
                    :paginationData="paginationData"
                    @onSizeChange="onSizeChange"
                    @onCurrentChange="onCurrentChange"
                ></eBusinessTable>
            </div>
        </div>
    </div>
</template>

<script>
import eBusinessTable from './components/eBusinessTable'
import { getPurseOpenCase, getListByParent } from './api/index'
import { findPaltList } from '../../process/api/index'
import HAutocomplete from '@/components/HAutocomplete'
export default {
    name: 'shopManager',
    components: {
        eBusinessTable,
        HAutocomplete
    },
    data () {
        return {
            platComList: [], // 平台公司
            MenberStoreList: [], // 會員店
            selectPlatObj: {
                selectCode: '',
                selectName: '',
                fields: 'pOrganizationName'
            },
            selectMenberObj: {
                selectCode: '',
                selectName: '',
                fields: 'organizationName'
            },
            pickerOptionsStart: {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            },
            pickerOptionsEnd: {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            },
            queryParams: {
                pOrganizationName: '',
                organizationName: '',
                registerStatus: '',
                singleShareOpen: '',
                startTime: '',
                endTime: ''
            },
            searchQueryParams: {
                pOrganizationName: '', // 平台公司
                organizationName: '', // 会员店
                registerStatus: '',
                singleShareOpen: '',
                // startTime: '',
                // endTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            paginationData: {
                totalElements: 100,
                pageSize: 10,
                pageNumber: 1
            },
            dfxOptions: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: 0,
                    label: '未开通'
                },
                {
                    value: 1,
                    label: '已开通'
                }
            ],
            wsOptions: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: 1,
                    label: '已开通'
                },
                {
                    value: 2,
                    label: '未开通'
                }
            ]
        }
    },
    methods: {
        backPlat (value) {
            this.updateBrandChange()
            this.selectMenberObj.selectName = ''
            this.queryParams.pOrganizationName = value.value.value ? value.value.value : ''
        },
        backMenber (value) {
            this.queryParams.organizationName = value.value.value ? value.value.value : ''
        },
        clearInput (fields) {
            if (fields === 'pOrganizationName') {
                this.updateBrandChange()
                this.selectMenberObj.selectName = ''
            }
            this.queryParams[fields] = ''
        },
        async onQuery (searchOrNextPage) {
            if (searchOrNextPage) {
                Object.keys(this.queryParams).forEach(key => {
                    this.searchQueryParams[key] = this.queryParams[key]
                })
            }
            const { data } = await getPurseOpenCase(this.searchQueryParams)
            // console.log(data)
            this.tableData = data.records
            this.paginationData.totalElements = data.total
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        clear () {
            Object.keys(this.queryParams).forEach((key) => {
                this.queryParams[key] = ''
            })
            this.selectPlatObj.selectName = ''
            this.selectMenberObj.selectName = ''
        },
        onSizeChange (val) {
            this.searchQueryParams.pageSize = val
            this.onQuery(false)
        },
        onCurrentChange (val) {
            this.searchQueryParams.pageNumber = val
            this.onQuery(false)
        },
        async updateBrandChange () {
            const params = {
                organizationShortName: '',
                organizationType: '4, 5, 6',
                pOrganizationCode: this.selectPlatObj.selectName ? this.selectPlatObj.selectCode : ''
            }
            const { data } = await getListByParent(params)
            console.log(data)
            for (let i of data.data) {
                i.value = i.organizationShortName
                i.selectCode = i.organizationCode
            }
            this.MenberStoreList = data.data
        }
    },
    async mounted () {
        await this.onQuery(false)
        // 平台公司
        const { data } = await findPaltList()
        console.log(data)
        for (let i of data.data.pageContent) {
            i.value = i.companyShortName
            i.selectCode = i.companyCode
        }
        this.platComList = data.data.pageContent
        await this.updateBrandChange()
    }
}
</script>

<style scoped>
    .status-on{
        color: #999999;
    }
    .flex-wrap-row{
        max-width: 1350px;
    }
    .flex-wrap-title {
        min-width: 130px;
    }
    .flex-wrap-box{
        min-width: 360px;
    }
</style>
