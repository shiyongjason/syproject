<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col__label">首付款流水号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">支付单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userAccount" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true @change="onChooseDep">
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">项目：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.userName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true @change="onChooseDep">
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">应支付日期：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col__label">支付成功时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="()=>searchList(1)">
                        查询
                    </h-button>
                    <h-button @click="onRest">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="首付款" name="first">
                    <el-tag size="medium" class="eltagtop">已筛选 {{fundsData.total}} 项,采购单总金额：<b>88,888,888</b>元;</el-tag>
                    <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120 ::rowKey="rowKey" :isShowIndex='true'>
                        <template slot="no" slot-scope="scope">
                            <span class="colblue" @click="jumpPurchaseOrderDetail(scope.data.row.no)"> {{scope.data.row.no}}</span>
                        </template>
                        <template slot="userName" slot-scope="scope">
                            <span class="colblue" @click="onLinkship(scope.data.row.userName)"> {{scope.data.row.userName||'-'}}</span>
                        </template>
                        <template slot="areaname" slot-scope="scope">
                            {{scope.data.row.provinceName+scope.data.row.cityName+scope.data.row.countryName}}
                        </template>
                        <template slot="companyType" slot-scope="scope">
                            {{scope.data.row.companyType==1?'体系内':scope.data.row.companyType==2?'体系外':'-'}}
                        </template>
                        <template slot="customerType" slot-scope="scope">
                            {{scope.data.row.customerType==1?'黑名单':scope.data.row.customerType==2?'白名单':scope.data.row.customerType==3?'待审核':'-'}}
                        </template>
                        <template slot="isAuthentication" slot-scope="scope">
                            <span :class="scope.data.row.isAuthentication==1?'colgry':'colred'"> {{scope.data.row.isAuthentication==1?'已认证':'未认证'}}</span>
                        </template>
                        <template slot="action" slot-scope="scope">
                            <h-button table>查看详情</h-button>
                        </template>
                    </basicTable>
                </el-tab-pane>
                <el-tab-pane label="服务费" name="second">
                    <el-tag size="medium" class="eltagtop">已筛选 {{fundsData.total}} 项,采购单总金额：<b>88,888,888</b>元;</el-tag>
                    <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120 ::rowKey="rowKey" :isShowIndex='true'>
                        <template slot="no" slot-scope="scope">
                            <span class="colblue" @click="jumpPurchaseOrderDetail(scope.data.row.no)"> {{scope.data.row.no}}</span>
                        </template>
                        <template slot="userName" slot-scope="scope">
                            <span class="colblue" @click="onLinkship(scope.data.row.userName)"> {{scope.data.row.userName||'-'}}</span>
                        </template>
                        <template slot="areaname" slot-scope="scope">
                            {{scope.data.row.provinceName+scope.data.row.cityName+scope.data.row.countryName}}
                        </template>
                        <template slot="companyType" slot-scope="scope">
                            {{scope.data.row.companyType==1?'体系内':scope.data.row.companyType==2?'体系外':'-'}}
                        </template>
                        <template slot="customerType" slot-scope="scope">
                            {{scope.data.row.customerType==1?'黑名单':scope.data.row.customerType==2?'白名单':scope.data.row.customerType==3?'待审核':'-'}}
                        </template>
                        <template slot="isAuthentication" slot-scope="scope">
                            <span :class="scope.data.row.isAuthentication==1?'colgry':'colred'"> {{scope.data.row.isAuthentication==1?'已认证':'未认证'}}</span>
                        </template>
                        <template slot="action" slot-scope="scope">
                            <h-button table>查看详情</h-button>
                        </template>
                    </basicTable>
                </el-tab-pane>
                <el-tab-pane label="尾款" name="third">
                    <el-tag size="medium" class="eltagtop">已筛选 {{fundsData.total}} 项,采购单总金额：<b>88,888,888</b>元;</el-tag>
                    <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120 ::rowKey="rowKey" :isShowIndex='true'>
                        <template slot="no" slot-scope="scope">
                            <span class="colblue" @click="jumpPurchaseOrderDetail(scope.data.row.no)"> {{scope.data.row.no}}</span>
                        </template>
                        <template slot="userName" slot-scope="scope">
                            <span class="colblue" @click="onLinkship(scope.data.row.userName)"> {{scope.data.row.userName||'-'}}</span>
                        </template>
                        <template slot="areaname" slot-scope="scope">
                            {{scope.data.row.provinceName+scope.data.row.cityName+scope.data.row.countryName}}
                        </template>
                        <template slot="companyType" slot-scope="scope">
                            {{scope.data.row.companyType==1?'体系内':scope.data.row.companyType==2?'体系外':'-'}}
                        </template>
                        <template slot="customerType" slot-scope="scope">
                            {{scope.data.row.customerType==1?'黑名单':scope.data.row.customerType==2?'白名单':scope.data.row.customerType==3?'待审核':'-'}}
                        </template>
                        <template slot="isAuthentication" slot-scope="scope">
                            <span :class="scope.data.row.isAuthentication==1?'colgry':'colred'"> {{scope.data.row.isAuthentication==1?'已认证':'未认证'}}</span>
                        </template>
                        <template slot="action" slot-scope="scope">
                            <h-button table>查看详情</h-button>
                        </template>
                    </basicTable>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>
export default {
    name: 'funds',
    data () {
        return {
            queryParams: {},
            activeName: 'first',
            tableLabel: [
                { label: '首付款流水号', prop: 'no', width: '150' },
                { label: '所属分部', prop: 'no', width: '150' },
                { label: '经销商', prop: 'no', width: '150' },
                { label: '所属项目', prop: 'no', width: '150' },
                { label: '支付单编号', prop: 'no', width: '150' },
                { label: '金额', prop: 'no', width: '150' },
                { label: '状态', prop: 'no', width: '150' },
                { label: '应支付日期', prop: 'no', width: '150', formatters: 'dateTimes', sortable: 'custom' },
                { label: '支付成功时间', prop: 'no', width: '150', formatters: 'dateTimes', sortable: 'custom' },
                { label: '更新时间', prop: 'no', width: '150', formatters: 'dateTimes', sortable: 'custom' }
            ],
            fundsData: {}
        }
    },
    methods: {
        handleClick () {},
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
        }
    }
}
</script>

<style scoped>

</style>
