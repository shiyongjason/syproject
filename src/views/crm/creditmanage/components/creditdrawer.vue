<template>
    <div>
        <el-drawer title="VIP详情" :visible.sync="drawer" :before-close="handleClose" size="50%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="信用详情" name="1"></el-tab-pane>
                <el-tab-pane label="授信资料清单" name="2"></el-tab-pane>
            </el-tabs>
            <div class="drawer-wrap" v-if="activeName=='1'">
                <div class="drawer-wrap_title">江苏舒适云信息技术有限公司</div>
                <div class="drawer-wrap_btn">
                    <div class="drawer-wrap_btn-flex">信用详情</div>
                </div>
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :isMultiple="false" :isAction="true" :actionMinWidth=100 :isShowIndex='true' :maxHeight=500>

                    <template slot="status" slot-scope="scope">
                        <span :class="scope.data.row.status?'colred':'colgry'">{{scope.data.row.status?'正常':'过期'}}</span>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <el-button type="success" size="mini" plain @click="onEditVip(scope.data.row.id)">设置信用评级</el-button>
                    </template>
                </basicTable>
                <p>
                    最近维护时间：{{moment(this.creditPage.updateTime).format('YYYY-MM-DD HH:mm:ss')}}
                </p>
                <p>
                    最近维护人：{{this.creditPage.updateBy||'-'}}（{{this.creditPage.updateBy||'-'}}）
                </p>
            </div>
            <div class="collect-wrapbox" v-if="activeName=='2'">
                <el-form ref="approveForm" class="demo-ruleForm">
                    <div class="" v-for="item in approveForm" :key="item.firstCatagoryId">
                        <div class="collect-title">{{item.firstCatagoryName}} <el-button type="primary" size="mini" @click="onClickRecord">打回记录</el-button>
                        </div>
                        <template v-for="obj in item.respRiskCheckDocTemplateList">
                            <el-form-item label="" prop="type" :key="'item'+obj.templateId">
                                <div class="collect-boxflex">
                                    <div>
                                        <el-checkbox label="" name="type" size="medium" v-model="obj.callback" :disabled=obj.refuse></el-checkbox>
                                    </div>
                                    <div class="collect-boxtxt">
                                        <h3><i v-if="obj.mondatoryFlag">*</i>{{obj.secondCatagoryName}}<span class="collect-call" v-if="obj.refuse">已打回，待分部补充</span></h3>
                                        <p>备注：{{obj.remark?obj.remark:'-'}}</p>
                                        <p>规定格式：{{obj.formatName}}</p>
                                    </div>
                                </div>
                                <div class="upload-file_list" v-for="(jtem,index) in obj.creditDocuments" :key="index">
                                    <p>
                                        <span class="posrtv">
                                            <template v-if="jtem&&jtem.fileUrl">
                                                <i class="el-icon-document"></i>
                                                <a :href="jtem.fileUrl" target="_blank">
                                                    <font>{{jtem.fileName}}</font>
                                                </a>
                                            </template>
                                        </span>
                                    </p>
                                    <p style="flex:0.5">{{moment(jtem.createTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
                                    <p>
                                        <font class="fileItemDownLoad" @click="()=>{onDelete(obj,index)}">删除</font>
                                        <font class="fileItemDownLoad" v-if="jtem.fileName.toLowerCase().indexOf('.png') != -1||jtem.fileName.toLowerCase().indexOf('.jpg') != -1||jtem.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(jtem.fileUrl, jtem.fileName)">下载</font>
                                        <font v-else><a class='fileItemDownLoad' :href="jtem.fileUrl" target='_blank'>下载</a></font>
                                    </p>
                                </div>
                                <hosjoyUpload v-model="obj.creditDocuments" :showPreView=false :fileSize='200' :fileNum='50' :action='action' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb(obj)}" style="margin:10px 0 0 5px">
                                    <el-button type="primary">上 传</el-button>
                                </hosjoyUpload>
                            </el-form-item>
                        </template>
                    </div>
                </el-form>
            </div>
            <div class="drawer-footer">
                <div class="drawer-button">
                     <el-button type="success" @click="onCallback">打回补充</el-button>
                     <el-button type="primary" @click="onSubmitDoc">审核通过</el-button>
                    <el-button @click="handleClose">取 消</el-button>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="设置" :visible.sync="dialogVisible" width="40%" :before-close="onCloseDrawer" :close-on-click-modal=false>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="企业名称：">
                    <el-input v-model="ruleForm.companyName" disabled></el-input>
                </el-form-item>
                <el-form-item label="信用评级：" prop="creditLevel">
                    <el-select v-model="ruleForm.creditLevel" placeholder="请选择">
                        <el-option v-for="item in droplist" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务费：" prop="serviceFee">
                    <!-- <el-input v-model="ruleForm.serviceFee" v-isNum:1="ruleForm.serviceFee" maxlength='2'></el-input> -->
                    <el-input-number v-model="ruleForm.serviceFee" controls-position="right" :min="0" :max="100" :precision=1></el-input-number>
                </el-form-item>
                <el-form-item label="可代采购额度：" prop="purchaseQuota">
                    <el-input v-model="ruleForm.purchaseQuota" v-isNum:6="ruleForm.purchaseQuota" maxlength='15'><template slot="append">万元</template></el-input>
                </el-form-item>
                <el-form-item label="信用授予日期：" prop="startTime">
                    <el-date-picker v-model="ruleForm.startTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="信用到期时间" :picker-options="pickerOptionsStart" type="date" @change="datePickerChange"></el-date-picker>
                </el-form-item>
                <el-form-item label="信用到期时间：" prop="endTime">
                    <el-date-picker v-model="ruleForm.endTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="信用到期时间" :picker-options="pickerOptionsEnd" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="说明" remark>
                    <el-input type="textarea" v-model="ruleForm.remark" maxlength="200" show-word-limit :rows="6"></el-input>
                </el-form-item>
                <el-form-item label="附件：" prop="projectUpload" ref="projectUpload">
                    <hosjoyUpload v-model="ruleForm.projectUpload" accept='.jpeg,.jpg,.png,.word,.pdf,.ppt,.excel' :fileSize='2' :fileNum='9' :action='action' :uploadParameters='uploadParameters'>
                    </hosjoyUpload>
                    2M以内，支持png、jpg，jpeg，pdf，excel、word、ppt等格式
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseDrawer">取 消</el-button>
                <el-button type="primary" @click="submitForm()" :loading=isloading>{{isloading?'保存中...':'确定'}}</el-button>
            </span>
        </el-dialog>
        <el-dialog title="打回记录" :visible.sync="recordsVisible" width="30%" :before-close="()=>recordsVisible = false" :modal=false>
            <div class="project-record">
                <template v-if="refuseRecord.length>0">
                    <el-timeline>
                        <el-timeline-item :timestamp="moment(item.createTime).format('YYYY-MM-DD  HH:mm:ss')+' 打回操作人：'+(item.createBy||'-')" placement="top" v-for="item in refuseRecord" :key=item.id>
                            <el-card>
                                <p>待补充类目:{{item.secondCategoryNames}}</p>
                                <p>待补充原因：{{item.remark||'-'}}</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </template>
                <template v-else>
                    <p>暂无记录</p>
                </template>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="recordsVisible = false">取 消</el-button>
            </span>
        </el-dialog>
          <el-dialog title="打回原因" :visible.sync="reasonVisible" width="30%" :before-close="onCloseCol" :modal=false>
            <el-form ref="refuseForm" :model="refuseForm" :rules="refuseFormRules" label-width="100px" style="margin-top:20px">
                <el-form-item label="打回原因：" prop="remark">
                    <el-input type="textarea" v-model.trim="refuseForm.remark" maxlength="500" :rows="5" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseCol">取 消</el-button>
                <el-button type="primary" @click="onRefuse" :loading=resloading>{{resloading?'确 定':'保 存'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
import { mapGetters, mapActions, mapState } from 'vuex'
import { postCreditDetail, putCreditDocument, refuseCredit } from '../api'
import { CREDITLEVEL } from '../../const'
import { handleImgDownload } from '../../projectInformation/utils'
export default {
    name: 'creditdrawer',
    data () {
        return {
            handleImgDownload,
            moment,
            isloading: false,
            resloading: false,
            activeName: '1',
            drawer: false,
            companyId: '',
            droplist: CREDITLEVEL,
            tableData: [],
            tableLabel: [
                { label: '信用评级', prop: 'creditLevel', width: '' },
                { label: '服务费', prop: 'serviceFee', width: '150' },
                { label: '可代采购额度(万元)', prop: 'purchaseQuota', width: '150', formatters: 'money' },
                { label: '剩余代采购额度(万元)', prop: 'remainPurchaseQuota', width: '150', formatters: 'money' },
                { label: '信用到期日', prop: 'endTime', width: '180', formatters: 'dateTimes' },
                { label: '状态', prop: 'status' }
            ],
            paginationInfo: {},
            dialogVisible: false,
            recordsVisible: false,
            reasonVisible: false,
            refuseRecord: [],
            rules: {
                creditLevel: [
                    { required: true, message: '请选信用评级', trigger: 'change' }
                ],
                serviceFee: [
                    { required: true, message: '请输入服务费', trigger: 'blur' }
                ],
                purchaseQuota: [
                    { required: true, message: '请输入可代采购额度', trigger: 'blur' },
                    {
                        validator: (r, v, callback) => {
                            if (parseFloat(this.ruleForm.purchaseQuota) > 100000000) {
                                return callback(new Error('可代采购额度大于1千万'))
                            }
                            return callback()
                        }
                    }
                ],
                startTime: [
                    { required: true, message: '请选择信用授予日期', trigger: 'change' }
                ],
                endTime: [
                    { required: true, message: '请选择信用到期时间', trigger: 'change' }
                ]
            },
            ruleForm: {
                projectUpload: [],
                serviceFee: 0
            },
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            newRuleForm: {},
            approveForm: {},
            mondatoryFlagRes: [],
            creditDocumentList: [],
            refuseForm: {
                createBy: '',
                companyId: '',
                remark: '',
                templateIds: ''
            },
            refuseFormRules: {
                remark: [
                    { required: true, message: '请输入打回原因', trigger: 'blur' }
                ]
            }
        }
    },
    components: {
        hosjoyUpload
    },
    watch: {
        'form.projectUpload' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['projectUpload'].clearValidate()
            })
        }
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            creditPage: 'creditManage/creditPage',
            creditDetail: 'creditManage/creditDetail',
            creditDocument: 'creditManage/creditDocument',
            creditRecords: 'creditManage/creditRecords'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    return time.getTime() > new Date().getTime() - 1 * 24 * 60 * 60 * 1000
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.ruleForm.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    mounted () {
        this.copyRuleForm = { ...this.ruleForm }
    },
    methods: {
        ...mapActions({
            findCreditPage: 'creditManage/findCreditPage',
            findCreditDetail: 'creditManage/findCreditDetail',
            findCreditDocument: 'creditManage/findCreditDocument',
            findCreditRecords: 'creditManage/findCreditRecords'
        }),
        handleClick (tab) {
            if (tab.index == 1) this.onShowCreditdocument()
        },
        async onShowDrawerinfn (val) {
            this.companyId = val
            await this.findCreditPage({ companyId: val })
            this.tableData = this.creditPage.companyCreditList
            this.drawer = true
        },
        async onShowCreditdocument () {
            await this.findCreditDocument(this.companyId)
            console.log(this.creditDocument)
            this.approveForm = this.creditDocument
            this.approveForm.map(item => {
                item.respRiskCheckDocTemplateList.map(jtem => {
                    if (!jtem.creditDocuments) {
                        jtem.creditDocuments = []
                    }
                    // 筛选出需要必填
                    if (jtem.mondatoryFlag == 1) {
                        this.mondatoryFlagRes.push(jtem)
                    }
                })
            })
        },
        handleSuccessCb (row) {
            row.creditDocuments.map(item => {
                item.templateId = row.templateId
                item.createTime = item.createTime || moment().format('YYYY-MM-DD HH:mm:ss')
            })
            const newDocuments = row.creditDocuments.filter(item => !item.creditDocumentId)
            console.log('this.detail', newDocuments)
        },
        onDelete (item, index) {
            this.$confirm('是否确认删除，删除后不可恢复，是否确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                if (item.creditDocuments[index].creditDocumentId) {
                    try {
                        await putCreditDocument(item.creditDocuments[index].creditDocumentId)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        item.creditDocuments.splice(index, 1)
                    } catch (error) {

                    }
                } else {
                    item.creditDocuments.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }
            }).catch(() => {
                // do nothing
            })
        },
        checkForm (cb) {
            let res = ''
            for (let i = 0; i < this.mondatoryFlagRes.length; i++) {
                const arr = this.creditDocumentList.filter(jtem => {
                    return jtem.templateId == this.mondatoryFlagRes[i].templateId
                })
                if (arr.length == 0) {
                    res = this.mondatoryFlagRes[i]
                    break
                }
            }
            return res
        },
        async onSubmitDoc () {
            this.creditDocumentList = []
            this.approveForm.length > 0 && this.approveForm.map(item => {
                item.respRiskCheckDocTemplateList.map(jtem => {
                    jtem && jtem.creditDocuments && jtem.creditDocuments.length > 0 && jtem.creditDocuments.map(ktem => {
                        this.creditDocumentList.push({
                            templateId: ktem.templateId,
                            fileName: ktem.fileName,
                            fileUrl: ktem.fileUrl,
                            createTime: ktem.createTime ? ktem.createTime : null,
                            createBy: ktem.createBy ? ktem.createBy : this.userInfo.employeeName
                        })
                    })
                })
            })
            let res = this.checkForm()
            if (res) {
                this.$message.error(`一级类目：${res.firstCatagoryName}，二级类目：${res.secondCatagoryName}，${res.formatName}必填！`)
            } else {
                console.log(this.creditDocumentList)
                // await saveCreditDocument(params)
            }
            // this.saveCreditDocument()
        },
        handleClose () {
            this.drawer = false
        },
        datePickerChange (val) {
            this.ruleForm.endTime = moment(val).add(6, 'M').format('YYYY-MM-DD')
        },
        async onEditVip (val) {
            if (val) {
                await this.findCreditDetail(val)
                this.ruleForm = { ...this.creditDetail }
                this.ruleForm.projectUpload = this.ruleForm.attachments ? JSON.parse(this.ruleForm.attachments) : []
                this.newRuleForm = { ...this.ruleForm }
            }
            this.dialogVisible = true
            this.$nextTick(() => {
                this.$refs.ruleForm.clearValidate()
            })
        },
        submitForm () {
            this.isloading = true
            this.ruleForm.attachments = JSON.stringify(this.ruleForm.projectUpload)
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await postCreditDetail(this.ruleForm)
                        this.dialogVisible = false
                        this.isloading = false
                        this.$message({
                            message: `信用设置成功`,
                            type: 'success'
                        })
                        await this.findCreditPage({ companyId: this.companyId })
                        this.tableData = this.creditPage.companyCreditList
                    } catch (error) {
                        this.isloading = false
                    }
                } else {
                    this.isloading = false
                }
            })
        },
        onCloseDrawer () {
            if (JSON.stringify(this.newRuleForm) !== JSON.stringify(this.ruleForm)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗?', '是否确认取消修改', {
                    distinguishCancelAndClose: true,
                    cancelButtonText: '确认取消',
                    confirmButtonText: '返回'
                }).catch(action => {
                    if (action === 'cancel') {
                        this.dialogVisible = false
                    }
                })
            } else {
                this.dialogVisible = false
            }
        },
        async onClickRecord () {
            await this.findCreditRecords(this.companyId)
            this.refuseRecord = this.creditRecords
            this.recordsVisible = true
        },
        onCallback () {
            const newTempid = []
            const newList = this.approveForm
            newList && newList.map(val => {
                val.respRiskCheckDocTemplateList.map(item => {
                    if (item.callback) newTempid.push(item.templateId)
                })
            })
            this.refuseForm.templateIds = newTempid.toString()
            if (newTempid.length > 0) {
                this.reasonVisible = true
            } else {
                this.$message.warning('请选择打回的选项')
            }
        },
        onRefuse () {
            this.resloading = true
            this.refuseForm.createBy = this.userInfo.employeeName
            this.refuseForm.companyId = this.companyId
            this.$refs.refuseForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await refuseCredit(this.refuseForm)
                        this.$message.success('打回成功')
                        this.reasonVisible = false
                        this.onShowCreditdocument()
                        this.resloading = false
                    } catch (error) {
                        this.resloading = false
                    }
                } else {
                    this.resloading = false
                }
            })
        },
        onCloseCol () {
            this.refuseForm.remark = ''
            this.reasonVisible = false
            this.$nextTick(() => {
                this.$refs.refuseForm.clearValidate()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.colred {
    color: #ff7a45;
}
.colgry {
    color: #ccc;
}
/deep/ .el-drawer__body {
    overflow-y: scroll;
    // position: relative;
}
.drawer-wrap {
    padding: 0 10px;
    &_title {
        background: #efeeee;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
    }
    &_btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        &-flex {
            flex: 1;
            &:nth-child(1) {
                color: #ff7a45;
            }
            &:nth-child(2) {
                text-align: right;
            }
        }
    }
    p {
        margin-top: 25px;
    }
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

/deep/.el-dialog .el-input {
    width: 100%;
}

/deep/.el-tabs__nav {
    margin: 0 10px;
}
.collect-wrapbox {
    padding: 0 10px;
}
.collect-title {
    font-size: 20px;
    line-height: 45px;
    margin-top: 10px;
    font-weight: bold;
    /deep/ .el-button--mini {
        margin-left: 50px;
    }
}
.collect-box {
    display: flex;
    .el-checkbox {
        margin-right: 10px;
    }
}
.collect-boxflex {
    display: flex;
    flex-direction: row;
}
.collect-boxtxt {
    i {
        color: #ff0000;
        vertical-align: middle;
        padding: 0 2 0 0px;
        font-style: normal;
    }
}
.collect-call {
    background: #ff7a45;
    color: #fff;
    font-size: 13px;
    border-radius: 6px;
    margin-left: 10px;
    padding: 1px 4px;
}
.upload-file_list {
    display: flex;
    p {
        &:first-child {
            flex: 1;
        }
    }
}
.fileItemDownLoad {
    font-size: 12px;
    border-radius: 3px;
    padding: 8px 16px;
    color: #fff;
    background-color: #ff7a45;
    border-color: #ff7a45;
    display: block;
    line-height: 13px;
    float: left;
    height: 13px;
    cursor: pointer;
    margin-left: 10px;
}
.posrtv {
    position: relative;
    color: #ff7a45;
    a {
        color: #ff7a45;
        margin-left: 10px;
    }
    font {
        font-size: 14px;
    }
}
.project-record{
    margin-top: 15px;
}
/deep/.el-form .el-input:not(:first-child) {
    margin-left: 0;
}
</style>