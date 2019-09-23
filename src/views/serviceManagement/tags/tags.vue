<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">标签名：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.keywords" placeholder="请输入标签名">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="dialogVisible = true">
                    新建标签
                </el-button>
                <!--<el-button type="primary" class="ml20" @click="deleteTags(multipleSelection.toString())">批量删除</el-button>-->
            </div>
        </div>
        <div class="page-body-cont">
            <el-table :data="tableData" ref="multipleTable" border style="width: 100%">
                <!--@selection-change="handleSelectionChange"-->
                <!--<el-table-column-->
                    <!--type="selection"-->
                    <!--width="55"></el-table-column>-->
                <el-table-column prop="labelName" label="标签名" align="center">
                </el-table-column>
                <el-table-column prop="userNumbers" label="客户使用人数" align="center">
                </el-table-column>
                <el-table-column label="标签类型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.labelType === 1 ? '手动标签' : '自动标签'}}
                    </template>
                </el-table-column>
                <el-table-column prop="sourceName" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="deleteTags(scope.row.id)" class="orangeBtn">删除</el-button>
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
        <el-dialog title="新建标签" :visible.sync="dialogVisible">
            <div class="add-tags-dialog">
                <div class="query-cont-col">
                    <div class="query-col-title">标签名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="20" v-model="addTags.labelName" placeholder="请输入标签名">
                        </el-input>
                    </div>
                </div>
            </div>
            <div>
                <div class="query-cont-col">
                    <div class="query-col-title">标签类型：</div>
                    <div class="query-col-input">
                        <el-radio v-model="addTags.labelType" label="1">手动标签</el-radio>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="createTags">保 存</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import { findTagsList, createTags, deleteTags } from './api/index'
import { mapState } from 'vuex'
export default {
    name: 'tags',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                keywords: ''
            },
            tableData: [],
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                totalElements: 100
            },
            dialogVisible: false,
            addTags: {
                labelName: '',
                labelType: '1'
            },
            multipleSelection: []
        }
    },
    mounted () {
        this.onQuery()
    },
    methods: {
        async onQuery () {
            const { data } = await findTagsList(this.queryParams)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        async createTags () {
            const params = { ...this.addTags }
            params.createBy = this.userInfo.employeeName
            await createTags(params)
            this.dialogVisible = false
            this.addTags.labelName = ''
            this.onQuery()
        },
        async deleteTags (id) {
            const params = {
                id: id,
                updateBy: this.userInfo.employeeName
            }
            await deleteTags(params)
            this.onQuery()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.onQuery()
        },
        handleSelectionChange (val) {
            this.multipleSelection = val
        },
        cancel () {
            this.dialogVisible = false
            this.addTags.labelName = ''
        }
    }
}
</script>

<style scoped>
.add-tags-dialog {
    padding-top: 20px;
}
</style>
