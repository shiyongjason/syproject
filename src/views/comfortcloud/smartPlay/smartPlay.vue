<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>智能玩法</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">玩法标题：</div>
                <div class="query-col-input">
                                        <el-input type="text"
                                                  v-model="queryParams.title" maxlength="20" placeholder="输入玩法标题"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="createPlay">新建玩法</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange'
                        isShowIndex @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='80'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
export default {
    name: 'smartPlay',
    data () {
        return {
            tableData: [],
            queryParams: {
                title: ''
            },
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '玩法标题', prop: 'homeName' },
                { label: '创建时间', prop: 'phone' },
                { label: '生效时间', prop: 'memberCount' },
                { label: '状态', prop: 'wuLianIotId' }
            ]
        }
    },
    methods: {
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onQuery () {

        },
        createPlay () {

        }
    }
}
</script>

<style scoped>
    .spanflex {
        font-size: 16px;
        padding-bottom: 10px;
    }
</style>
