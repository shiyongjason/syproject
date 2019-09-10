<template>
    <el-table-column :label="columnData.label" :prop="columnData.prop" :sortable="columnData.sortable" :align="columnData.align?columnData.align:'center'" :min-width="columnData.width?columnData.width:''" :show-overflow-tooltip="true">
        <template slot-scope="scope">
            <slot v-if="columnData.formatter" :name="columnData.prop" :data="scope">{{vNodes.filters[column.filter](scope.row[columnData.prop])}}</slot>
            <slot v-else :name="columnData.prop" :data="scope">{{formatter(scope.row[columnData.prop])}}</slot>
            <!-- <slot v-if="columnData.formatter === 'money'" :name="columnData.prop" :data="scope">
                {{scope.row[columnData.prop] | money}}
            </slot>
            <slot v-else-if="columnData.formatter === 'dateTime'" :name="columnData.prop" :data="scope">
                {{scope.row[columnData.prop] | formatterTime}}</slot>
            <slot v-else-if="columnData.formatter === 'dateTimes'" :name="columnData.prop" :data="scope">
                {{scope.row[columnData.prop] | formatterTimes}}</slot>
            <slot v-else-if="columnData.formatter === 'date'" :name="columnData.prop" :data="scope">
                {{scope.row[columnData.prop] | formatterDate}}</slot>
            <slot v-else :name="columnData.prop" :data="scope">{{formatter(scope.row[columnData.prop])}}</slot> -->
        </template>
        <template v-if="columnData.children">
            <CommonTableColumn :columnData="column" v-for="(column,index) in columnData.children" :key="index" />
        </template>
    </el-table-column>
</template>
<script>
import moment from 'moment'
const tableColumn = {
    name: 'CommonTableColumn',
    props: ['columnData'],
    filters: {
        date: time => {
            if (time) {
                return moment(time).format('YYYY-MM-DD')
            }
            return '-'
        },
        dateTime: time => {
            if (time) {
                return moment(time).format('YYYY-MM-DD HH:mm')
            }
            return '-'
        },
        money (money) {
            if (money) {
                const res = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                return res
            }
            return ''
        }
    },
    data () {
        return {
            vNodes: tableColumn
        }
    },
    methods: {
        formatter (data) {
            return data || data === 0 ? data : this.isBlank ? '' : '-'
        }
    }
}
export default tableColumn
</script>

<style lang="scss" scoped>
.el-pagination {
    margin: 20px auto;
    // float: right;
    // text-align: center;
    text-align: center;
}
/deep/ .el-pagination__editor.el-input {
    width: 50px !important;
}
/deep/ .el-table th {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
    background: rgba(242, 242, 244, 1);
}
// 暂无数据
/deep/ .el-table__empty-block {
    min-height: 49px;
}
/deep/ .el-table__empty-text {
    line-height: 49px;
}
/deep/ .el-table td {
    font-size: 12px;
    &:last-child {
        .cell span:not(:first-child) {
            margin-left: 20px;
        }
    }
}
.action {
    cursor: pointer;
}
</style>
