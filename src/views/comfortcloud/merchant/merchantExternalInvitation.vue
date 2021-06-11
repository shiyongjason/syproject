<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont ">
            <span>会员信息</span>
        </div>
        <div class="page-body-cont-top ">
            <!-- <img style="height: 4rem " :src="decodeURIComponent(this.$route.query.avatarUrl)"> -->
            <div class="top-box">
                <span>{{decodeURIComponent(enterpriseInfoData.nickName ? enterpriseInfoData.nickName :enterpriseInfoData.companyName)}} </span>
                <span>手机号 ：{{enterpriseInfoData.phone}} </span>
            </div>
            <div class="top-box-right">
                <span style="margin-left: 1rem;margin-bottom:10px">注册时间： {{new Date(decodeURIComponent(enterpriseInfoData.createTime)).toLocaleString()}} </span>
                <span style="margin-left: 1rem;margin-bottom:10px">注册来源： {{enterpriseInfoData.source==='hcg'?'  好橙工':'  单分享APP'}}</span>
                <span style="margin-left: 1rem;margin-bottom:10px">会员角色： {{enterpriseInfoData.role}}</span>
                <span style="margin-left: 1rem;margin-bottom:10px">会员标签： <span class="choice-tag" @click="showDliag()"> {{showTag}} </span></span>
            </div>
        </div>
        <div class="page-body-cont query-cont">
            <el-tabs v-model="tabIndex" type="card" @tab-click="handleClick">
                <el-tab-pane class="page-body-cont-enterprise" label="企业信息" name="enterpriseInfo">
                    <div class="page-body-cont-enterprise-info">
                        <span style="margin-bottom: 20px">公司名称： {{enterpriseInfoData.companyName}} </span>
                        <span style="margin-bottom: 20px">联系地址： {{constructAddress}}</span>
                        <span style="margin-bottom: 20px">联系人姓名： {{enterpriseInfoData.nickName}}</span>
                        <span style="margin-bottom: 20px">联系电话： {{enterpriseInfoData.phone}}</span>
                        <span style="margin-bottom: 20px">认证状态： {{enterpriseInfoData.authenticationStatus}}</span>
                        <span style="margin-bottom: 20px">经营类型：{{enterpriseInfoData.role}}</span>
                        <span style="margin-bottom: 20px">主营业务：{{enterpriseInfoData.mainCategory}}</span>
                        <span style="margin-bottom: 20px">主营品牌：{{enterpriseInfoData.mainBrand}}</span>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="沟通记录" name="contact">
                    <div class="query-cont-col ml20">
                        <el-button type="primary" @click="communicate">+新增记录</el-button>
                    </div>
                    <div class="page-body-cont">
                        <basicTable :tableLabel="communicationTableLabel"
                                    :tableData="cloudMerchantMemberCommunicationList"
                                    :pagination="cloudMerchantMemberCommunicationListPagination" :isShowIndex='false'
                                    :isAction="true" @onCurrentChange='onCommunicationCurrentChange'
                                    @onSizeChange='onCommunicationSizeChange'>
                            <template slot="action" slot-scope="scope">
                                <el-button class="orangeBtn" @click="onCommunicationRecordEdit(scope.data.row)">编辑
                                </el-button>
                                <el-button class="orangeBtn" @click="onCommunicationRecordDelete(scope.data.row)">删除
                                </el-button>
                            </template>
                        </basicTable>
                    </div>

                </el-tab-pane>
                <el-tab-pane v-if="enterpriseInfoData.source!='hcg'" label="购买记录" name="shop">
                    <el-tag size="medium" class="eltagtop">
                        合计 共购买 {{tableBuyData.length}}种商品；
                        累计购买订单数：{{tableBuyTotalData.totalOrderCount ? tableBuyTotalData.totalOrderCount : '0'}}笔；
                        累计购买件数：{{tableBuyTotalData.totalProductCount ? tableBuyTotalData.totalProductCount : '0'}}件；
                        累计购买金额：{{tableBuyTotalData.totalOrderAmount ? tableBuyTotalData.totalOrderAmount : '0'}}元；
                    </el-tag>
                    <div class="page-body-cont">
                        <basicTable :tableLabel="tableBuyLabel" :tableData="tableBuyData" :isShowIndex='true'
                                    :pagination="pagination" @onCurrentChange='onCurrentChange'
                                    @onSizeChange='onSizeChange' :isAction="true">
                            <template slot="action" slot-scope="scope">
                                <el-button class="orangeBtn" @click="goToDetail(scope.data.row)">查看明细</el-button>
                            </template>
                        </basicTable>
                    </div>
                </el-tab-pane>
                <el-tab-pane v-if="enterpriseInfoData.source==='hcg'" label="工程项目" name="project">
                    <div class="page-body-cont">
                        <basicTable :tableLabel="tableProjectLabel" :tableData="tableProjectData" :isShowIndex='true'
                                    :pagination="projectPagination" @onCurrentChange='onCurrentChange'
                                    @onSizeChange='onSizeChange' :isAction="false">
                            <template slot="status" slot-scope="scope">
                                <div>{{statusMap[scope.data.row.status]}}</div>
                            </template>
                            <template slot="deviceCategory" slot-scope="scope">
                                <div>{{categoryMap[scope.data.row.deviceCategory]}}</div>
                            </template>
                            <template slot="type" slot-scope="scope">
                                <div>{{typeMap[scope.data.row.type]}}</div>
                            </template>
                        </basicTable>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-dialog title="选择标签" :modal-append-to-body=false :append-to-body=false :visible.sync="dialogVisible"
                       width="50%">
                <div v-for="item in cloudMerchantTaglist" :key="item.id">
                    <h1>{{item.tagCategory}}</h1>
                    <div class="tag-cont">
                        <span :class="tagSelect(tag)" v-for="tag in item.tagDetailBos" :key="tag" @click="addTag(tag)">{{tag}}</span>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addNewTag()">新增标签</el-button>
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
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import {
    getMerchantMemberInvitationOutOrdersTotal,
    addMemberTag,
    editMemberTag,
    deleteCloudMerchantMemberCommunication,
    modifyCloudMerchantMemberCommunication,
    postCloudMerchantMemberCommunication
} from '../api'

export default {
    name: 'merchantExternalInvitation',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: this.$route.query.phone
            },
            statusMap: {
                1: '待提交',
                2: '初审中',
                3: '资料收集中',
                4: '待立项',
                5: '合作关闭',
                6: '待签约',
                7: '待放款',
                8: '贷中',
                9: '项目完成',
                10: '信息待完善',
                11: '待终审',
                12: '资料待审核'
            },
            categoryMap: {
                1: '空调',
                2: '采暖',
                3: '新风',
                4: '净水',
                5: '智能化',
                6: '辅材',
                7: '电梯',
                8: '其他',
                9: '电器',
                10: '热水器'
            },
            typeMap: { 1: '地产项目', 2: '政府共建项目', 3: '市政项目', 4: '办公楼', 5: '厂房', 6: '其他' },
            projectQueryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyId: this.$route.query.companyId
            },
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            projectPagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tabIndex: this.$route.query.name,
            tableBuyTotalData: {},
            enterpriseInfoData: {},
            tagStringList: [], // 用于编辑的tags列表
            showTagStringList: [], // 用于展示的tags列表
            tableBuyData: [],
            tableProjectData: [],
            dialogVisible: false,
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
            tableProjectLabel: [
                { label: '项目名称', prop: 'projectName' },
                { label: '项目地址', prop: 'address', width: '220px' },
                { label: '项目编号', prop: 'projectNo' },
                { label: '所属分部', prop: 'deptName' },
                { label: '经销商', prop: 'companyName' },
                { label: '甲方名称', prop: 'firstPartName' },
                { label: '预计签约时间', prop: 'estimateSignTime', formatters: 'dateTime' },
                { label: '项目类别', prop: 'type' },
                { label: '工程项目进度', prop: 'status' },
                { label: '项目合同总额', prop: 'contractAmount' },
                { label: '设备总额', prop: 'deviceAmount' },
                { label: '设备品类', prop: 'deviceCategory' },
                { label: '设备品牌', prop: 'deviceBrand' },
                { label: '合作进度', prop: 'status' }
            ],
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
            merchantmemberInvitationOutOrderData: 'cloudMerchantmemberInvitationOutOrderData',
            merchantmemberInvitationProjectData: 'cloudMerchantmemberInvitationProjectData',
            merchantExernalMemberData: 'iotmerchantExternalMemberData',
            cloudMerchantTaglist: 'cloudMerchantTaglist',
            cloudMerchantMemberCommunicationList: 'cloudMerchantMemberCommunicationList',
            cloudMerchantMemberCommunicationListPagination: 'cloudMerchantMemberCommunicationListPagination'
        }),
        constructAddress () {
            let provinceName = this.enterpriseInfoData.provinceName ? this.enterpriseInfoData.provinceName : ''
            let cityName = this.enterpriseInfoData.cityName ? this.enterpriseInfoData.cityName : ''
            let countryName = this.enterpriseInfoData.countryName ? this.enterpriseInfoData.countryName : ''
            let storeAddress = this.enterpriseInfoData.storeAddress ? this.enterpriseInfoData.storeAddress : ''

            return provinceName + cityName + countryName + storeAddress
        },
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
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            findMerchantMemberInvitationOutOrdersituation: 'findMerchantMemberInvitationOutOrdersituation',
            findMerchantMemberInvitationProject: 'findMerchantMemberInvitationProject',
            findMerchantExternalMembersituation: 'findMerchantExternalMembersituation',
            findCloudMerchantTaglist: 'findCloudMerchantTaglist',
            findCloudMerchantMemberCommunicationList: 'findCloudMerchantMemberCommunicationList'
        }),
        async onQuery () {
            await this.findMerchantMemberInvitationOutOrdersituation(this.searchParams)
            await this.findMerchantMemberInvitationProject(this.projectQueryParams)
            await this.requestMemberCommunicationList()
            this.tableBuyData = this.merchantmemberInvitationOutOrderData.records
            this.tableProjectData = this.merchantmemberInvitationProjectData.records
            this.pagination = {
                pageNumber: this.merchantmemberInvitationOutOrderData.current,
                pageSize: this.merchantmemberInvitationOutOrderData.size,
                total: this.merchantmemberInvitationOutOrderData.total
            }
            this.projectPagination = {
                pageNumber: this.merchantmemberInvitationProjectData.current,
                pageSize: this.merchantmemberInvitationProjectData.size,
                total: this.merchantmemberInvitationProjectData.total
            }
            this.memberInfo()
        },
        async requestMemberCommunicationList () {
            await this.findCloudMerchantMemberCommunicationList({
                ...this.searchParams,
                phone: this.$route.query.phone
            })
        },
        async onTotal () {
            const { data } = await getMerchantMemberInvitationOutOrdersTotal({ 'phone': this.$route.query.phone })
            this.tableBuyTotalData = data
        },
        async memberInfo () {
            await this.findMerchantExternalMembersituation({ 'phone': this.$route.query.phone })
            if (this.merchantExernalMemberData.records.length > 0) {
                this.enterpriseInfoData = this.merchantExernalMemberData.records[0]
            }

            this.tagStringList = this.enterpriseInfoData.manualTags ? this.enterpriseInfoData.manualTags : []
            this.showTagStringList = [...this.tagStringList]
            console.log(this.showTagStringList)
        },
        async showDliag (val) {
            await this.findCloudMerchantTaglist()
            this.dialogVisible = true
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
        clearCommunicationRecordForm () {
            if (this.$refs['communicationRecordForm']) {
                this.$refs['communicationRecordForm'].clearValidate()
                this.communicationRecordForm = {
                    communicationDate: '',
                    communicationResult: ''
                }
            }
        },
        communicate () {
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
            this.communicationRecordForm = Object.assign({}, data)
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
        },

        goToDetail (val) {
            this.$router.push({
                path: '/comfortCloudMerchant/merchantOrderManage/merchantOutOrderList',
                query: { 'phone': this.queryParams.phone }
            })
        },
        tagCancel () {
            this.clearData()
        },
        addNewTag () {
            this.clearData()
            this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantMemberTag' })
        },
        clearData () {
            this.dialogVisible = false
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
            this.onTotal()
            this.memberInfo()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        handleClick (tab, event) {
            this.tabIndex = tab.name
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
        }
    }
}
</script>

<style lang='scss' scoped>
    /deep/ .el-dialog__body {
        padding-top: 10px;
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

    .choice-tag {
        color: #ff7a45;
        cursor: pointer;
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

    .hand {
        cursor: pointer !important;
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
