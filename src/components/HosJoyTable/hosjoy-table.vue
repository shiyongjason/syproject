<template>
    <div class="hosjoy-table" ref="hosTable">
        <!-- 筛选 -->
        <div v-if="collapseShow">
            <div class="collapse" :class="collapse ? 'on' : ''">
                <el-button class="save-btn" type="mini" @click="updateLabel" v-if="collapse === true">保存</el-button>
                <img src="../../../src/assets/images/typeIcon.png" alt="" @click="collapse = !collapse">
            </div>
            <el-collapse-transition>
                <div class="collapse-content" v-if="collapse">
                    <el-tree :data="switchLabel" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current check-on-click-node :default-checked-keys="defaultLabel" @check-change="checkHandler" :props="defaultProps">
                    </el-tree>
                </div>
            </el-collapse-transition>
        </div>
        <!-- 大表哥 :summary-method="getSummary" :show-summary="showSummary"-->
        <el-table v-if="toggleTable" ref="hosjoyTable" v-bind="$attrs" v-on="$listeners" :data="data" :height=" height || `calc(100vh - ${selfHeight}px)`" class="hosjoy-in-table" :span-method="this.merge ? this.mergeMethod : this.spanMethod" :row-class-name="tableRowClassName">
            <el-table-column v-if="isShowselection" type="selection" align="center" :selectable="selectable">
            </el-table-column>
            <el-table-column type="expand" v-if="expand" align="center">
                <template slot-scope="scope">
                    <slot name="expand" :data="scope"></slot>
                </template>
            </el-table-column>
            <el-table-column v-if="isShowIndex" type="index" class-name="allowDrag" label="序号" :index="indexMethod" align="center" width="60"></el-table-column>
            <template v-for="(item) in getColumn()">
                <el-table-column :label="item.label" :align="item.align? item.align: 'center'" :prop="item.prop" :key='item.label + item.prop' :width="item.width" :min-width="item.minWidth" :class-name="item.className" :fixed="item.fixed"
                    v-if="item.slot && !item.isHidden && !item.selfSettingHidden">
                    <template slot-scope="scope">
                        <slot :name="item.prop" :data="scope"></slot>
                    </template>
                </el-table-column>
                <hosjoy-column ref="hosjoyColumn" v-bind="$attrs" :column="item" :key='item.label + item.prop' v-if="!item.slot && !item.isHidden && !item.selfSettingHidden"></hosjoy-column>
            </template>
            <el-table-column label="操作" v-if="isAction" align="center" :min-width="actionWidth" class-name="allowDrag" :fixed="isActionFixed?'right':false">
                <template slot-scope="scope">
                    <slot class="action" name="action" :data="scope"></slot>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pages">
            <el-pagination v-if="showPagination" :current-page.sync="currentPage" :page-size.sync="pageNum" :page-sizes="pageSizes" :layout="layout" :total="total" v-bind="$attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
import hosjoyColumn from './hosjoy-column'

export default {
    props: {
        // summaryMerge: { type: String, default: '1' },
        // showSummary: { type: Boolean, default: () => false },
        // summary: { type: Array, default: () => ([]) },
        isShowselection: { type: Boolean, default: () => false },
        isAction: { type: Boolean, default: () => false },
        // toggleTable: { type: Boolean, default: () => true },
        isShowIndex: { type: Boolean, default: () => false },
        expand: { type: Boolean, default: () => false },
        column: Array,
        data: Array,
        spanMethod: Function,
        selectable: { type: Function, default: () => true },
        showPagination: { type: Boolean, default: false },
        isActionFixed: { type: Boolean, default: false }, // 操作列是否固定，如果该列使用自定义render可以不用写
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
        },
        localName: {
            required: false,
            type: String,
            default: 'TABLE::'
        }
    },
    components: {
        hosjoyColumn
    },
    data () {
        return {
            i: 0,
            toggleTable: true,
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
            columnRender: []
        }
    },
    created () {
        this.getMergeArr(this.data, this.merge)
    },
    computed: {
        dataLength () {
            if (this.data) {
                return this.data.length
            }
            return ''
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
            return this.column.filter(value => !value.selfSettingHidden).map(value => {
                let id = null
                if (value.prop && value.label) {
                    id = value.prop
                } else if (value.label) {
                    id = value.label
                }
                if (id) {
                    return {
                        id: id,
                        label: value.label,
                        children: value.children && value.children.filter(value => value.label !== '-' && !value.selfSettingHidden).map(value1 => {
                            let subId = id + (value1.uniqueLabel || value1.prop || value1.label)
                            return {
                                id: subId,
                                label: value1.uniqueLabel || value1.label
                            }
                        })
                    }
                } else {
                    // 第一行为空的情况,目前没有其他情况
                    return {
                        id: value.prop,
                        label: value.children[0].label
                    }
                }
            })
        },
        userNameLog () {
            return this.localName + this.$route.path
        }
    },
    methods: {
        /* getSummary () {
            // todo use: show-summary :summary=sums summary-merge='3'
            if (!this.showSummary && this.summary.length > 0) return null
            setTimeout(() => {
                if (this.i > 0) return
                let foot = document.querySelectorAll('.el-table__footer')
                let copyFoot = foot[0].cloneNode(true)
                let totalTd = copyFoot.querySelectorAll('tbody>tr>td')
                totalTd[0].setAttribute('colspan', this.summaryMerge)
                document.querySelector('.el-table__header-wrapper').appendChild(copyFoot)
                // document.querySelector('.el-table__footer-wrapper').removeChild(foot[0])
                if (foot[0]) foot[0].style.display = 'none'
                if (foot[1]) foot[1].style.display = 'none'
                let n = document.querySelectorAll('.el-table__footer')
                this.selfHeight = this.$refs.hosTable.getBoundingClientRect().top + n[0].clientHeight
                this.i++
                this.doLayout()
            }, 300)
            return this.summary
        }, */
        getColumn () {
            if (this.collapseShow) {
                return this.columnRender
            }
            return this.column
        },
        async updateLabel () {
            if (this.defaultLabel.length < 2) {
                this.$message.warning('选中不能小于2个')
            } else {
                localStorage.setItem(this.userNameLog, JSON.stringify(this.defaultLabel))
                this.toggleTable = false
                this.$nextTick(() => {
                    this.toggleTable = true
                })
                this.dealUpdateLabel(this.defaultLabel)
                this.collapse = false
            }
        },
        dealUpdateLabel (val) {
            this.columnRender.forEach(value => {
                const showColumnLabel = JSON.parse(localStorage.getItem(this.userNameLog))
                value.isHidden = showColumnLabel.indexOf(value.prop || value.label) === -1
                if (value.children) {
                    let number = 0
                    let ID = ''
                    if (value.prop && value.label) {
                        ID += value.prop
                    } else if (value.label) {
                        ID += value.label
                    }
                    value.children.forEach(value1 => {
                        let subId = ID + (value1.uniqueLabel || value1.prop || value1.label)
                        value1.isHidden = showColumnLabel.indexOf(subId) === -1
                        if (!value1.isHidden) number++
                    })
                    value.isHidden = !(number > 0)
                }
            })
            this.toggleTable = false
            this.$nextTick(() => {
                this.toggleTable = true
                // if (this.showSummary) {
                //     this.i = 0
                //     this.getSummary()
                // }
            })
        },
        toggleTableHandler () {
            this.toggleTable = !this.toggleTable
        },
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
            this.$refs.hosjoyTable && this.$refs.hosjoyTable.doLayout()
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
        },
        isArray (object) {
            return Array.isArray(object)
        },
        isObject (object) {
            return typeof object === 'object'
        },
        deepCopy (object) {
            let resultObject = {}
            // 如果是数组
            if (this.isArray(object)) {
                return object.map(item => {
                    if (this.isArray(item) || this.isObject(item)) {
                        return this.deepCopy(item)
                    }
                    return item
                })
            } else if (this.isObject(object)) {
                Object.entries(object).map(([key, value]) => {
                    if (value && (this.isArray(value) || this.isObject(value))) {
                        resultObject[key] = this.deepCopy(value)
                    } else {
                        resultObject[key] = value
                    }
                })
            }
            return resultObject
        }
    },
    watch: {
        merge () {
            this.getMergeArr(this.data, this.merge)
        },
        dataLength () {
            this.getMergeArr(this.data, this.merge)
        },
        switchLabel: {
            handler () {
                const isLoggedIn = JSON.parse(localStorage.getItem(this.userNameLog))
                if (isLoggedIn && isLoggedIn.length > 0) {
                    this.defaultLabel = isLoggedIn
                    this.$forceUpdate()
                } else {
                    this.collectDefaultId(this.switchLabel)
                    localStorage.setItem(this.userNameLog, JSON.stringify(this.defaultLabel))
                }
            },
            deep: true,
            immediate: true
        },
        column: {
            handler (val) {
                if (this.collapseShow) {
                    this.columnRender = this.deepCopy(val)
                    this.dealUpdateLabel(this.columnRender)
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.selfHeight = this.$refs.hosTable.getBoundingClientRect().top + 80
        })
    }
}

</script>
<style scoped lang="scss">
.hosjoy-table {
    position: relative;
}

.hosjoy-in-table {
    min-height: 300px;
    position: relative;
    z-index: 1;
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
    box-sizing: border-box;
    padding: 10px 15px;
    width: 280px;
    height: 50px;
    right: 10px;
    top: -10px;
    z-index: 2;
    cursor: pointer;
    img {
        float: right;
        width: 20px;
        margin-top: 10px;
        margin-right: 10px;
    }
    /deep/.el-button--mini {
        float: left;
        margin-top: 4px;
    }
}
.on {
    background: #ffffff;
}

.collapse-content {
    position: absolute;
    width: 280px;
    top: 40px;
    right: 10px;
    background: #ffffff;
    z-index: 2;
    padding: 5px 10px;
    box-sizing: border-box;
    max-height: 400px;
    overflow: hidden;
    overflow-y: scroll;
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
.hosjoy-table >>> .el-tree-node__label {
    margin-left: 6px;
}
.hosjoy-table >>> .el-table__fixed-right {
    background: #f5f7fa;
}
.hosjoy-table >>> .el-table thead.has-gutter th {
    background: #f5f7fa;
}
.hosjoy-table >>> .el-table th {
    background: #f5f7fa;
}
</style>
