<template>
    <div class="page-body approval">
        <div>
            <el-tabs v-model="params.processType" type="card" @tab-click="handleClick">
                <el-tab-pane label="平台公司资金用信情况" name="0"></el-tab-pane>
                <el-tab-pane label="分部资金用信情况" name="1"></el-tab-pane>
            </el-tabs>
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title"> 申报月份：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="regionList" @back-event="backPlat($event,'D')" placeholder="请输入大区名称" :selectObj="selectAuth.regionObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">分部：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请选择分部" :selectObj="selectObj.branch" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title"> 平台公司名称：</div>
                    <div class="query-col-input">
                        <HAutocomplete :selectArr="areaList" @back-event="backPlat($event,'Q')" placeholder="请输入区域名称" :selectObj="selectAuth.areaObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title"> 平台公司名称：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="params.applyMonth" type="month" placeholder="选择月" value-format='yyyyMM'></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch()">
                            搜索
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">
                            重置
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">
                            导出表格
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">
                            导出表格
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                    <template slot="applyMonth" slot-scope="scope">
                        <span>{{`${scope.data.row.applyMonth.substring(0, 4)}-${scope.data.row.applyMonth.substring(4, 6)}`}}</span>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <el-button v-show="params.processType == 0" class="orangeBtn" @click="onApprovalList(scope.data.row)">审批</el-button>
                        <el-button v-show="params.processType == 1" class="orangeBtn" @click="onApproveDeclare(scope.data.row)">查看详情</el-button>
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'planApproval'
}
</script>

<style scoped>

</style>
