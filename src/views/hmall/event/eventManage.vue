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
                        <el-date-picker v-model="queryParams.beginTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入开始时间" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入结束时间" :picker-options="pickerOptionsEnd">
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
        </div>
        <div class="page-body-cont">
             <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onAddevent">
                        新建活动
                    </el-button>
                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true'>
                <template slot="eventTime" slot-scope="scope">
                    {{scope.data.row.startTime|formatterTime}}~ {{scope.data.row.endTime|formatterTime}}
                </template>
                <template slot="status" slot-scope="scope">
                    {{IsEventName(scope.data.row.status)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="onEditEvent(scope.data.row)" v-if="scope.data.row.status!=5&&scope.data.row.status!=4">编辑</el-button>
                    <el-button type="primary" size="mini" plain @click="onCopy(scope.data.row.id)"  v-if="scope.data.row.status!=5&&scope.data.row.status!=4">复制</el-button>
                    <el-button type="warning" size="mini" plain @click="onOperate(scope.data.row,2)" v-if="(scope.data.row.status==1)&&scope.data.row.status!=4&&scope.data.row.status!=5">发布</el-button>
                    <el-button type="danger" size="mini" plain @click="onOperate(scope.data.row,3)" v-if="(scope.data.row.status==3||scope.data.row.status==2)&&scope.data.row.status!=4">终止</el-button>
                    <el-tooltip placement="bottom-start" effect="dark">
                        <div slot="content" v-if="scope.data.row.pvdata">累计PV：{{scope.data.row.pvdata.pv}}<br />累计UV：{{scope.data.row.pvdata.uv}}<br /> 累计订单数：{{scope.data.row.pvdata.orderCommits}}<br />累计支付数：{{scope.data.row.pvdata.payClicks}}</div>
                        <el-button type="info" size="mini" v-if="scope.data.row.status!=1" plain @click="onClickStatics(scope.data.row)">数据统计</el-button>
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
import { updateSpikeStatus } from './api/index'
import { clearCache, newCache } from '@/utils/index'
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
            eventName: ['待发布', '预热中', '进行中', '已结束', '已取消'],
            PVdata: {}
        }
    },
    computed: {
        ...mapState({
            spikeData: state => state.eventManage.spikeData,
            userInfo: state => state.userInfo,
            listTrack: state => state.eventManage.listTrack
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
                    let beginDateVal = this.queryParams.beginTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    mounted () {
        this.onFindeSpike()
        this.copyParams = { ...this.queryParams }
    },
    activated () {
        this.onFindeSpike()
    },
    beforeRouteEnter (to, from, next) {
        newCache('eventmanage')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'createEditEvent') {
            clearCache('eventmanage')
        }
        next()
    },
    methods: {
        ...mapActions({
            findSpike: 'findSpike',
            hoverTrack: 'hoverTrack'
        }),
        onCopy (id) {
            this.$router.push({ path: '/hmall/createEditEvent', query: { copeId: id } })
        },
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
            this.onFindeSpike()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onFindeSpike()
        },
        async onFindeSpike () {
            await this.findSpike(this.queryParams)
            let spikelist = this.spikeData.records
            // TODO 影响性能吗
            spikelist && spikelist.map(async (item, index) => {
                await this.hoverTrack({ activityId: item.id, activityName: item.spikeName })
                item.pvdata = this.listTrack
                this.$set(item, index, this.listTrack)
            })
            this.tableData = spikelist
            this.paginationInfo = {
                total: this.spikeData.total,
                pageNumber: this.spikeData.current,
                pageSize: this.spikeData.size
            }
        },
        IsEventName (val) {
            return this.eventName[val - 1]
        },
        onOperate (item, val) {
            this.$confirm(val == 2 ? '是发布该活动' : '是终止该活动', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await updateSpikeStatus({ id: item.id, status: val, updateBy: this.userInfo.employeeName })
                this.$message({
                    message: val == 2 ? '发布成功' : '终止成功',
                    type: 'success'
                })
                this.onFindeSpike()
            }).catch(() => {

            })
        },
        async onShow (val) {

        },
        onClickStatics (val) {
            this.$router.push({ path: '/hmall/eventStatistics', query: { activityId: val.id } })
        },
        onAddevent () {
            this.$router.push({ path: '/hmall/createEditEvent', query: {} })
        },
        onEditEvent (val) {
            if (val.status === 2) this.$router.push({ path: '/hmall/createEditEvent', query: { eventId: val.id, action: 'preheat' } })
            else this.$router.push({ path: '/hmall/createEditEvent', query: { eventId: val.id } })
        }
    }
}
</script>