<template>
        <el-collapse-item name="3">
            <template slot="title">
                <p class="title-p">销售业绩(含税)（万元）</p>
            </template>
            <table class="table-title">
                <thead>
                    <tr>
                        <td colspan="2" rowspan="2" width="120">月份</td>
                        <td colspan="2" width="120">本年度</td>
                        <td colspan="2" width="120">上年度</td>
                        <td colspan="2" width="120">上上年度</td>
                    </tr>
                    <tr>
                        <td width="120">销售</td>
                        <td width="120">占比</td>
                        <td width="120">销售</td>
                        <td width="120">占比</td>
                        <td width="120">销售</td>
                        <td width="120">占比</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in form.dueBusinessSaleCreateFormList" :key="index">
                        <td colspan="2">{{item.month}}</td>
                        <td>
                            <template v-if="index === 0">
                                <el-input placeholder="" maxlength="25" v-model="currentYearAllSales" @keyup.native="oninput('currentYearAllSales',$event)">
                                </el-input>
                            </template>
                            <template v-else>
                                <el-input placeholder="" maxlength="25" v-model="item.currentYearSales" @keyup.native="oninputSale(index,'currentYearSales',$event)">
                                </el-input>
                            </template>
                        </td>
                        <td>
                            <template v-if="index === 0"></template>
                            <template v-else>{{ item.currentYearSales/currentYearAllSales | keepTwoNum }}</template>
                        </td>
                        <td>
                            <template v-if="index === 0">
                                <el-input placeholder="" maxlength="25" v-model="lastYearAllSales" @keyup.native="oninput('lastYearAllSales',$event)">
                                </el-input>
                            </template>
                            <template v-else>
                                <el-input placeholder="" maxlength="25" v-model="item.lastYearSales" @keyup.native="oninputSale(index, 'lastYearSales', $event)">
                                </el-input>
                            </template>
                        </td>
                        <td>
                            <template v-if="index === 0"></template>
                            <template v-else>{{ item.lastYearSales/lastYearAllSales | keepTwoNum }}</template>
                        </td>
                        <td>
                            <template v-if="index === 0">
                                <el-input placeholder="" maxlength="25" v-model="lastTwoYearAllSales" @keyup.native="oninput('lastTwoYearAllSales',$event)">
                                </el-input>
                            </template>
                            <template v-else>
                                <el-input placeholder="" maxlength="25" v-model="item.lastTwoYearSales" @keyup.native="oninputSale(index, 'lastTwoYearSales', $event)">
                                </el-input>
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
                <el-select v-model="form.firstTenMonthsDown" placeholder="请选择">
                    <el-option v-for="item in firstTenMonthsDownData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
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
    methods: {
        oninputSale (i, v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            // console.log(e.target.value)
            this.dueBusinessSaleCreateFormList[i][v] = e.target.value
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