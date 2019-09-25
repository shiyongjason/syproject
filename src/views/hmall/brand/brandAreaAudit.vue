<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">商家名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入商家名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">品牌名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.brandName" placeholder="请输入品牌名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">开启时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.maxCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">审核状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.auditStatus" style="width: 100%">
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
                        <el-button v-if="scope.data.row.auditStatus == 0" class="orangeBtn" @click="showDialog(scope.data.row, 'review')">审核</el-button>
                        <el-button v-else class="orangeBtn" @click="showDialog(scope.data.row, 'watch')">查看</el-button>
                    </template>
                </basicTable>
            </div>
            <el-dialog :title="dialogParams.title" :visible.sync="dialogParams.show" width="650px" center :close-on-click-modal="false">
                <el-form class="base" :inline="true">
                    <div>
                        <el-form-item label="品牌名称：">
                            {{dialogMsg.brandName}}
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="代理区域：">
                            <div v-for="(item, index) in dialogMsg.brandAreaPoList" :key="index">
                                {{item.areaName}}
                            </div>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="代理证书：">
                            123
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="审核状态：">
                            {{dialogMsg.auditStatus == 0?'待审核':dialogMsg.auditStatus == 1?'审核通过':dialogMsg.auditStatus == 2?'审核不通过':'-'}}
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="审核备注：">
                            {{dialogMsg.remark}}
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
import { findBrandAreaList, addBrandArea, findBrandArea } from './api/index'
export default {
    name: 'brandAreaAudit',
    data () {
        return {
            tableLabel: [
                { label: '商家名称', prop: 'merchantName' },
                { label: '品牌名称', prop: 'brandName' },
                { label: '审核状态', prop: 'auditStatusTransform' },
                { label: '申请日期', prop: 'createTime' }
            ],
            tableData: [],
            searchParams: {},
            queryParams: {
                merchantName: '',
                brandName: '',
                auditStatus: '',
                reservationStatus: '',
                minCreateTime: '',
                maxCreateTime: ''
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
            dialogMsg: {},
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
                    let beginDateVal = this.queryParams.maxCreateTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.minCreateTime)
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
            this.$set(this.queryParams, 'merchantName', '')
            this.$set(this.queryParams, 'brandName', '')
            this.$set(this.queryParams, 'auditStatus', '')
            this.$set(this.queryParams, 'reservationStatus', '')
            this.$set(this.queryParams, 'minCreateTime', '')
            this.$set(this.queryParams, 'maxCreateTime', '')
            this.$set(this.paginationData, 'pageNumber', 1)
            this.$set(this.paginationData, 'pageSize', 10)
            this.onQuery()
        },
        async search () {
            const searchParams = {
                ...this.searchParams,
                ...this.paginationData
            }
            console.log(searchParams)
            if (!searchParams.minCreateTime) searchParams.minCreateTime = null
            if (!searchParams.maxCreateTime) searchParams.maxCreateTime = null
            const { data } = await findBrandAreaList({ params: searchParams })
            console.log(data)
            this.paginationData.pageNumber = data.pages
            this.paginationData.pageSize = data.size
            this.paginationData.total = data.total
            data.records.map((v) => {
                if (v.auditStatus == 0) v.auditStatusTransform = '待审核'
                if (v.auditStatus == 1) v.auditStatusTransform = '审核通过'
                if (v.auditStatus == 2) v.auditStatusTransform = '审核不通过'
            })
            this.tableData = data.records
        },
        async showDialog (scope, type) {
            // console.log(scope)
            const { data } = await findBrandArea({ id: scope.id })
            console.log(data)
            this.dialogMsg = data
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