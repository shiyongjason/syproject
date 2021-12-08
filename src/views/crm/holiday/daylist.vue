<template>
    <div>
        <div class="page-body B2b">
            <div class="page-body-cont">
                <div class="query-cont__row">
                    <h-button type="primary" @click="onAddYear" v-if="hosAuthCheck(Auths.HOLIDAY_ADD)">新增节假日计划</h-button>
                </div>
            </div>
            <div class="page-body-cont">
                <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total" @pagination="searchList" actionWidth='375'
                    isAction :isActionFixed='tableData&&tableData.length>0'>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onLookDetail(scope.data.row)">查看详情</h-button>
                        <h-button table @click="onRevise(scope.data.row)">修订记录</h-button>
                        <h-button table @click="onEdit(scope.data.row)" v-if="hosAuthCheck(Auths.HOLIDAY_EDIT)">修改</h-button>
                    </template>
                </hosJoyTable>
            </div>
            <h-drawer title="维护记录" :visible.sync="drawer" :beforeClose="handleClose" direction='rtl' :wrapperClosable="false">
                <template #connect>
                    <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="drawerLabel" :data="draweData" :pageNumber.sync="drawerParams.pageNumber" :pageSize.sync="drawerParams.pageSize" :total="drawrPaginationInfo.total" @pagination="onGetResive">
                    </hosJoyTable>
                </template>
            </h-drawer>
        </div>
    </div>
</template>
<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { getHolidayList, getHolidayMax, getHolidaRevise } from './api/index'
import * as Auths from '@/utils/auth_const'
export default {
    components: { hosJoyTable },
    name: 'holiday',
    data () {
        return {
            Auths,
            options: {
                direction: 'rtl',
                size: '50%',
                wrapperClosable: false
            },
            drawer: false,
            tableData: [],
            paginationInfo: {},
            yearArr: [],
            tableLabel: [
                { label: '年份', prop: 'year', width: '150', showOverflowTooltip: true },
                { label: '工作日天数（天）', prop: 'workingDayNum', width: '150', showOverflowTooltip: true },
                { label: '非工作日天数（天）', prop: 'holidayNum', width: '150', showOverflowTooltip: true },
                // { label: '维护版本', prop: '', width: '150', showOverflowTooltip: true },
                { label: '最近维护人', prop: 'updateBy', width: '150', showOverflowTooltip: true },
                { label: '维护时间', prop: 'updateTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm', showOverflowTooltip: true }
            ],
            queryParams: {
                'pageNumber': 0,
                'pageSize': 10
            },
            maxYear: '',
            drawerParams: {
                'pageNumber': 1,
                'pageSize': 10
            },
            draweData: [],
            drawerYear: '',
            drawerLabel: [
                { label: '年份', prop: 'year', width: '', showOverflowTooltip: true },
                { label: '维护记录', prop: 'operationDetails', width: '200', showOverflowTooltip: true },
                { label: '维护人', prop: 'createBy', width: '', showOverflowTooltip: true },
                { label: '维护时间', prop: 'createTime', width: '', displayAs: 'YYYY-MM-DD HH:mm', showOverflowTooltip: true }
            ],
            drawrPaginationInfo: {

            }

        }
    },
    methods: {
        async searchList () {
            const { data } = await getHolidayList(this.queryParams)
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
            this.$router.push({ path: '/goodwork/fullcalendar', query: { year: this.maxYear + 1, type: 'edit' } })
        },
        onEdit (val) {
            this.$router.push({ path: '/goodwork/fullcalendar', query: { year: val.year, type: 'edit' } })
        },
        onRevise (val) {
            this.drawer = true
            this.drawerYear = val.year
            this.onGetResive(val)
        },
        handleClose () {
            this.drawer = false
        },
        async onGetResive (val) {
            const { data } = await getHolidaRevise({ year: this.drawerYear, params: this.drawerParams })
            this.draweData = data.records
            this.drawrPaginationInfo = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
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