<template>
    <div class="baseInfo">
        <el-form ref="ruleForm" label-width="200px">
            <h3>基础信息</h3>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="平台公司代码：">
                        <div class="w250">
                            <span>1023</span>
                            <span class="dw">元</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="平台公司名称：">
                        <div class="w250">
                            <span>南京万汇连环境有限公司</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item label="所属分部：">
                        <div class="w250">
                            <span>南京分部</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="申报填报人：">
                        <div class="w250">
                            <span>丁一</span>
                        </div>
                    </el-form-item>
                </div>
            </div>

            <h3>销售数据</h3>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="2020年承诺额：">
                        <div class="w250">
                            <span>1023</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item label="2020年3月承诺额：">
                        <div class="w250">
                            <span>200</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item label="2020年4月承诺额：">
                        <div class="w250">
                            <span>200</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="截止2020年2月底销售额：">
                        <div class="w250">
                            <span>200</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item label="2020年3月实时销售额：">
                        <div class="w250">
                            <span>200</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <h3>借款情况</h3>
            <el-form-item label="在款余额：">
                <div class="w250">
                    <span>200</span>
                    <span class="dw">万元</span>
                </div>
            </el-form-item>
            <el-form-item label="待还款明细：">
                <div class="w250">
                    <el-button type="primary" size="small">{{BaseInfoBtnTip}}</el-button>
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
        fundBaseAndSale: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data () {
        return {
            isOpen: false
        }
    },
    mounted () {
        console.log(this.fundBaseAndSale)
    },
    computed: {
        /**
         * @return {string}
         * 按钮文案
         */
        BaseInfoBtnTip () {
            return this.isOpen ? BaseInfoBtnTip.open : BaseInfoBtnTip.close
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
    .query-cont-col{
        margin-bottom: 0px;
    }
    .el-form .el-form-item{
        margin-bottom: 10px;
    }
}
</style>
