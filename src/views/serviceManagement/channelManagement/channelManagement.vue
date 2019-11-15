<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">渠道名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.channelName" placeholder="请输入姓名">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                    <el-button type="primary" class="ml20" @click="onReset()">新建渠道</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel"  :tableData="tableData" :paginationData="paginationData" @updateStatus="search"
                        @onSizeChange="onSizeChange" :isAction="false"
                        @onCurrentChange="onCurrentChange" :isShowIndex='false'>
            </basicTable>
        </div>
    </div>
</template>

<script>
export default {
    name: 'channelManagement',
    data () {
        return {
            queryParams: {
                channelName: ''
            },
            tableData: [
                {
                    sourceName: '测试'
                }
            ],
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                totalElements: 100
            },
            tableLabel: [{ label: '渠道名称', prop: 'sourceName' },
                { label: '渠道编码', prop: 'sourceName', width: '150' },
                { label: 'MIS名称', prop: 'sourceName', width: '200' },
                { label: '创建时间', prop: 'sourceName', width: '200' },
                { label: '创建人', prop: 'sourceName' },
                { label: '操作', prop: 'sourceName' }
            ]
        }
    },
    methods: {
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            this.paginationData.pageNumber = val
            this.search()
        },
        async search () {
            this.searchParams.pageSize = this.paginationData.pageSize
            this.searchParams.pageNumber = this.paginationData.pageNumber
        },
        onReset () {
            console.log(1)
        },
        onQuery () {
            console.log(1)
        }
    }
}
</script>

<style scoped>

</style>
