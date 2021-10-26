<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">账号/姓名：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.username" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">推荐官来源：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.source" placeholder="请选择" :clearable=true>
                            <el-option label="全部" value=""></el-option>
                            <el-option label="小程序自主" value="2"></el-option>
                            <el-option label="客户经理分享" value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">激活时间：</div>
                    <div class="query-col__input">
                        <!-- <el-date-picker v-model="queryParams.startTime" type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                                        :picker-options="pickerOptionsStart('endTime')">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd('startTime')">
                        </el-date-picker> -->
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">
                <span class="sub-eltag">已筛选 {{paginationInfo.total}} 项</span>
                累计注册：{{fundMoneys(recommenderTotal.registeredNumber)}}；
                累计认证：{{fundMoneys(recommenderTotal.certifiedNumber)}}；
                累计评级：{{fundMoneys(recommenderTotal.ratedNumber)}}；
                累计失效：{{fundMoneys(recommenderTotal.invalidNumber)}}；
                累计获得奖励：{{fundMoneys(recommenderTotal.rewardAmount)}}元；
            </el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" :showCheckAll="false" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120
                :isShowIndex='true'>
                <template slot="source" slot-scope="scope">
                    <span v-if="+ scope.data.row.source === 1">客户经理分享</span>
                    <span v-if="+ scope.data.row.source === 2">小程序自主</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="openDetail(scope.data.row.userId)">
                        邀请详情
                    </h-button>
                </template>
            </basicTable>
            <RecommendDetail ref="detail"></RecommendDetail>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RecommendDetail from './components/recommendDetail'
import filters from '@/utils/filters'
import { newCache } from '@/utils/index'
export default {
    name: 'recommender',
    components: {
        RecommendDetail
    },
    data () {
        return {
            queryParams: {
                username: '',
                source: '',
                startTime: '',
                endTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '推荐官账号', prop: 'username', width: '120' },
                { label: '推荐官姓名', prop: 'name', width: '120' },
                { label: '推荐官来源', prop: 'source', width: '120' },
                { label: '客户经理', prop: 'customerName', width: '150' },
                { label: '已注册', prop: 'registeredNumber', width: '150' },
                { label: '已认证', prop: 'certifiedNumber', width: '120' },
                { label: '已评级', prop: 'ratedNumber', width: '120' },
                { label: '已失效', prop: 'invalidNumber', width: '120' },
                { label: '已获得奖励', prop: 'rewardAmount', width: '150' },
                { label: '激活时间', prop: 'createTime', width: '150', formatters: 'dateTimes', sortable: 'custom' }
            ],
            userId: ''
        }
    },
    computed: {
        ...mapState({
            recommenderList: state => state.crmRecommeder.recommenderList,
            recommenderTotal: state => state.crmRecommeder.recommenderTotal
        }),
        options () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm',
                format: 'yyyy-MM-dd HH:mm',
                startTime: this.queryParams.startTime,
                endTime: this.queryParams.endTime
            }
        }
    },
    methods: {
        ...mapActions({
            getRecommenderList: 'crmRecommeder/getRecommenderList',
            getRecommenderTotal: 'crmRecommeder/getRecommenderTotal'
        }),
        onStartChange (val) {
            this.queryParams.startTime = val
        },
        onEndChange (val) {
            this.queryParams.endTime = val
        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
            this.onQuery()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        async onQuery () {
            Promise.all(
                [
                    this.getRecommenderList(this.queryParams),
                    this.getRecommenderTotal(this.queryParams)
                ]
            ).then(() => {
                this.tableData = this.recommenderList.records || []
                this.paginationInfo = {
                    pageNumber: this.recommenderList.current,
                    pageSize: this.recommenderList.size,
                    total: this.recommenderList.total
                }
            })
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams['sort.direction'] = val.order === 'descending' ? 'DESC' : 'ASC'
                this.queryParams['sort.property'] = val.prop
                this.onQuery()
            } else {
                delete this.queryParams['sort.direction']
                delete this.queryParams['sort.property']
                this.onQuery()
            }
        },
        openDetail (userId) {
            this.$refs.detail.handleOpen()
            this.$refs.detail.getRecommenderInfo(userId)
            this.$refs.detail.getStatisticsUserList(userId)
        },
        fundMoneys (val) {
            if (val) {
                return filters.moneyFormat(val, 2, false)
            }
            return 0
        }
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        this.onQuery()
    },
    beforeUpdate () {
        newCache('recommender')
    }
}
</script>

<style scoped>
.eltagtop {
    margin-bottom: 10px;
}
.sub-eltag {
    margin-right: 30px;
}
</style>
