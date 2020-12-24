<template>
    <div class="page-body B2b">
        <el-image fit="contain" ref="zoomImage" v-if='currentKey.inputStyle==9' style="width: 0px; height:0px;position: absolute;" :src="this.currentKey.paramValue" :preview-src-list="[this.currentKey.paramValue]"></el-image>
        <div class="page-body-cont approvalcontract">
            <div class="approvalcontract-head">
                <font>{{detailRes.contractStatus == 2 ? '分财' : detailRes.contractStatus == 4 ? '风控' : '法务'}}审核合同</font>
                <h-button type="primary" @click="getHistory">审核及签署流程</h-button>
            </div>
            <div class="approvalcontract-layout">
                <div class="approvalcontract-layout-left">
                    <h1>字段/自定义合同条款修订</h1>
                    <div class="setarea" v-if="currentKey">
                        <!-- v-if 法务 detailRes.contractStatus == 6-->
                        <!-- <template>
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    {{currentKey.paramName}}<i class="el-icon-arrow-down el-icon--right"></i> ：
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command=item v-for="(item,index) in contractKeyValueList" :key="index">
                                        {{item.paramName}}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template> -->
                        <!-- <el-form :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item prop="formValidator" v-for="(value,key,index) in currentKeyToComponent()" :key="index">
                                <component :is="key" v-bind="value.bind||{}" v-on="value.on||{}">
                                    <template v-if="value.slot" :slot="value.slot">{{value.innerHtml||''}}</template>
                                </component>
                            </el-form-item>
                        </el-form> -->
                        <!-- else -->
                        <p class="setarea-key">{{currentKey.paramName}}：</p>
                        <p style="display: flex;justify-content: space-between;align-items: center;">
                            <el-form :rules="rules" :model="currentKey" ref="ruleForm" label-width="100px" class="demo-ruleForm" :style="currentKey.inputStyle==9?'':'width:100%'" @submit.native.prevent>
                                <el-form-item prop="formValidator" v-for="(value,key,index) in currentKeyToComponent()" :key="index">
                                    <component :is="key" v-bind="value.bind||{}" v-on="value.on||{}">
                                        <template v-if="value.slot" :slot="value.slot">{{value.innerHtml||''}}</template>
                                    </component>
                                </el-form-item>
                            </el-form>

                            <hosjoyUpload v-model="imgArr" :showPreView='false' v-if="currentKey.inputStyle==9" class="upload-demo" drag :action="action" :multiple='false' :fileSize='20' :fileNum='imgArr.length+1' style="width:60%;margin-right: 2%;" accept='.jpeg,.jpg,.png'
                                :uploadParameters='uploadParameters' @successArg='successArg'>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>后点击<em>保存</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传jpeg/jpg/png文件，且不超过20M</div>
                            </hosjoyUpload>
                        </p>
                        <h-button style="margin-top:10px" @click="onSaveContent('')" type="primary">保存</h-button>
                    </div>
                    <div class="tips">
                        <div><b>注意事项：</b></div>
                        <p>1、点击保存，则会记录修订记录，并保存为最新的合同文档；</p>
                        <p>2、暂不审核，不会撤销字段修订记录；</p>
                    </div>
                </div>
                <div class="approvalcontract-layout-right">
                    <h1>合同预览</h1>
                    <div class="loader-css" v-if="detailRes.contractStatus == 6&&showLoading">
                        <div class="loader"></div>
                        <div class="loader-txt">合同拼命加载中...</div>
                    </div>
                    <div class="approvalcontract-content-layout">
                        <!-- 分财、风控预览——纯html -->
                        <div class="approvalcontract-content" v-html='contractContentDiv' v-if="detailRes.contractStatus != 6"></div>
                        <!-- 法务预览html——编辑器 -->
                        <div class="approvalcontract-content-legal-affairs" v-if="detailRes.contractStatus == 6">
                            <editor ref="editor" apiKey="v30p89tdwvdwt7x2fcngnrvnv2syzsvs7q9hps4gakdtt4ak" v-model="contractContentDiv" :init="editorInit" @onInit="editorOnInit" @onKeyUp="onKeyUp"></editor>
                            <!-- @onKeyUp="onKeyUp"  -->
                            <!-- 如果报tinymce vue This domain is not registered with Tiny Cloud. Please see the 请添加白名单 -->
                            <!-- https://www.tiny.cloud/docs/integrations/vue/ -->
                        </div>
                    </div>
                    <h-button type="primary" @click="onSaveContent(3)" v-if="detailRes.contractStatus == 6" :class="showShake?'shake':''">更新条款</h-button>
                    <div class="approvalcontract-btn">
                        <h-button @click="goBack">暂不审核</h-button>
                        <h-button type="primary" @click="openDialog('驳回',3)">驳回</h-button>
                        <h-button type="primary" @click="openDialog('通过',2)">通过</h-button>
                    </div>
                </div>

            </div>

        </div>
        <el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible" width="600px" :before-close="handleClose">
            <div class="dialogbox">
                <span class="dialog-layout">
                    <font>*</font>{{dialog.title}}原因：
                </span>
                <el-input v-model="dialog.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" style="width:80%" show-word-limit maxlength="500"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onSure">确定{{dialog.title}}</el-button>
            </span>
        </el-dialog>
        <el-drawer class="contentdrawerbox" size="550px" :visible.sync="drawerVisible" :with-header="false" :wrapperClosable='false'>
            <div slot="title">审核记录</div>
            <!-- 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回 -->
            <div style="text-align: center;font-size: 18px;">{{detailRes.contractStatus == 2?'待分财审核':detailRes.contractStatus == 4?'待风控审核':detailRes.contractStatus == 6?'待法务审核':''}}</div>
            <div class="history-css">
                <div v-if="historyList&&historyList.length==0">暂无数据</div>
                <div v-else class="history-css-flex" v-for="(item,index) in historyList" :key="index">
                    <div class="history-css-left">
                        <span class="name">{{item.operator}} </span>
                        <span>{{item.operationName}}</span>
                        <template v-if="item.operationName == '编辑了'">
                            <span class="imgcss" v-if="item.operationContent.indexOf('purchase_details') != -1">
                                <font style="color:#ff7a45">{{JSON.parse(item.operationContent).fieldDesc}}</font>
                                从<font>
                                    <el-image style="width: 80px; height: 80px;margin:10px 5px 0;border-radius: 7px;border: 1px solid #d9d9d9" :src="JSON.parse(item.operationContent).fieldOriginalContent" :preview-src-list="[JSON.parse(item.operationContent).fieldOriginalContent]"></el-image>
                                </font>
                                变为<font>
                                    <el-image style="width: 80px; height: 80px;margin:10px 5px 0;border-radius: 7px;border: 1px solid #d9d9d9" :src="JSON.parse(item.operationContent).fieldContent" :preview-src-list="[JSON.parse(item.operationContent).fieldContent]"></el-image>
                                </font>
                            </span>
                            <span v-else class="operationcontent-css" v-html="getOperationContent(item)"></span>
                        </template>
                        <template v-else-if="item.operationName == '修订了'">
                            <font style="margin: 0 4px;">合同</font>
                            <font style="color: #ff7a45;margin-left:4px;cursor: pointer;" @click="getDiff(item.operationContent)">查看 >></font>
                        </template>
                        <template v-else>
                            <span class="operationcontent-css">
                                <font>{{item.operationContent}}</font>
                            </span>
                        </template>
                    </div>
                    <div class="history-css-right">{{item.operationTime | formatDate('YYYY年MM月DD日 HH时mm分ss秒')}}</div>
                </div>
            </div>
            <div class="history-bttom">
                <h-button type="primary" @click="drawerVisible=false">好的</h-button>
            </div>
        </el-drawer>
        <diffDialog ref="diffDialog" v-if="currentContent&&lastContent" :currentContent=currentContent :lastContent=lastContent></diffDialog>
    </div>
</template>
<script>
import diffDialog from './diffDialog'
import selectCom from './components/select'
import isAllNum from './components/isAllNum'
import isPositiveInt from './components/isPositiveInt'
import isNum from './components/isNum'
import inputAutocomplete from './components/inputAutocomplete'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { mapState, mapActions } from 'vuex'
import { contractKeyValue, getContractsContent, saveContent, approvalContent, getCheckHistory, getDiffApi } from './api/index'
import { interfaceUrl } from '@/api/config'
import Editor from '@tinymce/tinymce-vue'
// api:https://www.tiny.cloud/docs/integrations/vue/
// http://tinymce.ax-z.cn/general/basic-setup.php
export default {
    name: 'approveContract',
    components: { diffDialog, selectCom, isNum, inputAutocomplete, hosjoyUpload, isAllNum, isPositiveInt, 'editor': Editor },
    data () {
        return {
            showShake: false,
            showLoading: true,
            editorInit: {
                menubar: false,
                language: 'zh_CN',
                skin_url: '/tinymce/skins/ui/oxide', // public目录下
                plugins: ['export'], // 表格 'table'
                // 工具栏 表格 | table
                toolbar: 'h1 h2 bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent  | undo redo | link unlink image  | removeformat| export ',
                height: 504,
                fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
                content_css: '/tinymce/skins/mycontent.css',
                resize: false,
                statusbar: false
                // autoresize_on_init: false,
                // branding: false,
                // autoresize_overflow_padding: 0
            },
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            action: interfaceUrl + 'tms/files/upload',
            imgArr: [],
            drawerVisible: false,
            originalContentFieldsList: '',
            contractFieldsList: '',
            contractKeyValueList: '',
            currentKey: '',
            currentKeyOriginal: '', // 更新前的字段,需求做多了，用于法务修改字段key的，可不删
            fieldName: '', // 编辑字段
            fieldOriginalContent: '', // 编辑前内容
            fieldContent: '', // 编辑内容
            contractContentDiv: '', // 合同内容
            approvalRemark: '',
            detailRes: '',
            dialog: {
                dialogVisible: false,
                title: '',
                status: '',
                remark: ''
            },
            historyList: '',
            currentContent: '',
            lastContent: '',
            firstKsy: '',
            rules: {
                formValidator: [
                    { validator: this.checkField, trigger: 'blur' }
                ]
            },
            contractDocument: '',
            contractAfterApi: '',
            keyValIncontract: []

        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        uploadImgServer () {
            return interfaceUrl + 'tms/files/upload-list'
        },
        uploadImgParams () {
            return {
                updateUid: ''
            }
        },
        uploadImgName () {
            return 'multiFile'
        },
        inputStyleDom () {
            let { paramKey, unit } = this.currentKey
            // 支付期限
            if (paramKey == 'pay_period_supplier') {
                return 'isPositiveInt'
            }
            // 纯数字
            if (paramKey == 'dealer_controller_phone' || paramKey == 'dealer_controller_phone_spouse' || paramKey == 'supplier_account_number' || paramKey == 'hosjoy_account_number' || paramKey == 'regulatory_account_number' || paramKey == 'dealer_controller_postal_code' || paramKey == 'dealer_controller_postal_code_spouse' || paramKey == 'dealer_down_pay_period' || paramKey == 'pay_shipment_batch') {
                return 'isAllNum'
            }
            // 元 %
            if (unit) {
                return 'isNum'
            }
            return 'elInput'
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        checkField (rule, value, callback) {
            console.log('checkField')
            if (this.currentKey.required && !this.currentKey.paramValue) {
                callback(new Error(`${this.currentKey.paramName}不能为空`))
                return
            }
            // 填值有正则就需要格式校验
            if (this.currentKey.checkRule && this.currentKey.paramValue) {
                let Reg = new RegExp(this.currentKey.checkRule)
                console.log(!Reg.test(this.currentKey.paramValue))
                if (!Reg.test(this.currentKey.paramValue)) {
                    // return callback(new Error(this.currentKey.checkNote || '格式不正确'))
                    return callback(new Error(`请输入正确的${this.currentKey.paramName}`))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        },
        currentKeyToComponent () {
            // 1.单行输入框, 2.单选框, 3.单选选择项(下拉), 4.多行输入框, 5.邮箱, 6.数字选择器, 7.单选拨轮, 8.日期选择器, 9.上传
            const comObj = {
                1: {
                    [this.inputStyleDom]: this.inputStyleDom !== 'elInput'
                        ? {
                            bind: {
                                paramKey: this.currentKey.paramKey,
                                value: this.currentKey.paramValue,
                                placeholder: '请输入内容',
                                disabled: !this.currentKey.modify,
                                style: this.currentKey.unit ? { width: '250px' } : '',
                                innerHtml: this.currentKey.unit || '',
                                maxlength: this.currentKey.maxLength || ''
                            },
                            on: {
                                input: (val) => { this.currentKey.paramValue = val.trim() }
                            }
                        }
                        : {
                            bind: {
                                value: this.currentKey.paramValue,
                                placeholder: '请输入内容',
                                disabled: !this.currentKey.modify,
                                maxlength: this.currentKey.maxLength || ''
                            },
                            on: {
                                input: (val) => { this.currentKey.paramValue = val.trim() }
                            }
                        }
                },
                3: {
                    selectCom: {
                        bind: {
                            selectVModel: this.currentKey.paramValue,
                            options: (function (t) {
                                let _this = t
                                // 判断 key
                                if (_this.currentKey.paramKey == 'dealer_controller_gender' || _this.currentKey.paramKey == 'dealer_controller_gender_spouse') {
                                    return [{ value: '男', label: '男' }, { value: '女', label: '女' }]
                                }
                                if (_this.currentKey.paramKey == 'down_pay_form') {
                                    return [{ value: '银行转账', label: '银行转账' }, { value: '银票', label: '银票' }, { value: '商票', label: '商票' }]
                                }
                                if (_this.currentKey.paramKey == 'supplier_prepay_form') {
                                    return [{ value: '银行转账', label: '银行转账' }, { value: '银行承兑汇票', label: '银行承兑汇票' }]
                                }
                                if (_this.currentKey.paramKey == 'purch_order_purch_batch' || _this.currentKey.paramKey == 'purch_batch') {
                                    return [{ value: '一次性采购', label: '一次性采购' }, { value: '分批采购', label: '分批采购' }]
                                }
                            })(this)
                        },
                        on: {
                            updateSelectModel: (val) => { this.currentKey.paramValue = val }
                        }
                    }
                },
                4: {
                    elInput: {
                        bind: {
                            value: this.currentKey.paramValue,
                            placeholder: '请输入内容',
                            type: 'textarea',
                            autosize: { minRows: 5, maxRows: 6 },
                            maxlength: this.currentKey.maxLength,
                            class: this.currentKey.paramKey,
                            showWordLimit: true
                            // disabled: !this.currentKey.modify
                        },
                        on: {
                            input: (val) => { this.currentKey.paramValue = val }
                        }
                    }
                },
                5: {
                    inputAutocomplete: {
                        bind: {
                            value: this.currentKey.paramValue,
                            style: { width: '250px' }
                        },
                        on: {
                            input: (val) => { this.currentKey.paramValue = val.trim() },
                            onMousedown: (val) => { this.currentKey.paramValue = val.trim() }
                        }
                    }
                },
                6: {
                    elSlider: {
                        bind: {
                            value: Number(this.currentKey.paramValue),
                            step: 1,
                            max: 6,
                            min: 1,
                            marks: { 1: '1个月', 2: '2个月', 3: '3个月', 4: '4个月', 5: '5个月', 6: '6个月' },
                            style: { marginBottom: '30px' }
                        },
                        on: {
                            input: (val) => { this.currentKey.paramValue = val }

                        }
                    }
                },
                8: {
                    elDatePicker: {
                        bind: {
                            value: this.currentKey.paramValue,
                            type: 'date',
                            disabled: !this.currentKey.modify,
                            placeholder: '选择日期',
                            valueFormat: 'yyyy-MM-dd',
                            style: { width: '250px' }
                        },
                        on: {
                            input: (val) => { this.currentKey.paramValue = val }
                        }
                    }
                },
                9: {
                    elImage: {
                        bind: {
                            style: 'width: 120px; height: 120px; border-radius: 7px;border: 1px solid #d9d9d9',
                            src: this.currentKey.paramValue,
                            fit: 'cover'
                            // previewSrcList: [this.currentKey.paramValue]
                        },
                        on: {
                            input: (val) => { console.log(val) },
                            click: (event) => {
                                console.log(this.$refs['zoomImage'])
                                this.$refs['zoomImage'] && this.$refs['zoomImage'].clickHandler()
                            }
                        }
                    }
                }

            }
            return comObj[this.currentKey.inputStyle]
        },
        handleCommand (command) {
            this.currentKey = command
            console.log('修改字段: ', this.currentKey)
            console.log('修改前字段', this.currentKeyOriginal)
        },
        async getDiff (item) {
            const { lastContentId, currentContentId } = JSON.parse(item)
            const { data } = await getDiffApi({
                currentId: currentContentId,
                lastId: lastContentId
            })
            this.currentContent = data.contractContent
            this.lastContent = data.lastContractContent
            if (this.currentContent === null) {
                this.$message({
                    message: `获取新版合同失败`,
                    type: 'error'
                })
                return
            }
            if (this.lastContent === null) {
                this.$message({
                    message: `获取上一版合同失败`,
                    type: 'error'
                })
                return
            }
            this.$nextTick(() => {
                this.$refs.diffDialog.onShowDiff()
            })
        },
        async getHistory () {
            this.drawerVisible = true
            const query = {
                contractId: this.$route.query.id
            }
            const { data } = await getCheckHistory(query)
            this.historyList = data.signHistory
        },
        openDialog (title, status) {
            if (this.detailRes.contractStatus == 6) {
                let curHTML = this.contractDocument.innerHTML
                if (this.contractAfterApi !== curHTML.replace(/\ufeff/g, '')) {
                    console.log('curHTML', curHTML.replace(/\ufeff/g, ''))
                    console.log('this.contractAfterApi: ', this.contractAfterApi)
                    this.$message({
                        message: `条款已被编辑，请先保存条款`,
                        type: 'error'
                    })
                    this.showShake = true
                    setTimeout(() => { this.showShake = false }, 1200)
                    return
                }
            }
            this.dialog.dialogVisible = true
            this.dialog.title = title
            this.dialog.status = status
        },
        handleClose () {
            this.dialog.dialogVisible = false
            this.dialog.remark = ''
        },
        onSure () {
            if (!this.dialog.remark) {
                this.$message({
                    message: `原因不能为空`,
                    type: 'error'
                })
            } else {
                this.onApprove()
            }
        },
        async onApprove () {
            if (this.detailRes.contractStatus == 6) {
                let signDOMS = this.contractDocument.getElementsByClassName('platform_sign')
                Array.from(signDOMS).map(item => {
                    item.outerHTML = `<span class="platform_sign" style="color:#fff">platform_sign</span>`
                })
                // 对客户签署区进行转化
                let customSignDOMS = this.contractDocument.getElementsByClassName('custom_sign')
                Array.from(customSignDOMS).map(item => {
                    item.outerHTML = `<span class="custom_sign" style="color:#fff">${item.dataset.en}</span>`
                })
                // 法务审核通过把非必填且没值的标记清空
                let res = this.contractFieldsList.filter(item => (!item.required && !item.paramValue))
                if (res && res.length > 0) {
                    res.map(item => {
                        let resDom = this.contractDocument.getElementsByClassName(item.paramKey)
                        if (resDom && resDom.length > 0) {
                            Array.from(resDom).map(jtem => {
                                jtem.outerHTML = ''
                            })
                        }
                    })
                }
            }
            this.$nextTick(async () => {
                const query = {
                    contractId: this.$route.query.id,
                    approver: this.userInfo.employeeName,
                    // 合同审批角色 1：分财 2：风控 3：法务
                    approverRole: this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                    approvalStatus: this.dialog.status,
                    approvalRemark: this.dialog.remark,
                    contractContent: this.detailRes.contractStatus == 6 ? this.contractDocument.innerHTML : ''
                }
                await approvalContent(query)
                this.$message({
                    message: `提交成功`,
                    type: 'success'
                })
                this.handleClose()
                this.goBack()
            })
        },
        goBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/goodwork/contractSigningManagement')
        },

        successArg (val) {
            this.currentKey.paramValue = val.fileUrl
        },
        async setImg () {
            if (this.imgArr.length == 0) return
            let temp = [this.imgArr[this.imgArr.length - 1]]
            let doms = this.contractDocument.getElementsByClassName(`${this.currentKey.paramKey}_${this.currentKey.imgIndex}`)
            this.currentKey.paramValue = temp[0].fileUrl
            Array.from(doms).map(img => {
                img.setAttribute('src', temp[0].fileUrl)
            })
            let fieldOriginalContent = ''
            // 修改键值对
            let contractFieldsList = JSON.parse(this.detailRes.contractFieldsList)
            contractFieldsList.map(item => {
                if (item.paramKey === this.currentKey.paramKey) {
                    fieldOriginalContent = item.paramValue[this.currentKey.imgIndex].fileUrl
                    item.paramValue[this.currentKey.imgIndex] = {
                        fileName: temp[0].fileName,
                        fileUrl: temp[0].fileUrl,
                        url: temp[0].fileUrl,
                        size: ''
                    }
                }
            })
            await saveContent({
                'contractId': this.$route.query.id,
                // 合同审批角色 1：分财 2：风控 3：法务
                'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                'type': 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                'fieldName': this.currentKey.paramKey, // 编辑字段
                'fieldOriginalContent': fieldOriginalContent, // 编辑前内容
                'fieldContent': temp[0].fileUrl, // 编辑内容
                'contractContent': this.contractDocument.innerHTML, // 拿input版的合同去提交。法务审核的时候需要用到。
                'createBy': this.userInfo.employeeName,
                'contractFieldsList': JSON.stringify(contractFieldsList) // 合同字段键值对
            })
            this.init(() => {
                this.domBindMethods()
            })
        },
        // operatorType 3 更新条款
        onSaveContent (operatorType = '') {
            let { paramKey, paramValue } = this.currentKey
            if (operatorType) {
                let curHTML = this.contractDocument.innerHTML
                if (this.contractAfterApi == curHTML.replace(/\ufeff/g, '')) {
                    // 条款没有变化
                    return
                }
            }
            // 多行文本。展示html。可空格可换行。
            /* if (this.currentKey.inputStyle == 4 && this.currentKey.paramValue) {
                let newString = this.currentKey.paramValue.replace(/\n/g, '_@').replace(/\r/g, '_#')
                newString = newString.replace(/_#_@/g, '<br/>')
                newString = newString.replace(/_@/g, '<br/>')
                newString = newString.replace(/\s/g, '&nbsp;')
                paramValue = newString
            } */
            if (this.currentKey.inputStyle == 9 && operatorType == '') {
                // 修改图片，图片必填
                console.log('setImg')
                this.setImg()
                return
            }
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let tempObj = {}
                    let tempArr = []
                    this.contractFieldsList.map(item => {
                        let DomList = this.contractDocument.getElementsByClassName(item.paramKey)
                        // 筛选出页面上的键值对，可能会被删除
                        if (DomList && DomList.length > 0) {
                            // 页面合同上的所有键值对、签署字段不存在className
                            if (!(item.paramKey in tempObj) && item.paramKey !== '') {
                                tempObj[item.paramKey] = JSON.parse(this.detailRes.contractFieldsList).filter(ktem => ktem.paramKey === item.paramKey)
                            }
                        }
                    })
                    for (const key in tempObj) {
                        tempArr.push(tempObj[key][0])
                    }
                    console.log('tempArr: ', tempArr)
                    tempArr.map(item => {
                        // 修改对应的键值对里的值
                        if (item.paramKey === paramKey) {
                            item.paramValue = paramValue
                        }
                    })
                    // 法务修改字段触发
                    if (this.detailRes.contractStatus == 6 && !operatorType) {
                        let curHTML = this.contractDocument.innerHTML
                        if (this.contractAfterApi !== curHTML.replace(/\ufeff/g, '')) {
                            console.log('curHTML: ', curHTML.replace(/\ufeff/g, ''))
                            console.log('this.contractAfterApi: ', this.contractAfterApi)
                            this.$message({
                                message: `条款已被编辑，请先保存条款`,
                                type: 'error'
                            })
                            this.showShake = true
                            setTimeout(() => { this.showShake = false }, 1200)
                            return
                        }
                    }
                    // return
                    // div版合同,修改页面上的值
                    let ryanList = this.contractDocument.getElementsByClassName(this.currentKey.paramKey)
                    Array.from(ryanList).map(jtem => {
                        if (this.currentKey.inputStyle == 4 && this.currentKey.paramValue) {
                            let newString = this.currentKey.paramValue.replace(/\n/g, '_@').replace(/\r/g, '_#')
                            newString = newString.replace(/_#_@/g, '<br/>')
                            newString = newString.replace(/_@/g, '<br/>')
                            newString = newString.replace(/\s/g, '&nbsp;')
                            jtem.innerHTML = newString
                        } else if (this.currentKey.inputStyle != 9) { // fix 替换图片后修改条款把图片也保存了
                            jtem.innerText = paramValue
                        }
                    })
                    // 通过dom生成最新的html
                    this.fieldName = paramKey // 编辑字段
                    // 编辑前内容
                    this.fieldOriginalContent = this.originalContentFieldsList.filter(item => item.paramKey === paramKey)[0].paramValue
                    this.fieldContent = paramValue
                    if (this.currentKey.paramname && !this.currentKey.paramValue) {
                        let canEmptyDom = this.contractDocument.getElementsByClassName(this.currentKey.paramKey)
                        Array.from(canEmptyDom).map(jtem => {
                            jtem.innerHTML = this.currentKey.paramname
                        })
                    }
                    // 法务审核校验字段是否有删除
                    if (this.detailRes.contractStatus == 6) {
                        let spanList = this.contractDocument.getElementsByTagName('span')
                        let _keyValIncontract = []
                        Array.from(spanList).map(item => {
                            if (item.dataset && item.dataset.inputstyle && item.className) {
                                _keyValIncontract.push(item.className)
                            }
                        })
                        if (_keyValIncontract.length != this.keyValIncontract.length) {
                            console.log('this.keyValIncontract: ', this.keyValIncontract)
                            console.log('_keyValIncontract: ', _keyValIncontract)
                            let _tempClassName = []
                            let _tempClassTxt = ''
                            for (var i = 0; i < this.keyValIncontract.length; i++) {
                                if (_keyValIncontract.indexOf(this.keyValIncontract[i]) === -1) {
                                    _tempClassName.push(this.keyValIncontract[i])
                                }
                            }
                            _tempClassName.map(ktem => {
                                let resTemp = this.contractFieldsList.filter(item => item.paramKey == ktem)
                                _tempClassTxt = _tempClassTxt + ' ' + resTemp[0].paramName + ' '
                                console.log('_tempClassTxt: ', _tempClassTxt)
                            })
                            this.$message({
                                message: `合同${_tempClassTxt}字段不可删除`,
                                type: 'error'
                            })
                            return
                        }
                    }
                    console.log({
                        'contractId': this.$route.query.id,
                        // 合同审批角色 1：分财 2：风控 3：法务
                        'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                        'type': operatorType || 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                        'fieldName': operatorType ? '' : this.fieldName, // 编辑字段
                        'fieldOriginalContent': operatorType ? '' : (this.fieldOriginalContent || ''), // 编辑前内容
                        'fieldContent': operatorType ? '' : this.fieldContent, // 编辑内容
                        'contractContent': this.contractDocument.innerHTML,
                        'createBy': this.userInfo.employeeName,
                        'contractFieldsList': JSON.stringify(tempArr) // 合同字段键值对
                    })
                    try {
                        await saveContent({
                            'contractId': this.$route.query.id,
                            // 合同审批角色 1：分财 2：风控 3：法务
                            'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                            'type': operatorType || 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                            'fieldName': operatorType ? '' : this.fieldName, // 编辑字段
                            'fieldOriginalContent': operatorType ? '' : (this.fieldOriginalContent || ''), // 编辑前内容
                            'fieldContent': operatorType ? '' : this.fieldContent, // 编辑内容
                            'contractContent': this.contractDocument.innerHTML,
                            'createBy': this.userInfo.employeeName,
                            'contractFieldsList': JSON.stringify(tempArr) // 合同字段键值对
                        })
                        this.init(() => {
                            this.domBindMethods()
                        })
                    } catch (error) {
                        this.init(() => {
                            this.domBindMethods()
                        })
                    }
                }
            })
        },
        editorOnInit () {
            console.log('编辑器初始化完成domBindMethods')
            this.domBindMethods()
        },
        onKeyUp () {
            // keyCode 91
            if (event.keyCode == 91) {
                this.domBindMethods('no')
            }
        },
        domBindMethods (flag = '') {
            this.$nextTick(() => {
                this.firstKsy = this.contractFieldsList[0].paramKey
                if (!this.currentKey) {
                    // 保存后不会更新左侧字段
                    this.currentKey = this.contractFieldsList.filter(item => item.paramKey === this.firstKsy)[0]
                }
                // 拿键值对遍历
                if (this.detailRes.contractStatus == 6) {
                    let ifram = document.getElementsByClassName('tox-edit-area')[0].getElementsByClassName('tox-edit-area__iframe')[0]
                    this.contractDocument = ifram.contentWindow.document.getElementById('tinymce')
                } else {
                    this.contractDocument = document.getElementsByClassName('approvalcontract-content')[0]
                }
                //
                this.contractFieldsList.map(item => {
                    if (item.inputStyle && item.inputStyle == 9) {
                        let imgDom = this.contractDocument.getElementsByTagName('img')
                        imgDom && imgDom.length > 0 && Array.from(imgDom).map(item => {
                            // 筛除盖章处和确认函的采购明细表
                            if (item.className && item.className != 'platform_sign' && item.className != 'pay_order_purchase_details') {
                                item.onclick = (event) => {
                                    console.log(event)
                                    this.currentKey = {
                                        required: true,
                                        inputStyle: 9,
                                        paramKey: event.target.dataset.key,
                                        paramValue: event.target.currentSrc,
                                        paramName: event.target.dataset.name,
                                        imgIndex: event.target.dataset.index
                                    }
                                    console.log('imgclick this.currentKey', this.currentKey)
                                    this.$refs['ruleForm'].resetFields()
                                }
                            }
                        })
                    } else {
                        // 通过键值对里的key查找对应的dom
                        let DomList = this.contractDocument.getElementsByClassName(item.paramKey)
                        if (DomList && DomList.length > 0) {
                            Array.from(DomList).map((jtem, index) => {
                                let fields = this.originalContentFieldsList.filter(ktem => ktem.paramKey === jtem.className)[0]
                                // 遍历dom添加点击事件
                                jtem.onclick = (event) => {
                                    this.currentKey = { ...fields, event, paramname: jtem.dataset.paramname || '' }
                                    console.log('this.currentKeyxxx: ', this.currentKey)
                                    this.$refs['ruleForm'].resetFields()
                                }
                            })
                        } else {
                            console.log('没找到的：', item.paramName)
                        }
                    }
                })
                // 动态设置高度
                if (this.detailRes.contractStatus == 6 && flag == '') {
                    console.log('设置')
                    let hVal = document.getElementsByClassName('approvalcontract-content-layout') && document.getElementsByClassName('approvalcontract-content-layout')[0].offsetHeight - 30
                    document.getElementsByClassName('approvalcontract-content-legal-affairs')[0].getElementsByClassName('tox-tinymce')[0].style.height = `${hVal}px`
                    this.showLoading = false
                    this.contractAfterApi = this.contractDocument.innerHTML.replace(/\ufeff/g, '')
                    this.keyValIncontract = []
                    let spanList = this.contractDocument.getElementsByTagName('span')
                    Array.from(spanList).map(item => {
                        if (item.dataset && item.dataset.inputstyle && item.className) {
                            this.keyValIncontract.push(item.className)
                        }
                    })
                }
            })
        },
        async init (cb) {
            const res = await getContractsContent({ contractId: this.$route.query.id })
            this.detailRes = res.data
            this.contractContentDiv = res.data.contractContent // Div版的合同
            this.originalContentFieldsList = JSON.parse(res.data.contractFieldsList) // 保存最初的键值对
            this.contractFieldsList = JSON.parse(JSON.stringify(this.originalContentFieldsList)) // 可修改的键值对
            cb && cb()
            if (this.detailRes.contractStatus != 6) {
                this.domBindMethods()
            }
        },
        formatTxt (txt) {
            if (txt) {
                let newString = txt.replace(/\n/g, '_@').replace(/\r/g, '_#')
                newString = newString.replace(/_#_@/g, '<br/>')
                newString = newString.replace(/_@/g, '<br/>')
                newString = newString.replace(/\s/g, '&nbsp;')
                return newString
            }
            return ''
        },
        getOperationContent (item) {
            const obj = JSON.parse(item.operationContent)
            return `<font>${obj.fieldDesc}</font>从<font>${this.formatTxt(obj.fieldOriginalContent)}</font>变为<font>${this.formatTxt(obj.fieldContent)}</font>`
        }
    },
    async beforeMount () {
        const { data } = await contractKeyValue(this.$route.query.contractTypeId)
        this.contractKeyValueList = data
        this.init()
    }
}
</script>
<style scoped lang="scss">
.approvalcontract {
    height: 80%;
    position: fixed;
    overflow: hidden;
    width: calc(100vw - 200px - 86px);
    .approvalcontract-head {
        font-size: 23px;
        font-weight: 650;
        border-bottom: 1px solid #e9e9e9;
        padding-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .approvalcontract-content-layout {
        height: calc(100vh - 325px);
        overflow: scroll;
        min-width: 600px;
    }
    .approvalcontract-layout {
        height: calc(100vh - 230px);
        position: relative;
        overflow: hidden;
        &-left {
            width: 27%;
            margin-right: 3%;
            position: fixed;
            overflow: hidden;
            h1 {
                font-size: 20px;
            }
            // flex:0 0 450px;
            margin-right: 40px;
            box-sizing: border-box;
            padding: 15px 0;
            .setarea {
                min-height: 160px;
                border-bottom: 1px solid #e9e9e9;
                padding-bottom: 10px;
                margin-bottom: 20px;
                margin-top: 10px;
                /deep/.el-dropdown-selfdefine {
                    cursor: pointer;
                    font-size: 16px;
                    margin: 10px 0 10px;
                    color: #000;
                }
                /deep/.el-form-item__content {
                    margin-left: 0 !important;
                }
                /deep/.el-form .el-input {
                    width: 100%;
                }
                /deep/.el-slider__runway {
                    width: 85%;
                    margin: 16px auto 0;
                }
                /deep/.el-slider__marks-text {
                    width: 38px;
                }
                /deep/.el-upload {
                    width: 100%;
                }
                /deep/.el-upload-dragger:hover {
                    border: 1px dashed #ff7a45 !important;
                }
                /deep/.el-upload-dragger {
                    width: 100%;
                    height: 126px;
                    text-align: center !important;
                    border: 1px dashed #d9d9d9 !important;
                    border-radius: 6px !important;
                    box-sizing: border-box !important;
                    padding: 12px !important;
                    .el-icon-upload {
                        margin: 15px 0 5px;
                    }
                    .el-icon-upload {
                        font-size: 50px;
                    }
                    .el-upload__text {
                        font-size: 13px;
                    }
                }
            }
            .tips {
                font-size: 16px;
                b {
                    margin-bottom: 10px;
                    display: inline-block;
                }
                p {
                    font-size: 14px;
                    line-height: 2;
                    color: #6b6868;
                }
            }
        }
        &-right {
            // position: relative;
            width: 65%;
            float: right;
            // overflow-y: scroll;
            height: 100%;
            position: relative;
            h1 {
                font-size: 20px;
                margin-bottom: 10px;
            }
            box-sizing: border-box;
            padding: 15px 20px 0;
        }
    }
    .setarea-key {
        font-size: 16px;
        margin: 10px 0 10px;
    }
    .approvalcontract-btn {
        position: absolute;
        right: 30px;
        bottom: 2px;
    }

    /deep/.approvalcontract-content input {
        color: #ff7a45 !important;
    }
}
.dialogbox {
    margin-top: 50px;
    display: flex;
}
.dialog-layout {
    margin-right: 5px;
    display: inline-block;
    font {
        color: #f97575;
        margin-right: 5px;
    }
}
.contentdrawerbox {
    /deep/ .el-drawer__header {
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
        font-size: 18px;
    }
    /deep/.history-css {
        padding: 0 20px;
        box-sizing: border-box;
        height: calc(100vh - 190px);
        overflow-y: scroll;
        .history-css-flex {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            align-items: baseline;
            .history-css-left {
                font-size: 14px;
                flex: 0 0 300px;
                word-break: break-all;
                max-width: 300px;
                // word-break: break-all;
                .name {
                    color: #169bd5;
                }
            }
            .history-css-right {
                flex: 0 0 198px;
                font-size: 13px;
                color: #a7a5a5;
                margin-left: 10px;
                text-align: right;
            }
        }
        .operationcontent-css {
            font {
                color: #ff7a45;
                margin: 0 4px;
            }
        }
    }
    /deep/.history-bttom {
        border-top: 1px solid #eee;
        padding-top: 10px;
        text-align: right;
        padding-right: 20px;
        box-sizing: border-box;
    }
}
/deep/.w-e-text input {
    cursor: pointer;
}
/deep/.w-e-text p {
    margin: unset;
    line-height: unset;
}
.loader-css {
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translateX(-50%);
}
.loader {
    border: 13px solid #f3f3f3;
    border-radius: 50%;
    border-top: 13px solid #3498db;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}
.loader-txt {
    margin-top: 20px;
    text-align: center;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
::-webkit-scrollbar-thumb {
        background-color: #d6d1d1 !important;
    }
.shake {
  animation: shake 0.8s;
  -moz-animation: shake 0.8s; /* Firefox */
  -webkit-animation: shake 0.8s; /* Safari and Chrome */
  -o-animation: shake 0.8s; /* Opera */
}
@-webkit-keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }
  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}
@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }
  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}
</style>
