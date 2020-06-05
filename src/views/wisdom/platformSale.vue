<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col" v-if="region">
                    <div class="query-col-title">大区：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="regionList" @back-event="backPlat($event,'D')" placeholder="请输入大区名称" :selectObj="selectAuth.regionObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col" v-if="branch">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入分部名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
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
                    <el-button type="primary" class="ml20" @click="onQuery({...queryParams,pageNumber: 1}, 'btn')">
                        查询
                    </el-button>
                    <a :href="exportHref" v-if="hosAuthCheck(exportAuth)" class="ml20 download">导出</a>
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
import { mapState, mapActions } from 'vuex'
import { getPlatformSale, queryCompanyByParams, getPlatformSaleSum } from './api/index.js'
import platformSaleTable from './components/platformSaleTable.vue'
import { departmentAuth } from '@/mixins/userAuth'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { DEPT_TYPE } from './store/const'
import { AUTH_WIXDOM_PLATFORM_SALE_EXPORT } from '@/utils/auth_const'
export default {
    name: 'platformSale',
    mixins: [departmentAuth],
    data: function () {
        return {
            exportAuth: AUTH_WIXDOM_PLATFORM_SALE_EXPORT,
            deptType: DEPT_TYPE,
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
                saleTimeStart: `${(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 9 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1))) + '-01'}`, // 时间
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
            regionDisabled: false,
            branchDisabled: false,
            platDisabled: false,
            subsectionCodeList: [], // 分部list
            checked: false,
            selectAuth: {
                regionObj: {
                    selectCode: '',
                    selectName: ''
                },
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            platformData: state => state.platformData
        }),
        exportHref () {
            let url = interfaceUrl + 'rms/platSaleAnalyze/platSaleAnalyzeExport?'
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
        ...mapActions({
            findAuthList: 'findAuthList'
        }),
        async onFindRegionList () {
            await this.findAuthList({ deptType: 'D', pkDeptDoc: this.userInfo.pkDeptDoc })
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
            this.queryParams.subsectionCode = ''
            this.subsectionCodeList = []
            await this.onFindBranchList(this.queryParams.regionCode)
        },
        async getSubsectionCode () {
            // console.log('选择分部，获取平台公司')
            this.removeValue = !this.removeValue
            this.queryParams.companyCode = ''
            await this.onFindPaltList(this.queryParams.subsectionCode)
        },
        async getPlatformSale (value) {
            const { data } = await getPlatformSale(value)
            data.data.total.companyShortName = '合计'
            if (!this.total.type) {
                this.total.total = data.data.total
            }
            this.tableData = data.data.pageContent
            this.tableData.map(i => {
                if (i.incremental == 1) {
                    i.incremental = '增量'
                } else {
                    i.incremental = '存量'
                }
            })
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
        async backPlat (val, dis) {
            if (dis === 'D') {
                this.queryParams.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                if (val.value.pkDeptDoc) {
                    this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
                } else {
                    !this.userInfo.deptType && this.findPlatformslist()
                }
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'P') {
                this.queryParams.companyCode = val.value.companyCode ? val.value.companyCode : ''
            }
        },
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            if (dis === 'D') {
                this.queryParams.subsectionCode = ''
                this.queryParams.subRegionCode = ''
                this.queryParams.misCode = ''
                this.selectAuth.branchObj = { ...obj }
                this.selectAuth.platformObj = { ...obj }
            } else if (dis === 'F') {
                this.queryParams.subRegionCode = ''
                this.queryParams.misCode = ''
                this.selectAuth.platformObj = { ...obj }
            }
        },
        async onSizeChange (val) {
            this.platformLoading = true
            this.queryParamsTemp.pageSize = val
            await this.onQuery(this.queryParamsTemp)
            this.platformLoading = false
        },
        async onCurrentChange (val) {
            this.platformLoading = true
            this.queryParamsTemp.pageNumber = val
            await this.onQuery(this.queryParamsTemp)
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
            await this.onQuery(this.queryParams)
            this.getPlatformSaleSum()
        },
        async onQuery (params, event) {
            // if (this.userInfo.organizationType !== -1 && this.userInfo.organizationType !== 0 && this.userInfo.organizationType !== 1) return
            this.queryParamsTemp = { ...params }
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
            if (params.saleTimeStart === null || params.saleTimeEnd === null) {
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
            const temp = { ...params }
            temp.onLineStatus = arr.join(',')
            await this.getPlatformSale(temp)

            if (event === 'btn') {
                this.getPlatformSaleSum()
            }
        }
    },
    async mounted () {
        this.newBossAuth(['D', 'F', 'P'])
        await this.onQuery(this.queryParams)
        this.getPlatformSaleSum()
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
