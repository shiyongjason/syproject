<template>
    <div class="tags-wrapper page-body">
        <apply @onSearch='onSearch'></apply>
        <div class="page-body-cont query-cont">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="企业CA认证" name="enterprise"></el-tab-pane>
                <el-tab-pane label="个人CA认证" name="personage"></el-tab-pane>
            </el-tabs>
            <div class="query-cont-col">
                <div class="query-col-title">{{tableName}}：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.companyName" placeholder="请输入企业名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createDate" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="请选择时间" :picker-options="pickerOptionsStart">
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
                    <el-button v-show="activeName === 'enterprise'" class="orangeBtn" @click="onupdate(scope.data.row)">查看信息</el-button>
                    <el-button v-show="activeName === 'enterprise'" class="orangeBtn" @click="uploadSeal(scope.data.row)">上传印章图片</el-button>
                    <el-button class="orangeBtn" @click="logOut(scope.data.row)">注销</el-button>
                </template>
            </basicTable>
            <CaDialog :dialog='dialog' :customerForm='customerForm' @onCancel='dialog = false'></CaDialog>
            <el-dialog title="上传印章图片" :visible.sync="dialogPicture" width='25%'>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">印章：</div>
                    <!-- <div class="flex-wrap-cont">
                        <el-input type="text" v-model="uploadImg.alias" maxlength="50" placeholder="请输入品牌名称"></el-input>
                    </div> -->
                </div>
                <div>
                    <SingleUpload :upload="uploadInfo" :imageUrl="imageUrl" ref="uploadImg" @back-event="readUrl" />
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="onCancle">取 消</el-button>
                    <el-button type="primary" @click="onSure">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
                <div v-show="activeName == 'personage'">
                    <p style="margin: 20px 0;text-indent: 1em;">该个人用户CA认证账户联动以下已CA认证的企业，若注销该个人用户CA认证，对应的企业CA认证也将删除:</p>
                    <el-table :data="personRelevenceData" border style="width: 100%">
                        <el-table-column
                            prop="companyName"
                            label="企业名称"
                            :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column
                            prop="companySignatureId"
                            label="企业账号ID"
                            :show-overflow-tooltip="true">
                        </el-table-column>
                    </el-table>
                </div>
                <p style="text-align: center;margin-top: 10px;">是否确认注销{{logoutName}}的CA认证？</p>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" :loading="loading" @click="onSureLogOut">确认注销</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import apply from './components/CAapply'
import { getSignList, getSignPersonList, getPersonRelevence, getSignsDetail, signImage, logoutConmanyCA, logoutPersonCA } from './api/index'
import CaDialog from './components/dialog'
import { interfaceUrl } from '@/api/config'
export default {
    name: 'enterpriseCA',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {

                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
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
    components: {
        apply: apply,
        CaDialog: CaDialog
    },
    data () {
        return {
            activeName: 'enterprise',
            tableName: '企业名称',
            actionMinWidth: 400,
            title: '企业CA认证注销',
            personRelevenceData: [],
            logoutName: '',
            loading: false,
            row: {},
            tableLabel: [],
            tableLabelCompany: [
                { label: '企业名称', prop: 'companyName' },
                { label: '企业类型', prop: 'companyType' },
                { label: '企业账号ID', prop: 'companySignatureId' },
                { label: '操作人账号ID', prop: 'operatorSignatureId' },
                { label: '操作人姓名', prop: 'operatorName' },
                { label: '操作人手机号', prop: 'operatorPhone' },
                { label: '操作人身份证', prop: 'operatorIdNumber' },
                { label: '操作人邮箱', prop: 'operatorEmail' },
                { label: '证件类型', prop: 'companyDocumentType' },
                { label: '组织机构代码证号', prop: 'companyLicenseNumber' },
                { label: '创建日期', prop: 'createTime', formatters: 'dateTime' },
                { label: '法人姓名', prop: 'legalName' },
                { label: '法人手机号', prop: 'legalPhone' },
                { label: '法人身份证号', prop: 'legalIdNumber' },
                { label: '验证状态', prop: 'status' }
            ],
            tableLabelPerson: [
                { label: '个人账号ID', prop: 'signatureSupplierSignerId' },
                { label: '个人姓名', prop: 'customerName' },
                { label: '个人手机号', prop: 'mobilePhone' },
                { label: '个人身份证号', prop: 'idNumber' },
                { label: '创建日期', prop: 'createDate', formatters: 'date' }
            ],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                createDate: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 100
            },
            dialogVisible: false,
            addTags: {
                labelName: '',
                labelType: '1'
            },
            multipleSelection: [],
            dialog: false,
            customerForm: {},
            dialogPicture: false,
            imageUrl: '',
            uploadImg: {
                alias: ''
            }
        }
    },
    mounted () {
        this.onSearch()
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
        async onQuery () {
            this.actionMinWidth = 400
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
        async onQueryPerson () {
            this.actionMinWidth = 100
            this.tableLabel = this.tableLabelPerson
            const params = {
                ...this.queryParams,
                customerName: this.queryParams.companyName
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
        onSearch (val) {
            this.tracking(2)
            this.searchParams = { ...this.queryParams }
            if (this.activeName == 'enterprise') this.onQuery()
            if (this.activeName == 'personage') this.onQueryPerson()
        },
        onReset () {
            this.$set(this.queryParams, 'companyName', '')
            this.$set(this.queryParams, 'createDate', '')
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
        async onupdate (i) {
            this.tracking(3)
            const { data } = await getSignsDetail(i.id)
            this.customerForm = data
            this.dialog = true
        },
        async uploadSeal (row) {
            this.tracking(4)
            this.$set(this, 'imageUrl', '')
            this.$set(this.uploadImg, 'imageUrl', row.companySealImage)
            this.uploadImg.accountId = row.companySignatureId
            setTimeout(() => {
                this.$set(this, 'imageUrl', row.companySealImage)
                this.dialogPicture = true
            }, 0)
        },
        readUrl (val) {
            this.uploadImg.imageUrl = val.imageUrl
        },
        async onSure () {
            if (!this.uploadImg.imageUrl) {
                this.$message.warning('请上传图片')
                return
            }
            await signImage(this.uploadImg)
            this.dialogPicture = false
        },
        onCancle () {
            // this.uploadImg.imageUrl = this.imageUrl
            this.dialogPicture = false
        },
        handleClick () {
            const queryParams = {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                createDate: ''
            }
            this.$set(this, 'queryParams', queryParams)
            if (this.activeName == 'enterprise') this.tableName = '企业名称'
            if (this.activeName == 'personage') this.tableName = '个人姓名'
            this.onSearch()
        },
        async logOut (row) {
            this.row = row
            if (this.activeName == 'personage') {
                const { data } = await getPersonRelevence(row.signatureSupplierSignerId)
                this.personRelevenceData = data
            }
            if (this.activeName == 'enterprise') {
                this.title = '企业CA认证注销'
                this.logoutName = row.companyName
            } else {
                this.title = '个人CA认证注销'
                this.logoutName = row.customerName
            }
            this.dialogVisible = true
        },
        async onSureLogOut () {
            this.loading = true
            if (this.activeName == 'enterprise') {
                await logoutConmanyCA(this.row.companySignatureId)
            } else {
                await logoutPersonCA(this.row.signatureSupplierSignerId)
            }
            this.onSearch()
            this.dialogVisible = false
            this.loading = false
        }
    }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog {
    min-width: 350px;
}
/deep/ .el-dialog__body {
    min-height: 256px;
}
/deep/ .el-table__row .cell{
    white-space: nowrap;
}
.add-tags-dialog {
    padding-top: 20px;
}
</style>
