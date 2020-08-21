<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入项目名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">管理员账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入项目名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">管理员姓名：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入项目名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">所属分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="status" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">经营区域：</div>
                    <div class="query-col-input">
                        <el-select v-model="status" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">企业类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="status" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">认证状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="status" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">关联/认证时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.minSubmitTime" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                                        :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.maxSubmitTime" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">客户分类：</div>
                    <div class="query-col-input">
                        <el-select v-model="status" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-input">
                    <el-button type="primary" class="ml20" @click="searchList">
                        查询
                    </el-button>
                    <el-button type="default" class="ml20" @click="onRest">
                        重置
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <el-tag size="medium" class="eltagtop">已筛选 {{0}} 项
                <span>体系内： 0</span>；
                <span>体系外： 0</span>；
                <span>白名单： 0</span>；
                <span>黑名单： 0</span>；
            </el-tag>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination
                         :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber"
                         :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total" @pagination="searchList"
                         actionWidth='150' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onLookproject(scope.data.row)"
                               v-if="hosAuthCheck(Auths.CRM_GOODWORK_DETAIL)">查看详情
                    </el-button>
                </template>
            </hosJoyTable>
        </div>
        <projectDrawer :drawer=drawer :status='projectstatus' @backEvent='restDrawer' ref="drawercom"></projectDrawer>
    </div>
</template>

<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import projectDrawer from '@/views/crm/goodwork/components/projectDrawer'

export default {
    name: 'account',
    components: {
        projectDrawer, hosJoyTable
    },
    data () {
        return {
            queryParams: {
                projectName: ''
            },
            tableLabel: [
                {
                    label: '企业名称',
                    prop: 'projectName',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    label: '管路员账户',
                    prop: 'projectName',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    label: '管路员姓名',
                    prop: 'projectName',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    label: '所属分部',
                    prop: 'projectName',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    label: '经营区域',
                    prop: 'projectName',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    label: '企业类型',
                    prop: 'projectName',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    label: '客户分类',
                    prop: 'projectName',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    label: '认证状态',
                    prop: 'projectName',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    label: '创建时间',
                    prop: 'projectName',
                    width: '150',
                    showOverflowTooltip: true
                },
                {
                    label: '关联认证时间',
                    prop: 'projectName',
                    width: '150',
                    showOverflowTooltip: true
                }
            ],
            tableData: [],
            paginationInfo: {},
            status: '',
            statusList: [],
            projectstatus: 0,
            drawer: false
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.maxSubmitTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.minSubmitTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    methods: {
        searchList () {

        },
        sortChange () {

        },
        onRest () {

        },
        restDrawer () {

        }
    }
}
</script>

<style scoped>
    .eltagtop {
        margin-bottom: 10px;
    }
</style>
