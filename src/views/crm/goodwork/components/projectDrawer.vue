<template>
    <div class="drawer-wrap">
        <el-drawer title="账号详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='40%' :before-close="handleClose" :wrapperClosable=false>
            <el-form :model="form" :rules="rules" ref="ruleForm" class="project-form" :label-width="formLabelWidth">
                <el-form-item label="经销商：">
                    <el-input v-model="form.name" disabled></el-input>
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
                <el-form-item label="合同总额：" prop="contractAmount">
                    <el-input v-model="form.contractAmount" placeholder="请输入合同总额" v-isNum:2="form.contractAmount"> <template slot="append">￥</template></el-input>
                </el-form-item>
                <el-form-item label="设备款总额：" prop="deviceAmount">
                    <el-input v-model="form.deviceAmount" placeholder="请输入设备款总额" v-isNum:2="form.deviceAmount"><template slot="append" placeholder="请输入设备款总额">￥</template></el-input>
                </el-form-item>
                <el-form-item label="设备品类：" prop="deviceCategory">
                    <el-select v-model="form.deviceCategory" placeholder="请选择">
                        <el-option v-for="item in deviceCategoryList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备品牌：" prop="deviceBrand">
                    <el-input v-model="form.deviceBrand" placeholder="请输入设备品牌"></el-input>
                </el-form-item>
                <el-form-item label="上游供应商类型：" prop="upstreamSupplierType">
                    <el-select v-model="form.upstreamSupplierType" placeholder="请选择">
                        <el-option v-for="item in upstreamSupplierTypeList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上游供应商名称：" prop="upstreamSupplierName">
                    <el-input v-model="form.upstreamSupplierName" maxlength="50" placeholder="请输入上游供应商名称"></el-input>
                </el-form-item>
                <el-form-item label="上游接受承兑时间：" prop="upstreamPromiseMonth">
                    <el-input-number v-model="form.upstreamPromiseMonth" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="预估借款金额：" prop="predictLoanAmount">
                    <el-input v-model="form.predictLoanAmount" placeholder="请输入预估借款金额" v-isNum:2="form.predictLoanAmount"> <template slot="append">￥</template></el-input>
                </el-form-item>
                <el-form-item label="预估借款周期：" prop="loanMonth">
                    <el-input-number v-model="form.loanMonth" controls-position="right" @change="handleChange" :min="1" :max="6"></el-input-number>
                </el-form-item>
                <el-form-item label="工程项目回款方式：" prop="loanPayType">
                    <el-form-item label="预付款比例">
                        <el-input v-model="form.advancePaymentProportion" v-isNum:2="form.advancePaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="货到付款比例">
                        <el-input v-model="form.deliveryPaymentProportion" v-isNum:2="form.deliveryPaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="安装进度款比例">
                        <el-input v-model="form.installProgressPaymentProportion" v-isNum:2="form.installProgressPaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="验收款比例">
                        <el-input v-model="form.acceptancePaymentProportion" v-isNum:2="form.acceptancePaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="交付款比例">
                        <el-input v-model="form.realPaymentProportion" v-isNum:2="form.realPaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="审计结算款比例">
                        <el-input v-model="form.auditCalculationPaymentProportion" v-isNum:2="form.auditCalculationPaymentProportion"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="其他">
                        <el-input v-model.trim="form.payOtherText"></el-input>
                    </el-form-item>

                </el-form-item>
                <el-form-item label="附件：" prop="projectUpload" ref="projectUpload">
                    <hosjoyUpload v-model="form.projectUpload" accept='.jpeg,.jpg,.png,.BMP,.pdf' :fileSize='20' :fileNum='15' :action='action' @successCb="onBackUpload()" :uploadParameters='uploadParameters'>
                    </hosjoyUpload>
                </el-form-item>
            </el-form>
            <div class="drawer-footer">
                <div class="drawer-button">
                    <el-button type="info" @click="cancelForm">审 核</el-button>
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="onSaveproject()" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
import { putProjectDetail } from './../api/index'
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
            loading: false,
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            form: {
                upstreamPromiseMonth: 1,
                loanMonth: 1,
                projectUpload: []
            },

            formLabelWidth: '150px',
            progressList: [{ key: 1, value: '项目跟踪阶段' }, { key: 2, value: '招投标' }, { key: 3, value: '合同已签订' }, { key: 4, value: '项目已开工' }],
            typeList: [{ key: 1, value: '地产项目' }, { key: 2, value: '政府共建项目' }, { key: 3, value: '市政项目' }, { key: 4, value: '办公楼' },
                { key: 5, value: '厂房' }, { key: 6, value: '其他' }],
            deviceCategoryList: [{ key: 1, value: '空调' }, { key: 2, value: '采暖' }, { key: 3, value: '新风' }, { key: 4, value: '净水' }, { key: 5, value: '智能化' }, { key: 6, value: '辅材' },
                { key: 7, value: '电梯' }, { key: 8, value: '其他' }],
            upstreamSupplierTypeList: [{ key: 1, value: '厂商' }, { key: 2, value: '代理商' }, { key: 3, value: '经销商' }],
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
                    { required: true, message: '请输入设备款总额', trigger: 'blur' }
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
                    { required: true, message: '请输入上游接受承兑时间', trigger: 'blur' }
                ],
                predictLoanAmount: [
                    { required: true, message: '请输入预估借款金额', trigger: 'blur' }
                ],
                loanMonth: [
                    { required: true, message: '请输入预估借款周期', trigger: 'blur' }
                ],
                loanPayType: [
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
                ],
                projectUpload: [
                    { required: true, message: '请上传附件', trigger: 'blur' }
                ]
            }

        }
    },
    computed: {
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
            this.form = { ...this.projectDetail }
            console.log(this.form)
            this.form.projectUpload = this.form.attachmentUrl ? JSON.parse(this.form.attachmentUrl) : []
        },
        handleChange (value) {
            console.log(value)
        },
        onBackUpload (str) {
        },
        cancelForm () {
            if (JSON.stringify(this.bossDetail) != JSON.stringify(this.copyDetail)) {
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
            this.form.attachmentUrl = JSON.stringify(this.form.projectUpload)
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await putProjectDetail(this.form)
                        this.$message({
                            message: '数据保存成功',
                            type: 'success'
                        })
                        this.$emit('backEvent')
                    } catch (error) {

                    }
                } else {

                }
            })
            console.log(this.form)
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
</style>