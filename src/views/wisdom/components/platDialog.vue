<template>
    <el-dialog
        title="变更记录"
        :visible.sync="visible"
        @close="$emit('update:show', false)"
        :show="show"
        width="40%"
        center
    >

        <el-button
            type="primary"
            @click="exportSignTable()"
        >导出
        </el-button>

        <div class="page-table top10">
            <el-table
                :data="tableData"
                style="width: 100%"
                border
            >
                <el-table-column
                    prop="date"
                    label="变更因素"
                    width="180"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.changeFactors==0">初始</span>
                        <span v-if="scope.row.changeFactors==1">增资</span>
                        <span v-if="scope.row.changeFactors==2">降资</span>
                        <span v-if="scope.row.changeFactors==3">淘汰</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="changeSignScale"
                    label="变更规模(万)"
                    width="180"
                >
                </el-table-column>
                <el-table-column
                    prop="newSignScale"
                    label="变更后规模(万)"
                >
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="变更时间"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.signChangeTime?scope.row.signChangeTime:'-' }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div
                class="page clearfix"
                style="text-align: center"
            >
                <el-pagination
                    class="el-page"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="paginationData.pageNumber"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paginationData.totalElements"
                >
                </el-pagination>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import { baseUrl } from '@/api/config'
import { findSignscale } from '../api/index'
export default {
    props: {
        show: {
            type: Boolean,
            default: false

        },
        companyCode: {
            type: String
        }
    },
    data () {
        return {
            tableData: [],
            paginationData: {},
            params: {
                pageNumber: 1,
                pageSize: 10,
                companyCode: ''
            },
            visible: this.show
        }
    },
    watch: {
        show () {
            this.visible = this.show
            this.findSignscale()
        }
    },
    mounted () {
        this.findSignscale()
    },
    methods: {
        async findSignscale () {
            this.params.companyCode = this.companyCode
            const { data } = await findSignscale(this.params)
            this.tableData = data.data.pageContent
            this.paginationData = {
                pageNumber: data.data.pageNumber,
                totalElements: data.data.totalElements
            }
        },
        handleSizeChange (val) {
            this.params.pageSize = val
            this.findSignscale()
        },
        handleCurrentChange (val) {
            this.params.pageNumber = val
            this.findSignscale()
        },
        exportSignTable () {
            window.location.href = baseUrl +
                'develop/developsignscalechange/exportSignScaleChangeList?companyCode=' + this.companyCode
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
