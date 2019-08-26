<template>
    <div class="wallet-pay-table page-body-cont">
        <el-table :data="tableData"
                  border
                  ref="brandTable"
                  style="width: 100%">
            <el-table-column
                label="平台公司"
                prop="porganizationName"
                align="center"
            >
            </el-table-column>
            <el-table-column
                label="会员店名称"
                prop="organizationName"
                align="center"
            >
            </el-table-column>
            <el-table-column
                label="法人联系方式"
                prop="merchantPhone"
                align="center"
                width="150"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.merchantPhone">{{scope.row.merchantPhone}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column
                label="法人姓名"
                prop="corporationName"
                align="center"
                width="100"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.corporationName">{{scope.row.corporationName}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column
                label="单分享开通状态"
                prop="singleShareOpen"
                align="center"
            >
                <template slot-scope="scope">
                    <span class="valid-status"  v-if="scope.row.singleShareOpen === 1">已开通</span>
                    <span class="invalid-status" v-else>未开通</span>
                </template>
            </el-table-column>
            <el-table-column
                label="单分享开通时间"
                prop="singleShareOpenTime"
                align="center"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.singleShareOpenTime">{{scope.row.singleShareOpenTime | formatterTime}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column
                label="钱包支付开通状态"
                prop="registerStatus"
                align="center"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.registerStatus === 0">开通中</span>
                    <span v-else-if="scope.row.registerStatus === 1">已开通</span>
                    <span v-else>未开通</span>
                </template>
            </el-table-column>
            <el-table-column
                label="钱包支付开通时间"
                prop="bankRegisterOpenTime"
                align="center"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.bankRegisterOpenTime">{{scope.row.bankRegisterOpenTime | formatterTime}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination
                class="el-page"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationData.pageNumber"
                :page-sizes="[10,20,30,40,50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationData.totalElements">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'wallerPayTable',
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

        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        handleSizeChange (val) {
            this.loading = true
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val)
        }
    }
}
</script>

<style scoped>

</style>
