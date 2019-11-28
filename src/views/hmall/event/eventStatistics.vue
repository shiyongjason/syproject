<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">活动名称：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.orderTimeStart" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.orderTimeEnd" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            导出详情
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :isMultiple="false" :isAction="false" :actionMinWidth=250 :isShowIndex='true'>
            </basicTable>
        </div>
        <div class="page-body-cont page-static">
            <div class="static-box">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>浏览TOP榜单</span>
                    </div>
                    <div class="item">
                        <span>商品名称</span>
                        <span>累计PV</span>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        <span>1.格力中央空调</span>
                        <span>1212</span>
                    </div>
                </el-card>
            </div>
            <div class="static-box">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>成交TOP榜单（按订单数</span>
                    </div>
                    <div class="item">
                        <span>商品名称</span>
                        <span>累计成交订单数量</span>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        <span>1.格力中央空调</span>
                        <span>1212</span>
                    </div>
                </el-card>
            </div>
            <div class="static-box">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>成交TOP榜单（按订单金额）</span>
                    </div>
                    <div class="item">
                        <span>商品名称</span>
                        <span>累计成交订单金额</span>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        <span>1.格力中央空调</span>
                        <span>1212</span>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'eventstatics',
    data () {
        return {
            queryParams: {},
            tableData: [],
            tableLabel: [
                { label: '时间', prop: 'spuCode' },
                { label: '访问PV（按日）', prop: 'spuCode' },
                { label: '访问UV（按日）', prop: 'spuCode' },
                { label: '提交订单点击数', prop: 'spuCode' },
                { label: '提交订单点击数', prop: 'spuCode' },
                { label: '支付点击数', prop: 'spuCode' },
                { label: '成交订单数', prop: 'spuCode' },
                { label: '成交订单总额', prop: 'spuCode' },
                { label: '转化率', prop: 'spuCode' }
            ]
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    mounted () {
        this.tableData = [{ spuCode: 2 }]
    },
    methods: {

    }

}
</script>
<style lang="scss" scoped>
.page-static {
    display: flex;
    justify-content: space-around;
    .static-box {
        flex: 1;
        margin: 0 10px 0 0;
    }
}
.box-card {
    .item {
        display: flex;
        margin-bottom: 18px;
        span {
            &:first-child {
                flex: 2;
            }
        }
    }
}
</style>