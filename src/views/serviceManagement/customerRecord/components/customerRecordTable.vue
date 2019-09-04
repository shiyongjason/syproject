<template>
    <div class="page-body-cont">
        <el-table :data="tableData" border ref="attributeTable" @selection-change="selectionChange" style="width: 100%">
            <el-table-column type="selection" label="序号" align="center">
            </el-table-column>
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
            <el-table-column prop="mobile" label="手机号" align="center">
                <template slot-scope="scope">
                    {{scope.row.mobile ? scope.row.mobile : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址">
                <template slot-scope="scope">
                    {{ scope.row.address }}
                </template>
            </el-table-column>
            <el-table-column prop="roomType" label="房型">
                <template slot-scope="scope">
                    {{ scope.row.roomType }}
                </template>
            </el-table-column>
            <el-table-column prop="population" label="人口">
                <template slot-scope="scope">
                    {{ scope.row.population }}
                </template>
            </el-table-column>
            <el-table-column label="维护时间" align="center">
                <template slot-scope="scope">
                    {{ scope.row.createTime | formatterTime }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
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
        <el-dialog :title="title" :visible.sync="dialogTableVisible">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane v-for="(value, index) in data" :key="index" :label="value.name" :name="(index + 1).toString()"></el-tab-pane>
            </el-tabs>
            <table class="table-example el-table el-table--border">
                <thead>
                    <tr>
                        <th>区域</th>
                        <th>内容</th>
                        <th>品牌</th>
                        <th>类型</th>
                        <th>型号</th>
                        <th>是否过保</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in childArchiveNodes">
                        <tr v-for="(titem, tindex) in item.childArchiveNodes" :key="tindex+''+index">
                            <td :rowspan="item.childArchiveNodes.length" v-if="tindex == 0">{{item.name}}{{item.childArchiveNodes.length}}</td>
                            <td>{{titem.name}}</td>
                            <td>{{titem.archiveDetail.brand}}</td>
                            <td>{{titem.archiveDetail.mold}}</td>
                            <td>{{titem.archiveDetail.model}}</td>
                            <td>{{titem.archiveDetail.isOverInsured == 0?'是':'否'}}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <span slot="footer" class="dialog-footer" v-show="show">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { findRecordDetail } from '../../api/index'
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
            dialogTableVisible: false,
            activeName: '1',
            data: [],
            childArchiveNodes: [],
            title: '',
            show: false
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
            this.show = false
            this.title = row.name + ' ' + row.mobile
            this.dialogTableVisible = true
            const { data } = await findRecordDetail(row.id)
            // console.log(data)
            this.data = data.childArchiveNodes
            this.childArchiveNodes = data.childArchiveNodes[this.activeName - 1].childArchiveNodes
            console.log(this.childArchiveNodes)
        },
        async onEdit (row) {
            this.show = true
            this.title = row.name + ' ' + row.mobile
            this.dialogTableVisible = true
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

<style>
.el-dialog {
    width: 100%;
    height: 100%;
}
</style>
<style scoped>
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
