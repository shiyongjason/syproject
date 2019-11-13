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
        <ChannelTable :tableData="tableData" :paginationData="paginationData" @updateStatus="search" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
        </ChannelTable>
    </div>
</template>

<script>
import ChannelTable from './components/channelTable'
export default {
    name: 'channelManagement',
    components: {
        ChannelTable
    },
    data () {
        return {
            queryParams: {
                channelName: ''
            },
            tableData: [],
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                totalElements: 100
            }
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
            // const { data } = await findReservations(this.searchParams)
            // this.tableData = data.records
            // this.paginationData = {
            //     pageNumber: data.current,
            //     pageSize: data.size,
            //     totalElements: data.total
            // }
        }
    }
}
</script>

<style scoped>

</style>
