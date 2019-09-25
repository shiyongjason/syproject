<template>
    <div class="page-body-cont">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="memberName" align="center" label="会员店名称">
            </el-table-column>
            <el-table-column prop="companyName" align="center" label="企业名称">
            </el-table-column>
            <el-table-column prop="legalPersonName" align="center" label="企业法人姓名">
            </el-table-column>
            <el-table-column prop="legalPersonMobile" align="center" label="法人手机号">
            </el-table-column>
            <el-table-column prop="merchantName" align="center" label="所属平台公司">
            </el-table-column>
            <el-table-column align="center" label="审核状态">
                <template slot-scope="scope">
                    <!--默认0，0：审核通过，10：待提交认证资料，20：待审核，30：审核不通过-->
                    <span v-if="scope.row.status == 0">审核通过</span>
                    <span v-if="scope.row.status == 10">待提交认证资料</span>
                    <span v-if="scope.row.status == 20">待审核</span>
                    <span v-if="scope.row.status == 30">审核不通过</span>
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
                    <!-- <el-button class="orangeBtn" @click="showDrawer(scope.row,'review')">审核</el-button> -->
                    <el-button v-if="scope.row.status == 20" class="orangeBtn" @click="showDrawer(scope.row,'review')">审核</el-button>
                    <el-button v-if="scope.row.status != 20" class="orangeBtn" @click="showDrawer(scope.row,'watch')">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination class="el-page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" :page-sizes="[10,20,30,40,50]" layout="total, sizes, prev, pager, next, jumper" :onQuery="onQuery" :total="paginationData.totalElements">
            </el-pagination>
        </div>
        <el-drawer :title="drawer.title" :visible.sync="drawer.drawer" direction="rtl" size='60%'>
            <div class="drawer">
                <el-form :model="memberDetails" :rules="rules" :inline="true" ref="memberDetails" label-width="150px">
                    <h3>一、基本信息</h3>
                    <div class="baseStyle">
                        <span>机构ID：</span>
                        <el-input v-model="memberDetails.memberCode" disabled></el-input>
                    </div>
                    <div class="baseStyle">
                        <span>机构名称：</span>
                        <el-input v-model="memberDetails.memberName" disabled></el-input>
                    </div>
                    <div class="baseStyle">
                        <span>机构类型：</span>
                        <el-input v-model="memberDetails.source" disabled></el-input>
                    </div>
                    <div class="baseStyle">
                        <span>父机构ID：</span>
                        <el-input v-model="memberDetails.merchantCode" disabled></el-input>
                    </div>
                    <div class="baseStyle">
                        <span>所属地：</span>
                        <el-input v-model="memberDetails.placeOfOrigin" disabled></el-input>
                    </div>
                    <h3>二、法人信息</h3>
                    <div class="passport">
                        <div class="label">证件照：</div>
                        <div class="IDImg">
                            <a :href="memberDetails.idCardPortrait" target="_blank">
                                <img :src="memberDetails.idCardPortrait" alt="">
                            </a>
                        </div>
                        <div class="IDImg">
                            <a :href="memberDetails.idCardNationalEmblem" target="_blank">
                                <img :src="memberDetails.idCardNationalEmblem" alt="">
                            </a>
                        </div>
                    </div>

                    <div class="baseStyle">
                        <span>法人姓名：</span>
                        <el-input v-model="memberDetails.legalPersonName" disabled></el-input>
                    </div>
                    <div class="baseStyle">
                        <span>法人证件号：</span>
                        <el-input v-model="memberDetails.legalPersonId" disabled></el-input>
                    </div>
                    <h3>三、企业信息</h3>
                    <div class="baseStyle">
                        <span>营业执照类型：</span>
                        <span style="text-align: left">三证合一</span>
                        <!-- <el-input v-model="memberDetails.companyName" disabled></el-input> -->
                    </div>
                    <div class="passport">
                        <div class="label">营业执照扫描件：</div>
                        <div class="IDImg">
                            <a :href="memberDetails.businessLicense" target="_blank">
                                <img :src="memberDetails.businessLicense" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="baseStyle">
                        <span>企业名称：</span>
                        <el-input v-model="memberDetails.companyName" disabled></el-input>
                    </div>
                    <div class="baseStyle">
                        <span>统一社会信用代码：</span>
                        <el-input v-model="memberDetails.companyName" disabled></el-input>
                    </div>
                    <el-divider content-position="left">审核意见</el-divider>
                    <template v-if="drawer.type === 'review'">
                        <el-form-item label="审核结果：" prop="result">
                            <el-radio-group v-model="memberDetails.result">
                                <el-radio label="0">审核通过</el-radio>
                                <el-radio label="30">审核不通过</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <template v-if="memberDetails.result == '30'">
                            <el-form-item label="不通过原因：">
                                <el-checkbox-group v-model="type">
                                    <el-checkbox label="证件照不清晰" name="type"></el-checkbox><br>
                                    <el-checkbox label="证件照与证件号不匹配" name="type"></el-checkbox><br>
                                    <el-checkbox label="营业执照不清晰" name="type"></el-checkbox><br>
                                    <el-checkbox label="营业执照住所和申请所属地不匹配" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="其他原因：">
                                <el-input type="textarea" v-model="memberDetails.failureReason"></el-input>
                            </el-form-item>
                        </template>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('memberDetails')">提交</el-button>
                            <el-button @click="resetForm('memberDetails')">取消</el-button>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <div class="failResult">
                            <div>
                                <span>审核结果：</span>
                                <span v-if="memberDetails.status == 0">审核通过</span>
                                <span v-else-if="memberDetails.status == 10">待提交认证资料</span>
                                <span v-else-if="memberDetails.status == 20">待审核</span>
                                <span v-else-if="memberDetails.status == 30">审核不通过</span>
                                <span v-else>老数据</span>
                            </div>
                            <div v-if="memberDetails.status == 30">
                                <span>不通过原因：</span>
                                <span>{{memberDetails.failureReason}}</span>
                            </div>
                        </div>
                    </template>
                </el-form>
            </div>
        </el-drawer>
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
            type: [],
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
            memberDetails: {},
            openParams: {
                id: ''
            },
            rules: {
                result: [
                    { required: true, message: '请选择审核结果', trigger: 'change' }
                ]
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
            this.openParams.id = row.id
            this.type = []
            if (type === 'review') {
                this.drawer.title = '会员店审核'
                this.drawer.type = type
            } else if (type === 'watch') {
                this.drawer.title = '会员店信息查看'
                this.drawer.type = type
            }
            this.drawer.drawer = true
            console.log(row)
            this.findMemberDetails(row)
        },
        close () {
            this.dialogParams.show = false
        },
        cancel () {
            this.dialogParams.show = false
        },
        async findMemberDetails (row) {
            const { data } = await findMemberDetails({ id: row.id })
            this.memberDetails = data
            this.memberDetails.placeOfOrigin = '' + data.provinceName + data.cityName + data.countryName
        },
        // async createMemberReview () {
        //     this.$refs['memberDetails'].validate(async (valid) => {
        //         if (valid) {
        //             const params = {
        //                 ...this.openParams,
        //                 ...this.suggest
        //             }
        //             if (!params.memberCode) delete params.memberCode
        //             try {
        //                 await createMemberReview(params)
        //                 this.$message({
        //                     type: 'success',
        //                     message: '已提交审核结果'
        //                 })
        //                 this.dialogParams.show = false
        //             } catch (e) {
        //             }
        //             this.onQuery()
        //         }
        //     })
        // },
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let failureReason = ''
                    let type = JSON.parse(JSON.stringify(this.type))
                    if (this.memberDetails.failureReason) {
                        type.push(this.memberDetails.failureReason)
                    }
                    failureReason = type.join(',')
                    const params = {
                        ...this.openParams,
                        status: this.memberDetails.result,
                        // status: 20,
                        failureReason
                    }
                    console.log(params)
                    await createMemberReview(params)
                    this.$message({
                        type: 'success',
                        message: '已提交审核结果'
                    })
                    this.drawer.drawer = false
                    this.onQuery()
                } else {
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
        /deep/ .el-form-item {
            width: 100%;
        }
        .el-input {
            width: 50%;
        }
    }
    /deep/ .el-divider__text {
        font-size: 20px;
    }
    /deep/ .el-form-item__content {
        line-height: 40px;
    }
    .baseStyle {
        margin: 10px 0;
        span {
            display: inline-block;
            width: 150px;
            text-align: right;
        }
    }
    .passport {
        display: flex;
        margin: 10px 0;
        .label {
            min-width: 150px;
            padding-right: 12px;
            text-align: right;
        }
        .IDImg {
            padding-right: 50px;
            img{
                display: block;
                width: 200px;
                height: 200px;
            }
        }
    }
    .failResult>div{
        margin: 10px;
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
