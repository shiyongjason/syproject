<template>
    <div class="page-body-cont">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="businessName" align="center" label="企业全称">
            </el-table-column>
            <el-table-column prop="merchantName" align="center" label="商户名称">
            </el-table-column>
            <el-table-column prop="enterpriseLegalPerson" align="center" label="企业法人姓名">
            </el-table-column>
            <el-table-column prop="principalPerson" align="center" label="负责人姓名">
            </el-table-column>
            <el-table-column prop="principalMobile" align="center" label="负责人手机号">
            </el-table-column>
            <el-table-column align="center" label="审核状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.checkStatus === 0">新申请</span>
                    <span v-if="scope.row.checkStatus === 1">审核通过</span>
                    <span v-if="scope.row.checkStatus === 2">审核失败</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.createTime | formatterTime}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <!--2.进行中 3.未审核 4.已结束 5.未通过-->
                    <el-button class="orangeBtn" v-if="scope.row.checkStatus === 0" @click="showDialog(scope.row.merchantCode,'review')">审核
                    </el-button>
                    <el-button v-else class="orangeBtn" @click="showDialog(scope.row.merchantCode,'watch')">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination class="el-page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" :page-sizes="[10,20,30,40,50]" layout="total, sizes, prev, pager, next, jumper" :onQuery="onQuery" :total="paginationData.totalElements">
            </el-pagination>
        </div>
        <el-dialog :title="dialogParams.title" :visible.sync="dialogParams.show" width="680px" center :close-on-click-modal="false">
            <el-form class="base" :inline="true">
                <div>
                    <h2 class="sub-title">基本信息</h2>
                    <el-form-item label="企业全称：">
                        {{merchantDetail.businessName}}
                    </el-form-item>
                    <el-form-item label="负责人姓名：">
                        {{merchantDetail.principalPerson}}
                    </el-form-item>
                    <el-form-item label="商户名称：">
                        {{merchantDetail.merchantName}}
                    </el-form-item>
                    <el-form-item label="负责人手机号：">
                        {{merchantDetail.principalMobile}}
                    </el-form-item>
                    <el-form-item label="所属分部：">
                        {{merchantDetail.subsectionName}}
                    </el-form-item>
                    <el-form-item label="负责人身份证号：">
                        {{merchantDetail.principalCertNo}}
                    </el-form-item>
                    <el-form-item label="企业法人姓名：">
                        {{merchantDetail.enterpriseLegalPerson}}
                    </el-form-item>
                    <el-form-item label="身份证照片：">
                        <div class="idCard">
                            <a :href="merchantDetail.certPhotoA" target="_blank" class="preview-container"><img :src="merchantDetail.certPhotoA" alt="身份证正面" class="preview"></a>
                            <a :href="merchantDetail.certPhotoB" target="_blank" class="preview-container"><img :src="merchantDetail.certPhotoB" alt="身份证反面" class="preview"></a>
                        </div>
                    </el-form-item>
                    <el-form-item label="地区：">
                        {{address + merchantDetail.addressName}}
                    </el-form-item>
                    <el-form-item label="营业执照号：">
                        {{merchantDetail.businessLicenseNo}}
                    </el-form-item>
                    <el-form-item label="营业执照照片：">
                        <div class="pic">
                            <a :href="merchantDetail.businessLicensePhone" target="_blank" class="preview-container"><img :src="merchantDetail.businessLicensePhone" alt="营业执照照片" class="preview"></a>
                        </div>
                    </el-form-item>
                    <el-form-item label="开户许可证：">
                        <div class="pic">
                            <a :href="merchantDetail.accountOpenPermitPhone" target="_blank" class="preview-container"><img :src="merchantDetail.accountOpenPermitPhone" alt="开户许可证" class="preview"></a>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
            <el-form ref="form" :rules="rules" :model="suggest" class="suggest">
                <div v-if="dialogParams.type === 'review'">
                    <h2>审核意见</h2>
                    <div>
                        <el-form-item label="审核结果" prop="checkStatus">
                            <el-radio v-model="suggest.checkStatus" label="1">审核通过</el-radio>
                            <el-radio v-model="suggest.checkStatus" label="2">审核不通过</el-radio>
                        </el-form-item>
                    </div>
                    <div class="remark">
                        <el-form-item label="备注原因">
                            <el-input type="textarea" v-model="suggest.checkRemark" rows="3" maxlength="50"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="suggest-btn">
                    <el-form-item v-if="dialogParams.type === 'review'">
                        <el-button name="hosjoy-color" @click="checkMerchant">确认</el-button>
                        <el-button name="white-color" @click="dialogParams.show = false">取消</el-button>
                    </el-form-item>
                    <el-form-item v-if="dialogParams.type === 'watch'">
                        <el-button name="white-color" @click="dialogParams.show = false">关闭</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { checkMerchant, findMerchantDetail } from '../api/index'
import { mapState } from 'vuex'
export default {
    name: 'merchantReviewTable',
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
            address: '',
            dialogParams: {
                show: false,
                title: '商户审核',
                type: 'review'
            },
            suggest: {},
            merchantDetail: {},
            openId: '',
            rules: {
                checkStatus: [
                    { required: true, message: '审核结果不能为空！' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
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
        async showDialog (merchantCode, type) {
            this.merchantCode = merchantCode
            this.suggest = {}
            this.address = ''
            if (type === 'review') {
                this.dialogParams.title = '商户审核'
                this.dialogParams.type = type
            } else if (type === 'watch') {
                this.dialogParams.title = '商户查看'
                this.dialogParams.type = type
            }
            await this.findMerchantDetail(merchantCode)
            this.dialogParams.show = true
        },
        async findMerchantDetail (merchantCode) {
            const { data } = await findMerchantDetail(merchantCode)
            // console.log(data)
            this.merchantDetail = data
            let address = JSON.parse(this.merchantDetail.address)
            this.address = address.province_name + address.city_name + address.area_name
        },
        async checkMerchant () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.suggest.checkBy = this.userInfo.employeeName
                    const params = {
                        merchantCode: this.merchantCode,
                        ...this.suggest
                    }
                    console.log(params)
                    await checkMerchant(params)
                    this.$message({
                        type: 'success',
                        message: '审核成功'
                    })
                    this.onQuery()
                    this.dialogParams.show = false
                }
            })
        }
    },
    mounted () {

    }
}
</script>

<style  lang="scss" scoped>
.suggest-btn {
    padding-top: 20px;
    text-align: right;
}
.sub-title {
    font-size: 18px;
    margin: 0;
    padding: 0;
}
.base {
    img {
        width: 70px;
        max-height: 70px;
    }
    .idCard {
        display: flex;
    }
    .pic {
    }
}
.el-dialog .el-form .el-form-item{
    margin-bottom: 20px;
}
</style>
<style>
.el-dialog .el-form .el-form-item {
    margin-bottom: 0;
}
.el-dialog--center .el-dialog__body {
    padding: 12px 25px 15px;
}
.el-form--inline .el-form-item {
    width: 45%;
}
.el-form-item {
    margin-bottom: 5px;
}
.el-form-item__label,
.el-form-item__content {
    line-height: 25px;
}
.suggest .el-form-item {
    margin-bottom: 15px !important;
}
</style>
