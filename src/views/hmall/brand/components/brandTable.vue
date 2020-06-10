<template>
    <div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="openMark('add')">
                    新增品牌
                </el-button>
                <el-button type="primary" class="ml20" @click="onUpdateBrandMultiStatus(selectId, 2)">批量生效</el-button>
                <el-button type="primary" class="ml20" @click="onUpdateBrandMultiStatus(selectId, 1)">批量失效</el-button>
            </div>
        </div>
        <div class="page-body-cont">
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
                    prop="code"
                    label="品牌编码">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="品牌名称">
                    <template slot-scope="scope">
                        <span @click="modify(scope.row)" class="brand-link">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="englishName"
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
                    prop="operator"
                    label="维护人">
                </el-table-column>
                <el-table-column
                    label="维护时间"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.lastModifyTime | formatterTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="modify(scope.row)" class="orangeBtn">修改</el-button>
                        <!--:class="scope.row.status === 2 ? '' : 'status-on'"-->
                        <el-button class="orangeBtn"
                                @click="onUpdateBrandStatus(scope.row)"
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
import { brandEnable, brandDisable } from '../api/index'
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
                brandIdList: [row.id],
                status: row.status
            }
            this._updateBrandStatus(params)
        },
        async onUpdateBrandMultiStatus (ids, status) {
            if (ids.length > 0) {
                const params = {
                    brandIdList: ids,
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
            if (params.status === 1) {
                await brandDisable({ brandIdList: params.brandIdList, operator: this.userInfo.employeeName })
            } else {
                await brandEnable({ brandIdList: params.brandIdList, operator: this.userInfo.employeeName })
            }
            this.$message({
                message: params.status === 1 ? '品牌已失效！' : '品牌已生效！',
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
