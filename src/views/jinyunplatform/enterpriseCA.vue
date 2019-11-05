<template>
    <div class="tags-wrapper page-body">
        <apply></apply>
        <list></list>
        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <!-- <el-table :data="tableData" ref="multipleTable" border style="width: 100%">
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
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import apply from './components/CAapply'
import list from './components/CAlist'
export default {
    name: 'enterpriseCA',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    components: {
        apply: apply,
        list: list
    },
    data () {
        return {
            queryParams: {},
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
            // const { data } = await findTagsList(this.queryParams)
            // this.tableData = data.records
            // this.paginationData = {
            //     pageNumber: data.current,
            //     pageSize: data.size,
            //     totalElements: data.total
            // }
        },
        async createTags () {
            const params = { ...this.addTags }
            if (params.labelName.length < 1) {
                this.$message({
                    type: 'error',
                    message: '标签名称不能为空'
                })
                return
            }
            params.createBy = this.userInfo.employeeName
            // await createTags(params)
            // this.dialogVisible = false
            // this.addTags.labelName = ''
            // this.onQuery()
        },
        async deleteTags (id) {
            // const params = {
            //     id: id,
            //     updateBy: this.userInfo.employeeName
            // }
            // await deleteTags(params)
            // this.onQuery()
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
        }
    }
}
</script>

<style scoped>
.add-tags-dialog {
    padding-top: 20px;
}
</style>
