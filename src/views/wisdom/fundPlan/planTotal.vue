<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title"> 查询期间：</div>
                <div class="query-col-input">
                    <el-date-picker type="date" v-model="params.startDate" :clearable=false placeholder="开始日期" value-format='yyyy-MM-dd' :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker type="date" v-model="params.endDate" :clearable=false placeholder="结束日期" value-format='yyyy-MM-dd' :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">分部：</div>
                <div class="query-col-input">
                    <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='false'></HAutocomplete>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery()">
                        搜索
                    </el-button>
                    <el-button type="primary" class="ml20" @click="onReset()">
                        重置
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <hosJoyTable ref="hosjoyTable" border stripe showPagination :column="column" :data="tableData" align="center" :total="page.total"></hosJoyTable>
        </div>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { summarySheet } from './const'
import { departmentAuth } from '@/mixins/userAuth'
export default {
    name: 'planTotal',
    mixins: [departmentAuth],
    components: {
        hosJoyTable,
        HAutocomplete
    },
    data () {
        return {
            params: {
                pageSize: 10,
                pageNumber: 1,
                startDate: '',
                endDate: ''
            },
            paramsTemp: {},
            platComList: [],
            selectPlatObj: {
                selectCode: '',
                selectName: ''
            },
            page: {
                total: 0
            },
            tableData: [],
            column: summarySheet
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.params.endDate
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.params.startDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    methods: {
        backPlat (value) {
            console.log(value)
        },
        onReset () {
            this.params = { ...this.paramsTemp }
        }
    },
    async mounted () {
        this.paramsTemp = { ...this.params }
        await this.oldAuth()
        if (this.userInfo.deptType === 2) {
            this.queryParams.subsectionCode = this.branchList[0].crmDeptCode
        }
    }
}
</script>

<style scoped>
</style>
