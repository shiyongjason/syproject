<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">时间筛选：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入开始时间" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入结束时间" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onExportTable()">
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
                    <div v-for="(item,index) in productPVRankings" :key="index" class="text item">
                        <span>{{index+1}}.{{item.productName}}</span>
                        <span>{{item.pv}}</span>
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
                   <div v-for="(item,index) in productPayedRankings" :key="index" class="text item">
                        <span>{{index+1}}.{{item.productName}}</span>
                        <span>{{item.payed}}</span>
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
                   <div v-for="(item,index) in productTotalMoneyRankings" :key="index" class="text item">
                        <span>{{index+1}}.{{item.productName}}</span>
                        <span>{{item.totalMoney}}</span>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { interfaceUrl } from '@/api/config'
export default {
    name: 'eventstatics',
    data () {
        return {
            queryParams: {
                startTime: '',
                endTime: ''
            },
            tableData: [],
            tableLabel: [
                { label: '时间', prop: 'date' },
                { label: '访问PV（按日）', prop: 'pv' },
                { label: '访问UV（按日）', prop: 'uv' },
                { label: '提交订单点击数', prop: 'spuCode' },
                { label: '支付点击数', prop: 'orderCommits' },
                { label: '成交订单数', prop: 'payed' },
                { label: '成交订单总额', prop: 'totalMoney' },
                { label: '转化率', prop: 'inversionRate' }
            ],
            productPVRankings: [],
            productPayedRankings: [],
            productTotalMoneyRankings: []
        }
    },
    computed: {
        ...mapState({
            eventTrackData: state => state.eventManage.eventTrackData
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    mounted () {
        this.findTracks()
    },
    methods: {
        ...mapActions({
            findEventTrack: 'findEventTrack'
        }),
        async findTracks () {
            await this.findEventTrack(this.queryParams)
            this.tableData = this.eventTrackData.recentActivityInfo
            this.productPVRankings = this.eventTrackData.productPVRankings
            this.productPayedRankings = this.eventTrackData.productPayedRankings
            this.productTotalMoneyRankings = this.eventTrackData.productTotalMoneyRankings
        },
        searchList () {
            this.findTracks()
        },
        onExportTable () {
            var url = ''
            for (var key in this.queryParams) {
                url += (key + '=' + this.queryParams[key] + '&')
            }
            location.href = interfaceUrl + 'ets/api/b2b/activity/export?' + url
        }

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
            word-break:break-all;
            &:first-child {
                flex: 3;
                margin-right:10px;
            }
            &:last-child {
                text-align:right;
                flex: 1;
            }
        }
    }
}
</style>