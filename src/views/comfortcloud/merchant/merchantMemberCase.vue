<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>方案列表</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">创建日期： </div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建人会员账号：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.phone" maxlength="50" placeholder="输入会员账号"
                              clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">城市：</div>
                <div class="query-cont-col-area">
                    <el-select v-model="queryParams.provinceId" @change="onProvince" placeholder="省" :clearable=true>
                        <el-option v-for="item in provinceList" :key="item.id" :label="item.name"
                                   :value="item.provinceId">
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
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantCaseList.records"
                        :pagination="cloudMerchantListPagination" @onCurrentChange='onCurrentChange' :isShowIndex="true"
                        @onSizeChange='onSizeChange' :isAction="true">
                <template slot="id" slot-scope="scope">
                    {{scope.data.row.customerName+'的智能方案'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn clipBtn" @click="onShowRights(scope.data.row)">查看方案详情</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="方案详情" :modal-append-to-body=false :append-to-body=false :visible.sync="rightsDialogVisible"
                   width="50%">
            <div class="el-dialog-div">
                <h3 class="right-title">用户信息</h3>
                <div class="right-items-top">
                    <p>创建时间：{{moment(cloudMerchantCaseDetailList.createTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
                    <p>姓名：{{cloudMerchantCaseDetailList.customerName}}</p>
                    <p>联系电话：{{cloudMerchantCaseDetailList.customerPhone}}</p>
                    <p>小区名称：{{cloudMerchantCaseDetailList.customerAddress}}</p>
                    <p>房屋户型：{{cloudMerchantCaseDetailList.customerHouseType}}</p>
                    <p>客户家的主材产品：{{cloudMerchantCaseDetailList.customerCategory}}</p>
                    <p>装修进度：{{cloudMerchantCaseDetailList.customerDecorProgress}}</p>
                    <p>备注：{{cloudMerchantCaseDetailList.remark}}</p>
                </div>
                <h3 class="right-title">智能升级方案详情</h3>
                <div  v-for="item in cloudMerchantCaseDetailList.details" :key="item.id">
                    <div class="right-items">
                        <div class="item-left">
                            <h5>{{item.customCategoryName}}</h5>
                            <img style="height: 4rem;width: 4rem;margin-top: 10px;margin-bottom: 10px " :src="item.productIcon">
                            <p style="width: 12rem ">{{item.productName}}</p>
                        </div>
                        <div class="item-right">
                            <h5 class="item-text">数量 {{item.productCount}} 个</h5>
                            <p > {{item.promotedTagline}}</p>
                        </div>
                    </div>
                    <div class="line"/>

                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rightsDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="rightsDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { getChiness } from '../../hmall/membership/api/index'
import moment from 'moment'

export default {
    name: 'merchantSearch',
    data () {
        return {
            moment,
            queryParams: {
                startTime: '',
                endTime: '',
                provinceId: '',
                cityId: '',
                phone: '',
                pageNumber: 1,
                pageSize: 10
            },
            statistics: {
                totalCount: 0,
                oneLevelCount: 0,
                twoLevelCount: 0
            },
            cloudMerchantListPagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            provinceList: [],
            formLabelWidth: '140px',
            tableLabel: [
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '创建人员账号', prop: 'phone' },
                { label: '创建人员昵称', prop: 'nickName' },
                { label: '方案名称', prop: 'id' },
                { label: '所在城市', prop: 'cityName' },
                { label: '小区名称', prop: 'customerAddress' }],
            progressTableLabel: [
                { label: '年度提货额度', prop: 'totalPickGoodsCount' },
                { label: '已提货', prop: 'alreadyPickGoodsCount' },
                { label: '待提货', prop: 'noPickGoodsCount' }
            ],
            progressTable: [],
            progressCompany: null,
            rightsDialogVisible: false,
            progressDialogVisible: false
        }
    },
    mounted () {
        this.queryList(this.queryParams)
        this.getAreacode()
    },
    computed: {
        ...mapGetters({
            cloudMerchantCaseList: 'cloudMerchantCaseList',
            cloudMerchantCaseDetailList: 'cloudMerchantCaseDetailList'
        }),
        getCity () {
            const province = this.provinceList.filter(item => item.provinceId == this.queryParams.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
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
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        agentValidTimeDesc () {
            if (this.cloudMerchantCaseDetailList == null || this.cloudMerchantCaseDetailList.payTime == null) {
                return '--'
            }

            const date = new Date(this.cloudMerchantCaseDetailList.payTime)

            let nextDate = new Date(date)
            nextDate.setFullYear(nextDate.getFullYear() + 1)
            nextDate.setDate(nextDate.getDate() - 1)

            return '自' + this.dateToString(date) + '至' + this.dateToString(nextDate) + '失效'
        },
        contractState () {
            if (this.cloudMerchantCaseDetailList == null || this.cloudMerchantCaseDetailList.payTime == null) {
                return '--'
            }

            let sdtime1 = new Date(this.cloudMerchantCaseDetailList.payTime)
            sdtime1.setFullYear((sdtime1.getFullYear() + 1))
            let sdtime3 = new Date().getTime()
            return sdtime1.getTime() - sdtime3 > 0 ? '履约中' : '已过期'
        }

    },
    methods: {
        ...mapActions({
            findCloudMerchantCaseList: 'findCloudMerchantCaseList',
            findCloudMerchantCaseDetailList: 'findCloudMerchantCaseDetailList'
        }),

        onSearch: function () {
            this.queryParams.pageNumber = 1
            this.queryList(this.queryParams)
        },
        onCurrentChange: function (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.queryList(this.queryParams)
        },
        onSizeChange: function (val) {
            this.queryParams.pageSize = val
            this.queryList(this.queryParams)
        },
        queryList: async function (params) {
            await this.findCloudMerchantCaseList(params)
            this.cloudMerchantListPagination = {
                pageNumber: this.cloudMerchantCaseList.current,
                pageSize: this.cloudMerchantCaseList.size,
                total: this.cloudMerchantCaseList.total
            }
        },
        async getAreacode () {
            const { data } = await getChiness()
            this.provinceList = data
        },
        onProvince (key) {
            this.queryParams.provinceId = key
            this.queryParams.cityId = ''
        },
        onCity (key) {
            this.queryParams.cityId = key
            console.log(key)
        },
        async onShowRights (val) {
            let data = await this.findCloudMerchantCaseDetailList({ id: val.id })
            console.log(data)
            this.rightsDialogVisible = true
        },
        dateToString (date) {
            const year = date.getFullYear()
            const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
            const day = (date.getDate()) < 10 ? '0' + (date.getDate()) : date.getDate()

            return year + '年' + month + '月' + day + '日'
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
        display: flex;
        margin: 10px 0 10px 0;
        flex-direction: row;
        justify-content: flex-start;
    }
    .item-left {
        align-items: flex-start;
        display: flex;
        margin: 10px 0 10px 0;
        flex-direction: column;
        justify-content: space-between;
    }
    .item-right {
        display: flex;
        align-items: flex-start;
        margin-left: 50px;
        flex-direction: column;
        justify-content: center;
    }
    .right-items-top {
        margin: 10px 0 30px 0;
        line-height: 25px;
    }
    .item-text {
        margin: 10px 0 30px 0;
        line-height: 25px;
    }
    .line{
        float:right;
        width: 100%;
        height: 1px;
        margin-top: -0.5em;
        background:#d4c4c4;
        position: relative;
        text-align: center;
    }
    .chckBtn {
        float: right;
        margin: 20px;
    }
    .el-dialog-div {
        height: 80vh;
        overflow: auto;
    }
</style>
