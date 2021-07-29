<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>代理商查询</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">代理商名称：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.companyName" maxlength="50" placeholder="输入代理商名称" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">联系人姓名：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.contactUser" maxlength="50" placeholder="输入联系人姓名" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.contactNumber" maxlength="50" placeholder="输入手机号" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">城市：</div>
                <div class="query-cont-col-area">
                    <el-select v-model="queryParams.provinceId" @change="onProvince" placeholder="省" :clearable=true>
                        <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                        </el-option>
                    </el-select>
                    <span class="ml10 mr10">-</span>
                    <el-select v-model="queryParams.cityId" placeholder="市" :clearable=true>
                        <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">代理品类：</div>
                <div class="query-cont-col-area">
                    <el-select v-model="queryParams.categoryId" placeholder="品类" :clearable=true>
                        <el-option :label="item.categoryName" :value="item.categoryId" v-for="item in cloudMerchantShopCategoryList" :key="item.categoryId"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <el-tag size="medium" class="eltagtop">
                已筛选 {{this.cloudMerchantListPagination.total}} 项；
                累计一级（独家）代理商总数: {{this.statistics.totalCount}} 个；
                商品型号一级代理总数: {{this.statistics.oneLevelCount}} 个；
                商品型号二级代理总数:{{this.statistics.twoLevelCount}} 个；
            </el-tag>
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantList" :pagination="cloudMerchantListPagination" @onCurrentChange='onCurrentChange' isShowIndex @onSizeChange='onSizeChange' :isAction="true">
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn clipBtn" @click="onShowDetail(scope.data.row)">查看详情</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="代理权益详情" :modal-append-to-body=false :append-to-body=false :visible.sync="rightsDialogVisible" width="50%">
            <h3 class="right-title">代理订单</h3>
            <div class="right-items">
                <p>代理订单号：{{cloudMerchantAgentDetail.agentCode}}</p>
                <p>代理押金：{{cloudMerchantAgentDetail.payAmount}}元</p>
                <p>代理品类：{{cloudMerchantAgentDetail.categoryName}}</p>
                <p>代理型号：{{cloudMerchantAgentDetail.specificationName}}</p>
                <p>代理区域：{{cloudMerchantAgentDetail.agentArea}}</p>
                <p>代理权益有效期：{{agentValidTimeDesc}}</p>
                <p>代理合同状态：{{contractState}}</p>
            </div>
            <h3 class="right-title">代理权益</h3>
            <div class="right-items" v-html="cloudMerchantAgentDetail.agentContent"></div>
        </el-dialog>

        <!-- <el-dialog title="提货进度" :modal-append-to-body=false :append-to-body=false :visible.sync="progressDialogVisible" width="50%">
            <basicTable :tableLabel="progressTableLabel" :tableData="progressTable">

            </basicTable>
            <el-button class="orangeBtn chckBtn" @click="checkShopManager(progressCompany)">查询提货明细</el-button>
        </el-dialog> -->
        <el-dialog title="代理商代理详情" :modal-append-to-body=false :append-to-body=false :visible.sync="detailDialogVisible" width="1200px">
            <el-tag size="medium" class="eltagtop">
                代理产品型号共计{{cloudMerchantDetailStats.agentSpecificationCount}}个,
                其中履约中的共{{cloudMerchantDetailStats.effectiveCount}}个,
                已过期的{{cloudMerchantDetailStats.expiredCount}}个,
                支付押金共计{{cloudMerchantDetailStats.totalAgentAmount}}元,
                支付提货预付款{{cloudMerchantDetailStats.totalPrepayAmount}}元,
                已提货金额{{cloudMerchantDetailStats.alreadyPickAmount}}元,
                剩余提货金额{{cloudMerchantDetailStats.totalPrepayAmount - cloudMerchantDetailStats.alreadyPickAmount}}元。
            </el-tag>
            <div>
                <div class="query-cont-col">
                    <div class="query-col-title">代理品类：</div>
                    <div class="query-cont-col-area">
                        <el-select v-model="detailTableQueryParams.categoryId" placeholder="品类" :clearable=true>
                            <el-option :label="item.categoryName" :value="item.categoryId" v-for="item in cloudMerchantShopCategoryList" :key="item.categoryId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">代理合同状态：</div>
                    <div class="query-cont-col-area">
                        <el-select v-model="detailTableQueryParams.status" placeholder="合同状态" :clearable=true>
                            <el-option label="选择" value=""></el-option>
                            <el-option label="履约中" value="10"></el-option>
                            <el-option label="已过期" value="40"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onDetailSearch">查询</el-button>
                    </div>
                </div>
            </div>
            <basicTable :maxHeight="400" :tableLabel="detailTableLabel" :tableData="cloudMerchantDetailList" :pagination="cloudMerchantDetailListPagination" @onCurrentChange='onDetailTableCurrentChange' isShowIndex @onSizeChange='onDetailTableSizeChange' :isAction="true">
                <template slot="level" slot-scope="scope">
                    {{scope.data.row.level === 1 ? '一级': (scope.data.row.level === 2 ? '二级' : '一级(独家)')}}
                </template>
                <template slot="status" slot-scope="scope">
                    {{scope.data.row.status === 10 ? '履约中' : '已过期'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn clipBtn" @click="onShowRights(scope.data.row)">查看权益</el-button>
                    <el-button class="orangeBtn clipBtn" @click="onShowProgress(scope.data.row)" style="margin:10px 0 0 0">提货明细</el-button>
                </template>
            </basicTable>
        </el-dialog>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { getChiness } from '../../hmall/membership/api/index'
import { getCloudMerchantAgentProgress, getCloudMerchantStatistics } from '../api'

export default {
    name: 'merchantSearch',
    data () {
        return {
            queryParams: {
                companyName: '',
                contactNumber: '',
                contactUser: '',
                provinceId: '',
                cityId: '',
                categoryId: '',
                pageNumber: 1,
                pageSize: 10
            },
            statistics: {
                totalCount: 0,
                oneLevelCount: 0,
                twoLevelCount: 0
            },
            provinceList: [],
            formLabelWidth: '140px',
            tableLabel: [
                { label: '代理商公司名称', prop: 'companyName' },
                { label: '省', prop: 'provinceName' },
                { label: '市', prop: 'cityName' },
                { label: '代理商联系人', prop: 'contactUser' },
                { label: '代理商联系电话', prop: 'contactNumber' },
                { label: '代理商联系地址', prop: 'contactAddress' }
            ],
            detailTableLabel: [
                { label: '签约人会员昵称', prop: 'nickName' },
                { label: '签约人会员账号', prop: 'phone' },
                { label: '签约时间', prop: 'signDate', formatters: 'dateTime' },
                { label: '代理订单号', prop: 'agentCode' },
                { label: '代理商等级', prop: 'level' },
                { label: '代理品类', prop: 'categoryName' },
                { label: '代理型号', prop: 'specificationName' },
                { label: '年度提货额度', prop: 'agentCount' },
                { label: '已提货数量', prop: 'alreadyPickCount' },
                { label: '已提货金额', prop: 'alreadyPickAmount' },
                { label: '待提货数量', prop: 'noPickCount' },
                { label: '代理合同状态', prop: 'status' }],
            detailTableQueryParams: {
                unionId: '',
                categoryId: '',
                status: '',
                pageNumber: 1,
                pageSize: 10
            },
            focusDetailAgent: null,
            progressTableLabel: [
                { label: '年度提货额度', prop: 'totalPickGoodsCount' },
                { label: '已提货', prop: 'alreadyPickGoodsCount' },
                { label: '待提货', prop: 'noPickGoodsCount' }
            ],
            progressTable: [],
            progressCompany: null,
            rightsDialogVisible: false,
            progressDialogVisible: false,
            detailDialogVisible: false
        }
    },
    mounted () {
        this.queryList(this.queryParams)
        this.queryStatistics(this.queryParams)
        this.queryCetagory()
        this.getAreacode()
    },
    computed: {
        ...mapGetters({
            cloudMerchantList: 'cloudMerchantList',
            cloudMerchantListPagination: 'cloudMerchantListPagination',
            cloudMerchantShopCategoryList: 'cloudMerchantShopCategoryList',
            cloudMerchantAgentDetail: 'cloudMerchantAgentDetail',
            cloudMerchantDetailList: 'cloudMerchantDetailList',
            cloudMerchantDetailListPagination: 'cloudMerchantDetailListPagination',
            cloudMerchantDetailStats: 'cloudMerchantDetailStats'
        }),
        getCity () {
            const province = this.provinceList.filter(item => item.provinceId == this.queryParams.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        agentValidTimeDesc () {
            if (this.cloudMerchantAgentDetail == null || this.cloudMerchantAgentDetail.payTime == null) {
                return '--'
            }

            const date = new Date(this.cloudMerchantAgentDetail.payTime)

            let nextDate = new Date(date)
            nextDate.setFullYear(nextDate.getFullYear() + 1)
            nextDate.setDate(nextDate.getDate() - 1)

            return '自' + this.dateToString(date) + '至' + this.dateToString(nextDate) + '失效'
        },
        contractState () {
            if (this.cloudMerchantAgentDetail == null || this.cloudMerchantAgentDetail.payTime == null) {
                return '--'
            }

            let sdtime1 = new Date(this.cloudMerchantAgentDetail.payTime)
            sdtime1.setFullYear((sdtime1.getFullYear() + 1))
            let sdtime3 = new Date().getTime()
            return sdtime1.getTime() - sdtime3 > 0 ? '履约中' : '已过期'
        }

    },
    methods: {
        ...mapActions({
            findCloudMerchantList: 'findCloudMerchantList',
            findCloudMerchantShopCategoryList: 'findCloudMerchantShopCategoryList',
            getCloudMerchantAgentDetail: 'getCloudMerchantAgentDetail',
            findCloudMerchantDetailList: 'findCloudMerchantDetailList',
            findCloudMerchantDetailStats: 'findCloudMerchantDetailStats'
        }),

        onSearch: function () {
            this.queryParams.pageNumber = 1
            this.queryList(this.queryParams)
            this.queryStatistics(this.queryParams)
        },
        onCurrentChange: function (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.queryList(this.queryParams)
        },
        onSizeChange: function (val) {
            this.queryParams.pageSize = val
            this.queryList(this.queryParams)
        },
        queryList: function (params) {
            this.findCloudMerchantList(params)
        },
        queryCetagory: function (params) {
            this.findCloudMerchantShopCategoryList(params)
        },
        async getAreacode () {
            const { data } = await getChiness()
            this.provinceList = data
            console.log('sheng' + this.provinceList)
        },
        onProvince (key) {
            this.queryParams.provinceId = key
            this.queryParams.cityId = ''
            console.log('sheng' + key)
        },
        onCity (key) {
            this.queryParams.cityId = key
            console.log(key)
        },
        onShowDetail (val) {
            this.focusDetailAgent = val
            this.detailTableQueryParams = {
                unionId: val.unionId,
                categoryId: '',
                status: '',
                pageNumber: 1,
                pageSize: 10
            }
            this.queryDetailList(this.detailTableQueryParams)
            this.findCloudMerchantDetailStats({ unionId: val.unionId })
            this.detailDialogVisible = true
        },
        async onShowRights (val) {
            await this.getCloudMerchantAgentDetail({ id: val.id })
            this.rightsDialogVisible = true
        },
        async onShowProgress (val) {
            // this.progressCompany = val
            // const data = await getCloudMerchantAgentProgress({ id: val.id })
            // if (data) {
            //     this.progressTable = [data.data]
            //     this.progressDialogVisible = true
            // }
            // console.log(val)
            this.$router.push({
                path: `/comfortCloud/equipmentOverview/warehouseManagement`, query: { phone: val.phone }
            })
        },
        async queryStatistics (parms) {
            const data = await getCloudMerchantStatistics(parms)
            if (data) {
                this.statistics = data.data
            }
        },
        dateToString (date) {
            const year = date.getFullYear()
            const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
            const day = (date.getDate()) < 10 ? '0' + (date.getDate()) : date.getDate()

            return year + '年' + month + '月' + day + '日'
        },

        // checkShopManager (val) {
        //     console.log(val)
        //     this.$router.push({
        //         name: `warehouseManagement`, params: { dealer: this.focusDetailAgent.companyName }
        //     })
        // },
        queryDetailList (detailTableQueryParams) {
            this.findCloudMerchantDetailList(detailTableQueryParams)
        },
        onDetailTableCurrentChange: function (val) {
            this.detailTableQueryParams.pageNumber = val.pageNumber
            this.queryDetailList(this.detailTableQueryParams)
        },
        onDetailTableSizeChange: function (val) {
            this.detailTableQueryParams.pageSize = val
            this.queryDetailList(this.detailTableQueryParams)
        },
        onDetailSearch () {
            this.queryDetailList(this.detailTableQueryParams)
        }

    }

}
</script>

<style scoped>
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
.eltagtop {
    margin-bottom: 20px;
}
.query-cont-col-area {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 24px;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}

.title {
    overflow: hidden;
    text-overflow: ellipsis;
}

.right-title {
    margin: 20px 0 10px 0;
}

.right-items {
    margin: 10px 0 30px 0;
    line-height: 25px;
}

.chckBtn {
    float: right;
    margin: 20px;
}
</style>
