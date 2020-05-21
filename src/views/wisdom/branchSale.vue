<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">大区：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.regionCode" clearable placeholder="全部" :disabled="regionDisabled" @change='getRegionCode'>
                            <el-option v-for="item in regionList" :key="item.deptcode" :label="item.deptname" :value="item.crmDeptCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.subsectionCode" clearable :disabled="branchDisabled" placeholder="全部">
                            <el-option v-for="item in branchList" :key="item.deptcode" :label="item.deptname" :value="item.crmDeptCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">时间：</div>

                    <el-date-picker v-model="queryParams.startDate" :editable="false" :picker-options="pickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.endDate" :editable="false" :picker-options="pickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                    <el-button type="primary" class="ml20" @click="onQuery({...queryParams, pageNumber: 1}, 'btn')">
                        查询
                    </el-button>
                    <a :href="exportHref" v-if="hosAuthCheck(exportAuth)" class="ml20 download">导出</a>
                </div>
            </div>
            <div class="page-wrap flex-wrap-col">
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-input">
                            <el-radio v-model="queryParams.targetStatus" label="1" name="target" @change="onChoose">保底目标</el-radio>
                            <el-radio v-model="queryParams.targetStatus" label="2" name="target" @change="onChoose">平衡目标</el-radio>
                            <el-radio v-model="queryParams.targetStatus" label="3" name="target" @change="onChoose">冲刺目标</el-radio>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <branchSaleTable ref="brandSaleTable" :tableData="tableData" :loading="branchLoading" :paginationData="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></branchSaleTable>
            </div>
        </div>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
import { findBranchList, findRegionList, getBranchSale, getBranchSaleSum } from './api/index.js'
import branchSaleTable from './components/branchSaleTable.vue'
import { AUTH_WIXDOM_BRANCH_SALE_EXPORT } from '@/utils/auth_const'
import { DEPT_TYPE } from './store/const'
export default {
    name: 'brandSale',
    data: function () {
        return {
            exportAuth: AUTH_WIXDOM_BRANCH_SALE_EXPORT,
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
            total: {
                total: {}, // 后台返的合计
                totalTable: {}, // table对应的合计
                type: 0
            },
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                regionCode: '', // 大区编码
                subsectionCode: '', // 分部编码
                startDate: `${(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 9 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1))) + '-01'}`, // 时间
                endDate: new Date().toJSON().split('T')[0],
                targetStatus: '3'
            },
            queryParamsTemp: {
            },
            activityName: {},
            file: [],
            paginationData: {
                totalElements: 0,
                pageSize: 10,
                pageNumber: 1
            },
            tableData: [],
            regionList: [],
            branchList: [],
            regionDisabled: false,
            branchDisabled: false,
            deptType: DEPT_TYPE
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        exportHref () {
            let url = interfaceUrl + 'rms/subsection-sale/export?'
            for (let key in this.queryParams) {
                if (key !== 'pageSize' && key !== 'pageNumber') {
                    url += (key + '=' + this.queryParams[key] + '&')
                }
            }
            return url
        }
    },
    components: {
        branchSaleTable
    },
    methods: {
        async onFindRegionList () {
            const { data } = await findRegionList()
            this.regionList = data.data
            // this.regionList.pop()
        },
        async onFindRegion (val) {
            const { data } = await findRegionList({ pkDeptdoc: val })
            if (data.data[0] && data.data[0].deptname !== '好享家总部') {
                this.queryParams.regionCode = data.data[0].crmDeptCode
            }
        },
        async onFindBranchList (value) {
            const { data } = await findBranchList({ crmDeptCode: value })
            this.branchList = data.data ? data.data : []
        },
        async getBranchSale (value) {
            const { data } = await getBranchSale(value)
            if (!this.total.type) {
                this.total.total = data.data.content.respSubsectionSaleAdjectiveTotal
            }
            // 出参 在转移时候变动了 前缀 resp
            this.tableData = data.data.content.subsectionSaleAdjectiveBOS
            if (this.tableData.length > 0) {
                let _this = this
                data.data.content.respSubsectionSaleAdjectiveTotal.subsectionName = '合计'
                this.total.totalTable.ranking = '-'
                this.total.totalTable.regionName = '-'
                Object.keys(this.total.total).forEach(function (key) {
                    let totalKey = key.split('Total')[0]
                    _this.total.totalTable[totalKey] = _this.total.total[key]
                })
                this.total.shallowCopy = this.total.totalTable
                this.tableData.unshift(this.total.shallowCopy)
            }
            this.paginationData.pageNumber = data.data.pageNumber
            this.paginationData.pageSize = data.data.pageSize
            this.paginationData.total = data.data.totalElements
        },
        async getBranchSaleSum () {
            this.total.type = 1
            const params = {
                regionCode: this.queryParams.regionCode,
                subsectionCode: this.queryParams.subsectionCode,
                startDate: this.queryParams.startDate,
                endDate: this.queryParams.endDate,
                targetStatus: this.queryParams.targetStatus
            }
            if (params.startDate === null || params.endDate === null) {
                this.$message({
                    message: '时间不能为空哦',
                    type: 'warning'
                })
                return
            }
            const { data } = await getBranchSaleSum(params)
            this.total.total = data.data
            let _this = this
            Object.keys(data.data).forEach(function (key) {
                let totalKye = key.split('Total')[0]
                _this.total.shallowCopy[totalKye] = data.data[key]
            })
            this.$set(this.tableData, 0, this.total.shallowCopy)
            this.branchLoading = false
        },
        async onChoose () {
            this.branchLoading = true
            if (this.queryParams.startDate === null || this.queryParams.endDate === null) {
                this.$message({
                    message: '时间不能为空哦',
                    type: 'warning'
                })
                return
            }
            this.total.type = 0
            await this.onQuery(this.queryParams)
            this.getBranchSaleSum()
        },
        async getRegionCode () {
            // console.log('选择大区，获取大区下分部')
            await this.onFindBranchList(this.queryParams.regionCode)
            this.queryParams.subsectionCode = ''
        },
        async onSizeChange (val) {
            this.branchLoading = true
            this.queryParamsTemp.pageSize = val
            await this.onQuery(this.queryParamsTemp)
            this.branchLoading = false
        },
        async onCurrentChange (val) {
            this.branchLoading = true
            this.queryParamsTemp.pageNumber = val.pageNumber
            await this.onQuery(this.queryParamsTemp)
            this.branchLoading = false
        },
        async onQuery (params, event) {
            this.queryParamsTemp = { ...params }
            if (params.startDate === null || params.endDate === null) {
                this.$message({
                    message: '时间不能为空哦',
                    type: 'warning'
                })
                return
            }
            if (event === 'btn') {
                this.branchLoading = true
                this.total.type = 0
            }
            await this.getBranchSale(params)
            if (event === 'btn') {
                this.getBranchSaleSum()
            }
        }
    },
    async mounted () {
        // 如果 当前人大区 -1  总部 0  分部 1 organizationType
        await this.onFindRegionList() // 大区
        await this.onFindBranchList() // 分部
        if (this.userInfo.deptType === this.deptType[1]) {
            this.regionDisabled = true
            this.queryParams.regionCode = this.userInfo.oldDeptCode
            this.onFindBranchList(this.userInfo.oldDeptCode) // 查大区下的分部
        } else if (this.userInfo.deptType === this.deptType[0]) {
            // 总部可查看所有
        } else if (this.userInfo.deptType === this.deptType[2]) {
            this.regionDisabled = true
            this.branchDisabled = true
            this.queryParams.subsectionCode = this.userInfo.oldDeptCode
            // this.queryParams.subsectionCode = "1aad7c94-2830-11e8-ace9-000c290bec91"
            let region = this.branchList.find((val) => {
                return val.crmDeptCode === this.queryParams.subsectionCode
            })
            await this.onFindRegion(region.pkFathedept) // 根据分部找大区
        }
        await this.onQuery(this.queryParams)
        this.getBranchSaleSum()
    }
}
</script>

<style scoped>
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
