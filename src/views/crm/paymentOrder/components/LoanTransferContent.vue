<template>
    <div class="LoanTransferContent">
        <div class="tab-layout">
            <!-- 质押与终审决议信息 -->
            <div class="tab-layout-title" style="marginTop:0">
                <span></span>
                <div class="tab-layout-title-box">
                    质押与终审决议信息：
                    <h-button table @click="handleOpenDialog">编辑</h-button>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>质押信息：</font><span>{{LoanTransferContent.reviewResolutionResponse.pledgeNo||'-'}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>评审决议流程：</font><span>{{LoanTransferContent.reviewResolutionResponse.reviewResolutionNo||'-'}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>货款支付流程：</font><span>{{LoanTransferContent.reviewResolutionResponse.oaNo||'-'}}</span>
                </div>
            </div>
            <!-- 采购合同信息 -->
            <div class="tab-layout-title">
                <span></span>
                <div class="tab-layout-title-box">
                    采购合同信息：
                    <h-button table @click="handleOpenDialogUpload">编辑</h-button>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="font-weight:bold;color:#2f3133"><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>采购单采购合同：</font>
                    <span v-if="LoanTransferContent.contractArchiveDocs.length==0">-</span>
                </div>
            </div>
            <template>
                <div class="info-layout" v-for="item in LoanTransferContent.contractArchiveDocs" :key="item.fileUrl">
                    <div class="info-layout-item">
                        <!-- <a class="info-layout-item-link" :href="item.fileUrl" target="_bank">{{item.fileName}}</a> -->
                        <downloadFileAddToken isPreview :file-name="item.fileName" :file-url="item.fileUrl" :a-link-words="item.fileName"></downloadFileAddToken>
                    </div>
                </div>
            </template>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="font-weight:bold;color:#2f3133">单次采购明细附件：</font><span v-if="LoanTransferContent.purchaseDetailsDocs.length==0">-</span>
                </div>
            </div>
            <template>
                <div class="info-layout" v-for="item in LoanTransferContent.purchaseDetailsDocs" :key="item.fileUrl">
                    <div class="info-layout-item">
                        <a class="info-layout-item-link" :href="item.fileUrl" target="_bank">{{item.fileName}}</a>
                    </div>
                </div>
            </template>
            <!-- 当上游支付方式为银行转账时，不展示下方框选区域 -->
            <div class="tab-layout-title">
                <span></span>
                <div class="tab-layout-title-box">
                    票面金额信息：
                    <h-button table @click="handleOpenDialogVoter">编辑</h-button>
                </div>
            </div>
            <div class="info-layout" v-if="LoanTransferContent.billAmountResponse">
                <!-- CRM/小程序发起货款申请时，为“提交人”姓名；
                Boss后台对票面明细修改后，展示为“更新人”姓名； -->
                <!-- 更新人：玄烨                     更新时间：2021-04-25 14:15:32 -->
                <div class="info-layout-item">
                    <font style="flex: 0 0 85px">提交人：</font><span>{{LoanTransferContent.billAmountResponse.billAmountCreateBy}}</span>
                </div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 70px">提交时间：</font><span>{{LoanTransferContent.billAmountResponse.billAmountCreateTime|formatterTime}}</span>
                </div>
            </div>
            <div class='bill-table' v-if="LoanTransferContent.billAmountResponse">
                <div class='bill-table_flex'>
                    <div class='bill-table_flex--left'>出票张数</div>
                    <div class='bill-table_flex--right'>票面金额(元)</div>
                </div>
                <div class='bill-table_flex' v-for="(item,index) in LoanTransferContent.billAmountResponse.billAmountDetail" :key="index+'billAmountDetail'">
                    <div class='bill-table_flex--left'>第 {{index+1}} 张票</div>
                    <div class='bill-table_flex--right'>{{item.amount|fundMoneyHasTail}}</div>
                </div>
                <div class='bill-table_flex'>
                    <div class='bill-table_flex--left'>合计</div>
                    <div class='bill-table_flex--right'>{{LoanTransferContent.billAmountResponse.totalAmount|fundMoneyHasTail}}</div>
                </div>
            </div>
            <div class="historyRecords">
                <el-collapse @change="handleChangeCollapse">
                    <el-collapse-item title="展开更多票面记录" name="1">
                        <div v-for="(obj,objIndex) in moreBillAmount" :key="objIndex+'table'">
                            <div class="table-title">
                                <div class="table-title-item">
                                    <font style="flex: 0 0 85px">提交人：</font><span>{{obj.billAmountCreateBy}}</span>
                                </div>
                                <div class="table-title-item">
                                    <font style="flex: 0 0 70px">提交时间：</font><span>{{obj.billAmountCreateTime|formatterTime}}</span>
                                </div>
                            </div>
                            <div class='bill-table' v-if="moreBillAmount">
                                <div class='bill-table_flex'>
                                    <div class='bill-table_flex--left'>出票张数</div>
                                    <div class='bill-table_flex--right'>票面金额(元)</div>
                                </div>
                                <div class='bill-table_flex' v-for="(item,index) in obj.billAmountDetail" :key="index + 'moreBillAmount'">
                                    <div class='bill-table_flex--left'>第 {{item.number}} 张票</div>
                                    <div class='bill-table_flex--right'>{{item.amount|fundMoneyHasTail}}</div>
                                </div>
                                <div class='bill-table_flex'>
                                    <div class='bill-table_flex--left'>合计</div>
                                    <div class='bill-table_flex--right'>{{obj.totalAmount|fundMoneyHasTail}}</div>
                                </div>
                            </div>
                        </div>

                    </el-collapse-item>
                </el-collapse>
            </div>

            <!-- 备注信息 -->
            <div class="tab-layout-title">
                <span></span>
                <div class="tab-layout-title-box">
                    备注信息：
                </div>
            </div>
            <div class="tab-textarea">
                <el-input type="textarea" placeholder="可在此填写放款交接中的注意事项等" v-model="loanTransfersConfirm.remark" maxlength="200" rows="5" show-word-limit>
                </el-input>
            </div>

        </div>
        <div class="sure-sub-btn">
            <!-- 需要校验页面必填项不得为空。若为空给予页面提示：“必填项不得为空哦~” -->
            <h-button type='primary' @click="confirmLoanTransfers">确认并发起流程</h-button>
        </div>

        <!-- 质押与终审决议信息 dialog -->
        <el-dialog title="质押与终审决议信息" :close-on-click-modal='false' :visible.sync="openDialog" width="750px" :before-close="()=>onCancel('reviewResolutionForm')" :modal='false'>
            <div class="dialog-ctx reviewResolution">
                <el-form id='elform' :model="reviewResolutionForm" :rules="formRules" label-width="150px" ref="reviewResolutionForm">
                    <el-form-item label="质押信息：" prop='pledgeNo'>
                        <!-- 长度为50位以内字母或数字。 -->
                        <el-input placeholder="请输入中登网质押编号" v-model="reviewResolutionForm.pledgeNo" maxlength="50"></el-input>
                    </el-form-item>
                    <div class="flexlayout" style="margin-left:31px">
                        <em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>评审决议流程： 评审决议编号：{{reviewResolutionForm.reviewResolutionNo||'-'}}
                        <el-form-item label="" prop='reviewResolutionStatus' style="margin-left:-140px">
                            <el-select v-model="reviewResolutionForm.reviewResolutionStatus" placeholder="请选择">
                                <el-option label="已完结" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="flexlayout">
                        <el-form-item label="货款支付流程：" prop='oaNo'>
                            <el-input placeholder="请输入OA货款支付编号" v-model="reviewResolutionForm.oaNo" maxlength="50"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop='oaStatus' style="margin-left:-140px">
                            <el-select v-model="reviewResolutionForm.oaStatus" placeholder="请选择">
                                <el-option label="已完结" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="()=>onCancel('reviewResolutionForm')">取消</h-button>
                <h-button type="primary" @click="submitReviewResolutionForm">确定</h-button>
            </div>
        </el-dialog>
        <!-- 单次采购明细合同 dialog -->
        <el-dialog title="单次采购明细合同" :close-on-click-modal='false' :visible.sync="openDialogUpload" width="750px" :before-close="()=>onCancel('DialogUpload')" :modal='false'>
            <div class="dialog-ctx upload">
                <div class="description">
                    (请上传双方盖章后的采购合同或采购明细附件，上传格式为PDF，单个文件最大允许20M)
                </div>
                <div class="upload-title">
                    <em>*</em>
                    <font style="font-weight:bold">上游采购合同：</font>
                    <div>
                        <!-- A -->
                        <div class="file_box" v-for="(item,index) in uploadForm.contractArchiveDocs" :key="item.fileUrl">
                            <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                            <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                            <em @click="()=>handleDelFile(index,uploadForm.contractArchiveDocs)">删除</em>
                        </div>
                        <!-- B -->
                        <div class="file_box" v-for="(item,index) in uploadForm.loanTransferArchiveDocs" :key="item.fileUrl">
                            <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                            <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                            <em @click="()=>handleDelFile(index,uploadForm.loanTransferArchiveDocs)">删除</em>
                        </div>
                        <OssFileHosjoyUpload :showPreView=false v-model="uploadForm.contractArchiveDocs" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".jpg">
                            <div class="a-line">
                                <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                            </div>
                        </OssFileHosjoyUpload>
                    </div>
                </div>
                <div class="upload-title">
                    <font style="font-weight:bold">单次采购明细附件(若有)：</font>
                    <span v-if="uploadForm.purchaseDetailsDocs.length==0">-</span>
                    <!-- C -->
                    <div>
                        <div class="file_box" v-for="(item,index) in uploadForm.purchaseDetailsDocs" :key="item.fileUrl">
                            <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                            <em> <a :href="item.fileUrl" target="_blank" style="color:#167cd5">预览</a></em>
                            <em @click="()=>handleDelFile(index,uploadForm.purchaseDetailsDocs)">删除</em>
                        </div>
                        <OssFileHosjoyUpload :showPreView=false v-model="uploadForm.purchaseDetailsDocs" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".jpg">
                            <div class="a-line">
                                <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                            </div>
                        </OssFileHosjoyUpload>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="()=>onCancel('DialogUpload')">取消</h-button>
                <h-button type="primary" @click="submitLoanTransferDoc">确定</h-button>
            </div>
        </el-dialog>
        <!-- 票面金额信息 dialog -->
        <el-dialog v-if="openDialogVoter" title="票面金额信息" :close-on-click-modal='false' :visible.sync="openDialogVoter" width="750px" :before-close="()=>onCancel('formVoter')" :modal='false'>
            <div class="dialog-ctx billAmountFormbox">
                <p style="margin:10px 0">注：合计票面金额应等于货款申请金额 (50,000,000元)</p>
                <el-form id='elform' :model="billAmountForm" ref="formVoter" label-position="left" label-width="120px">
                    <el-form-item :label="`第 ${index+1} 张票：`" :prop="'billAmount.' + index + '.amount'" v-for="(item,index) in billAmountForm.billAmount" :key="index+'Voter'" :rules="{
                            required: true, message: '票面金额不能为空', trigger: 'blur'
                        }">
                        <el-input placeholder="请输入票面金额" @input="(val)=>inputChage(val,item)" :value="money(item.amount)">
                            <template slot="append">元</template>
                        </el-input>
                        <span v-if="billAmountForm.billAmount.length>1" class="del-item" @click="()=>delItem(item)">删除</span>
                    </el-form-item>
                </el-form>
                <div class="add-item" @click="addItem">+ 再添加一张银票</div>
                <p style="margin:10px 0 5px">合计票面金额：{{totalAmount|fundMoneyHasTail}} 元</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="()=>onCancel('formVoter')">取消</h-button>
                <h-button type="primary" @click="()=>submitForm()">确定</h-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
// TODO 1.当上游支付方式为银行转账时，不展示下方框选区域 2.operateStatus查看放款交接 3.交接记录缺少操作人 4.票面金额信：提交人、更新人 5.展开更多的判断 6.总金额校验 7.去掉末尾 . 7. 列表弹窗的标题
import { mapState } from 'vuex'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload'
import { ccpBaseUrl, ossAliyun, ossOldBucket } from '@/api/config'
import OssFileUtils from '@/utils/OssFileUtils'
import downloadFileAddToken from '@/components/downloadFileAddToken'
import utils from '@/utils/filters'
import { isNum } from '@/utils/validate/format'
// api
import { postPledgeResolution, getMoreBillAmount, getLoanTransferDoc, postLoanTransferDoc, postBillAmount, postLoanTransfersConfirm } from '../api/index'
export default {
    name: 'LoanTransferContent',
    components: { OssFileHosjoyUpload, downloadFileAddToken },
    props: ['LoanTransferContent', 'paymentOrderId'],
    data () {
        return {
            activeNames: ['1'],
            action: ccpBaseUrl + 'common/files/upload-old',
            openDialog: false,
            openDialogUpload: false,
            openDialogVoter: false,
            reviewResolutionForm: {
                id: '',
                pledgeNo: '', // 质押信息
                paymentOrderId: '', // 支付单id
                reviewResolutionStatus: '', // 评审决议流程状态 1已完结
                oaNo: '', // OA货款支付流程
                oaStatus: ''// OA货款支付流程状态 1已完结
            },
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            uploadForm: {
                paymentOrderId: '',
                contractArchiveDocs: [],
                loanTransferArchiveDocs: [],
                purchaseDetailsDocs: []
            },
            billAmountForm: {
                createBy: '', // this.userInfo.employeeName
                paymentOrderId: '',
                billAmount: [
                    {
                        number: 1, // 票面章数
                        amount: '' // 票面金额
                    }
                ]
            },
            moreBillAmount: '',
            loanTransfersConfirm: {
                paymentOrderId: '',
                remark: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        totalAmount () {
            let total = ''
            total = this.billAmountForm.billAmount.reduce((t, c) => {
                t = Number(t) + Number(c.amount)
                return t
            }, 0)
            return total
        },
        formRules () {
            let rules = {
                pledgeNo: [
                    { required: true, message: '请输入中登网质押编号', trigger: 'blur' }
                ],
                oaNo: [
                    { required: true, message: '请输入OA货款支付编号', trigger: 'blur' }
                ],
                oaStatus: [
                    { required: true, message: '必填项不能为空' }
                ],
                reviewResolutionStatus: [
                    { required: true, message: '必填项不能为空' }
                ]
            }
            return rules
        }
    },
    methods: {
        async confirmLoanTransfers () {
            if (!this.LoanTransferContent.reviewResolutionResponse.pledgeNo || !this.LoanTransferContent.reviewResolutionResponse.reviewResolutionNo || !this.LoanTransferContent.reviewResolutionResponse.oaNo || !this.LoanTransferContent.contractArchiveDocs.length) {
                this.$message.error('必填项不得为空哦~')
            }
            this.loanTransfersConfirm.paymentOrderId = this.paymentOrderId
            await postLoanTransfersConfirm(this.loanTransfersConfirm)
            this.$emit('closeLoanTransferContentVisible')
        },
        // 提交采购合同信息
        async submitLoanTransferDoc () {
            console.log(' 🚗 🚕 🚙 🚌 🚎 this.uploadForm', this.uploadForm)
            await postLoanTransferDoc(this.uploadForm)
            this.getDetailAgain()
            this.onCancel('DialogUpload')
        },
        handleDelFile (index, fileList) {
            fileList.splice(index, 1)
            console.log(' 🚗 🚕 🚙 🚌 🚎 this.up', this.uploadForm)
        },
        // 查看更多票面信息
        async handleChangeCollapse (val) {
            console.log('🚀 --- handleChangeCollapse --- val', val)
            if (val.length) {
                const { data } = await getMoreBillAmount(this.paymentOrderId)
                console.log('🚀 --- handleChangeCollapse --- data', data)
                this.moreBillAmount = data
            }
        },
        // 预览文件
        async handleLink (fileUrl) {
            let tokenUrl = await OssFileUtils.getUrl(fileUrl)
            if (tokenUrl.indexOf(ossOldBucket + '.') === -1) {
                tokenUrl = ossAliyun + tokenUrl.replace(OssFileUtils.hostReg, '')
            }
            window.open(tokenUrl)
        },
        // 更新抽屉所有数据
        getDetailAgain () {
            this.$emit('getDetailAgain')
        },
        // 打开编辑质押与终审决议信息弹窗
        handleOpenDialog () {
            const { reviewResolutionResponse } = this.LoanTransferContent
            this.reviewResolutionForm = {
                id: reviewResolutionResponse.id,
                reviewResolutionNo: reviewResolutionResponse.reviewResolutionNo,
                pledgeNo: reviewResolutionResponse.pledgeNo, // 质押信息
                paymentOrderId: this.paymentOrderId, // 支付单id
                reviewResolutionStatus: reviewResolutionResponse.reviewResolutionStatus, // 评审决议流程状态 1已完结
                oaNo: reviewResolutionResponse.oaNo, // OA货款支付流程
                oaStatus: reviewResolutionResponse.oaStatus// OA货款支付流程状态 1已完结
            }
            this.openDialog = true
        },
        // 取消弹窗
        onCancel (refForm) {
            if (refForm === 'DialogUpload') {
                this.openDialogUpload = false
                return
            }
            this.$refs[refForm].resetFields()
            if (refForm === 'reviewResolutionForm') {
                this.openDialog = false
                return
            }
            if (refForm === 'formVoter') {
                this.openDialogVoter = false
            }
        },
        // 打开采购合同信息弹窗
        async handleOpenDialogUpload () {
            const { data } = await getLoanTransferDoc(this.paymentOrderId)
            console.log('🚀 --- handleOpenDialogUpload --- data', data)
            const { contractArchiveDocs, loanTransferArchiveDocs, purchaseDetailsDocs } = data
            // contractArchiveDocs 只能删
            this.uploadForm = {
                paymentOrderId: this.paymentOrderId,
                contractArchiveDocs: contractArchiveDocs || [],
                loanTransferArchiveDocs: loanTransferArchiveDocs || [],
                purchaseDetailsDocs: purchaseDetailsDocs || []
            }
            this.openDialogUpload = true
        },
        // 编辑票面弹窗
        handleOpenDialogVoter () {
            this.openDialogVoter = true
            const { billAmountResponse } = this.LoanTransferContent
            console.log('🚀 --- handleOpenDialogVoter --- billAmountResponse', billAmountResponse)
            this.billAmountForm.billAmount = [...billAmountResponse.billAmountDetail]
        },
        // 添加票面
        addItem () {
            let index = this.billAmountForm.billAmount.length + 1
            this.billAmountForm.billAmount.push({
                number: index,
                amount: ''
            })
            console.log(' 🚗 🚕 🚙 🚌 🚎 this.billAmountForm', this.billAmountForm)
        },
        // 删除一条票面
        delItem (item) {
            if (this.billAmountForm.billAmount.length == 1) {
                // this.$message.warning('巴拉巴拉')
                return
            }
            let index = this.billAmountForm.billAmount.indexOf(item)
            if (index !== -1) {
                this.billAmountForm.billAmount.splice(index, 1)
            }
        },
        // 提交票面
        submitForm () {
            this.$refs['formVoter'].validate(async (valid) => {
                if (valid) {
                    if (this.totalAmount != this.LoanTransferContent.billAmountResponse.totalAmount) {
                        console.log('🚀 --- ', this.totalAmount)
                        this.$message.error(`提示：合计票面金额应等于货款申请金额 ${this.LoanTransferContent.billAmountResponse.totalAmount}`)
                        return
                    }
                    this.billAmountForm.createBy = this.userInfo.employeeName
                    this.billAmountForm.paymentOrderId = this.paymentOrderId
                    console.log('🚀 --- billAmountForm', this.billAmountForm)
                    await postBillAmount(this.billAmountForm)
                    this.getDetailAgain()
                    this.onCancel('formVoter')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        money (val) {
            return utils.money(val)
        },
        inputChage (val, item) {
            let num = isNum(val, 2)
            if (num == '.' || !num) {
                num = ''
            }
            item.amount = num
            console.log('🚀 --- inputChage --- item', item)
        },
        // 提交质押与终审决议信息
        submitReviewResolutionForm () {
            this.$refs['reviewResolutionForm'].validate(async (valid) => {
                console.log('🚀 --- this.reviewResolutionForm', this.reviewResolutionForm)
                if (valid) {
                    await postPledgeResolution(this.reviewResolutionForm)
                    this.getDetailAgain()
                    this.openDialog = false
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    },
    mounted () {
        console.log(' 🚗 🚕 🚙 🚌 🚎 ', this.LoanTransferContent)
        this.loanTransfersConfirm.remark = this.LoanTransferContent.reviewResolutionResponse.remark
    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>
