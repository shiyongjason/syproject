<template>
    <div class="page-body-cont">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="memberName" align="center" label="会员店名称">
            </el-table-column>
            <el-table-column prop="businessName" align="center" label="企业名称">
            </el-table-column>
            <el-table-column prop="legalPerson" align="center" label="企业法人姓名">
            </el-table-column>
            <el-table-column prop="legalPersonMobile" align="center" label="法人手机号">
            </el-table-column>
            <el-table-column prop="merchantName" align="center" label="所属平台公司">
            </el-table-column>
            <el-table-column align="center" label="审核状态">
                <template slot-scope="scope">
                    <!--0:新申请 10:审核通过 11:审核不通过-->
                    <span v-if="scope.row.status === 0">新申请</span>
                    <span v-if="scope.row.status === 10">审核通过</span>
                    <span v-if="scope.row.status === 11">审核不通过</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="申请日期">
                <template slot-scope="scope">
                    <span v-if="scope.row.createTime">{{scope.row.createTime | formatterTime}}</span>
                    <span v-else v-text="'-'"></span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status === 0" class="orangeBtn" @click="showDrawer(scope.row,'review')">审核</el-button>
                    <el-button v-if="scope.row.status != 0" class="orangeBtn" @click="showDialog(scope.row,'watch')">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination class="el-page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" :page-sizes="[10,20,30,40,50]" layout="total, sizes, prev, pager, next, jumper" :onQuery="onQuery" :total="paginationData.totalElements">
            </el-pagination>
        </div>
        <el-drawer :title="drawer.title" :visible.sync="drawer.drawer" direction="rtl" size='60%'>
            <div class="drawer">
                <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <h3>一、基本信息</h3>
                    <el-form-item label="机构ID：">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="机构ID：">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="机构ID：">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="机构ID：">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属地：" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>

                    <h3>二、法人信息</h3>

                    <h3>三、企业信息</h3>
                    <el-form-item label="活动性质" prop="type">
                        <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源" prop="resource">
                        <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
        <el-dialog :title="dialogParams.title" :visible.sync="dialogParams.show" width="680px" center :close-on-click-modal="false">
            <el-form class="base" :inline="true">
                <div>
                    <h2 class="sub-title">基本信息</h2>
                    <el-form-item label="会员店名称：">
                        {{memberDetails.memberName}}
                    </el-form-item>
                    <el-form-item label="企业名称：">
                        {{memberDetails.businessName}}
                    </el-form-item>
                    <el-form-item label="企业法人姓名：">
                        {{memberDetails.legalPerson}}
                    </el-form-item>
                    <el-form-item label="法人手机号：">
                        {{memberDetails.legalPersonMobile}}
                    </el-form-item>
                    <el-form-item label="审核状态：">
                        <!--0:新申请 10:审核通过 11:审核不通过-->
                        <span v-if="memberDetails.status === 0">新申请</span>
                        <span v-if="memberDetails.status === 10">审核通过</span>
                        <span v-if="memberDetails.status === 11">审核不通过</span>
                    </el-form-item>
                    <el-form-item label="营业执照号：">
                        {{memberDetails.bussLicenseNo}}
                    </el-form-item>
                    <el-form-item label="身份证号：">
                        {{memberDetails.legalPersonId}}
                    </el-form-item>
                    <el-form-item label="身份证照片：">
                        <a :href="memberDetails.certPhotoA" target="_blank" class="preview-container"><img :src="memberDetails.certPhotoA" alt="身份证照片" class="preview"></a>
                        <a :href="memberDetails.certPhotoB" target="_blank" class="preview-container"><img :src="memberDetails.certPhotoB" alt="身份证照片" class="preview"></a>
                    </el-form-item>
                    <el-form-item label="营业执照照片：">
                        <a :href="memberDetails.licensePhoto" target="_blank" class="preview-container"><img :src="memberDetails.licensePhoto" alt="营业执照照片" class="preview"></a>
                    </el-form-item>
                    <el-form-item label="地址：">
                        {{memberDetails.provinceStr + memberDetails.cityStr + memberDetails.areaStr + memberDetails.address}}
                    </el-form-item>
                    <el-form-item label="备注原因：" v-if="memberDetails.status === 10 || memberDetails.status === 11">
                        {{memberDetails.failReason ? memberDetails.failReason : '-'}}
                    </el-form-item>
                </div>
            </el-form>
            <el-form ref="form" :rules="rules" :model="suggest" class="suggest">
                <div v-if="dialogParams.type === 'review'">
                    <h2>审核意见</h2>
                    <div class="preview-result">
                        <el-form-item label="审核结果：" prop="status">
                            <el-radio label="10" v-model="suggest.status">审核通过</el-radio>
                            <el-radio label="11" v-model="suggest.status">审核不通过</el-radio>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="备注原因：">
                            <el-input type="textarea" v-model="suggest.opinion" rows="3" maxlength="50"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="suggest-btn">
                    <el-form-item v-if="dialogParams.type === 'review'">
                        <el-button name="hosjoy-color" @click="createMemberReview">提交</el-button>
                        <el-button name="white-color" @click="cancel">取消</el-button>
                    </el-form-item>
                    <el-form-item v-if="dialogParams.type === 'watch'">
                        <el-button name="white-color" @click="close">关闭</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { findMemberDetails, createMemberReview } from '../api/index'
export default {
    name: 'memberTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        paginationData: {
            type: Object,
            default () {
                return {
                    totalElements: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        }
    },
    data () {
        return {
            dialogParams: {
                show: false,
                title: '审核优惠券',
                type: 'review'
            },
            drawer: {
                drawer: false,
                title: '',
                type: ''
            },
            suggest: {},
            memberDetails: {},
            openParams: {
                id: '',
                memberCode: ''
            },
            rules: {
                status: [
                    { required: true, message: '审核结果不能为空！' }
                ],
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods: {
        onQuery () {
            this.$emit('onQuery')
        },
        handleSizeChange (val) {
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.$emit('onCurrentChange', val)
        },
        showDrawer (row, type) {
            if (type === 'review') {
                this.drawer.title = '会员店审核'
                this.drawer.type = type
            } else if (type === 'watch') {
                this.drawer.title = '会员店信息查看'
                this.drawer.type = type
            }
            this.drawer.drawer = true
        },
        showDialog (row, type) {
            this.openParams.id = row.id
            this.openParams.memberCode = row.memberCode
            this.suggest = {}
            if (type === 'review') {
                this.dialogParams.title = '会员店审核'
                this.dialogParams.type = type
            } else if (type === 'watch') {
                this.dialogParams.title = '会员店信息查看'
                this.dialogParams.type = type
            }
            this.dialogParams.show = true
            this.findMemberDetails(row)
        },
        close () {
            this.dialogParams.show = false
        },
        cancel () {
            this.dialogParams.show = false
        },
        async findMemberDetails (row) {
            const { data } = await findMemberDetails({ id: row.id, memberCode: row.memberCode })
            this.memberDetails = data
        },
        async createMemberReview () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    const params = {
                        ...this.openParams,
                        ...this.suggest
                    }
                    if (!params.memberCode) delete params.memberCode
                    try {
                        await createMemberReview(params)
                        this.$message({
                            type: 'success',
                            message: '已提交审核结果'
                        })
                        this.dialogParams.show = false
                    } catch (e) {
                    }
                    this.onQuery()
                }
            })
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.suggest-btn {
    padding-top: 20px;
    text-align: right;
}
.sub-title {
    font-size: 18px;
    margin: 0;
    padding: 0;
}
.preview-result {
    padding-bottom: 12px;
}
.preview-container {
    display: block;
    float: left;
    width: 80px;
    height: 40px;
    cursor: pointer;
    position: relative;
    margin-right: 12px;
}
.preview {
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
/deep/ .el-drawer__body {
    overflow-y: scroll;
}
.drawer {
    padding: 0 20px;
    /deep/ .el-form-item__label {
        line-height: 40px;
    }
    .el-form {
        // /deep/ .el-form-item{
        //     width: 300px;
        // }
        .el-input {
            width: 180px;
        }
    }
    /deep/ .el-select {
        width: 150px;
        /deep/ .el-input--suffix {
            width: 120px;
        }
    }
}
</style>
<style>
.el-form--inline .el-form-item {
    width: 45%;
}
.el-form-item {
    margin-bottom: 0;
}
.el-form-item__label,
.el-form-item__content {
    line-height: 25px;
}
.suggest .el-form-item {
    margin-bottom: 15px !important;
}
.el-dialog--center .el-dialog__body {
    padding: 0 25px;
}
</style>
