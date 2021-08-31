<template>
    <el-drawer title="线索详情" :visible.sync="drawer" :wrapperClosable='false' :close-on-click-modal='false' :before-close="handleClose" :modal-append-to-body='false' size='680px'>
        <div class="ThreadDetail">
            <div class="radio-group">
                <el-radio-group v-model="radio">
                    <el-radio-button label="跟进记录"></el-radio-button>
                    <el-radio-button label="客户信息"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="ThreadDetail-ctx" :style="radio=='跟进记录'?'bottom:0':'bottom:60px'">
                <div v-if="radio=='跟进记录'">
                    <h-button type='assist' @click='add'> + 新增跟进记录</h-button>
                    <span v-if="flowUpCount.total">
                        累计跟进{{flowUpCount.total}}次，当面拜访{{flowUpCount.directCount}}次
                    </span>
                    <div style="margin-top:20px">
                        <b>跟进动态</b>
                    </div>
                    <div v-if="!recordsData.length" style="width: 600px;margin: 10px auto;">
                        <el-divider>暂无跟进动态</el-divider>
                    </div>
                    <div v-else class="follow-records" ref='records'>
                        <div class="follow-cell" v-for="item in recordsData" :key="item.id">
                            <div class="info"><img :src="userDefault" class="avatar">
                                <div class="name-container">
                                    <div class="follow-tag">跟进人</div>
                                    <div class="name">{{item.createBy||'-'}} {{item.createPhone}}</div>
                                </div>
                                <div class="time">{{item.createTime|formatDate('YYYY/MM/DD HH:mm:ss')}}</div>
                            </div>
                            <div class="content-container" v-if="item.flowUpDynamic&&item.flowUpDynamic.msgType === 'meeting_voice_call'">
                                <div class='line' />
                                <div class='content'>
                                    <div class='title-tag'>语音通话</div>
                                    <div class='audio-player-container'>
                                        <div class="crm-audio-player">
                                            <audio controls>
                                                <source :src="item.flowUpDynamic.msgContent.osspath" type="audio/mpeg">
                                                您的浏览器不支持 音频 插件，请使用谷歌浏览器。
                                            </audio>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='content-container' v-if="item.flowUpDynamic&&item.flowUpDynamic.msgType === 'link'">
                                <div class='line' />
                                <div class='content'>
                                    <div class='title-tag'>发送链接</div>
                                    <div class='desc-link'>《{{item.flowUpDynamic.msgContent.title ? item.flowUpDynamic.msgContent.title : '查看链接'}}》</div>
                                </div>
                            </div>
                            <div class='content-container' v-if="item.flowUpDynamic&&item.flowUpDynamic.msgType === 'weapp'">
                                <div class='line' />
                                <div class='content'>
                                    <div class='title-tag'>发送小程序</div>
                                    <div class='desc-weapp'>《{{item.flowUpDynamic.msgContent.displayname ? item.flowUpDynamic.msgContent.displayname : ''}}》</div>
                                </div>
                            </div>
                            <!--  -->
                            <div class="content-container">
                                <div class="line"></div>
                                <div class="content">
                                    <div class="title-tag" style="margin-top:20px">{{item.type ==1?'当面拜访':'电话/微信沟通/邮件等'}}</div>
                                    <div class="audio-player-container">
                                        <template v-if="item.picUrls&&item.picUrls.length">{{item.type ==1?'现场图片：':'附件：'}}</template>
                                        <div class="crm-audio-player" style="margin-top:-15px">
                                            <OssFileHosjoyUpload :showUpload='false' :showPreView='true' v-model="item.picUrls" :fileNum=8 :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" />
                                        </div>
                                    </div>
                                    <div class="title-tag" v-if="item.nextFlowTime">下次跟进时间</div>
                                    <div class="desc" v-if="item.nextFlowTime">{{item.nextFlowTime | formatDate('YYYY年MM月DD日 HH:mm')}}</div>
                                    <template v-if="item.customerBackLogWorks&&item.customerBackLogWorks.length">
                                        <div class="title-tag">邀请同事协助</div>
                                        <div class="desc" v-for="w in item.customerBackLogWorks" :key="w.id">{{w.assignedUserName}} {{w.assignedUserMobile}}</div>
                                        <div class="title-tag" v-if="item.customerBackLogWorks[0].remark">需协助内容</div>
                                        <div class="desc" v-if="item.customerBackLogWorks[0].remark">{{item.customerBackLogWorks[0].remark}}</div>
                                    </template>
                                    <div class="title-tag" v-if="item.content">跟进内容</div>
                                    <div class="desc" v-if="item.content">{{item.content}}</div>
                                    <div class="title-tag" v-if="item.flowUpProcess">跟进阶段</div>
                                    <div class="desc" v-if="item.flowUpProcess">{{ followUpPhaseOption[item.flowUpProcess] && followUpPhaseOption[item.flowUpProcess].label }}</div>
                                    <div class="title-tag" v-if="item.userTag">客户标签</div>
                                    <div class="desc" v-if="item.userTag">
                                        <span class="desc-title" v-for="value in item.userTag.split(',')" :key="value">{{ customerTagOption[value] && customerTagOption[value].label}}</span>
                                    </div>
                                    <div class="title-tag" v-if="item.remark">其他备注</div>
                                    <div class="desc" v-if="item.remark">{{item.remark}}</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="isNoMore" style="width: 570px;margin: 10px auto;">
                            <el-divider>没有更多</el-divider>
                        </div>
                    </div>
                </div>
                <div v-if="radio=='客户信息'" class="project-information">
                    <el-form id='elform' :model="threadDetail" :rules="formRules" label-width="140px" label-position='right' ref="threadDetailForm" class="list2">
                        <div style="color:#606266;line-height:40px">
                            <font class="project-detail-others">线索来源：</font>{{origin}}
                        </div>
                        <div class="project-detail-item">
                            <el-form-item prop='userMobile' label="客户手机号：">
                                <el-input placeholder="请输入客户手机号" @blur='phoneBlur' v-model='threadDetail.userMobile'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item prop='userName' label="客户姓名：">
                                <el-input placeholder="请输入客户姓名" maxlength="20" v-model='threadDetail.userName'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="婚姻状况：" prop="maritalStatus">
                                <el-select v-model="threadDetail.maritalStatus" placeholder="请选择">
                                    <el-option v-for="item in maritalStatusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="从业年限：" prop="workingYears">
                                <el-select v-model="threadDetail.workingYears" placeholder="请选择">
                                    <el-option v-for="item in workingYearsOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="客户来源：" prop="userSource">
                                <el-select v-model="threadDetail.userSource" placeholder="请选择" @change="userSourceChange">
                                    <el-option v-for="item in userSourceOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="threadDetail.userSource == 3" prop="manufacturer">
                                <el-select v-model="threadDetail.manufacturer" placeholder="请添加厂商信息" filterable clearable>
                                    <el-option v-for="item in manufacturerOption" :key="item.companyCode" :label="item.companyName" :value="item.companyCode"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="threadDetail.userSource == 4" prop="oldCompanyName">
                                <el-select v-model="threadDetail.oldCompanyName" placeholder="请添加老客户信息" :remote-method="tianyanchaSearchesList" filterable clearable remote reserve-keyword>
                                    <el-option v-for="item in oldCompanyNameOption" :key="item.id" :label="item.name" :value="item.name"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>

                        <div class="project-detail-item">
                            <el-form-item label="企业名称：" prop="companyName">
                                <el-input placeholder="请输入企业名称" maxlength="50" v-model='threadDetail.companyName'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="主营品类：" prop="deviceCategory">
                                <el-select v-model="threadDetail.deviceCategory" placeholder="请选择">
                                    <el-option v-for="item in categorys" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="主营品牌：" prop="deviceBrand">
                                <el-input placeholder="请输入主营品牌" v-model='threadDetail.deviceBrand'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item area-select">
                            <el-form-item label="客户地址：" prop="provinceId">
                                <el-select v-model="threadDetail.provinceId" @change="onProvince" placeholder="省" clearable>
                                    <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                                    </el-option>
                                </el-select>
                                <span class="ml10 mr10">-</span>
                                <el-select v-model="threadDetail.cityId" @change="onCity" placeholder="市" clearable>
                                    <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                                    </el-option>
                                </el-select>
                                <span class="ml10 mr10">-</span>
                                <el-select v-model="threadDetail.countryId" @change="onArea" placeholder="区" clearable>
                                    <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="">
                                <el-input v-model="threadDetail.address" maxlength="100" placeholder="请输入详细地址"></el-input>
                            </el-form-item>
                        </div>
                        <div class="add-cont__row">
                        <el-form-item label="已合作甲方" prop="cooperatedFirstParty">
                            <el-input type="textarea" :rows="2" v-model="threadDetail.cooperatedFirstParty" maxlength="200" placeholder="请输入甲方名称，多个用逗号隔开"></el-input>
                        </el-form-item>
                        </div>
                        <div class="add-cont__row">
                            <el-form-item label="常做项目类型" prop="usualProjectType">
                                <el-select v-model="threadDetail.usualProjectType" placeholder="请选择" clearable>
                                    <el-option v-for="item in projectTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="add-cont__row">
                            <el-form-item label="合作伙伴" prop="partner">
                                <el-input type="textarea" :rows="2" v-model="threadDetail.partner" maxlength="200" placeholder="请输入合作伙伴"></el-input>
                            </el-form-item>
                        </div>
                        <div class="add-cont__row">
                            <el-form-item label="常用区域品牌名称">
                                <el-input type="textarea" :rows="2" v-model="threadDetail.usualRegionBrand" maxlength="200" placeholder="请输入区域品牌名称，多个用逗号隔开"></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="客户经理：">
                                <el-autocomplete v-model="stateN" :fetch-suggestions="querySearchAsync" placeholder="请选择客户经理" @blur="onBlurItem" :trigger-on-focus="false" @select="handleThreadSelect">
                                    <template slot-scope="{ item }">
                                        <div class="autoflex">
                                            <div class="name">{{ item.psnname }}</div>
                                        </div>
                                    </template>
                                </el-autocomplete>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="客户经理手机号：">
                                <el-input placeholder="请输入客户经理手机号" disabled v-model='threadDetail.customerMobile'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="所属部门：">
                                <el-input placeholder="请输入客户经理所属部门" disabled v-model='threadDetail.customerDeptName'></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div style="color:#606266;line-height:40px">
                        <font class="project-detail-others">创建时间：</font>{{threadDetail.createTime | formatDate('YYYY年MM月DD日 HH:mm:ss')}}
                    </div>
                    <div style="color:#606266;line-height:40px">
                        <font class="project-detail-others">创建人：</font>{{threadDetail.createBy}}
                    </div>
                    <div style="color:#606266;line-height:40px">
                        <font class="project-detail-others">最近维护时间：</font>{{threadDetail.updateTime | formatDate('YYYY年MM月DD日 HH:mm:ss')}}
                    </div>
                    <div style="color:#606266;line-height:40px;margin-bottom:20px">
                        <font class="project-detail-others">最近维护人：</font>{{threadDetail.updateBy || '-'}}
                    </div>
                </div>

            </div>
            <div class="bottom-line" v-if="radio=='客户信息'"></div>
            <div class="fixed-btn" v-if="radio=='客户信息'">
                <h-button type="primary" @click="onUpDateThreadDetail">保存</h-button>
            </div>
            <!-- 添加跟进记录 -->
            <el-dialog title="添加跟进记录" class="record-dialog" :visible.sync="addRecord" :modal='false' width="800px" :before-close="()=>closeAddRecord()" :close-on-click-modal='false'>
                <div class="record-layout">
                    <div class="header-title">
                        <el-radio v-model="flowUpRequest.type" :label="1">当面拜访</el-radio>
                        <el-radio v-model="flowUpRequest.type" :label="2">电话/微信沟通/邮件等</el-radio>
                        <p v-show="flowUpRequest.type === 2" class="tips">温馨提示：推荐使用企业微信与客户聊天，自动更新记录，更方便。</p>
                    </div>
                    <div style="margin-top:-10px">
                        <el-form :rules="addFlowUpRules" :model="flowUpRequest" ref="addFlowUp" :validate-on-rule-change='false'>
                            <div class="record-dialog-item" v-if="flowUpRequest.type == 1">
                                <el-form-item prop='picUrls' label="上传现场图片："></el-form-item>
                                <div>
                                    <OssFileHosjoyUpload :showPreView='true' delTips='是否确认删除打卡图片，删除后无法恢复' v-model="flowUpRequest.picUrls" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".jpg,.jpeg,.png">
                                        <div class="a-line">
                                            <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                                        </div>
                                    </OssFileHosjoyUpload>
                                </div>
                            </div>
                            <div class="record-dialog-item" style="margin-top:10px">
                                <el-form-item prop='content' label="跟进内容：" class="textarea">
                                    <el-input v-model="flowUpRequest.content" placeholder="请输入此次跟进结果/下次跟进事项" style="width:380px;" type="textarea" maxlength="500" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item" v-if="flowUpRequest.type != 1">
                                <el-form-item label="附件（不超过9个）："></el-form-item>
                                <div>
                                    <OssFileHosjoyUpload :showPreView='true' v-model="flowUpRequest.picUrls" :fileNum=9 :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px">
                                        <div class="a-line">
                                            <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                                        </div>
                                    </OssFileHosjoyUpload>
                                </div>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop='flowUpProcess' label="跟进阶段：" class="textarea">
                                    <el-select v-model="flowUpRequest.flowUpProcess" placeholder="请添加厂商信息" filterable clearable>
                                        <el-option v-for="item in followUpPhaseOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop='userTag' label="客户标签：" class="textarea">
                                    <el-select v-model="flowUpRequest.userTag" multiple placeholder="请添加厂商信息" filterable clearable>
                                        <el-option v-for="item in customerTagOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop="nextFlowTime" label="下次跟进时间：" class="textarea">
                                    <el-date-picker v-model="flowUpRequest.nextFlowTime" type="datetime" format="yyyy-MM-dd HH:mm" value-format='yyyy-MM-ddTHH:mm' placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop='remark' label="其他备注：" class="textarea">
                                    <el-input v-model="flowUpRequest.remark" placeholder="其他需特殊说明事项可添加" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeAddRecord">取 消</el-button>
                    <el-button type="primary" @click="onSubmitAddRecord">确定</el-button>
                </div>
            </el-dialog>
        </div>

    </el-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { ccpBaseUrl, ossAliyun, ossOldBucket } from '@/api/config'
import { getChiness, getFlowUp, getFlowUpCount, addFlowUp, updateThreadDetail, checkThreadIsRight, companyList, tianyanchaSearches } from './api/index'
import OssFileUtils from '@/utils/OssFileUtils'
import { State, namespace, Action, Getter } from 'vuex-class'
import { Clue, FlowUpRequest } from '@/interface/hbp-member'
import { validateForm, handleSubmit } from '@/decorator'
import { THREAD_ORIGIN, DEVICE_CATEGORY, USER_DEFAULT, EMPLOYED_AGE, CUSTOM_SOURCE, MARITAL_STATUS, FOLLOW_UP_PHASE, CUSTOMER_TAG, PROJECT_TYPE } from './const/index'
import { Phone } from '@/utils/rules'
const _flowUpRequest = {
    assistantRemark: '', // 协助内容
    assistants: [], // (2.0项目)协助人员列表
    bizId: '',
    bizType: 1,
    contactMobile: '',
    contactName: '',
    content: '',
    createBy: '',
    createCorpUserId: '', // 创建人企业微信id
    createPhone: '',
    flowUpProcess: '',
    id: '',
    nextFlowTime: '',
    noNeedFlowReason: '',
    picUrls: [],
    remark: '',
    type: 1 // 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
}

@Component({
    name: 'ThreadDetail',
    components: { OssFileHosjoyUpload }
})
export default class ThreadDetail extends Vue {
    @State('userInfo') userInfo: any
    @Prop({ type: Boolean, required: true, default: false }) drawer: boolean;
    @Prop({ type: Object, required: true }) threadDetail: Clue;
    @Action('vipApply/findContract') findContract: Function
    @Getter('vipApply/contracts') contracts: any
    @Watch('getCity')
    onCityChange (newVal) {
        this.cityList = newVal
    }
    @Watch('flowUpRequest.type')
    flowUpRequestChange (newVal, oldVal) {
        console.log(newVal, oldVal)
        this.flowUpRequest = JSON.parse(JSON.stringify(_flowUpRequest))
        this.flowUpRequest = {
            ...this.flowUpRequest,
            type: newVal
        }
    }
    action = ccpBaseUrl + 'common/files/upload-old'
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }

    formRules = {
        userMobile: [
            { required: true, message: '请输入客户手机', trigger: 'blur' },
            { validator: Phone, message: '请输入正确手机号', trigger: 'blur' }
        ],
        userName: [
            { required: true, message: '请输入客户姓名', trigger: 'blur' }
        ],
        companyName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        maritalStatus: [
            { required: true, message: '请选择婚姻状况', trigger: 'change' }
        ],
        workingYears: [
            { required: true, message: '请选择婚姻状况', trigger: 'change' }
        ],
        userSource: [
            { required: true, message: '请选择客户来源', trigger: 'change' }
        ],
        manufacturer: [
            { required: true, message: '请添加厂商信息', trigger: 'change' }
        ],
        oldCompanyName: [
            { required: true, message: '请添加老客户信息', trigger: 'change' }
        ],
        deviceCategory: [
            { required: true, message: '请选择主营品类', trigger: 'change' }
        ],
        deviceBrand: [
            { required: true, message: '请输入主营品牌', trigger: 'blur' }
        ],
        provinceId: [
            { required: true, message: '请选择省、市、区', trigger: 'change' },
            { validator: (rule, value, callback) => {
                if (this.threadDetail.provinceId == '' || this.threadDetail.cityId == '' || this.threadDetail.countryId == '') {
                    return callback(new Error('请选择省、市、区'))
                }
                return callback()
            },
            trigger: 'change'
            }
        ],
        address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        cooperatedFirstParty: [
            { required: true, message: '请输入已合作甲方', trigger: 'blur' }
        ],
        usualProjectType: [
            { required: true, message: '请选择常做项目类型', trigger: 'change' }
        ]
    }

    radio: string = '跟进记录';
    radioRecord: string = '当面拜访';
    // 添加跟进记录 弹窗
    addRecord: boolean = false
    isNoMore: boolean = false
    radioContact: string = ''
    provinceList: any[] = []
    cityList: any[] = []
    countryList: any[] = []
    maritalStatusOption = MARITAL_STATUS
    workingYearsOption = EMPLOYED_AGE
    userSourceOption = CUSTOM_SOURCE
    oldCompanyNameOption:any[] = []
    manufacturerOption: any = []
    categorys = DEVICE_CATEGORY
    userDefault = USER_DEFAULT
    followUpPhaseOption:any[] = FOLLOW_UP_PHASE
    customerTagOption: any[] = CUSTOMER_TAG
    projectTypeOption = PROJECT_TYPE
    stateN = ''

    queryParams = {
        keyWord: ''
    }

    flowUpCount: any = {
        directCount: '',
        total: ''
    }

    timeout = null

    recordsQuery = {
        bizId: '',
        pageNumber: 1,
        pageSize: 5
    }
    recordsData: any[] = []
    recordsPagination = ''
    flowUpRequest: FlowUpRequest = JSON.parse(JSON.stringify(_flowUpRequest))

    get addFlowUpRules () {
        let rules = {
            picUrls: { required: true, message: '必填项不能为空' },
            content: { required: true, message: '必填项不能为空', trigger: 'blur' },
            flowUpProcess: { required: true, message: '必填项不能为空', trigger: 'change' },
            userTag: { required: true, message: '必填项不能为空', trigger: 'change' }
        }
        return rules
    }
    get origin () {
        switch (this.threadDetail.origin) {
            case 1:
                return '好橙工'
            case 2:
                return '享钱'
            case 3:
                return '单分享'
            case 4:
                return 'CRM'
            case 5:
                return '第三方渠道'
            case 14:
                return '舒适云'
            default:
                return ''
        }
    }
    get getCity () {
        const province = this.provinceList.filter(item => item.provinceId === this.threadDetail.provinceId)
        if (province.length > 0) {
            return province[0].cities
        }
        return []
    }

    get getCountry () {
        const city = this.cityList.filter(item => item.cityId == this.threadDetail.cityId)
        if (city.length > 0) {
            return city[0].countries
        }
        return []
    }

    async querySearchAsync (queryString, cb) {
        if (queryString) {
            await this.findContract(queryString)
            var restaurants = this.contracts
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                cb(results)
            }, 3000 * Math.random())
        }
    }
    createStateFilter (queryString) {
        return (state) => {
            return (state.psnname.indexOf(queryString) === 0)
        }
    }
    onBlurItem () {

    }
    phoneBlur (e) {
        console.log(this.threadDetail.userMobile)
        Phone('', this.threadDetail.userMobile, async e => {
            if (!e) {
                const { data } = await checkThreadIsRight(this.threadDetail.userMobile)
                if (data) {
                    // 表示已经注册过
                    this.threadDetail.userMobile = ''
                    this.$message.error('CRM中已有该客户，无需重复添加')
                }
            }
        })
    }
    handleThreadSelect (item) {
        this.stateN = item.psnname
        this.threadDetail.customerMobile = item.mobile
        this.threadDetail.customerName = item.psnname
        this.threadDetail.customerDeptName = item.deptName
    }

    handleClose () {
        let threadDetailForm: any = this.$refs['threadDetailForm']
        if (threadDetailForm) {
            threadDetailForm.resetFields()
        }
        this.$emit('handleClose')
    }
    add () {
        this.addRecord = true
    }

    @validateForm('threadDetailForm')
    async onUpDateThreadDetail () {
        const parms = { ...this.threadDetail }
        parms.updateBy = this.userInfo.employeeName
        if (!parms.provinceId || parms.provinceId.length === 0) {
            parms.provinceName = ''
        }
        if (!parms.cityId || parms.cityId.length === 0) {
            parms.cityName = ''
        }
        if (!parms.countryId || parms.countryId.length === 0) {
            parms.countryName = ''
        }
        parms.createTime = null
        await updateThreadDetail(parms)
        this.$message.success('保存成功')
        this.$emit('getDetail', parms.id)
    }

    onProvince (key) {
        this.threadDetail.provinceId = key || ''
        this.threadDetail.cityId = ''
        this.threadDetail.countryId = ''
        if (key.length > 0) {
            const province = this.provinceList.filter(item => {
                return item.provinceId === this.threadDetail.provinceId
            })
            this.threadDetail.provinceName = province.length > 0 ? province[0].name : ''
        }
        if (!key) {
            return
        }
        const res = this.provinceList.filter(item => {
            return item.provinceId === key
        })
    }

    onArea (key) {
        this.threadDetail.countryId = key
        if (key.length > 0) {
            const country = this.getCountry.filter(item => {
                return item.countryId === this.threadDetail.countryId
            })
            this.threadDetail.countryName = country.length > 0 ? country[0].name : ''
        }
    }

    onCity (key) {
        this.threadDetail.cityId = key || ''
        this.threadDetail.countryId = ''
        if (key.length > 0) {
            const city = this.getCity.filter(item => {
                return item.cityId === this.threadDetail.cityId
            })
            this.threadDetail.cityName = city.length > 0 ? city[0].name : ''
        }
        if (!key) {
            return
        }
        const res = this.getCity.filter(item => {
            return item.cityId === key
        })
    }

    async getAreacode () {
        const { data } = await getChiness()
        this.provinceList = data || []
    }

    // async onGetbranch () {
    //     await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
    //     console.log(this.branchArr)
    // }

    // 跟进记录
    async getRecords () {
        if (this.recordsPagination && Number(this.recordsQuery.pageNumber) > Number(this.recordsPagination)) {
            this.isNoMore = true
            return
        }
        const { data: flowUp } = await getFlowUp(this.recordsQuery)
        this.recordsPagination = flowUp.pages
        this.recordsData = [...this.recordsData, ...flowUp.records]
        this.recordsData.map(async (item, index) => {
            if (item.picUrls) {
                let api: any = []
                let url = []
                item.picUrls.map(jtem => {
                    url.push(jtem)
                    api.push(OssFileUtils.getUrl(jtem))
                })
                const res = await Promise.all(api)
                let obj = []
                res.map((o, i) => {
                    obj.push({
                        fileUrl: url[i],
                        fileName: o,
                        tokenUrl: o
                    })
                })
                console.log('🚀 --- this.recordsData.map --- obj', obj)

                item.picUrls = obj
            }
        })
    }

    recordsScroll (event) {
        if (this.radio === '项目信息') {
            return
        }
        // 滚动距离scrollTop+元素的高clientHeight=文档的高scrollHeight
        const { scrollTop, clientHeight, scrollHeight } = event.target
        // console.log('%O', event.target)
        console.log(event.target.scrollTop)
        if (scrollHeight - scrollTop - clientHeight <= 80) {
            console.log(' 🚗 🚕 🚙 🚌 🚎 加载')
            this.recordsQuery.pageNumber += 1
            this.getRecords()
        }
    }

    // 关闭新增跟进记录
    closeAddRecord () {
        this.flowUpRequest = JSON.parse(JSON.stringify(_flowUpRequest))

        this.$nextTick(() => {
            // @ts-ignore
            this.$refs['addFlowUp'].clearValidate()
            this.addRecord = false
        })
    }

    // 提交新增跟进记录
    @validateForm('addFlowUp')
    @handleSubmit()
    async onSubmitAddRecord () {
        this.flowUpRequest.createBy = this.userInfo.employeeName
        this.flowUpRequest.createPhone = this.userInfo.phoneNumber
        this.flowUpRequest.userTag = this.flowUpRequest.userTag.toString()
        let query = JSON.parse(JSON.stringify(this.flowUpRequest))
        if (this.flowUpRequest.picUrls) {
            let picUrls = []
            this.flowUpRequest.picUrls.map((item: any) => {
                picUrls.push(item.fileUrl)
            })
            query.picUrls = picUrls
        }
        console.log(this.flowUpRequest.picUrls, 'this.flowUpRequest.picUrls')
        console.log(query.picUrls, 'query.picUrls')
        query.bizId = this.threadDetail.id.toString()
        console.log(query, 'query')
        await addFlowUp(query)
        this.$message.success('新增成功')
        this.recordsQuery = {
            bizId: this.threadDetail.id.toString(),
            pageNumber: 1,
            pageSize: 5
        }
        this.recordsData = []
        await this.onInitGetDate()
        this.closeAddRecord()
    }

    async onInitGetDate () {
        this.recordsQuery = {
            bizId: this.threadDetail.id.toString(),
            pageNumber: 1,
            pageSize: 5
        }
        this.recordsData = []
        this.getRecords()
        const { data: flowUpCount } = await getFlowUpCount({ bizId: this.threadDetail.id.toString() })
        if (flowUpCount.total) {
            this.flowUpCount = flowUpCount
        }
    }

    // 客户来源选择
    userSourceChange (value) {
        value == 3 && this.getCompanyList()
    }

    // 获取公司列表
    async getCompanyList () {
        const res = await companyList({})
        this.manufacturerOption = res.data
    }
    // 天眼查
    async tianyanchaSearchesList (query) {
        if (query !== '') {
            const res = await tianyanchaSearches({ word: query })
            this.oldCompanyNameOption = res.data.items
        } else {
            this.oldCompanyNameOption = []
        }
    }

    mounted () {
        this.getAreacode()
        // this.onGetbranch()
        this.onInitGetDate()
        this.stateN = this.threadDetail.customerName
        console.log(' 🚗 🚕 🚙 🚌 🚎 xiaoqiche ', this.threadDetail)
    }
}
</script>
<style lang='scss' scoped>
@import "./css/detail.scss";
</style>
