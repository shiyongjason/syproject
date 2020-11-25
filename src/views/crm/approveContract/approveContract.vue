<template>
    <div class="page-body B2b">
        <div class="page-body-cont approvalcontract">
            <!-- <component :is="key" v-bind="value.bind||{}" v-on="value.on||{}" v-for="(value,key,index) in currentKeyToComponent()" :key="index">
            <template v-if="value.slot" :slot="value.slot">{{value.innerHtml||''}}</template>
        </component> -->
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
                            <el-form :rules="rules" :model="currentKey" ref="ruleForm" label-width="100px" class="demo-ruleForm" :style="currentKey.inputStyle==9?'':'width:100%'">
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
                    <div class="approvalcontract-content-layout">
                        <!-- 分财、风控预览——纯html -->
                        <div class="approvalcontract-content" v-html='contractContentDiv' v-if="detailRes.contractStatus != 6"></div>
                        <!-- style="display:none" -->
                        <!-- <div class="approvalcontract-content-hidden" style="display:none" v-html='contractContentInputHidden'></div> -->
                        <!-- 法务预览html——编辑器 -->
                        <div class="approvalcontract-content-legal-affairs" v-if="detailRes.contractStatus == 6">
                            <RichEditor ref="RichEditor" v-model="contractContentDiv" :menus="menus" :uploadImgServer="uploadImgServer" :height='getHeight()' :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%" @change="onchange"></RichEditor>
                        </div>
                    </div>
                    <h-button type="primary" @click="onSaveContent(3)" v-if="detailRes.contractStatus == 6&&showUpdataBtn">更新条款</h-button>
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
            <div style="text-align: center;font-size: 18px;">{{detailRes.contractStatus == 2?'合同待分财审核':detailRes.contractStatus == 4?'合同待风控审核':detailRes.contractStatus == 6?'合同待法务审核':''}}</div>
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

export default {
    name: 'approveContract',
    components: { diffDialog, selectCom, isNum, inputAutocomplete, hosjoyUpload, isAllNum, isPositiveInt },
    data () {
        return {
            xx: '232323<br>   324 <br>发送到',
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
            vHtml: '',
            currentKey: '',
            currentKeyOriginal: '', // 更新前的字段,需求做多了，用于法务修改字段key的，可不删
            fieldName: '', // 编辑字段
            fieldOriginalContent: '', // 编辑前内容
            fieldContent: '', // 编辑内容
            contractContentDiv: '', // 合同内容
            contractContentInputHidden: '', // 合同内容
            approvalRemark: '',
            detailRes: '',
            dialog: {
                dialogVisible: false,
                title: '',
                status: '',
                remark: ''
            },
            historyList: '',
            menus: [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                // 'emoticon', // 表情
                // 'image', // 插入图片
                'table', // 表格
                'undo', // 撤销
                'redo' // 重复
            ],
            currentContent: '',
            lastContent: '',
            firstKsy: '',
            rules: {
                formValidator: [
                    { validator: this.checkField, trigger: 'blur' }
                ]
            },
            showUpdataBtn: false

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
            // 支付期限
            if (this.currentKey.paramKey == 'pay_period_supplier') {
                return 'isPositiveInt'
            }
            // 纯数字
            if (this.currentKey.paramKey == 'supplier_account_number' || this.currentKey.paramKey == 'hosjoy_account_number' || this.currentKey.paramKey == 'regulatory_account_number' || this.currentKey.paramKey == 'dealer_controller_postal_code' || this.currentKey.paramKey == 'dealer_controller_postal_code_spouse') {
                return 'isAllNum'
            }
            // 元 %
            if (this.currentKey.unit) {
                return 'isNum'
            }
            return 'elInput'
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        debounce (func, wait) {
            let _this = this
            return function () {
                let now = new Date()
                if (now - _this.lastTime - wait > 0) {
                    _this.timeout = setTimeout(() => {
                        func.apply(_this, arguments)
                    }, wait)
                } else {
                    if (_this.timeout) {
                        clearTimeout(_this.timeout)
                        _this.timeout = null
                    }
                    _this.timeout = setTimeout(() => {
                        func.apply(_this, arguments)
                    }, wait)
                }

                _this.lastTime = now
            }
        },
        onShowUpdata () {
            if (this.detailRes.contractStatus == 6) {
                this.$nextTick(() => {
                    let curHTML = document.getElementsByClassName('approvalcontract-content-legal-affairs')[0].getElementsByClassName('w-e-text')[0].innerHTML
                    if (this.detailRes.contractContent !== curHTML) {
                        this.showUpdataBtn = true
                    } else {
                        this.showUpdataBtn = false
                    }
                })
            } else {
                this.showUpdataBtn = false
            }
        },
        onchange () {
            this.debounce(this.onShowUpdata, 200)()
            this.domBindMethods()
        },
        getHeight () {
            let h = document.getElementsByClassName('approvalcontract-content-layout') && document.getElementsByClassName('approvalcontract-content-layout')[0].offsetHeight - 30
            return h || 500
        },
        checkField (rule, value, callback) {
            if (this.currentKey.required && this.currentKey.paramValue == '') {
                callback(new Error(`${this.currentKey.paramName}不能为空`))
                return
            }
            // 匹配正则
            if (this.currentKey.required && this.currentKey.checkRule) {
                let Reg = new RegExp(this.currentKey.checkRule)
                if (!Reg.test(this.currentKey.paramValue)) {
                    console.log('test')
                    return callback(new Error(this.currentKey.checkNote || '格式不正确'))
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
                    [this.inputStyleDom]:
                        this.inputStyleDom !== 'elInput'
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
                                    return [{ value: '银行转帐', label: '银行转帐' }, { value: '银票', label: '银票' }, { value: '商票', label: '商票' }]
                                }
                                if (_this.currentKey.paramKey == 'supplier_prepay_form') {
                                    return [{ value: '银行转帐', label: '银行转帐' }, { value: '银行承兑汇票', label: '银行承兑汇票' }]
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
                            maxlength: '200',
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
                            fit: 'fit',
                            previewSrcList: [this.currentKey.paramValue]
                        },
                        on: {
                            input: (val) => { console.log(val) }
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
                let curHTML = this.$refs.RichEditor.value
                if (this.detailRes.contractContent !== curHTML) {
                    this.$message({
                        message: `内容修改还没保存`,
                        type: 'error'
                    })
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
                let dom = document.getElementById('platform_sign')
                dom.outerHTML = `<span id="platform_sign"></span>`
            }
            let res = this.contractFieldsList.filter(item => item.paramKey.indexOf('contract_sign_') > -1)
            if (res && res.length > 0 && this.detailRes.contractStatus == 6) {
                res.map(item => {
                    let TDoms = document.getElementsByClassName('approvalcontract-content-legal-affairs')[0].getElementsByClassName('w-e-text')[0]
                    let resDom = TDoms.getElementsByClassName(item.paramKey)
                    if (resDom && resDom.length > 0) {
                        Array.from(resDom).map(jtem => {
                            jtem.outerHTML = ''
                        })
                    }
                })
            }
            this.$nextTick(async () => {
                let res = ''
                if (this.detailRes.contractStatus == 6) {
                    res = document.getElementsByClassName('approvalcontract-content-legal-affairs')[0].getElementsByClassName('w-e-text')[0]
                }
                const query = {
                    contractId: this.$route.query.id,
                    approver: this.userInfo.employeeName,
                    // 合同审批角色 1：分财 2：风控 3：法务
                    approverRole: this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                    approvalStatus: this.dialog.status,
                    approvalRemark: this.dialog.remark,
                    contractContent: this.detailRes.contractStatus == 6 ? res.innerHTML : ''
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
            let doms = document.getElementsByClassName(`${this.currentKey.paramKey}_${this.currentKey.imgIndex}`)
            this.currentKey.paramValue = temp[0].fileUrl
            // 同步修改div和input合同
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
            let domName = this.detailRes.contractStatus == 6 ? 'approvalcontract-content-legal-affairs' : 'approvalcontract-content'
            let contractContentInput = this.detailRes.contractStatus == 6 ? document.getElementsByClassName(domName)[0].getElementsByClassName('w-e-text')[0].innerHTML : document.getElementsByClassName(domName)[0].innerHTML
            await saveContent({
                'contractId': this.$route.query.id,
                // 合同审批角色 1：分财 2：风控 3：法务
                'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                'type': 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                'fieldName': this.currentKey.paramKey, // 编辑字段
                'fieldOriginalContent': fieldOriginalContent, // 编辑前内容
                'fieldContent': temp[0].fileUrl, // 编辑内容
                'contractContent': contractContentInput, // 拿input版的合同去提交。法务审核的时候需要用到。
                'createBy': this.userInfo.employeeName,
                'contractFieldsList': JSON.stringify(contractFieldsList) // 合同字段键值对
            })
            this.init()
        },
        // operatorType 3 更新条款
        onSaveContent (operatorType = '') {
            // todo 可替换成空
            let { paramName, paramKey, paramValue, required } = this.currentKey
            // if (!required && (paramValue === '' || paramValue === null)) return
            if (required && (paramValue === '' || paramValue === null)) {
                this.$message({
                    message: `${paramName}不能为空`,
                    type: 'error'
                })
            }
            // 多行文本。展示html。可空格可换行。
            if (this.currentKey.inputStyle == 4 && this.currentKey.paramValue) {
                let newString = this.currentKey.paramValue.replace(/\n/g, '_@').replace(/\r/g, '_#')
                newString = newString.replace(/_#_@/g, '<br/>')
                newString = newString.replace(/_@/g, '<br/>')
                newString = newString.replace(/\s/g, '&nbsp;')
                paramValue = newString
                // this.currentKey.paramValue = textarea.innerHTML.replace(/(.*)<div>/, '$1<div style="display: initial;">')
            }
            if (this.currentKey.inputStyle == 9) {
                // 修改图片，图片必填
                this.setImg()
                return
            }
            let domName = this.detailRes.contractStatus == 6 ? 'approvalcontract-content-legal-affairs' : 'approvalcontract-content'
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    //
                    let tempObj = {}
                    let tempArr = []
                    this.contractFieldsList.map(item => {
                        let DomList = document.getElementsByClassName(domName)[0].getElementsByClassName(item.paramKey)
                        // 筛选出页面上的键值对，可能会被删除
                        if (DomList && DomList.length > 0) {
                            // 页面合同上的所有键值对、签署字段不存在className
                            if (!(item.paramKey in tempObj) && item.paramKey !== '') {
                                tempObj[item.paramKey] = JSON.parse(this.detailRes.contractFieldsList).filter(ktem => ktem.paramKey === item.paramKey)
                            }
                        }
                    })
                    console.log('tempObj: ', tempObj)
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
                    if (this.detailRes.contractStatus == 6 && !operatorType) {
                        let curHTML = this.$refs.RichEditor.value
                        if (this.detailRes.contractContent !== curHTML) {
                            this.$message({
                                message: `合同内容发送修改请先保存更新`,
                                type: 'error'
                            })
                            return
                        }
                    }
                    // div版合同,修改页面上的值
                    let ryanList = document.getElementsByClassName(domName)[0].getElementsByClassName(this.currentKey.paramKey)
                    Array.from(ryanList).map(jtem => {
                        jtem.innerHTML = paramValue
                    })

                    // 通过dom生成最新的html
                    this.contractContentInput = this.detailRes.contractStatus == 6 ? document.getElementsByClassName(domName)[0].getElementsByClassName('w-e-text')[0].innerHTML : document.getElementsByClassName(domName)[0].innerHTML
                    this.fieldName = paramKey // 编辑字段
                    // 编辑前内容
                    this.fieldOriginalContent = this.originalContentFieldsList.filter(item => item.paramKey === paramKey)[0].paramValue
                    this.fieldContent = paramValue
                    console.log({
                        'contractId': this.$route.query.id,
                        // 合同审批角色 1：分财 2：风控 3：法务
                        'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                        'type': operatorType || 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                        'fieldName': operatorType ? '' : this.fieldName, // 编辑字段
                        'fieldOriginalContent': operatorType ? '' : (this.fieldOriginalContent || ''), // 编辑前内容
                        'fieldContent': operatorType ? '' : this.fieldContent, // 编辑内容
                        'contractContent': this.contractContentInput,
                        'createBy': this.userInfo.employeeName,
                        'contractFieldsList': JSON.stringify(tempArr) // 合同字段键值对
                    })
                    // return
                    await saveContent({
                        'contractId': this.$route.query.id,
                        // 合同审批角色 1：分财 2：风控 3：法务
                        'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                        'type': operatorType || 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                        'fieldName': operatorType ? '' : this.fieldName, // 编辑字段
                        'fieldOriginalContent': operatorType ? '' : (this.fieldOriginalContent || ''), // 编辑前内容
                        'fieldContent': operatorType ? '' : this.fieldContent, // 编辑内容
                        'contractContent': this.contractContentInput, // 拿input版的合同去提交。法务审核的时候需要用到。
                        'createBy': this.userInfo.employeeName,
                        'contractFieldsList': JSON.stringify(tempArr) // 合同字段键值对
                    })
                    this.init()
                }
            })
        },
        domBindMethods () {
            let domName = this.detailRes.contractStatus == 6 ? 'approvalcontract-content-legal-affairs' : 'approvalcontract-content'
            this.$nextTick(() => {
                // this.$refs.RichEditor.value  纯html
                this.firstKsy = this.contractFieldsList[0].paramKey
                if (!this.currentKey) {
                    // 保存后不会更新左侧字段
                    this.currentKey = this.contractFieldsList.filter(item => item.paramKey === this.firstKsy)[0]
                }
                // 拿键值对遍历
                this.contractFieldsList.map(item => {
                    if (item.inputStyle && item.inputStyle == 9) {
                        let imgDom = document.getElementsByClassName(domName)[0].getElementsByTagName('img')
                        imgDom && imgDom.length > 0 && Array.from(imgDom).map(item => {
                            item.onclick = (event) => {
                                this.currentKey = {
                                    required: true,
                                    inputStyle: 9,
                                    paramKey: event.target.dataset.key,
                                    paramValue: event.target.currentSrc,
                                    paramName: event.target.dataset.name,
                                    imgIndex: event.target.dataset.index
                                }
                                console.log('imgclick this.currentKey', this.currentKey)
                            }
                        })
                    } else {
                        // 通过键值对里的key查找对应的dom
                        let DomList = document.getElementsByClassName(domName)[0].getElementsByClassName(item.paramKey)
                        if (DomList && DomList.length > 0) {
                            Array.from(DomList).map((jtem, index) => {
                                if (jtem.dataset && jtem.dataset.paramname && !jtem.innerText) {
                                    jtem.innerText = jtem.dataset.paramname
                                }
                                // console.log('jtem: ', jtem.tagName)
                                let fields = this.originalContentFieldsList.filter(ktem => ktem.paramKey === jtem.className)[0]
                                // 遍历dom添加点击事件
                                jtem.onclick = (event) => {
                                    this.currentKey = { ...fields, event }
                                    console.log('this.currentKeyxxx: ', this.currentKey)
                                    // this.currentKeyOriginal = { ...fields }
                                    this.$refs['ruleForm'].resetFields()
                                    // 多行文本反显使用
                                    if (this.currentKey.inputStyle == 4 && this.currentKey.paramValue) {
                                        this.currentKey.paramValue = event.target.innerText
                                    }
                                    // this.$refs.RichEditor.editor.cmd.do('insertHTML', '<p><br></p>')
                                    // console.log(document.queryCommandValue('ForeColor'))
                                }
                                jtem.onselectstart = () => {
                                    return false
                                }
                            })
                        }
                    }
                })
                if (this.detailRes.contractStatus == 6) {
                    document.getElementsByClassName('approvalcontract-content-legal-affairs')[0].getElementsByClassName('w-e-text')[0].addEventListener('keydown', this.KeyDown, false)
                }
            })
        },
        async init () {
            const res = await getContractsContent({ contractId: this.$route.query.id })
            this.detailRes = res.data
            this.contractContentDiv = res.data.contractContent // Div版的合同
            // this.contractContentInputHidden = res.data.contractContent // input版的合同
            this.originalContentFieldsList = JSON.parse(res.data.contractFieldsList) // 保存最初的键值对
            this.contractFieldsList = JSON.parse(JSON.stringify(this.originalContentFieldsList)) // 可修改的键值对
            this.domBindMethods()
        },
        getOperationContent (item) {
            // fieldContent编辑内容 fieldName编辑字段 fieldOriginalContent编辑前内容
            const obj = JSON.parse(item.operationContent)
            if (obj.fieldContent === '') {
                return `<font>${obj.fieldDesc}</font>删除了<font>${obj.fieldOriginalContent}</font>内容变为空`
            }
            return `<font>${obj.fieldDesc}</font>从<font>${obj.fieldOriginalContent}</font>变为<font>${obj.fieldContent}</font>`
        },
        KeyDown () {
            // 13回车
            if (event.keyCode == 13) {
                event.preventDefault()
                setTimeout(() => {
                    this.$refs.RichEditor.editor.cmd.do('insertHTML', '<p><br></p>')
                }, 0)
            }

            if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
                event.returnValue = false
            }
        }
    },
    async beforeMount () {
        const { data } = await contractKeyValue(this.$route.query.contractTypeId)
        this.contractKeyValueList = data
        this.init()
    },
    destroyed () {
        if (this.detailRes.contractStatus == 6) {
            document.removeEventListener('keydown', this.KeyDown, false)
        }
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
        height: calc(100vh - 315px);
        overflow: scroll;
        min-width: 600px;
    }
    .approvalcontract-layout {
        height: calc(100vh - 210px);
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
</style>