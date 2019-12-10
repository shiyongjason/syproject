
<template>
    <div class="archiveslist">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">平台公司：</div>
                    <div class="query-col-input">
                        <HAutocomplete v-if="platComList" :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj"></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">建档时间：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart" v-model="searchParams.minCreateTime">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" v-model="searchParams.maxCreateTime">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">归档状况：</div>
                    <div class="query-col-input">
                        <el-select v-model="searchParams.archiveStatus">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="档案齐全" value="1"></el-option>
                            <el-option label="档案缺失" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">借阅状况：</div>
                    <div class="query-col-input">
                        <el-select v-model="searchParams.borrowStatus">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未借出" value="1"></el-option>
                            <el-option label="已借出" value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" @click="onSearch">搜索</el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="addbutton">
                    <el-button type="info" v-if="hosAuthCheck(COCKPIT_FILE_ADD)" @click="$router.push('/platformCompanyCockpit/archivesManagement')">新增档案</el-button>
                </div>
                <div class="tabs">
                    <el-tabs v-model="searchParams.companyStatus" @tab-click="tabsChange" type="card">
                        <el-tab-pane label="合作中" name="1"></el-tab-pane>
                        <el-tab-pane label="未合作" name="2"></el-tab-pane>
                        <el-tab-pane label="淘汰" name="3"></el-tab-pane>
                    </el-tabs>
                </div>
                <hosjoyTable ref="table" border stripe showPagination :isAction='isAction' :show-overflow-tooltip='true' :column="table" :data="tableData" isShowIndex :total="page.total" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" @pagination="getList"
                    :actionWidth='actionLen'>
                    <template slot="action" slot-scope="scope">
                        {{scope.row}}
                        <el-button type="primary" size='small' v-if="hosAuthCheck(COCKPIT_FILE_MANAGE)" @click="onGoDetail(scope.data.row)">档案管理</el-button>
                        <el-button ref="manage" type="primary" size='small' v-if="hosAuthCheck(COCKPIT_FILE_LABEL)" @click="openDialog(scope.data.row, scope.data.$index, '借出档案管理')">
                            {{scope.data.row.borrowStatus === '2' ? '借出档案管理' : '借出标注'}}
                        </el-button>
                        <el-button type="primary" v-if="hosAuthCheck(COCKPIT_FILE_DELETE)" size='small' @click="OnDeleteVisible(scope.data.row)">删除</el-button>
                    </template>
                </hosjoyTable>
            </div>
        </div>
        <!--  -->
        <el-dialog center :title="dialog.dialogTitle==='档案编号'?dialog.item.archiveNo:dialog.dialogTitle" :visible.sync="dialog.dialogVisible" :width='dialog.width' class="dialog">
            <div class="dialogbox">
                <dialogComponent ref="dialogComponent" :item="dialog.item" :dialog='dialog.dialog'></dialogComponent>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSureDialog" v-if="dialog.dialog!=='借出档案管理'">确 认</el-button>
                <!--  -->
                <el-button type="primary" @click="onSureBorrow('1')" v-if="dialog.dialog=='借出档案管理'&&dialog.item.borrowStatus==='2'">确认归还</el-button>
                <el-button type="primary" @click="onSureBorrow('2')" v-if="dialog.dialog=='借出档案管理'&&dialog.item.borrowStatus==='2'">保 存</el-button>
                <el-button type="primary" @click="onSureBorrow('2')" v-if="dialog.dialog=='借出档案管理'&&(dialog.item.borrowStatus==='1'||dialog.item.borrowStatus==null)">确认借出</el-button>
                <!--  -->
                <el-button @click="dialog.dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--  -->
        <el-dialog title="提示" :visible.sync="deleteVisible" width="500px" class="deldialog">
            <span>您确定删除这一条档案数据吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="OnDelete">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { COCKPIT_FILE_MANAGE, COCKPIT_FILE_EDIT, COCKPIT_FILE_DELETE, COCKPIT_FILE_ADD, COCKPIT_FILE_LABEL } from '@/utils/auth_const'
import hosjoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import dialogComponent from './components/dialogComponent.vue'
import { pagination } from '@/utils/mixins.js'
import { findPaltList, getList, findBranchListNew, borrow, deleteFile } from './api/index.js'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { newCache } from '@/utils/index'

export default {
    name: 'archivesList',
    components: { hosjoyTable, dialogComponent, HAutocomplete },
    mixins: [pagination],
    data () {
        return {
            COCKPIT_FILE_MANAGE,
            COCKPIT_FILE_EDIT,
            COCKPIT_FILE_DELETE,
            COCKPIT_FILE_ADD,
            COCKPIT_FILE_LABEL,
            branchList: [], // 分部列表
            selectPlatObj: {
                selectCode: '',
                selectName: ''
            },
            platComList: [],
            searchParams: { maxCreateTime: '', minCreateTime: '', archiveStatus: '', borrowStatus: '', companyStatus: '1' },
            // searchParams: { companyStatus: '1' },
            deleteVisible: false,
            table: [
                {
                    label: '档案编号',
                    prop: 'archiveNo',
                    render: (h, scope) => {
                        return (
                            <span class='colorypointer' on-click={() => this.openDialog(scope.row, scope.$index, '档案编号')}>
                                {scope.row.archiveNo}
                            </span>
                        )
                    }
                },
                {
                    label: '档案归档',
                    prop: 'archiveStatus',
                    render: (h, scope) => {
                        if (scope.row.archiveStatus === '2') {
                            return (
                                <span class='colorrpointer' on-click={() => this.openDialog(scope.row, scope.$index, '档案归档')}>
                                    档案缺失
                                </span>
                            )
                        }
                        if (scope.row.archiveStatus === '1') {
                            return (
                                <span class='colorypointer' on-click={() => this.openDialog(scope.row, scope.$index, '档案归档')}>
                                    档案齐全
                                </span>
                            )
                        }
                        if (scope.row.archiveStatus == null) {
                            return (<span>-</span>)
                        }
                    }
                },
                {
                    label: '借阅情况',
                    prop: 'borrowStatus',
                    render: (h, scope) => {
                        if (scope.row.borrowStatus === '1' || !scope.row.borrowStatus) {
                            return (
                                <span>未借出</span>
                            )
                        } else {
                            return (
                                <span class='colorrpointer' on-click={() => this.openDialog(scope.row, scope.$index, '借阅情况')}>
                                    已借出
                                </span>
                            )
                        }
                    }
                },
                { label: '平台公司', prop: 'companyName' },
                {
                    label: '分部',
                    prop: 'departmentId',
                    render: (h, scope) => {
                        if (scope.row.departmentId) {
                            return <span>{this.getNameByCode(scope.row.departmentId)}</span>
                        } else {
                            return <span><i class="el-icon-close"></i></span>
                        }
                    }
                },
                {
                    label: 'C档（工商）',
                    prop: 'commerialDocFlag',
                    render: (h, scope) => {
                        // commerialDocFlag 工商材料是否归档
                        if (!scope.row.commerialDocFlag || scope.row.commerialDocFlag === '0') return (<span><i class="el-icon-close"></i></span>)
                        if (scope.row.commerialDocFlag == '1') {
                            // if (scope.row.otherCommerialDocFlag == '2' && scope.row.capitalDocFlag == '2' && scope.row.stocktransferDocFlag == '2') return (<span>无</span>)
                            return (
                                <span class='colorypointer' on-click={() => this.openDialog(scope.row, scope.$index, 'C档（工商）')}>
                                    <i class="el-icon-check"></i>
                                </span>
                            )
                        }
                    }
                },
                {
                    label: 'B档（签约）',
                    children: [
                        {
                            label: '实控人',
                            prop: 'realControllerName',
                            render: (h, scope) => {
                                if (scope.row.rcDocFlag === '0') return (<span><i class="el-icon-close"></i></span>)
                                if (scope.row.rcDocFlag === '2') return (<span>无</span>)
                                if (!scope.row.realControllerName) return (<span><i class="el-icon-close"></i></span>)
                                if (scope.row.realControllerName) {
                                    let temp = this.getDocNum('b-realcontroller', scope.row)
                                    if (temp && temp.length > 0) {
                                        return (
                                            <span class='colorypointer' on-click={() => this.openDialog(scope.row, scope.$index, '实控人')}>
                                                {scope.row.realControllerName}
                                            </span>
                                        )
                                    } else {
                                        return <span>{scope.row.realControllerName}</span>
                                    }
                                }
                            }
                        },
                        {
                            label: '自然人股东',
                            prop: 'shareholderName',
                            render: (h, scope) => {
                                if (scope.row.shareholderDocFlag === '0') return (<span><i class="el-icon-close"></i></span>)
                                if (scope.row.shareholderDocFlag === '2') return (<span>无</span>)
                                if (!scope.row.shareholderName) return (<span><i class="el-icon-close"></i></span>)
                                if (scope.row.shareholderName) {
                                    return (
                                        <span>
                                            {scope.row.shareholderName}
                                        </span>
                                    )
                                } else {
                                    return (<span><i class="el-icon-close"></i></span>)
                                }
                            }
                        },
                        {
                            label: '投资协议',
                            prop: 'signBOs',
                            render: (h, scope) => {
                                if (
                                    scope.row[`v1SignerFlag`] == 0 && scope.row[`v2SignerFlag`] == 0 && scope.row[`v3SignerFlag`] == 0 && scope.row[`v4SignerFlag`] == 0 && scope.row[`v5SignerFlag`] == 0
                                ) {
                                    return <span><i class="el-icon-close"></i></span>
                                }
                                if (
                                    scope.row[`v1SignerFlag`] == 2 && scope.row[`v2SignerFlag`] == 2 && scope.row[`v3SignerFlag`] == 2 && scope.row[`v4SignerFlag`] == 2 && scope.row[`v5SignerFlag`] == 2
                                ) {
                                    return <span>无</span>
                                }
                                this.getsignBOs(scope.row.signBOs, scope.row, scope.$index)
                                let str = ''
                                scope.row.itemSignBOs.map((item, index) => {
                                    if (item.flag == 1) {
                                        str = str + `${index + 1}.0*${item.version.length} `
                                    }
                                })
                                if (str) {
                                    return <span class='colorypointer' on-click={() => this.openDialog(scope.row, scope.$index, '投资协议')}>{str}</span>
                                } else {
                                    return <span><i class="el-icon-close"></i></span>
                                }
                            }
                        },
                        {
                            label: '担保函签约人',
                            prop: 'guanranteeName',
                            render: (h, scope) => {
                                if (scope.row.guanranteeDocFlag == '0') return (<span><i class="el-icon-close"></i></span>)
                                if (scope.row.guanranteeDocFlag == '2') return (<span>无</span>)
                                if (scope.row.guanranteeName == null) return (<span><i class="el-icon-close"></i></span>)
                                if (scope.row.guanranteeName) {
                                    let temp = this.getDocNum('b-guarantee', scope.row)
                                    if (temp && temp.length > 0) {
                                        return (
                                            <span class='colorypointer' on-click={() => this.openDialog(scope.row, scope.$index, '担保函')}>
                                                {scope.row.guanranteeName}
                                            </span>
                                        )
                                    } else {
                                        return <span>{scope.row.guanranteeName}</span>
                                    }
                                } else {
                                    return <span><i class="el-icon-close"></i></span>
                                }
                            }
                        }
                    ]
                },
                {
                    label: 'A档（尽调）',
                    prop: 'ddDocFlag',
                    render: (h, scope) => {
                        if (scope.row.ddDocFlag == null || scope.row.ddDocFlag === '0') return (<span><i class="el-icon-close"></i></span>)
                        if (scope.row.ddDocFlag === '1') {
                            return (
                                <span class='colorypointer' on-click={() => this.openDialog(scope.row, scope.$index, 'A档（尽调）')}>
                                    <i class="el-icon-check"></i>
                                </span>
                            )
                        }
                        if (scope.row.ddDocFlag === '0') {
                            return (
                                <span><i class="el-icon-close"></i></span>
                            )
                        }
                    }
                },
                { label: '建档时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' }
                /* {
                    label: '操作',
                    width: '290px',
                    render: (h, scope) => {
                        return (
                            <div>
                                <el-button type="primary" size='small' on-click={() => { this.onGoDetail(scope.row) }}>档案管理</el-button>
                                <el-button type="primary" size='small' on-click={() => this.openDialog(scope.row, scope.$index, '借出档案管理')}>{scope.row.borrowStatus === '2' ? '借出档案管理' : '借出标注'}</el-button>
                                <el-button type="danger" style='background: #f00' size='small' on-click={() => { this.OnDeleteVisible(scope.row) }}>删除</el-button>
                            </div>
                        )
                    }
                } */
            ],
            tableData: [],
            dialog: {
                dialog: '',
                dialogTitle: '',
                item: '',
                dialogVisible: false,
                width: ''
            },
            deleteId: ''
        }
    },
    computed: {
        isAction () {
            if (this.actionLen == 0) {
                return false
            }
            return true
        },
        actionLen () {
            let btn1 = this.hosAuthCheck(COCKPIT_FILE_MANAGE) ? 97 : 0
            let btn2 = this.hosAuthCheck(COCKPIT_FILE_LABEL) ? 130 : 0
            let btn3 = this.hosAuthCheck(COCKPIT_FILE_DELETE) ? 80 : 0
            return (btn1 + btn2 + btn3) + '' || ''
        },
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.searchParams.maxCreateTime)
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.searchParams.minCreateTime)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        getDocNum (type, data) {
            return data.commonDocPOs.filter(item => {
                return item.docType === type
            })
        },
        onGoDetail (item) {
            this.$router.push({ path: '/platformCompanyCockpit/archivesManagement', query: { archiveId: item.archiveId } })
        },
        OnDeleteVisible (item) {
            this.deleteVisible = true
            this.deleteId = item.archiveId
        },
        async OnDelete () {
            await deleteFile(this.deleteId)
            this.getList()
            this.$message({
                message: '删除成功！',
                type: 'success'
            })
            this.deleteVisible = false
        },
        async onSureBorrow (val = '2') {
            let query = {
                archiveId: this.dialog.item.archiveId,
                borrowRemark: this.dialog.item.borrowRemark,
                borrowStatus: val// 档案状态：1-未借出；2-已借出
            }
            await borrow(query)
            this.getList()
            this.dialog.dialogVisible = false
        },
        getsignBOs (signBOs, data, rowIndex) {
            if (data.itemSignBOs && data.itemSignBOs.length === 5) {
                return false
            }
            let arr = []
            this.$set(data, 'itemSignBOs', [])
            for (let t = 0; t < 5; t++) {
                data.itemSignBOs.push({ flag: '', version: [] })
            }
            for (let i = 0; i < 5; i++) {
                let version = []
                arr = signBOs.filter(item => {
                    return item.archiveSignInvestPO.investVersion === `${i + 1}.0`
                })
                if (arr && arr.length > 0) {
                    let idCardList = []
                    let documentList = []
                    arr.map((item, index) => { // 某版本
                        idCardList = item.signDocPOs.filter(jtem => { // 筛选出每一版本的图片文件
                            return jtem.docType === '2'
                        })
                        documentList = item.signDocPOs.filter(jtem => { // 筛选出每一版本的文档文件
                            return jtem.docType === '1'
                        })
                        this.$set(item, 'idCardList', idCardList)
                        this.$set(item, 'documentList', documentList)
                        version.push(item)
                        let obj = {
                            flag: data[`v${i + 1}SignerFlag`], // 是否归档
                            version: version // n份文件
                        }
                        arr[index] = obj
                    })
                    // console.log(`序号${rowIndex + 1}`, `v${i + 1}.0`, arr[arr.length - 1])
                    data.itemSignBOs.splice(i, 1, arr[arr.length - 1])
                }
            }
        },
        getsignBOs2 (signBOs, data, rowIndex) {
            let arr = []
            let temp = []
            let version = []
            for (let t = 0; t < 5; t++) {
                arr.push([])
            }
            for (let i = 0; i < arr.length; i++) {
                temp = signBOs.filter(jtem => {
                    return jtem.archiveSignInvestPO.investVersion === `${i + 1}.0`
                })
                if (temp && temp.length > 0) {
                    let len = 0
                    let idCardList = []
                    let documentList = []
                    temp.map((item, index) => { // 某版本
                        idCardList = item.signDocPOs.filter(jtem => { // 筛选出每一版本的图片文件
                            return jtem.docType === '2'
                        })
                        documentList = item.signDocPOs.filter(jtem => { // 筛选出每一版本的文档文件
                            return jtem.docType === '1'
                        })
                        this.$set(item, 'idCardList', idCardList)
                        this.$set(item, 'documentList', documentList)
                        version.push(item)
                        if (item.signDocPOs.length > 0) {
                            len = len + item.signDocPOs.length
                        }
                        let obj = {
                            num: len,
                            version: version, // n份文件
                            flag: data[`v${i + 1}SignerFlag`] // 是否归档
                        }
                        temp[index] = obj
                    })
                    console.log(rowIndex + 1, `v${i + 1}.0`, temp[temp.length - 1])
                    arr.splice(i, 1, temp[temp.length - 1])
                }
            }
            return arr
        },
        async findBranchListNew () {
            // 平台分部
            const { data } = await findBranchListNew()
            this.branchList = data.data
        },
        getNameByCode (code, list = this.branchList) {
            let temp = list.filter(item => {
                return item.subsectionCode === code
            })
            if (temp.length === 0) {
                return '-'
            }
            return temp[0].subsectionName
        },
        tabsChange () {
            this.getList()
        },
        onSearch () {
            this.getList()
        },
        async getList () {
            let query = { ...this.searchParams, ...this.queryParams }
            const { data } = await getList(query)
            this.tableData = data.records
            this.page.total = data.total
        },
        openDialog (item, index, data, width = '800px') {
            let dialogTitle = ''
            if (data === '借出档案管理') {
                dialogTitle = item.borrowStatus == '2' ? '借出档案管理' : '确认借出'
            } else {
                dialogTitle = `${data}`
            }
            this.dialog = {
                dialog: data,
                dialogTitle,
                item,
                dialogVisible: true,
                width
            }
            if (item.borrowStatus == '1') {
                item.borrowRemark = ''
            }
        },
        onSureDialog () {
            this.dialog.dialogVisible = false
        },
        backPlat (val) {
            this.searchParams.companyName = val.value.value
        },
        async findPaltList () {
            // 平台公司名称
            const { data } = await findPaltList()
            for (let i of data.data.pageContent) {
                i.value = i.companyShortName
                i.selectCode = i.companyCode
            }
            this.platComList = data.data.pageContent
        }

    },
    mounted () {
        this.findPaltList()
        this.getList()
        this.findBranchListNew()
    },
    activated () {
        this.getList()
    },
    beforeRouteEnter (to, from, next) {
        newCache('archivesList')
        next()
    }
}
</script>

<style lang="scss" scoped>
.tabs {
    background-color: #fff;
}
/deep/.colorypointer {
    cursor: pointer;
    color: #ff7a45;
}
/deep/.colorrpointer {
    cursor: pointer;
    color: #f00;
}
/deep/.deldialog .el-dialog__body {
    min-height: 100px;
    font-size: 16px;
    padding-top: 20px;
}
/deep/.el-icon-close {
    font-size: 16px;
}
/deep/.el-icon-check {
    font-size: 16px;
}
/deep/.dialog .el-dialog--center .el-dialog__body {
    max-height: 600px;
    overflow-y: scroll;
}
.addbutton{ margin-bottom: 16px; text-align: right}
/deep/.el-dialog__wrapper .el-textarea .el-input__count{color:#c3c6cc}

</style>