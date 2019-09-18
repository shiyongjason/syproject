<template>
    <div class="page-body-cont">
        <el-table :data="tableData" border ref="attributeTable" @selection-change="selectionChange" style="width: 100%">
            <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="60">
            </el-table-column>
            <el-table-column prop="archiveTemplateId" label="档案ID" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.archiveTemplateId }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center" width='120'>
                <template slot-scope="scope">
                    {{scope.row.mobile ? scope.row.mobile : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址" align="center">
                <template slot-scope="scope">
                    {{ scope.row.address }}
                </template>
            </el-table-column>
            <el-table-column prop="roomType" label="房型" align="center">
                <template slot-scope="scope">
                    {{ scope.row.roomType }}
                </template>
            </el-table-column>
            <el-table-column prop="population" label="人口" align="center">
                <template slot-scope="scope">
                    {{ scope.row.population }}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                    {{ scope.row.createTime | formatterTime }}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width='180'>
                <template slot-scope="scope">
                    <el-button @click="onShow(scope.row)" class="orangeBtn">查看</el-button>
                    <el-button @click="onEdit(scope.row)" class="orangeBtn">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination class="el-page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" :page-sizes="[10,20,30,40,50]" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.totalElements">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { findRecordDetail } from '../api/index'
export default {
    name: 'customerRecordTable',
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
            selectId: [],
            activeName: '1',
            data: [],
            childArchiveNodes: []
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
        async onShow (row) {
            this.$router.push({ path: 'customerRecordDetail', query: { id: row.id, action: 'show' } })
            // const { data } = await findRecordDetail(row.id)
            // // console.log(data)
            // this.data = data.childArchiveNodes
            // this.childArchiveNodes = data.childArchiveNodes[this.activeName - 1].childArchiveNodes
            // console.log(this.childArchiveNodes)
        },
        async onEdit (row) {
            this.$router.push({ path: 'customerRecordDetail', query: { id: row.id, action: 'edit' } })
            const { data } = await findRecordDetail(row.id)
        },
        handleClick () {
            this.childArchiveNodes = this.data[this.activeName - 1].childArchiveNodes
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

<style lang="scss" scoped>
/deep/ .el-dialog {
    width: 100%;
    height: 100%;
}
table {
    border-collapse: collapse;
}
table td,
table th {
    text-align: center;
}
.header {
    background: #f0f0f0;
    margin: 10px 0;
}
.status-on {
    color: #999999;
}
.parameter-link {
    color: #409eff;
    cursor: pointer;
}
.invalid-status {
    color: #ccc;
}
.valid-status {
    color: #ff7a45;
}
</style>
