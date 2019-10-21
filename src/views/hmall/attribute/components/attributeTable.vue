<template>
    <div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="openMark()">
                    新增属性
                </el-button>
                <el-button type="primary" class="ml20" @click="updateAttributeMultiStatus(selectId,1)">批量生效</el-button>
                <el-button type="primary" class="ml20" @click="updateAttributeMultiStatus(selectId,2)">批量失效</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <el-table
                :data="tableData"
                border
                ref="attributeTable"
                @selection-change="selectionChange"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    label="序号"
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
                    prop="parameterCode"
                    label="属性编码">
                </el-table-column>
                <el-table-column
                    prop="parameterName"
                    label="属性名称">
                    <template slot-scope="scope">
                        <span @click="modify(scope.row)" class="parameter-link">{{ scope.row.parameterName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="属性类型"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.type == 1 ? '输入框' : '下拉框'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="单位"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.unit ? scope.row.unit : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否必填"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.isRequired == 1 ? '必填' : '非必填'}}
                    </template>
                </el-table-column>
                <el-table-column
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
                        {{ scope.row.updateTime | formatterTime }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="modify(scope.row)" class="orangeBtn">修改</el-button>
                        <!--:class="scope.row.status === 2 ? '' : 'status-on'"-->
                        <el-button
                            class="orangeBtn"
                            @click="updateAttributeStatus(scope.row)"
                            :disabled='!scope.row.canInvalid'
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
import { updateAttributeStatus } from '../api/index'
import { mapState } from 'vuex'
export default {
    name: 'attributeTable',
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
        updateAttributeStatus (row) {
            const params = {
                parameterIds: [row.id],
                status: row.status === 1 ? 2 : 1
            }
            this._updateAttributeStatus(params)
        },
        updateAttributeMultiStatus (ids, status) {
            if (ids.length > 0) {
                const params = {
                    parameterIds: ids,
                    status: status
                }
                this._updateAttributeStatus(params)
            } else {
                this.$message({
                    showClose: true,
                    message: '请先选择属性！',
                    type: 'warning'
                })
            }
        },
        async _updateAttributeStatus (params) {
            params.updateBy = this.userInfo.employeeName
            await updateAttributeStatus(params)
            this.$message({
                message: params.status === 2 ? '属性已失效！' : '属性已生效！',
                type: 'success'
            })
            this.$emit('updateStatus')
        },
        modify (row) {
            this.$emit('updateAttribute', row)
        },
        handleSizeChange (val) {
            this.loading = true
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val)
        },
        openMark () {
            this.$emit('openMark', 'add')
        },
        indexMethod (index) {
            return this.paginationData.pageSize * (this.paginationData.pageNumber - 1) + index + 1
        }
    }
}
</script>

<style scoped>
.header{
    background: #f0f0f0;
    margin: 10px 0;
}
.status-on{
    color: #999999;
}
.parameter-link {
    color: #409EFF;
    cursor: pointer;
}
.invalid-status {
    color: #ccc;
}
.valid-status {
    color: #FF7A45;
}
</style>
