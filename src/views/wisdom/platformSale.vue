<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col" v-if="regionInput">
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
                        <el-select v-model="queryParams.subsectionCode" clearable placeholder="全部" :disabled="branchDisabled" @change='getSubsectionCode'>
                            <el-option v-for="item in branchList" :key="item.deptcode" :label="item.deptname" :value="item.crmDeptCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete ref="HAutocomplete" :selectArr="platList" v-if="platList" @back-event="backPlat" :placeholder="'全部'" :disabled="platDisabled" :remove-value='removeValue'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col" style="display:flex">
                    <div class="query-col-title">时间：</div>
                    <el-date-picker v-model="queryParams.saleTimeStart" :editable="false" :picker-options="saleTimePickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.saleTimeEnd" :editable="false" :picker-options="saleTimePickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">签约规模：</div>
                    <div class="query-col-input">
                        <el-input style="width: 100px" v-model="queryParams.signScaleStart" maxlength="9"></el-input>~
                        <el-input style="width: 100px" v-model="queryParams.signScaleEnd" maxlength="9"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">存量/增量：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.incremental" clearable placeholder="全部">
                            <el-option v-for="item in incrementalList" :key="item.deptcode" :label="item.deptname" :value="item.deptcode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">公司状态：</div>
                    <div class="query-col-input">
                        <el-checkbox v-model="item.checked" v-for="(item,index) in checkedList" :key=index>{{item.value}}</el-checkbox>
                    </div>
                </div>
                <div class="query-cont-col" style="display:flex">
                    <div class="query-col-title">上线时间：</div>
                    <el-date-picker v-model="queryParams.onlineTimeStart" :editable="false" :picker-options="onlineTimePickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.onlineTimeEnd" :editable="false" :picker-options="onlineTimePickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                    <el-button type="primary" class="ml20" @click="onQuery('btn')">
                        查询
                    </el-button>
                    <a :href="exportHref" class="ml20 download">导出</a>
                </div>
            </div>
            <div class="page-wrap flex-wrap-col">
                <div class="flex-wrap-row">
                    <div class="query-cont-col">
                        <div class="query-col-input">
                            <el-radio v-model="queryParams.tagetType" label="1" @change="onChoose" name="target">履约目标</el-radio>
                            <el-radio v-model="queryParams.tagetType" label="0" @change="onChoose" name="target">冲刺目标</el-radio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <platformSaleTable ref="platformSaleTable" :tableData="tableData" :loading="platformLoading" :paginationData="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></platformSaleTable>
            </div>
        </div>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
import { findBranchList, findRegionList, findPaltList, getPlatformSale, queryCompanyByParams, getPlatformSaleSum } from './api/index.js'
import platformSaleTable from './components/platformSaleTable.vue'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
export default {
    name: 'platformSale',
    data: function () {
        return {
            checkedList: [{ value: '在线', checked: true, key: 1 }, { value: '未上线', checked: false, key: 2 }, { value: '淘汰', checked: false, key: 3 }],
            regionInput: true,
            saleTimePickerOptionsStart: {
                disabledDate: (time) => {
                    let DateVal = this.queryParams.saleTimeEnd
                    if (DateVal) {
                        return time.getTime() > new Date(DateVal).getTime()
                    }
                }
            },
            saleTimePickerOptionsEnd: {
                disabledDate: (time) => {
                    let DateVal = this.queryParams.saleTimeStart
                    if (DateVal) {
                        return time.getTime() < new Date(DateVal).getTime() - 3600 * 1000 * 24
                    }
                }
            },
            onlineTimePickerOptionsStart: {
                disabledDate: (time) => {
                    let DateVal = this.queryParams.onlineTimeEnd
                    if (DateVal) {
                        return time.getTime() > new Date(DateVal).getTime()
                    }
                }
            },
            onlineTimePickerOptionsEnd: {
                disabledDate: (time) => {
                    let DateVal = this.queryParams.onlineTimeStart
                    if (DateVal) {
                        return time.getTime() < new Date(DateVal).getTime() - 3600 * 1000 * 24
                    }
                }
            },
            platformLoading: true,
            removeValue: false,
            total: {
                total: {}, // 合计
                type: 0
            },
            queryParams: {
                onLineStatus: 1,
                pageSize: 10,
                pageNumber: 1,
                signScaleStart: '', // 签约规模
                signScaleEnd: '',
                saleTimeStart: `${(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 10 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1))) + '-01'}`, // 时间
                saleTimeEnd: new Date().toJSON().split('T')[0],
                onlineTimeStart: '', // 上线时间
                onlineTimeEnd: '',
                incremental: '', // 增量
                regionCode: '', // 大区编码
                subsectionCode: '', // 分部编码
                companyCode: '', // 公司编码
                tagetType: '0' // 目标类型
            },
            queryParamsTemp: {
            },
            incrementalList: [
                {
                    deptname: '全部',
                    deptcode: ''
                },
                {
                    deptname: '存量',
                    deptcode: 0
                },
                {
                    deptname: '增量',
                    deptcode: 1
                }
            ],
            paginationData: {
                totalElements: 0,
                pageSize: 10,
                pageNumber: 1
            },
            tableData: [],
            regionList: [], // 大区
            branchList: [], // 分部
            platList: [], // 平台公司
            regionDisabled: false,
            branchDisabled: false,
            platDisabled: false,
            subsectionCodeList: [], // 分部list
            checked: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        exportHref () {
            let url = interfaceUrl + 'ims/platSaleAnalyzeExport?'
            for (let key in this.queryParams) {
                if (key !== 'pageSize' && key !== 'pageNumber') {
                    url += (key + '=' + this.queryParams[key] + '&')
                }
            }
            return url
        }
    },
    components: {
        platformSaleTable,
        HAutocomplete
    },
    methods: {
        async onFindRegionList () {
            const { data } = await findRegionList()
            this.regionList = data.data
            this.regionList.pop()
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
            this.branchList.map((val, index) => {
                this.subsectionCodeList.push(val.crmDeptCode)
            })
        },
        async onFindPaltList (subsectionCode) {
            const params = { subsectionCode }
            const { data } = await findPaltList(params)
            this.platList = []
            for (let i of data.data.pageContent) {
                i.value = i.companyShortName
                i.selectCode = i.companyCode
            }
            this.platList = data.data.pageContent
        },
        async queryCompanyByParams (params) {
            this.platList = []
            const { data } = await queryCompanyByParams(params)
            for (let i of data.data.pageContent) {
                i.value = i.companyShortName
                i.selectCode = i.companyCode
            }
            this.platList = data.data.pageContent
        },
        async getRegionCode () {
            // console.log('选择大区，获取分部和平台公司')
            this.removeValue = !this.removeValue
            this.queryParams.companyCode = ''
            this.subsectionCodeList = []
            await this.onFindBranchList(this.queryParams.regionCode)
            this.queryParams.subsectionCode = ''
            await this.queryCompanyByParams({ subsectionCodeList: this.subsectionCodeList }) // 根据大区获取平台公司
        },
        async getSubsectionCode () {
            // console.log('选择分部，获取平台公司')
            this.removeValue = !this.removeValue
            this.queryParams.companyCode = ''
            if (this.queryParams.subsectionCode) {
                await this.onFindPaltList(this.queryParams.subsectionCode)
            } else {
                await this.queryCompanyByParams({ subsectionCodeList: this.subsectionCodeList }) // 根据大区获取平台公司
            }
        },
        async getPlatformSale (value) {
            const { data } = await getPlatformSale(value)
            data.data.total.companyShortName = '合计'
            if (!this.total.type) {
                this.total.total = data.data.total
            }
            this.tableData = data.data.pageContent
            if (this.tableData.length > 0) {
                this.tableData.unshift(this.total.total)
            }
            this.paginationData.pageNumber = data.data.pageNumber
            this.paginationData.pageSize = data.data.pageSize
            this.paginationData.totalElements = data.data.totalElements
        },
        async getPlatformSaleSum () {
            this.total.type = 1
            const params = {
                onLineStatus: this.queryParams.onLineStatus,
                signScaleStart: this.queryParams.signScaleStart,
                signScaleEnd: this.queryParams.signScaleEnd,
                saleTimeStart: this.queryParams.saleTimeStart,
                saleTimeEnd: this.queryParams.saleTimeEnd,
                onlineTimeStart: this.queryParams.onlineTimeStart,
                onlineTimeEnd: this.queryParams.onlineTimeEnd,
                incremental: this.queryParams.incremental,
                regionCode: this.queryParams.regionCode,
                subsectionCode: this.queryParams.subsectionCode,
                companyCode: this.queryParams.companyCode,
                tagetType: this.queryParams.tagetType
            }
            if (params.saleTimeStart === null || params.saleTimeEnd === null) {
                this.$message({
                    message: '时间不能为空哦',
                    type: 'warning'
                })
                return
            }
            const { data } = await getPlatformSaleSum(params)
            data.data.companyShortName = '合计'
            Object.keys(this.total.total).forEach(key => {
                this.total.total[key] = data.data[key]
            })
            // this.$set(this.tableData, 0, this.total.total) // 若合计不会自动更新到视图上去则解注释此代码
            this.platformLoading = false // 等待合计接口返回数据停止loading
        },
        backPlat (value) {
            this.queryParams.companyCode = value.value.companyCode ? value.value.companyCode : ''
        },
        async onSizeChange (val) {
            this.platformLoading = true
            this.queryParams.pageSize = val
            await this.onQuery()
            this.platformLoading = false
        },
        async onCurrentChange (val) {
            this.platformLoading = true
            this.queryParams.pageNumber = val
            await this.onQuery()
            this.platformLoading = false
        },
        async onChoose () {
            this.platformLoading = true
            if (this.queryParams.saleTimeStart === null || this.queryParams.saleTimeEnd === null) {
                this.$message({
                    message: '时间不能为空哦',
                    type: 'warning'
                })
                return
            }
            this.total.type = 0
            await this.onQuery()
            this.getPlatformSaleSum()
        },
        async onQuery (event) {
            console.log(event)
            if (this.userInfo.organizationType !== -1 && this.userInfo.organizationType !== 0 && this.userInfo.organizationType !== 1) return
            // eslint-disable-next-line
            let start = /^\-?[0-9]*$/.test(this.queryParams.signScaleStart)
            // eslint-disable-next-line
            let end = /^\-?[0-9]*$/.test(this.queryParams.signScaleEnd)
            if (!start || !end) {
                this.$message({
                    type: 'error',
                    message: `签约规模填写有误`
                })
                return
            }
            if (this.queryParams.saleTimeStart === null || this.queryParams.saleTimeEnd === null) {
                this.$message({
                    message: '时间不能为空哦',
                    type: 'warning'
                })
                return
            }
            if (event === 'btn') {
                this.platformLoading = true
                this.total.type = 0
            }
            const arr = []
            this.checkedList.map(value => {
                if (value.checked) {
                    arr.push(value.key)
                }
            })
            this.queryParams.onLineStatus = arr.join(',')
            await this.getPlatformSale(this.queryParams)

            if (event === 'btn') {
                this.getPlatformSaleSum()
            }
        }
    },
    async mounted () {
        // 如果 当前人大区 -1  总部 0  分部 1 organizationType
        // console.log(this.userInfo.organizationType)
        await this.onFindRegionList() // 大区
        await this.onFindBranchList() // 分部
        if (this.userInfo.organizationType === -1) {
            this.regionDisabled = true
            this.queryParams.regionCode = this.userInfo.companyCode
            this.onFindBranchList(this.userInfo.companyCode) // 查大区下的分部
        } else if (this.userInfo.organizationType === 0) {
            this.onFindPaltList() // 平台公司
        } else if (this.userInfo.organizationType === 1) {
            this.regionDisabled = true
            this.branchDisabled = true
            this.regionInput = false
            this.queryParams.subsectionCode = this.userInfo.companyCode
            this.onFindPaltList(this.queryParams.subsectionCode) // 查分部下的公司
            let region = this.branchList.find((val) => {
                return val.crmDeptCode === this.queryParams.subsectionCode
            })
            await this.onFindRegion(region.pkFathedept) // 根据分部找大区
        }
        if (this.userInfo.organizationType !== -1 && this.userInfo.organizationType !== 0 && this.userInfo.organizationType !== 1) {
            this.regionDisabled = true
            this.branchDisabled = true
            this.platDisabled = true
            return
        }
        await this.onQuery()
        this.getPlatformSaleSum()
        // this.queryCompanyByParams({subsectionCodeList: []}) // 平台公司
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
