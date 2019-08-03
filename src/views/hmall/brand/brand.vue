<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="flex-wrap-title">品牌编码：</div>
                    <div class="flex-wrap-cont">
                        <el-input
                            type="text"
                            v-model="queryParams.brandCode"
                            maxlength="50"
                            placeholder="请输入品牌编码"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">品牌名称：</div>
                    <div class="flex-wrap-cont">
                        <el-input
                            type="text"
                            v-model="queryParams.brandName"
                            maxlength="50"
                            placeholder="请输入品牌名称"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">品牌状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.status" style="width: 100%">
                            <el-option
                                v-for="item in brandStatusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">维护人：</div>
                    <div class="flex-wrap-cont">
                        <el-input
                            type="text"
                            v-model="queryParams.updateBy"
                            maxlength="50"
                            placeholder="请输入维护人姓名"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-cont">
                        <el-button type="primary" class="ml20" @click="onQuery()">
                            搜索
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <brandTable
            ref="baseTable"
            :tableData="tableData"
            :paginationData="paginationData"
            @updateStatus="onQuery"
            @updateBrand="updateBrandChange"
            @onSizeChange="onSizeChange"
            @onCurrentChange="onCurrentChange"
            @openMark="openMark">
        </brandTable>
        <el-dialog
            title="品牌编辑"
            :visible.sync="dialogBrandEdit"
            :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
                <el-form-item label="品牌编号" v-if="this.status === 'modify'">
                    {{form.brandCode}}
                </el-form-item>
                <el-form-item prop="brandName" label="品牌名称">
                    <el-input
                        v-model="form.brandName"
                        maxlength="10"
                        style="width: 300px"
                        placeholder="请输入品牌中文名称"></el-input>
                </el-form-item>
                <el-form-item prop="brandNameEn" label="英文名称">
                    <el-input
                        v-model="form.brandNameEn"
                        placeholder="请输入英文名称"
                        maxlength="25"
                        style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item prop="logoUrl" label="品牌logo">
                    <!--logoUrl-->
                    <SingleUpload
                        :upload="uploadInfo"
                        :imageUrl="imageUrl"
                        ref="uploadImg"
                        @back-event="readUrl"/>
                    <div class="upload-tips">
                        尺寸300x300,2m以内，支持jpg、jpeg、png`
                    </div>
                </el-form-item>
                <el-form-item prop="describes" label="品牌描述">
                    <el-input
                        type="textarea"
                        maxlength="100"
                        placeholder="100字以内"
                        v-model="form.describes"
                        style="width: 300px;"
                        :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogBrandEdit = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')" :loading="isSaving">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import brandTable from './components/brandTable'
import { mapState } from 'vuex'
import { fileUploadUrl } from '@/api/config'
import { findBrandList, createBrand, updateBrand, findBrandDetails } from './api/index'
import { BRAND_STATUS } from './const'
import { IsChinese } from '@/rules'
export default {
    name: 'brand',
    components: {
        brandTable
    },
    data () {
        return {
            queryParams: {
                brandName: '',
                brandCode: '',
                pageNumber: 1,
                pageSize: 10,
                updateBy: '',
                status: ''
            },
            subsectionCodeList: [],
            tableData: [],
            paginationData: {},
            dialogBrandEdit: false,
            form: {
                brandName: '',
                brandNameEn: '',
                logoUrl: '',
                describes: ''
            },
            tempForm: {},
            formLabelWidth: '150px',
            modifyId: 0,
            status: 'add',
            rules: {
                brandName: [
                    { required: true, whitespace: true, message: '请输入品牌中文名称', trigger: 'blur' }
                ],
                brandNameEn: [
                    { required: false, whitespace: true },
                    { validator: IsChinese, trigger: 'blur', whitespace: true }
                ],
                logoUrl: [
                    { required: true, message: '请上传品牌logo' }
                ]
            },
            brandStatusOptions: BRAND_STATUS,
            isSaving: true
        }
    },
    computed: {
        uploadInfo () {
            return {
                action: fileUploadUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.name
                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
        imageUrl () {
            return this.form.logoUrl
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        updateBrandChange (col) {
            this.modifyId = col.id
            this.findBrandDetails()
            this.isSaving = false
        },
        submitForm (formName) {
            if (this.isSaving) {
                return
            }
            this.isSaving = true
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        await this.saveBrand()
                        this.isSaving = false
                    } catch (e) {
                        this.isSaving = false
                    }
                } else {
                    this.isSaving = false
                }
            })
        },
        async saveBrand () {
            let { ...params } = this.form
            params.createBy = this.userInfo.name
            if (this.status === 'add') {
                await createBrand(params)
            } else if (this.status === 'modify') {
                await updateBrand(this.modifyId, params)
            }
            this.dialogBrandEdit = false
            this.$message({
                message: this.status === 'add' ? '品牌添加成功！' : '品牌修改成功！',
                type: 'success'
            })
            this.onQuery()
        },
        readUrl (val) {
            this.form.logoUrl = val.imageUrl
        },
        async findBrandDetails () {
            const { data } = await findBrandDetails(this.modifyId)
            this.form = {
                brandCode: data.brandCode,
                brandName: data.brandName,
                brandNameEn: data.brandNameEn,
                logoUrl: data.logoUrl,
                describes: data.describes
            }
            this.status = 'modify'
            this.dialogBrandEdit = true
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        },
        async onQuery () {
            const { ...params } = this.queryParams
            const { data } = await findBrandList(params)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        openMark (status) {
            let { ...form } = this.tempForm
            this.form = form
            this.status = status
            this.dialogBrandEdit = true
            this.$nextTick(function () {
                this.$refs.form.clearValidate()
            })
            this.isSaving = false
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.onQuery()
        }
    },
    mounted () {
        this.onQuery()
        let { ...form } = this.form
        // 用于清空弹出层的form数据
        this.tempForm = form
    }
}
</script>

<style scoped>
    .download {
        text-decoration: none;
        color: #ffffff;
        background: #f88825;
        line-height: 38px;
        border-radius: 4px;
        padding: 0 12px;
    }

    .el-textarea__inner {
        height: 100px;
    }
    .upload-tips{
        font-size: 12px;
        color: #999;
    }
</style>
