<template>
    <div class="drawer-wrap">
        <el-drawer title="项目详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='40%' :before-close="handleClose" :wrapperClosable=false>
            <el-form :model="form" :rules="rules" ref="ruleForm" class="project-form" :label-width="formLabelWidth">
                <el-form-item label="经销商：">
                    <el-input v-model="form.companyName" disabled></el-input>
                </el-form-item>
                <el-form-item label="工程项目名称：" prop="projectName">
                    <el-input v-model="form.projectName" maxlength="100" placeholder="请输入工程项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目地址：" prop="address">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入项目地址" v-model="form.address" maxlength="200" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="甲方名称：" prop="firstPartName">
                    <el-input v-model="form.firstPartName" maxlength="50" placeholder="请输入甲方名称"></el-input>
                </el-form-item>
                <el-form-item label="项目类别：" prop="type">
                    <el-select v-model="form.type" placeholder="请选择项目类别">
                        <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工程项目进度：" prop="progress">
                    <el-radio-group v-model="form.progress">
                        <el-radio :label=item.key v-for="item in progressList" :key="item.key">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="项目合同总额：" prop="contractAmount">
                    <el-input v-model="form.contractAmount" placeholder="请输入项目合同总额" maxlength="18" v-isNum:2="form.contractAmount"> <template slot="append">￥</template></el-input>
                </el-form-item>
                <el-form-item label="设备总额：" prop="deviceAmount">
                    <el-input v-model="form.deviceAmount" placeholder="请输入设备总额" maxlength="18" v-isNum:2="form.deviceAmount"><template slot="append" placeholder="请输入设备总额">￥</template></el-input>
                </el-form-item>
                <el-form-item label="设备品类：" prop="deviceCategory">
                    <el-select v-model="form.deviceCategory" placeholder="请选择">
                        <el-option v-for="item in deviceCategoryList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备品牌：" prop="deviceBrand">
                    <el-input v-model="form.deviceBrand" placeholder="请输入设备品牌" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="上游供应商类型：" prop="upstreamSupplierType">
                    <el-select v-model="form.upstreamSupplierType" placeholder="请选择">
                        <el-option v-for="item in upstreamSupplierTypeList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上游接受付款方式：" prop="upstreamPayTypearr">
                    <el-checkbox-group v-model="form.upstreamPayTypearr" @change="onCRemarkTxt">
                        <el-checkbox label="1" name="type">现金</el-checkbox>
                        <el-checkbox label="2" name="type">承兑</el-checkbox>
                    </el-checkbox-group>
                    <el-form-item prop="payAcceptanceRemarkTxt" ref="remarkTxt">
                        <el-input v-if="form.upstreamPayTypearr.indexOf('2')>-1" v-model="form.payAcceptanceRemark" maxlength="200" placeholder="请输入厂商接受承兑是否有指定银行，如有指定，则标明指定的银行"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="上游供应商名称：" prop="upstreamSupplierName">
                    <el-input v-model="form.upstreamSupplierName" maxlength="50" placeholder="请输入上游供应商名称"></el-input>
                </el-form-item>
                <el-form-item label="上游接受付款的周期：" prop="upstreamPromiseMonth">
                    <el-input-number v-model="form.upstreamPromiseMonth" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                    个月
                </el-form-item>
                <el-form-item label="预估赊销金额：" prop="predictLoanAmount">
                    <el-input v-model="form.predictLoanAmount" placeholder="请输入预估赊销金额" maxlength="18" v-isNum:2="form.predictLoanAmount"> <template slot="append">￥</template></el-input>
                </el-form-item>
                <el-form-item label="预估赊销周期：" prop="loanMonth">
                    <el-input-number v-model="form.loanMonth" controls-position="right" @change="handleChange" :min="1" :max="6"></el-input-number>
                    个月
                </el-form-item>
                <el-form-item label="工程项目回款方式：" prop="loanPayTypeRate">
                    <el-form-item label="预付款比例">
                        <el-input v-model="form.advancePaymentProportion" maxlength="10" v-isNum:2="form.advancePaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="货到付款比例">
                        <el-input v-model="form.deliveryPaymentProportion" maxlength="10" v-isNum:2="form.deliveryPaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="安装进度款比例">
                        <el-input v-model="form.installProgressPaymentProportion" maxlength="10" v-isNum:2="form.installProgressPaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="验收款比例">
                        <el-input v-model="form.acceptancePaymentProportion" maxlength="10" v-isNum:2="form.acceptancePaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="交付款比例">
                        <el-input v-model="form.realPaymentProportion" maxlength="10" v-isNum:2="form.realPaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="审计结算款比例">
                        <el-input v-model="form.auditCalculationPaymentProportion" maxlength="10" v-isNum:2="form.auditCalculationPaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="其他">
                        <el-input v-model.trim="form.payOtherText" maxlength="100"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="附件：" prop="projectUpload" ref="projectUpload">
                    <hosjoyUpload v-model="form.projectUpload" accept='.jpeg,.jpg,.png,.BMP,.pdf' :fileSize='20' :fileNum='15' :action='action' @successCb="onBackUpload()" :uploadParameters='uploadParameters'>
                    </hosjoyUpload>
                </el-form-item>
            </el-form>
            <div class="drawer-footer">
                <div class="drawer-button">
                    <template v-if="hosAuthCheck(crm_goodwork_operate)">
                        <el-button type="info" v-if="isShowBtn(statusList[form.status-1])" @click="onAuditstatus(statusList[form.status-1])">{{form.status&&statusList[form.status-1][form.status]}}</el-button>
                        <el-button type="warning" v-if="isShowRest(statusList[form.status-1])" @click="onReststatus(form.status)">重置状态</el-button>
                    </template>
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="onSaveproject()" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</el-button>
                </div>
            </div>
        </el-drawer>
        <el-dialog :title="aduitTitle" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false" :close-on-click-modal=false>
            <el-form ref="statusForm" :model="statusForm" :rules="statusRules" label-width="100px">
                <el-form-item :label="aduitTitle+'结果：'" prop="result" v-if="aduitTitle=='审核'||aduitTitle=='信审'">
                    <el-radio-group v-model="statusForm.result">
                        <el-radio :label=1>通过</el-radio>
                        <el-radio :label=0>不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="重置为：" prop="afterStatus" v-if="aduitTitle=='重置状态'">
                    <el-radio-group v-model="statusForm.afterStatus">
                        <el-radio :label=item.key v-for="item in statusType" :key="item.key">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="说明：" prop="remark">
                    <el-input type="textarea" v-model.trim="statusForm.remark" maxlength="200" :rows="5" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onUpdateAudit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
import { putProjectDetail, saveStatus, updateAudit } from './../api/index'
import { PROCESS_LIST, TYPE_LIST, DEVICE_LIST, UPSTREAM_LIST, STATUS_TYPE, NEW_STATUS_TYPE } from '../../const'
import { CRM_GOODWORK_OPERATE } from '@/utils/auth_const'
export default {
    name: 'projectdrawer',
    props: {
        drawer: {
            type: Boolean,
            default: false
        }
    },
    components: {
        hosjoyUpload
    },
    data () {
        return {
            crm_goodwork_operate: CRM_GOODWORK_OPERATE,
            loading: false,
            statusTxt: '',
            dialogVisible: false,
            statusForm: {
                afterStatus: '',
                createBy: '',
                createByMobile: '',
                projectId: '',
                remark: '',
                result: '',
                reset: ''
            },
            copyStatusForm: {},
            aduitTitle: '',
            statusList: [{ 1: '提交中' }, { 2: '审核' }, { 3: '资料收集中' }, { 4: '信审' }, { 5: '合作关闭' }, { 6: '签约' }, { 7: '放款' }, { 8: '全部回款' }, { 9: '合作完成' }],
            statusType: STATUS_TYPE,
            newstatusType: NEW_STATUS_TYPE,
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            form: {
                projectUpload: [],
                loanPayTypeRate: '方法定义必填',
                payAcceptanceRemarkTxt: '承兑方法必填',
                upstreamPayTypearr: []
            },
            copyForm: {},
            formLabelWidth: '150px',
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
                upstreamPayTypearr: [
                    { type: 'array', required: true, message: '请至少选择一个上游接受付款方式', trigger: 'change' }
                ],
                payAcceptanceRemarkTxt: [
                    { required: true },
                    {
                        validator: (r, v, callback) => {
                            if (this.form.upstreamPayTypearr.indexOf('2') > -1 && !this.form.payAcceptanceRemark) {
                                return callback(new Error('请输入承兑说明'))
                            }
                            return callback()
                        }
                    }
                ],
                loanPayTypeRate: [
                    { required: true },
                    {
                        validator: (r, v, callback) => {
                            if (!(this.form.acceptancePaymentProportion || this.form.advancePaymentProportion || this.form.auditCalculationPaymentProportion || this.form.deliveryPaymentProportion ||
                                this.form.installProgressPaymentProportion || this.form.payProportion || this.form.realPaymentProportion || this.form.payOtherText)) {
                                return callback(new Error('必填一项'))
                            }
                            return callback()
                        }
                    }
                ]
            },
            statusRules: {
                result: [
                    { required: true, message: '请选择审核状态', trigger: 'change' }
                ],
                afterStatus: [
                    { required: true, message: '请选择重置状态', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请输入说明', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters('crmmanage', {
            projectDetail: 'projectDetail'
        })
    },
    watch: {
        'form.projectUpload' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['projectUpload'].clearValidate()
            })
        }
    },
    mounted () {
        this.copyStatusForm = { ...this.statusForm }
    },
    methods: {
        ...mapActions('crmmanage', {
            findProjectDetail: 'findProjectDetail'
        }),
        handleClose () {
            this.$emit('backEvent')
        },
        async onFindProjectDetail (val) {
            await this.findProjectDetail(val)
            // this.form = { ...this.projectDetail, ...{ upstreamPayTypearr: [] } }
            this.form = { ...this.form, ...this.projectDetail }
            this.form.projectUpload = this.form.attachmentUrl ? JSON.parse(this.form.attachmentUrl) : []
            this.form.loanPayTypeRate = '方法定义必填'
            this.form.upstreamPayTypearr = this.form.upstreamPayType ? this.form.upstreamPayType.split(',') : []
            this.copyForm = { ...this.form }
        },
        handleChange (value) {
            console.log(value)
        },
        onCRemarkTxt () {
            if (this.form.upstreamPayTypearr.indexOf('2') < 0) {
                this.form.payAcceptanceRemark = ''
                this.$refs.remarkTxt.clearValidate()
            }
        },
        onBackUpload (str) {
        },
        async onAuditstatus (val) {
            let status = Object.keys(val)[0]
            let statusTxt = ''
            if (status == 2) {
                // status = !!status + 1 // H5端审核中 显示审核 这里需要弹窗  通过 不通过
                this.dialogVisible = true
                this.aduitTitle = '审核'
                this.statusForm = { ...this.copyStatusForm }
                this.statusForm.reset = false
                this.$nextTick(() => {
                    this.$refs['statusForm'].clearValidate()
                })
                return
            } else if (status == 3) {
                status = !!status // H5端资料收集种 显示重置按钮
            } else if (status == 4) {
                // status = !!status // H5端待信审 显示重置按钮和信审  这里需要弹窗  通过 不通过
                this.dialogVisible = true
                this.aduitTitle = '信审'
                this.statusForm = { ...this.copyStatusForm }
                this.statusForm.reset = false
                this.$nextTick(() => {
                    this.$refs['statusForm'].clearValidate()
                })
                return
            } else if (status == 5) {
                // status = !!status //  合作关闭显示 重置
            } else if (status == 6) {
                status = 7 //  H5端 待签约   显示重置和签约按钮
            } else if (status == 7) {
                status = 8 //  H5端 待放款   显示重置和放款按钮
            } else if (status == 8) {
                status = 9 //  H5端 贷种   显示重置和全部回款
            } else if (status == 9) {
                // status = !!status + 1 //  H5端 合作完成   显示重置
            }
            this.statusForm.reset = false
            await saveStatus({                projectId: this.form.id,
                status: status,
                updateBy: this.userInfo.employeeName            })
            this.$message({
                message: `${statusTxt}成功`,
                type: 'success'
            })
            this.$emit('backEvent')
        },
        onReststatus (val) {
            if (val == 5) {
                this.statusType = this.newstatusType
            } else if (val == 6 || val == 7 || val == 8) {
                this.statusType = this.newstatusType.slice(0, val - 3)
            } else {
                this.statusType = this.newstatusType.slice(0, val - 2)
            }

            this.statusForm = { ...this.copyStatusForm }
            this.$nextTick(() => {
                this.$refs['statusForm'].clearValidate()
            })
            this.statusForm.reset = true
            this.dialogVisible = true
            this.aduitTitle = '重置状态'
            // saveStatus({ projectId: this.form.id, status: 1, updateBy: this.userInfo.employeeName })
        },
        async onUpdateAudit () {
            const msg = this.aduitTitle
            this.statusForm.createBy = this.userInfo.employeeName
            this.statusForm.createByMobile = this.userInfo.phoneNumber
            this.statusForm.projectId = this.form.id
            this.$refs.statusForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await updateAudit(this.statusForm)
                        this.dialogVisible = false
                        this.$message({
                            message: `${msg}成功`,
                            type: 'success'
                        })
                        this.$emit('backEvent')
                    } catch (error) {

                    }
                }
            })
        },
        isShowBtn (val) {
            const newVal = val && Object.keys(val)[0]
            if (newVal == 3 || newVal == 5 || newVal == 9) {
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
        cancelForm () {
            if (JSON.stringify(this.form) != JSON.stringify(this.copyForm)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗？', '是否确认取消修改？', {
                    confirmButtonText: '确认取消',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(async () => {
                    this.$emit('backEvent')
                })
            } else {
                this.$emit('backEvent')
            }
        },
        onSaveproject () {
            this.form.projectUpload.map(value => {
                if (!value.url) {
                    value.url = value.fileUrl
                }
            })
            this.form.attachmentUrl = JSON.stringify(this.form.projectUpload)
            this.form.upstreamPayType = this.form.upstreamPayTypearr.join(',')
            this.loading = true
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await putProjectDetail(this.form)
                        this.$message({
                            message: '数据保存成功',
                            type: 'success'
                        })
                        this.loading = false
                        this.$emit('backEvent')
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        }
    }
}
</script>
<style  lang="scss" scoped>
.project-form {
    padding: 10px 10px 150px 10px;
}
/deep/ .el-drawer__body {
    overflow-y: scroll;
    // position: relative;
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