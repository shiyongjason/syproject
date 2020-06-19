<template>
    <div>
        <div class="page-body-cont">
            <el-table :data="tableData"
                    border
                    ref="brandTable"
                    style="width: 100%">
                <el-table-column
                    prop="productCode"
                    align="center"
                    label="商品SKU编码">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="商品名称">
                    <template slot-scope="scope">
                        <a class="isLink" @click="goToDetails(scope.row)"><span style="word-break: break-all;white-space:pre-wrap;text-align: center;line-height: 20px">{{ scope.row.productName }}</span></a>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="品牌">
                    <template slot-scope="scope">
                        {{scope.row.brandName}}{{scope.row.brandNameEn}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="categoryName"
                    align="center"
                    label="类目">
                </el-table-column>
                <el-table-column
                    prop="sourceName"
                    align="center"
                    label="平台公司">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="创建时间">
                    <template slot-scope="scope">
                        {{ scope.row.createTime | formatterTime }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="审核时间"
                    align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.checkTime">{{scope.row.checkTime | formatterTime}}</span>
                        <span v-else v-text="'-'"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="checkBy"
                    align="center"
                    label="审核人">
                    <template slot-scope="scope">
                        {{ scope.row.checkBy ? scope.row.checkBy : '-' }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="审核状态"
                    prop="checkStatus"
                    align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.checkStatus === 1">待审核</span>
                        <span v-if="scope.row.checkStatus === 2">审核通过</span>
                        <span v-if="scope.row.checkStatus === 3">审核失败</span>
                        <span v-if="scope.row.checkStatus === 4">审核通过</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button class="orangeBtn"
                                    @click="goToChecked(scope.row)"
                                        v-if="scope.row.checkStatus===1">审核</el-button>
                        <el-button class="orangeBtn"  @click="addShopLibrary(scope.row)"
                                   v-if="scope.row.checkStatus===2">
                            添加到商品库
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
import { addGoods } from '../api/index.js'
import { mapState } from 'vuex'
export default {
    name: 'shopReviewTable',
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
            selectIds: [],
            pageSize: 0
        }
    },
    mounted () {
        console.log(this.userInfo)
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
            this.pageSize = val
            this.$emit('onCurrentChange', val)
        },
        goToChecked (val) {
            console.log(val)
            this.$router.push({
                path: '/b2b/selectCategory',
                query: {
                    id: val.id,
                    status: 'checked'
                }
            })
        },
        async addShopLibrary (val) {
            await addGoods({ 'productId': val.id, 'updateBy': this.userInfo.employeeName })
            this.$emit('onCurrentChange', this.pageSize)
            // this.$router.push({
            //     path: '/b2b/selectCategory',
            //     query: {
            //         id: val.id,
            //         isReview: 'yes'
            //     }
            // })
        },
        goToDetails (val) {
            if (val.checkStatus - 0 === 1) {
                this.$router.push({
                    path: '/b2b/selectCategory',
                    query: {
                        id: val.id,
                        status: 'checked'
                    }
                })
            } else if (val.checkStatus - 0 === 2) {
                this.$router.push({
                    path: '/b2b/selectCategory',
                    query: {
                        id: val.id,
                        status: 'back'// 可返回到审核列表页面
                    }
                })
            } else {
                this.$router.push({
                    path: '/b2b/selectCategory',
                    query: {
                        id: val.id,
                        status: 'details'
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.status-on{
    color: #999;
}
</style>
