<template>
    <div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="gotoProductAdd">
                    新增商品
                </el-button>
                <el-button type="primary" class="ml20" @click="onChangeStatus(1)">批量上架</el-button>
                <el-button type="primary" class="ml20" @click="onChangeStatus(2)">批量下架</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <el-table :data="tableData" border ref="brandTable" @selection-change="selectionChange" style="width: 100%">
                <el-table-column type="selection" align="center">
                </el-table-column>
                <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="60">
                </el-table-column>
                <el-table-column prop="productCode" align="center" label="商品编码spu">
                </el-table-column>
                <el-table-column align="center" label="商品名称">
                    <template slot-scope="scope">
                        <a @click="modify(scope.row)" class="isLink"><span style="word-break: break-all;white-space:pre-wrap;line-height: 20px">{{scope.row.productName}}</span></a>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="品牌">
                    <template slot-scope="scope">
                        {{scope.row.brandName}}{{scope.row.brandNameEn}}
                    </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="商品类目">
                </el-table-column>
                <el-table-column prop="sourceName" align="center" label="商品来源">
                </el-table-column>
                <el-table-column label="商品状态" align="center">
                    <template slot-scope="scope">
                        <span class="valid-status" v-if="scope.row.status == 1">上架</span>
                        <span class="invalid-status" v-else>下架</span>
                    </template>
                    <!--{{scope.row.status === 1 ? '上架' : '下架'}}-->
                </el-table-column>
                <el-table-column prop="updateBy" align="center" label="维护人">
                </el-table-column>
                <el-table-column align="center" label="维护时间">
                    <template slot-scope="scope">
                        {{ scope.row.updateTime | formatterTime }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="modify(scope.row)" class="orangeBtn">修改</el-button>
                        <!--:class="scope.row.status === 1 ? 'status-on' : ''"-->
                        <el-button class="orangeBtn" @click="onChangeStatusSingle(scope.row)" v-text="scope.row.status === 1 ? '下架' : '上架'">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page clearfix" style="text-align: center;margin-top: 20px">
                <el-pagination class="el-page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" :page-sizes="[10,20,30,40,50]" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.totalElements">
                </el-pagination>
            </div>
        </div>
    </div>

</template>

<script>
import { updateProductStatus } from '../api/index.js'
import { mapState } from 'vuex'
export default {
    name: 'shopManagerTable',
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
            selectIds: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        selectionChange (val) {
            this.selectIds = val.map(item => item.id)
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
        },
        async onChangeStatusSingle (row) {
            await updateProductStatus({
                productIds: [row.id],
                status: row.status === 2 ? 1 : 2,
                requestSource: 1,
                updateBy: this.userInfo.employeeName
            })
            this.$emit('updateStatus')
        },
        async onChangeStatus (status) {
            if (this.selectIds.length < 1) {
                this.$message({
                    showClose: true,
                    message: '请先选择商品！',
                    type: 'warning'
                })
            } else {
                await updateProductStatus({
                    productIds: this.selectIds,
                    status,
                    requestSource: 1,
                    updateBy: this.userInfo.employeeName
                })
                this.$emit('updateStatus')
            }
        },
        gotoProductAdd () {
            this.$router.push({
                path: '/b2b/selectCategory',
                query: {
                    status: 'add',
                    type: 'add'
                }
            })
        },
        modify (row) {
            this.$router.push({
                path: '/b2b/selectCategory',
                query: {
                    id: row.id,
                    status: 'add'
                }
            })
        }
    }
}
</script>

<style scoped>
.status-on {
    color: #999;
}
.invalid-status {
    color: #ccc;
}
.valid-status {
    color: #ff7a45;
}
.brand-link {
    color: #409eff;
    cursor: pointer;
}
</style>
