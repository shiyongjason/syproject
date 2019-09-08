<template>
    <div class="page-body-cont">
        <el-table :data="tableData" border ref="attributeTable" @selection-change="selectionChange" style="width: 100%">
            <el-table-column type="selection" label="序号" align="center">
            </el-table-column>
            <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="60">
            </el-table-column>
            <el-table-column prop="id" label="报告ID" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center">
                <template slot-scope="scope">
                    {{scope.row.mobile ? scope.row.mobile : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址">
                <template slot-scope="scope">
                    {{ scope.row.address }}
                </template>
            </el-table-column>
            <el-table-column prop="roomType" label="房型">
                <template slot-scope="scope">
                    {{ scope.row.roomType }}
                </template>
            </el-table-column>
            <el-table-column prop="population" label="人口">
                <template slot-scope="scope">
                    {{ scope.row.population }}
                </template>
            </el-table-column>
            <el-table-column label="维护时间" align="center">
                <template slot-scope="scope">
                    {{ scope.row.createTime | formatterTime }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="onShow(scope.row)" class="orangeBtn" v-if="hosAuthCheck(showAuthCode)">查看</el-button>
                    <el-button @click="onEdit(scope.row)" class="orangeBtn" v-if="hosAuthCheck(editAuthCode)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination class="el-page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" :page-sizes="[10,20,30,40,50]" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.totalElements">
            </el-pagination>
        </div>
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane v-for="(value, index) in data" :key="index" :label="value.name" :name="(index + 1).toString()"></el-tab-pane>
            </el-tabs>
            <table>
                <thead>
                    <tr>
                        <th>类目</th>
                        <th>序号</th>
                        <th>项目</th>
                        <th>小项目</th>
                        <th>品牌</th>
                        <th>型号</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v, i) in childArchiveNodes" :key="i">
                        <th>Month</th>
                        <th>Savings</th>
                    </tr>
                </tbody>
            </table>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { findReportDetail } from '../api/index'
import { AUTH_SERVICE_CUSTOMER_REPORT_SHOW, AUTH_SERVICE_CUSTOMER_REPORT_EDIT } from '@/utils/auth_const'
export default {
    name: 'customerRecordTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        paginationData: {
            type: Object,
            default () {
                return {
                    totalElements: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        }
    },
    data () {
        return {
            selectId: [],
            dialogTableVisible: false,
            activeName: '1',
            data: [],
            childArchiveNodes: [],
            showAuthCode: AUTH_SERVICE_CUSTOMER_REPORT_SHOW,
            editAuthCode: AUTH_SERVICE_CUSTOMER_REPORT_EDIT
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        selectionChange (val) {
            this.selectId = []
            val.forEach((value) => {
                this.selectId.push(value.id)
            })
        },
        async onShow (row) {
            this.$router.push({ path: 'customerReportDetail', query: { id: row.id, action: 'show' } })
        },
        async onEdit (row) {
            this.$router.push({ path: 'customerReportDetail', query: { id: row.id, action: 'edit' } })
        },
        handleClick () {
            console.log(this.activeName)
        },
        handleSizeChange (val) {
            this.loading = true
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val)
        },
        indexMethod (index) {
            return this.paginationData.pageSize * (this.paginationData.pageNumber - 1) + index + 1
        }
    }
}
</script>

<style scoped>
.header {
    background: #f0f0f0;
    margin: 10px 0;
}
.status-on {
    color: #999999;
}
.parameter-link {
    color: #409eff;
    cursor: pointer;
}
.invalid-status {
    color: #ccc;
}
.valid-status {
    color: #ff7a45;
}
</style>
