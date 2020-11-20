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
                        <div class="approvalcontract-content" v-html='contractContentDiv' v-show="detailRes.contractStatus != 6"></div>
                        <!-- style="display:none" -->
                        <div class="approvalcontract-content-hidden" style="display:none" v-html='contractContentInputHidden'></div>
                        <!-- 法务预览html——编辑器 -->
                        <div class="approvalcontract-content-legal-affairs" v-if="detailRes.contractStatus == 6">
                            <RichEditor ref="RichEditor" v-model="contractContentInputHidden" :menus="menus" :uploadImgServer="uploadImgServer" :height='getHeight()' :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%"></RichEditor>
                        </div>
                    </div>
                    <div class="approvalcontract-btn">
                        <h-button @click="goBack">暂不审核</h-button>
                        <h-button type="primary" @click="openDialog('驳回',3)">驳回</h-button>
                        <h-button type="primary" @click="onSaveContent(3)" v-if="detailRes.contractStatus == 6">更新条款</h-button>
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
            <div style="text-align: center;font-size: 18px;">{{detailRes.contractStatus == 2?'合同待分财审核':detailRes.contractStatus == 4?'合同待风控审核':detailRes.contractStatus == 6?'合同待法务审核':''}}</div>
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
import formatInput from './components/formatInput'
import inputAutocomplete from './components/inputAutocomplete'
import { mapState, mapActions } from 'vuex'
import { contractKeyValue, getContractsContent, saveContent, approvalContent, getCheckHistory, getDiffApi } from './api/index'
import { interfaceUrl } from '@/api/config'

export default {
    name: 'approveContract',
    components: { diffDialog, selectCom, formatInput, inputAutocomplete },
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
        getHeight () {
            let h = document.getElementsByClassName('approvalcontract-content-layout') && document.getElementsByClassName('approvalcontract-content-layout')[0].offsetHeight - 30
            return h || 500
        },
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
                    [this.currentKey.unit ? 'formatInput' : 'elInput']:
                        this.currentKey.unit
                            ? {
                                bind: {
                                    paramKey: this.currentKey.paramKey,
                                    value: this.currentKey.paramValue,
                                    placeholder: '请输入内容',
                                    disabled: !this.currentKey.modify,
                                    style: { width: '250px' },
                                    innerHtml: this.currentKey.unit,
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
                                    maxlength: this.currentKey.maxLength || '',
                                    [this.currentKey.unit ? 'style' : null]: { width: '250px' }
                                },
                                on: {
                                    input: (val) => { this.currentKey.paramValue = val.trim() }
                                },
                                slot: this.currentKey.unit ? 'append' : '',
                                innerHtml: this.currentKey.unit || ''
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
            } else {
                this.onApprove()
            }
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
        onSaveContent (operatorType = '') {
            // console.log('id', this.currentKey.target.id)
            const { paramName, paramKey, paramValue, required } = this.currentKey
            if (required && (paramValue === '' || paramValue === null)) {
                this.$message({
                    message: `${paramName}不能为空`,
                    type: 'error'
                })
            }
            // 最后要拿到input的合同
            let domName = this.detailRes.contractStatus == 6 ? 'approvalcontract-content-legal-affairs' : 'approvalcontract-content-hidden'
            let tempArr = []

            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    if (!operatorType) {
                        /* 修改模板： */
                        // div版合同
                        if (this.currentKey.target) {
                            this.currentKey.target.innerText = this.currentKey.paramValue
                        } else {
                            let ryanList = document.getElementsByClassName('approvalcontract-content')[0].getElementsByClassName(this.currentKeyOriginal.paramKey)
                            Array.from(ryanList).map(jtem => {
                                jtem.innerHTML = paramValue
                            })
                        }

                        // input版合同
                        if (this.currentKey.target) {
                            let input = document.getElementsByClassName(domName)[0].getElementsByClassName(this.currentKey.target.className)[0]
                            input.value = paramValue
                            input.setAttribute('value', paramValue)
                            console.log('input: ', input)
                        } else {
                            let richEditorDom = document.getElementsByClassName(domName)[0].getElementsByClassName(this.currentKeyOriginal.paramKey)
                            Array.from(richEditorDom).map(jtem => {
                                jtem.value = paramValue
                                jtem.className = paramKey
                                jtem.setAttribute('value', paramValue)
                                let inputWidth = paramValue.length * 14
                                jtem.style.width = `${inputWidth}px`
                            })
                            let inputDomList = ''
                            if (this.detailRes.contractStatus == 6) {
                                inputDomList = document.getElementsByClassName('approvalcontract-content-legal-affairs')[0].getElementsByClassName('w-e-text')[0].getElementsByTagName('input')
                            } else {
                                inputDomList = document.getElementsByClassName('approvalcontract-content-hidden')[0].getElementsByTagName('input')
                            }

                            let tempObj = {}
                            Array.from(inputDomList).map((item, index) => {
                                if (!(item.className in tempObj)) {
                                    tempObj[item.className] = this.contractKeyValueList.filter(jtem => jtem.paramKey === item.className)
                                }
                            })
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
                        }
                    }
                    // 通过dom生成最新的html
                    this.contractContentInput = this.detailRes.contractStatus == 6 ? document.getElementsByClassName(domName)[0].getElementsByClassName('w-e-text')[0].innerHTML : document.getElementsByClassName(domName)[0].innerHTML
                    this.fieldName = paramKey // 编辑字段
                    if (this.currentKey.target) {

                    }
                    let temp = this.originalContentFieldsList.filter(item => item.paramKey === paramKey)
                    if (temp.length == 0) {
                        this.fieldOriginalContent = this.originalContentFieldsList.filter(item => item.paramKey === this.currentKeyOriginal.paramKey)[0].paramValue// 编辑前内容, 修改了字段
                    } else {
                        this.fieldOriginalContent = this.originalContentFieldsList.filter(item => item.paramKey === paramKey)[0].paramValue // 编辑前内容
                    }
                    this.fieldContent = paramValue
                    // await saveContent({
                    //     'contractId': this.$route.query.id,
                    //     // 合同审批角色 1：分财 2：风控 3：法务
                    //     'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                    //     'type': operatorType || 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                    //     'fieldName': operatorType ? '' : this.fieldName, // 编辑字段
                    //     'fieldOriginalContent': operatorType ? '' : (this.fieldOriginalContent || ''), // 编辑前内容
                    //     'fieldContent': operatorType ? '' : this.fieldContent, // 编辑内容
                    //     'contractContent': this.contractContentInput, // 拿input版的合同去提交。法务审核的时候需要用到。
                    //     'createBy': this.userInfo.employeeName,
                    //     'contractFieldsList': operatorType ? this.detailRes.contractFieldsList : JSON.stringify(tempArr) // 合同字段键值对
                    // })
                    // this.init()
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
                        if (!this.currentKey) {
                            // 保存后不会更新左侧字段
                            this.currentKey = this.contractFieldsList.filter(item => item.paramKey === this.firstKsy)[0]
                        }
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
                        console.log('inputDomList: ', inputDomList[0])
                        this.firstKsy = inputDomList[0].className
                        // 保存后不会更新左侧字段
                        if (!this.currentKey) {
                            if (this.firstKsy.indexOf('contract_sign_') != -1) {
                                this.currentKey = {
                                    inputStyle: 4,
                                    required: false,
                                    paramValue: inputDomList[0].value || '',
                                    paramKey: inputDomList[0].className,
                                    paramName: '自定义合同条款'
                                }
                            } else {
                                this.currentKey = this.contractFieldsList.filter(item => item.paramKey === this.firstKsy)[0]
                            }
                        }
                        this.currentKeyOriginal = JSON.parse(JSON.stringify(this.currentKey))
                        Array.from(inputDomList).map((item, index) => {
                            item.outerHTML = `<span class="${item.className}" contenteditable="false" style="color:rgb(255, 122, 69);cursor: pointer;">${item.value}</span>`
                            // 赋值初始值
                            let fields = this.originalContentFieldsList.filter(jtem => jtem.paramKey === item.className)[0]
                            // 给div绑定事件
                            let doms = document.getElementsByClassName('approvalcontract-content')[0].getElementsByClassName(item.className)
                            Array.from(doms).map(jtem => {
                                jtem.onclick = (event) => {
                                    if (event.target.className.indexOf('contract_sign_') != -1) {
                                        this.currentKey = {
                                            inputStyle: 4,
                                            required: false,
                                            paramValue: event.target.innerText,
                                            paramKey: event.target.className,
                                            paramName: '自定义合同条款',
                                            target: event.target
                                        }
                                        console.log('this.currentKey', this.currentKey)
                                    } else {
                                        this.currentKey = { ...fields }
                                        this.currentKeyOriginal = { ...fields }
                                    }

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