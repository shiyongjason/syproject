<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont spanflex">
            <span>解绑记录</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入手机号" v-model="queryParams.phone" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">设备ID：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入设备ID" v-model="queryParams.iotId" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>

            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
export default {
    name: 'unbindRecord',
    data () {
        return {

            queryParams: {
                iotId: '',
                pageNumber: 1,
                pageSize: 10,
                phone: ''
            },
            searchParams: {},
            tableData: [],
            tableLabel: [
                { label: '解绑时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '设备型号', prop: 'typeName' },
                { label: '设备ID', prop: 'iotId' },
                { label: '被解绑的管理员手机号', prop: 'phone' },
                { label: '操作人', prop: 'operator' },
                { label: '备注', prop: 'remark' }
            ],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    methods: {
        ...mapActions({
            getBossBindRecords: 'getBossBindRecords'
        }),
        async onQuery () {
            await this.getBossBindRecords(this.searchParams)
            this.tableData = this.bossBindRecords.records
            this.pagination = {
                pageNumber: this.bossBindRecords.current,
                pageSize: this.bossBindRecords.size,
                total: this.bossBindRecords.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.searchParams.pageNumber = 1
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        }
    },
    mounted () {
        this.onSearch()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            bossBindRecords: 'bossBindRecords'
        })
    }
}
</script>

<style lang="scss" scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        &:first-child {
            font-size: 16px;
        }
    }
}
</style>
