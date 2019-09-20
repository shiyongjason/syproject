<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">商家名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.name" placeholder="请输入商家名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">品牌名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.reservationPerson" placeholder="请输入品牌名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">开启时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">审核状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.source" style="width: 100%">
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">重置</el-button>
                    </div>
                </div>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" :isPagination='true' :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn">审核</el-button>
                    <el-button class="orangeBtn" @click="console.log(scope)">查看</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
export default {
    name: 'brandAreaAudit',
    data () {
        return {
            tableLabel: [
                { label: '商家名称', prop: 'originatorName' },
                { label: '品牌名称', prop: 'institution' },
                { label: '审核状态', prop: 'originTime' },
                { label: '申请日期', prop: 'allSubmitTime' }
            ],
            tableData: [
                {
                    originatorName: '五塘广场家电公司',
                    institution: 'a',
                    originTime: '新申请',
                    allSubmitTime: '20190702 18:00'
                }, {
                    originatorName: '测试申请一个商户入驻',
                    institution: 'b',
                    originTime: '审核通过',
                    allSubmitTime: '20190702 18:00'
                }
            ],
            searchParams: {},
            queryParams: {
                name: '',
                reservationPerson: '',
                source: '',
                reservationStatus: '',
                startDate: '',
                endDate: ''
            },
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                total: 100
            }
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endDate
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.startTime)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        onQuery () {
            console.log('搜索')
            const { ...params } = { ...this.queryParams }
            this.searchParams = params
            this.search()
        },
        onReset () {
            console.log('重置')
            this.$set(this.queryParams, 'name', '')
            this.$set(this.queryParams, 'reservationPerson', '')
            this.$set(this.queryParams, 'source', '')
            this.$set(this.queryParams, 'reservationStatus', '')
            this.$set(this.paginationData, 'pageNumber', 1)
            this.$set(this.paginationData, 'pageSize', 10)
            this.onQuery()
        },
        search () {
            const searchParams = {
                ...this.searchParams,
                ...this.paginationData
            }
            console.log(searchParams)
        },
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            const { ...page } = val
            this.paginationData = page
            this.search()
        }
    },
    mounted () {
        this.onQuery()
    }
}
</script>

<style scoped>
</style>