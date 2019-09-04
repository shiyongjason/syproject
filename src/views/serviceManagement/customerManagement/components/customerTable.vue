<template>
    <div class="customerTable">
        <el-table :data="tableData" border style="width: 100%" size="small">
            <el-table-column type="index" :index="indexMethod" label="序号" align="center" width="60"></el-table-column>
            <el-table-column align="center" label="渠道名称">
                <template slot-scope="scope">
                    <span>{{getTypes('channelType',scope.row.channelType)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="姓名">
                <template slot-scope="scope">
                    <span class="name" @click="onEdit(scope.row,'detail')">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="手机号"></el-table-column>
            <el-table-column prop="wechatId" align="center" label="微信号"></el-table-column>
            <el-table-column prop="key" align="center" label="客户身份">
                <template slot-scope="scope">
                    <span>{{getTypes('role',scope.row.role)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" align="center" property="date" label="创建时间">
                <template slot-scope="scope">
                    {{ formatTime(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="key" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type='primary' @click="onEdit(scope.row)" size="mini">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'customerTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        pageSize: {
            type: Number
        },
        pageNumber: {
            type: Number
        },
        channelType: {
            type: Array
        },
        role: {
            type: Array
        }

    },
    data () {
        return {
        }
    },
    methods: {
        getTypes (obj, key) {
            let query = key + 1
            return this[obj][query].label
        },
        indexMethod (index) {
            return this.pageSize * (this.pageNumber - 1) + index + 1
        },
        onEdit (row, type) {
            if (type) this.$emit('edit', row, type)
            else this.$emit('edit', row)
        },
        formatTime (time, type) {
            let dateType = 'YYYY-MM-DD HH:mm:ss'
            type && (dateType = type)
            return moment(time).format(dateType)
        }
    },
    mounted () {}
}
</script>

<style lang='scss' scoped>
.name{ color:#0099FF; cursor: pointer;}
</style>