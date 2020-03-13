<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <h3>企业客户列表</h3>
            </div><br>
            <div class="query-cont-col">
                <div class="query-col-title">企业名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.name" placeholder="请输入企业名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">社会信用统一代码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.idCardNumber" placeholder="请输入社会信用统一代码">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div>
            </div>
            <div>
                <div class="more_handle">
                    <el-button type="primary" @click="addCustomer">新增客户</el-button>
                </div>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="action" slot-scope="scope">
                    <el-dropdown trigger="click" @command="onupdate">
                        <span class='dropdownSelect'>
                            请选择<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{row: scope.data.row, type: 1}">查看客户信息</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { tableLabelBsnCustomer } from './const.js'
export default {
    name: 'faceRecognition',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            tableLabel: tableLabelBsnCustomer,
            tableData: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                idCardNumber: '',
                name: ''
            },
            searchParams: {},
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        async onQuery () {
            // const { data } = await getRecognitions(this.queryParams)
            // this.tableData = data.records
            // // 控制页数和页码
            // this.pagination = {
            //     pageNumber: data.current,
            //     pageSize: data.size,
            //     total: data.total
            // }
        },
        onSearch (val) {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'idCardNumber', '')
            this.$set(this.queryParams, 'name', '')
            this.onSearch()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        async onupdate (command) {
            console.log(command)
        },
        async addCustomer () {
            this.$router.push({ path: '/jinyun/addBusinessCustomer', query: { type: 0 } })
        }
    }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog {
    min-width: 720px;
}
/deep/ .el-dialog__body {
    min-height: 256px;
    max-height: 600px;
    overflow: scroll;
}
.dropdownSelect {
    cursor: pointer;
    padding: 5px 10px 1px 10px;
    background-color: #efefef;
}
.more_handle {
    margin-bottom: 20px;
}
</style>
