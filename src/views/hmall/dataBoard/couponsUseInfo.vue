<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.applicationTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.applicationTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">所属商家：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入所属商家">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="onQuery">搜索</el-button>
                <el-button type="primary" @click="onReset">重置</el-button>
                <el-button type="primary" @click="onReset">导出</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">

            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'couponsUseInfo',
    data () {
        return {
            queryParams: {

            },
            tableLabel: [
                { label: '所属商家', prop: 'merchantName' },
                { label: '优惠券名称', prop: 'brandName' },
                { label: '优惠券ID', prop: 'categories' },
                { label: '优惠券类型', prop: 'submitTime' },
                { label: '优惠券金额（元）', prop: 'status' },
                { label: '制作张数', prop: 'auditTime' },
                { label: '创建时间', prop: 'auditTime' },
                { label: '发放张数', prop: 'auditTime' },
                { label: '领取张数', prop: 'auditTime' },
                { label: '使用张数', prop: 'auditTime' },
                { label: '使用金额', prop: 'auditTime' },
                { label: '使用此优惠券商品总金额', prop: 'auditTime' }
            ],
            tableData: [],
            paginationData: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.applicationTimeEnd
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.applicationTimeStart)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        init () {

        },
        onQuery () {

        },
        onReset () {

        },
        onSizeChange () {

        },
        onCurrentChange () {

        },
        ...mapActions([

        ])
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
</style>
