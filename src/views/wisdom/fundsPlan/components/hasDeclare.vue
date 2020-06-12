<template>
    <div>
        <h3 class="p20">已申报资金计划</h3>
        <div class="query-cont-col">
            <div class="query-col-title">申报月份：</div>
            <div class="query-col-input">
                <el-date-picker v-model="queryParams.applyMonth" type="month" value-format="yyyyMM" placeholder="选择月">
                </el-date-picker>
            </div>
        </div>
        <div class="query-cont-col">
            <div class="query-col-title">平台公司名称：</div>
            <div class="query-col-input">
                <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
            </div>
        </div>
        <div class="query-cont-col">
            <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
            <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
        </div>
        <div class="p24">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='120'>
                <template slot="applyMonth" slot-scope="scope">
                    <span>{{`${scope.data.row.applyMonth.substring(0, 4)}-${scope.data.row.applyMonth.substring(4, 6)}`}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onApproveDeclare(scope.data.row)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { hasDeclareLabel } from '../const'
import { mapState, mapActions } from 'vuex'
import { getFundPlanAll } from '../api/index'
export default {
    name: 'hasDeclare',
    components: { HAutocomplete },
    computed: {
        ...mapState({
            platComList: state => state.platformData
        })
    },
    data () {
        return {
            tableLabel: hasDeclareLabel,
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            queryParams: {
                applyMonth: '',
                companyName: '',
                pageNumber: 1,
                pageSize: 10,
                applyType: '1,2,3' // 已申报
            },
            searchParams: {},
            selectPlatObj: {
                selectCode: '',
                selectName: ''
            }
        }
    },
    mounted () {
        this.onSearch()
        this.findPlatformslist({ showAll: true })
    },
    methods: {
        ...mapActions([
            'findPlatformslist' // 平台公司
        ]),
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onApproveDeclare (row) {
            this.$router.push({
                path: '/fundsPlan/approveDeclare',
                query: {
                    id: row.planId,
                    source: 'planToDeclare'
                }
            })
        },
        backPlat (val) {
            this.queryParams.companyName = val.value.companyShortName ? val.value.companyShortName : ''
        },
        async onQuery () {
            const { data } = await getFundPlanAll(this.searchParams)
            this.tableData = data.records
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        onReset () {
            this.$set(this.queryParams, 'applyMonth', '')
            this.$set(this.queryParams, 'companyName', '')
            this.selectPlatObj = {
                selectCode: '',
                selectName: ''
            }
            this.onSearch()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        }
    }
}
</script>

<style lang='scss' scoped>
.p24 {
    padding: 0 24px;
}
.p20 {
    padding-bottom: 20px;
}
</style>
