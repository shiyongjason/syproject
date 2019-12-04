<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">活动名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spikeName" placeholder="请输入活动名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-select v-model="queryParams.spikeTimeType">
                            <el-option label="活动开始时间" :value=1>
                            </el-option>
                            <el-option label="活动结束时间" :value=2>
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.beginTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">活动状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.status">
                            <el-option v-for="item in eventsState" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onAddevent">
                        新建活动
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true'>
                <template slot="eventTime" slot-scope="scope">
                    {{scope.data.row.startTime|formatterTime}}~ {{scope.data.row.endTime|formatterTime}}
                </template>
                <template slot="status" slot-scope="scope">
 {{IsEventName(scope.data.row.status)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="onEditEvent(scope.data.row.id)">编辑</el-button>
                    <el-button type="primary" size="mini" plain>复制</el-button>
                    <el-button type="warning" size="mini" plain>发布</el-button>
                    <el-button type="danger" size="mini" plain>终止</el-button>
                    <el-tooltip class="item" effect="dark" placement="bottom-start">
                        <div slot="content">累计PV：1315<br />累计UV：1011<br /> 累计订单数：11<br />累计支付数：1,025</div>
                        <el-button type="info" size="mini" plain @click="onClickStatics(scope.data)">数据统计</el-button>
                    </el-tooltip>
                </template>
            </basicTable>
        </div>
        <!-- <shopManagerTable ref="shopManagerTable" :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateBrand="updateBrandChange" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></shopManagerTable> -->
    </div>
</template>
<script>
import { EVENT_LIST } from '../store/const'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'eventmanage',
    data () {
        return {
            queryParams: {
                beginTime: '',
                endTime: '',
                pageNumber: 1,
                pageSize: 10,
                spikeName: '',
                spikeTimeType: 1,
                status: ''
            },
            copuParams: {},
            tableData: [],
            tableLabel: [
                { label: '活动名称', prop: 'spikeName' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '活动时间', prop: 'eventTime', width: 400 },
                { label: '活动状态', prop: 'status' }
            ],
            paginationInfo: {},
            eventsState: EVENT_LIST,
            eventName: ['待发布', '预热中', '进行中', '已结束', '已取消']
        }
    },
    computed: {
        ...mapState({
            spikeData: state => state.eventManage.spikeData
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal)
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.beginTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal)
                    }
                }
            }
        }
    },
    mounted () {
        this.onFindeSpike()
        this.copyParams = { ...this.queryParams }
    },
    methods: {
        ...mapActions({
            findSpike: 'findSpike'
        }),
        searchList () {
            this.queryParams.pageNumber = 1
            this.onFindeSpike()
        },
        onRest () {
            this.queryParams = { ...this.copyParams }
            this.searchList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        async onFindeSpike () {
            await this.findSpike(this.queryParams)
            this.tableData = this.spikeData.records
            this.paginationInfo = {
                total: this.spikeData.total,
                pageNumber: this.spikeData.current,
                pageSize: this.spikeData.size
            }
        },
        IsEventName (val) {
            return this.eventName[val]
        },
        onClickStatics () {
            this.$router.push({ path: '/hmall/eventStatistics', query: {} })
        },
        onAddevent () {
            this.$router.push({ path: '/hmall/createEditEvent', query: {} })
        },
        onEditEvent (id) {
            this.$router.push({ path: '/hmall/createEditEvent', query: { eventId: id } })
        }
    }
}
</script>