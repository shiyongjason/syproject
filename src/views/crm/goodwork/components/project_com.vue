<template>
    <div class="drawer-wrap">
        <el-form :model="projectForm" :rules="rules" ref="ruleForm" class="project-form" :label-width="formLabelWidth">
            <p class="drawer-by">项目提交人：{{projectForm.submitUser}}</p>
            <el-form-item label="经销商：">
                {{projectForm.companyName}} <h-button table @click="onLinkBus(projectForm)">查看详情</h-button>
            </el-form-item>
            <div class="el-form-item">
                <el-col :span="8">
                    <el-form-item label="项目等级：">
                        {{projectForm.levels || '-'}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="项目服务费：">
                        {{projectForm.serviceCharge || '-'}}
                    </el-form-item>
                </el-col>
                <span class="posiStyle">
                    <h-button class="btn" table @click="onEditCridtle(projectForm)" v-if="hosAuthCheck(newAuth.CRM_WORK_EDIT)">编辑</h-button>
                </span>
            </div>
            <el-form-item label="分部：">
                <el-select v-model="projectForm.pkDeptDoc" placeholder="请选择" :clearable=true>
                    <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                </el-select>
                <!-- <el-input v-model="form.deptName" disabled></el-input> -->
            </el-form-item>
            <el-form-item label="工程项目名称：" prop="projectName">
                <el-input v-model="projectForm.projectName" maxlength="70" placeholder="请输入工程项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目地址：" prop="address">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入项目地址" v-model="projectForm.address" maxlength="200" show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item label="甲方名称：" prop="firstPartName">
                <el-input v-model="projectForm.firstPartName" maxlength="50" placeholder="请输入甲方名称"></el-input>
            </el-form-item>
            <el-form-item label="项目类别：" prop="type">
                <el-select v-model="projectForm.type" placeholder="请选择项目类别">
                    <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工程项目进度：" prop="progress">
                <el-radio-group v-model="projectForm.progress">
                    <el-radio :label=item.key v-for="item in progressList" :key="item.key">{{item.value}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="项目合同总额：" prop="contractAmount">
                <el-input v-model="projectForm.contractAmount" placeholder="请输入项目合同总额" maxlength="18" v-isNum:2="form.contractAmount"> <template slot="append">￥</template></el-input>
            </el-form-item>
            <el-form-item label="设备总额：" prop="deviceAmount">
                <el-input v-model="projectForm.deviceAmount" placeholder="请输入设备总额" maxlength="18" v-isNum:2="form.deviceAmount"><template slot="append" placeholder="请输入设备总额">￥</template></el-input>
            </el-form-item>
            <el-form-item label="设备品类：" prop="deviceCategory">
                <el-select v-model="projectForm.deviceCategory" placeholder="请选择">
                    <el-option v-for="item in deviceCategoryList" :key="item.key" :label="item.value" :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备品牌：" prop="deviceBrand">
                <el-input v-model="projectForm.deviceBrand" placeholder="请输入设备品牌" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="上游供应商类型：" prop="upstreamSupplierType">
                <el-select v-model="projectForm.upstreamSupplierType" placeholder="请选择">
                    <el-option v-for="item in upstreamSupplierTypeList" :key="item.key" :label="item.value" :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上游供应商名称：" prop="upstreamSupplierName">
                <el-input v-model="projectForm.upstreamSupplierName" maxlength="50" placeholder="请输入上游供应商名称"></el-input>
            </el-form-item>
            <el-form-item label="上游接受付款方式：" prop="upstreamPayTypearr">
                <el-checkbox-group v-model="projectForm.upstreamPayTypearr" @change="onCRemarkTxt">
                    <el-checkbox label="1" name="type">银行转账</el-checkbox>
                    <el-checkbox label="2" name="type">承兑</el-checkbox>
                </el-checkbox-group>
                <el-form-item prop="payAcceptanceRemarkTxt" ref="remarkTxt">
                    <el-input v-if="projectForm.upstreamPayTypearr.indexOf('2')>-1" type="textarea" placeholder="请输入厂商接受承兑是否有指定银行，如有指定，则标明指定的银行" v-model="projectForm.payAcceptanceRemark" maxlength="200" show-word-limit></el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item label="上游接受付款的周期：" prop="upstreamPromiseMonth">
                <el-input-number v-model="projectForm.upstreamPromiseMonth" controls-position="right" @change="handleChange" :min="1" :max="6"></el-input-number>
                个月
            </el-form-item>
            <el-form-item label="预估借款时间：" prop="estimatedLoanTime">
                <el-date-picker v-model="projectForm.estimatedLoanTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="预估赊销金额：" prop="predictLoanAmount">
                <el-input v-model="projectForm.predictLoanAmount" placeholder="请输入预估赊销金额" maxlength="18" v-isNum:2="form.predictLoanAmount"> <template slot="append">￥</template></el-input>
            </el-form-item>
            <el-form-item label="预估赊销周期：" prop="loanMonth">
                <el-input-number v-model="projectForm.loanMonth" controls-position="right" @change="handleChange" :min="3" :max="6"></el-input-number>
                个月
            </el-form-item>
            <el-form-item label="工程项目回款方式：" prop="loanPayTypeRate">
                <el-form-item label="首付款比例">
                    <el-input v-model="projectForm.advancePaymentProportion" maxlength="10" v-isNum:2="form.advancePaymentProportion"><template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item label="货到付款比例">
                    <el-input v-model="projectForm.deliveryPaymentProportion" maxlength="10" v-isNum:2="form.deliveryPaymentProportion"><template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item label="安装进度款比例">
                    <el-input v-model="projectForm.installProgressPaymentProportion" maxlength="10" v-isNum:2="form.installProgressPaymentProportion"><template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item label="验收款比例">
                    <el-input v-model="projectForm.acceptancePaymentProportion" maxlength="10" v-isNum:2="form.acceptancePaymentProportion"><template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item label="交付款比例">
                    <el-input v-model="projectForm.realPaymentProportion" maxlength="10" v-isNum:2="form.realPaymentProportion"><template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item label="审计结算款比例">
                    <el-input v-model="projectForm.auditCalculationPaymentProportion" maxlength="10" v-isNum:2="form.auditCalculationPaymentProportion"><template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item label="其他">
                    <el-input v-model.trim="projectForm.payOtherText" maxlength="100"></el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item label="预估签约时间：" prop="estimateSignTime">
                <el-date-picker v-model="projectForm.estimateSignTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择预计可签约的时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="客户角色：">
                <el-cascader placeholder="请选择客户角色" v-model="customerRoleArr" :show-all-levels="false" :options="customRoleOption" :props="{ multiple: true, label: 'value', value: 'key' }" filterable clearable></el-cascader>
                <el-input type="text" v-if="isCheckOtherRole" placeholder="请输入其他客户角色" style="width: 200px !important;margin-left: 10px;" v-model.trim="projectForm.otherCustomerRole" maxlength="20" clearable></el-input>
            </el-form-item>
            <el-form-item label="合作机会分析：">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入合作机会分析" v-model="projectForm.cooperationAnalyse" maxlength="200" show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item label="附件：" prop="projectUpload" ref="projectUpload">
                <OssFileHosJoyUpload v-model="projectForm.projectUpload" accept='.jpeg,.jpg,.png,.BMP,.pdf,.xls,.xlsx,.zip,.rar' :fileSize='20' :fileNum='20' :action='action' @successCb="onBackUpload()" :uploadParameters='uploadParameters'>
                </OssFileHosJoyUpload>
            </el-form-item>
        </el-form>
        <el-dialog title="设置" :visible.sync="dialogVisible" width="30%" :before-close="()=>{dialogVisible = false}" :close-on-click-modal=false :modal=false>
            <el-form :model="levelsForm" :rules="levelsRule" ref="levelsForm" label-width="150px" class="demo-ruleForm ">
                <el-form-item label="项目等级：" prop="levels">
                    <el-select v-model="levelsForm.levels" placeholder="请选择">
                        <el-option v-for="item in droplist" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目服务费：" prop="serviceCharge">
                    <el-input v-model="levelsForm.serviceCharge"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSaveCreditLevel">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import * as newAuth from '@/utils/auth_const'
import OssFileHosJoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload'
import { ccpBaseUrl } from '@/api/config'
import { putProjectDetail, saveCreditLevel, getDictionary } from './../api/index'
import { PROCESS_LIST, TYPE_LIST, DEVICE_LIST, UPSTREAM_LIST, NEW_STATUS_TYPE, CREDITLEVEL } from '../../const'
export default {
    name: 'projectcom',
    props: {
        projectForm: {
            type: Object,
            default: () => { }
        }
    },
    components: {
        OssFileHosJoyUpload
    },
    data () {
        return {
            newAuth,
            droplist: CREDITLEVEL,
            loading: false,
            statusTxt: '',
            dialogVisible: false,
            aduitTitle: '',
            // statusList: [{ 1: '提交中' }, { 2: '审核' }, { 3: '资料收集中' }, { 4: '立项' }, { 5: '审核未通过' }, { 6: '签约' }, { 7: '放款' }, { 8: '全部回款' }, { 9: '合作完成' }, { 10: '信息待完善' }],
            newstatusType: NEW_STATUS_TYPE,
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            form: {},
            copyForm: {},
            formLabelWidth: '160px',
            progressList: PROCESS_LIST,
            typeList: TYPE_LIST,
            deviceCategoryList: DEVICE_LIST,
            upstreamSupplierTypeList: UPSTREAM_LIST,
            rules: {
                projectName: [
                    { required: true, message: '请输入工程项目名称', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入项目地址', trigger: 'blur' }
                ],
                firstPartName: [
                    { required: true, message: '请输入甲方名称', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择项目类别', trigger: 'change' }
                ],
                progress: [
                    { required: true, message: '请选择工程项目进度', trigger: 'change' }
                ],
                contractAmount: [
                    { required: true, message: '请输入合同金额', trigger: 'blur' }
                ],
                deviceAmount: [
                    { required: true, message: '请输入设备总额', trigger: 'blur' }
                ],
                deviceCategory: [
                    { required: true, message: '请选择设备品类', trigger: 'change' }
                ],
                deviceBrand: [
                    { required: true, message: '请输入设备品牌', trigger: 'blur' }
                ],
                upstreamSupplierType: [
                    { required: true, message: '请选择上游供应商类型', trigger: 'change' }
                ],
                upstreamSupplierName: [
                    { required: true, message: '请输入上游供应商名称', trigger: 'blur' }
                ],
                upstreamPromiseMonth: [
                    { required: true, message: '请输入上游接受承兑周期', trigger: 'blur' }
                ],
                predictLoanAmount: [
                    { required: true, message: '请输入预估赊销金额', trigger: 'blur' }
                ],
                loanMonth: [
                    { required: true, message: '请输入预估赊销周期', trigger: 'blur' }
                ],
                estimatedLoanTime: [
                    { required: true, message: '请选择预估借款时间', trigger: 'change' }
                ],
                estimateSignTime: [
                    { required: true, message: '请选择预计可签约的时间', trigger: 'change' }
                ],
                upstreamPayTypearr: [
                    { type: 'array', required: true, message: '请至少选择一个上游接受付款方式', trigger: 'change' }
                ],
                loanPayTypeRate: [
                    { required: true },
                    {
                        validator: (r, v, callback) => {
                            if (!(this.projectForm.acceptancePaymentProportion || this.projectForm.advancePaymentProportion || this.projectForm.auditCalculationPaymentProportion || this.projectForm.deliveryPaymentProportion ||
                                this.projectForm.installProgressPaymentProportion || this.projectForm.payProportion || this.projectForm.realPaymentProportion || this.projectForm.payOtherText)) {
                                return callback(new Error('必填一项'))
                            }
                            return callback()
                        }
                    }
                ]

            },
            levelsForm: {
                id: '',
                levels: '',
                serviceCharge: '',
                updateBy: ''
            },
            levelsRule: {
                levels: [
                    { required: true, message: '请选择项目等级', trigger: 'change' }
                ],
                serviceCharge: [
                    { required: true, message: '请输入项目服务费' },
                    {
                        validator: (r, v, callback) => {
                            const reg = /^\d+(\.\d{1})?$/
                            const abs = Math.abs(v)
                            if (isNaN(abs)) {
                                callback(new Error('请输入数字值'))
                            } else if (!reg.test(abs)) {
                                callback(new Error('请输入有1位小数的数字'))
                            } else if (abs > 10) {
                                callback(new Error('请输入-10到10的数字'))
                            } else {
                                callback()
                            }
                        }
                    }
                ]
            },
            customRoleOption: [],
            customerRoleArr: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            // projectDetail: 'crmmanage/projectDetail',
            crmdepList: 'crmmanage/crmdepList'
        }),
        isCheckOtherRole () {
            return this.customerRoleArr.length && this.customerRoleArr.map(item => item.includes('41')).filter(val => val).length
        }
    },
    watch: {
        'projectForm.projectUpload' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['projectUpload'].clearValidate()
            })
        },
        'projectForm.customerRole': {
            handler (val) {
                console.log(val)
                if (val) {
                    let valSplit = val.split(',')
                    let result = []
                    for (let i = 0; i < valSplit.length; i += 2) {
                        result.push(valSplit.slice(i, i + 2))
                    }
                    this.customerRoleArr = result
                }
            },
            immediate: true
        },
        // 监听清空其他客户角色
        isCheckOtherRole () {
            this.projectForm.otherCustomerRole = ''
        }
    },
    mounted () {
        this.copyStatusForm = { ...this.statusForm }
        this.getCustomRole()
    },
    methods: {
        async getCustomRole () {
            const result = await Promise.all([getDictionary({ item: 'customer_role' }), getDictionary({ item: 'general_contractor' }), getDictionary({ item: 'sub_contractor' }), getDictionary({ item: 'engineering_construction' }), getDictionary({ item: 'other_customer_role' })])
            result[0].data[0].children = result[1].data
            result[0].data[1].children = result[2].data
            result[0].data[2].children = result[3].data
            result[0].data[3].children = result[4].data
            this.customRoleOption = result[0].data
        },
        onLinkBus (val) {
            this.$router.push({ name: 'authenlist', query: { name: val.companyName, code: val.companyCode } })
        },
        handleChange (value) {

        },
        onCRemarkTxt () {
            if (this.projectForm.upstreamPayTypearr.indexOf('2') < 0) {
                this.projectForm.payAcceptanceRemark = ''
                this.$refs.remarkTxt.clearValidate()
            }
        },
        onBackUpload (str) {
        },

        onReststatus (val) {

        },

        isShowBtn (val) {
            const newVal = val && Object.keys(val)[0]
            if (newVal == 2 || newVal == 3 || newVal == 5 || newVal == 9) {
                return false
            } else {
                return true
            }
        },
        isShowRest (val) {
            const newVal = val && Object.keys(val)[0]
            if (newVal == 2) {
                return false
            } else {
                return true
            }
        },
        onEditCridtle (val) {
            this.dialogVisible = true
            this.levelsForm.levels = val.levels
            this.levelsForm.serviceCharge = val.serviceCharge
            this.levelsForm.id = val.id
            this.levelsForm.updateBy = this.userInfo.employeeName
        },
        handleClose () {

        },
        onSaveCreditLevel () {
            this.$refs.levelsForm.validate(async (valid) => {
                if (valid) {
                    await saveCreditLevel(this.levelsForm)
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.projectForm.levels = this.levelsForm.levels
                    this.projectForm.serviceCharge = this.levelsForm.serviceCharge
                    this.dialogVisible = false
                } else {

                }
            })
        },
        // cancelForm () {
        //     if (JSON.stringify(this.projectForm) != JSON.stringify(this.copyForm)) {
        //         this.$confirm('取消则不会保存修改的内容，你还要继续吗？', '是否确认取消修改？', {
        //             confirmButtonText: '确认取消',
        //             cancelButtonText: '返回',
        //             type: 'warning'
        //         }).then(async () => {
        //             this.$emit('backEvent')
        //         })
        //     } else {
        //         this.$emit('backEvent')
        //     }
        // },
        onSaveproject () {
            this.projectForm.customerRole = this.customerRoleArr.join(',')
            this.projectForm.projectUpload.map(value => {
                if (!value.url) {
                    value.url = value.fileUrl
                }
            })
            this.projectForm.attachmentUrl = JSON.stringify(this.projectForm.projectUpload)
            this.projectForm.upstreamPayType = this.projectForm.upstreamPayTypearr.join(',')
            if (this.projectForm.pkDeptDoc) {
                this.projectForm.deptName = this.crmdepList.find(v => v.pkDeptDoc == this.projectForm.pkDeptDoc).deptName || ''
            }
            this.$refs.ruleForm.validate(async (valid) => {
                console.log(valid)
                if (valid) {
                    try {
                        await putProjectDetail(this.projectForm)
                        this.$message({
                            message: '数据保存成功',
                            type: 'success'
                        })
                        this.$emit('onCompsback')
                        this.$emit('onBackLoad', false)
                    } catch (error) {
                        this.$emit('onBackLoad', false)
                    }
                } else {
                    this.$emit('onBackLoad', false)
                }
            })
        }
    }
}
</script>
<style  lang="scss" scoped>
.drawer-by {
    color: #b9b7b7;
    padding: 0px 0 15px 50px;
    font-size: 13px;
}
.project-form {
    padding: 10px 10px 150px 10px;
}
.drawer-wrap {
    margin-top: 50px;
}

.drawer-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 24px;
    border-top: 1px solid #e5e5ea;
    background: #fff;
    z-index: 1000;
    button {
        flex: 1;
    }
    .drawer-button {
        text-align: right;
    }
}

/deep/ .el-tabs__item.is-active {
    background: transparent;
    color: #000;
}

/deep/.el-autocomplete {
    width: 300px;
    .el-input {
        width: 300px !important;
    }
}
/deep/.el-form .el-input {
    margin-left: 0;
}
/deep/.el-form-item__content .el-input {
    width: 100% !important;
}
/deep/ .el-radio {
    margin-bottom: 10px;
}
.el-form-item {
    position: relative;
}
.posiStyle {
    position: absolute;
    height: 40px;
    line-height: 40px;
    top: 0;
    right: 15%;
}
</style>
