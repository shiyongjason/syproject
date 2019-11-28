<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">活动名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams" placeholder="请输入活动名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-select v-model="queryParams">
                            <el-option label="活动预热时间" value="">
                            </el-option>
                            <el-option label="活动开始时间" value="1">
                            </el-option>
                            <el-option label="活动结束时间" value="0">
                            </el-option>
                        </el-select>
                    </div>

                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.orderTimeStart" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.orderTimeEnd" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">活动状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.status">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option label="禁用" value="2">
                            </el-option>
                            <el-option label="启用" value="1">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20">
                        新建活动
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true'>
                <template slot="action" slot-scope="scope">
                    <el-button type="primary" size="mini" plain>编辑</el-button>
                    <el-button type="primary" size="mini" plain>复制</el-button>
                    <el-button type="warning" size="mini" plain>发布</el-button>
                    <el-button type="danger" size="mini" plain>终止</el-button>
                    <el-tooltip class="item" effect="dark" placement="bottom-start">
                        <div slot="content">累计PV：1315<br />累计UV：1011<br /> 累计订单数：11<br />累计支付数：1,025</div>
                        <el-button type="info" size="mini" plain @click="onClickStatics(scope.data)">数据统计</el-button>
                    </el-tooltip>
                </template>
            </basicTable>
        </div>
        <!-- <shopManagerTable ref="shopManagerTable" :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateBrand="updateBrandChange" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></shopManagerTable> -->
    </div>
</template>
<script>
export default {
    name: 'eventmanage',
    data () {
        return {
            queryParams: {},
            tableData: [],
            tableLabel: [
                { label: '活动名称', prop: 'spuCode' },
                { label: '创建时间', prop: 'spuCode' },
                { label: '活动时间', prop: 'spuCode' },
                { label: '活动状态', prop: 'spuCode' }
            ],
            paginationInfo: {}
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    mounted () {
        this.tableData = [{ spuCode: '23' }]
    },
    methods: {
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        onClickStatics () {
            this.$router.push({ path: '/hmall/eventStatistics', query: {} })
        }
    }
}
</script>