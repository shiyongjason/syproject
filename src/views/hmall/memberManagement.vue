<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">姓名：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.name" placeholder="请输入姓名">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">登录名：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.reservationPerson" placeholder="请输入登录名">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">是否员工：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.source" style="width: 100%">
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">选择岗位：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.reservationStatus" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="销售" value="1"></el-option>
                            <el-option label="销售总监" value="2"></el-option>
                            <el-option label="设计师" value="3"></el-option>
                            <el-option label="财务" value="4"></el-option>
                            <el-option label="总裁" value="5"></el-option>
                            <el-option label="开票员" value="6"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">重置</el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" isShowIndex :actionMinWidth='520' :isPagination='true' :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                    <template slot="action" slot-scope="scope">
                        <el-button class="orangeBtn">完善用户信息</el-button>
                        <el-button class="orangeBtn">分配岗位</el-button>
                        <el-button class="orangeBtn">重置密码</el-button>
                        <el-button class="orangeBtn">删除用户</el-button>
                        <el-button class="orangeBtn" @click="console.log(scope)">禁用</el-button>
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'memberManagement',
    data () {
        return {
            tableLabel: [
                { label: '登录名', prop: 'originatorName' },
                { label: '姓名', prop: 'institution' },
                { label: '岗位', prop: 'originTime' },
                { label: '是否是员工', prop: 'allSubmitTime' },
                { label: '状态', prop: 'handleTime' },
                { label: '注册时间', prop: 'finalScore' }
            ],
            tableData: [
                {
                    originatorName: '153804475550',
                    institution: '张三',
                    originTime: '设计师',
                    allSubmitTime: '是',
                    handleTime: '正常',
                    finalScore: '2019-09-10 17:19:46'
                }, {
                    originatorName: '153804475550',
                    institution: '张三',
                    originTime: '设计师',
                    allSubmitTime: '是',
                    handleTime: '正常',
                    finalScore: '2019-09-10 17:19:46'
                }
            ],
            searchParams: {},
            queryParams: {
                name: '',
                reservationPerson: '',
                source: '',
                reservationStatus: ''
            },
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                total: 100
            }
        }
    },
    methods: {
        onQuery () {
            console.log('搜索')
            const { ...params } = { ...this.queryParams }
            this.searchParams = params
            this.search()
        },
        onReset () {
            console.log('重置')
            this.$set(this.queryParams, 'name', '')
            this.$set(this.queryParams, 'reservationPerson', '')
            this.$set(this.queryParams, 'source', '')
            this.$set(this.queryParams, 'reservationStatus', '')
            this.$set(this.paginationData, 'pageNumber', 1)
            this.$set(this.paginationData, 'pageSize', 10)
            this.onQuery()
        },
        search () {
            const searchParams = {
                ...this.searchParams,
                ...this.paginationData
            }
            console.log(searchParams)
        },
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            const { ...page } = val
            this.paginationData = page
            this.search()
        }
    },
    mounted () {
        this.onQuery()
    }
}
</script>

<style scoped>
</style>