<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">活动名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.spikeName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col-input">
                        <el-select v-model="queryParams.spikeTimeType">
                            <el-option label="活动开始时间" :value=1></el-option>
                            <el-option label="活动结束时间" :value=2></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.beginTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入开始时间" :picker-options="pickerOptionsStart"></el-date-picker>
                        <el-date-picker class="ml10" v-model="queryParams.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入结束时间" :picker-options="pickerOptionsEnd"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">活动状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status">
                            <el-option v-for="item in activityStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery()">查询</h-button>
                    <h-button @click="onReset()">重置</h-button>
                </div>
            </div>
            <div class="button-cont">
                <h-button type="create" @click="onCreateActivity">新建活动</h-button>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :isShowIndex='true'>
                <template slot="startTime" slot-scope="scope">
                    <span>{{scope.data.row.startTime | momentFormat}}~{{scope.data.row.endTime | momentFormat}}</span>
                </template>
                <template slot="status" slot-scope="scope">
                    {{arrayToMap(activityStatusOptions).get(scope.data.row.status)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onEditActivity(scope.data.row)" v-if="scope.data.row.status != 5 && scope.data.row.status != 4">编辑</h-button>
                    <h-button table @click="onCopyActivity(scope.data.row)">复制</h-button>
                    <h-button table @click="onOperate(scope.data.row,2)" v-if="(scope.data.row.status == 1) && scope.data.row.status != 4 && scope.data.row.status != 5">发布</h-button>
                    <h-button table @click="onOperate(scope.data.row,3)" v-if="(scope.data.row.status == 3 || scope.data.row.status == 2) && scope.data.row.status != 4">终止</h-button>
                    <el-tooltip placement="bottom-start">
                        <div slot="content" v-if="scope.data.row.pvdata">截止到{{scope.data.row.pvdata.expiryDate}}<br>累计PV：{{scope.data.row.pvdata.pv}}<br />累计UV：{{scope.data.row.pvdata.uv}}<br /> 累计订单数：{{scope.data.row.pvdata.orderCommits}}<br />累计支付金额：{{scope.data.row.pvdata.totalMoney}}</div>
                        <h-button table @click="onCheckStatistics(scope.data.row)" v-if="scope.data.row.status != 1">数据统计</h-button>
                    </el-tooltip>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { ACTIVITY_STATUS } from '../const'
import { clearCache, newCache } from '@/utils/index'
export default {
    name: 'seckillManage',
    data () {
        return {
            queryParams: {
                spikeName: '',
                spikeTimeType: 1,
                beginTime: '',
                endTime: '',
                status: '',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            tableLabel: [
                { label: '活动名称', prop: 'spikeName' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '活动时间', prop: 'startTime' },
                { label: '活动状态', prop: 'status' }
            ],
            tableData: [],
            pagination: {},
            activityStatusOptions: ACTIVITY_STATUS,
            PVdata: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            seckillData: state => state.hmall.marketManage.seckillData,
            listTrack: state => state.hmall.marketManage.listTrack
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    methods: {
        init () {
            this.resetParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getSeckillList()
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.getSeckillList()
        },
        onCreateActivity () {
            this.$router.push({ path: '/b2b/market/createSeckill' })
        },
        onEditActivity ({ id, status }) {
            this.$router.push({ path: '/b2b/market/createSeckill', query: { id: id, status: status } })
        },
        onCopyActivity ({ id }) {
            this.$router.push({ path: '/b2b/market/createSeckill', query: { id: id, type: 'copy' } })
        },
        onOperate (row, status) {
            this.$confirm(status == 2 ? '是否发布该活动' : '是否终止该活动', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.updateSeckillList({ id: row.id, status: status, updateBy: this.userInfo.employeeName })
                this.$message({
                    message: status == 2 ? '发布成功' : '终止成功',
                    type: 'success'
                })
                this.getSeckillList()
            }).catch(() => {

            })
        },
        onCheckStatistics (val) {
            this.$router.push({ path: '/b2b/market/eventStatistics', query: { activityId: val.id } })
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.getSeckillList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getSeckillList()
        },
        ...mapActions({
            findSeckillList: 'marketManage/findSeckillList',
            updateSeckillList: 'marketManage/updateSeckillList',
            hoverTrack: 'marketManage/hoverTrack'
        }),
        async getSeckillList () {
            await this.findSeckillList(this.queryParams)
            let tableData = this.seckillData.records
            tableData.map(async (item, index) => {
                await this.hoverTrack({ activityId: item.id, activityName: item.spikeName })
                item.pvdata = this.listTrack
                this.$set(item, index, this.listTrack)
                return item
            })
            this.tableData = tableData
            this.pagination = {
                pageNumber: this.seckillData.current,
                pageSize: this.seckillData.size,
                total: this.seckillData.total
            }
        }
    },
    mounted () {
        this.init()
    },
    beforeRouteEnter (to, from, next) {
        newCache('seckillManage')
        next(vm => {
            if (from.path === '/b2b/market/createSeckill') {
                vm.getSeckillList()
            }
        })
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'createSeckill' && to.name != 'eventStatistics') {
            clearCache('seckillManage')
        }
        next()
    }
    /* activated () {
        this.onFindeSpike()
    },
    beforeRouteEnter (to, from, next) {
        newCache('eventmanage')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'createEditEvent' || to.name != 'eventstatics') {
            clearCache('eventmanage')
        }
        next()
    }, */
}
</script>
