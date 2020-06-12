<template>
    <div class="hosjoy-table" ref="hosTable">
        <div v-if="collapseShow">
            <div class="collapse">
                <img src="../../../src/assets/images/typeIcon.png" alt="" class="collapse"
                     @click="collapse = !collapse">
            </div>
            <el-collapse-transition>
                <div class="collapse-content" v-if="collapse">
                    <el-tree
                        :data="switchLabel"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree"
                        highlight-current
                        check-on-click-node
                        :default-checked-keys="defaultLabel"
                        @check-change="checkHandler"
                        :props="defaultProps">
                    </el-tree>
                </div>
            </el-collapse-transition>
        </div>
        <el-table ref="hosjoyTable" v-bind="$attrs" v-on="$listeners" :data="data"
                  :height=" height || `calc(100vh - ${selfHeight}px)`"
                  class="hosjoy-in-table"
                  :span-method="this.merge ? this.mergeMethod : this.spanMethod" :row-class-name="tableRowClassName">
            <el-table-column v-if="isShowselection" type="selection" align="center" :selectable="selectable">
            </el-table-column>
            <el-table-column type="expand" v-if="expand" align="center">
                <template slot-scope="scope">
                    <slot name="expand" :data="scope"></slot>
                </template>
            </el-table-column>
            <el-table-column v-if="isShowIndex" type="index" class-name="allowDrag" label="序号" :index="indexMethod"
                             align="center" width="60"></el-table-column>
            <template v-for="(item, index) in column">
                <el-table-column :label="item.label" :align="item.align? item.align: 'center'" :prop="item.prop"
                                 :key='index' :width="item.width" :min-width="item.minWidth"
                                 :class-name="item.className" :fixed="item.fixed" v-if="item.slot">
                    <template slot-scope="scope">
                        <slot :name="item.prop" :data="scope"></slot>
                    </template>
                </el-table-column>
                <hosjoy-column ref="hosjoyColumn" v-bind="$attrs" :column="item" :key='index'
                               v-if="!item.slot && !item.isHidden"></hosjoy-column>
            </template>
            <el-table-column label="操作" v-if="isAction" align="center" :min-width="actionWidth" class-name="allowDrag">
                <template slot-scope="scope">
                    <slot class="action" name="action" :data="scope"></slot>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages">
            <el-pagination v-if="showPagination" :current-page.sync="currentPage" :page-size.sync="pageNum"
                           :page-sizes="pageSizes" :layout="layout" :total="total" v-bind="$attrs"
                           @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
        </div>
    </div>
</template>

<script>
import hosjoyColumn from './hosjoy-column'
import { mapState } from 'vuex'

export default {
    props: {
        isShowselection: { type: Boolean, default: () => false },
        isAction: { type: Boolean, default: () => false },
        isShowIndex: { type: Boolean, default: () => false },
        expand: { type: Boolean, default: () => false },
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
        pageSizes: {
            type: Array,
            default () {
                return [10, 20, 50, 100]
            }
        },
        layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
        actionWidth: { type: String, default: '' },
        height: { required: false },
        collapseShow: {
            required: false,
            type: Boolean,
            default: false
        }
    },
    components: {
        hosjoyColumn
    },
    data () {
        return {
            mergeLine: {},
            mergeIndex: {},
            selfHeight: 0,
            collapse: false,
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            defaultLabel: [],
            selectedColumn: [],
            userNameLog: ''
        }
    },
    created () {
        this.getMergeArr(this.data, this.merge)
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
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
        },
        switchLabel () {
            let id = null
            return this.column.map(value => {
                if (value.prop) {
                    id = value.prop
                } else {
                    id = value.label
                }
                return {
                    id: id,
                    label: value.label,
                    children: value.children && value.children.filter(value => value.label !== '-').map(value1 => {
                        if (value1.prop) {
                            id = value1.prop
                        } else {
                            id = value1.label
                        }
                        return {
                            id: id,
                            label: value1.label
                        }
                    })
                }
            })
        }
    },
    methods: {
        hiddenOverflowTooltip (row) {
            if (row.column.showOverflowTooltip) {
                return 'hiddenOverflowTooltip'
            }
        },
        tableRowClassName ({ row }) {
            if (row.cellType === 2) {
                return 'branch-total-row'
            } else if (row.cellType === 3) {
                return 'total-row'
            }
            return ''
        },
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
        },
        collectDefaultId (arr, isRestDefaultLabel) {
            if (!isRestDefaultLabel) {
                this.defaultLabel = []
            }
            arr.forEach(value => {
                this.defaultLabel.push(value.id)
                value.children && this.collectDefaultId(value.children, true)
            })
        },
        checkHandler (item, currentItemChecked) {
            if (!currentItemChecked) {
                const idExist = this.defaultLabel.indexOf(item.id)
                if (idExist > -1) {
                    this.defaultLabel.splice(idExist, 1)
                }
            } else {
                this.defaultLabel.push(item.id)
                this.defaultLabel = [...new Set(this.defaultLabel)]
            }
            sessionStorage.setItem(this.userNameLog, JSON.stringify(this.defaultLabel))
            console.log(this.userNameLog)
            this.$emit('updateLabel', this.userNameLog)
        }
    },
    watch: {
        merge () {
            this.getMergeArr(this.data, this.merge)
        },
        dataLength () {
            this.getMergeArr(this.data, this.merge)
        }
    },
    mounted () {
        this.userNameLog = 'TABLE_USER::' + this.$route.path + this.userInfo.user_name
        const isLoggedIn = JSON.parse(sessionStorage.getItem(this.userNameLog))
        if (isLoggedIn && isLoggedIn.length > 0) {
            this.defaultLabel = isLoggedIn
        } else {
            this.collectDefaultId(this.switchLabel)
            sessionStorage.setItem(this.userNameLog, JSON.stringify(this.defaultLabel))
        }
        this.$nextTick(() => {
            this.selfHeight = this.$refs.hosTable.getBoundingClientRect().top + 80
        })
    }
}

</script>
<style scoped>
    .hosjoy-table {
        position: relative;
    }

    .hosjoy-in-table {
        min-height: 300px;
    }

    .hosjoy-table >>> .el-table .cell {
        font-size: 12px;
    }

    /* .hosjoy-table >>> .el-table .caret-wrapper {
        height: 20px;
    } */
    .hosjoy-table >>> .el-table th {
        color: #000000;
        font-size: 12px;
        font-weight: 400;
    }

    .pages {
        text-align: right;
        margin-top: 20px;
    }

    .pages .el-pagination {
        text-align: right;
    }

    .hosjoy-table >>> .el-table .branch-total-row {
        background: rgb(235, 241, 222);
        font-weight: bold;
    }

    .hosjoy-table >>> .el-table__row--striped.branch-total-row td {
        background: rgb(235, 241, 222);
        font-weight: bold;
    }

    .hosjoy-table >>> .el-table .total-row {
        background: rgb(253, 233, 217);
        font-weight: bold;
    }

    /*.hosjoy-table >>> .el-table .branch-total-row .wisdom-total-background,.hosjoy-table >>> .el-table .branch-total-row .wisdom-total-background:hover {*/
    /*    background: rgb(235, 241, 222);*/
    /*    font-weight: bold;*/
    /*}*/

    /*.hosjoy-table >>> .el-table .wisdom-total-background {*/
    /*    background: rgb(220, 230, 241);*/
    /*}*/
    /*.hosjoy-table >>> .el-table .total-row .wisdom-total-background, .hosjoy-table >>> .el-table .total-row .wisdom-total-background:hover  {*/
    /*    background: rgb(253, 233, 217);*/
    /*    font-weight: bold;*/
    /*}*/
    .collapse {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 10px;
        top: 2px;
        z-index: 1;
        cursor: pointer;
    }

    .collapse-content {
        position: absolute;
        width: 280px;
        top: 35px;
        right: 10px;
        background: #ffffff;
        z-index: 2;
        padding: 10px 18px;
        box-sizing: border-box;
    }

    .hosjoy-table >>> .el-table .branch-total-row {
        background: rgb(235, 241, 222);
        font-weight: bold;
    }

    .hosjoy-table >>> .el-table__row--striped.branch-total-row td {
        background: rgb(235, 241, 222);
        font-weight: bold;
    }

    .hosjoy-table >>> .el-table .total-row {
        background: rgb(253, 233, 217);
        font-weight: bold;
    }

    .hosjoy-table >>> .hiddenOverflowTooltip .cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
