<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">支付单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userAccount" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userAccount" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">采购单名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">采购单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">申请时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true @change="onChooseDep">
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in []" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="onQuery">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">已筛选 {{payOrderData.total}} 项,采购单总金额：<b>88,888,888</b>元;</el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120 ::rowKey="rowKey" :isShowIndex='true'>
                <template slot="no" slot-scope="scope">
                    <span class="colblue"> {{scope.data.row.no}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table >查看详情</h-button>
                </template>
            </basicTable>
        </div>
        <purchaseOrderDrawer :drawer=drawer @backEvent='restDrawer' ref="drawercom"></purchaseOrderDrawer>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'payOrder',
    data () {
        return {
            queryParams: {
                pageSize: 10,
                pageNumber: 1
            },
            tableData: [],
            tableLabel: [
                { label: '支付单编号', prop: 'no', width: '150' },
                { label: '所属分部', prop: 'no', width: '150' },
                { label: '经销商', prop: 'no', width: '150' },
                { label: '采购单名称', prop: 'no', width: '150' },
                { label: '采购单编号', prop: 'no', width: '150' },
                { label: '金额', prop: 'no', width: '150' },
                { label: '状态', prop: 'no', width: '150' },
                { label: '申请时间', prop: 'no', width: '150', formatters: 'dateTimes', sortable: 'custom' },
                { label: '更新时间', prop: 'no', width: '150', formatters: 'dateTimes', sortable: 'custom'
                }
            ],
            payOrderData: []
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.authenticationEndTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.authenticationStartTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onQuery () {

        },
        onReset () {
            this.queryParams = { ...this.queryParamsTemp }
        },
        onChooseDep () {
        },
        restDrawer () {

        }
    },
    mounted () {
        this.queryParamsTemp = { ...this.queryParams }
    }
}
</script>

<style scoped>

</style>
