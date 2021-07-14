<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont ">
            <span>会员信息</span>
        </div>
        <div class="page-body-cont-top ">
            <img style="height: 4rem " :src="decodeURIComponent(this.$route.query.avatarUrl)">
            <div class="top-box">
                <span>{{decodeURIComponent(this.$route.query.nickName)}} </span>
                <span>手机号 ：{{this.$route.query.phone}} </span>
            </div>
            <div class="top-box-right">
                <span style="margin-left: 1rem;margin-bottom:10px">注册时间： {{new Date(decodeURIComponent(this.$route.query.createTime)).toLocaleString()}} </span>
                <span style="margin-left: 1rem;margin-bottom:10px">注册来源： {{this.$route.query.source==='1'?'  自主注册':'  好友推荐'}}</span>
                <span style="margin-left: 1rem;margin-bottom:10px">会员编号： {{this.$route.query.uuid}}</span>
                <span style="margin-left: 1rem;margin-bottom:10px">会员标签： <span class="choice-tag" @click="showDliag()"> {{showTag}} </span></span>
            </div>
        </div>
        <div class="page-body-cont query-cont">
            <el-tabs v-model="tabIndex" type="card" @tab-click="handleClick">
                <el-tab-pane label="购买记录" name="0">
                    <el-tag size="medium" class="eltagtop">
                        合计 共购买 {{tableBuyData.length}}种商品；
                        累计购买订单数：{{tableBuyTotalData.totalOrderCount}}笔；
                        累计购买件数：{{tableBuyTotalData.totalProductCount}}件；
                        累计购买金额：{{tableBuyTotalData.totalOrderAmount}}元；
                    </el-tag>
                    <div class="page-body-cont">
                        <!-- 表格使用老毕的组件 -->
                        <basicTable :tableLabel="tableBuyLabel" :tableData="tableBuyData" :isShowIndex='true'
                                    :pagination="paginationBuy" @onCurrentChange='onCurrentChange'
                                    @onSizeChange='onSizeChange' :isAction="true">
                            <template slot="action" slot-scope="scope">
                                <el-button class="orangeBtn" @click="goToDetail(scope.data.row)">查看明细</el-button>
                            </template>
                        </basicTable>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已注册" name="1">
                    <div class="page-body-cont">
                        <!-- 表格使用老毕的组件 -->
                        <basicTable :tableLabel="tableRegisterLabel" :tableData="tableRegisterData" :isShowIndex='true'
                                    :pagination="paginationRegister" @onCurrentChange='onCurrentChange'
                                    @onSizeChange='onSizeChange' :isAction="false">
                        </basicTable>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已成交" name="2">
                    <div class="page-body-cont">
                        <!-- 表格使用老毕的组件 -->
                        <basicTable :tableLabel="tableDoneLabel" :tableData="tableDoneData" :isShowIndex='true'
                                    :pagination="paginationDone" @onCurrentChange='onCurrentChange'
                                    @onSizeChange='onSizeChange' :isAction="true">
                            <template slot="rewardAmount" slot-scope="scope">

                                <p @click="onEditMoney(scope.data.row)" class="colred">
                                    {{scope.data.row.rewardAmount}}</p>
                            </template>
                            <template slot="rewardMonth" slot-scope="scope">
                                <p @click="onEditMonth(scope.data.row)" class="colred">
                                    {{scope.data.row.rewardMonth}}</p>
                            </template>
                            <template slot="action" slot-scope="scope">
                                <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                            </template>
                        </basicTable>
                        <el-button type="primary" class="ml20" @click="onExport()">导入订单</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="会员变更记录" name="3">
                    <div class="page-body-cont">
                        <!-- 表格使用老毕的组件 -->
                        <basicTable :tableLabel="tableChangeList" :tableData="tableChangeData" :isShowIndex='false'
                                    :pagination="paginationChange" @onCurrentChange='onCurrentChange'
                                    @onSizeChange='onSizeChange' :isAction="false">
                        </basicTable>
                    </div>
                </el-tab-pane>
                <el-tab-pane class="page-body-cont-enterprise" label="企业信息" name="4">
                    <div class="page-body-cont-enterprise-info" v-if="this.enterpriseInfoData.id!=null">
                        <span style="margin-bottom: 20px">公司名称： {{this.enterpriseInfoData.companyName}} </span>
                        <span style="margin-bottom: 20px">经营区域： {{this.enterpriseInfoData.provinceName+this.enterpriseInfoData.cityName}}</span>
                        <span style="margin-bottom: 20px">门店地址： {{this.enterpriseInfoData.contactAddress}}</span>
                        <span style="margin-bottom: 20px">联系人姓名： {{this.enterpriseInfoData.contactUser}}</span>
                        <span style="margin-bottom: 20px">联系电话： {{this.enterpriseInfoData.contactNumber}}</span>
                        <span>经营类型：{{this.enterpriseInfoData.businessType===1? '零售商':this.enterpriseInfoData.businessType===2? '工程商':''}}</span>
                        <div class="page-body-cont-top-no-left">
                            <span>主营业务:</span>
                            <div v-if="this.enterpriseInfoData.respCompanyCommonTagBO!=null">
                                <el-tag style="margin-left: 20px"
                                        v-for="tag in this.enterpriseInfoData.respCompanyCommonTagBO.businessCommon"
                                        :key="tag" :type="tag.type">
                                    {{tag}}
                                </el-tag>
                            </div>
                            <div v-if="this.enterpriseInfoData.respCompanyCommonTagBO!=null">
                                <el-tag style="margin-left: 20px"
                                        v-for="tag in this.enterpriseInfoData.respCompanyCommonTagBO.businessOwn"
                                        :key="tag" :type="tag.type">
                                    {{tag}}
                                </el-tag>
                            </div>
                        </div>
                        <div class="page-body-cont-top-no-left">
                            <span>主营品牌:</span>
                            <div v-if="this.enterpriseInfoData.respCompanyCommonTagBO!=null">
                                <el-tag style="margin-left: 20px"
                                        v-for="tag in this.enterpriseInfoData.respCompanyCommonTagBO.brandsCommon"
                                        :key="tag" :type="tag.type">
                                    {{tag}}
                                </el-tag>
                                <el-tag style="margin-left: 20px"
                                        v-for="tag in this.enterpriseInfoData.respCompanyCommonTagBO.brandsOwn"
                                        :key="tag" :type="tag.type">
                                    {{tag}}
                                </el-tag>
                            </div>
                        </div>
                        <div class="page-body-cont-top-no-align-items">
                            <span>员工信息:  </span>
                            <basicTable :tableLabel="tableEmployeeLabel" :tableData="this.tableEmployeeData"
                                        :isShowIndex='false' :pagination="paginationChange"
                                        @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'
                                        :isAction="false">
                                <template slot="role" slot-scope="scope">
                                    {{scope.data.row.role===0?"管理员":"普通用户"}}
                                </template>
                            </basicTable>
                        </div>
                        <div class="page-body-cont-top-no-align-items">
                            <span>备注:</span>
                            <el-input class="textarea" type="textarea" maxlength=500 :rows="10" placeholder="请输入内容"
                                      @blur="updateCompanyInfoRemark" v-model="enterpriseInfoData.remark">
                            </el-input>
                        </div>
                    </div>
                    <div class="page-body-cont-enterprise-info-empty" v-show="this.enterpriseInfoData.id==null">暂无数据
                    </div>

                </el-tab-pane>
                <el-tab-pane label="沟通记录" name="5">
                    <el-button type="primary" class="ml20" @click="onAddCommunicationRecord()">+ 新增记录</el-button>
                    <div class="page-body-cont">
                        <basicTable :tableLabel="communicationTableLabel"
                                    :tableData="cloudMerchantMemberCommunicationList"
                                    :pagination="cloudMerchantMemberCommunicationListPagination" :isShowIndex='false'
                                    :isAction="true"  @onCurrentChange='onCommunicationCurrentChange' @onSizeChange='onCommunicationSizeChange'>
                            <template slot="action" slot-scope="scope">
                                <el-button class="orangeBtn" @click="onCommunicationRecordEdit(scope.data.row)">编辑
                                </el-button>
                                <el-button class="orangeBtn" @click="onCommunicationRecordDelete(scope.data.row)">删除
                                </el-button>
                            </template>
                        </basicTable>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="上传订单明细" :visible.sync="uploadShow" class="upload-show" width="800px"
                   :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-upload class="upload-fault" ref="upload" :file-list="fileList" :on-success="uploadSuccess"
                       :on-error="uploadError" :before-upload="beforeAvatarUpload" v-bind="uploadData">
                <el-button type="primary" slot="trigger">选择本地文件</el-button>
                <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                <p slot="tip" class="el-upload__tip">2.请按照订单明细模板内容导入数据，否则可能会出现导入异常</p>
            </el-upload>
            <div class="downloadExcel">
                <a href="/excelTemplate/订单明细模板.xlsx" download="订单明细模板.xls">下载订单明细模板</a>
            </div>
            <div style="color: red">{{errMessage}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
            </span>
            <el-dialog width="800px" title="上传结果" :visible.sync="errorShow" append-to-body>
                <div>
                    <span class="uploadTips">上传成功</span>
                </div>
            </el-dialog>
        </el-dialog>
        <el-dialog title="奖励归属月份编辑" :visible.sync="updateMonthShow" class="upload-show" width="400px"
                   :close-on-click-modal="false">
            <el-date-picker style="width: 200px" v-model="updateIndexData.rewardMonth" clear-icon="" type="month"
                            value-format='yyyy-MM' placeholder="" :picker-options="pickerOptionsStart">
            </el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editMonth(0)">取消</el-button>
                <el-button type="primary" @click="editMonth(1)">确认</el-button>
            </span>
        </el-dialog>
        <el-dialog title="选择标签" :modal-append-to-body=false :append-to-body=false :visible.sync="tagVisible"
                   width="50%">
            <div v-for="item in cloudMerchantTaglist" :key="item.id">
                <h1>{{item.tagCategory}}</h1>
                <div class="tag-cont">
                    <span :class="tagSelect(tag)" v-for="tag in item.tagDetailBos" :key="tag" @click="addTag(tag)">{{tag}}</span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addNewTag()">新增标签</el-button>
                <el-button @click="tagCancelSelect()">清除已选中的标签</el-button>
                <el-button @click="tagCancel()">取消</el-button>
                <el-button type="primary" @click="editConform()">确认</el-button>
            </span>
        </el-dialog>
        <el-dialog title="沟通内容编辑" :modal-append-to-body=false :append-to-body=false
                   :visible.sync="communicationRecordDialogVisible" width="50%" :close-on-click-modal="false">
            <el-form ref="communicationRecordForm" :model="communicationRecordForm"
                     :rules="communicationRecordFormRules" label-width="110px">
                <el-form-item label="沟通日期：" prop="communicationDate">
                    <el-date-picker type="date" v-model="communicationRecordForm.communicationDate" :clearable=false
                                    placeholder="沟通日期" value-format='yyyy-MM-dd'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="沟通结果：" prop="communicationResult">
                    <el-input v-model="communicationRecordForm.communicationResult" type="textarea"
                              :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入沟通结果" style="width:80%"
                              show-word-limit maxlength="250"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCommunicationRecordCancel()">取消</el-button>
                <el-button type="primary" @click="onCommunicationRecordConfirm()">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import {
    delInvitationOrder,
    downloadQuestionTemp,
    updateInvitationDetail,
    updateCompanyInfo,
    editMemberTag,
    addMemberTag,
    deleteCloudMerchantMemberCommunication,
    modifyCloudMerchantMemberCommunication,
    postCloudMerchantMemberCommunication
} from '../api'
import { iotUrl } from '@/api/config'
import axios from 'axios'

export default {
    name: 'merchantMemberInvitation',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                uuid: this.$route.query.uuid
            },
            tagStringList: [], // 用于编辑的tags列表
            showTagStringList: [], // 用于展示的tags列表
            updateMonthShow: false,
            updateIndexData: {},
            searchParams: {},
            tableRegisterData: [],
            tableBuyData: [],
            tableBuyTotalData: { totalOrderCount: 0, totalProductCount: 0, totalOrderAmount: 0 },
            enterpriseInfoData: {
                respCompanyCommonTagBO: { businessCommon: [], businessOwn: [], brandsCommon: [], brandsOwn: [] },
                remark: ''
            },
            tableChangeData: [],
            tableDoneData: [],
            inputMoney: '',
            inputMonth: '',
            paginationDone: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tagVisible: false,
            textarea: '',
            paginationRegister: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            paginationBuy: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            paginationChange: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableRegisterLabel: [
                { label: '邀请人手机号', prop: 'invitePhone' },
                { label: '被邀请人昵称', prop: 'nickName', width: '220px' },
                { label: '被邀请人手机号', prop: 'phone' },
                { label: '注册时间', prop: 'createTime', formatters: 'dateTime' }
            ],
            tableEmployeeData: [],
            tableEmployeeLabel: [
                { label: '角色', prop: 'role' },
                { label: '员工微信昵称', prop: 'nickName', width: '220px' },
                { label: '员工真实姓名', prop: 'remark', width: '220px' },
                { label: '员工手机号', prop: 'phone', width: '220px' }
            ],
            tableBuyLabel: [
                { label: '品类', prop: 'categoryName' },
                { label: '型号', prop: 'specificationName', width: '220px' },
                { label: '商品名称', prop: 'productName' },
                { label: '最近一次购买时间', prop: 'lastOrderTime', formatters: 'dateTime' },
                { label: '累计购买订单数', prop: 'orderCount' },
                { label: '累计购买件数', prop: 'productCount' },
                { label: '累计购买金额', prop: 'orderAmount' },
                { label: '预计补货时间', prop: 'replenishmentTime', formatters: 'dateTime' }
            ],
            tableChangeList: [
                { label: '变更时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '变更内容', prop: 'changeContent' }],
            tableDoneLabel: [
                { label: '导入时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '订单来源', prop: 'source' },
                { label: '订单编号', prop: 'orderId' },
                { label: '收货人', prop: 'consignee' },
                { label: '手机号', prop: 'phone' },
                { label: '收件人地址', prop: 'consigneeAddress' },
                { label: '成交时间', prop: 'orderTime', formatters: 'dateTime' },
                { label: '商品名称', prop: 'productName' },
                { label: '购买数量', prop: 'count' },
                { label: '支付金额', prop: 'payAmount' },
                { label: '奖励金额', prop: 'rewardAmount' },
                { label: '奖励归属月份', prop: 'rewardMonth' }
            ],
            tabIndex: 0,
            uploadShow: false,
            loading: false,
            errorShow: false,
            editMoneyDialogVisible: false,
            editMonthDialogVisible: false,
            errMessage: '',
            fileList: [],
            uploadData: {
                accept: '.xlsx,.xls',
                action: `${iotUrl}/mall/boss/wx/reward/import`,
                limit: 1,
                autoUpload: false,
                headers: { // todo I'm need a config file
                    refreshToken: localStorage.getItem('refreshToken'),
                    token: `Bearer ` + localStorage.getItem('token'),
                    AccessKeyId: '5ksbfewexbfc'
                },
                data: {
                    operateUserName: ''
                }
            },
            communicationTableLabel: [
                { label: '沟通日期', prop: 'communicationDate', formatters: 'date' },
                { label: '沟通结果', prop: 'communicationResult' }
            ],
            communicationRecordDialogVisible: false,
            communicationRecordForm: {
                communicationDate: '',
                communicationResult: ''
            },
            communicationRecordFormRules: {
                communicationDate: [
                    { required: true, message: '请选择沟通日期', trigger: 'blur' }
                ],
                communicationResult: [
                    { required: true, message: '请输入沟通结果', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantmemberInvitationRegisterData: 'iotmerchantmemberInvitationRegisterData',
            merchantmemberEnterpriseInfo: 'iotmerchantmemberEnterpriseInfo',
            merchantmemberInvitationOrderData: 'iotmerchantmemberInvitationOrderData',
            merchantmemberInvitationChangeData: 'iotmerchantmemberInvitationChangeData',
            merchantmemberInvitationBuy: 'iotmerchantmemberInvitationBuy',
            merchantmemberInvitationTotal: 'iotmerchantmemberInvitationTotal',
            merchantmemberData: 'iotmerchantmemberData',
            cloudMerchantTaglist: 'cloudMerchantTaglist',
            companyEmployeeData: 'merchantCompanyEmployeeData',
            cloudMerchantMemberCommunicationList: 'cloudMerchantMemberCommunicationList',
            cloudMerchantMemberCommunicationListPagination: 'cloudMerchantMemberCommunicationListPagination'
        }),

        tagSelect () {
            return function (tag) {
                let selectTag = false
                let datas = this.tagStringList
                for (let j = 0; j < datas.length; j++) {
                    const element = datas[j]
                    if (tag === element) {
                        selectTag = true
                        break
                    }
                }
                return selectTag ? 'select hand' : 'unselect hand'
            }
        },
        showTag () {
            if (this.showTagStringList.length > 0) {
                return this.showTagStringList.join(',')
            } else {
                return '--'
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findMerchantMemberInvitationRegistersituation: 'findMerchantMemberInvitationRegistersituation',
            findMerchantMemberInvitationBuy: 'findMerchantMemberInvitationBuy',
            findMerchantMemberInvitationBuyTotalsituation: 'findMerchantMemberInvitationBuyTotal',
            findMerchantMemberEnterpriseInfo: 'findMerchantMemberEnterpriseInfo',
            findMerchantMemberInvitationChangesituation: 'findMerchantMemberInvitationChangesituation',
            findMerchantMemberInvitationOrdersituation: 'findMerchantMemberInvitationOrdersituation',
            findCloudMerchantTaglist: 'findCloudMerchantTaglist',
            findMerchantMembersituation: 'findMerchantMembersituation',
            findMerchantCompanyEmployee: 'findMerchantCompanyEmployee',
            findCloudMerchantMemberCommunicationList: 'findCloudMerchantMemberCommunicationList'
        }),

        async onQuery () {
            await this.findMerchantMemberInvitationRegistersituation(this.searchParams)
            await this.findMerchantMemberInvitationBuy(this.searchParams)
            await this.findMerchantMemberInvitationBuyTotalsituation({ 'uuid': this.$route.query.uuid })
            await this.findMerchantMemberInvitationOrdersituation(this.searchParams)
            await this.findMerchantMemberInvitationChangesituation(this.$route.query.unionId)
            await this.findMerchantMemberEnterpriseInfo(this.$route.query.unionId)
            await this.requestMemberCommunicationList()

            this.tableRegisterData = this.merchantmemberInvitationRegisterData.records
            this.enterpriseInfoData = this.merchantmemberEnterpriseInfo
            this.tableChangeData = this.merchantmemberInvitationChangeData
            this.tableBuyData = this.merchantmemberInvitationBuy.records
            this.tableBuyTotalData = this.merchantmemberInvitationTotal
            console.log(this.merchantmemberInvitationTotal, 111)
            this.tableDoneData = this.merchantmemberInvitationOrderData.records
            this.paginationRegister = {
                pageNumber: this.merchantmemberInvitationRegisterData.current,
                pageSize: this.merchantmemberInvitationRegisterData.size,
                total: this.merchantmemberInvitationRegisterData.total
            }
            this.paginationBuy = {
                pageNumber: this.merchantmemberInvitationBuy.current,
                pageSize: this.merchantmemberInvitationBuy.size,
                total: this.merchantmemberInvitationBuy.total
            }
            this.paginationDone = {
                pageNumber: this.merchantmemberInvitationOrderData.current,
                pageSize: this.merchantmemberInvitationOrderData.size,
                total: this.merchantmemberInvitationOrderData.total
            }
            this.paginationChange = {
                pageNumber: this.merchantmemberInvitationChangeData.current,
                pageSize: this.merchantmemberInvitationChangeData.size,
                total: this.merchantmemberInvitationChangeData.total
            }
            this.memberInfo()
        },
        async memberInfo () {
            await this.findMerchantMembersituation({ 'phone': this.$route.query.phone })
            this.tagStringList = this.enterpriseInfoData.userTags ? this.enterpriseInfoData.userTags.split(',') : []
            this.showTagStringList = [...this.tagStringList]
        },
        async employeeData () {
            await this.findMerchantCompanyEmployee(this.$route.query.companyCode)
            this.tableEmployeeData = this.companyEmployeeData
        },
        async showDliag (val) {
            await this.findCloudMerchantTaglist()
            this.tagVisible = true
        },
        async editConform () {
            if (this.tagStringList) {
                // 这里因为后台需要传递tagid 所以要加上再传递
                let tagMapList = []
                for (let i = 0; i < this.tagStringList.length; i++) {
                    const element = this.tagStringList[i]
                    tagMapList.push({ 'tagId': '', 'tagName': element })
                }
                if (this.showTagStringList && this.showTagStringList.length > 0) {
                    await editMemberTag({ 'phone': this.$route.query.phone, 'tagNames': tagMapList })
                } else {
                    await addMemberTag({ 'phone': this.$route.query.phone, 'tagNames': tagMapList })
                }
                this.onQuery()
            }
            this.clearData()
        },
        tagCancel () {
            this.clearData()
            this.tagStringList = this.$route.query.userTags ? this.$route.query.userTags.split(',') : []

            console.log(this.tagStringList)
        },
        tagCancelSelect () {
            this.tagStringList = []
        },

        clearData () {
            this.tagVisible = false
        },
        uploadFile (param) {
            console.log('response')
            // 上传新文件时，将进度条值置为零
            this.progressFlag = true
            const formdata = new FormData()
            formdata.append('documentType', this.filterForm.documentType)
            formdata.append('upload', param.fileList)
            formdata.append('operateUserName', this.userInfo.employeeName)
            axios({
                url: `${iotUrl}/mall/boss/wx/reward/import`,
                method: 'post',
                data: formdata,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    refreshToken: localStorage.getItem('refreshToken'),
                    token: `Bearer ` + localStorage.getItem('token'),
                    AccessKeyId: '5ksbfewexbfc'
                }
            }).then(response => {
                console.log(response)
                if (response.data.rel) {
                    this.$message({
                        message: '文件上传成功',
                        type: 'success'
                    })
                    this.logData.upUploadStatus = 1 // 是否上传成功 1 成功 0失败
                } else {
                    this.logData.upUploadStatus = 0
                }
                this.logData.upRegion = this.filterForm.regTargetArea // areacode
                this.logData.upFileUrl = response.data.filePath // 上传文件存储路径
                this.logData.upQueryType = this.filterForm.documentType // 档案类型id
                this.logData.upUploadFileSize = response.data.fileSize // 文件大小
                this.logData.upUploadFileName = response.data.fileName // 文件名
                param.onSuccess() // 上传成功的文件会显示绿色的对勾
            }).catch(response => {
                console.log(response)
                this.$message({
                    message: '文件上传失败',
                    type: 'warning'
                })
            }).then(error => {
                console.log(error)
            })
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
            this.memberInfo()
            this.employeeData()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onDelete (val) {
            this.$confirm('是否删除此条记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await delInvitationOrder({ id: val.id, operateUserName: this.$route.query.nickName })
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                })
                this.onQuery()
            })
        },
        onEditMoney (val) {
            this.$prompt('奖励金额', '奖励金额编辑', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
                inputErrorMessage: '金额格式不正确',
                inputValue: val.rewardAmount
            }).then(({ value }) => {
                if (value.length > 6) {
                    this.$message({
                        message: '奖励金额不符',
                        type: 'error'
                    })
                    return
                }
                this.updataInvitation({
                    id: val.id,
                    rewardAmount: value,
                    operateUserName: this.$route.query.nickName
                })
            }).catch(() => {
            })
        },
        onEditMonth (val) {
            this.updateMonthShow = true
            this.updateIndexData = val
        },
        editMonth (val) {
            this.updateMonthShow = false
            if (val === 1) {
                this.update({
                    id: this.updateIndexData.id,
                    rewardMonth: this.updateIndexData.rewardMonth,
                    operateUserName: this.userInfo.employeeName
                })
            }
        },
        async updataInvitation (val) {
            await updateInvitationDetail(val)
            this.onQuery()
        },
        async updateCompanyInfoRemark (val) {
            console.log(val, 111)
            if (this.enterpriseInfoData.remark != null) {
                await updateCompanyInfo({ id: this.enterpriseInfoData.id, remark: this.enterpriseInfoData.remark })
            }
            // this.onQuery()
        },
        handleClick (tab, event) {
            this.tabIndex = tab.index
        },
        onExport () {
            this.uploadShow = true
        },
        async onImport () {
            if (this.loading) return
            this.loading = true
            if (this.hasFile()) {
                this.uploadData.data.operateUserName = this.userInfo.employeeName
                try {
                    await this.$refs.upload.submit()
                } catch (e) {
                }
            } else {
                this.$message.error('请选择上传的文件')
                this.loading = false
            }
        },
        onDownload () {
            downloadQuestionTemp()
        },
        beforeAvatarUpload (file) {
            const isLt10M = file.size / (1024 * 1024 * 10) < 1
            // const isCsv = file.type === 'application/vnd.ms-excel'
            const isCsv = file.name.lastIndexOf('.') > 0 ? ['.xlsx', '.xls'].indexOf(file.name.slice(file.name.lastIndexOf('.'), file.name.length)) > -1 : false
            if (!isCsv) {
                // this.$message.error('上传文件只能是 excel 格式!')
                this.loading = true
                this.$message({
                    type: 'error',
                    message: '上传文件只能是 excel 格式!',
                    duration: 800,
                    onClose: () => {
                        this.loading = false
                    }
                })
            }
            if (!isLt10M) {
                // this.$message.error('上传文件大小不能超过 10MB!')
                this.loading = true
                this.$message({
                    type: 'error',
                    message: '上传文件大小不能超过 10MB!',
                    duration: 800,
                    onClose: () => {
                        this.loading = false
                    }
                })
            }
            return isCsv && isLt10M
        },
        uploadError (response) {
            const res = response
            console.log(JSON.parse(res.message).detail)
            this.$refs.upload.clearFiles()
            this.$message.error(JSON.parse(res.message).detail)
            this.loading = false
        },
        uploadSuccess (response) {
            this.$refs.upload.clearFiles()
            this.onQuery(this.searchParams)
            // if (response == null) {
            this.errorData = response.data
            this.uploadShow = false
            this.$message.success('文件上传成功')
            this.loading = false
            // } else {
            //     this.$message.error(response.message)
            // }
        },
        onCloseDialog () {
            if (this.hasFile()) {
                this.$confirm('是否确定取消选中的文件', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.upload.clearFiles()
                    this.uploadShow = false
                    this.$message({
                        type: 'success',
                        message: '已取消选中的文件!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '已取消删除'
                    })
                })
            } else {
                this.$refs.upload.clearFiles()
                this.uploadShow = false
            }
        },
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
        },
        addTag (tag) {
            let selectTag = false
            let index = 0
            let datas = this.tagStringList
            for (let j = 0; j < datas.length; j++) {
                const element = datas[j]
                if (tag === element) {
                    index = j
                    selectTag = true
                    break
                }
            }
            if (selectTag) {
                // 存在则删除
                datas.splice(index, 1)
            } else {
                // 不存在则添加
                datas.push(tag)
            }
        },
        addNewTag () {
            this.clearData()
            this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantMemberTag' })
        },
        goToDetail (val) {
            this.$router.push({
                path: '/comfortCloudMerchant/merchantOrderManage/merchantOrderList',
                query: { phone: this.$route.query.phone }
            })
        },
        async requestMemberCommunicationList () {
            await this.findCloudMerchantMemberCommunicationList({ ...this.searchParams, phone: this.$route.query.phone })
        },
        clearCommunicationRecordForm () {
            if (this.$refs['communicationRecordForm']) {
                this.$refs['communicationRecordForm'].clearValidate()
                this.communicationRecordForm = {
                    communicationDate: '',
                    communicationResult: ''
                }
            }
        },
        onAddCommunicationRecord () {
            this.clearCommunicationRecordForm()
            this.communicationRecordDialogVisible = true
        },
        onCommunicationCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.requestMemberCommunicationList()
        },
        onCommunicationSizeChange (val) {
            this.searchParams.pageSize = val
            this.requestMemberCommunicationList()
        },
        onCommunicationRecordEdit (data) {
            this.communicationRecordForm = data
            this.communicationRecordDialogVisible = true
        },
        onCommunicationRecordDelete (data) {
            this.$confirm(`删除后将无法恢复，请确认该条沟通记录要删除。`, '沟通记录删除确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let params = { ...data }
                params.operator = this.userInfo.employeeName
                await deleteCloudMerchantMemberCommunication(params)
                await this.requestMemberCommunicationList()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
            })
        },
        onCommunicationRecordCancel () {
            this.clearCommunicationRecordForm()
            this.communicationRecordDialogVisible = false
        },
        onCommunicationRecordConfirm () {
            this.$refs['communicationRecordForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        this.communicationRecordForm.phone = this.$route.query.phone
                        this.communicationRecordForm.operator = this.userInfo.employeeName
                        if (this.communicationRecordForm.id) {
                            await modifyCloudMerchantMemberCommunication(this.communicationRecordForm)
                        } else {
                            await postCloudMerchantMemberCommunication(this.communicationRecordForm)
                        }
                        this.communicationRecordDialogVisible = false
                        this.clearCommunicationRecordForm()
                        await this.requestMemberCommunicationList()
                    } catch (e) {
                    }
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;

    span {
        flex: 1;

        &:first-child {
            font-size: 16px;
        }

        &:last-child {
            text-align: right;
        }
    }
}
.tag-cont {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
}

.unselect {
    display: inline-block;
    padding: 5px 10px;
    margin: 10px;
    border: 1px solid #606266;
    border-radius: 5px;
}

.select {
    display: inline-block;
    padding: 5px 10px;
    margin: 10px;
    background-color: #ff7a45;
    border: 1px solid #ff7a45;
    color: white;
    border-radius: 5px;
}
.tag-container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.tag {
    margin: 5px;
}
.choice-tag {
    color: #ff7a45;
    cursor: pointer;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
.tag-cont {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
}
/deep/ .el-dialog__body {
    padding-top: 10px;
}

.uploadTips {
    font-size: 16px;
    display: inline-block;
    margin: 5px;
}

.top-box {
    width: auto;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    height: 4rem;
    justify-content: space-between;
    background: #ffffff;
}

.top-box-right {
    width: auto;
    margin-left: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: #ffffff;
}

.page-body-cont-top {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-content: flex-start;
    padding: 20px 24px;
    background: $whiteColor;
}

.page-body-cont-top-no-left {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-content: flex-start;
    padding-top: 20px;
    background: $whiteColor;
    align-items: center;
}

.page-body-cont-top-no-align-items {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-content: flex-start;
    padding-top: 20px;
    background: $whiteColor;
}

.page-body-cont-enterprise-info {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-content: flex-start;
    padding: 20px 24px;
    background: $whiteColor;
}

.textarea {
    width: 800px;
    padding-left: 40px;
    background: $whiteColor;
}

.page-body-cont-enterprise {
    display: flex;
    width: 100%;
    align-items: center;
    background: $whiteColor;
}

.page-body-cont-enterprise-info-empty {
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    color: #888888;
    flex-direction: column;
    align-content: center;
    padding: 40px 200px 40px 200px;
    background: $whiteColor;
}
</style>
