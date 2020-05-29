<template>
    <div class="drawer-wrap">
            <el-form :model="projectForm" :rules="rules" ref="ruleForm" class="project-form" :label-width="formLabelWidth">
                  <p class="drawer-by">项目提交人：{{projectForm.createBy}}</p>
                <el-form-item label="经销商：">
                  {{projectForm.companyName}} <el-button type="primary" size="mini" @click="onLinkBus(projectForm)">查看详情</el-button>
                </el-form-item>
                <el-form-item label="分部：">
                      <el-select v-model="projectForm.pkDeptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    <!-- <el-input v-model="form.deptName" disabled></el-input> -->
                </el-form-item>
                <el-form-item label="工程项目名称：" prop="projectName">
                    <el-input v-model="projectForm.projectName" maxlength="100" placeholder="请输入工程项目名称"></el-input>
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
                        <el-checkbox label="1" name="type">现金</el-checkbox>
                        <el-checkbox label="2" name="type">承兑</el-checkbox>
                    </el-checkbox-group>
                    <el-form-item prop="payAcceptanceRemarkTxt" ref="remarkTxt">
                        <el-input v-if="projectForm.upstreamPayTypearr.indexOf('2')>-1" type="textarea" placeholder="请输入厂商接受承兑是否有指定银行，如有指定，则标明指定的银行" v-model="form.payAcceptanceRemark" maxlength="200" show-word-limit></el-input>
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
                    <el-input-number v-model="projectForm.loanMonth" controls-position="right" @change="handleChange" :min="1" :max="6"></el-input-number>
                    个月
                </el-form-item>
                <el-form-item label="工程项目回款方式：" prop="loanPayTypeRate">
                    <el-form-item label="预付款比例">
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
                <el-form-item label="附件：" prop="projectUpload" ref="projectUpload">
                    <hosjoyUpload v-model="projectForm.projectUpload" accept='.jpeg,.jpg,.png,.BMP,.pdf' :fileSize='20' :fileNum='15' :action='action' @successCb="onBackUpload()" :uploadParameters='uploadParameters'>
                    </hosjoyUpload>
                </el-form-item>
            </el-form>

    </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
import { putProjectDetail } from './../api/index'
import { PROCESS_LIST, TYPE_LIST, DEVICE_LIST, UPSTREAM_LIST, STATUS_TYPE, NEW_STATUS_TYPE } from '../../const'

export default {
    name: 'projectcom',
    props: {
        projectForm: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        hosjoyUpload
    },
    data () {
        return {

            loading: false,
            statusTxt: '',
            dialogVisible: false,

            aduitTitle: '',
            statusList: [{ 1: '提交中' }, { 2: '审核' }, { 3: '资料收集中' }, { 4: '信审' }, { 5: '合作关闭' }, { 6: '签约' }, { 7: '放款' },
                { 8: '全部回款' }, { 9: '合作完成' }, { 10: '信息待完善' }],
            statusType: STATUS_TYPE,
            newstatusType: NEW_STATUS_TYPE,
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
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
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            // projectDetail: 'crmmanage/projectDetail',
            crmdepList: 'crmmanage/crmdepList'
        })
    },
    watch: {
        'projectForm.projectUpload' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['projectUpload'].clearValidate()
            })
        }
    },
    mounted () {
        this.copyStatusForm = { ...this.statusForm }
    },
    methods: {
        onLinkBus (val) {
            this.$router.push({ name: 'authenlist', params: { name: val.companyName, code: val.companyCode } })
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
                if (valid) {
                    try {
                        await putProjectDetail(this.projectForm)
                        this.$message({
                            message: '数据保存成功',
                            type: 'success'
                        })
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
.drawer-by{
    color: #b9b7b7;
    padding: 0px 0 15px 50px;
    font-size: 13px;
}
.project-form {
    padding: 10px 10px 150px 10px;
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
</style>