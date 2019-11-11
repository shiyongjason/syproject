<template>
    <div class="hosjoy-table">
        <el-table ref="hosjoyTable" v-bind="$attrs" v-on="$listeners" :data="data" :span-method="this.merge ? this.mergeMethod : this.spanMethod" >
            <el-table-column v-if="isShowselection" type="selection" align="center" :selectable="selectable">
            </el-table-column>
            <el-table-column v-if="isShowIndex" type="index" label="序号" :index="indexMethod" align="center" width="60"></el-table-column>
            <template v-for="(item, index) in column">
                <el-table-column :label="item.label" align="center" :prop="item.prop" :key="index" v-if="item.slot">
                    <template slot-scope="scope">
                        <slot :name="item.prop" :data="scope"></slot>
                    </template>
                </el-table-column>
                <hosjoy-column v-if="!item.slot" v-bind="$attrs" :column="item" :key="index"></hosjoy-column>
            </template>
            <el-table-column label="操作" v-if="isAction" align="center" :width="actionWidth">
                <template slot-scope="scope">
                    <slot class="action" name="action" :data="scope"></slot>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination v-if="showPagination" :current-page.sync="currentPage" :page-size.sync="pageNum" :page-sizes="pageSizes" :layout="layout" :total="total" v-bind="$attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
import hosjoyColumn from './hosjoy-column'
export default {
    props: {
        actionWidth: { type: String, default: '100' },
        isAction: { type: Boolean, default: () => false },
        isShowselection: { type: Boolean, default: () => false },
        isShowIndex: { type: Boolean, default: () => false },
        column: Array,
        data: Array,
        spanMethod: Function,
        selectable: { type: Function, default: () => true },
        showPagination: { type: Boolean, default: false },
        paginationTop: { type: String, default: '15px' },
        paginationAlign: { type: String, default: 'right' },
        merge: Array,
        total: { required: false, default: 0 },
        /** 页码 */
        pageNumber: { type: Number, default: 1 },
        /** 每页数量 */
        pageSize: { type: Number, default: 10 },
        pageSizes: { type: Array, default () { return [10, 20, 50, 100] } },
        layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' }
    },
    components: {
        hosjoyColumn
    },
    data () {
        return {
            mergeLine: {},
            mergeIndex: {}
        }
    },
    created () {
        this.getMergeArr(this.data, this.merge)
    },
    computed: {
        dataLength () {
            return this.data.length
        },
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
        handleSizeChange (val) {
            this.$emit('pagination', {
                pageNumber: this.currentPage,
                pageSize: val
            })
        },
        handleCurrentChange (val) {
            this.$emit('pagination', {
                pageNumber: val,
                pageSize: this.pageNum
            })
        },
        indexMethod (index) {
            return this.pageNum * (this.currentPage - 1) + index + 1
        },
        //
        clearSelection () {
            this.$refs.hosjoyTable.clearSelection()
        },
        toggleRowSelection (row, selected) {
            this.$refs.hosjoyTable.toggleRowSelection(row, selected)
        },
        toggleAllSelection () {
            this.$refs.hosjoyTable.toggleAllSelection()
        },
        toggleRowExpansion (row, expanded) {
            this.$refs.hosjoyTable.toggleRowExpansion(row, expanded)
        },
        setCurrentRow (row) {
            this.$refs.hosjoyTable.setCurrentRow(row)
        },
        clearSort () {
            this.$refs.hosjoyTable.clearSort()
        },
        clearFilter (columnKey) {
            this.$refs.hosjoyTable.clearFilter(columnKey)
        },
        doLayout () {
            this.$refs.hosjoyTable.doLayout()
        },
        sort (prop, order) {
            this.$refs.hosjoyTable.sort(prop, order)
        },
        paginationCurrentChange (val) {
            this.$emit('p-current-change', val)
        },
        getMergeArr (tableData, merge) {
            if (!merge) return
            this.mergeLine = {}
            this.mergeIndex = {}
            merge.forEach((item, k) => {
                tableData.forEach((data, i) => {
                    if (i === 0) {
                        this.mergeIndex[item] = this.mergeIndex[item] || []
                        this.mergeIndex[item].push(1)
                        this.mergeLine[item] = 0
                    } else {
                        if (data[item] === tableData[i - 1][item]) {
                            this.mergeIndex[item][this.mergeLine[item]] += 1
                            this.mergeIndex[item].push(0)
                        } else {
                            this.mergeIndex[item].push(1)
                            this.mergeLine[item] = i
                        }
                    }
                })
            })
        },
        mergeMethod ({ row, column, rowIndex, columnIndex }) {
            const index = this.merge.indexOf(column.property)
            if (index > -1) {
                const _row = this.mergeIndex[this.merge[index]][rowIndex]
                const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        }
    },
    watch: {
        merge () {
            this.getMergeArr(this.data, this.merge)
        },
        dataLength () {
            this.getMergeArr(this.data, this.merge)
        }
    }
}

</script>
<style scoped>
.hosjoy-table >>> .el-table .cell {font-size: 12px;}
.hosjoy-table >>> .el-table .caret-wrapper {height: 20px;}
.hosjoy-table >>> .el-table th {color: #000000;font-size: 12px;font-weight: 400;}
.page{ text-align: right;margin-top:20px}
</style>
