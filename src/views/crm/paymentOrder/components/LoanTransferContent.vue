<template>
    <div class="LoanTransferContent">
        <div class="tab-layout">
            <!-- 质押与终审决议信息 -->
            <div class="tab-layout-title" style="marginTop:0">
                <span></span>
                <div class="tab-layout-title-box">
                    质押与终审决议信息
                    <h-button table @click="handleOpenDialog" v-if="operateStatus==1&&!LoanTransferContent.reviewResolutionResponse.pledgeNo&&hosAuthCheck(Auths.CRM_PAYMENT_ZYINFO)">上传质押信息</h-button>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex:0 0 110px;"><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>质押信息：</font><span>{{LoanTransferContent.reviewResolutionResponse.pledgeNo||'-'}}</span>
                </div>
            </div>
            <!-- <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex:0 0 110px;"><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>评审决议流程：</font>
                    <span>{{LoanTransferContent.reviewResolutionResponse.reviewResolutionStatus==1?'已完结':''}}{{LoanTransferContent.reviewResolutionResponse.reviewResolutionStatus==1?' （':''}}{{LoanTransferContent.reviewResolutionResponse.reviewResolutionNo||'-'}}{{LoanTransferContent.reviewResolutionResponse.reviewResolutionStatus==1?'）':''}}</span>
                </div>
            </div> -->
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex:0 0 110px;"><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>货款支付流程：</font>
                    <span>{{jOaStatus}}{{LoanTransferContent.reviewResolutionResponse.reviewResolutionStatus==1?' （':''}}{{LoanTransferContent.reviewResolutionResponse.oaNo||''}}{{LoanTransferContent.reviewResolutionResponse.reviewResolutionStatus==1?'）':''}}</span>
                </div>
            </div>
            <!-- 采购合同信息 -->
            <div class="tab-layout-title">
                <span></span>
                <div class="tab-layout-title-box">
                    采购合同信息
                    <h-button table @click="handleOpenDialogUpload" v-if="operateStatus==1">编辑</h-button>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="font-weight:bold;color:#2f3133"><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>采购单采购合同：</font>
                    <span v-if="LoanTransferContent.contractArchiveDocs.length==0">-</span>
                </div>
            </div>
            <template>
                <div class="info-layout" v-for="(item,index) in LoanTransferContent.contractArchiveDocs" :key="index">
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
                        <!-- <a class="info-layout-item-link" :href="item.fileUrl" target="_bank">{{item.fileName}}</a> -->
                        <downloadFileAddToken isPreview :file-name="item.fileName" :file-url="item.fileUrl" :a-link-words="item.fileName"></downloadFileAddToken>
                    </div>
                </div>
            </template>
            <!-- 收款人信息 -->
            <div class="tab-layout-title">
                <span></span>
                <div class="tab-layout-title-box">
                    收款人信息
                    <h-button table @click="handleSuppDialog" v-if="operateStatus==1">编辑</h-button>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex:0 0 110px;"><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>供应商名称：</font><span>{{LoanTransferContent.supplierCompanyName||'-'}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex:0 0 140px;"><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>供应商开户行名称：</font><span>{{LoanTransferContent.supplierAccountName||'-'}}</span>
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex:0 0 130px;"><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>供应商银行账号：</font><span>{{LoanTransferContent.supplierAccountNo||'-'}}</span>
                     (<em v-if="LoanTransferContent.supplierLabel" :class="LoanTransferContent.supplierLabel&&className.get(LoanTransferContent.supplierLabel.code)">
                                     {{LoanTransferContent.supplierLabel.desc}}
                                </em>)
                </div>
            </div>
            <div class="info-layout">
                <div class="info-layout-item">
                    <font style="flex:0 0 110px;"><em style="color:#F56C6C;font-style: normal;margin-right: 3px;">*</em>银行联行号：</font><span>{{LoanTransferContent.supplierBankNo||'-'}}</span>
                </div>
            </div>
            <!-- 当上游支付方式为银行转账时，不展示下方框选区域 supplierPaymentType 上游支付方式:1-银行转帐;2-银行承兑-->
            <div class="tab-layout-title" v-if="LoanTransferContent.supplierPaymentType!=upstreamPaymentMethod.bankTransfer">
                <span></span>
                <div class="tab-layout-title-box">
                    票面金额信息
                    <h-button table @click="handleOpenDialogVoter" v-if="operateStatus==1">编辑</h-button>
                </div>
            </div>
            <div class="info-layout" v-if="LoanTransferContent.billAmountResponse&&LoanTransferContent.supplierPaymentType!=upstreamPaymentMethod.bankTransfer">
                <!-- CRM/小程序发起货款申请时，为“提交人”姓名；
                Boss后台对票面明细修改后，展示为“更新人”姓名； -->
                <div class="info-layout-item">
                    <font style="flex: 0 0 85px">
                        {{LoanTransferContent.billAmountNumber?'更新人：':'提交人：'}}
                    </font>
                    <span>{{LoanTransferContent.billAmountResponse.billAmountCreateBy}}</span>
                </div>
                <div class="info-layout-item">
                    <font style="flex: 0 0 70px">
                        {{LoanTransferContent.billAmountNumber?'更新时间：':'提交时间：'}}
                    </font>
                    <span>{{LoanTransferContent.billAmountResponse.billAmountCreateTime|momentFormat}}</span>
                </div>
            </div>
            <div class='bill-table' v-if="LoanTransferContent.billAmountResponse&&LoanTransferContent.supplierPaymentType!=upstreamPaymentMethod.bankTransfer">
                <div class='bill-table_flex'>
                    <div class='bill-table_flex--left'>出票张数</div>
                    <div class='bill-table_flex--right'>票面金额(元)</div>
                </div>
                <div class='bill-table_flex' v-for="(item,index) in LoanTransferContent.billAmountResponse.billAmountDetail" :key="index+'billAmountDetail'">
                    <div class='bill-table_flex--left'>第 {{index+1}} 张票</div>
                    <div class='bill-table_flex--right'>{{item.amount|moneyFormat}}</div>
                </div>
                <div class='bill-table_flex'>
                    <div class='bill-table_flex--left'>合计</div>
                    <div class='bill-table_flex--right'>{{LoanTransferContent.billAmountResponse.totalAmount|moneyFormat}}</div>
                </div>
            </div>
            <div class="historyRecords" v-if="LoanTransferContent.billAmountNumber&&LoanTransferContent.supplierPaymentType!=upstreamPaymentMethod.bankTransfer">
                <el-collapse @change="handleChangeCollapse">
                    <el-collapse-item title="展开更多票面记录" name="1">
                        <div v-for="(obj,objIndex) in moreBillAmount" :key="objIndex+'table'">
                            <div class="info-layout" style="font-size: 14px;">
                                <div class="info-layout-item">
                                    <font style="flex: 0 0 85px;">{{objIndex==moreBillAmount.length-1?'提交人：':'更新人：'}}</font><span>{{obj.billAmountCreateBy}}</span>
                                </div>
                                <div class="info-layout-item">
                                    <font style="flex: 0 0 70px;">{{objIndex==moreBillAmount.length-1?'提交时间：':'更新时间：'}}</font><span>{{obj.billAmountCreateTime|momentFormat}}</span>
                                </div>
                            </div>
                            <div class='bill-table' v-if="moreBillAmount">
                                <div class='bill-table_flex'>
                                    <div class='bill-table_flex--left'>出票张数</div>
                                    <div class='bill-table_flex--right'>票面金额(元)</div>
                                </div>
                                <div class='bill-table_flex' v-for="(item,index) in obj.billAmountDetail" :key="index + 'moreBillAmount'">
                                    <div class='bill-table_flex--left'>第 {{item.number}} 张票</div>
                                    <div class='bill-table_flex--right'>{{item.amount|moneyFormat}}</div>
                                </div>
                                <div class='bill-table_flex'>
                                    <div class='bill-table_flex--left'>合计</div>
                                    <div class='bill-table_flex--right'>{{obj.totalAmount|moneyFormat}}</div>
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
                    备注信息
                </div>
            </div>
            <div class="tab-textarea">
                <el-input v-if="operateStatus==1" type="textarea" placeholder="可在此填写放款交接中的注意事项等" v-model="loanTransfersConfirm.remark" maxlength="200" rows="5" show-word-limit>
                </el-input>
                <p v-else>{{loanTransfersConfirm.remark||'-'}}</p>
            </div>

        </div>
        <div class="sure-sub-btn" v-if="operateStatus==1">
            <!-- 需要校验页面必填项不得为空。若为空给予页面提示：“必填项不得为空哦~” -->
            <h-button type='primary' @click="confirmLoanTransfers">确认并发起流程</h-button>
        </div>
        <!-- 收款人信息 -->
        <el-dialog title="收款人信息" :close-on-click-modal='false' :visible.sync="suppDialog" width="750px" :before-close="()=>onCancel('supplierForm')" :modal='false'>
            <el-form id='elform' :model="supplierForm" :rules="supplierRules" label-width="180px" label-position='right' ref="supplierForm">
                <el-form-item label="供应商名称：" style="marginLeft:-8px">
                    <el-input placeholder="供应商名称" v-model="supplierForm.supplierCompanyName" disabled></el-input>
                </el-form-item>
                <el-form-item label="供应商开户行名称：" prop='supplierAccountName' style="marginLeft:-8px">
                    <el-input placeholder="供应商开户行名称" v-model="supplierForm.supplierAccountName" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="供应商银行账号：" prop='supplierAccountNo' style="marginLeft:-8px">
                    <el-input placeholder="供应商银行账号" v-model="supplierForm.supplierAccountNo" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="银行联行号：" prop='supplierBankNo' style="marginLeft:-8px">
                    <el-input placeholder="银行联行号" v-model="supplierForm.supplierBankNo" maxlength="12"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <h-button @click="()=>onCancel('supplierForm')">取消</h-button>
                <h-button type="primary" @click="submitSupp">确定</h-button>
            </div>
        </el-dialog>
        <!-- 质押与终审决议信息 dialog -->
        <el-dialog title="质押信息" :close-on-click-modal='false' :visible.sync="openDialog" width="750px" :before-close="()=>onCancel('reviewResolutionForm')" :modal='false'>
            <div class="dialog-ctx reviewResolution">
                <el-form id='elform' :model="reviewResolutionForm" :rules="formRules" label-width="180px" label-position='right' ref="reviewResolutionForm">
                    <!--<div class="reviewResolutionForm-title" style="marginTop:0px">
                        质押信息：
                    </div>-->
                    <el-form-item label="中登网质押编号：" prop='pledgeNo' style="marginLeft:-8px">
                        <!-- 长度为50位以内字母或数字。 -->
                        <el-input placeholder="请输入中登网质押编号" v-model="reviewResolutionForm.pledgeNo" maxlength="50"></el-input>
                    </el-form-item>
                    <!--<div class="reviewResolutionForm-title">
                        货款支付流程：
                    </div>
                    <el-form-item label="OA货款支付编号：" prop='oaNo' style="marginLeft:-9px">
                        <el-input placeholder="请输入OA货款支付编号" v-model="reviewResolutionForm.oaNo" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="OA货款支付流程状态：" prop='oaStatus' style="marginLeft:-10px;marginTop:20px">
                        <el-select v-model="reviewResolutionForm.oaStatus" placeholder="请选择">
                            <el-option label="已完结" :value="1"></el-option>
                        </el-select>
                    </el-form-item>-->

                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="()=>onCancel('reviewResolutionForm')">取消</h-button>
                <h-button type="primary" @click="submitReviewResolutionForm">提交质押信息</h-button>
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
                        <div class="file_box" v-for="(item,index) in uploadForm.contractArchiveDocs" :key="index">
                            <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                            <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                            <em @click="()=>handleDelFile(index,uploadForm.contractArchiveDocs)">删除</em>
                        </div>
                        <!-- B -->
                        <div class="file_box" v-for="(item,index) in uploadForm.loanTransferArchiveDocs" :key="index">
                            <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                            <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                            <em @click="()=>handleDelFile(index,uploadForm.loanTransferArchiveDocs)">删除</em>
                        </div>
                        <OssFileHosjoyUpload :showPreView=false v-model="uploadForm.loanTransferArchiveDocs" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".pdf">
                            <div class="a-line">
                                <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                            </div>
                        </OssFileHosjoyUpload>
                        <el-button type="info" size="mini" class="upload_history" @click="handleShowHistory">
                            选择历史上传合同
                        </el-button>
                    </div>
                </div>
                <div class="upload-title">
                    <font style="font-weight:bold">单次采购明细附件(若有)：</font>
                    <!-- C -->
                    <div>
                        <div class="file_box" v-for="(item,index) in uploadForm.purchaseDetailsDocs" :key="index">
                            <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                            <em> <a @click="()=>handleLink(item.fileUrl)" target="_blank" style="color:#167cd5">预览</a></em>
                            <em @click="()=>handleDelFile(index,uploadForm.purchaseDetailsDocs)">删除</em>
                        </div>
                        <OssFileHosjoyUpload :showPreView=false v-model="uploadForm.purchaseDetailsDocs" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".pdf">
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
        <!-- 历史合同dialog -->
        <el-dialog title="历史上传合同" :close-on-click-modal='false' :visible.sync="openDialogContract" width="750px" :before-close="()=>onCancel('dialogContract')" :modal='false'>
            <div class="contract_list">
                <div class="contract_box" v-for="(item,index) in historyCotract" :key="index">
                    <span class="contract_box-tit">
                         <downloadFileAddToken isType="main" isPreview :file-name="item.fileName" :file-url="item.fileUrl" :a-link-words="item.fileName"></downloadFileAddToken>
                    </span>
                    <span class="contract_box-time">{{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
                    <span class="contract_box-choose" @click="handleChoose(item)">选中</span>
                </div>
            </div>
            <div class="contract_page">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryParams.pageNumber" :page-size.sync="queryParams.pageSize"
                layout="total, sizes, prev, pager, next" :total="page.total">
                </el-pagination>
            </div>
        </el-dialog>
        <!-- 票面金额信息 dialog -->
        <el-dialog v-if="openDialogVoter" title="票面金额信息" :close-on-click-modal='false' :visible.sync="openDialogVoter" width="750px" :before-close="()=>onCancel('formVoter')" :modal='false'>
            <div class="dialog-ctx billAmountFormbox">
                <p style="margin:10px 0">注：合计票面金额应等于采购金额 ({{LoanTransferContent.purchaseAmount|moneyFormat}}元)</p>
                <el-form id='elform' :model="billAmountForm" ref="formVoter" label-position="left" label-width="120px">
                    <el-form-item :label="`第 ${index+1} 张票：`" :prop="'billAmount.' + index + '.amount'" v-for="(item,index) in billAmountForm.billAmount" :key="index+'Voter'" :rules="rules">
                        <el-input placeholder="请输入票面金额" @input="(val)=>inputChage(val,item)" :value="money(item.amount)">
                            <template slot="append">元</template>
                        </el-input>
                        <span v-if="billAmountForm.billAmount.length>1" class="del-item" @click="()=>delItem(item)">删除</span>
                    </el-form-item>
                </el-form>
                <div class="add-item" @click="addItem">+ 再添加一张银票</div>
                <p style="margin:10px 0 5px">合计票面金额：{{totalAmount|moneyFormat}} 元</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button @click="()=>onCancel('formVoter')">取消</h-button>
                <h-button type="primary" @click="()=>submitForm()">确定</h-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { mapState } from 'vuex'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload'
import { ccpBaseUrl, ossAliyun, ossOldBucket } from '@/api/config'
import OssFileUtils from '@/utils/OssFileUtils'
import downloadFileAddToken from '@/components/downloadFileAddToken'
import utils from '@/utils/filters'
import * as Auths from '@/utils/auth_const'
import { isNum } from '@/utils/validate/format'
import moment from 'moment'
// api
import { postPledgeResolution, getMoreBillAmount, getLoanTransferDoc, postLoanTransferDoc, postBillAmount, postLoanTransfersConfirm, getReviewResolution, postSupplierLoan, getHistoryContract, postPledgeSave } from '../api/index'
const className = new Map([[0, 'red'],
    [10, 'red'],
    [11, 'green'],
    [12, 'red'],
    [20, 'red'],
    [21, 'red'],
    [22, 'red'],
    [30, 'red'],
    [31, 'green'],
    [32, 'red']])
export default {
    name: 'LoanTransferContent',
    components: { OssFileHosjoyUpload, downloadFileAddToken },
    props: ['LoanTransferContent', 'paymentOrderId', 'operateStatus'],
    data () {
        return {
            moment,
            Auths,
            className,
            suppDialog: false,
            // 上游支付方式:1-银行转帐;2-银行承兑
            upstreamPaymentMethod: {
                bankTransfer: 1,
                bankAcceptance: 2
            },
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                paymentOrderId: ''
            },
            page: {
                total: 0
            },
            historyCotract: [],
            activeNames: ['1'],
            action: ccpBaseUrl + 'common/files/upload-old',
            openDialog: false,
            openDialogUpload: false,
            openDialogVoter: false,
            supplierForm: {

            },
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
            },
            openDialogContract: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        totalAmount () {
            let total = ''
            total = this.billAmountForm.billAmount.reduce((t, c) => {
                // t = Number(t) + Number(c.amount)
                t = this.$plus(Number(t), Number(c.amount))
                return t
            }, 0)
            return total
        },
        jOaStatus () {
            let _oaStatus = this.LoanTransferContent.reviewResolutionResponse.oaStatus
            let _showString = ''
            if (_oaStatus * 1 === 1) {
                _showString = '已完结'
            } else if (_oaStatus * 1 === 0) {
                _showString = '审批中'
            } else if (_oaStatus * 1 === 2) {
                _showString = '未通过'
            }
            return _showString
        },
        supplierRules () {
            return {
                supplierAccountName: [
                    { required: true, message: '供应商开户行名称不能为空', trigger: 'blur' }
                ],
                supplierAccountNo: [
                    { required: true, message: '供应商银行账号不能为空', trigger: 'blur' }
                ],
                supplierBankNo: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                return callback(new Error('银行联行号不能为空'))
                            } else if (value.length && value.length < 12) {
                                return callback(new Error('请输入正确的12位联行号数字！'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            }
        },
        rules () {
            return {
                required: true,
                validator: (rule, value, callback) => {
                    if (value && value == 0) {
                        return callback(new Error('单张银票票面金额不能为 0'))
                    }
                    if (!value) {
                        return callback(new Error('票面金额不能为空'))
                    }
                    return callback()
                },
                trigger: 'blur'
            }
        },
        formRules () {
            let rules = {
                pledgeNo: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            var Reg = /^[A-Za-z0-9]+$/
                            if (value && !(Reg.test(value))) {
                                return callback(new Error('只能为数字或字母'))
                            }
                            if (!value) {
                                return callback(new Error('请输入中登网质押编号'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                /* oaNo: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            var Reg = /^[A-Za-z0-9]+$/
                            if (value && !(Reg.test(value))) {
                                return callback(new Error('只能为数字或字母'))
                            }
                            if (!value) {
                                return callback(new Error('请输入OA货款支付编号'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                oaStatus: [
                    { required: true, message: '必填项不能为空' }
                ], */
                reviewResolutionStatus: [
                    { required: true, message: '必填项不能为空' }
                ]
            }
            return rules
        }
    },
    methods: {
        async confirmLoanTransfers () {
            if (!this.LoanTransferContent.reviewResolutionResponse.pledgeNo || !this.LoanTransferContent.reviewResolutionResponse.oaNo || !this.LoanTransferContent.contractArchiveDocs.length) {
                this.$message.error('必填项不得为空哦~')
                return
            }
            this.loanTransfersConfirm.paymentOrderId = this.paymentOrderId
            await postLoanTransfersConfirm(this.loanTransfersConfirm)
            this.$emit('closeLoanTransferContentVisible')
        },
        // 历史合同数据
        async handleShowHistory () {
            this.queryParams.paymentOrderId = this.paymentOrderId
            const { data } = await getHistoryContract(this.queryParams)
            this.historyCotract = data.records
            this.page.total = data.total
            this.openDialogContract = true
        },
        handleChoose (val) {
            let _arr = this.uploadForm.loanTransferArchiveDocs.filter(item => JSON.stringify(item.fileUrl) == JSON.stringify(val.fileUrl))
            if (_arr.length > 0) {
                this.$message.warning('该合同已被选中了')
            } else {
                this.uploadForm.loanTransferArchiveDocs.push(val)
                this.openDialogContract = false
            }
        },
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`)
            this.queryParams.pageSize = val
            this.handleShowHistory()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val
            this.handleShowHistory()
        },
        // 提交采购合同信息
        async submitLoanTransferDoc () {
            if (this.uploadForm.contractArchiveDocs.length == 0 && this.uploadForm.loanTransferArchiveDocs.length == 0) {
                this.$message.error('页面必填项不得为空~')
                return
            }
            await postLoanTransferDoc(this.uploadForm)
            this.getDetailAgain()
            this.onCancel('DialogUpload')
        },
        handleDelFile (index, fileList) {
            fileList.splice(index, 1)
        },
        // 查看更多票面信息
        async handleChangeCollapse (val) {
            if (val.length) {
                const { data } = await getMoreBillAmount(this.paymentOrderId)
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
        handleSuppDialog (val) {
            this.suppDialog = true
            this.supplierForm = {
                supplierCompanyName: this.LoanTransferContent.supplierCompanyName,
                supplierAccountName: this.LoanTransferContent.supplierAccountName,
                supplierAccountNo: this.LoanTransferContent.supplierAccountNo,
                supplierBankNo: this.LoanTransferContent.supplierBankNo
            }
        },
        // 打开编辑质押与终审决议信息弹窗
        async handleOpenDialog () {
            const { data: reviewResolutionResponse } = await getReviewResolution(this.paymentOrderId)
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
            if (refForm === 'dialogContract') {
                this.openDialogContract = false
            }
            if (refForm === 'supplierForm') {
                this.$refs[refForm].resetFields()
                this.suppDialog = false
                return
            }
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
            const { contractArchiveDocs, loanTransferArchiveDocs, purchaseDetailsDocs } = data
            // contractArchiveDocs 后端规定只能删
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
            this.billAmountForm.billAmount = JSON.parse(JSON.stringify(billAmountResponse.billAmountDetail))
        },
        // 添加票面
        addItem () {
            let index = this.billAmountForm.billAmount.length + 1
            this.billAmountForm.billAmount.push({
                number: index,
                amount: ''
            })
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
        submitSupp () {
            this.supplierForm.id = this.paymentOrderId
            this.$refs['supplierForm'].validate(async (valid) => {
                if (valid) {
                    await postSupplierLoan(this.supplierForm)
                    this.getDetailAgain()
                    this.onCancel('supplierForm')
                }
            })
        },
        // 提交票面
        submitForm () {
            this.$refs['formVoter'].validate(async (valid) => {
                if (valid) {
                    if (this.totalAmount != this.LoanTransferContent.purchaseAmount) {
                        this.$message.error(`提示：合计票面金额应等于采购金额`)
                        return
                    }
                    this.billAmountForm.billAmount.map((item, index) => {
                        if (typeof item.amount === 'string' && item.amount.charAt(item.amount.length - 1) === '.') {
                            item.amount = item.amount.substr(0, item.amount.length - 1)
                        }
                        item.number = index + 1
                    })
                    this.billAmountForm.createBy = this.userInfo.employeeName
                    this.billAmountForm.paymentOrderId = this.paymentOrderId
                    await postBillAmount(this.billAmountForm)
                    this.getDetailAgain()
                    this.onCancel('formVoter')
                } else {
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
        },
        // 提交质押与终审决议信息
        submitReviewResolutionForm () {
            this.$refs['reviewResolutionForm'].validate(async (valid) => {
                if (valid) {
                    // await postPledgeResolution(this.reviewResolutionForm)
                    const { paymentOrderId, pledgeNo } = this.reviewResolutionForm
                    await postPledgeSave({ paymentOrderId, pledgeNo })
                    this.getDetailAgain()
                    this.openDialog = false
                } else {
                    return false
                }
            })
        }
    },
    mounted () {
        this.loanTransfersConfirm.remark = this.LoanTransferContent.reviewResolutionResponse.remark
    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>
