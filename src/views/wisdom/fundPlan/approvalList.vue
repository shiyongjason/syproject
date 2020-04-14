<template>
    <div class="page-body approval">
       <div>
           <el-tabs v-model="activeName" @tab-click="handleClick">
               <el-tab-pane label="我的待办" name="first">
                   <div class="page-body-cont query-cont">
                       <div class="query-cont-col">
                           <div class="query-col-title"> 申报月份：</div>
                           <div class="query-col-input">
                               <el-date-picker
                                   v-model="params.startDate"
                                   type="month"
                                   placeholder="选择月">
                               </el-date-picker>
                           </div>
                       </div>
                       <div class="query-cont-col">
                           <div class="query-col-title"> 平台公司名称：</div>
                           <div class="query-col-input">
                               <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='false'></HAutocomplete>
                           </div>
                       </div>
                       <div class="query-cont-col">
                           <div class="query-col-title">分部：</div>
                           <div class="query-col-input">
                               <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请选择分部" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='false'></HAutocomplete>
                           </div>
                       </div>
                       <div class="query-cont-col">
                           <div class="query-col-title">
                               <el-button type="primary" class="ml20" @click="onQuery()">
                                   搜索
                               </el-button>
                               <el-button type="primary" class="ml20" @click="onReset()">
                                   重置
                               </el-button>
                           </div>
                       </div>
                   </div>
                   <div class="page-body-cont">
                       <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination"
                                   @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                           <template slot="role" slot-scope="scope">
                               {{scope.data.row.role - 0 ===  0 ? '管理员' : '普通成员'}}
                           </template>
                           <template slot="action" slot-scope="scope">
                               <el-button class="orangeBtn" @click="goApprovalList(scope.data.row)">审批</el-button>
                           </template>
                       </basicTable>
                   </div>
               </el-tab-pane>
               <el-tab-pane label="我的已办" name="second">
                   <div class="page-body-cont query-cont">
                       <div class="query-cont-col">
                           <div class="query-col-title"> 申报月份：</div>
                           <div class="query-col-input">
                               <el-date-picker
                                   v-model="params.startDate"
                                   type="month"
                                   placeholder="选择月">
                               </el-date-picker>
                           </div>
                       </div>
                       <div class="query-cont-col">
                           <div class="query-col-title"> 平台公司名称：</div>
                           <div class="query-col-input">
                               <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='false'></HAutocomplete>
                           </div>
                       </div>
                       <div class="query-cont-col">
                           <div class="query-col-title">分部：</div>
                           <div class="query-col-input">
                               <HAutocomplete :selectArr="platComList" @back-event="backPlat" placeholder="请选择分部" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='false'></HAutocomplete>
                           </div>
                       </div>
                       <div class="query-cont-col">
                           <div class="query-col-title">
                               <el-button type="primary" class="ml20" @click="onQuery()">
                                   搜索
                               </el-button>
                               <el-button type="primary" class="ml20" @click="onReset()">
                                   重置
                               </el-button>
                           </div>
                       </div>
                   </div>
                   <div class="page-body-cont">
                       <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination"
                                   @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                           <template slot="role" slot-scope="scope">
                               {{scope.data.row.role - 0 ===  0 ? '管理员' : '普通成员'}}
                           </template>
                           <template slot="action" slot-scope="scope">
                               <el-button class="orangeBtn" @click="goApprovalList(scope.data.row)">审批</el-button>
                           </template>
                       </basicTable>
                   </div>
               </el-tab-pane>
           </el-tabs>
       </div>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
export default {
    name: 'ApprovalList',
    components: {
        HAutocomplete
    },
    data () {
        return {
            activeName: 'second',
            params: {},
            paramsTemp: {},
            tableLabel: [
                { label: '流程编号', prop: 'nick' },
                { label: '申报月份', prop: 'phone' },
                { label: '平台公司名称', prop: 'role' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '资金支持类型', prop: 'createTime' }
            ],
            tableData: [],
            pagination: {},
            platComList: [],
            selectPlatObj: {
                selectCode: '',
                selectName: ''
            }
        }
    },
    methods: {
        handleClick (tab, event) {
            console.log(tab, event)
        },
        onReset () {
            this.params = { ...this.paramsTemp }
        },
        onCurrentChange (val) {
            this.params.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.params.pageSize = val
            this.onQuery()
        },
        onQuery () {

        },
        goApprovalList () {

        },
        backPlat () {

        }
    },
    mounted () {
        this.paramsTemp = { ...this.params }
    }
}
</script>

<style scoped lang="scss">
.approval {
    background: #ffffff;
    padding: 60px 25px 30px;
    box-sizing: border-box;
}
/deep/ .el-tabs__item.is-active {
    color: #333;
    background: transparent;
}

/deep/ .el-tabs__header {
    margin: 0
}
</style>
