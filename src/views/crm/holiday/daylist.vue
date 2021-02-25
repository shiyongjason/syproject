<template>
    <div>
        <div class="page-body B2b">
            <div class="page-body-cont">
                <div class="query-cont__row">
                    <h-button type="primary" @click="onAddYear">新增节假日计划</h-button>
                </div>
            </div>
            <div class="page-body-cont">
                <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total" @pagination="searchList" actionWidth='375'
                    isAction :isActionFixed='tableData&&tableData.length>0'>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onLookDetail(scope.data.row)">查看详情</h-button>
                        <h-button table @click="onEdit">修订记录</h-button>
                        <h-button table>修改</h-button>
                    </template>
                </hosJoyTable>
            </div>
            <h-drawer title="维护记录" :visible.sync="drawer" :beforeClose="handleClose" direction='rtl' size='40%' :wrapperClosable="false">
                <template #connect>
                    123
                </template>
            </h-drawer>
        </div>
    </div>
</template>
<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { getHolidayList, getHolidayMax } from './api/index'
export default {
    components: { hosJoyTable },
    data () {
        return {
            options: {
                direction: 'rtl',
                size: '40%',
                wrapperClosable: false
            },
            drawer: false,
            queryParams: {},
            tableData: [],
            paginationInfo: {},
            yearArr: [],
            tableLabel: [
                { label: '年份', prop: 'year', width: '150', showOverflowTooltip: true },
                { label: '工作日天数（天）', prop: "workingDayNum", width: '150', showOverflowTooltip: true },
                { label: '非工作日天数（天）', prop: 'holidayNum', width: '150', showOverflowTooltip: true },
                // { label: '维护版本', prop: '', width: '150', showOverflowTooltip: true },
                { label: '最近维护人', prop: 'updateBy', width: '150', showOverflowTooltip: true },
                { label: '维护时间', prop: 'updateTime', width: '150', displayAs: 'YYYY-MM-DD', showOverflowTooltip: true }
            ],
            queryParams: {
                "pageNumber": 0,
                "pageSize": 0,
                "sort": {
                    "property": "string",
                    "direction": "ASC"
                }
            },
            maxYear: ''
        }
    },
    methods: {
        async searchList () {
            const { data } = await getHolidayList()
            this.tableData = data.records
            this.paginationInfo = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        onLookDetail (val) {
            console.log(val)
            this.$router.push({ path: '/goodwork/fullcalendar', query: { year: val.year } })
        },
        async onGetMax () {
            const { data } = await getHolidayMax()
            this.maxYear = data
        },
        onAddYear () {
            this.$router.push({ path: '/goodwork/fullcalendar', query: { year: this.maxYear + 1 } })
        }
    },
    mounted () {
        this.searchList()
        this.onGetMax()
    }
}
</script>
<style lang="scss" scoped>
</style>