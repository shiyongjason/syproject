<template>
    <div>
        <h3>基础信息</h3>
        <div class="wrapper">
            <div class="col-info">
                <div class="query-col-title"> 平台公司代码：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <span>1023</span>
                        <span class="dw">元</span>
                    </div>
                </div>
            </div>
            <div class="col-info">
                <div class="query-col-title"> 平台公司名称：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <span>南京万汇连环境有限公司</span>
                    </div>
                </div>
            </div>
            <div class="col-info">
                <div class="query-col-title"> 所属分部：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <span>南京分部</span>
                    </div>
                </div>
            </div>
            <div class="col-info">
                <div class="query-col-title"> 申报填报人：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <span>丁一</span>
                    </div>
                </div>
            </div>
        </div>
        <h3>销售数据</h3>
        <div class="wrapper">
            <div class="col-info">
                <div class="query-col-title"> 2020年承诺额：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <span>3000</span>
                        <span class="dw">万元</span>
                    </div>
                </div>
            </div>
            <div class="col-info">
                <div class="query-col-title"> 2020年3月承诺额：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <span>3000</span>
                        <span class="dw">万元</span>
                    </div>
                </div>
            </div>
            <div class="col-info">
                <div class="query-col-title"> 2020年4月承诺额：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <span>3000</span>
                        <span class="dw">万元</span>
                    </div>
                </div>
            </div>
            <div class="col-info">
                <div class="query-col-title"> 截止2020年2月底销售额：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <span>3000</span>
                        <span class="dw">万元</span>
                    </div>
                </div>
            </div>
            <div class="col-info">
                <div class="query-col-title"> 2020年3月实时销售额：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <span>3000</span>
                        <span class="dw">万元</span>
                    </div>
                </div>
            </div>
        </div>
        <h3>借款情况</h3>
        <div class="wrapper">
            <div class="col-info">
                <div class="query-col-title"> 在款余额：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <span>3000</span>
                        <span class="dw">万元</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="col-info">
                <div class="query-col-title"> 待还款明细：</div>
                <div class="query-col-input">
                    <div class="w250">
                        <el-button type="primary" size="small">{{BaseInfoBtnTip}}</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { BaseInfoBtnTip } from '../../enums/fundPlanEnum'
export default {
    name: 'baseInfo',
    data () {
        return {
            isOpen: false
        }
    },
    computed: {
        BaseInfoBtnTip () {
            return this.isOpen ? BaseInfoBtnTip.open : BaseInfoBtnTip.close
        }
    }
}
</script>

<style lang='scss' scoped>
    h3{
        padding: 20px 0;
    }
    .wrapper {
        overflow: hidden;
        max-width: 920px;
        line-height: 35px;
        padding: 0 10px;
        margin-bottom: 12px;
    }
    .col-info {
        width: 40%;
        float: left;
        display: flex;
        .query-col-title {
           margin-right: 10px;
        }
    }
    .br:after{
        content: "";
        display: block;
        line-height: 10px;
        width: 100%;
    }
</style>
