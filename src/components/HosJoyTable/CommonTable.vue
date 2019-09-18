<template>
    <div class="page-table clearfix">
        <!-- 列表 -->
        <el-table :data="tableData" border stripe :lazy="true" @sort-change="handleSortChange" @selection-change="handleSelectionChange" :tree-props="{ hasChildren: 'hasChildren' }" :row-key="rowKey" :indent="4">
            <el-table-column v-if="isMultiple" type="selection" align="center" :selectable="selectable"></el-table-column>
            <el-table-column v-if="isShowIndex" type="index" label="序号" :index="indexMethod" align="center" width="60"></el-table-column>
            <el-table-column type="expand" v-if="tableLabel.expand" align="center">
                <template slot-scope="scope">
                    <slot name="expand" :data="scope"></slot>
                </template>
            </el-table-column>
            <CommonTableColumn :columnData="columnData" :dicData="columnData.dicData||[]" v-for="(columnData,index) in tableLabel" :key="index" />
            <el-table-column label="操作" align="center" v-if="tableLabel.isAction" :min-width="minWidth">
                <template slot-scope="scope">
                    <slot class="action" name="action" :data="scope"></slot>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pages">
            <el-pagination :current-page.sync="currentPage" :page-size.sync="pageNum" :page-sizes="pageSizes" :layout="layout" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script>
import CommonTableColumn from '@/components/CommonTable/CommonTableColumn'
// TODO 还没封装好。
export default {
    name: 'CommonTable',
    components: {
        CommonTableColumn
    },
    data () {
        return {
            minWidth: '',
            paginationInfo: {}
        }
    },
    props: {
        isMultiple: { type: Boolean, default: false },
        isAction: { type: Boolean, default: false },
        isPagination: { type: Boolean, default: true },
        isShowIndex: { type: Boolean, default: false },
        isBlank: { type: Boolean, default: false, desc: '当数据为空的时候是否空白显示，false的时候默认显示为-' },
        tableData: { type: Array, default: () => [] },
        tableLabel: { type: Array, default: () => [] },
        multiSelection: { type: Array, default: () => [] },
        actionMinWidth: { type: Number, default: 100 },
        selectable: { type: Function, default: () => true },
        rowKey: { type: String, default: '' },
        total: { required: true, type: Number },
        /** 页码  */
        pageNumber: { type: Number, default: 1 },
        /** 每页数量  */
        pageSize: { type: Number, default: 10 },
        pageSizes: { type: Array, default () { return [10, 20, 30, 40] } },
        layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' }
    },
    computed: {
        currentPage: {
            get () {
                return this.pageNumber
            },
            set (val) {
                this.$emit('update:pageNumber', val)
            }
        },
        pageNum: {
            get () {
                return this.pageSize
            },
            set (val) {
                this.$emit('update:pageSize', val)
            }
        }
    },
    methods: {
        initWidth () {
            if (this.actionMinWidth) this.minWidth = this.actionMinWidth
        },
        handleSelectionChange (val) {
            this.$emit('update:multiSelection', val)
        },
        handleSortChange (val) {
            this.$emit('onSortChange', val)
        },
        indexMethod (index) {
            return (this.currentPage * (this.pageNum - 1) + index + 1)
        },
        formatter (data) {
            return data || data === 0 ? data : this.isBlank ? '' : '-'
        },
        handleSizeChange (val) {
            this.$emit('pagination', { pageNumber: this.currentPage, pageSize: val })
        },
        handleCurrentChange (val) {
            this.$emit('pagination', { pageNumber: val, pageSize: this.pageNum })
        }
    },
    mounted () {
        this.initWidth()
    }
}
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
