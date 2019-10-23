
<template>
    <div class="archiveslist">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" placeholder="请输入平台公司">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">建档时间：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">归档状况：</div>
                    <div class="query-col-input">
                        <el-select v-model="searchParams.searchKey">
                            <el-option label="订单号" value="orderNo"></el-option>
                            <el-option label="外部订单号" value="channelOrderNo"></el-option>
                            <el-option label="姓名" value="userName"></el-option>
                            <el-option label="手机号" value="mobile"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">借阅状况：</div>
                    <div class="query-col-input">
                        <el-select v-model="searchParams.searchKey">
                            <el-option label="订单号" value="orderNo"></el-option>
                            <el-option label="外部订单号" value="channelOrderNo"></el-option>
                            <el-option label="姓名" value="userName"></el-option>
                            <el-option label="手机号" value="mobile"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary">搜索</el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="tabs">
                    <el-tabs v-model="activeName" type="card">
                        <el-tab-pane label="合作中" name="cooperation"></el-tab-pane>
                        <el-tab-pane label="未合作" name="notcooperating"></el-tab-pane>
                        <el-tab-pane label="淘汰" name="eliminate"></el-tab-pane>
                    </el-tabs>
                </div>
                <hosjoyTable border stripe showPagination :show-overflow-tooltip='true' :column="table" :data="tableData" isShowIndex :total="page.total" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" @pagination="getList" />
            </div>
        </div>
        <!--  -->
        <el-dialog center :title="dialog.dialogTitle" :visible.sync="dialog.dialogVisible" :width='dialog.width'>
            <div class="dialogbox">
                <dialogComponent ref="dialogComponent" :item="dialog.item" :dialog='dialog.dialog' ></dialogComponent>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSureDialog">确 定</el-button>
                <el-button type="primary" @click="onSureDialog" v-if="dialog.dialog=='借出档案管理'">确认归还</el-button>
            </span>
        </el-dialog>
        <!--  -->
        <el-dialog title="提示" :visible.sync="deleteVisible" width="500px" class="deldialog">
            <span>您确定删除这一条数据吗？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import hosjoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import dialogComponent from './components/dialogComponent.vue'
import { pagination } from '@/utils/mixins.js'
export default {
    name: 'archivesList',
    components: { hosjoyTable, dialogComponent },
    mixins: [pagination],
    data () {
        return {
            r: '',
            activeName: 'cooperation',
            searchParams: { createTimeEnd: '', createTimeStart: '', searchKey: '' },
            deleteVisible: false,
            table: [
                { label: '档案编号',
                    prop: 'a',
                    render: (h, scope) => {
                        return (
                            <span class='colorypointer' on-click={() => this.openDialog(scope.row, scope.$index, '档案编号')}>
                                {scope.row.a}
                            </span>
                        )
                    } },
                { label: '档案归档',
                    prop: 'b',
                    render: (h, scope) => {
                        if (scope.row.b === 0) {
                            return (
                                <span class='colorrpointer' on-click={() => this.openDialog(scope.row, scope.$index, '档案归档')}>
                                    档案缺失
                                </span>
                            )
                        }
                        if (scope.row.b === 1) {
                            return (
                                <span class='colorypointer' on-click={() => this.openDialog(scope.row, scope.$index, '档案归档')}>
                                    档案齐全
                                </span>
                            )
                        }
                    }
                },
                { label: '借阅情况',
                    prop: 'c',
                    render: (h, scope) => {
                        if (scope.row.c === 0) {
                            return (
                                <span on-click={() => this.openDialog(scope.row, scope.$index, '借阅情况')}>
                                    未借出
                                </span>
                            )
                        }
                        if (scope.row.c === 1) {
                            return (
                                <span class='colorrpointer' on-click={() => this.openDialog(scope.row, scope.$index, '借阅情况')}>
                                    已借出
                                </span>
                            )
                        }
                    }
                },
                { label: '平台公司', prop: 'd' },
                { label: '分部', prop: 'e' },
                { label: 'C档（工商）',
                    prop: 'f',
                    render: (h, scope) => {
                        if (scope.row.f === 0) {
                            return (
                                <span>
                                    <i class="el-icon-close"></i>
                                </span>
                            )
                        }
                        if (scope.row.f === 1) {
                            return (
                                <span class='colorypointer' on-click={() => this.openDialog(scope.row, scope.$index, 'C档（工商）')}>
                                    <i class="el-icon-check"></i>
                                </span>
                            )
                        }
                    } },
                { label: 'B档（签约）',
                    children: [
                        { label: '实控人', prop: 'g' },
                        { label: '自然人股东', prop: 'h' },
                        { label: '投资协议', prop: 'i' },
                        { label: '担保函签约人', prop: 'j' }
                    ]
                },
                { label: 'A档（尽调）', prop: 'k' },
                { label: '建档时间', prop: 'l', displayAs: 'formatterTime' },
                {
                    label: '操作',
                    fixed: 'right',
                    width: '290px',
                    render: (h, scope) => {
                        return (
                            <div>
                                <el-button type="primary" size='small'>档案管理</el-button>
                                <el-button type="primary" size='small' on-click={() => this.openDialog(scope.row, scope.$index, '借出档案管理')}>借出档案管理</el-button>
                                <el-button type="primary" size='small' on-click={() => { this.deleteVisible = true }}>删除</el-button>
                            </div>

                        )
                    }
                }
                /* {
                    label: '销售价',
                    prop: 'sellPrice',
                    sortable: true,
                    // slot: 'sellPrice'
                    // render: (h, scope) => <span>{filters.money(scope.row.sellPrice)}</span>
                    displayAs: 'money'
                } */
            ],
            tableData: [],
            dialog: {
                dialog: '',
                dialogTitle: '',
                item: '',
                dialogVisible: false,
                width: ''
            }
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.searchParams.createTimeEnd)
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.searchParams.createTimeStart)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        getList () {
            console.log('getList', this.queryParams)
        },
        openDialog (item, index, data, width = '600px') {
            this.dialog = {
                dialog: data,
                dialogTitle: `${item.a}-${data}`,
                item,
                dialogVisible: true,
                width
            }
        },
        onSureDialog () {
            this.dialog.dialogVisible = false
            console.log(this.dialog.dialog, this.$refs['dialogComponent'].remark)
        }

    },
    mounted () {
        this.getList()
        setTimeout(() => {
            this.tableData = [
                { a: '苏·镇江001', b: 0, c: 0, d: '南京万志连', e: '南京分部', f: 0, t: '2019-05-04' },
                { a: '苏·镇江002', b: 1, c: 1, f: 1 },
                { a: '档案3' },
                { a: '档案4', className: 'xxoo', width: '500px' },
                { a: '档案5' },
                { a: '档案6' },
                { a: '档案7' },
                { a: '档案8' },
                { a: '档案9' },
                { a: '档案10' },
                { a: '档案11' },
                { a: '档案12' },
                { a: '档案13' },
                { a: '档案14' },
                { a: '档案15' },
                { a: '档案16' },
                { a: '档案17' },
                { a: '档案18' },
                { a: '档案19' },
                { a: '档案20' }
            ]
        }, 200)

        this.page.total = 20
    }
}
</script>

<style lang="scss" scoped>
.tabs{background-color: #fff;}
/deep/.colorypointer{ cursor: pointer; color: #FF7A45;}
/deep/.colorrpointer{ cursor: pointer; color: #f00;}
/deep/.deldialog .el-dialog__body{min-height: 100px;font-size: 16px;padding-top: 20px;}
</style>