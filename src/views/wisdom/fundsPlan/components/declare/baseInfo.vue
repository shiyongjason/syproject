<template>
    <div class="baseInfo">
        <el-form ref="ruleForm" label-width="200px">
            <h3>基础信息</h3>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="平台公司代码：">
                        <div class="w250">
                            <span>{{fundDetail.fundplanMain.misCode}}</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="平台公司名称：">
                        <div class="w250">
                            <span>{{fundDetail.fundplanMain.companyName}}</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item label="所属分部：">
                        <div class="w250">
                            <span>{{fundDetail.fundplanMain.subsectionName}}</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="申报填报人：">
                        <div class="w250">
                            <span>{{fundDetail.fundplanMain.createBy}}</span>
                        </div>
                    </el-form-item>
                </div>
            </div>

            <h3>销售数据</h3>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item :label="`${fundDetail.fundplanSale.commitmentAnnualYear}年承诺额：`">
                        <div class="w250">
                            <span>{{fundDetail.fundplanSale.commitmentAnnual || 0}}</span>
                            
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item :label="`${commimentLastMonthName}承诺额：`">
                        <div class="w250">
                            <span>{{fundDetail.fundplanSale.commimentLastMonth || 0}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item :label="`${commimentNextMonthName}承诺额：`">
                        <div class="w250">
                            <span>{{fundDetail.fundplanSale.commimentNextMonth || 0}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item :label="`截止${totalSaleCurrentYearName}底销售额：`">
                        <div class="w250">
                            <span>{{fundDetail.fundplanSale.totalSaleCurrentYear || 0}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item :label="`${saleCurrentMonthName}实时销售额：`">
                        <div class="w250">
                            <span>{{fundDetail.fundplanSale.saleCurrentMonth || 0}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <h3>借款情况</h3>
            <el-form-item label="在款余额：">
                <div class="w250">
                    <span>-</span>
                    <span class="dw">万元</span>
                </div>
            </el-form-item>
            <el-form-item label="待还款明细：">
                <div class="w250">
                    <el-button type="primary" size="small" disabled>{{BaseInfoBtnTip}}</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { BaseInfoBtnTip } from '../../enums/fundPlanEnum'
export default {
    name: 'baseInfo',
    props: {
        fundDetail: {
            type: Object,
            default: () => {
                return {
                    fundplanSale: {}
                }
            }
        }
    },
    data () {
        return {
            isOpen: false
        }
    },
    mounted () {
        console.log(this.fundDetail)
    },
    computed: {
        /**
         * @return {string}
         * 按钮文案
         */
        BaseInfoBtnTip () {
            return this.isOpen ? BaseInfoBtnTip.open : BaseInfoBtnTip.close
        },
        commimentLastMonthName () {
            if (!this.fundDetail.fundplanSale.commimentLastMonthName) {
                return 'XXXX年XX月'
            }
            return `${this.fundDetail.fundplanSale.commimentLastMonthName.substring(0, 4)}年${this.fundDetail.fundplanSale.commimentLastMonthName.substring(4, 6)}月`
        },
        commimentNextMonthName () {
            if (!this.fundDetail.fundplanSale.commimentNextMonthName) {
                return 'XXXX年XX月'
            }
            return `${this.fundDetail.fundplanSale.commimentNextMonthName.substring(0, 4)}年${this.fundDetail.fundplanSale.commimentNextMonthName.substring(4, 6)}月`
        },
        totalSaleCurrentYearName () {
            if (!this.fundDetail.fundplanSale.totalSaleCurrentYearName) {
                return 'XXXX年XX月'
            }
            return `${this.fundDetail.fundplanSale.totalSaleCurrentYearName.substring(0, 4)}年${this.fundDetail.fundplanSale.totalSaleCurrentYearName.substring(4, 6)}月`
        },
        saleCurrentMonthName () {
            if (!this.fundDetail.fundplanSale.saleCurrentMonthName) {
                return 'XXXX年XX月'
            }
            return `${this.fundDetail.fundplanSale.saleCurrentMonthName.substring(0, 4)}年${this.fundDetail.fundplanSale.saleCurrentMonthName.substring(4, 6)}月`
        }
    }
}
</script>

<style lang='scss' scoped>
.baseInfo {
    padding: 0 24px;
    h3 {
        padding-bottom: 10px;
    }
    .dw {
        margin-left: 10px;
    }
    .w250 {
        width: 250px;
        padding: 0 16px;
        box-sizing: border-box;
    }
    .query-cont-col {
        margin-bottom: 0px;
    }
    .el-form .el-form-item {
        margin-bottom: 10px;
    }
}
</style>
