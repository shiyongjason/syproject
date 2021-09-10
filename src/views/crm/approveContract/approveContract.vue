<template>
    <div class="page-body B2b">
        <el-image fit="contain" :z-index='999999' ref="zoomImage" v-if='imgArr.length>1' style="width: 0px; height:0px;position: absolute;" :src="this.currentKey.paramValue||emptyImg" :preview-src-list="getImgList(imgArr)">
        </el-image>
        <el-image fit="contain" :z-index='999999' ref="zoomImage" v-if='currentKey.inputStyle==9&&isRenderUpload&&imgArr.length==0' style="width: 0px; height:0px;position: absolute;" :src="this.currentKey.paramValue||emptyImg"
            :preview-src-list="this.currentKey.paramValue?[this.currentKey.paramValue]:[emptyImg]">
        </el-image>
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
                            <editor ref="editor" apiKey="v30p89tdwvdwt7x2fcngnrvnv2syzsvs7q9hps4gakdtt4ak" v-model="contractContentDiv" :init="editorInit" @onBlur='onBlur' @onInit="editorOnInit" @onKeyUp="onKeyUp" v-if="flag"></editor>
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
        <el-drawer class="contentdrawerbox" size="600px" :visible.sync="drawerVisible" :with-header="false" :wrapperClosable='false'>
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
                            <div v-if="item.approvalRemark" style="color: #ff7a45;">备注：{{item.approvalRemark}}</div>
                            <template v-if="item.attachDocs&&item.attachDocs.length>0">
                                <div v-for="(obj,oindex) in item.attachDocs" :key="oindex" style="margin-top:6px;margin-left:10px">
                                    <a style="color:#1068bf;" :href="obj.fileUrl" target='_blank'>{{obj.fileName}}</a>
                                </div>
                            </template>
                        </div>
                        <div class="history-css-right">{{item.operationTime | formatDate('YYYY年MM月DD日 HH时mm分ss秒')}}</div>
                    </div>
                    <!-- <div class="approvalRemark" v-if="item.approvalRemark" :key="index+'approvalRemark'">
                        {{item.operatorType==1&&(item.operationName=='审核通过了'||item.operationName=='审核拒绝了')?'审批备注':'备注'}}：{{item.approvalRemark}}
                    </div> -->
                </template>
            </div>
            <div class="history-bttom">
                <h-button type="primary" @click="drawerVisible=false">好的</h-button>
            </div>
        </el-drawer>
        <diffDialog ref="diffDialog" v-if="currentContent&&lastContent" :currentContent=currentContent :lastContent=lastContent></diffDialog>
        <el-drawer class="editordrawerbox" title="编辑字段" :visible.sync="editorDrawer" :size='editordrawerboxSize' :before-close='editorDrawerClose' :modal-append-to-body="false" :wrapperClosable='false'>
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
                    <div style="display: flex;justify-content: space-between;align-items: center;">
                        <el-form :rules="rules" :model="currentKey" ref="ruleForm" label-width="100px" class="demo-ruleForm" :style="currentKey.inputStyle==9&&isRenderUpload?'':'width:100%'" @submit.native.prevent>
                            <el-form-item prop="formValidator" v-for="(value,key,index) in currentKeyToComponent()" :key="index">
                                <component :is="key" v-bind="value.bind||{}" v-on="value.on||{}">
                                    <template v-if="value.slot" :slot="value.slot">{{value.innerHtml||''}}</template>
                                    <!--  -->
                                    <template v-if="value.slotRender" slot-scope="scope">
                                        <comRender :scope="scope" :render="value.slotRender"></comRender>
                                    </template>
                                </component>
                            </el-form-item>
                        </el-form>

                        <hosjoyUpload v-model="imgArr" :showPreView='false' v-if="isRenderUpload&&currentKey.inputStyle==9" class="upload-editor" drag :action="action" :multiple='!!currentKey.multiple' :fileSize='20' :fileNum='imgArr.length+1' style="width:340px;margin-right:20px;margin-top: -24px;"
                            accept='.jpeg,.jpg,.png' :uploadParameters='uploadParameters' @successArg='successArg'>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>后点击<em>保存</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpeg/jpg/png文件，且不超过20M</div>
                        </hosjoyUpload>
                    </div>
                    <div style="margin-bottom:10px;margin-top:-30px;text-indent: 3px;" v-if='imgArr.length > 1'>{{`+${imgArr.length-1} 张图 (多图)`}}</div>
                    <div v-if="serviceFee" v-show='showServiceFee' v-html="serviceFee" style="margin-bottom:20px;margin-top:-10px;overflow-x: scroll;"></div>
                    <!-- <h-button v-if="imgArr.length == 0 && isRenderUpload&&currentKey.inputStyle==9&&!currentKey.required&&currentKey.paramValue" style="margin-top:10px" @click="emptyTheImg" type="editor">清空该图片</h-button> -->
                    <h-button v-if="imgArr.length == 0 && isRenderUpload && currentKey.inputStyle == 9 && currentKey.paramValue" style="margin-top:10px" @click="emptyTheImg" type="editor">清空该图片</h-button>
                    <h-button @click="onSaveContent('')" type="primary">保存</h-button>
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
        <el-drawer class="vsdrawercss" title="合同对比" :visible.sync="contentvsDataVisible" size='580px' :before-close='vsdrawerClose' :modal-append-to-body="false" :wrapperClosable='false'>
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
import serviceFeeToTable from './components/serviceFeeToTable'
import inputAutocomplete from './components/inputAutocomplete'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { mapState, mapActions } from 'vuex'
import { contractKeyValue, getContractsContent, saveContent, approvalContent, getCheckHistory, getDiffApi, getPurchaseOrderList, getTYCList, getCaList } from './api/index'
import { ccpBaseUrl } from '@/api/config'
import Editor from '@tinymce/tinymce-vue'
import comRender from './comRender'
import { contractSigningList } from '../contractSigningManagement/api'
// api:https://www.tiny.cloud/docs/integrations/vue/
// http://tinymce.ax-z.cn/general/basic-setup.php
export default {
    name: 'approveContract',
    components: { diffDialog, selectCom, isNum, inputAutocomplete, hosjoyUpload, isAllNum, isPositiveInt, 'editor': Editor, comRender, serviceFeeToTable },
    data () {
        return {
            scrollTop: 0,
            showServiceFee: false,
            editordrawerboxSize: '580px',
            serviceFee: '',
            TYCList: [], // 天眼查数据
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
                object_resizing: false, // 开关图片、表格、媒体对象在编辑区内的调整大小工具。拖拽工具可调整对象大小。
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
            },
            /** 此占位符用于修复点击暂不审核和失焦失焦触发重复 */
            isDealBack: false,
            hosjoyCaList: []
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
            // 服务费预计
            if (this.detailRes.contractTypeId == 10003 && this.currentKey.paramKey === 'service_fee_estimate') {
                let temp = this.contractFieldsList.filter(item => item.paramKey === 'purch_order_purch_batch')[0]
                //  1:一次性采购 2：分批采购
                if (temp && (temp.paramValue == 1 || temp.paramValue == '一次性采购')) {
                    return 'serviceFeeToTable'
                }
            }
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
        },
        isRenderUpload () {
            console.log('isRenderUpload', this.currentKey.paramKey)
            // 销售合同  的服务费分期表格
            if (this.detailRes.contractTypeId == 10003 && this.currentKey.paramKey === 'purch_service_fee_form') {
                let temp = this.contractFieldsList.filter(item => item.paramKey === 'purch_order_purch_batch')[0]
                //  1:一次性采购 2：分批采购
                if (temp && (temp.paramValue == 1 || temp.paramValue == '一次性采购')) {
                    return false
                } else {
                    return true
                }
            }
            return this.currentKey.inputStyle == 9
        },
        computedServiceFee: {
            get () {
                console.log('get computedServiceFee')
                if (this.contractFieldsList) {
                    let temp = this.contractFieldsList.filter(item => item.paramKey === 'service_fee_estimate')[0]
                    console.log('temp: ', temp)
                    if (temp) {
                        return temp.paramValue
                    }
                    return ''
                }
                return ''
            },
            set (val) {
                let temp = this.contractFieldsList.filter(item => item.paramKey === 'service_fee_estimate')[0]
                temp.paramValue = val
            }
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        getImgList (imgArr) {
            let list = []
            imgArr.map(item => list.push(item.fileUrl))
            return list
        },
        async  onGetCaList () {
            const { data } = await getCaList({ orgType: 1 })
            data && data.map(val => {
                val.label = val.companyName
                val.value = val.companyName
                return val
            })
            this.hosjoyCaList = data
        },
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
            console.log('editorDrawerClose')
            if (this.imgArr && this.imgArr.length > 0) {
                this.imgArr = []
            }
            if (this.TYCList.length > 0) {
                this.TYCList = []
            }
            this.serviceFee = ''
            this.showServiceFee = false
            let temp = this.contractFieldsList.filter(item => item.paramKey === 'service_fee_estimate')[0]
            if (temp) {
                temp.paramValue = this.originalContentFieldsList.filter(item => item.paramKey === 'service_fee_estimate')[0].paramValue
            }
            this.editordrawerboxSize = '580px'
            // this.domBindMethods()
            done()
        },
        onBlur () {
            console.log('onBlur', this.isDealBack)
            !this.isDealBack && this.onSaveContent(3)
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
                    [this.inputStyleDom]:
                        this.inputStyleDom == 'serviceFeeToTable'
                            ? {
                                bind: {
                                    value: this.currentKey.paramValue,
                                    placeholder: '请输入内容',
                                    className: this.currentKey.paramKey,
                                    style: { width: '400px' },
                                    calculationRules: this.currentKey.calculationRules || '', // 最大值
                                    decimal: this.currentKey.decimal || 2
                                    // disabled: !this.currentKey.modify
                                },
                                on: {
                                    inputService: async (val) => {
                                        this.currentKey.paramValue = val
                                    },
                                    // 点击生成表格
                                    onServiceFee: async () => {
                                        let serviceFeeEstimate = this.contractFieldsList.filter(item => item.paramKey === 'service_fee_estimate')[0]
                                        let loanMonth = this.contractFieldsList.filter(item => item.paramKey === 'loan_month')[0]
                                        serviceFeeEstimate.paramValue = this.currentKey.paramValue
                                        await this.onServiceFee(false, serviceFeeEstimate, loanMonth)
                                        if (loanMonth.paramValue > 3) {
                                            this.editordrawerboxSize = `${loanMonth.paramValue * 165 > 915 ? 915 : loanMonth.paramValue * 165}px`
                                            console.log('this.editordrawerboxSize: ', this.editordrawerboxSize)
                                        } else {
                                            this.editordrawerboxSize = '580px'
                                        }
                                        this.showServiceFee = true
                                    }
                                }
                            }
                            : this.inputStyleDom !== 'elInput'
                                ? {
                                    bind: {
                                        paramKey: this.currentKey.paramKey,
                                        value: this.currentKey.paramValue,
                                        placeholder: '请输入内容',
                                        disabled: !this.currentKey.modify,
                                        style: this.currentKey.unit ? { width: '250px' } : '',
                                        innerHtml: this.currentKey.unit || '',
                                        maxlength: this.currentKey.maxLength || '',
                                        decimal: this.currentKey.decimal || 2,
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
                            style: { width: '300px' },
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
                                // 新的合同企业字段
                                if (_this.currentKey.paramKey == 'hosjoy_company_name') {
                                    return _this.hosjoyCaList
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
                            max: this.currentKey.paramKey == 'loan_month' ? 12 : 6,
                            min: 3,
                            marks: { 3: '3个月', 4: '4个月', 5: '5个月', 6: '6个月', 7: '7个月', 8: '8个月', 9: '9个月', 10: '10个月', 11: '11个月', 12: '12个月' },
                            style: { marginBottom: '30px' },
                            showTooltip: false
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
                    [this.isRenderUpload ? 'elImage' : 'serviceFeeToTable']:
                        this.isRenderUpload
                            // render elImage
                            ? {
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
                            // render elInput
                            : {
                                bind: {
                                    value: this.computedServiceFee,
                                    placeholder: '请输入内容',
                                    className: this.currentKey.paramKey,
                                    style: { width: '600px' },
                                    calculationRules: this.currentKey.calculationRules || '', // 最大值
                                    decimal: this.currentKey.decimal || 2
                                    // disabled: !this.currentKey.modify
                                },
                                on: {
                                    inputService: async (val) => {
                                        this.computedServiceFee = val
                                    },
                                    // 生成表格
                                    onServiceFee: async () => {
                                        await this.onServiceFee()
                                        let loanMonth = this.contractFieldsList.filter(item => item.paramKey === 'loan_month')[0]
                                        if (loanMonth.paramValue > 3) {
                                            this.editordrawerboxSize = `${loanMonth.paramValue * 165 > 915 ? 915 : loanMonth.paramValue * 165}px`
                                            console.log('this.editordrawerboxSize: ', this.editordrawerboxSize)
                                        } else {
                                            this.editordrawerboxSize = '580px'
                                        }
                                        this.showServiceFee = true
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
                },
                // 天眼查搜索
                11: {
                    elSelect: {
                        bind: {
                            value: this.currentKey.paramValue,
                            filterable: true,
                            remote: true,
                            placeholder: '请输入搜索关键词',
                            // allowCreate: true,//是否允许用户创建新条目
                            // loading: false
                            remoteMethod: this.remoteMethod, // 远程搜索方法
                            defaultFirstOption: true, // 在输入框按下回车，选择第一个匹配项
                            style: { width: '450px' }
                        },
                        slotRender: (scope) => {
                            console.log('scope: ', scope)
                            return (this.TYCList.map((item, index) => {
                                return (
                                    <el-option key={item.id} value={item.name} label={item.name}>
                                        {item.name}
                                    </el-option>
                                )
                            })
                            )
                        },
                        on: {
                            input: (val) => {
                                this.currentKey.paramValue = val
                            }
                        }
                    }
                }

            }
            console.log(comObj)
            return comObj[this.currentKey.inputStyle]
        },
        getTableHtml (array = []) {

        },
        /**
         * 生成表格html
         */
        onServiceFee (flage = false, _serviceFeeEstimate = '', _loanMonth = '') {
            return new Promise((resolve, reject) => {
                // 务费分期表格 purch_service_fee_form  // 采购批次：purch_order_purch_batch
                // service_fee_estimate 服务费预计 / loan_month 剩余货款支付周期
                let serviceFeeEstimate = _serviceFeeEstimate || this.contractFieldsList.filter(item => item.paramKey === 'service_fee_estimate')[0]
                let loanMonth = _loanMonth || this.contractFieldsList.filter(item => item.paramKey === 'loan_month')[0]
                if (!serviceFeeEstimate.paramValue) {
                    this.$message({
                        message: `服务费预计不能为空！`,
                        type: 'error'
                    })
                    return
                }
                let tableItem = this.$dividedBy(serviceFeeEstimate.paramValue, loanMonth.paramValue).toFixed(2)
                const dayObj = { 0: '第一期', 1: '第二期', 2: '第三期', 3: '第四期', 4: '第五期', 5: '第六期', 6: '第七期', 7: '第八期', 8: '第九期', 9: '第十期', 10: '第十一期', 11: '第十二期' }
                // 表格数据渲染成服务费表格div
                let tableHead = [`<span style="background: #f7f7f7; border-top: 1px solid #3a3a3a; float: left; height: 80px; border-right: 1px solid #3a3a3a; border-bottom: 1px solid #3a3a3a; width: 110px; word-break: break-all; padding: 0 3px; font-size: 13px; line-height: 80px; text-align: center;">支付日期</span>`]
                let tableBody = [`<span style="float: left; height: 80px; border-right: 1px solid #3a3a3a; border-bottom: 1px solid #3a3a3a; width: 110px; word-break: break-all; padding: 0 3px; font-size: 13px; line-height: 80px; text-align: center;">支付金额</span>`]
                let preTotal = this.$multipliedBy(loanMonth.paramValue - 1, tableItem) // 精确乘法
                let rest = this.$minus(serviceFeeEstimate.paramValue, preTotal) // 精确减法
                for (let i = 0; i < loanMonth.paramValue * 1; i++) {
                    let head = `<span style="background: #f7f7f7; border-top: 1px solid #3a3a3a; float: left; height: 80px; border-right: 1px solid #3a3a3a; border-bottom: 1px solid #3a3a3a; width: 110px; word-break: break-all; padding: 0 3px; font-size: 13px; line-height: 80px; text-align: center;">${dayObj[i]}</span>`
                    let body = `<span style="float: left; height: 80px; border-right: 1px solid #3a3a3a; border-bottom: 1px solid #3a3a3a; width: 110px; word-break: break-all; padding: 0 3px; font-size: 13px; line-height: 80px; text-align: center;">${i == loanMonth.paramValue - 1 ? rest.toFixed(2) : tableItem}元</span>`
                    tableHead.push(head)
                    tableBody.push(body)
                }
                let tableHead2 = []
                let tableBody2 = []
                if (loanMonth.paramValue * 1 > 6) {
                    tableHead2 = tableHead.splice(7)
                    tableBody2 = tableBody.splice(7)
                    tableHead2.unshift(tableHead[0])
                    tableBody2.unshift(tableBody[0])
                }
                let width = Number(loanMonth.paramValue) > 6 ? 7 * 120 : (Number(loanMonth.paramValue) + 1) * 120
                let str = `
                            <div contenteditable="false" class="purch_service_fee_form" style='border-left: 1px solid #3a3a3a; width: ${width}px;'>
                                <div style='display: flex; margin-top: 10px; overflow: hidden;'>${tableHead.join('')}</div>
                                <div style='overflow: hidden; display: flex;'>${tableBody.join('')}</div>
                                ${tableHead2.length > 0 ? `<div style='display: flex; margin-top: -1px; overflow: hidden;'>${tableHead2.join('')}</div>` : ''}
                                ${tableBody2.length > 0 ? `<div style='overflow: hidden; display: flex;'>${tableBody2.join('')}</div>` : ''}
                            </div>
                        `
                this.serviceFee = str
                // 是否生成的表格修改到合同上
                if (flage) {
                    this.$nextTick(async () => {
                        let tableDoms = this.contractDocument.getElementsByClassName('purch_service_fee_form')
                        // 修改页面上的表格
                        console.log('修改页面上的表格')
                        Array.from(tableDoms).map(item => {
                            item.outerHTML = this.serviceFee
                        })
                    })
                }

                resolve()
            })
        },
        async remoteMethod (val) {
            // 天眼查查询
            const { data } = await getTYCList({ word: val })
            if (data) {
                this.TYCList = data.items
            }
            this.currentKey.paramValue = val
        },
        handleCommand (command) {
            this.currentKey = command
        },
        async getDiff (item) {
            const { lastContentId, currentContentId } = JSON.parse(item)
            const { data } = await getDiffApi({
                currentId: currentContentId,
                lastId: lastContentId
            })
            let reg = /\sdata-mce-style=".*?"/g
            this.currentContent = data.contractContent.replace(reg, '')
            this.lastContent = data.lastContractContent.replace(reg, '')
            this.currentContent = this.currentContent.replace(/\sdata-mce-src=".*?"/g, '')
            this.lastContent = this.lastContent.replace(/\sdata-mce-src=".*?"/g, '')
            this.currentContent = this.currentContent.replace(/<table(.*?)style="[\s\S]*?"/gi, '<table$1style="border-collapse: collapse"')
            this.lastContent = this.lastContent.replace(/<table(.*?)style="[\s\S]*?"/gi, '<table$1style="border-collapse: collapse"')
            this.currentContent = this.currentContent.replace(/<tr(.*?)style=".*?"/g, '<tr$1style="border: 1px solid #666"')
            this.lastContent = this.lastContent.replace(/<tr(.*?)style=".*?"/g, '<tr$1style="border: 1px solid #666"')
            this.currentContent = this.currentContent.replace(/<td(.*?)style=".*?"/g, '<td$1style="border: 1px solid #666"')
            this.lastContent = this.lastContent.replace(/<td(.*?)style=".*?"/g, '<td$1style="border: 1px solid #666"')
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
                // 处理下合同企业字段
                const caOrgName = contractFieldsListBeforeTransfer && contractFieldsListBeforeTransfer.filter(val => val.paramKey == 'hosjoy_company_name')

                const query = {
                    contractId: this.$route.query.id,
                    approver: this.userInfo.employeeName,
                    // 合同审批角色 1：分财 2：风控 3：法务
                    approverRole: this.$route.query.role,
                    approvalStatus: this.dialog.status,
                    approvalRemark: this.dialog.remark,
                    contractContent: this.detailRes.contractStatus == 6 ? this.contractDocument.innerHTML : '',
                    contractContentBeforeTransfer, // 备份
                    contractFieldsListBeforeTransfer: JSON.stringify(contractFieldsListBeforeTransfer), // 备份
                    caOrgName: caOrgName.length > 0 ? caOrgName[0].paramValue : ''
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
                    let s = document.getElementsByClassName('approvalcontract-content-layout')
                    this.scrollTop = s[0].scrollTop
                    await this.init(() => {
                        this.domBindMethods()
                    })
                    this.handleClose()
                }
            })
        },
        async goBack () {
            console.log('goBack')
            this.isDealBack = true
            let curHTML = this.contractDocument.innerHTML
            if (this.contractAfterApi == curHTML.replace(/\ufeff/g, '')) {
                console.log('条款没有变化!直接返回。')
                this.setNewTags((this.$route.fullPath).split('?')[0])
                this.$router.push('/goodwork/contractSigningManagement')
                return
            } else {
                this.dealSaveContent(3, () => {
                    // Fix 报错不给跳列表页
                    this.setNewTags((this.$route.fullPath).split('?')[0])
                    this.$router.push('/goodwork/contractSigningManagement')
                })
            }
            console.log('更新了条款!，但是失去焦点也会做一层保存。')
            // this.setNewTags((this.$route.fullPath).split('?')[0])
            // this.$router.push('/goodwork/contractSigningManagement')
            /* this.dealSaveContent(3, () => {
                // Fix 报错不给跳列表页
                this.setNewTags((this.$route.fullPath).split('?')[0])
                this.$router.push('/goodwork/contractSigningManagement')
            }) */
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
            let canSaveContent = true
            Array.from(domList).map(jtem => {
                let img = jtem.getElementsByTagName('img')
                //
                this.contractFieldsList.map((d, i) => {
                    if (d.paramKey === this.currentKey.paramKey) {
                        // 筛选出不是选中的图片
                        let dData = d.paramValue.filter(pv => {
                            let currentKeyParamValue = this.currentKey.paramValue
                            if (this.currentKey.paramValue.indexOf('?x-oss-process=image/auto-orient,1') != -1) {
                                currentKeyParamValue = currentKeyParamValue.split('?x-oss-process=image/auto-orient,1')[0]
                            }
                            if (pv && pv.fileUrl !== currentKeyParamValue) {
                                return true
                            }
                        })
                        console.log('dData-emptyTheImg: ', dData)
                        d.paramValue = dData
                    }
                })
                // 只剩最后一张图片
                if (img.length == 1) {
                    console.log('🚀 --- Array.from --- img.length == 1', img.length == 1)
                    // 如果是必填字段保留最后一张图。
                    if (this.currentKey.required) {
                        this.$message({
                            message: `必填字段不能为空，您可以替换该图片`,
                            type: 'error'
                        })
                        canSaveContent = false
                        return
                    }
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
            if (!canSaveContent) {
                return
            }
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
                'contractFieldsList': JSON.stringify(this.contractFieldsList) // 合同字段键值对
            })
            let s = document.getElementsByClassName('approvalcontract-content-layout')
            this.scrollTop = s[0].scrollTop
            this.init(() => {
                this.domBindMethods()
            })
            this.editorDrawer = false
        },
        async setImg () {
            console.log('setImg')
            // 判断保存图片是否没上传图就点了保存。
            if (this.imgArr.length == 0) {
                this.$message({
                    message: `图片不能为空`,
                    type: 'error'
                })
                return
            }
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
            console.log('in')
            contractFieldsList.map(item => {
                if (item.paramKey === this.currentKey.paramKey) {
                    // 图片非必填首次执行,可多图
                    console.log('图片非必填首次执行,可多图')
                    if (!this.currentKey.imgIndex) {
                        console.log('!this.currentKey.imgIndex', this.currentKey.imgIndex)
                        item.paramValue = this.imgArr
                    } else {
                        console.log('旧图', this.oldImg)
                        fieldOriginalContent = this.oldImg
                        if (!Array.isArray(item.paramValue)) {
                            return
                        }
                        item.paramValue.map((img, i) => {
                            // ?x-oss-process=image/auto-orient,1  页面上的图片有些在crm加了这个属性，而服务器的没有，导致了用===查找不到
                            if (img.fileUrl === this.oldImg || this.oldImg.indexOf(img.fileUrl) != -1) {
                                let a = JSON.parse(JSON.stringify(item.paramValue))
                                a.splice(i, 1, ...this.imgArr)
                                item.paramValue = a
                            }
                        })
                    }
                }
            })
            console.log({
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
            let s = document.getElementsByClassName('approvalcontract-content-layout')
            this.scrollTop = s[0].scrollTop
            this.init(() => {
                this.domBindMethods()
            })
            this.editorDrawer = false
        },
        // 由于以前的逻辑不太记得了，也避免出错，重写一个保存表格方法
        async onHandleSave (propName = '') {
            console.log('onHandleSave')
            try {
                /** 获取页面最新合同字段键值对 start */
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
                if (propName) {
                    tempObj[propName] = this.contractFieldsList.filter(ktem => ktem.paramKey === propName)
                }
                for (const key in tempObj) {
                    tempArr.push(tempObj[key][0])
                }
                /** 获取页面最新合同字段键值对 end JSON.stringify(tempArr) */

                await this.onServiceFee(true)
                console.log('tempArr', tempArr)
                let feeFormTemp = tempArr.find(tempItem => tempItem.paramKey === 'purch_service_fee_form')
                let loanMonth = tempArr.filter(item => item.paramKey === 'loan_month')[0]
                let serviceFeeEstimate = tempArr.filter(item => item.paramKey === 'service_fee_estimate')[0]
                if (serviceFeeEstimate.paramValue === '') {
                    console.log('serviceFeeEstimate: ', serviceFeeEstimate)
                    this.$message({
                        message: `服务费预计不能为空`,
                        type: 'error'
                    })
                    return
                }
                feeFormTemp.paramValue = `${serviceFeeEstimate.paramValue}_${loanMonth.paramValue}`

                await saveContent({
                    'contractId': this.$route.query.id,
                    // 合同审批角色 1：分财 2：风控 3：法务
                    'approverRole': this.detailRes.contractStatus == 6 ? 3 : this.detailRes.contractStatus == 4 ? 2 : 1,
                    'type': 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                    'fieldName': propName, // 编辑字段
                    'fieldOriginalContent': JSON.parse(this.detailRes.contractFieldsList).filter(ktem => ktem.paramKey === propName)[0].paramValue, // 编辑前内容
                    'fieldContent': tempObj[propName][0].paramValue, // 编辑内容
                    'contractContent': this.contractDocument.innerHTML,
                    'createBy': this.userInfo.employeeName,
                    'contractFieldsList': JSON.stringify(tempArr) // 合同字段键值对
                })
                let s = document.getElementsByClassName('approvalcontract-content-layout')
                this.scrollTop = s[0].scrollTop
                this.init(() => {
                    this.domBindMethods()
                })
                this.editorDrawer = false
            } catch (error) {
                console.log('error: ', error)
                let s = document.getElementsByClassName('approvalcontract-content-layout')
                this.scrollTop = s[0].scrollTop
                this.init(() => {
                    this.domBindMethods()
                })
            }
        },
        async saveTable () {
            let serviceFeeEstimate = this.contractFieldsList.filter(item => item.paramKey === 'service_fee_estimate')[0]
            let originalServiceFeeEstimate = this.originalContentFieldsList.filter(item => item.paramKey === 'service_fee_estimate')[0]
            let loanMonth = this.contractFieldsList.filter(item => item.paramKey === 'loan_month')[0]
            let originalLoanMonth = this.originalContentFieldsList.filter(item => item.paramKey === 'loan_month')[0]
            // add 添加点击表格修改服务费填入空的校验
            if (!serviceFeeEstimate.paramValue) {
                this.$message({
                    message: `服务费预计不能为空！`,
                    type: 'error'
                })
                return
            }
            if (originalServiceFeeEstimate.paramValue != serviceFeeEstimate.paramValue || originalLoanMonth.paramValue != loanMonth.paramValue) {
                console.log('保存表格')
                if (!this.serviceFee) {
                    this.onServiceFee()
                }
                this.$nextTick(async () => {
                    let tableDoms = this.contractDocument.getElementsByClassName('purch_service_fee_form')
                    // 修改页面上的表格
                    Array.from(tableDoms).map(item => {
                        item.outerHTML = this.serviceFee
                    })
                    let serviceFeeDoms = this.contractDocument.getElementsByClassName('service_fee_estimate')
                    // 修改服务费金额
                    Array.from(serviceFeeDoms).map(item => {
                        item.innerHTML = serviceFeeEstimate.paramValue
                    })

                    this.onHandleSave('service_fee_estimate')
                })
            } else {
                if (originalServiceFeeEstimate.paramValue == serviceFeeEstimate.paramValue) {
                    this.$message({
                        message: `服务费金额没有变化无需重新生成`,
                        type: 'info'
                    })
                    return
                }
                if (originalLoanMonth.paramValue == loanMonth.paramValue) {
                    this.$message({
                        message: `剩余货款支付周期没有变化无需重新生成`,
                        type: 'info'
                    })
                }
            }
        },
        // 保存 operatorType=3 更新条款
        onSaveContent (operatorType = '') {
            console.log('保存||失焦,operatorType1150: ', operatorType)
            if (operatorType) {
                //  fix 点击图片编辑器会修改一些属性，导致this.contractAfterApi == curHTML.replace(/\ufeff/g, '') 不成立。直接保存。editorDrawer变为false关闭了弹窗
                let curHTML = this.contractDocument.innerHTML.replace(/ data-mce-selected="1"/g, '')
                if (this.contractAfterApi == curHTML.replace(/\ufeff/g, '')) {
                    // 条款没有变化
                    console.log('条款没有变化')
                    return
                }
                console.log('更新条款')
            }
            if (this.currentKey.inputStyle == 9 && operatorType == '') {
                let temp = this.contractFieldsList.filter(item => item.paramKey === 'purch_order_purch_batch')[0]
                // 一次性采购才会修改合同上的表格
                if (temp && this.currentKey.paramKey === 'purch_service_fee_form' && (temp.paramValue == 1 || temp.paramValue == '一次性采购')) {
                    this.saveTable()
                    return
                }
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
                console.log('before dealSaveContent')
                // 保存条款的时候也要遍历键值对去找dom，应该后台需要拿最新的键值对来判断是否有没有被删除的字段
                this.dealSaveContent(operatorType)
            }
        },
        async dealSaveContent (operatorType, callback) {
            console.log('methods::::::dealSaveContent:::::::')
            if (operatorType == 3) {
                // fix 处理暂不审核。点击暂不审核之前可能会删东西。
                let curHTML = this.contractDocument.innerHTML
                if (this.contractAfterApi == curHTML.replace(/\ufeff/g, '')) {
                    // 条款没有变化
                    console.log('条款没有变化')
                    return
                }
                console.log('更新了条款')
            }
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
                        let s = document.getElementsByClassName('approvalcontract-content-layout')
                        this.scrollTop = s[0].scrollTop
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
                                    if (!Array.isArray(item.paramValue)) {
                                        return
                                    }
                                    let dData = item.paramValue.filter(pv => {
                                        if (pv && (pv.fileUrl === d.src || d.src.indexOf(pv.fileUrl) != -1)) {
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

            // 修改页面上的值
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
            // "剩余货款支付周期 (个月)" || "服务费预计 (元)"
            if (this.currentKey.paramKey === 'loan_month' || this.currentKey.paramKey === 'service_fee_estimate') {
                let temp = this.contractFieldsList.filter(item => item.paramKey === 'purch_order_purch_batch')[0]
                // 一次性采购才会修改合同上的表格
                if (temp && (temp.paramValue == 1 || temp.paramValue == '一次性采购')) {
                    let loanMonth = tempArr.filter(item => item.paramKey === 'loan_month')[0]
                    let serviceFeeEstimate = tempArr.filter(item => item.paramKey === 'service_fee_estimate')[0]
                    let purchServiceFeeForm = tempArr.filter(item => item.paramKey === 'purch_service_fee_form')[0]
                    if (purchServiceFeeForm) {
                        await this.onServiceFee(true, serviceFeeEstimate, loanMonth)
                        purchServiceFeeForm.paramValue = `${serviceFeeEstimate.paramValue}_${loanMonth.paramValue}`
                    }
                }
            }

            // 采购批次(采购单)： 一次性  分批
            if (this.currentKey.paramKey === 'purch_order_purch_batch') {
                // 分批
                console.log('分批: ', this.currentKey.paramValue)
                if (this.currentKey.paramValue === '分批采购' || this.currentKey.paramValue == 2) {
                    let firstChild = this.contractDocument.getElementsByClassName('purch_service_fee_form')[0]
                    if (firstChild && firstChild.tagName === 'DIV') {
                        // 把表格修改成上传图片(图片是用div生成，图片是span包的img)
                        let feeTableDom = this.contractDocument.getElementsByClassName('purch_service_fee_form')
                        Array.from(feeTableDom).map(table => {
                            table.outerHTML = `<span style="word-break: break-all; color: #ff7a45;" class="purch_service_fee_form" contenteditable="false" data-paramname="" data-inputstyle="9">{#服务费分期表格(采购单)#}</span>`
                        })
                        //  分批,清空表
                        if (this.currentKey.paramValue) {
                            this.currentKey.paramValue = ''
                            tempArr.map(item => {
                                // 修改对应的键值对里的值
                                if (item.paramKey === 'purch_service_fee_form') {
                                    item.paramValue = ''
                                }
                            })
                        }
                    }
                    // 一次性
                } else if (this.currentKey.paramValue === '一次性采购' || this.currentKey.paramValue == 1) {
                    let loanMonth = tempArr.filter(item => item.paramKey === 'loan_month')[0]
                    let purchServiceFeeForm = tempArr.filter(item => item.paramKey === 'purch_service_fee_form')[0]
                    let serviceFeeEstimate = tempArr.filter(item => item.paramKey === 'service_fee_estimate')[0]
                    if (purchServiceFeeForm && serviceFeeEstimate && loanMonth) {
                        purchServiceFeeForm.paramValue = `${serviceFeeEstimate.paramValue}_${loanMonth.paramValue}`
                        await this.onServiceFee(true, serviceFeeEstimate, loanMonth)
                    }
                }
            }
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
                if (this.isDealBack) {
                    this.isDealBack = false
                }
                if (operatorType && operatorType == 3) {
                    this.$message({
                        message: `当前修改已保存`,
                        type: 'success'
                    })
                }
                let s = document.getElementsByClassName('approvalcontract-content-layout')
                this.scrollTop = s[0].scrollTop
                this.init(() => {
                    this.domBindMethods()
                })
                this.editorDrawer = false
                if (callback) {
                    // Fix 暂不审核编辑、删除字段报错不给跳转
                    setTimeout(() => {
                        callback()
                    }, 500)
                }
            } catch (error) {
                console.log('catch')
                if (this.isDealBack) {
                    this.isDealBack = false
                }
                let s = document.getElementsByClassName('approvalcontract-content-layout')
                this.scrollTop = s[0].scrollTop
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
                    this.contractDocument = document.getElementsByClassName('mce-content-body')[0]
                } else {
                    this.contractDocument = document.getElementsByClassName('approvalcontract-content')[0]
                }
                // 合同类型     10000：其他合同 10001：担保合同 10002：应收账款质押合同 10003：销售合同 10005：采购合同
                this.contractFieldsList.map(item => {
                    if (item.inputStyle && item.inputStyle == 9) {
                        let temp = this.contractFieldsList.filter(item => item.paramKey === 'purch_order_purch_batch')[0]
                        let purchServiceFeeForm = this.contractFieldsList.filter(i => i.paramKey === 'purch_service_fee_form')[0]
                        //  1:一次性采购 2：分批采购
                        if (temp && item.paramKey == 'purch_service_fee_form' && (temp.paramValue == '一次性采购' || temp.paramValue == 1)) {
                            let DomList = this.contractDocument.getElementsByClassName(item.paramKey)
                            let fields = this.originalContentFieldsList.filter(ktem => ktem.paramKey === 'purch_service_fee_form')[0]
                            let serviceFeeFields = this.originalContentFieldsList.filter(ktem => ktem.paramKey === 'service_fee_estimate')[0]
                            Array.from(DomList).map((jtem, index) => {
                                jtem.onclick = (event) => {
                                    this.currentKey = {
                                        ...fields,
                                        required: fields.required,
                                        // required: true,
                                        checkRule: serviceFeeFields.checkRule || '',
                                        inputStyle: 9,
                                        paramKey: fields.paramKey,
                                        paramValue: fields.paramValue,
                                        calculationRules: serviceFeeFields.calculationRules
                                    }
                                    console.log('this.currentKey-purch_service_fee_form::::', this.currentKey)
                                    this.editorDrawer = true
                                    this.$nextTick(async () => {
                                        this.$refs['ruleForm'].resetFields()
                                        //
                                        let loanMonth = this.contractFieldsList.filter(item => item.paramKey === 'loan_month')[0]
                                        if (loanMonth && fields.paramValue) {
                                            await this.onServiceFee()
                                            if (loanMonth.paramValue > 3) {
                                                this.editordrawerboxSize = `${loanMonth.paramValue * 165 > 915 ? 915 : loanMonth.paramValue * 165}px`
                                                console.log('this.editordrawerboxSize: ', this.editordrawerboxSize)
                                            } else {
                                                this.editordrawerboxSize = '580px'
                                            }
                                            this.showServiceFee = true
                                        }
                                    })
                                }
                            })
                            return
                        }
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
                                        console.log('this.currentKey-SPAN-非必填字段: ', this.currentKey)
                                        this.editorDrawer = true
                                        this.$nextTick(() => {
                                            this.$refs['ruleForm'].resetFields()
                                        })
                                    }
                                }
                            })
                        }
                        // crm图片存在多图上传字段名后会加上序号不能用paramKey查dom
                        let imgDom = this.contractDocument.getElementsByTagName('img')
                        imgDom && imgDom.length > 0 && Array.from(imgDom).map(item => {
                            //
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
                                    console.log('this.oldImg: ', this.oldImg)
                                    this.editorDrawer = true
                                    this.$nextTick(() => {
                                        this.$refs['ruleForm'].resetFields()
                                    })
                                }
                            }
                        })
                        //
                    } else {
                        // 通过键值对里的key查找对应的dom
                        let DomList = this.contractDocument.getElementsByClassName(item.paramKey)
                        if (DomList && DomList.length > 0) {
                            Array.from(DomList).map((jtem, index) => {
                                let fields = this.originalContentFieldsList.filter(ktem => ktem.paramKey === jtem.className)[0]
                                // 遍历dom添加点击事件
                                jtem.onclick = (event) => {
                                    console.log(jtem.class)
                                    this.currentKey = {
                                        ...fields,
                                        event,
                                        paramname: jtem.dataset.paramname || '',
                                        paramValue: fields.paramValue || '',
                                        inputStyle: fields.paramKey == 'hosjoy_company_name' ? '3' : fields.inputStyle
                                    }
                                    console.log('this.currentKeyxxxooo: ', this.currentKey, fields)
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
                this.serviceFee = ''
                this.editordrawerboxSize = '580px'
                this.showServiceFee = false
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
        // eDitorScrollY () {
        //     let s = document.getElementsByClassName('approvalcontract-content-layout')
        //     this.scrollTop = s[0].scrollTop
        // },

        async init (cb) {
            if (!this.$route.query.id) {
                return
            }
            const res = await getContractsContent({ contractId: this.$route.query.id })
            this.detailRes = res.data
            this.contractContentDiv = res.data.contractContent // Div版的合同
            this.originalContentFieldsList = JSON.parse(res.data.contractFieldsList) // 保存最初的键值对
            this.contractFieldsList = JSON.parse(JSON.stringify(this.originalContentFieldsList)) // 可修改的键值对
            // 这里处理下老数据 hosjoy_name_company
            this.contractFieldsList.map(item => {
                if (item.paramKey == 'hosjoy_company_name') {
                    item.inputStyle = 3
                }
                return item
            })
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
            this.$nextTick(() => {
                let s = document.getElementsByClassName('approvalcontract-content-layout')
                s[0].scrollTop = this.scrollTop
            })
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
    mounted () {
    },
    async beforeMount () {
        const { data } = await contractKeyValue(this.$route.query.contractTypeId)
        this.contractKeyValueList = data
        this.$nextTick(() => {
            this.onGetCaList()
        })
        this.init()
    }
}
</script>
<style scoped lang="scss">

.approvalRemark {
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
        /deep/.purch_service_fee_form {
            cursor: pointer;
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
        height: calc(100vh - 110px);
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
    /deep/.el-form-item {
        margin-bottom: 15px;
    }
    /deep/.el-slider__marks-text{
        font-size: 12px;
    }
    /deep/.el-slider__marks-text{
        width:40px !important
    }
}
.vsList {
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
    height: calc(100vh - 150px);
    p {
        color: #ff7a45;
        display: flex;
        margin-bottom: 10px;
        cursor: pointer;
        img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }
    }
}
.vsdrawercss {
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
        width: 90%;
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
