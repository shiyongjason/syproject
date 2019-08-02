<template>
    <div>
        <div class="flex-wrap-row pt10">
            <div class="flex-wrap-box">
                <div class="flex-wrap-cont">
                    <el-button type="primary" class="ml20" @click="openMark('add')">
                        新增品牌
                    </el-button>
                    <el-button type="primary" class="ml20" @click="onUpdateBrandMultiStatus(selectId,1)">批量生效</el-button>
                    <el-button type="primary" class="ml20" @click="onUpdateBrandMultiStatus(selectId,2)">批量失效</el-button>
                </div>
            </div>
        </div>
        <div class="page-box base-table product-table page-table">
            <el-table :data="tableData"
                    border
                    ref="brandTable"
                    @selection-change="selectionChange"
                    style="width: 100%">
                <el-table-column
                    type="selection"
                    align="center">
                </el-table-column>
                <el-table-column
                    type="index"
                    label="序号"
                    :index="indexMethod"
                    align="center"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="brandCode"
                    label="品牌编码">
                </el-table-column>
                <el-table-column
                    prop="brandName"
                    label="品牌名称">
                    <template slot-scope="scope">
                        <span @click="modify(scope.row)" class="brand-link">{{ scope.row.brandName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="brandNameEn"
                    label="英文名称">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    align="center">
                    <template slot-scope="scope">
                        <span class="valid-status" v-if="scope.row.status == 1">生效</span>
                        <span class="invalid-status" v-else>失效</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="updateBy"
                    label="维护人">
                </el-table-column>
                <el-table-column
                    label="维护时间"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.updateTime | formatterTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
                        <el-button type="text"
                                size="small"
                                @click="onUpdateBrandStatus(scope.row)"
                                :class="scope.row.status === 2 ? '' : 'status-on'"
                                v-text="scope.row.status === 2 ? '生效' : '失效'">
                        </el-button>
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
    </div>
</template>

<script>
import { updateBrandStatus } from '../api/index'
import { mapState } from 'vuex'
export default {
    name: 'productTable',
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
            selectId: []
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
        onUpdateBrandStatus (row) {
            const params = {
                id: [row.id],
                status: row.status === 1 ? 2 : 1
            }
            this._updateBrandStatus(params)
        },
        async onUpdateBrandMultiStatus (ids, status) {
            if (ids.length > 0) {
                const params = {
                    id: ids,
                    status: status
                }
                await this._updateBrandStatus(params)
                this.$refs.brandTable.clearSelection()
            } else {
                this.$message({
                    showClose: true,
                    message: '请先选择品牌！',
                    type: 'warning'
                })
            }
        },
        async _updateBrandStatus (params) {
            params.updateBy = this.userInfo.name
            await updateBrandStatus(params)
            this.$message({
                message: params.status === 2 ? '品牌已失效！' : '品牌已生效！',
                type: 'success'
            })
            this.$emit('updateStatus')
        },
        modify (row) {
            this.$emit('updateBrand', row)
        },
        openMark (status) {
            this.$emit('openMark', status)
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
.checked-btn {
    margin-top: 30px;
}
.status-on{
    color: #999999;
}
.invalid-status {
    color: #ccc;
}
.valid-status {
    color: #FF7A45;
}
.brand-link {
    color: #409EFF;
    cursor: pointer;
}
</style>
