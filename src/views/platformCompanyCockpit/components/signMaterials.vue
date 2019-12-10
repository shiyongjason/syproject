<template>
    <div class="archiveSignPO">
        <el-form-item>
            <template #label>
                <span class="labeldiy">实控人信息归档：</span>
            </template>
            <el-radio v-if="isEdit" v-model="archiveSignPO.rcDocFlag" label="1">是</el-radio>
            <el-radio v-if="isEdit" v-model="archiveSignPO.rcDocFlag" label="2">无</el-radio>
            <el-radio v-if="isEdit" v-model="archiveSignPO.rcDocFlag" label="0">否</el-radio>
            <span style="margin-left:18px" v-else>
                {{archiveSignPO.rcDocFlag==='1'?'是':archiveSignPO.rcDocFlag==='0'?'否':archiveSignPO.rcDocFlag==='2'?'无':'-'}}
            </span>
        </el-form-item>
        <template v-if="archiveSignPO.rcDocFlag==='1'" >
            <el-form-item prop="realControllerName" label="实控人姓名：" label-width='160px'>
                <!-- @input="onInputChange(archiveSignPO.realControllerName,'actualController')" -->
                <el-input  v-model='archiveSignPO.realControllerName' placeholder="请输入姓名" v-if="isEdit" maxlength='30' @blur="onBlur('actualController','name',archiveSignPO.realControllerName)" @focus="onFocus('actualController')"></el-input>
                <span v-else>{{archiveSignPO.realControllerName?archiveSignPO.realControllerName:'-'}}</span>
                <div class="tips" v-if="isEdit&&suggestions.length>0&&showTips==='actualController'">
                    <p v-for="(item,index) in suggestions" :key="index" @click="chooseOneTips(item,'actualController')" ><font>{{item.name}}</font><span>{{item.idCard}}</span></p>
                </div>
            </el-form-item>
            <el-form-item prop="realControllerContactNo" label="联系方式：" label-width='160px'>
                <el-input v-model="archiveSignPO.realControllerContactNo" placeholder="请输入联系方式" v-if="isEdit" maxlength='30' @blur="onBlur('actualController','tel',archiveSignPO.realControllerContactNo)"></el-input>
                <span v-else>{{archiveSignPO.realControllerContactNo?archiveSignPO.realControllerContactNo:'-'}}</span>
            </el-form-item>
            <el-form-item prop="realControllerIdcard" label="身份证号：" label-width='160px'>
                <el-input v-model="archiveSignPO.realControllerIdcard" placeholder="请输入身份证号" v-if="isEdit" maxlength='18' @blur="onBlur('actualController','idCard',archiveSignPO.realControllerIdcard)"></el-input>
                <span v-else>{{archiveSignPO.realControllerIdcard?archiveSignPO.realControllerIdcard:'-'}}</span>
            </el-form-item>
            <el-form-item prop="realcontrollerList" label="实控人身份证归档：" label-width='160px'>
                <hosjoyUpload accept='.jpeg,.jpg,.png,.BMP,.pdf' :fileSize='20' :fileNum='15' v-if="isEdit" showProgress v-model="archiveSignPO.realcontrollerList" @successCb="onSuccessCb('b-realcontroller')" :action='action' :uploadParameters='uploadParameters'>
                </hosjoyUpload>
                <picView v-else :fileList='archiveSignPO.realcontrollerList' />
            </el-form-item>
        </template>
        <!-- 自然人股东信息归档 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span class="labeldiy">自然人股东信息归档：</span>
            </template>
            <el-radio v-if="isEdit" v-model="archiveSignPO.shareholderDocFlag" label="1">是</el-radio>
            <el-radio v-if="isEdit" v-model="archiveSignPO.shareholderDocFlag" label="2">无</el-radio>
            <el-radio v-if="isEdit" v-model="archiveSignPO.shareholderDocFlag" label="0">否</el-radio>
            <span v-else>
                {{archiveSignPO.shareholderDocFlag==='1'?'是':archiveSignPO.shareholderDocFlag==='2'?'无':archiveSignPO.shareholderDocFlag==='0'?'否':'-'}}
            </span>
        </el-form-item>
        <template v-if="archiveSignPO.shareholderDocFlag==='1'" >
            <el-form-item prop="shareholderName" label="自然人股东姓名：" label-width='160px'>
                <el-input v-model="archiveSignPO.shareholderName" placeholder="请输入姓名" v-if="isEdit" maxlength='30' @blur="onBlur('naturalPerson','name',archiveSignPO.shareholderName)" @focus="onFocus('naturalPerson')"></el-input>
                <span v-else>{{archiveSignPO.shareholderName?archiveSignPO.shareholderName:'-'}}</span>
                <div class="tips" v-if="isEdit&&suggestions.length>0&&showTips==='naturalPerson'">
                    <p v-for="(item,index) in suggestions" :key="index" @click="chooseOneTips(item,'naturalPerson')"><font>{{item.name}}</font><span>{{item.idCard}}</span></p>
                </div>
            </el-form-item>
            <el-form-item prop="shareholderContactNo" label="自然人股东联系方式：" label-width='160px'>
                <el-input v-model="archiveSignPO.shareholderContactNo" placeholder="请输入联系方式" v-if="isEdit" maxlength='30' @blur="onBlur('naturalPerson','tel',archiveSignPO.shareholderContactNo)"></el-input>
                <span v-else>{{archiveSignPO.shareholderContactNo?archiveSignPO.shareholderContactNo:'-'}}</span>
            </el-form-item>
            <el-form-item prop="shareholderIdcard" label="自然人股东身份证号：" label-width='160px'>
                <el-input v-model="archiveSignPO.shareholderIdcard" placeholder="请输入身份证号" v-if="isEdit" maxlength='18' @blur="onBlur('naturalPerson','idCard',archiveSignPO.shareholderIdcard)"></el-input>
                <span v-else>{{archiveSignPO.shareholderIdcard?archiveSignPO.shareholderIdcard:'-'}}</span>
            </el-form-item>
        </template>
        <!-- 投资协议归档 -->
        <span class="labeldiy">投资协议归档：</span>
        <el-form-item>
            <div v-for="(item,index) in archiveSignPO.signBOs" :key="index" style="margin-left: -140px;margin-top:10px">
                <span>{{index+1}}.0版本归档：</span>
                <span class="ab" style="margin-left:63px;">
                    <!-- <el-radio v-if="isEdit" :value="item[`v${index+1}SignerFlag`]" @input="(val)=>{item[`v${index+1}SignerFlag`]=val;item.archiveSignInvestPO.investVersion=`${index+1}.0`}" label="1">是</el-radio> -->
                    <el-radio v-if="isEdit" v-model="item.radio" label="1">是</el-radio>
                    <el-radio v-if="isEdit" v-model="item.radio" label="2">无</el-radio>
                    <el-radio v-if="isEdit" v-model="item.radio" label="0">否</el-radio>
                    <span v-else>
                        {{item.radio==='1'?'是':item.radio==='0'?'否':item.radio==='2'?'无':'-'}}
                    </span>
                    <template v-if="item.radio==='1'" >
                        <div v-for="(jtem,jndex) in item.version" :key="jndex" class="filepr">
                            <el-form-item prop="documentList"  label-width='160px'  >
                                <template #label>
                                    <span style="margin-top: 16px;display: inline-block;">第{{jndex+1}}份文件：</span>
                                </template>
                                <span class="delabs" v-if="isEdit" @click="deleteVersionList(index)">删除</span>
                                <hosjoyUpload v-if="isEdit" v-model="jtem.documentList" showAsFileName :fileSize='100' :fileNum='100' :action='action' :uploadParameters='uploadParameters' style="margin:15px 0" @successCb="onSuccessCb('1')">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </hosjoyUpload>
                                <!--  -->
                                <div class="filename" v-else>
                                    <span v-if="jtem.documentList.length===0">-</span>
                                    <template v-else>
                                        <div class="fileItem" v-for="(item,index) in jtem.documentList" :key="index" >
                                            <span class="posrtv">
                                                <template v-if="item&&item.fileUrl">
                                                    <i class="el-icon-document"></i>
                                                    <a :href="item.fileUrl" target="_blank">
                                                        <font>{{item.fileName}}</font>
                                                    </a>
                                                </template>
                                            </span>
                                            <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="getUrlBase64(item.fileUrl, item.fileName)">下载</font>
                                            <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                                        </div>
                                    </template>
                                </div>
                            </el-form-item>
                            <el-form-item label="该文件签约人：" label-width='160px' >
                                <el-input v-if="isEdit" v-model="jtem.archiveSignInvestPO.signerName" placeholder="请输入姓名" maxlength='30' @blur="onBlur(`version${index}${jndex}`,'name',jtem.archiveSignInvestPO.signerName)" @focus="onFocus(`version${index}${jndex}`)"></el-input>
                                <span v-else>{{jtem.archiveSignInvestPO.signerName?jtem.archiveSignInvestPO.signerName:'-'}}</span>
                                <div class="tips" v-if="isEdit&&suggestions.length>0&&showTips===`version${index}${jndex}`">
                                    <p v-for="(item,kndex) in suggestions" :key="kndex" @click="chooseOneTips(item,'version',index,jndex)"><font>{{item.name}}</font><span>{{item.idCard}}</span></p>
                                </div>
                            </el-form-item>
                            <el-form-item prop="signerContactNo" label="签约人联系方式：" label-width='160px' >
                                <el-input v-if="isEdit" v-model="jtem.archiveSignInvestPO.signerContactNo" placeholder="请输入联系方式" maxlength='30' @blur="onBlur(`version${index}${jndex}`,'tel',jtem.archiveSignInvestPO.signerContactNo)" ></el-input>
                                <span v-else>
                                    {{jtem.archiveSignInvestPO.signerContactNo?jtem.archiveSignInvestPO.signerContactNo:'-'}}
                                </span>
                            </el-form-item>
                            <el-form-item label="签约人身份证号：" label-width='160px'  :key="jndex+index">
                                <el-input v-if="isEdit" v-model="jtem.archiveSignInvestPO.signerIdcard" placeholder="请输入身份证号" maxlength='18' @blur="onBlur(`version${index}${jndex}`,'idCard',jtem.archiveSignInvestPO.signerIdcard)"></el-input>
                                <span v-else>
                                    {{jtem.archiveSignInvestPO.signerIdcard?jtem.archiveSignInvestPO.signerIdcard:'-'}}
                                </span>
                            </el-form-item>
                            <el-form-item prop="idCardList" label="签约人身份证归档：" label-width='160px' >
                                <hosjoyUpload accept='.jpeg,.jpg,.png,.BMP,.pdf' :fileSize='20' :fileNum='15' v-if="isEdit" v-model="jtem.idCardList" :action='action' :uploadParameters='uploadParameters' @successCb="onSuccessCb('2')" >
                                </hosjoyUpload>
                                <picView v-else :fileList='jtem.idCardList' />
                            </el-form-item>
                        </div>
                    </template>
                </span>
                <div class="mt10"><el-button v-if="isEdit&&archiveSignPO.signBOs.length>0&&item.radio==='1'" type="primary" class="addbtn" @click="onSubAdd(index)" icon='el-icon-circle-plus-outline'>新增</el-button></div>
            </div>
        </el-form-item>
        <!-- 投资履约担保函归档 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span class="labeldiy">投资履约担保函归档：</span>
            </template>
            <el-radio v-if="isEdit" v-model="archiveSignPO.guanranteeDocFlag" label="1">是</el-radio>
            <el-radio v-if="isEdit" v-model="archiveSignPO.guanranteeDocFlag" label="2">无</el-radio>
            <el-radio v-if="isEdit" v-model="archiveSignPO.guanranteeDocFlag" label="0">否</el-radio>
            <span v-else>
                {{archiveSignPO.guanranteeDocFlag==='1'?'是':archiveSignPO.guanranteeDocFlag==='0'?'否':archiveSignPO.guanranteeDocFlag==='2'?'无':'-'}}
            </span>
        </el-form-item>
        <template v-if="archiveSignPO.guanranteeDocFlag==='1'" >
            <el-form-item prop="assureFileList"  label-width='160px'>
                <template #label>
                    <span style="margin-top: 16px;display: inline-block;">担保函归档：</span>
                </template>
                <hosjoyUpload v-if="isEdit" v-model="archiveSignPO.assureFileList" showAsFileName :fileSize='100' :fileNum='100' :action='action' :uploadParameters='uploadParameters' style="margin:15px 0" @successCb="onSuccessCb('b-guarantee')">
                    <el-button size="small" type="primary" >点击上传</el-button>
                </hosjoyUpload>
                <div class="filename" v-else>
                    <span v-if="archiveSignPO.assureFileList.length===0">-</span>
                    <template v-else>
                        <div class="fileItem" v-for="(item,index) in archiveSignPO.assureFileList" :key="index" >
                            <span class="posrtv">
                                <template v-if="item&&item.fileUrl">
                                    <i class="el-icon-document"></i>
                                    <a :href="item.fileUrl" target="_blank">
                                        <font>{{item.fileName}}</font>
                                    </a>
                                </template>
                            </span>
                            <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="getUrlBase64(item.fileUrl, item.fileName)">下载</font>
                            <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                        </div>
                    </template>
                </div>
            </el-form-item>
            <el-form-item prop="guanranteeName" label="担保函签约人：" label-width='160px'>
                <el-input v-model="archiveSignPO.guanranteeName" placeholder="请输入姓名" v-if="isEdit" maxlength='30'></el-input>
                <span v-else>{{archiveSignPO.guanranteeName?archiveSignPO.guanranteeName:'-'}}</span>
            </el-form-item>
        </template>
        <!-- 其余B档签约材料 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span class="labeldiy">其余B档签约材料：</span>
            </template>
            <el-radio v-if="isEdit" v-model="archiveSignPO.otherContractInformationFlag" :label=1>是</el-radio>
            <el-radio v-if="isEdit" v-model="archiveSignPO.otherContractInformationFlag" :label=2>无</el-radio>
            <el-radio v-if="isEdit" v-model="archiveSignPO.otherContractInformationFlag" :label=0>否</el-radio>
            <span v-else>
                {{archiveSignPO.otherContractInformationFlag=='1'?'是':archiveSignPO.otherContractInformationFlag=='0'?'否':archiveSignPO.otherContractInformationFlag=='2'?'无':'-'}}
            </span>
        </el-form-item>
        <el-form-item prop="num" label-width='160px' v-if="archiveSignPO.otherContractInformationFlag=='1'">
            <template #label>
                <span style="display: inline-block;">文件：</span>
            </template>
            <hosjoyUpload v-if="isEdit" v-model="archiveSignPO.otherBList" showAsFileName :fileSize='100' :fileNum='100' :action='action' :uploadParameters='uploadParameters' @successCb="onSuccessCb('b-other')">
                <el-button size="small" type="primary">点击上传</el-button>
            </hosjoyUpload>
            <div class="filename" style="margin-top:0" v-else>
                <span v-if="archiveSignPO.otherBList.length===0">-</span>
                <template v-else>
                    <div class="fileItem" v-for="(item,index) in archiveSignPO.otherBList" :key="index" >
                        <span class="posrtv">
                            <template v-if="item&&item.fileUrl">
                                <i class="el-icon-document"></i>
                                <a :href="item.fileUrl" target="_blank">
                                    <font>{{item.fileName}}</font>
                                </a>
                            </template>
                        </span>
                        <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="getUrlBase64(item.fileUrl, item.fileName)">下载</font>
                        <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                    </div>
                </template>
            </div>
        </el-form-item>
    </div>
</template>

<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import picView from './picView'
import { checkIdCard } from '@/utils/rules.js'
import { fileUploadUrl } from '@/api/config'
import { mapState } from 'vuex'

const _signBOsForm = {
    archiveSignInvestPO: {
        investVersion: '', // 投资协议版本 1.0,2.0,3.0,4.0,5.0
        signInvestId: '', // id 编辑时有用
        signerContactNo: '', // 签约人联系方式
        signerDocFlag: '', // 签约人档案归档：1-是；0-否
        signerIdcard: '', // 签约人身份证号码
        signerName: '' // 签约人姓名
    },
    idCardList: [],
    documentList: []
    // v1SignerFlag
    /* signDocPOs: [
        {
            docType: '', // 档案类型：1-文件；2-身份证
            fileName: '', // 附件名称
            fileUrl: ''// 附件地址
        }
    ], */
}
export default {
    name: 'archiveSignPO',
    props: ['value', 'commonDocPOs', 'signBOs', 'isEdit'],
    components: { hosjoyUpload, picView },
    data () {
        return {
            timer: '',
            inputTips: {},
            suggestions: [],
            showTips: '',
            assureRadio: '1',
            signBOsForm: JSON.parse(JSON.stringify(_signBOsForm)),
            action: fileUploadUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            checkIdCard

        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        archiveSignPO () {
            return this.value
        }
    },
    methods: {
        chooseOneTips (item, key, index, jndex) {
            if (key === 'version') {
                this.archiveSignPO.signBOs[index].version[jndex].archiveSignInvestPO.signerName = item.name || ''
                this.archiveSignPO.signBOs[index].version[jndex].archiveSignInvestPO.signerIdcard = item.idCard || ''
                this.archiveSignPO.signBOs[index].version[jndex].archiveSignInvestPO.signerContactNo = item.tel || ''
                let key = `version${index}${jndex}`
                this.$set(this.inputTips[key], 'name', item.name || '')
                this.$set(this.inputTips[key], 'tel', item.tel || '')
                this.$set(this.inputTips[key], 'idCard', item.idCard || '')
            }
            if (key === 'actualController') {
                this.$set(this.archiveSignPO, 'realControllerName', item.name || '')
                this.$set(this.archiveSignPO, 'realControllerContactNo', item.tel || '')
                this.$set(this.archiveSignPO, 'realControllerIdcard', item.idCard || '')
                this.$set(this.inputTips.actualController, 'name', item.name || '')
                this.$set(this.inputTips.actualController, 'tel', item.tel || '')
                this.$set(this.inputTips.actualController, 'idCard', item.idCard || '')
            }
            if (key === 'naturalPerson') {
                this.$set(this.archiveSignPO, 'shareholderName', item.name || '')
                this.$set(this.archiveSignPO, 'shareholderContactNo', item.tel || '')
                this.$set(this.archiveSignPO, 'shareholderIdcard', item.idCard || '')
                this.$set(this.inputTips.naturalPerson, 'name', item.name || '')
                this.$set(this.inputTips.naturalPerson, 'tel', item.tel || '')
                this.$set(this.inputTips.naturalPerson, 'idCard', item.idCard || '')
            }
            this.showTips = ''
        },
        onFocus (k) {
            console.log(this.inputTips)

            this.suggestions = []

            setTimeout(() => {
                this.showTips = k
            }, 220)
            // this.suggestions = Object.values(this.inputTips)
            let arr = Object.values(this.inputTips)
            let obj = {}
            // 去重
            for (var i = 0; i < arr.length; i++) {
                if (!obj[arr[i].name]) {
                    this.suggestions.push(arr[i])
                    obj[arr[i].name] = true
                }
            }
            console.log(this.suggestions)
        },
        onBlur (key, subKey, val, index) {
            if (!(key in this.inputTips)) {
                let obj = {
                    name: '',
                    tel: '',
                    idCard: ''
                }
                this.$set(this.inputTips, key, obj)
            }
            this.inputTips[key][subKey] = val || ''
            setTimeout(() => {
                this.showTips = ''
            }, 200)
        },
        getUrlBase64 (url, fileName, ext = '') {
            let _this = this
            var canvas = document.createElement('canvas') // 创建canvas DOM元素
            var ctx = canvas.getContext('2d')
            var img = new Image()
            img.setAttribute('crossOrigin', 'anonymous')
            img.src = url + '?time=' + new Date().valueOf()
            img.onload = function () {
                canvas.height = img.height // 指定画板的高度,自定义
                canvas.width = img.width // 指定画板的宽度，自定义
                ctx.drawImage(img, 0, 0) // 参数可自定义
                var dataURL = canvas.toDataURL('image/' + ext) // 传递的自定义的参数
                canvas = null
                var downDom = document.createElement('a') // 创建DOM元素
                downDom.setAttribute('href', dataURL)
                downDom.setAttribute('download', fileName)
                console.log(downDom)
                _this.$nextTick(() => {
                    downDom.click()
                })
            }
        },
        onSubAdd (index) {
            if (this.archiveSignPO.signBOs[index].version.length === 10) {
                this.$message.error(`投资协议归档每个版本最多只能新增到10份`)
                return
            }
            this.archiveSignPO.signBOs[index].version.push(JSON.parse(JSON.stringify(this.signBOsForm)))
        },
        onSuccessCb (str) {
            if (str === 'b-other') {
                this.archiveSignPO.otherBList.map(item => {
                    this.$set(item, 'docType', str)
                })
            }
            if (str === 'b-guarantee') {
                this.archiveSignPO.assureFileList.map(item => {
                    this.$set(item, 'docType', str)
                })
            }
            if (str === 'b-realcontroller') {
                this.archiveSignPO.realcontrollerList.map(item => {
                    this.$set(item, 'docType', str)
                })
            }
            if (str === '1') {
                this.archiveSignPO.signBOs.map(item => {
                    item.version.map(jtem => {
                        jtem.documentList.map(jtem => {
                            this.$set(jtem, 'docType', str)
                        })
                    })
                })
            }
            if (str === '2') {
                this.archiveSignPO.signBOs.map(item => {
                    item.version.map(jtem => {
                        jtem.idCardList.map(jtem => {
                            this.$set(jtem, 'docType', str)
                        })
                    })
                })
            }
        },
        deleteVersionList (index) {
            this.archiveSignPO.signBOs[index].version = this.archiveSignPO.signBOs[index].version.slice(0, -1)
        },
        onAdd () {
            if (this.archiveSignPO.signBOs.length === 5) {
                return
            }
            for (let i = 0; i < 5; i++) {
                let obj = {
                    version: [JSON.parse(JSON.stringify(this.signBOsForm))]
                }
                this.archiveSignPO.signBOs.push(obj)
                let len = this.archiveSignPO.signBOs.length
                // let key = `v${len}SignerFlag`
                this.$set(this.archiveSignPO.signBOs[len - 1], 'radio', '0')
                // this.$set(this.archiveSignPO.signBOs[0], 'radio', '1')
                this.$set(this.archiveSignPO.signBOs[0], 'radio', '0')
            }
        }
    },
    mounted () {
        this.uploadParameters.updateUid = this.userInfo.employeeName
        console.log(this.archiveSignPO)
        if (this.$route.query.archiveId) {
            // 初始化input tips
            this.$set(this.inputTips, 'actualController',
                {
                    name: this.archiveSignPO.realControllerName,
                    tel: this.archiveSignPO.realControllerContactNo,
                    idCard: this.archiveSignPO.realControllerIdcard
                }
            )
            this.$set(this.inputTips, 'naturalPerson',
                {
                    name: this.archiveSignPO.shareholderName,
                    tel: this.archiveSignPO.shareholderContactNo,
                    idCard: this.archiveSignPO.shareholderIdcard
                }
            )
            this.archiveSignPO.signBOs.map((item, index) => {
                item.version.map((jtem, jndex) => {
                    if (jtem.archiveSignInvestPO.signerName) {
                        this.$set(this.inputTips, `version${index}${jndex}`,
                            {
                                name: jtem.archiveSignInvestPO.signerName,
                                tel: jtem.archiveSignInvestPO.signerContactNo,
                                idCard: jtem.archiveSignInvestPO.signerIdcard
                            }
                        )
                    }
                })
            })
            console.log(this.inputTips)
        }
        // this.onAdd()
        // if (!this.$route.query.archiveId) this.onAdd()
    }
}
</script>

<style scoped lang='scss'>
.archiveSignPO{
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
.labeldiy{ color: #000; font-weight:bold;}

.addbtn{
    width: 130px;
    margin-left: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
}
/deep/.addbtn i{ font-size: 18px}
.filepr{ position: relative;}
.delabs{ position: absolute;right:0;font-size: 12px;border-radius: 3px;padding: 10px 16px;color: #FFF;background-color: #FF7A45;border-color: #FF7A45;display: inline-block; line-height: 1}
.filename{
    margin-top: 17px;
    color: #6e6f73;
    span{
            display: flex;
            align-items: center;
            margin-right: 15px;
        i {
            font-size: 21px;
            font-weight: bold;
        }
        a {color: #FF7A45; margin-left: 10px}
    }
    .posrtv{ position: relative;color: #FF7A45;}
}
.fileItem{ display: flex;justify-content: space-between;align-items: center;}
.fileItemDownLoad{font-size: 12px;border-radius: 3px;padding: 8px 16px;color: #fff;background-color: #ff7a45;border-color: #ff7a45;display:block;line-height: 13px;float: right;height: 13px; cursor: pointer;}
.tips{ width: 224px; position: absolute; padding: 0 15px;border-radius: 4px;border: 1px solid #DCDFE6; box-sizing: border-box;
margin-top: 3px; background: #fff; z-index: 999; color: #606266;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);}
.tips p{ display: flex;justify-content: space-between;}
.tips p:hover{color:#FF7A45!important;cursor: pointer;}
.tips p:hover span{color:#FF7A45!important}
.tips p span{font-size: 12px; padding-left: 5px;color: #b1b2b5;}
</style>