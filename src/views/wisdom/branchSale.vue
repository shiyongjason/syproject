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
                <div class="query-cont-col flex-box-time">
                    <div class="query-col-title">时间：</div>
                    <el-date-picker v-model="queryParams.startDate" :editable="false" :clearable='false' :picker-options="pickerOptionsStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 180px">
                    </el-date-picker>
                    <div class="line ml5 mr5">-</div>
                    <el-date-picker v-model="queryParams.endDate" :editable="false" :clearable='false' :picker-options="pickerOptionsEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 180px">
                    </el-date-picker>
                    <el-button type="primary" class="ml20" @click="onSearch()">
                        查询
                    </el-button>
                    <el-button type="primary" v-if="hosAuthCheck(exportAuth)" class="ml20" @click="onExport()">
                        导出
                    </el-button>
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
                <branchSaleTable :tableData="tableData" :paginationData="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></branchSaleTable>
            </div>
        </div>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
import { getBranchSale, getBranchSaleSum, exportBranchSale } from './api/index.js'
import branchSaleTable from './components/branchSaleTable.vue'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { AUTH_WIXDOM_BRANCH_SALE_EXPORT } from '@/utils/auth_const'
import { departmentAuth } from '@/mixins/userAuth'
export default {
    name: 'brandSale',
    components: { branchSaleTable, HAutocomplete },
    mixins: [departmentAuth],
    data: function () {
        return {
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
            exportAuth: AUTH_WIXDOM_BRANCH_SALE_EXPORT,
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                regionCode: '', // 大区编码
                subsectionCode: '', // 分部编码
                startDate: `${(new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1 > 9 ? (new Date()).getMonth() + 1 : '0' + ((new Date()).getMonth() + 1))) + '-01'}`, // 时间
                endDate: new Date().toJSON().split('T')[0],
                targetStatus: '3'
            },
            searchParams: {},
            paginationData: {
                totalElements: 0,
                pageSize: 10,
                pageNumber: 1
            },
            tableData: [],
            selectAuth: {
                regionObj: {
                    selectCode: '',
                    selectName: ''
                },
                branchObj: {
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
            branchList: state => state.branchList
        })
    },
    methods: {
        onExport () {
            exportBranchSale(this.queryParams)
        },
        linkage () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.queryParams.subsectionCode = ''
            this.selectAuth.branchObj = { ...obj }
        },
        async backPlat (val, dis) {
            if (dis === 'D') {
                this.queryParams.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                // 清空分部区域
                !val.value.pkDeptDoc && this.linkage()
            } else if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
            }
        },
        async onChoose (val) {
            this.searchParams.targetStatus = val
            await this.onQuery()
        },
        async onSizeChange (val) {
            this.searchParams.pageSize = val
            await this.onQuery()
        },
        async onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            await this.onQuery()
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        async onQuery () {
            const res = await Promise.all([getBranchSale(this.searchParams), getBranchSaleSum(this.searchParams)])
            this.tableData = res[0].data.data.records
            this.paginationData = {
                total: res[0].data.data.total,
                pageSize: res[0].data.data.size,
                pageNumber: res[0].data.data.current
            }
            let obj = { subsectionName: '合计' }
            Object.keys(res[1].data.data).forEach(function (key) {
                let totalKye = key.split('Total')[0]
                obj[totalKye] = res[1].data.data[key]
            })
            this.tableData.unshift(obj)
        }
    },
    async mounted () {
        await this.onSearch()
        await this.newBossAuth(['D', 'F'])
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
