<template>
    <div class="page-body B2b">
        <el-image fit="contain" :z-index='999999' ref="zoomImage" v-if='currentKey.inputStyle==9' style="width: 0px; height:0px;position: absolute;" :src="this.currentKey.paramValue||emptyImg" :preview-src-list="this.currentKey.paramValue?[this.currentKey.paramValue]:[emptyImg]"></el-image>
        <div class="page-body-cont approvalcontract">
            <div class="approvalcontract-head">
                <div>
                    {{detailRes.contractStatus == 2 ? '分财' : detailRes.contractStatus == 4 ? '风控' : '法务'}}审核合同<em class="contentvs" @click="contentvsVisible = true" v-if="detailRes.contractStatus == 6&&contentvsData&&contentvsData.length>0">合同对比</em>
                </div>
                <h-button type="primary" @click="getHistory">审核及签署流程</h-button>
            </div>
            <div class="approvalcontract-layout">
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
                            <editor ref="editor" apiKey="v30p89tdwvdwt7x2fcngnrvnv2syzsvs7q9hps4gakdtt4ak" v-model="contractContentDiv" :init="editorInit" @onInit="editorOnInit" @onKeyUp="onKeyUp" @onBlur='onBlur' v-if="flag"></editor>
                            <!-- @onKeyUp="onKeyUp"  -->
                            <!-- 如果报tinymce vue This domain is not registered with Tiny Cloud. Please see the 请添加白名单 -->
                            <!-- https://www.tiny.cloud/docs/integrations/vue/ -->
                        </div>
                    </div>
                    <!-- <h-button type="primary" @click="onSaveContent(3)" v-if="detailRes.contractStatus == 6" :class="showShake?'shake':''">更新条款</h-button> -->
                    <div class="approvalcontract-btn">
                        <h-button @mousedown.native="goBack">暂不审核</h-button>
                        <h-button type="primary" @mousedown.native="openDialog('驳回',3)">驳回</h-button>
                        <h-button type="primary" @mousedown.native="openDialog('通过',2)">通过</h-button>
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
                <template v-else v-for="(item,index) in historyList">
                    <div class="history-css-flex" :key="index">
                        <!-- signStatus==6下一步 -->
                        <div v-if="item.signStatus==6" class="history-css-left">
                            <span class="name">{{item.operator}} </span>
                            <span style="">{{item.operationName}} </span>
                            <span class="operationcontent-css">
                                <font>{{item.operationContent}}</font>
                            </span>
                        </div>
                        <div v-else class="history-css-left">
                            <span class="name">{{item.operator}} </span>
                            <span>{{item.operationName}}</span>
                            <template v-if="item.operationName == '编辑了'">
                                <span class="imgcss" v-if="item.operationContent.indexOf('purchase_details') != -1||item.operationContent.indexOf('purch_service_fee_form') != -1">
                                    <font style="color:#ff7a45">{{JSON.parse(item.operationContent).fieldDesc}}</font>
                                    从<font>
                                        <el-image style="width: 80px; height: 80px;margin:10px 5px 0;border-radius: 7px;border: 1px solid #d9d9d9" :src="JSON.parse(item.operationContent).fieldOriginalContent||emptyImg"
                                            :preview-src-list="[JSON.parse(item.operationContent).fieldOriginalContent||emptyImg]"></el-image>
                                    </font>
                                    变为<font>
                                        <span v-if="JSON.parse(item.operationContent).fieldContent==''">“”</span>
                                        <template v-else-if="JSON.parse(item.operationContent).fieldContent.indexOf('[{')!=-1">
                                            <el-image v-for="(imgItem,imgIndex) in JSON.parse(JSON.parse(item.operationContent).fieldContent)" :key="imgIndex" style="width: 80px; height: 80px;margin:10px 5px 0;border-radius: 7px;border: 1px solid #d9d9d9" :src="imgItem.fileUrl"
                                                :preview-src-list="[imgItem.fileUrl]"></el-image>
                                        </template>
                                        <template v-else>
                                            <el-image style="width: 80px; height: 80px;margin:10px 5px 0;border-radius: 7px;border: 1px solid #d9d9d9" :src="JSON.parse(item.operationContent).fieldContent" :preview-src-list="[JSON.parse(item.operationContent).fieldContent]"></el-image>
                                        </template>
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
                    <div class="approvalRemark" v-if="item.approvalRemark"  :key="index+'approvalRemark'">
                        {{item.operatorType==1&&(item.operationName=='审核通过了'||item.operationName=='审核拒绝了')?'审批备注':'备注'}}：{{item.approvalRemark}}
                    </div>
                </template>

            </div>
            <div class="history-bttom">
                <h-button type="primary" @click="drawerVisible=false">好的</h-button>
            </div>
        </el-drawer>
        <diffDialog ref="diffDialog" v-if="currentContent&&lastContent" :currentContent=currentContent :lastContent=lastContent></diffDialog>
        <el-drawer class="editordrawerbox" title="编辑字段" :visible.sync="editorDrawer" :with-header="false" size='580px' :before-close='editorDrawerClose' :modal-append-to-body="false" :wrapperClosable='false'>
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

                        <hosjoyUpload v-model="imgArr" :showPreView='false' v-if="currentKey.inputStyle==9" class="upload-editor" drag :action="action" :multiple='!!currentKey.multiple' :fileSize='20' :fileNum='imgArr.length+1' style="width:340px;margin-right:20px;margin-top: -6px;"
                            accept='.jpeg,.jpg,.png' :uploadParameters='uploadParameters' @successArg='successArg'>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>后点击<em>保存</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpeg/jpg/png文件，且不超过20M</div>
                        </hosjoyUpload>
                    </p>
                    <h-button v-if="currentKey.inputStyle==9&&!currentKey.required&&currentKey.paramValue" style="margin-top:10px" @click="emptyTheImg" type="editor">清空该图片</h-button>
                    <h-button style="margin-top:10px" @click="onSaveContent('')" type="primary">保存</h-button>
                </div>
                <div class="tips">
                    <div><b>注意事项：</b></div>
                    <p>1、点击保存，则会记录修订记录，并保存为最新的合同文档；</p>
                    <p>2、暂不审核，不会撤销字段修订记录；</p>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="关联的采购单" :visible.sync="contentvsVisible" width="600px" class="contentvsbox">
            <div v-for="(item,index) in contentvsData" :key="index+'vs'" class="contentvsData-item" @click="onClickVsPurchaseOrder(item)">
                <img src='https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/files/20210122/163503360/a954aef4-b308-4043-b4b1-fea72116bd89.png' />
                {{item.purchaseOrderName}}
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="contentvsVisible = false">取 消</el-button>
                <el-button type="primary" @click="contentvsVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-drawer class="vsdrawercss" title="合同对比" :visible.sync="contentvsDataVisible" :with-header="false" size='580px' :before-close='vsdrawerClose' :modal-append-to-body="false" :wrapperClosable='false'>
            <div class="vsList" v-if="contentvsDataList&&contentvsDataList.length>0">
                <p v-for="(item,index) in contentvsDataList" :key="index+'合同对比'" @click="onClickVsItem(item)"><img src='https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/files/20210122/164437043/a333f54b-7a2c-4316-a419-9146c6386bce.png' />{{item.contractName}}</p>
            </div>
            <div class="vsList" v-else>暂无数据</div>
            <div class="history-bttom-css">
                <h-button type="primary" @click="closevsdrawer">好的</h-button>
            </div>
        </el-drawer>
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
import { contractKeyValue, getContractsContent, saveContent, approvalContent, getCheckHistory, getDiffApi, getPurchaseOrderList } from './api/index'
import { ccpBaseUrl } from '@/api/config'
import Editor from '@tinymce/tinymce-vue'
// api:https://www.tiny.cloud/docs/integrations/vue/
// http://tinymce.ax-z.cn/general/basic-setup.php
export default {
    name: 'approveContract',
    components: { diffDialog, selectCom, isNum, inputAutocomplete, hosjoyUpload, isAllNum, isPositiveInt, 'editor': Editor },
    data () {
        return {
            contentvsDataVisible: false,
            contentvsDataList: [],
            flag: true,
            contentvsData: [],
            contentvsVisible: false,
            editorDrawer: false,
            oldImg: '',
            emptyImg: 'https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/files/20210105/193158915/275fc2ef-5d7c-4056-b89f-bead48b3e90f.png',
            showShake: false,
            showLoading: true,
            editorInit: {
                // auto_focus: true,
                inline: true,
                menubar: false,
                language: 'zh_CN',
                skin_url: '/tinymce/skins/ui/oxide', // public目录下
                // plugins: ['export'], // 表格 'table'
                // 工具栏 表格 | table | export 导出
                toolbar: 'h1 h2 bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent  | undo redo | link unlink image  | removeformat',
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
            action: ccpBaseUrl + 'common/files/upload-old',
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
            keyValIncontract: [],
            // 只能选择当前时间之后的时间
            pickerOptions: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000
                }
            }

        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        uploadImgServer () {
            return ccpBaseUrl + 'common/files/upload-old'
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
            if (paramKey == 'dealer_controller_phone' || paramKey == 'dealer_controller_phone_spouse' || paramKey == 'supplier_account_number' || paramKey == 'hosjoy_account_number' || paramKey == 'regulatory_account_number' || paramKey == 'dealer_controller_postal_code' || paramKey == 'dealer_controller_postal_code_spouse') {
                return 'isAllNum'
            }
            // 元 % 带小数
            if (unit || paramKey == 'vip_next_year_discount') {
                return 'isNum'
            }
            return 'elInput'
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        async onClickVsPurchaseOrder (item) {
            const response = await getPurchaseOrderList({
                neContractId: this.$route.query.id,
                purchaseOrderId: item.purchaseOrderId
            })
            this.contentvsDataList = response.data
            this.contentvsDataVisible = true
            setTimeout(() => {
                this.contentvsVisible = false
            }, 500)
        },
        onClickVsItem (item) {
            console.log('item: ', item)
            let routeUrl = this.$router.resolve({
                path: '/goodwork/contractSigningManagementDetail',
                query: {
                    id: item.contractId
                }
            })
            window.open(routeUrl.href, '_blank')
        },
        closevsdrawer () {
            if (this.contentvsDataList && this.contentvsDataList.length > 0) {
                this.contentvsDataList = []
            }
            this.contentvsDataVisible = false
        },
        vsdrawerClose (done) {
            if (this.contentvsDataList && this.contentvsDataList.length > 0) {
                this.contentvsDataList = []
            }
            done()
        },
        editorDrawerClose (done) {
            if (this.imgArr && this.imgArr.length > 0) {
                this.imgArr = []
            }
            done()
        },
        onBlur () {
            this.onSaveContent(3)
        },
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
                                maxlength: this.currentKey.maxLength || '',
                                decimal: this.currentKey.decimal || '',
                                calculationRules: this.currentKey.calculationRules || ''// 最大值
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
                            style: 'width: 140px; height: 140px; border-radius: 7px;border: 1px solid #d9d9d9',
                            src: this.currentKey.paramValue || this.emptyImg,
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
                },
                // 年份选择器
                10: {
                    elDatePicker: {
                        bind: {
                            value: this.currentKey.paramValue,
                            type: 'year',
                            disabled: !this.currentKey.modify,
                            placeholder: '选择年份',
                            valueFormat: 'yyyy',
                            style: { width: '250px' },
                            pickerOptions: this.pickerOptions
                        },
                        on: {
                            input: (val) => { this.currentKey.paramValue = val }
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
            let contractContentBeforeTransfer = '' // 内容
            let contractFieldsListBeforeTransfer = ''// 字段
            if (this.detailRes.contractStatus == 6 && this.dialog.status == 2) {
                contractContentBeforeTransfer = this.contractDocument.innerHTML
                contractFieldsListBeforeTransfer = JSON.parse(JSON.stringify(this.contractFieldsList))
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
                                // jtem.outerHTML = `<span class="custom_sign" style="color:#fff" contenteditable="false">${item.dataset.en}</span>`
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
                    contractContent: this.detailRes.contractStatus == 6 ? this.contractDocument.innerHTML : '',
                    contractContentBeforeTransfer, // 备份
                    contractFieldsListBeforeTransfer: JSON.stringify(contractFieldsListBeforeTransfer)// 备份
                }
                try {
                    await approvalContent(query)
                    this.$message({
                        message: `提交成功`,
                        type: 'success'
                    })
                    this.handleClose()
                    // this.goBack()
                    this.setNewTags((this.$route.fullPath).split('?')[0])
                    this.$router.push('/goodwork/contractSigningManagement')
                } catch (error) {
                    console.log('提交失败')
                    this.flag = false
                    await this.init(() => {
                        this.domBindMethods()
                    })
                    this.handleClose()
                }
            })
        },
        async  goBack () {
            this.dealSaveContent(3)
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/goodwork/contractSigningManagement')
        },
        successArg (val) {
            this.currentKey.paramValue = val.fileUrl
        },
        async emptyTheImg () {
            let classN = `${this.currentKey.paramKey}_${this.currentKey.imgIndex}`
            let doms = this.contractDocument.getElementsByClassName(classN)
            if (doms.length == 0) return
            let dataParamName = `{#${this.currentKey.paramName}#}`
            let domList = this.contractDocument.getElementsByClassName(this.currentKey.paramKey)
            let old = this.currentKey.paramValue
            Array.from(domList).map(jtem => {
                let img = jtem.getElementsByTagName('img')
                //
                this.contractFieldsList.map((d, i) => {
                    if (d.paramKey === this.currentKey.paramKey) {
                        let dData = d.paramValue.filter(pv => {
                            if (pv && pv.fileUrl !== this.currentKey.paramValue) {
                                return true
                            }
                        })
                        console.log('dData-emptyTheImg: ', dData)
                        d.paramValue = dData
                    }
                })
                //
                if (img.length == 1) {
                    doms[0].outerHTML = `${dataParamName}`
                    this.contractFieldsList.map((d, i) => {
                        if (d.paramKey === this.currentKey.paramKey) {
                            d.paramValue = ''
                        }
                    })
                } else {
                    doms[0].outerHTML = ''
                }
            })
            await saveContent({
                'contractId': this.$route.query.id,
                // 合同审批角色 1：分财 2：风控 3：法务
                'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                'type': 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                'fieldName': this.currentKey.paramKey, // 编辑字段
                'fieldOriginalContent': old, // 编辑前内容
                'fieldContent': '', // 编辑内容
                'contractContent': this.contractDocument.innerHTML, // 拿input版的合同去提交。法务审核的时候需要用到。
                'createBy': this.userInfo.employeeName,
                // 'contractFieldsList': JSON.stringify(this.contractFieldsList) // 合同字段键值对
                'contractFieldsList': JSON.stringify(this.contractFieldsList) // 合同字段键值对
            })
            this.init(() => {
                this.domBindMethods()
            })
            this.editorDrawer = false
        },
        async setImg () {
            if (this.imgArr.length == 0) return
            this.imgArr.map(img => {
                img.url = img.fileUrl
                img.size = ''
            })
            if (this.currentKey.tagName == 'IMG') {
                console.log('IMG')
                let doms = this.contractDocument.getElementsByClassName(`${this.currentKey.paramKey}_${this.currentKey.imgIndex}`)
                let nums = Math.ceil(Math.random() * 1000000)
                let content = ''
                this.imgArr.map((img, imgIndex) => {
                    content += `<img class='${this.currentKey.paramKey}_${nums}' style='cursor: pointer; max-width: 100%;' src='${img.fileUrl}' data-key='${this.currentKey.paramKey}' data-index='${nums}' data-name='${this.currentKey.paramName}' />`
                })
                doms[0].outerHTML = content
            } else {
                console.log('SPAN')
                // 非必填的图片添加数据，有数据的走以前图片逻辑判断
                let doms = this.contractDocument.getElementsByClassName(`${this.currentKey.paramKey}`)
                let content = ''
                this.imgArr && this.imgArr.map((j, jindex) => {
                    content += `<img class='${this.currentKey.paramKey}_${jindex}' style='cursor: pointer; max-width: 100%;' src='${j.fileUrl}' data-key='${this.currentKey.paramKey}' data-index='${jindex}' data-imgIndex='${jindex}' data-name='${this.currentKey.paramName}' />`
                })
                doms[0].outerHTML = `<span style="word-break: break-all; color: #ff7a45; cursor: pointer;" class='${this.currentKey.paramKey}' data-paramName='${this.currentKey.paramName}' data-inputStyle='${this.currentKey.inputStyle}' contenteditable="false">${content}</span>`
                this.currentKey.paramValue = this.imgArr[0].fileUrl
            }
            /* // 测试代码
            this.domBindMethods()
            this.imgArr = []
            return
            // end 测试代码 */
            let fieldOriginalContent = ''
            // 修改键值对
            let contractFieldsList = JSON.parse(this.detailRes.contractFieldsList)
            console.log('contractFieldsList: ', contractFieldsList)
            contractFieldsList.map(item => {
                if (item.paramKey === this.currentKey.paramKey) {
                    // 图片非必填首次执行,可多图
                    if (!this.currentKey.imgIndex) {
                        item.paramValue = this.imgArr
                    } else {
                        console.log('旧图', this.oldImg)
                        fieldOriginalContent = this.oldImg
                        item.paramValue.map((img, i) => {
                            if (img.fileUrl === this.oldImg) {
                                console.log('i: ', i)
                                let a = JSON.parse(JSON.stringify(item.paramValue))
                                a.splice(i, 1, ...this.imgArr)
                                item.paramValue = a
                            }
                        })
                    }
                }
            })
            console.log('contractFieldsList', contractFieldsList)
            await saveContent({
                'contractId': this.$route.query.id,
                // 合同审批角色 1：分财 2：风控 3：法务
                'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                'type': 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                'fieldName': this.currentKey.paramKey, // 编辑字段
                'fieldOriginalContent': fieldOriginalContent, // 编辑前内容
                // 'fieldContent': temp[0].fileUrl, // 编辑内容
                'fieldContent': JSON.stringify(this.imgArr), // 编辑内容
                'contractContent': this.contractDocument.innerHTML, // 拿input版的合同去提交。法务审核的时候需要用到。
                'createBy': this.userInfo.employeeName,
                'contractFieldsList': JSON.stringify(contractFieldsList) // 合同字段键值对
            })
            this.init(() => {
                this.domBindMethods()
            })
            this.editorDrawer = false
        },

        // 保存 operatorType=3 更新条款
        onSaveContent (operatorType = '') {
            if (operatorType) {
                let curHTML = this.contractDocument.innerHTML
                if (this.contractAfterApi == curHTML.replace(/\ufeff/g, '') || this.editorDrawer) {
                    // 条款没有变化
                    return
                }
                console.log('更新条款')
            }
            if (this.currentKey.inputStyle == 9 && operatorType == '') {
                // 修改图片，图片必填
                this.setImg()
                return
            }
            // 1.span里包img2.非必填可上传多图
            if (operatorType == '') {
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        this.dealSaveContent(operatorType)
                    }
                })
            } else {
                // 保存条款的时候也要遍历键值对去找dom，应该后台需要拿最新的键值对来判断是否有没有被删除的字段
                this.dealSaveContent(operatorType)
            }
        },
        async dealSaveContent (operatorType) {
            let { paramKey, paramValue } = this.currentKey
            let tempObj = {}
            let tempArr = []
            // 键值对给后台，用于判断是否删除。
            let flag = true
            this.contractFieldsList.map(item => {
                if (item.inputStyle == 9 && !item.required) {
                    let DomList = this.contractDocument.getElementsByClassName(item.paramKey)
                    console.log('有图片', item.paramValue)
                    if (DomList.length == 0) {
                        console.log('字段标记位都删了 ')
                        item.paramValue = ''
                        this.$message({
                            message: `合同${item.paramName}字段不可删除`,
                            type: 'error'
                        })
                        this.init(() => {
                            this.domBindMethods()
                        })
                        flag = false
                    } else {
                        let temp = []
                        Array.from(DomList).map(dom => {
                            let img = dom.getElementsByTagName('img')
                            console.log('img: ', img)
                            if (img.length == 0) {
                                item.paramValue = ''
                            } else {
                                console.log('有图片xxxxx', item.paramValue)
                                Array.from(img).map(d => {
                                    console.log('d: ', d)
                                    let dData = item.paramValue.filter(pv => {
                                        if (pv && pv.fileUrl === d.src) {
                                            return true
                                        }
                                    })
                                    console.log('dData: ', dData)
                                    if (dData && dData.length > 0) {
                                        temp.push(dData[0])
                                    }
                                })
                                item.paramValue = temp
                            }
                        })
                    }
                }
                let DomList = this.contractDocument.getElementsByClassName(item.paramKey)
                // 筛选出页面上的键值对，可能会被删除
                if (DomList && DomList.length > 0) {
                    // 页面合同上的所有键值对、签署字段不存在className
                    if (!(item.paramKey in tempObj) && item.paramKey !== '') {
                        tempObj[item.paramKey] = JSON.parse(this.detailRes.contractFieldsList).filter(ktem => ktem.paramKey === item.paramKey)
                    }
                }
            })
            if (!flag) return
            console.log('this.contractFieldsList', this.contractFieldsList)

            for (const key in tempObj) {
                tempArr.push(tempObj[key][0])
            }
            console.log('tempArr: ', tempArr)
            tempArr.map(item => {
                // 修改对应的键值对里的值
                if (item.paramKey === paramKey && item.inputStyle != 9) {
                    item.paramValue = paramValue
                }
            })
            // 法务修改字段触发,`条款已被编辑，请先保存条款`

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
            // 非必填处理
            if (this.currentKey.paramname && !this.currentKey.paramValue && this.currentKey.inputStyle != 9) {
                console.log('非必填处理')
                let canEmptyDom = this.contractDocument.getElementsByClassName(this.currentKey.paramKey)
                Array.from(canEmptyDom).map(jtem => {
                    jtem.innerHTML = this.currentKey.paramname
                })
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
            // return
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
                this.editorDrawer = false
            } catch (error) {
                this.init(() => {
                    this.domBindMethods()
                })
            }
        },
        editorOnInit () {
            console.log('编辑器初始化完成domBindMethods')
            this.domBindMethods()
        },
        onKeyUp () {
            // keyCode 91
            if (event.keyCode == 91 || event.keyCode == 90) {
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
                    // let ifram = document.getElementsByClassName('tox-edit-area')[0].getElementsByClassName('tox-edit-area__iframe')[0]
                    // this.contractDocument = ifram.contentWindow.document.getElementById('tinymce')
                    this.contractDocument = document.getElementsByClassName('mce-content-body')[0]
                } else {
                    this.contractDocument = document.getElementsByClassName('approvalcontract-content')[0]
                }
                //
                this.contractFieldsList.map(item => {
                    if (item.inputStyle && item.inputStyle == 9) {
                        // 图片但非必填的展示<span...>{#比如采购明细表(采购单)#}</span>，添加点击事件
                        if (!item.required && !item.paramValue) {
                            let DomList = this.contractDocument.getElementsByClassName(item.paramKey)
                            Array.from(DomList).map((jtem, index) => {
                                // 有数据span会变成img标签
                                if (jtem.tagName == 'SPAN') {
                                    let fields = this.originalContentFieldsList.filter(ktem => ktem.paramKey === jtem.className)[0]
                                    // 遍历dom添加点击事件
                                    jtem.onclick = (event) => {
                                        this.currentKey = {
                                            ...fields,
                                            event,
                                            paramname: jtem.dataset.paramname || '',
                                            tagName: 'SPAN',
                                            multiple: true
                                        }
                                        console.log('this.currentKeyxxx: ', this.currentKey)
                                        this.editorDrawer = true
                                        this.$nextTick(() => {
                                            this.$refs['ruleForm'].resetFields()
                                        })
                                    }
                                }
                            })
                            return
                        }
                        // crm图片存在多图上传字段名后会加上序号不能用paramKey查dom
                        let imgDom = this.contractDocument.getElementsByTagName('img')
                        imgDom && imgDom.length > 0 && Array.from(imgDom).map(item => {
                            // 查找图片上传字段
                            if (item.className != 'platform_sign' && item.dataset.key) {
                                item.onclick = (event) => {
                                    console.log(event)
                                    this.currentKey = {
                                        required: this.originalContentFieldsList.filter(ktem => ktem.paramKey === item.dataset.key)[0].required,
                                        inputStyle: 9,
                                        paramKey: event.target.dataset.key,
                                        paramValue: event.target.currentSrc,
                                        paramName: event.target.dataset.name,
                                        imgIndex: event.target.dataset.index,
                                        tagName: 'IMG',
                                        multiple: !this.originalContentFieldsList.filter(ktem => ktem.paramKey === item.dataset.key)[0].required
                                    }
                                    console.log('imgclick this.currentKey', this.currentKey)
                                    this.oldImg = event.target.currentSrc
                                    this.editorDrawer = true
                                    this.$nextTick(() => {
                                        this.$refs['ruleForm'].resetFields()
                                    })
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
                                    this.currentKey = {
                                        ...fields,
                                        event,
                                        paramname: jtem.dataset.paramname || '',
                                        paramValue: fields.paramValue || ''
                                    }
                                    console.log('this.currentKeyxxxooo: ', this.currentKey)
                                    this.editorDrawer = true
                                    this.$nextTick(() => {
                                        this.$refs['ruleForm'].resetFields()
                                    })
                                }
                            })
                        } else {
                            console.log('没找到的：', item.paramName)
                        }
                    }
                })
                // 动态设置高度
                if (this.detailRes.contractStatus == 6 && flag == '') {
                    // let hVal = document.getElementsByClassName('approvalcontract-content-layout') && document.getElementsByClassName('approvalcontract-content-layout')[0].offsetHeight - 30
                    // document.getElementsByClassName('approvalcontract-content-legal-affairs')[0].getElementsByClassName('mce-content-body')[0].style.height = `${hVal}px`
                    // console.log('动态设置高度', hVal)
                    this.showLoading = false
                    this.contractAfterApi = this.contractDocument.innerHTML.replace(/\ufeff/g, '')
                    this.keyValIncontract = []
                    let spanList = this.contractDocument.getElementsByTagName('span')
                    Array.from(spanList).map(item => {
                        if (item.dataset && item.dataset.inputstyle) {
                            this.keyValIncontract.push(item.className)
                        }
                    })
                }
            })
        },
        async init (cb) {
            console.log('this.$route.query.id', this.$route.query.id)
            if (!this.$route.query.id) {
                return
            }
            console.log('getContractsContent')
            const res = await getContractsContent({ contractId: this.$route.query.id })
            this.detailRes = res.data
            this.contractContentDiv = res.data.contractContent // Div版的合同
            this.originalContentFieldsList = JSON.parse(res.data.contractFieldsList) // 保存最初的键值对
            this.contractFieldsList = JSON.parse(JSON.stringify(this.originalContentFieldsList)) // 可修改的键值对
            if (this.detailRes.contractStatus == 6) {
                const response = await getPurchaseOrderList({
                    contractId: this.$route.query.id
                })
                this.contentvsData = response.data
            }
            if (!this.flag) this.flag = true
            cb && cb()
            if (this.detailRes.contractStatus != 6) {
                this.domBindMethods()
            }
            this.imgArr = []
            console.log('init____this.contractFieldsList', this.contractFieldsList)
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
.approvalRemark{
    font-size: 14px;
    color: #f00;
}
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
            width: 100%;
            // float: right;
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
    .contentvs {
        font-style: normal;
        font-size: 16px;
        margin-left: 15px;
        font-weight: normal;
        color: #ff7a45;
        cursor: pointer;
    }
}
/deep/.contentvsbox .contentvsData-item {
    color: #ff7a45;
    cursor: pointer;
    margin-bottom: 5px;
    display: flex;
    align-items: flex-start;
    em {
        font-style: normal;
    }
    img {
        width: 18px;
        margin-right: 6px;
    }
}
/deep/.contentvsbox .el-dialog__body {
    max-height: 400px;
    overflow: scroll;
}
/deep/.contentvsbox ::-webkit-scrollbar-thumb {
    background-color: #d6d1d1 !important;
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

@keyframes scale {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
        position: absolute;
        top: 50%;
        left: 50%;
    }
}
@keyframes scaleClose {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
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
.upload-editor {
    /deep/.elupload {
        width: 100%;
    }
}
.editordrawerbox {
    /deep/ .el-drawer__header {
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
        font-size: 18px;
        // color: #000;
        // font-weight: bold;
        // margin-bottom:10px
    }
}
.vsList{
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
    height: calc(100vh - 150px);
    p{
       color: #ff7a45;
       display: flex;
       margin-bottom: 10px;
       cursor: pointer;
       img{
           width: 20px;
           height: 20px;
           margin-right: 5px;

       }
    }
}
.vsdrawercss{
    /deep/.history-bttom-css {
        border-top: 1px solid #eee;
        padding-top: 10px;
        text-align: right;
        padding-right: 20px;
        box-sizing: border-box;
    }
    /deep/ .el-drawer__header {
        border-bottom: 1px solid #eee;
        padding-bottom: 12px;
        margin-bottom: 10px;
        font-size: 18px;
    }
}
.approvalcontract-layout {
    // height: calc(100vh - 230px);
    // position: relative;
    // overflow: hidden;
    &-left {
        width: 530px;
        margin: 0 auto;
        overflow: hidden;
        h1 {
            font-size: 20px;
        }
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
                padding: 12px 12px 23px !important;
                .el-icon-upload {
                    margin: 5px 0 5px;
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
}
</style>