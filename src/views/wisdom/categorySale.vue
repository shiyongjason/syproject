<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.subsectionCode" placeholder="选择分部" :clearable=true>
                            <el-option v-for="item in branchList" :key="item.organizationCode" :label="item.organizationName" :value="item.organizationCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                         <HAutocomplete ref="HAutocomplete" :selectArr="platList" v-if="platList" @back-event="backPlatcode" :placeholder="'选择平台公司'"></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">mis编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.misCode" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">时间：</div>
                    <el-date-picker v-model="queryParams.startTime" :editable="false" :picker-options="pickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.endTime" :editable="false" :picker-options="pickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">业务类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.subsectionCode" clearable  placeholder="全部">
                            <el-option v-for="item in bustype" :key="item.value" :label="item.name" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">品牌：</div>
                    <div class="query-col-input">
                        <HAutocomplete ref="HAutocomplete" :selectArr="brandList" v-if="brandList" @back-event="backPlat" :placeholder="'全部'"></HAutocomplete>
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
                    <div class="query-col-input">
                        <el-checkbox-group v-model="onLineStatus">
                            <el-checkbox label=1>上线</el-checkbox>
                            <el-checkbox label=2>未上线</el-checkbox>
                            <el-checkbox label=3>淘汰</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <el-button type="primary" class="ml20" @click="getPaltCategory()">
                        查询
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getPaltCategory, findDepList, getPaltbarnd, getPaltSys, findPaltList } from './api/index.js'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { BUS_TYPE } from './store/const'
export default {
    name: 'brandSale',
    data: function () {
        return {
            tableLabel: [
                { label: '所属分部', prop: 'subsectionName', choosed: true },
                { label: '城市', prop: 'cityName', choosed: true },
                { label: 'mis编码', prop: 'misCode', choosed: true },
                { label: '平台公司', prop: 'companyShortName', choosed: true },
                { label: '上线状态', prop: 'onLineStatus', choosed: true },
                { label: '业务类型', prop: 'businessType', choosed: true },
                { label: '品类', prop: 'systemName', choosed: true },
                { label: '品牌', prop: 'brandName', choosed: true },
                { label: '销售收入（无税）', prop: 'saleGross', choosed: true },
                { label: '销售占比', prop: 'saleRatio', choosed: true },
                { label: '同期（销售收入）', prop: 'yearOverYearSale', choosed: true },
                { label: '同比（销售收入）', prop: 'yearOnYearSale', choosed: true },
                { label: '成本', prop: 'orderCost', choosed: true },
                { label: '毛利', prop: 'grossProfit', choosed: true },
                { label: '毛利率', prop: 'grossProfitRate', choosed: true }

            ],
            pickerOptionsStart: {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            },
            pickerOptionsEnd: {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startDate
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            },
            branchLoading: true,
            onLineStatus: ['1'],
            queryParams: {
                onLineStatus: '',
                companyCode: '',
                misCode: '', // 大区编码
                subsectionCode: '', // 分部编码
                startTime: `${(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 10 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1))) + '-01'}`, // 时间
                endTime: new Date().toJSON().split('T')[0],
                businessType: '',
                brandId: '',
                systemId: '',
                current: 1,
                size: 10
            },
            queryParamsTemp: {
            },
            activityName: {},
            file: [],
            paginationInfo: {
                total: 0,
                size: 10,
                current: 1
            },
            tableData: [],
            branchList: [],
            brandList: [],
            sysList: [],
            bustype: BUS_TYPE,
            regionDisabled: false,
            branchDisabled: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    components: {
        HAutocomplete
    },
    methods: {
        async getPaltCategory () {
            this.queryParams.onLineStatus = this.onLineStatus.join(',')
            const { data } = await getPaltCategory(this.queryParams)
            this.tableData = data.records
            this.paginationInfo = {
                total: data.total,
                pageSize: data.size,
                pageNumber: data.current
            }
            // this.regionList.pop()
        },
        async findDepList () {
            const { data } = await findDepList({ organizationType: 1 })
            if (data.data) {
                this.branchList = data.data
            }
            this.branchList.splice(0, 0, {
                organizationCode: '',
                organizationName: '全部'
            })
        },
        onCurrentChange (val) {
            this.queryParams.current = val.pageNumber
            this.getPaltCategory()
        },
        onSizeChange (val) {
            this.queryParams.size = val
            this.getPaltCategory()
        },
        async getPaltbarnd () {
            const { data } = await getPaltbarnd()
            this.brandList = data
            this.brandList && this.brandList.map(item => {
                item.value = item.brandName
                item.selectCode = item.brandId
            })
        },
        async getPaltSys () {
            const { data } = await getPaltSys()
            this.sysList = data
        },
        backPlat (value) {
            this.queryParams.brandId = value.value.selectCode ? value.value.selectCode : ''
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
        }
    },
    async mounted () {
        // 如果 当前人大区 -1  总部 0  分部 1 organizationType
        // console.log(this.userInfo.organizationType)
        this.getPaltCategory()
        this.findDepList()
        this.getPaltbarnd()
        this.getPaltSys()
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
