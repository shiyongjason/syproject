<template>
    <div class="page-table clearfix">
        <!-- 列表 -->
        <el-table :data="tableData" @selection-change="handleSelectionChange" border stripe :actionMinWidth="actionMinWidth" :span-method="spanMethod" :lazy="true" :max-height="maxHeight" :show-summary="isShowSum" :summary-method="getSum" @sort-change="handleSortChange">
            <el-table-column type="selection" v-if="isMultiple" align="center" :selectable="selectable"></el-table-column>
            <el-table-column v-if="isShowIndex" type="index" label="序号" :index="indexMethod" align="center" width="60"></el-table-column>
            <el-table-column v-for="item in tableLabel" :key="item.label" :label="item.label" :prop="item.prop" :sortable="item.sortable" :align="item.align" :min-width="item.width?item.width:''" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <slot v-if="item.formatter === 'money'" :name="item.prop" :data="scope">{{scope.row[item.prop] | money}}</slot>
                    <slot v-else-if="item.formatter === 'dateTime'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterTime}}</slot>
                    <slot v-else-if="item.formatter === 'dateTimes'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterTimes}}</slot>
                    <slot v-else-if="item.formatter === 'date'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterDate}}</slot>
                    <slot v-else :name="item.prop" :data="scope">{{formatter(scope.row[item.prop])}}</slot>
                </template>
            </el-table-column>

            <el-table-column label="操作" v-if="isAction" align="center" :min-width="minWidth">
                <template slot-scope="scope">
                    <slot class="action" name="action" :data="scope"></slot>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :total="paginationInfo.total" layout="total, prev, pager, next,jumper" :current-page="paginationInfo.pageNumber" :page-size.sync="paginationInfo.pageSize" @current-change="handleCurrentChange" v-if="isPagination && paginationInfo.total"></el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
            minWidth: '',
            paginationInfo: {}
        }
    },
    props: {
        isMultiple: {
            type: Boolean,
            default: false
        },
        isAction: {
            type: Boolean,
            default: false
        },
        isPagination: {
            type: Boolean,
            default: true
        },
        isShowIndex: {
            type: Boolean,
            default: false
        },
        isShowSum: {
            type: Boolean,
            default: false
        },
        isBlank: {
            type: Boolean,
            default: false,
            desc: '当数据为空的时候是否空白显示，false的时候默认显示为-'
        },
        tableData: {
            type: Array,
            default: () => {

            }
        },
        tableLabel: {
            type: Array,
            default: () => {

            }
        },
        pagination: {
            type: Object,
            default: () => {
                return {
                    total: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        },
        multiSelection: {
            type: Array,
            default: () => ([])
        },
        actionMinWidth: {
            type: Number,
            default: 100
        },
        selectable: {
            type: Function,
            default: () => true
        },
        spanMethod: {
            type: Function,
            default: () => true
        },
        getSum: {
            type: Function,
            default: () => true
        },
        maxHeight: {
            type: Number,
            default: 1000
        }
    },
    watch: {
        pagination: {
            handler (val) {
                this.paginationInfo = val
            },
            immediate: true
        }
    },
    methods: {
        initWidth () {
            if (this.actionMinWidth) {
                this.minWidth = this.actionMinWidth
            }
        },
        handleSelectionChange (val) {
            this.$emit('update:multiSelection', val)
        },
        handleCurrentChange (val) {
            this.paginationInfo.pageNumber = val
            this.$emit('onCurrentChange', this.paginationInfo)
        },
        handleSortChange (val) {
            this.$emit('onSortChange', val)
        },
        indexMethod (index) {
            if (this.isPagination) {
                return this.paginationInfo.pageSize * (this.paginationInfo.pageNumber - 1) + index + 1
            } else {
                return index + 1
            }
        },
        formatter (data) {
            return (data || data == 0) || this.isBlank ? data : '-'
        }
    },
    mounted () {
        this.initWidth()
    }
}
</script>

<style lang="scss" scoped>
.el-pagination {
    margin: 20px 0;
    float: right;
    text-align: right;
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