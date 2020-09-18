<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">推荐人姓名/账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.userAccount" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">发放状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true @change="onChooseDep">
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">信用评审通过时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">认证时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.authenticationStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.authenticationEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type="primary" @click="searchList(1)">
                        查询
                    </h-button>
                    <h-button @click="onRest">
                        重置
                    </h-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tag size="medium" class="eltagtop">
                已筛选 {{businessData.total}} 项 &nbsp; 待发放：{{5}}个；已发放：{{10}}个；
            </el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSortChange="onSortChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=120 ::rowKey="rowKey" :isShowIndex='true'>
                <template slot="userAccount" slot-scope="scope">
                    <span class="colblue" @click="onLinkship(scope.data.row.userAccount)"> {{scope.data.row.userAccount}}</span>
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
                    <h-button table @click="onLookauthen(scope.data.row.companyCode)" v-if="hosAuthCheck(authen_detail)">查看详情</h-button>
                </template>
            </basicTable>
        </div>
        <businessDrawer :drawer=drawer @backEvent='restDrawer' ref="drawercom"></businessDrawer>
    </div>
</template>

<script>
export default {
    name: 'accountManage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: '账号', prop: 'companyName' },
                { label: '姓名', prop: 'userAccount', width: '120' },
                { label: '注册时间', prop: 'userName', width: '120' },
                { label: '最近登录时间', prop: 'subsectionName', width: '150' },
                { label: '账号来源', prop: 'areaname', width: '150' },
                { label: '最近登录设备', prop: 'companyType', width: '100' },
                { label: '最近登录平台', prop: 'customerType', width: '100', sortable: 'custom' },
                { label: '最近登录版本', prop: 'isAuthentication', width: '100', sortable: 'custom' },
                { label: '账号状态', prop: 'createTime', width: '150', formatters: 'dateTimes' }
            ]
        }
    }
}
</script>

<style scoped>

</style>
