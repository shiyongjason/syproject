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
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待审核" value="0"></el-option>
                            <el-option label="审核通过" value="1"></el-option>
                            <el-option label="审核不通过" value="2"></el-option>
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
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                    <template slot="action" slot-scope="scope">
                        <el-button v-if="scope.data.row.auditStatus == 0 || scope.data.row.auditStatus == 3" class="orangeBtn" @click="showDialog(scope.data.row, 'review')">审核</el-button>
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
                                {{item.provinceName}}
                                {{item.cityName}}
                                {{item.areaName}}
                            </div>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="代理证书：">
                            <div class="proxyCert">
                                <template v-for="(item, index) in dialogMsg.certificatePoList">
                                    <a :href="item.pictureUrl" target="_blank" :key="index">
                                        <img :src="item.pictureUrl" alt="">
                                    </a>
                                </template>
                            </div>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="审核状态：">
                            <span v-if="dialogMsg.auditStatus == 0 || dialogMsg.auditStatus == 3">待审核</span>
                            <span v-if="dialogMsg.auditStatus == 1">审核通过</span>
                            <span v-if="dialogMsg.auditStatus == 2">审核不通过</span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="审核备注：">
                            {{dialogMsg.remark}}
                        </el-form-item>
                    </div>
                </el-form>
                <el-form ref="suggest" :rules="rules" :model="suggest" class="suggest">
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
import { findBrandAreaList, findBrandArea, auditBrandArea } from './api/index'
import { mapState } from 'vuex'
import { Message } from 'element-ui'
// import moment from 'moment'
export default {
    name: 'brandAreaAudit',
    data () {
        return {
            tableLabel: [
                { label: '商家名称', prop: 'merchantName' },
                { label: '品牌名称', prop: 'brandName' },
                { label: '审核状态', prop: 'auditStatusTransform' },
                { label: '申请日期', prop: 'updateTime' }
            ],
            tableData: [],
            searchParams: {},
            queryParams: {
                merchantName: '',
                brandName: '',
                auditStatus: '',
                minCreateTime: '',
                maxCreateTime: ''
            },
            paginationData: {
                pageNumber: 1,
                pageSize: 10
                // total: 100
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
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onQuery () {
            const { ...params } = { ...this.queryParams }
            this.searchParams = params
            this.search()
        },
        onReset () {
            this.$set(this.queryParams, 'merchantName', '')
            this.$set(this.queryParams, 'brandName', '')
            this.$set(this.queryParams, 'auditStatus', '')
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
            if (!searchParams.minCreateTime) searchParams.minCreateTime = null
            if (!searchParams.maxCreateTime) searchParams.maxCreateTime = null
            const { data } = await findBrandAreaList({ params: searchParams })
            data.records.map((v) => {
                if (v.auditStatus == 0 || v.auditStatus == 3) v.auditStatusTransform = '待审核'
                if (v.auditStatus == 1) v.auditStatusTransform = '审核通过'
                if (v.auditStatus == 2) v.auditStatusTransform = '审核不通过'
            })
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        async showDialog (scope, type) {
            const { data } = await findBrandArea({ id: scope.id })
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
            this.$nextTick(() => {
                this.$refs['suggest'].clearValidate()
            })
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
            this.auditBrandArea()
        },
        async auditBrandArea () {
            this.$refs['suggest'].validate(async (valid) => {
                if (valid) {
                    const form = {
                        updateBy: this.userInfo.employeeName,
                        // updateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                        auditStatus: +this.suggest.auditResult,
                        // brandId: this.dialogMsg.brandId,
                        id: this.dialogMsg.id,
                        remark: this.suggest.auditRemark
                    }
                    if (!this.dialogMsg.brandAreaPoList) this.dialogMsg.brandAreaPoList = []
                    if (this.dialogMsg.brandAreaPoList.length === 0) {
                        Message({ message: '代理区域不能为空', type: 'error' })
                        return
                    }
                    await auditBrandArea(form)
                    this.dialogParams.show = false
                    this.onQuery()
                } else {
                    return false
                }
            })
        }
    },
    mounted () {
        this.onQuery()
    }
}
</script>

<style lang='scss' scoped>
.proxyCert {
    display: flex;
    img {
        display: block;
        width: 50px;
        height: 50px;
    }
}
.remark {
    padding-top: 20px;
}
</style>