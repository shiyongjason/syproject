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
            <div class="page-body-cont">
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" :isPagination='true' :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                    <template slot="action" slot-scope="scope">
                        <el-button class="orangeBtn" @click="showDialog(scope.data.row, 'review')">审核</el-button>
                        <el-button class="orangeBtn" @click="showDialog(scope.data.row, 'watch')">查看</el-button>
                    </template>
                </basicTable>
            </div>
            <el-dialog :title="dialogParams.title" :visible.sync="dialogParams.show" width="650px" center :close-on-click-modal="false">
                <el-form class="base" :inline="true">
                    <div>
                        <h2 class="sub-title">基本信息</h2>
                        <el-form-item label="优惠券编号：">
                            123
                        </el-form-item>
                    </div>
                </el-form>
                <el-form ref="form" :rules="rules" :model="suggest" class="suggest">
                    <div v-if="dialogParams.type === 'review'">
                        <h2>审核意见</h2>
                        <div>
                            <el-form-item label="审核结果" prop="auditResult">
                                <el-radio v-model="suggest.auditResult" label="1">审核通过</el-radio>
                                <el-radio v-model="suggest.auditResult" label="2">审核不通过</el-radio>
                            </el-form-item>
                        </div>
                        <div class="remark">
                            <el-form-item label="备注原因">
                                <el-input type="textarea" v-model="suggest.auditRemark" rows="3" maxlength="50"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="suggest-btn">
                        <el-form-item v-if="dialogParams.type === 'review'">
                            <el-button name="hosjoy-color" @click="createCouponReview">确认</el-button>
                            <el-button name="white-color" @click="dialogParams.show = false">取消</el-button>
                        </el-form-item>
                        <el-form-item v-if="dialogParams.type === 'watch'">
                            <el-button name="white-color" @click="dialogParams.show = false">关闭</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-dialog>
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
            },
            dialogParams: {
                show: false,
                title: '',
                type: ''
            },
            suggest: {},
            rules: {
                auditResult: [
                    { required: true, message: '审核结果不能为空！' }
                ]
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
            this.$set(this.queryParams, 'startDate', '')
            this.$set(this.queryParams, 'endDate', '')
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
        showDialog (scope, type) {
            console.log(scope)
            this.suggest = {}
            if (type === 'review') {
                this.dialogParams.title = '品牌区域审核'
                this.dialogParams.type = type
            } else if (type === 'watch') {
                this.dialogParams.title = '查看品牌区域'
                this.dialogParams.type = type
            }

            this.dialogParams.show = true
        },
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            const { ...page } = val
            this.paginationData = page
            this.search()
        },
        createCouponReview () {
            console.log('确认')
        }
    },
    mounted () {
        this.onQuery()
    }
}
</script>

<style scoped>
</style>