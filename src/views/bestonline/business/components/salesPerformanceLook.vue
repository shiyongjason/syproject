<template>
    <el-collapse-item name="3">
        <template slot="title">
            <p class="title-p">销售业绩(含税)（万元）</p>
        </template>
        <table class="custom-table">
            <thead>
                <tr>
                    <td colspan="2" rowspan="2" width="16%">月份</td>
                    <td colspan="2" width="28%">本年度</td>
                    <td colspan="2" width="28%">上年度</td>
                    <td colspan="2" width="28%">上上年度</td>
                </tr>
                <tr>
                    <td width="14%">销售</td>
                    <td width="14%">占比</td>
                    <td width="14%">销售</td>
                    <td width="14%">占比</td>
                    <td width="14%">销售</td>
                    <td width="14%">占比</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in form.dueBusinessSaleCreateFormList" :key="index">
                    <td colspan="2">{{item.month}}</td>
                    <td>
                        <template v-if="index === 0">
                           {{currentYearAllSales}}
                        </template>
                        <template v-else>
                           {{item.currentYearSales}}
                        </template>
                    </td>
                    <td>
                        <template v-if="index === 0"></template>
                        <template v-else>{{ item.currentYearSales/currentYearAllSales | keepTwoNum }}</template>
                    </td>
                    <td>
                        <template v-if="index === 0">
                            {{lastYearAllSales}}
                        </template>
                        <template v-else>
                      {{item.lastYearSales}}
                        </template>
                    </td>
                    <td>
                        <template v-if="index === 0"></template>
                        <template v-else>{{ item.lastYearSales/lastYearAllSales | keepTwoNum }}</template>
                    </td>
                    <td>
                        <template v-if="index === 0">
                           {{lastTwoYearAllSales}}
                        </template>
                        <template v-else>
                           {{item.lastTwoYearSales}}
                        </template>
                    </td>
                    <td>
                        <template v-if="index === 0"></template>
                        <template v-else>{{ item.lastTwoYearSales/lastTwoYearAllSales | keepTwoNum }}</template>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-form-item label="前10个月销售是否持续下滑：" label-width="200px" class="mt20">
            {{form.firstTenMonthsDown==1?'下滑':form.firstTenMonthsDown==0?'正常':""}}
        </el-form-item>
    </el-collapse-item>
</template>
<script>
import { MAIN_COMMERCIAL_OPTIONS, MAIN_CATEGORY_OPTIONS, DOWN_OPTIONS } from '../const'
import { mapState } from 'vuex'
import { plusOrMinus } from '../../../../utils/rules'
export default {
    name: 'business_mode',
    data () {
        return {
            mainCommercialOptions: MAIN_COMMERCIAL_OPTIONS,
            mainCategoryOptions: MAIN_CATEGORY_OPTIONS,
            firstTenMonthsDownData: DOWN_OPTIONS,
            currentYearAllSales: 0, // 今年销售总额
            lastYearAllSales: 0, // 去年销售总额
            lastTwoYearAllSales: 0 // 前年销售总额
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        })
    },
    watch: {
        'form.dueBusinessSaleCreateFormList': {
            handler (val) {
                let databaseCurrentYearAllSales
                let databaseLastYearAllSales
                let databaseLastTwoYearAllSales
                this.currentYearAllSales = 0
                this.lastYearAllSales = 0
                this.lastTwoYearAllSales = 0
                val.map((item, index) => {
                    if (index === 0) {
                        databaseCurrentYearAllSales = parseFloat(item.currentYearSales)
                        databaseLastYearAllSales = parseFloat(item.lastYearSales)
                        databaseLastTwoYearAllSales = parseFloat(item.lastTwoYearSales)
                    } else {
                        this.currentYearAllSales += parseFloat(item.currentYearSales ? item.currentYearSales : 0)
                        this.lastYearAllSales += parseFloat(item.lastYearSales ? item.lastYearSales : 0)
                        this.lastTwoYearAllSales += parseFloat(item.lastTwoYearSales ? item.lastTwoYearSales : 0)
                    }
                })
                this.currentYearAllSales = (this.currentYearAllSales ? this.currentYearAllSales : 0).toFixed(2)
                this.lastYearAllSales = (this.lastYearAllSales).toFixed(2)
                this.lastTwoYearAllSales = (this.lastTwoYearAllSales).toFixed(2)
                if (this.watchTime === 0) {
                    if (+this.currentYearAllSales !== databaseCurrentYearAllSales) {
                        this.currentYearAllSales = databaseCurrentYearAllSales.toFixed(2)
                    }
                    if (+this.lastYearAllSales !== databaseLastYearAllSales) {
                        this.lastYearAllSales = databaseLastYearAllSales.toFixed(2)
                    }
                    if (+this.lastTwoYearAllSales !== databaseLastTwoYearAllSales) {
                        this.lastTwoYearAllSales = databaseLastTwoYearAllSales.toFixed(2)
                    }
                }
                this.watchTime++
            },
            deep: true
        }
    },
    methods: {
        oninputSale (i, v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            // console.log(e.target.value)
            // this.dueBusinessSaleCreateFormList[i][v] = e.target.value
            // console.log(this.dueBusinessSaleCreateFormList[i][v])
        },
        oninput (value, e) {
            // 通过正则过滤小数点后两位
            this[value] = plusOrMinus(e.target.value.toString())
        }
    },
    filters: {
        keepTwoNum: function (val) {
            if (isNaN(val)) {
                val = 0
            }
            val = val * 100
            val = Number(val)
            if (val || val === 0) {
                return val.toFixed(2) + '%'
            } else {
                return '-'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.salerTable {
    td {
        width: 12%;
    }
}
</style>