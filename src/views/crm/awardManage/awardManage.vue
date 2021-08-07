<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">推荐人姓名/账号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.recommenderName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">发放状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.sendStatus" placeholder="请选择" :clearable=true>
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待发放" :value="1"></el-option>
                            <el-option label="已发放" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">信用评审通过时间：</div>
                    <div class="query-col__input">
                        <!-- <el-date-picker v-model="queryParams.creditApprovedTimeStart" type="datetime" value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart('creditApprovedTimeEnd')">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.creditApprovedTimeEnd" type="datetime" value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd('creditApprovedTimeStart')">
                        </el-date-picker> -->
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">认证时间：</div>
                    <div class="query-col__input">
                        <!-- <el-date-picker v-model="queryParams.authenticationTimeStart" type="datetime" value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart('authenticationTimeEnd')">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationTimeEnd" type="datetime" value-format="yyyy-MM-ddTHH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd('authenticationTimeStart')">
                        </el-date-picker> -->
                        <HDatePicker :start-change="onStartAuth" :end-change="onEndAuth" :options="authOptions">
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
                待发放：{{rcommenderRewardTotal.payingNum || '0'}}个；已发放：{{rcommenderRewardTotal.paidNum || '0'}}个；
            </el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120 :isShowIndex='true'>
                <template slot="sendStatus" slot-scope="scope">
                    <span v-if="scope.data.row.sendStatus === 1">待发放</span>
                    <span v-if="scope.data.row.sendStatus === 2">已发放</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="doPlay(scope.data.row)" v-if="scope.data.row.sendStatus === 1 && hosAuthCheck(CRM_AWARD_SEND)">发放</h-button>
                    <h-button table @click="doPlay(scope.data.row)" disabled v-else-if="scope.data.row.sendStatus === 2 && hosAuthCheck(CRM_AWARD_SEND)">已发放</h-button>
                    <!--                    <span v-else-if="scope.data.row.sendStatus === 2" class="disabled">已发放</span>-->
                    <span v-else>-</span>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { updateRecommenderPaid } from '@/views/crm/awardManage/api'
import { CRM_AWARD_SEND } from '@/utils/auth_const'

export default {
    name: 'awardManage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                recommenderName: '',
                sendStatus: '',
                creditApprovedTimeStart: '',
                creditApprovedTimeEnd: '',
                authenticationTimeStart: '',
                authenticationTimeEnd: ''
            },
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '200' },
                { label: '信用评级', prop: 'creditLevel', width: '100' },
                { label: '推荐人账号', prop: 'recommenderUserMobile', width: '120' },
                { label: '推荐人', prop: 'recommenderUserName', width: '150' },
                { label: '应奖励金额', prop: 'rewardAmount', width: '150' },
                { label: '发放状态', prop: 'sendStatus', width: '100' },
                { label: '信用评审通过时间', prop: 'creditApprovedTime', width: '200', sortable: 'creditApprovedTime', formatters: 'dateTimes' },
                { label: '认证时间', prop: 'authenticationTime', width: '150', sortable: 'authenticationTime', formatters: 'dateTimes' }
            ],
            CRM_AWARD_SEND: CRM_AWARD_SEND
        }
    },
    computed: {
        ...mapState({
            rcommenderRewardList: state => state.crmAwardManage.rcommenderRewardList,
            rcommenderRewardTotal: state => state.crmAwardManage.rcommenderRewardTotal
        }),
        options () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm',
                format: 'yyyy-MM-dd HH:mm',
                startTime: this.queryParams.creditApprovedTimeStart,
                endTime: this.queryParams.creditApprovedTimeEnd
            }
        },
        authOptions () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm',
                format: 'yyyy-MM-dd HH:mm',
                startTime: this.queryParams.authenticationTimeStart,
                endTime: this.queryParams.authenticationTimeEnd
            }
        }
    },
    methods: {
        ...mapActions({
            getRecommenderRewardList: 'crmAwardManage/getRecommenderRewardList',
            getRecommenderRewardTotal: 'crmAwardManage/getRecommenderRewardTotal'
        }),
        onStartChange (val) {
            this.queryParams.creditApprovedTimeStart = val
        },
        onEndChange (val) {
            this.queryParams.creditApprovedTimeEnd = val
        },
        onStartAuth (val) {
            this.queryParams.authenticationTimeStart = val
        },
        onEndAuth (val) {
            this.queryParams.authenticationTimeEnd = val
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
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
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
            this.onQuery()
        },
        doPlay (row) {
            this.$confirm(`确认给推荐官发放这笔奖励？`, '确认发放', {
                confirmButtonText: '确认发放',
                cancelButtonText: '取消'
            }).then(async () => {
                const params = {
                    companyId: row.companyId,
                    creditLevel: row.creditLevel,
                    recommendUserId: row.recommenderUserId,
                    sendStatus: 2
                }
                await updateRecommenderPaid(params)
                this.onQuery()
            })
        },
        async onQuery () {
            Promise.all(
                [
                    this.getRecommenderRewardList(this.queryParams),
                    this.getRecommenderRewardTotal(this.queryParams)
                ]
            ).then(() => {
                this.tableData = this.rcommenderRewardList.records || []
                this.paginationInfo = {
                    pageNumber: this.rcommenderRewardList.current,
                    pageSize: this.rcommenderRewardList.size,
                    total: this.rcommenderRewardList.total
                }
            })
        }
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
        this.onQuery()
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
