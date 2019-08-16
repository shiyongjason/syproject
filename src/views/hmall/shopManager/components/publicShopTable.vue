<template>
    <div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="openMark()">
                    添加共享商品类目
                </el-button>
                <el-button type="primary" class="ml20" @click="openMark(selectId,1)">批量删除</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <el-table :data="tableData"
                      border
                      style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="merchantName"
                    align="center"
                    label="平台公司名称">
                </el-table-column>
                <el-table-column
                    prop="shareMerchantName"
                    align="center"
                    label="共享平台公司名称">
                </el-table-column>
                <el-table-column
                    prop="shareCategoryName"
                    align="center"
                    label="共享类目名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="状态">
                    <template  slot-scope="scope">
                        <span v-text="scope.row.isEnable === 0 ? '停用' : '启动'"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="modifyOperator"
                    align="center"
                    label="维护人">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="维护时间">
                    <template slot-scope="scope">
                        {{scope.row.modifyTime | formatterTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status === 0" class="orangeBtn"
                                   @click="showDialog(scope.row,'review')">停用
                        </el-button>
                        <el-button v-if="scope.row.status === 9" class="orangeBtn"
                                   @click="showDialog(scope.row,'review')">启用
                        </el-button>
                        <el-button v-if="scope.row.status != 0" class="orangeBtn"
                                   @click="showDialog(scope.row,'watch')">删除
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
                    :onQuery="onQuery"
                    :total="paginationData.totalElements">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="添加共享商品类目" :visible.sync="addCategoryDialog">
            <div class="dialog-query">
                <div class="dialog-query-cont-col">
                    <div class="query-col-title">选择平台公司：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  maxlength="50" placeholder="请选择"></el-input>
                    </div>
                </div>
                <div class="dialog-query-cont-col">
                    <div class="query-col-title">选择共享平台公司：</div>
                    <div class="query-col-input">
                        <el-input type="text"
                                  maxlength="50" placeholder="请选择"></el-input>
                    </div>
                </div>
            </div>
            <el-transfer v-model="publicModel" :data="publicData" class="transfer"></el-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">确认</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
                <el-button type="primary" @click="addCategoryDialog = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { updatePublicShop } from '../api'

export default {
    name: 'publicShopTable',
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
        const generateData = _ => {
            const data = []
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`,
                    disabled: i % 4 === 0
                })
            }
            return data
        }
        return {
            addCategoryDialog: false,
            publicModel: [],
            publicData: generateData()
        }
    },
    methods: {
        reset () {
            console.log(1)
        },
        onQuery () {
            this.$emit('onQuery')
        },
        handleSizeChange (val) {
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.$emit('onCurrentChange', val)
        },
        openMark () {
            this.addCategoryDialog = true
        },
        handleSelectionChange (val) {
            console.log(val)
        },
        async updatePublicShop () {
            const params = {}
            const { data } = await updatePublicShop(params)
            console.log(data)
        }
    }
}
</script>

<style lang="scss" scoped>
.dialog-query {
    display: flex;
    justify-content: space-around;
    .dialog-query-cont-col{
        display: flex;
        padding: 20px 0;
        .query-col-title{
            line-height: 40px;
        }
        .el-input{
            width: 160px;
        }
    }
}
.transfer{
    margin-bottom: 20px;
}
</style>
