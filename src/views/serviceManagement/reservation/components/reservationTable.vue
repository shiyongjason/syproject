<template>
    <div class="page-body-cont">
        <el-table :data="tableData" border ref="attributeTable" @selection-change="selectionChange" style="width: 100%">
            <el-table-column type="selection" label="序号" align="center">
            </el-table-column>
            <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="60">
            </el-table-column>
            <el-table-column prop="sourceName" label="渠道名称" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.sourceName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单号" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.orderId }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="reservationNo" label="预约单号" align="center">
                <template slot-scope="scope">
                    {{scope.row.reservationNo ? scope.row.reservationNo : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="reservationPerson" label="姓名">
                <template slot-scope="scope">
                    {{ scope.row.reservationPerson }}
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
                <template slot-scope="scope">
                    {{ scope.row.phone }}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址">
                <template slot-scope="scope">
                    {{ scope.row.address }}
                </template>
            </el-table-column>
            <el-table-column prop="reservationMethod" label="预约方式" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.reservationMethod == 1">公众号预约</span>
                    <span v-if="scope.row.reservationMethod == 2">电话预约</span>
                    <span v-if="scope.row.reservationMethod == 3">管家预约</span>
                </template>
            </el-table-column>
            <el-table-column prop="reservationName" label="预约内容" align="center">
                <template slot-scope="scope">
                    {{ scope.row.reservationName }}
                </template>
            </el-table-column>
            <el-table-column label="预约时间" align="center">
                <template slot-scope="scope">
                    {{ scope.row.startTime + scope.row.endTime}}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="onEdit(scope.row)" class="orangeBtn">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination class="el-page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" :page-sizes="[10,20,30,40,50]" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.totalElements">
            </el-pagination>
        </div>
        <el-dialog :title="title" :visible.sync="dialogTableVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="订单号">
                    <el-input v-model="form.parameterName" placeholder="请输入订单号" maxlength="25" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="预约单号">
                    <el-input v-model="form.parameterName" placeholder="请输入预约单号" maxlength="25" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="预约内容">
                    <el-input v-model="form.parameterName" placeholder="请输入预约内容" maxlength="25" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.parameterName" placeholder="请输入姓名" maxlength="25" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item prop="type" label="渠道名称">
                    <el-select v-model="form.type" style="width: 300px">
                        <el-option label="有赞商城" :value="1"></el-option>
                        <el-option label="孩子王成长家" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="type" label="商品名称">
                    <el-select v-model="form.type" style="width: 300px">
                        <el-option label="清洗服务" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号" v-if="form.type ===1">
                    <el-input v-model="form.unit" placeholder="请输入手机号" maxlength="10" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="地址" v-if="form.type ===1">
                    <el-input v-model="form.unit" placeholder="请输入地址" maxlength="10" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item prop="type" label="预约方式">
                    <el-select v-model="form.type" style="width: 300px">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="公众号预约" value="1"></el-option>
                        <el-option label="电话预约" value="2"></el-option>
                        <el-option label="管家预约" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="type" label="预约状态">
                    <el-select v-model="form.type" style="width: 300px">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已预约（未确认）" value="1"></el-option>
                        <el-option label="已预约（已确认）" value="2"></el-option>
                        <el-option label="已完成" value="3"></el-option>
                        <el-option label="取消" value="4"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" v-show="show">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import { findRecordDetail } from '../api/index'
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
            title: '修改预约单',
            show: false,
            form: {
                parameterName: '',
                unit: '',
                type: ''
            },
            rules: {}
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
        async onEdit (row) {
            console.log(row)
            this.show = true
            this.dialogTableVisible = true
            // const { data } = await findRecordDetail(row.id)
            // console.log(data)
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
/deep/ .el-form{
    display: flex;
    flex-wrap: wrap;
}
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
