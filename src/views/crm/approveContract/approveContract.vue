<template>
    <div class="page-body B2b">
        <div class="page-body-cont approvalcontract">
            <div class="approvalcontract-head">
                <font>{{detailRes.contractStatus == 6 ? '分财' : detailRes.contractStatus == 4 ? '风控' : '法务'}}审核合同</font>
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
                        <p>
                            <el-form :rules="rules" :model="currentKey" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item prop="formValidator" v-for="(value,key,index) in currentKeyToComponent()" :key="index">
                                    <component :is="key" v-bind="value.bind||{}" v-on="value.on||{}">
                                        <template v-if="value.slot" :slot="value.slot">{{value.innerHtml||''}}</template>
                                    </component>
                                </el-form-item>
                            </el-form>
                        </p>
                        <h-button style="margin-top:10px" @click="onSaveContent" type="primary">保存</h-button>
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
                        <div class="approvalcontract-content" v-html='contractContentDiv' v-show="detailRes.contractStatus != 6"></div>
                        <!-- style="display:none" -->
                        <div class="approvalcontract-content-hidden" style="display:none" v-html='contractContentInputHidden'></div>
                        <!-- 法务预览html——编辑器 -->
                        <div class="approvalcontract-content-legal-affairs" v-if="detailRes.contractStatus == 6">
                            <RichEditor ref="RichEditor" v-model="contractContentInputHidden" :menus="menus" :uploadImgServer="uploadImgServer" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%"></RichEditor>
                        </div>
                    </div>
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
                <el-input v-model="dialog.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" style="width:80%"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSure">确定{{dialog.title}}</el-button>
            </span>
        </el-dialog>
        <el-drawer class="contentdrawerbox" size="550px" :visible.sync="drawerVisible" :with-header="false" :wrapperClosable='false'>
            <div slot="title">审核记录</div>
            <!-- 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回 -->
            <div class="history-css">
                <div v-if="historyList&&historyList.length==0">暂无数据</div>
                <div v-else class="history-css-flex" v-for="(item,index) in historyList" :key="index">
                    <div class="history-css-left">
                        <span class="name">{{item.operator}} </span>
                        <span>{{item.operationName}}</span>
                        <template v-if="item.operationName == '编辑了'">
                            <span class="operationcontent-css" v-html="getOperationContent(item)"></span>
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
import { mapState, mapActions } from 'vuex'
import { contractKeyValue, getContractsContent, saveContent, approvalContent, getCheckHistory, getDiffApi } from './api/index'
import { interfaceUrl } from '@/api/config'

export default {
    name: 'approveContract',
    components: { diffDialog, selectCom },
    data () {
        return {
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
                'emoticon', // 表情
                'image', // 插入图片
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
            }

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
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        onxxxx (num) {
            if (!num) {
                this.currentKey.paramValue = ''
                return
            }
            num = num.toString()
            num = num.replace(/,/gi, '')
            this.currentKey.paramValue = num
        },
        checkField (rule, value, callback) {
            if (this.currentKey.required && this.currentKey.paramValue == '') {
                callback(new Error(`${this.currentKey.paramName}不能为空`))
                return
            }
            // 匹配正则
            if (this.currentKey.checkRule) {
                let Reg = new RegExp(this.currentKey.checkRule)
                if (!Reg.test(this.currentKey.paramValue)) {
                    return callback(new Error(this.currentKey.checkNote || '格式不正确'))
                }
            } else {
                callback()
            }
        },
        querySearch (queryString, callback) {
            let restaurants = [
                { 'value': '@qq.com' },
                { 'value': '@126.com' },
                { 'value': '@163.com' },
                { 'value': '@sohu.com' }
            ]
            let results = JSON.parse(JSON.stringify(restaurants))
            for (let item in results) {
                results[item].value = queryString.split('@')[0] + '' + restaurants[item].value
            }
            callback(results)
        },
        currentKeyToComponent () {
            // 1.单行输入框, 2.单选框, 3.单选选择项(下拉), 4.多行输入框, 5.邮箱, 6.数字选择器, 7.单选拨轮, 8.日期选择器, 9.上传
            const comObj = {
                1: {
                    elInput: {
                        bind: {
                            value: this.currentKey.paramValue,
                            placeholder: '请输入内容',
                            disabled: this.currentKey.modify == 0,
                            [this.currentKey.unit ? 'style' : null]: { width: '250px' }
                        },
                        on: {
                            input: (val) => { this.currentKey.paramValue = val.trim() }
                        },
                        slot: this.currentKey.unit ? 'append' : '',
                        innerHtml: this.currentKey.unit || ''
                    }
                },
                2: {
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
                            autosize: { minRows: 3, maxRows: 5 },
                            maxlength: '200',
                            showWordLimit: true
                        },
                        on: {
                            input: (val) => { this.currentKey.paramValue = val.trim() }
                        }
                    }
                },
                5: {
                    elAutocomplete: {
                        bind: {
                            value: this.currentKey.paramValue,
                            fetchSuggestions: this.querySearch,
                            triggerOnFocus: false,
                            style: { width: '250px' }
                        },
                        on: {
                            input: (val) => { this.currentKey.paramValue = val.trim() }
                        }
                    }
                },
                6: {
                    elSlider: {
                        bind: {
                            value: 1,
                            step: 1,
                            max: 6,
                            min: 1,
                            marks: { 1: '1个月', 2: '2个月', 3: '3个月', 4: '4个月', 5: '5个月', 6: '6个月' }
                        },
                        on: {
                            change: (val) => { this.currentKey.paramValue = val }
                        }
                    }
                },
                8: {
                    elDatePicker: {
                        bind: {
                            value: this.currentKey.paramValue,
                            type: 'date',
                            placeholder: '选择日期',
                            valueFormat: 'yyyy-MM-dd',
                            style: { width: '250px' }
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
            }
            this.onApprove()
        },
        async onApprove () {
            const query = {
                contractId: this.$route.query.id,
                approver: this.userInfo.employeeName,
                // 合同审批角色 1：分财 2：风控 3：法务
                approverRole: this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                approvalStatus: this.dialog.status,
                approvalRemark: this.dialog.remark
            }
            await approvalContent(query)
            this.$message({
                message: `提交成功`,
                type: 'success'
            })
            this.handleClose()
            this.goBack()
        },
        goBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/goodwork/contractSigningManagement')
        },
        onSaveContent () {
            const { paramName, paramKey, paramValue, required } = this.currentKey
            if (required && (paramValue === '' || paramValue === null)) {
                this.$message({
                    message: `${paramName}不能为空`,
                    type: 'error'
                })
            }
            this.$refs.ruleForm.validate(async (valid) => {
                console.log('valid: ', valid)
                if (valid) {
                    /* 修改模板： */
                    // div版合同
                    let ryanList = document.getElementsByClassName('approvalcontract-content')[0].getElementsByClassName(this.currentKeyOriginal.paramKey)
                    Array.from(ryanList).map(jtem => {
                        jtem.innerHTML = paramValue
                    })
                    // input版合同
                    let domName = this.detailRes.contractStatus == 6 ? 'approvalcontract-content-legal-affairs' : 'approvalcontract-content-hidden'
                    let richEditorDom = document.getElementsByClassName(domName)[0].getElementsByClassName(this.currentKeyOriginal.paramKey)
                    Array.from(richEditorDom).map(jtem => {
                        jtem.value = paramValue
                        jtem.className = paramKey
                        jtem.setAttribute('value', paramValue)
                        let inputWidth = paramValue.length * 14
                        jtem.style.width = `${inputWidth}px`
                    })
                    let inputDomList = document.getElementsByClassName('approvalcontract-content-legal-affairs')[0].getElementsByClassName('w-e-text')[0].getElementsByTagName('input')
                    let tempObj = {}
                    Array.from(inputDomList).map((item, index) => {
                        if (!(item.className in tempObj)) {
                            tempObj[item.className] = this.contractKeyValueList.filter(jtem => jtem.paramKey === item.className)
                        }
                    })
                    console.log('tempObj: ', tempObj)
                    let tempArr = []
                    for (const key in tempObj) {
                        tempArr.push(tempObj[key][0])
                    }
                    tempArr.map(item => {
                        if (item.paramKey === paramKey) {
                            item.paramValue = paramValue
                        } else {
                            item.paramValue = Array.from(inputDomList).filter(jtem => jtem.className === item.paramKey)[0].value
                        }
                    })
                    console.log('tempArr: ', tempArr)
                    // 修改了字段
                    /* if (paramKey != this.currentKeyOriginal.paramKey) {
                        this.contractFieldsList.map(item => {
                            // 修改初始对象
                            if (item.paramKey === this.currentKeyOriginal.paramKey) {
                                for (const key in item) {
                                    item[key] = this.currentKey[key]
                                }
                            }
                        })
                    } else {
                        // 修改键值对
                        this.contractFieldsList.map(item => {
                            if (item.paramKey === paramKey) {
                                item.paramValue = paramValue
                            }
                        })
                    } */

                    // 通过dom生成最新的html
                    this.contractContentInput = this.detailRes.contractStatus == 6 ? document.getElementsByClassName(domName)[0].getElementsByClassName('w-e-text')[0].innerHTML : document.getElementsByClassName(domName)[0].innerHTML
                    this.fieldName = paramKey // 编辑字段
                    let temp = this.originalContentFieldsList.filter(item => item.paramKey === paramKey)
                    if (temp.length == 0) {
                        this.fieldOriginalContent = this.originalContentFieldsList.filter(item => item.paramKey === this.currentKeyOriginal.paramKey)[0].paramValue// 编辑前内容, 修改了字段
                    } else {
                        this.fieldOriginalContent = this.originalContentFieldsList.filter(item => item.paramKey === paramKey)[0].paramValue // 编辑前内容
                    }
                    this.fieldContent = paramValue
                    await saveContent({
                        'contractId': this.$route.query.id,
                        // 合同审批角色 1：分财 2：风控 3：法务
                        'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                        'type': 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                        'fieldName': this.fieldName, // 编辑字段
                        'fieldOriginalContent': this.fieldOriginalContent || '', // 编辑前内容
                        'fieldContent': this.fieldContent, // 编辑内容
                        'contractContent': this.contractContentInput, // 拿input版的合同去提交。法务审核的时候需要用到。
                        'createBy': this.userInfo.employeeName,
                        'contractFieldsList': JSON.stringify(tempArr) // 合同字段键值对
                    })
                    this.init()
                }
            })
        },
        async init () {
            const res = await getContractsContent({ contractId: this.$route.query.id })
            if (res) {
                this.detailRes = res.data
                this.contractContentDiv = res.data.contractContent // Div版的合同
                this.contractContentInputHidden = res.data.contractContent // input版的合同
                this.originalContentFieldsList = JSON.parse(res.data.contractFieldsList) // 保存最初的键值对
                this.contractFieldsList = JSON.parse(JSON.stringify(this.originalContentFieldsList)) // 可修改的键值对
                this.$nextTick(() => {
                    // 法务审核初始化
                    if (this.detailRes.contractStatus == 6) {
                        let inputDomList = document.getElementsByClassName('approvalcontract-content-legal-affairs')[0].getElementsByTagName('input')
                        this.firstKsy = inputDomList[0].className
                        this.currentKey = this.contractFieldsList.filter(item => item.paramKey === this.firstKsy)[0]
                        this.currentKeyOriginal = JSON.parse(JSON.stringify(this.currentKey))
                        Array.from(inputDomList).map((item, index) => {
                            let fields = this.originalContentFieldsList.filter(jtem => jtem.paramKey === item.className)[0]
                            item.onclick = () => {
                                this.currentKey = { ...fields }
                                this.currentKeyOriginal = { ...fields }
                                this.$refs['ruleForm'].resetFields()
                            }
                        })
                    } else {
                        // 分财、风控审核初始化
                        let inputDomList = document.getElementsByClassName('approvalcontract-content')[0].getElementsByTagName('input')
                        this.firstKsy = inputDomList[0].className
                        this.currentKey = this.contractFieldsList.filter(item => item.paramKey === this.firstKsy)[0]
                        this.currentKeyOriginal = JSON.parse(JSON.stringify(this.currentKey))
                        Array.from(inputDomList).map((item, index) => {
                            item.outerHTML = `<div class="${item.className}" contenteditable="false" style="display:inline;color:rgb(255, 122, 69);cursor: pointer;">${item.value}</div>`
                            // ${item.unit || ''
                            // 赋值初始值
                            let fields = this.originalContentFieldsList.filter(jtem => jtem.paramKey === item.className)[0]
                            // 给div绑定事件
                            let doms = document.getElementsByClassName('approvalcontract-content')[0].getElementsByClassName(item.className)
                            Array.from(doms).map(jtem => {
                                jtem.onclick = () => {
                                    this.currentKey = { ...fields }
                                    this.currentKeyOriginal = { ...fields }
                                    this.$refs['ruleForm'].resetFields()
                                }
                            })
                        })
                    }
                })
            }
        },
        getOperationContent (item) {
            // fieldContent编辑内容 fieldName编辑字段 fieldOriginalContent编辑前内容
            const obj = JSON.parse(item.operationContent)
            return `<font>${obj.fieldDesc}</font>从<font>${obj.fieldOriginalContent}</font>变为<font>${obj.fieldContent}</font>`
        }

    },
    async beforeMount () {
        // 判断是否是法务
        // const { data } = await contractKeyValue(10003)
        const { data } = await contractKeyValue(this.$route.query.contractTypeId)
        this.contractKeyValueList = data
        console.log('this.contractKeyValueList: ', this.contractKeyValueList)
        // const { data } = await contractKeyValue(10001)

        this.init()

        // 'contractContent': '<p>甲方：<input class="projectName" value="甲方" readonly style="width: 28px; color: rgb(255, 122, 69); height: 22px; min-width: 20px; border-width: initial; border-style: none; text-align: center; margin-right: 3px; border-radius: 5px; cursor: pointer;">你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好</p><p>乙方：<input class="projectContractName" value="乙方乙方乙方乙方乙方" readonly style="width: 140px; color: rgb(255, 122, 69); height: 22px; min-width: 20px; border-width: initial; border-style: none; text-align: center; margin-right: 3px; border-radius: 5px; cursor: pointer;"></p><p>1、价格</p><p>2、效率</p><p>3、额度</p><p>4、指标</p><p><span style="font-weight: bold;">签约方</span></p><p>甲方2：<input class="projectName" value="甲方2" readonly style="width: 28px; color: rgb(255, 122, 69); height: 22px; min-width: 20px; border-width: initial; border-style: none; text-align: center; margin-right: 3px; border-radius: 5px; cursor: pointer;"></p>',
        //
        // contractTemplateType 合同模板id
        // await saveContent({
        //     'contractId': 1,
        //     'type': 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
        //     'fieldName': '', // 编辑字段
        //     'fieldOriginalContent': 'this.fieldOriginalContent', // 编辑前内容
        //     'fieldContent': 'this.fieldContent', // 编辑内容
        //     // 'contractContent': this.contractContentInput, // 拿input版的合同去提交。法务审核的时候需要用到。
        //     'contractContent': '<p>甲方：<input class="project_contract_no" value="甲方" readonly style="width: 28px; color: rgb(255, 122, 69); height: 22px; min-width: 20px; border-width: initial; border-style: none; text-align: center; margin-right: 3px; border-radius: 5px; cursor: pointer;">你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好</p><p>乙方：<input class="dealer_company_name" value="乙方乙方乙方乙方乙方" readonly style="width: 140px; color: rgb(255, 122, 69); height: 22px; min-width: 20px; border-width: initial; border-style: none; text-align: center; margin-right: 3px; border-radius: 5px; cursor: pointer;"></p><p>1、价格</p><p>2、效率</p><p>3、额度</p><p>4、指标</p><p><span style="font-weight: bold;">签约方</span></p><p>甲方2：<input class="project_contract_no" value="甲方2" readonly style="width: 28px; color: rgb(255, 122, 69); height: 22px; min-width: 20px; border-width: initial; border-style: none; text-align: center; margin-right: 3px; border-radius: 5px; cursor: pointer;"></p>',
        //     'createBy': '孙军',
        //     'contractFieldsList': '[{"id":"104","paramKey":"project_contract_no","paramValue":null,"paramName":"项目合同编号","signerType":1,"select":false,"required":true,"modify":true,"dataSources":null,"calculationRules":null,"inputStyle":1,"unit":null,"groupName":"","groupId":10,"checkRule":null,"checkNote":null},{"id":"104","paramKey":"dealer_company_name","paramValue":"乙方乙方乙方乙方乙方","paramName":"乙方","signerType":1,"select":false,"required":true,"modify":true,"dataSources":null,"calculationRules":null,"inputStyle":1,"unit":null,"groupName":"","groupId":10,"checkRule":null,"checkNote":null}]' // 合同字段键值对
        // })
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
            position: relative;
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
        height: calc(100vh - 150px);
        overflow-y: scroll;
        .history-css-flex {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            .history-css-left {
                font-size: 14px;
                flex: 0 0 300px;
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
</style>