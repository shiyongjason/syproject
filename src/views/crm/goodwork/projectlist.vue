<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入项目名称" maxlength="70"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目提交时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入经销商" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">甲方名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.firstPartName" placeholder="请输入甲方名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">合作进度：</div>
                    <div class="query-col__input">
                        <el-select v-model="status" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="query-cont__col">
                    <div class="query-col__label">设备品类：</div>
                    <div class="query-col__input">
                        <el-select v-model="deviceCategoryChange" multiple collapse-tags placeholder="请选择" :clearable=true>
                            <el-option v-for="item in deviceList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">上游供应商类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="upstreamSupplierTypeChange" multiple collapse-tags placeholder="请选择" :clearable=true>
                            <el-option v-for="item in upstreamList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">预估借款时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartBorrow" :end-change="onEndBorrow" :options="borrowOptions">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">预估签约时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStarSign" :end-change="onEndSign" :options="signOptions">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目提交人：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.projectSubmitName" placeholder="请输入项目提交人" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="searchList()">
                        查询
                    </h-button>
                    <h-button @click="onRest()">
                        重置
                    </h-button>
                    <h-button @click="onExport" v-if="hosAuthCheck(Auths.CRM_GOODWORK_IMPORT)">
                        导出
                    </h-button>
                </div>
            </div>

            <el-tag size="medium" class="eltagtop">已筛选 {{projectData.total}} 项, 赊销总金额 {{loanData.totalLoanAmount?fundMoneys(loanData.totalLoanAmount):0}}, 设备款总额 {{loanData.totalDeviceAmount?fundMoneys(loanData.totalDeviceAmount):0}} 元 </el-tag>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total" @pagination="searchList"
                actionWidth='375' isAction :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange' prevLocalName="V4.*" localName="V3.*.18">
                <!--
                    Versions: V3.*.1
                    Time: 2020/10/22
                    Iteration: 好橙工会员中心十月优化版本
                -->
                <template slot="type" slot-scope="scope">
                    {{scope.data.row.type&&typeList[scope.data.row.type-1]['value']}}
                </template>
                <template slot="progress" slot-scope="scope">
                    {{onFiterStates(scope.data.row.status).length>0?onFiterStates(scope.data.row.status)[0].value:'-'}}
                </template>
                <template slot="projectSubmitName" slot-scope="scope">
                    <p>{{scope.data.row.projectSubmitName}}</p>
                    <p>{{scope.data.row.projectSubmitPhone}}</p>
                </template>
                <template slot="action" slot-scope="scope">
                    <!-- 1：待提交2：初审中 3：资料收集中 12：资料待审核 4：待立项 5：审核未通过 11：待终审 6：待签约 7：待放款 8：贷中 9：合作完成 10:信息待完善 -->
                    <template v-if="hosAuthCheck(Auths.CRM_SUBMIT_INFO)&&(scope.data.row.status!=2&&scope.data.row.status!=5&&scope.data.row.status!=10)">
                        <!--资料状态 1：待提交 2：已提交 3：审核通过 4：审核驳回-->
                        <h-button table @click="onEditproject(scope.data.row)" v-if="(scope.data.row.docAfterStatus!=2&&scope.data.row.docAfterStatus!=3)">提交资料</h-button>
                    </template>
                    <template v-if="hosAuthCheck(Auths.CRM_CHECKOUT_INFO)">
                        <h-button table @click="onCheckoutProject(scope.data.row)" v-if="!((scope.data.row.docAfterStatus!=2&&scope.data.row.docAfterStatus!=3)&&(scope.data.row.status!=2&&scope.data.row.status!=5&&scope.data.row.status!=10))">查看资料</h-button>
                    </template>
                    <h-button table @click="onLookproject(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_GOODWORK_DETAIL)">查看详情</h-button>
                    <h-button table @click="onLookrecord(scope.data.row,1)">审批记录</h-button>
                    <h-button table v-if="scope.data.row.pushRecord" @click="onLookrecord(scope.data.row,2)">打卡记录</h-button>
                </template>
            </hosJoyTable>

        </div>
        <projectDrawer :drawer=drawer :status=projectstatus @backEvent='restDrawer' ref="drawercom"></projectDrawer>
        <el-dialog :title="title" ref='recordDialog' :visible.sync="dialogVisible" width="30%" :before-close="()=>onCloneRecordDialog()" v-if="dialogVisible">
            <div class="project-record" v-if="title=='项目审批记录'"  @scroll="recordsScroll">
                <div class="radio-group" style="margin-bottom:20px">
                    <el-radio-group v-model="radio" @change="()=>onTabRadio()">
                        <el-radio-button label="审批记录"></el-radio-button>
                        <el-radio-button label="跟进记录"></el-radio-button>
                    </el-radio-group>
                </div>
                <el-timeline v-if="radio==='审批记录'">
                    <el-timeline-item :timestamp="item.createTime" placement="top" v-for="item in dialogRecord" :key=item.id>
                        <el-card>
                            <p><span>操作人：</span> {{item.createBy}}{{item.createByMobile?'('+item.createByMobile+')':''}}</p>
                            <p><span>说明内容：</span> {{item.remark}}</p>
                            <p><span>附件：</span>{{getAttachment(item.attachment).length>0?'':'-'}}</p>
                            <span v-for="(item,index) in getAttachment(item.attachment)" :key="index" class="posrtv">
                                <template v-if="item&&item.fileUrl">
                                    <i class="el-icon-document"></i>
                                    <downloadFileAddToken isPreview :file-name="item.fileName" :file-url="item.fileUrl" :a-link-words="item.fileName" is-type="main" />
                                </template>
                            </span>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
                <div v-if="radio==='跟进记录'">
                    <div class="flowup-count">
                        <h-button type='assist' @click='add'> + 新增跟进记录</h-button>
                        <span>
                            累计跟进{{flowUpCount.total}}次，当面拜访{{flowUpCount.directCount}}次
                        </span>
                    </div>
                    <div style="margin-top:20px">
                        <b>跟进动态</b>
                    </div>
                    <div v-if="!recordsData.length" style="width: 600px;margin: 10px auto;"><el-divider>暂无跟进记录</el-divider></div>
                    <div v-else class="follow-records" ref='records'>
                        <div class="follow-cell" v-for="(item,index) in recordsData" :key="index">
                            <div class="info"><img :src="item.createAvatar||userDefault" class="avatar">
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
                                    <div class='audio-player-container' v-if="item.flowUpDynamic.msgContent&&item.flowUpDynamic.msgContent.osspath">
                                        <div class="crm-audio-player" >
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
                                    <div class='desc-link' >《{{item.flowUpDynamic.msgContent.title ? item.flowUpDynamic.msgContent.title : '查看链接'}}》</div>
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
                                    <div class="title-tag" style="margin-top:20px">{{flowUpTypes[item.type]}}</div>
                                    <div class="audio-player-container">
                                       <template v-if="item.picUrls&&item.picUrls.length">{{item.type ==1?'现场图片：':'附件：'}}</template>
                                        <div class="crm-audio-player" style="margin-top:-15px">
                                            <OssFileHosjoyUpload :showUpload='false' :showPreView='true'  v-model="item.picUrls" :fileNum=8 :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px"/>
                                        </div>
                                    </div>
                                    <div class="title-tag" v-if="item.content">跟进内容</div>
                                    <div class="desc" v-if="item.content">{{item.content}}</div>
                                    <div class="title-tag" v-if="item.nextFlowTime">下次跟进时间</div>
                                    <div class="desc" v-if="item.nextFlowTime">{{item.nextFlowTime | formatDate('YYYY/MM/DD HH:mm')}}</div>
                                    <div class="title-tag" v-if="item.remark&&(item.type==1||item.type==2)">其他备注</div>
                                    <div class="desc" v-if="item.remark&&(item.type==1||item.type==2)">{{item.remark}}</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="isNoMore" style="width: 80%;margin: 10px auto;"><el-divider>没有更多</el-divider></div>
                    </div>
                </div>
            </div>
            <div class="project-plant" v-if="title=='工地打卡记录'">
                <div class="plantimg" @click="onHandlePictureCardPreview(item)" v-for="(item,index) in plantList" :key="index">
                    <img :src="item.punchImageUrl" alt="">
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <h-button @click="()=>onCloneRecordDialog()">取消</h-button>
            </span>
        </el-dialog>
        <el-dialog title="预览" :visible.sync="imgVisible">
            <div class="previewimg">
                <img :src="dialogImageUrl" alt="">
            </div>
        </el-dialog>
        <!-- 添加跟进记录 -->
            <el-dialog title="添加跟进记录" class="record-dialog" :visible.sync="addRecord" :modal='false' width="800px" :before-close="()=>closeAddRecord()" :close-on-click-modal='false' >
                <div class="record-layout" style="height:444px;overflow-y: scroll;">
                    <div class="header-title">
                        <el-radio v-model="flowUpRequest.type" :label="1">当面拜访</el-radio>
                        <el-radio v-model="flowUpRequest.type" :label="2">电话/微信沟通/邮件等</el-radio>
                        <p class="tips" v-if="flowUpRequest.type==2">温馨提示：推荐使用企业微信与客户聊天，自动更新记录，更方便。</p>
                    </div>
                    <div style="margin-top:-10px">
                        <el-form :rules="addFlowUpRules" :model="flowUpRequest" ref="addFlowUp" :validate-on-rule-change='false' v-if="reCreate">
                            <div class="record-dialog-item" v-if="flowUpRequest.type == 1">
                                <el-form-item  prop='picUrls' label="上传现场图片："></el-form-item>
                                <div>
                                    <OssFileHosjoyUpload :showPreView='true'  v-model="flowUpRequest.picUrls" :fileNum=20 :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".jpg,.jpeg,.png" @successCb='onSuccessCb' delTips='是否确认删除现场照片，删除后无法恢复'>
                                    <div class="a-line">
                                        <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                                    </div>
                                    </OssFileHosjoyUpload>
                                </div>
                            </div>

                            <div class="record-dialog-item" style="margin-top:10px">
                                <el-form-item  prop='content' label="跟进内容："  class="textarea">
                                    <el-input v-model="flowUpRequest.content" placeholder="请输入此次跟进结果/下次跟进事项" style="width:380px;" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop="nextFlowTime"  label="下次跟进时间："  class="textarea">
                                    <el-date-picker v-model="flowUpRequest.nextFlowTime" type="datetime" value-format='yyyy-MM-ddTHH:mm' format='yyyy-MM-dd HH:mm'  placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </div>

                            <div class="record-dialog-item" v-if="flowUpRequest.type != 1">
                                <el-form-item label="附件（不超过8个）："></el-form-item>
                                <div>
                                    <OssFileHosjoyUpload :showPreView='true'  v-model="flowUpRequest.picUrls" :fileNum=8 :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px">
                                    <div class="a-line">
                                        <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                                    </div>
                                    </OssFileHosjoyUpload>
                                </div>
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
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
import filters from '@/utils/filters.js'
import projectDrawer from './components/projectDrawer'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { TYPE_LIST, PROCESS_LIST, STATUS_LIST, DEVICE_LIST, UPSTREAM_LIST } from '../const'
import * as Auths from '@/utils/auth_const'
import OssFileUtils from '@/utils/OssFileUtils'
import { interfaceUrl, ccpBaseUrl } from '@/api/config'
import downloadFileAddToken from '@/components/downloadFileAddToken'
import { USER_DEFAULT } from '@/views/crm/projectList2_0/const/index'
import { getFlowUp, addFlowUp, getFlowUpCount } from '@/views/crm/projectList2_0/api/index'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'

const _flowUpRequest = {
    assistantRemark: '', // 协助内容
    assistants: [], // (2.0项目)协助人员列表
    bizId: '',
    bizType: 3, // 事件类型 1：线索 2：客户 3：1.0项目 4: 2.0项目
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
    type: 2 // 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
}
export default {
    name: 'projectlist',
    data () {
        return {
            flowUpTypes: {
                1: '当面拜访',
                2: '电话/微信沟通/邮件等',
                5: '已接受协助申请',
                6: '已拒绝协助申请'
            },
            reCreate: true,
            process: [],
            companyId: '',
            companyCode: '',
            action: ccpBaseUrl + 'common/files/upload-old',
            projectId: '',
            companyContactList: [],
            companyContactListBak: [],
            employeeList: [],
            userDefault: USER_DEFAULT,
            isNoMore: false,
            addRecord: false,
            // 选择联系人 弹窗
            innerContactVisible: false,
            // 邀请同事协助 弹窗
            innerHelpVisible: false,
            radioContact: false,
            flowUpCount: {
                directCount: '',
                total: ''
            },
            recordsQuery: {
                bizId: '',
                pageNumber: 1,
                pageSize: 5
            },
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            flowUpRequest: JSON.parse(JSON.stringify(_flowUpRequest)),
            recordsData: [],
            recordsPagination: '',
            radio: '审批记录',
            Auths,
            projectstatus: 0, // 项目状态字段
            categoryIdArr: [],
            branchArr: [],
            deviceCategoryChange: [],
            upstreamSupplierTypeChange: [],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                firstPartName: '',
                maxSubmitTime: '',
                maxUpdateTime: '',
                minSubmitTime: '',
                minUpdateTime: '',
                upstreamSupplierType: '', // 供应商类型
                deviceCategory: '', // 设备品类
                minEstimatedLoanTime: '', // 最小预估借款时间
                maxEstimatedLoanTime: '', // 最小预估借款时间
                minEstimateSignTime: '',
                maxEstimateSignTime: '',
                statusList: '',
                projectName: '',
                projectNo: '',
                typeList: '',
                originType: 1,
                deptDoc: '',
                jobNumber: '',
                authCode: '',
                'sort.direction': null,
                'sort.property': null,
                projectSubmitName: ''
                // field: '', // 排序字段 赊销总额：predict_loan_amount 项目合同总额：contract_amount 设备总额：device_amount 预估借款时间：estimated_loan_time 提交时间：submit_time 更新时间：update_time
                // isAsc: ''// 排序方式 是否升序 true：是 false：否
            },
            status: [],
            typeArr: [],
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            middleStatus: 0, // 0无文件 1有文件已提交 2有文件未提交
            tableLabel: [
                { label: '项目名称', prop: 'projectName', width: '150', showOverflowTooltip: true },
                { label: '项目地址', prop: 'address', width: '150', showOverflowTooltip: true },
                { label: '项目编号', prop: 'projectNo', width: '150', showOverflowTooltip: true },
                { label: '所属分部', prop: 'deptName', width: '150', showOverflowTooltip: true },
                { label: '项目提交人',
                    prop: 'projectSubmitName',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.projectSubmitName || '-'}<br/>{scope.row.projectSubmitPhone}</span>
                    } },
                { label: '经销商', prop: 'companyName', width: '180', showOverflowTooltip: true },
                { label: '甲方名称', prop: 'firstPartName', width: '180', showOverflowTooltip: true },
                { label: '预估签约时间', prop: 'estimateSignTime', width: '150', displayAs: 'YYYY-MM-DD', showOverflowTooltip: true },
                { label: '项目类别', prop: 'type', width: '120', slot: 'type', showOverflowTooltip: true },
                // { label: '工程项目进度', prop: 'progress', width: '120', slot: 'progress' },
                { label: '工程项目进度', prop: 'progress', width: '120', dicData: [{ value: 1, label: '项目跟踪阶段' }, { value: 2, label: '招投标' }, { value: 3, label: '合同已签订' }, { value: 4, label: '项目已开工' }] },
                { label: '项目合同总额', prop: 'contractAmount', width: '150', displayAs: 'money', sortable: 'custom' },
                { label: '设备总额', prop: 'deviceAmount', width: '150', displayAs: 'money', sortable: 'custom' },
                { label: '赊销总额', prop: 'predictLoanAmount', width: '150', displayAs: 'money', sortable: 'custom' },
                { label: '设备品类', prop: 'deviceCategory', showOverflowTooltip: true, width: '100', dicData: [{ value: 1, label: '空调' }, { value: 2, label: '采暖' }, { value: 3, label: '新风' }, { value: 4, label: '净水' }, { value: 5, label: '智能化' }, { value: 6, label: '辅材' }, { value: 7, label: '电梯' }, { value: 8, label: '其他' }, { value: 9, label: '电器' }, { value: 10, label: '热水器' }] },
                { label: '设备品牌', prop: 'deviceBrand', showOverflowTooltip: true, width: '150' },
                { label: '上游供应商类型', prop: 'upstreamSupplierType', showOverflowTooltip: true, width: '180', dicData: [{ value: 1, label: '厂商' }, { value: 2, label: '代理商' }, { value: 3, label: '经销商' }] },
                { label: '上游供应商名称', prop: 'upstreamSupplierName', showOverflowTooltip: true, width: '180' },
                { label: '上游接受付款方式', prop: 'upstreamPayType', showOverflowTooltip: true, width: '180', dicData: [{ value: 1, label: '银行转账' }, { value: 2, label: '承兑' }, { value: '1,2', label: '银行转账+承兑' }] },
                {
                    label: '上游接受付款周期',
                    prop: 'upstreamPromiseMonth',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.upstreamPromiseMonth ? `${scope.row.upstreamPromiseMonth}个月` : '-'}</span>
                    },
                    showOverflowTooltip: true
                },
                { label: '预估借款时间', prop: 'estimatedLoanTime', width: '150', displayAs: 'YYYY-MM-DD', sortable: 'custom', showOverflowTooltip: true },
                { label: '预估赊销周期', prop: 'loanMonth', width: '150', unit: '个月' },
                {
                    label: '工程项目回款方式',
                    children: [
                        { label: '首付款比例', prop: 'advancePaymentProportion', width: '100', unit: '%' },
                        { label: '货到付款比例', prop: 'deliveryPaymentProportion', width: '100', unit: '%' },
                        { label: '安装进度款比例', prop: 'installProgressPaymentProportion', width: '130', unit: '%' },
                        { label: '验收款比例', prop: 'acceptancePaymentProportion', width: '100', unit: '%' },
                        { label: '交付款比例', prop: 'realPaymentProportion', width: '100', unit: '%' },
                        { label: '审计结算款比例', prop: 'auditCalculationPaymentProportion', width: '150', unit: '%' },
                        { label: '其他', prop: 'payOtherText', width: '150', showOverflowTooltip: true }
                    ],
                    showOverflowTooltip: true
                },
                {
                    label: '合作进度',
                    prop: 'status',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.status ? this.getStatusList(scope.row.status, scope.row.docProgress).value : '-'}</span>
                    },
                    showOverflowTooltip: true
                },
                { label: '项目提交时间', prop: 'submitTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm:ss', sortable: 'custom', showOverflowTooltip: true },
                { label: '更新时间', prop: 'updateTime', width: '150', displayAs: 'YYYY-MM-DD HH:mm:ss', sortable: 'custom', showOverflowTooltip: true },
                {
                    label: '项目资料',
                    prop: 'docAfterStatus',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{this.getProjectDateForList(scope.row.docAfterStatus, scope.row.projectDocCount || 0, scope.row.templateCount || 0)}</span>
                    },
                    showOverflowTooltip: true
                }
            ],
            rowKey: '',
            multiSelection: [],
            drawer: false,
            typeList: TYPE_LIST,
            processList: PROCESS_LIST,
            statusList: STATUS_LIST,
            deviceList: DEVICE_LIST,
            upstreamList: UPSTREAM_LIST,
            loanData: {},
            dialogVisible: false,
            dialogRecord: [],
            title: '',
            imgVisible: false,
            dialogImageUrl: '',
            plantList: []
        }
    },
    components: {
        projectDrawer, hosJoyTable, downloadFileAddToken, OssFileHosjoyUpload
    },
    watch: {
        'flowUpRequest.type' (val) {
            this.flowUpRequest = JSON.parse(JSON.stringify(_flowUpRequest))
            this.flowUpRequest.type = val
            this.$refs['addFlowUp'] && this.$refs['addFlowUp'].clearValidate()
            this.reCreate = false
            setTimeout(() => {
                this.reCreate = true
            }, 0)
        }
    },
    computed: {
        addFlowUpRules () {
            let rules = {
                picUrls: [{ required: !!this.flowUpRequest.type == 1, message: '必填项不能为空' }],
                content: [{ required: true, message: '必填项不能为空' }]
            }
            return rules
        },
        options () {
            return {
                valueFormat: 'yyyy-MM-dd HH:mm',
                format: 'yyyy-MM-dd HH:mm',
                type: 'datetime',
                startTime: this.queryParams.minSubmitTime,
                endTime: this.queryParams.maxSubmitTime
            }
        },
        borrowOptions () {
            return {
                valueFormat: 'yyyy-MM-dd',
                format: 'yyyy-MM-dd',
                type: 'date',
                startTime: this.queryParams.minEstimatedLoanTime,
                endTime: this.queryParams.maxEstimatedLoanTime
            }
        },
        signOptions () {
            return {
                valueFormat: 'yyyy-MM-dd',
                format: 'yyyy-MM-dd',
                type: 'date',
                startTime: this.queryParams.minEstimateSignTime,
                endTime: this.queryParams.maxEstimateSignTime
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            projectData: 'crmmanage/projectData',
            projectLoan: 'crmmanage/projectLoan',
            crmdepList: 'crmmanage/crmdepList',
            punchList: 'crmmanage/punchList',
            projectRecord: 'crmmanage/projectRecord'
        })
    },
    async mounted () {
        if (this.$route.query.detail) {
            this.queryParams.projectNo = this.$route.query.projectNo
        }
        this.queryParams.jobNumber = this.userInfo.jobNumber
        this.queryParams.authCode = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
        this.searchList()
        this.copyParams = deepCopy(this.queryParams)
        this.onGetbranch()
    },
    methods: {
        ...mapActions({
            findProjetpage: 'crmmanage/findProjetpage',
            findProjectLoan: 'crmmanage/findProjectLoan',
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findProjectrecord: 'crmmanage/findProjectrecord',
            findPunchlist: 'crmmanage/findPunchlist'
        }),
        onSuccessCb () {
            this.$refs['addFlowUp'].fields.map(i => {
                if (i.prop === 'picUrls') {
                    i.clearValidate()
                }
            })
        },
        async onSubmitAddRecord () {
            this.$refs['addFlowUp'].validate(async (value, r) => {
                if (value) {
                    this.flowUpRequest.createBy = this.userInfo.employeeName
                    this.flowUpRequest.createPhone = this.userInfo.phoneNumber
                    let query = JSON.parse(JSON.stringify(this.flowUpRequest))
                    if (this.flowUpRequest.picUrls) {
                        let picUrls = []
                        this.flowUpRequest.picUrls.map(item => {
                            picUrls.push(item.fileUrl)
                        })
                        query.picUrls = picUrls
                    }
                    query.bizId = this.projectId
                    await addFlowUp(query)
                    this.$message.success('新增成功')
                    this.recordsQuery = {
                        bizId: this.projectId,
                        pageNumber: 1,
                        pageSize: 5
                    }
                    this.recordsData = []
                    await this.getRecords()
                    const { data: flowUpCount } = await getFlowUpCount({ bizId: this.projectId })
                    this.flowUpCount = flowUpCount
                    this.closeAddRecord()
                } else {
                    this.$nextTick(() => {
                        const dom = document.querySelector('.is-error')
                        dom.scrollIntoView()
                    })
                }
            }
            )
        },
        onCloneRecordDialog () {
            this.radio = '审批记录'
            this.dialogVisible = false
            this.flowUpCount = {
                directCount: '',
                total: ''
            }
            this.recordsQuery = {
                bizId: this.projectId,
                pageNumber: 1,
                pageSize: 5
            }
            this.recordsData = []
        },
        // 关闭新增跟进记录
        closeAddRecord () {
            // @ts-ignore
            this.$refs['addFlowUp'].resetFields()
            this.addRecord = false
            this.flowUpRequest = JSON.parse(JSON.stringify(_flowUpRequest))
        },
        // 跟进记录
        async getRecords () {
            if (this.recordsPagination && Number(this.recordsQuery.pageNumber) > Number(this.recordsPagination)) {
                this.isNoMore = true
                return
            }
            this.recordsQuery.bizId = this.projectId
            const { data: flowUp } = await getFlowUp(this.recordsQuery)
            this.recordsPagination = flowUp.pages
            this.recordsData = [...this.recordsData, ...flowUp.records]
            if (flowUp.total < this.recordsQuery.pageSize) {
                this.isNoMore = true
            }
            this.recordsData.map(async (item, index) => {
                if (item.picUrls) {
                    let api = []
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
                    item.picUrls = obj
                }
            })
            console.log(' 🚗 🚕 🚙 🚌 🚎 recordsData', this.recordsData)
        },
        recordsScroll (event) {
            if (this.radio === '审批记录') {
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
        },
        async onTabRadio (val) {
            console.log('🚀 --- onTabRadio --- val', val)
            const { data: flowUpCount } = await getFlowUpCount({ bizId: this.projectId })
            this.flowUpCount = flowUpCount
            if (this.radio === '跟进记录') {
                this.recordsQuery = {
                    bizId: this.projectId,
                    pageNumber: 1,
                    pageSize: 5
                }
                this.recordsData = []
                this.getRecords()
            }
        },
        async add () {
            this.addRecord = true
        },
        getProject2FollowUpProcess (status) {
            for (let key in this.flowUpProcess) {
                const statusInfo = this.flowUpProcess[key]
                if (statusInfo.key == status) {
                    return statusInfo // {key: "7" value: "无需跟进"}
                }
            }
            return { value: '', key: '' }
        },
        onStartChange (val) {
            this.queryParams.minSubmitTime = val
        },
        onEndChange (val) {
            this.queryParams.maxSubmitTime = val
        },
        onStartBorrow (val) {
            this.queryParams.minEstimatedLoanTime = val
        },
        onEndBorrow (val) {
            this.queryParams.maxEstimatedLoanTime = val
        },
        onStarSign (val) {
            this.queryParams.minEstimateSignTime = val
        },
        onEndSign (val) {
            this.queryParams.maxEstimateSignTime = val
        },
        onEditproject (row) {
            this.$router.push({ path: '/goodwork/informationDetail', query: { projectId: row.id, status: row.status, docAfterStatus: row.docAfterStatus } })
        },
        onCheckoutProject (row) {
            this.$router.push({ path: '/goodwork/approvalDetails', query: { projectId: row.id, status: row.status, docAfterStatus: row.docAfterStatus } })
        },
        getProjectDateForList (type, pDocCount, tempCount) {
            // 资料审核状态type 1：待提交 2：已提交 3：审核通过 4：审核驳回
            let content = null
            switch (type) {
                case 1:
                    content = `待提交(${pDocCount}/${tempCount})`
                    break
                case 2:
                    content = '已提交'
                    break
                case 3:
                    content = '已通过'
                    break
                case 4:
                    content = '已打回'
                    break
            }
            return content
        },
        getAttachment (item) {
            if (item) {
                let arr = JSON.parse(item)
                return arr
            } else {
                return []
            }
        },
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无数据可导出！')
            } else {
                this.queryParams.statusList = this.status.toString()
                this.queryParams.typeList = this.typeArr.toString()
                this.queryParams.deviceCategoryList = this.deviceCategoryChange.toString()
                this.queryParams.upstreamSupplierTypeList = this.upstreamSupplierTypeChange.toString()
                let url = ''
                for (const key in this.queryParams) {
                    if (this.queryParams[key]) {
                        url += (`${key}=${this.queryParams[key]}&`)
                    }
                }
                console.log(url)
                window.location = interfaceUrl + 'memeber/openapi/project/export?' + url
            }
        },
        getStatusList (key, docProgress) {
            const map = STATUS_LIST.reduce((res, item) => {
                res[item.key] = item
                return res
            }, {})
            if (key == 3) {
                let label = docProgress == null ? map[key].value : `${map[key].value}进度：${this.$multipliedBy(docProgress, 100)}%`
                return { value: label }
            } else {
                return map[key] || { value: '-' }
            }
        },
        onSortChange (val) {

        },
        sortChange (val) {
            if (val.order) {
                this.queryParams['sort.direction'] = val.order === 'descending' ? 'DESC' : 'ASC'
                this.queryParams['sort.property'] = val.prop
            } else {
                delete this.queryParams['sort.direction']
                delete this.queryParams['sort.property']
            }
            this.searchList()
        },
        fundMoneys (val) {
            if (val) {
                return filters.money(val)
            }
        },
        onFiterStates (val) {
            return this.statusList.filter((v) => {
                return v.key == val
            })
        },
        onRest () {
            this.categoryIdArr = []
            this.queryParams = deepCopy(this.copyParams)
            if (this.$route.query.detail) {
                this.queryParams.projectNo = ''
            }
            this.status = []
            this.typeArr = []
            this.deviceCategoryChange = []
            this.upstreamSupplierTypeChange = []
            console.log(this.queryParams)
            this.searchList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        productCategoryChange (val) {
            this.queryParams.categoryId = val
        },
        async searchList () {
            console.log(this.queryParams)
            this.queryParams.statusList = this.status.toString()
            this.queryParams.typeList = this.typeArr.toString()
            this.queryParams.deviceCategoryList = this.deviceCategoryChange.toString()
            this.queryParams.upstreamSupplierTypeList = this.upstreamSupplierTypeChange.toString()
            const { ...params } = this.queryParams
            console.log(params)
            await this.findProjetpage(params)
            this.tableData = this.projectData.records || []
            this.paginationInfo = {
                pageNumber: this.projectData.current,
                pageSize: this.projectData.size,
                total: this.projectData.total
            }
            await this.findProjectLoan(params)
            this.loanData = this.projectLoan ? this.projectLoan : ''
        },
        onLookproject (val) {
            console.log('val: ', val.status)
            this.drawer = true
            this.projectstatus = val.status
            this.$refs.drawercom.onFindProjectCom(val.id)
        },
        restDrawer () {
            this.drawer = false
            this.searchList()
        },
        async onLookrecord (val, type) {
            console.log('🚀 --- onLookrecord --- val', val)
            this.companyCode = val.companyCode
            this.projectId = val.id
            this.companyId = val.companyId
            if (type == 1) {
                this.title = '项目审批记录'
                await this.findProjectrecord(val.id)
                this.dialogRecord = this.projectRecord
            } else {
                this.title = '工地打卡记录'
                await this.findPunchlist({ projectId: val.id })
                this.plantList = this.punchList
            }

            this.dialogVisible = true
            console.log('recordDialog', this.$refs.recordDialog)
        },
        onHandlePictureCardPreview (val) {
            this.dialogImageUrl = val.punchImageUrl
            this.imgVisible = true
        },
        async onGetbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: JSON.parse(sessionStorage.getItem('authCode')) })
            this.branchArr = this.crmdepList
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/::-webkit-scrollbar-thumb {
    background-color: #d6d1d1 !important;
}
.tips{
    margin-top:5px;
}
.flowup-count{
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #ff7a45;
            box-sizing: border-box;
            padding-right: 25px;
        }
/deep/.a-line{
    span{
        display: flex;
        align-items: center;
    }
}
.file-icon {
        font-size: 18px;
        margin: 0 3px 0 0  !important;
        line-height: 24px !important;
        color: #fff;
    }
    .file_box {
        margin: 10px 0 0 0;
        display: flex;
        i {
            font-size: 18px;
            margin: 0 !important;
            color: #ff6600;
            padding-right: 5px;
        }
        span {
            width: 450px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #ff6600;

        }
        em {
            display: block;
            font-style: normal;
            margin-left: 10px;
            color: #169bd5;
            cursor: pointer;

        }
    }
.record-dialog-item{
        margin-bottom: 20px;
        .el-input:not(:first-child){
            margin-left: 0;
        }
        .textarea{
            .el-form-item__content{
                display: flex;
            }
        }
    }
.follow-records{
            margin-top: 10px;
        }
        .follow-cell {

            .info {
                display: flex;
                flex-direction: row;

                .avatar {
                    width: 36px;
                    height: 36px;
                    margin: 0px 10px 0 16px;

                }

                .name-container {
                    flex: 1;

                    .follow-tag {
                        height: 21px;
                        font-size: 16px;
                        font-weight: 400;
                        color: #000000;
                        line-height: 22px;
                    }

                    .name {
                        margin-top: 2px;
                        width: 120px;
                        height: 16px;
                        font-size: 12px;
                        font-weight: 400;
                        color: #666666;
                        line-height: 17px;
                    }
                }

                .time {
                    align-self: flex-start;
                    height: 16px;
                    font-size: 12px;
                    font-weight: 400;
                    color: #666666;
                    line-height: 17px;
                    margin-right: 16px;
                }
            }

            .content-container {
                display: flex;
                flex-direction: row;
                margin: 11px 16px;

                .line {
                    width: 1px;
                    background: #E1E1E3;
                    margin: 0 50px 0 18px;
                }

                .content {
                    flex: 1;
                    padding-bottom: 18px;
                    .title-tag {
                        height: 21px;
                        font-size: 14px;
                        font-weight: 400;
                        color: #000000;
                        line-height: 20px;
                        margin-top: 10px;
                    }

                    .audio-player-container {
                        margin: 8px 0;
                    }

                    .watch-audio-text {
                        margin: 8px 0;
                        height: 16px;
                        font-size: 13px;
                        font-weight: 500;
                        color: #FF7A45;
                        line-height: 18px;
                    }

                    .desc {
                        font-size: 13px;
                        font-weight: 400;
                        color: #666666;
                        line-height: 18px;
                        padding: 4px 0;
                    }
                }
            }

        }
.posrtv {
    position: relative;
    margin-right: 15px;
    color: #ff7a45;
}
.posrtv a {
    color: #ff7a45;
    margin-left: 10px;
}
.abs {
    position: absolute;
    right: -11px;
    top: -7px;
    display: none;
    i {
        font-size: 18px;
        color: #5d5d5d;
        cursor: pointer;
    }
}
.posrtv:hover .abs {
    display: block;
}
.colred {
    color: #ff7a45;
}
.colgry {
    color: #ccc;
}
.eltagtop {
    margin-bottom: 10px;
}
.colblue {
    color: #50b7f7;
    cursor: pointer;
}
.project-record {
    padding: 10px 0;
    height: 400px;
    overflow-y: scroll;
    /deep/ .el-card__body {
        padding: 5px;
        span {
            color: grey;
        }
    }
}
.project-plant {
    display: flex;
    flex-wrap: wrap;
    .plantimg {
        margin: 5px;
        width: 95px;
        height: 95px;
        overflow: hidden;
        img {
            width: 95px;
            height: 100%;
        }
    }
}
.previewimg {
    text-align: center;
    img {
        width: 500px;
        padding: 10px;
    }
}
/deep/.query-cont__col .query-col__input .el-input {
    width: 150px;
}
/deep/.el-table__row > span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
