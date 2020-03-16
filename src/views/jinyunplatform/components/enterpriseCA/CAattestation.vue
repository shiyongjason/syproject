<template>
    <div class="page-body-cont query-cont">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="企业CA认证" name="enterprise"></el-tab-pane>
            <el-tab-pane label="个人CA认证" name="personage"></el-tab-pane>
        </el-tabs>
        <!-- 企业CA认证 -->
        <div class="query-cont-col" v-show="activeName == 'enterprise'">
            <div class="query-col-title">企业名称：</div>
            <div class="query-col-input">
                <el-input type="text" maxlength="20" v-model="queryParams.companyName" placeholder="请输入企业名称" clearable>
                </el-input>
            </div>
        </div>
        <div class="query-cont-col" v-show="activeName == 'enterprise'">
            <div class="query-col-title">创建时间：</div>
            <div class="query-col-input">
                <el-date-picker v-model="queryParams.createDate" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="请选择时间" :picker-options="pickerOptionsStart" clearable>
                </el-date-picker>
            </div>
        </div>
        <!-- 个人CA认证 -->
        <div class="query-cont-col" v-show="activeName == 'personage'">
            <div class="query-col-title">个人名称：</div>
            <div class="query-col-input">
                <el-input type="text" maxlength="20" v-model="queryParams.companyName" placeholder="请输入个人名称" clearable>
                </el-input>
            </div>
        </div>
        <div class="query-cont-col" v-show="activeName == 'personage'">
            <div class="query-col-title">创建日期：</div>
            <div class="query-col-input">
                <el-date-picker v-model="queryParams.personageCreateDate" type="date" value-format='yyyy-MM-dd' placeholder="请选择时间" :picker-options="pickerOptionsStart" clearable>
                </el-date-picker>
            </div>
        </div>
        <div class="query-cont-col">
            <div class="query-col-title">
                <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
            </div>
            <div class="query-col-title">
                <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
            </div>
        </div>
        <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" isShowIndex :actionMinWidth='actionMinWidth'>
            <template slot="action" slot-scope="scope">
                <el-button v-show="activeName === 'enterprise'" class="orangeBtn" @click="onupdate(scope.data.row,'look')">查看信息</el-button>
                <el-button v-show="activeName === 'enterprise'" class="orangeBtn" @click="uploadSeal(scope.data.row)">上传印章图片</el-button>
                <el-button class="orangeBtn" @click="logOut(scope.data.row)">注销</el-button>
                <el-button v-show="activeName === 'enterprise'" class="orangeBtn" @click="onupdate(scope.data.row,'edit')">修改信息</el-button>
            </template>
        </basicTable>
        <CaDialog :dialog="dialog" :customerForm='customerForm' @onCancel="dialog = false" />
        <CAstamp :dialog="dialogPicture" :uploadImg="uploadImg" @onCancel="dialogPicture = false" @onSearch='onSearch' />
        <CAlogOut :dialog="dialogVisible" :activeName='activeName' :CAlogOutData='CAlogOutData' @onCancel="dialogVisible = false" @onSearch='onSearch' />
        <CaeditDialog ref="CaeditDialog" :dialog="editdialog" :customerForm='customerForm' @onCancel="editdialog = false" @onSearcqyery="onQuery" />
    </div>
</template>

<script>
import { getSignList, getSignPersonList, getPersonRelevence, getSignsDetail, signInfo } from '../../api/index'
import CaDialog from './dialog/CAdialog'
import CaeditDialog from './dialog/CAeditdialog'
import CAstamp from './dialog/CAstamp'
import CAlogOut from './dialog/CAlogOut'
import { tableLabelCompany, tableLabelPerson } from '../../const.js'
export default {
    name: 'CAattestation',
    components: { CaDialog, CaeditDialog, CAstamp, CAlogOut },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createTimeEnd
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createTimeStart
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        }
    },
    data () {
        return {
            tableLabel: [],
            tableLabelCompany: tableLabelCompany,
            tableLabelPerson: tableLabelPerson,
            activeName: 'enterprise',
            actionMinWidth: 0,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                createDate: '',
                personageCreateDate: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 100
            },
            multipleSelection: [],
            dialog: false,
            dialogVisible: false,
            dialogPicture: false,
            editdialog: false,
            customerForm: {},
            imageUrl: '',
            uploadImg: {
                alias: ''
            },
            CAlogOutData: {
                htmltext: '',
                logoutName: '',
                personRelevenceData: [],
                id: ''
            }
        }
    },
    methods: {
        tracking (event) {
            this.$store.dispatch('tracking', {
                type: 9,
                event,
                page: 1,
                page_name: '企业CA',
                page_path_name: 'enterpriseCA'
            })
        },
        // 企业搜索
        async onQuery () {
            this.actionMinWidth = 450
            this.tableLabel = this.tableLabelCompany
            const { data } = await getSignList(this.queryParams)
            // console.log(data)
            this.tableData = data.records
            this.tableData.map(i => {
                if (i.companyType == 1) i.companyType = '借款方'
                if (i.companyType == 2) i.companyType = '资金方'
                if (i.companyType == 3) i.companyType = '合作方'
                if (i.companyType == 4) i.companyType = '组织方'
                if (i.companyType == 5) i.companyType = '担保方'
                if (i.companyDocumentType == 1) i.companyDocumentType = '统一社会信用代码证'
                if (i.status == 1) i.status = '认证成功'
                if (i.status == 2) i.status = '认证失败'
            })
            // 控制页数和页码
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        // 个人搜索
        async onQueryPerson () {
            this.actionMinWidth = 100
            this.tableLabel = this.tableLabelPerson
            const params = {
                ...this.queryParams,
                customerName: this.queryParams.companyName,
                createDate: this.queryParams.personageCreateDate
            }
            const { data } = await getSignPersonList(params)
            this.tableData = data.records
            // 控制页数和页码
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        handleClick () {
            const queryParams = {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                createDate: ''
            }
            this.$set(this, 'queryParams', queryParams)
            this.onSearch()
        },
        onSearch (val) {
            this.tracking(2)
            this.searchParams = { ...this.queryParams }
            if (this.activeName == 'enterprise') this.onQuery()
            if (this.activeName == 'personage') this.onQueryPerson()
        },
        onReset () {
            this.$set(this.queryParams, 'companyName', '')
            this.$set(this.queryParams, 'createDate', '')
            this.$set(this.queryParams, 'personageCreateDate', '')
            this.onSearch()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            if (this.activeName == 'enterprise') this.onQuery()
            if (this.activeName == 'personage') this.onQueryPerson()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            if (this.activeName == 'enterprise') this.onQuery()
            if (this.activeName == 'personage') this.onQueryPerson()
        },
        async onupdate (i, type) {
            this.tracking(3)
            const { data } = await getSignsDetail(i.id)
            this.customerForm = { ...data }
            switch (this.customerForm.companyType) {
                case 1:
                    this.customerForm.companyTypeN = '借款方'
                    break
                case 2:
                    this.customerForm.companyTypeN = '资金方'
                    break
                case 3:
                    this.customerForm.companyTypeN = '合作方'
                    break
                case 4:
                    this.customerForm.companyTypeN = '组织方'
                    break
                case 5:
                    this.customerForm.companyTypeN = '担保方'
                    break
                default:
                    this.customerForm.companyTypeN = ''
            }
            if (type == 'edit') {
                this.editdialog = true
                this.$set(this.customerForm, 'legalIdNumber', data.legalIdNumber)
                this.$set(this.customerForm, 'legalName', data.legalName)
                this.$set(this.customerForm, 'legalPhone', data.legalPhone)
                this.$refs.CaeditDialog.onRrestFrom()
            } else {
                this.dialog = true
            }
        },
        async uploadSeal (row) {
            this.tracking(4)
            this.$set(this, 'imageUrl', '')
            this.$set(this.uploadImg, 'imageUrl', row.companySealImage)
            this.uploadImg.accountId = row.companySignatureId
            setTimeout(() => {
                this.dialogPicture = true
            }, 0)
        },

        async logOut (row) {
            this.CAlogOutData.htmltext = ''
            if (this.activeName == 'personage') {
                const { data } = await getPersonRelevence(row.signatureSupplierSignerId)
                this.CAlogOutData.personRelevenceData = data
            }
            if (this.activeName == 'enterprise') {
                this.CAlogOutData.id = row.companySignatureId
                const { data } = await signInfo({ signId: row.companySignatureId, type: 1 })
                if (data.length > 0) {
                    // this.$message.warning(data[0].companyName + ',有未签约的用信合同，CA认证暂时无法注销！')
                    // return false
                    this.CAlogOutData.htmltext = data[0].companyName + ',有未签约的用信合同，CA认证暂时无法注销！'
                }
                this.CAlogOutData.logoutName = row.companyName
            } else {
                this.CAlogOutData.id = row.signatureSupplierSignerId
                const { data } = await signInfo({ signId: row.signatureSupplierSignerId, type: 2 })
                if (data.length > 0) {
                    let comArr = ''
                    data && data.map((val) => {
                        comArr += val.companyName + ','
                    })
                    this.CAlogOutData.htmltext = comArr + '有未签约的用信合同，CA认证暂时无法注销！'
                }
                this.CAlogOutData.logoutName = row.customerName
            }
            this.dialogVisible = true
        }
    },
    mounted () {
        this.onSearch()
    }
}
</script>

<style>
</style>