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
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="选择平台公司" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">mis编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.misCode" placeholder="请输入mis编码" maxlength="15"></el-input>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">时间：</div>
                    <el-date-picker v-model="queryParams.startTime" :editable="false" :clearable='false' :picker-options="pickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.endTime" :editable="false" :clearable='false' :picker-options="pickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">业务类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.businessType" clearable placeholder="全部">
                            <el-option v-for="item in bustype" :key="item.value" :label="item.name" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">品牌：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="brandList" v-if="brandList" @back-event="brandListBackPlat" :placeholder="'全部'"></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">品类：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.systemId" clearable placeholder="全部">
                            <el-option v-for="item in sysList" :key="item.systemId" :label="item.systemName" :value="item.systemId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">公司上线状态：</div>
                    <div class="query-col-input">
                        <el-checkbox-group v-model="onLineStatus">
                            <el-checkbox label=1>上线</el-checkbox>
                            <el-checkbox label=2>未上线</el-checkbox>
                            <el-checkbox label=3>淘汰</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <el-button type="primary" class="ml20" @click="getPlatCategory({...queryParams, current: 1})">
                        查询
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250 @field-change="onFieldChange">
                    <template slot-scope="scope" slot="saleRatio">
                        {{scope.data.row.saleRatio?scope.data.row.saleRatio+'%':'-'}}
                    </template>
                    <template slot-scope="scope" slot="yearOnYearSale">
                        {{scope.data.row.yearOnYearSale?scope.data.row.yearOnYearSale+'%':'-'}}
                    </template>
                    <template slot-scope="scope" slot="grossProfitRate">
                        {{scope.data.row.grossProfitRate?scope.data.row.grossProfitRate+'%':'-'}}
                    </template>
                    <template slot-scope="scope" slot="saleGross">
                        {{scope.data.row.saleGross|money}}
                    </template>
                    <template slot-scope="scope" slot="yearOverYearSale">
                        {{scope.data.row.yearOverYearSale|money}}
                    </template>
                    <template slot-scope="scope" slot="orderCost">
                        {{scope.data.row.orderCost|money}}
                    </template>
                    <!-- <template slot-scope="scope" slot="grossProfit">
                        {{scope.data.row.grossProfit|money}}
                    </template> -->
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getPaltCategory, getPaltbarnd, getPaltSys, findPlatCategorySum } from './api/index.js'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { BUS_TYPE, DEPT_TYPE } from './store/const'
import { departmentAuth } from '@/mixins/userAuth'
export default {
    name: 'brandSale',
    mixins: [departmentAuth],
    components: { HAutocomplete },
    data: function () {
        return {
            deptType: DEPT_TYPE,
            tableLabel: [
                { label: '所属分部', prop: 'subsectionName', choosed: true },
                { label: '城市', prop: 'cityName', choosed: true, linkAge: true },
                { label: 'mis编码', prop: 'misCode', choosed: true, linkAge: true },
                { label: '平台公司', prop: 'companyShortName', choosed: true, linkAge: true },
                { label: '上线状态', prop: 'onLineStatus', choosed: true, linkAge: true },
                { label: '业务类型', prop: 'businessType', choosed: true, queryParams: { businessTypeStatus: 1 } },
                { label: '品类', prop: 'systemName', choosed: true, queryParams: { systemStatus: 1 } },
                { label: '品牌', prop: 'brandName', choosed: true, queryParams: { brandStatus: 1 } },
                { label: '销售收入（无税）', prop: 'saleGross', choosed: true },
                { label: '销售占比', prop: 'saleRatio', choosed: true },
                { label: '同期（销售收入）', prop: 'yearOverYearSale', choosed: true },
                { label: '同比（销售收入）', prop: 'yearOnYearSale', choosed: true },
                { label: '成本', prop: 'orderCost', choosed: true },
                { label: '毛利', prop: 'grossProfit', choosed: true, formatters: 'money' },
                { label: '毛利率', prop: 'grossProfitRate', choosed: true }
            ],
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
            onLineStatus: ['1'],
            queryParams: {
                onLineStatus: '',
                companyCode: '',
                misCode: '', // 大区编码
                subsectionCode: '', // 分部编码
                startTime: `${(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 9 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1))) + '-01'}`, // 时间
                endTime: new Date().toJSON().split('T')[0],
                businessType: '',
                brandId: '',
                systemId: '',
                current: 1,
                size: 10
            },
            paginationInfo: {
                total: 0,
                size: 10,
                current: 1
            },
            tableData: [],
            brandList: [], // 品牌
            sysList: [], // 品类
            bustype: BUS_TYPE // 业务类型
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            branchList: state => state.branchList,
            platformData: state => state.platformData
        })
    },
    methods: {
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            if (dis === 'F') {
                this.queryParams.companyCode = ''
                this.queryParams.misCode = ''
                this.selectAuth.platformObj = { ...obj }
            }
        },
        async backPlat (val, dis) {
            if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                if (this.queryParams.subsectionCode) {
                    this.findPlatformslist({ subsectionCode: this.queryParams.subsectionCode })
                } else {
                    !this.userInfo.deptType && this.findPlatformslist()
                }
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'P') {
                this.queryParams.companyCode = val.value.companyCode ? val.value.companyCode : ''
                this.queryParams.misCode = val.value.misCode ? val.value.misCode : ''
            }
        },
        async getPlatCategory (params) {
            this.queryParamsTemp = { ...params }
            const temp = { ...params }
            temp.onLineStatus = this.onLineStatus.join(',')
            const res = await Promise.all([getPaltCategory(temp), findPlatCategorySum(temp)])
            this.tableData = res[0].data.data.records
            let obj = Object.assign({}, res[1].data.data, { subsectionName: '合计' })
            this.tableData.unshift(obj)
            this.paginationInfo = {
                total: res[0].data.data.total,
                pageSize: res[0].data.data.size,
                pageNumber: res[0].data.data.current
            }
        },
        onCurrentChange (val) {
            this.queryParamsTemp.current = val.pageNumber
            this.getPlatCategory(this.queryParamsTemp)
        },
        onSizeChange (val) {
            this.queryParamsTemp.size = val
            this.getPlatCategory(this.queryParamsTemp)
        },
        async getPaltbarnd () {
            const { data } = await getPaltbarnd()
            console.log(data)
            this.brandList = data.data
            this.brandList && this.brandList.map(item => {
                item.value = item.brandName
                item.selectCode = item.brandId
            })
        },
        async getPaltSys () {
            const { data } = await getPaltSys()
            this.sysList = data.data
        },
        brandListBackPlat (value) {
            this.queryParams.brandId = value.value.selectCode ? value.value.selectCode : ''
        },
        backPlatcode (value) {
            this.queryParams.companyCode = value.value.selectCode ? value.value.selectCode : ''
        },
        onFieldChange (selectedTh) {
            this.getPlatCategory(this.queryParams)
            const queryFields = this.tableLabel.filter(item => item.queryParams)
            let isFind = false
            queryFields.forEach(field => {
                const hasField = selectedTh.filter(item => item === field.label).length > 0
                for (let key in field.queryParams) {
                    if (!hasField) {
                        isFind = !isFind ? this.queryParams[key] != field.queryParams[key] : isFind
                        this.queryParams[key] = field.queryParams[key]
                    } else {
                        isFind = !isFind ? (this.queryParams[key] && this.queryParams[key] != 0) : isFind
                        this.queryParams[key] = 0
                    }
                }
            })
            isFind && this.getPlatCategory(this.queryParams)
        }
    },
    async mounted () {
        await this.getPaltbarnd()
        await this.getPaltSys()
        await this.getPlatCategory(this.queryParams)
        await this.newBossAuth(['F', 'P'])
    }
}
</script>

<style lang="scss" scoped>
.download {
    text-decoration: none;
    color: #ffffff;
    background: #f88825;
    line-height: 38px;
    border-radius: 4px;
    padding: 0 12px;
}
.flex-box-time {
    min-width: 500px;
}
</style>
