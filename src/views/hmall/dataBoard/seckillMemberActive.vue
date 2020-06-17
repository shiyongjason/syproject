<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">所属商家：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入所属商家">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">会员店：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.memberName" placeholder="请输入会员店">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">会员店账号：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.memberAccount" placeholder="请输入会员店账号">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">进入时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.entryStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.entryEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">离开时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.leaveStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStartLeave">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.leaveEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEndLeave" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">SKU编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.skuCode" placeholder="请输入SKU编码">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">商品名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.skuName" placeholder="请输入商品名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="onQuery">搜索</el-button>
                <el-button type="primary" @click="onReset">重置</el-button>
                <el-button type="primary" @click="onExport">导出</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                <template slot="client">
                    <span>APP</span>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { interfaceUrl } from '@/api/config'
export default {
    name: 'seckillMemberActive',
    data () {
        return {
            queryParams: {
                merchantName: '',
                memberName: '',
                memberAccount: '',
                entryStartTime: '',
                entryEndTime: '',
                leaveStartTime: '',
                leaveEndTime: '',
                skuCode: '',
                skuName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '会员店', prop: 'memberName' },
                { label: '会员店账号', prop: 'memberAccount' },
                { label: '所属商家', prop: 'merchantName' },
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '商品名称', prop: 'skuName' },
                { label: '进入时间', prop: 'entryTime', formatters: 'dateTimes' },
                { label: '离开时间', prop: 'leaveTime', formatters: 'dateTimes' },
                { label: '停留时长', prop: 'timeInterval' },
                { label: '客户端', prop: 'client' }
            ],
            tableData: [],
            paginationData: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapState('dataBoard', {
            seckillMemberInfo: 'seckillMemberInfo'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.entryEndTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.entryStartTime)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        pickerOptionsStartLeave () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.leaveEndTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEndLeave () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.leaveStartTime)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
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
            this.getSeckillMemberData()
        },
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.getSeckillMemberData()
        },
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无数据可导出！')
            } else {
                window.location = interfaceUrl + 'ets/api/b2b/bi/member/sku/page/export? merchantName = ' + this.queryParams.merchantName +
                    '&memberName=' + this.queryParams.memberName +
                    '&memberAccount=' + this.queryParams.memberAccount +
                    '&entryStartTime=' + this.queryParams.entryStartTime +
                    '&entryEndTime=' + this.queryParams.entryEndTime +
                    '&leaveStartTime=' + this.queryParams.leaveStartTime +
                    '&leaveEndTime=' + this.queryParams.leaveEndTime +
                    '&skuCode=' + this.queryParams.skuCode +
                    '&skuName=' + this.queryParams.skuName +
                    '&access_token=' + sessionStorage.getItem('token')
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.getSeckillMemberData()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getSeckillMemberData()
        },
        ...mapActions('dataBoard', [
            'findSeckillMemberData'
        ]),
        async getSeckillMemberData () {
            await this.findSeckillMemberData(this.queryParams)
            this.tableData = this.seckillMemberInfo.records
            this.paginationData = {
                pageNumber: this.seckillMemberInfo.current,
                pageSize: this.seckillMemberInfo.size,
                total: this.seckillMemberInfo.total
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
</style>
