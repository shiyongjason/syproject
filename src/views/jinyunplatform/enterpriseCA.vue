<template>
    <div class="tags-wrapper page-body">
        <apply @onSearch='onSearch'></apply>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div>企业CA认证申请</div>
            </div><br>
            <div class="query-cont-col">
                <div class="query-col-title">企业名称：</div>
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
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" isShowIndex :actionMinWidth='300'>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onupdate(scope.data.row)">查看信息</el-button>
                    <el-button class="orangeBtn" @click="uploadSeal(scope.data.row)">上传印章图片</el-button>
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
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import apply from './components/CAapply'
import { getSignList, getSignsDetail, signImage } from './api/index'
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
            tableLabel: [
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
            dialogVisible: true,
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
        async onQuery () {
            // console.log(this.searchParams)
            const { data } = await getSignList(this.queryParams)
            console.log(data)
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
        onSearch (val) {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'companyName', '')
            this.$set(this.queryParams, 'createDate', '')
            this.onSearch()
        },
        async createTags () { },
        async cancel () { },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        async onupdate (i) {
            const { data } = await getSignsDetail(i.id)
            console.log(data)
            this.customerForm = data
            this.dialog = true
        },
        async uploadSeal (row) {
            this.$set(this, 'imageUrl', '')
            this.$set(this.uploadImg, 'imageUrl', row.companySealImage)
            this.uploadImg.accountId = row.companySignatureId
            setTimeout(() => {
                this.$set(this, 'imageUrl', row.companySealImage)
                this.dialogPicture = true
            }, 0)
        },
        readUrl (val) {
            console.log(val)
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
        }
    }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog{
    min-width: 350px;
}
/deep/ .el-dialog__body {
    min-height: 256px;
}
.add-tags-dialog {
    padding-top: 20px;
}
</style>
