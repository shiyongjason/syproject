<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <hosJoyTable :column="tableLabel" :data="tableDataFilter" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="pagination.total" @pagination="getFreightRuleList" collapseShow border stripe :showPagination='false' prevLocalName="V3.*" localName="V3.*.1">
                <!-- <template slot="status" slot-scope="scope">
                    <span>{{scope.data.row.startTime | formatterTime}}~{{scope.data.row.endTime | formatterTime}}</span>
                </template> -->
                <!-- <template slot="startTime" slot-scope="scope">
                    <span>{{scope.data.row.startTime | formatterTime}}~{{scope.data.row.endTime | formatterTime}}</span>
                </template>
                <template slot="status" slot-scope="scope">
                    {{arrayToMap(activityStatusOptions).get(scope.data.row.status)}}
                </template> -->
            </hosJoyTable>
        </div>
    </div>
</template>
<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'freightComputeRule',
    components: {
        hosJoyTable
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: -1
            },
            resetParams: {},
            tableLabel: [
                { label: '省份', prop: 'provinceName', showOverflowTooltip: true },
                { label: '城市', prop: 'cityName', showOverflowTooltip: true },
                { label: '县区', prop: 'countryName', showOverflowTooltip: true },
                {
                    label: '大件货运费价格',
                    children: [
                        { label: '市区', prop: 'advancePaymentProportion' },
                        { label: '县区', prop: 'deliveryPaymentProportion' }
                    ],
                    showOverflowTooltip: true
                },
                {
                    label: '中件货运费价格',
                    children: [
                        { label: '市区', prop: 'advancePaymentProportion' },
                        { label: '县区', prop: 'deliveryPaymentProportion' }
                    ],
                    showOverflowTooltip: true
                },
                {
                    label: '小件货运费价格',
                    children: [
                        { label: '市区', prop: 'advancePaymentProportion' },
                        { label: '县区', prop: 'deliveryPaymentProportion' }
                    ],
                    showOverflowTooltip: true
                },
                { label: '特殊件', prop: 'status', showOverflowTooltip: true }
            ],
            tableData: [],
            pagination: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            freightRuleData: state => state.hmall.warehouseManage.freightRuleData
        }),
        tableDataFilter () {
            const tableData = this.freightRuleData.records
            const result = this.tableData.filter((item, index) => item.provinceId == this.tableData[index].provinceId && item.cityId == this.tableData[index].cityId)
            // .map(item => {
            //     const countryArr = []
            //     return { provinceName: item.provinceName, cityName: item.cityName, countryName: item.countryName, countryArr: countryArr.push(JSON.stringify(item.countryName)) }
            // })
            console.log(result)
            return tableData
        }
    },
    methods: {
        init () {
            this.resetParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getFreightRuleList()
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.getFreightRuleList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.getFreightRuleList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getFreightRuleList()
        },
        ...mapActions({
            findFreightRuleList: 'warehouseManage/findFreightRuleList'
        }),
        async getFreightRuleList () {
            await this.findFreightRuleList(this.queryParams)
            this.tableData = this.freightRuleData.records
            this.pagination = {
                pageNumber: this.freightRuleData.current,
                pageSize: this.freightRuleData.size,
                total: this.freightRuleData.total
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>
