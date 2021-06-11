<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="title-cont">
                <span class="title-cont__label">运费价格基础规则</span>
            </div>
            <hosJoyTable :column="tableLabel" :data="tableDataFilter" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="pagination.total" @pagination="getFreightRuleList" collapseShow border stripe :showPagination='false' prevLocalName="V3.*" localName="V3.*.1">
                <template slot="special">
                    <span>一单一议</span>
                </template>
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
                { label: '县区', prop: 'countryNames', showOverflowTooltip: true },
                {
                    label: '大件货运费基础价格',
                    children: [
                        { label: '市区', prop: 'big_city', headerUnit: '', unit: '元/件' },
                        { label: '县区', prop: 'big_country', headerUnit: '', unit: '元/件' }
                    ],
                    showOverflowTooltip: true
                },
                {
                    label: '中件货运费基础价格',
                    children: [
                        { label: '市区', prop: 'middle_city', headerUnit: '', unit: '元/件' },
                        { label: '县区', prop: 'middle_country', headerUnit: '', unit: '元/件' }
                    ],
                    showOverflowTooltip: true
                },
                {
                    label: '小件货运费基础价格',
                    children: [
                        { label: '市区', prop: 'small_city', headerUnit: '', unit: '元/件' },
                        { label: '县区', prop: 'small_country', headerUnit: '', unit: '元/件' }
                    ],
                    showOverflowTooltip: true
                },
                { label: '特殊件', prop: 'special', slot: 'special', showOverflowTooltip: true }
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
            let resultMap = new Map()
            let result = []
            const PRICE_MAP = new Map([
                ['1_1', 'big_city'],
                ['1_2', 'middle_city'],
                ['1_3', 'small_city'],
                ['2_1', 'big_country'],
                ['2_2', 'middle_country'],
                ['2_3', 'small_country']
            ])
            this.tableData.forEach(item => {
                const pcKey = item.provinceId + '_' + item.cityId
                item[PRICE_MAP.get(item.regionType + '_' + item.goodsType)] = item.price
                item.countryNames = new Set()
                let obj = resultMap.get(pcKey) || { ...item }
                if (item.regionType != 1) {
                    obj.countryNames.add(item.countryName)
                }
                obj = { ...item, ...obj }
                resultMap.set(pcKey, obj)
            })
            resultMap.forEach(value => {
                value.countryNames = Array.from(value.countryNames).join(',')
                result.push(value)
            })
            console.log(result)
            return result
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
