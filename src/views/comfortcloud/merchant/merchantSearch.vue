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
                    <el-select @change="onProvince" placeholder="未选择" :clearable=true>
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
                已筛选 0 项；
                累计代理商总数: 0个；
                累计品类一级代理总数: 0个；
                累计品类二级代理总数:0个；
            </el-tag>
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantList" :pagination="cloudMerchantListPagination" @onCurrentChange='onCurrentChange' isShowIndex @onSizeChange='onSizeChange' :isAction="true">
                <template slot="level" slot-scope="scope">
                    {{scope.data.row.level === 1 ? '一级': '二级'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn clipBtn" @click="onShowRights(scope.data.row)">查看权益</el-button>
                    <el-button class="orangeBtn clipBtn" @click="onShowProgress(scope.data.row)" style="margin:10px 10px 0 10px">提货进度</el-button>
                </template>
            </basicTable>
        </div>
        <el-dialog title="代理权益详情" :modal-append-to-body=false :append-to-body=false :visible.sync="rightsDialogVisible" width="50%">
            <h3 class="right-title">代理订单</h3>
            <div class="right-items">
                <p>代理订单号：{{cloudMerchantAgentDetail.agentCode}}</p>
                <p>代理押金：{{cloudMerchantAgentDetail.payAmount}}元</p>
                <p>代理品类：{{cloudMerchantAgentDetail.categoryName}}</p>
                <p>代理区域：{{cloudMerchantAgentDetail.agentArea}}</p>
                <p>代理权益有效期：{{agentValidTimeDesc}}</p>
            </div>
            <h3 class="right-title">代理权益</h3>
            <div class="right-items" v-html="cloudMerchantAgentDetail.agentContent"></div>
        </el-dialog>

        <el-dialog title="提货进度" :modal-append-to-body=false :append-to-body=false :visible.sync="progressDialogVisible" width="50%">
            <basicTable :tableLabel="progressTableLabel" :tableData="cloudMerchantList">

            </basicTable>
            <el-button class="orangeBtn" @click="">查询提货明细</el-button>
        </el-dialog>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { getChiness } from '../../hmall/membership/api/index'

export default {
    name: 'merchantSearch',
    data () {
        return {
            queryParams: {
                companyName: '',
                provinceId: '',
                cityId: '',
                pageNumber: 1,
                pageSize: 10
            },
            provinceList: [],
            formLabelWidth: '140px',
            tableLabel: [
                { label: '代理时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '省', prop: 'provinceName' },
                { label: '市', prop: 'cityName' },
                { label: '代理商公司名称', prop: 'companyName' },
                { label: '代理商等级', prop: 'level' },
                { label: '代理商联系人', prop: 'contactUser' },
                { label: '代理商联系电话', prop: 'contactNumber' },
                { label: '代理商联系地址', prop: 'contactAddress' },
                { label: '代理品类', prop: 'categoryName' }],
            progressTableLabel: [

            ],
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
            cloudMerchantList: 'cloudMerchantList',
            cloudMerchantListPagination: 'cloudMerchantListPagination',
            cloudMerchantAgentDetail: 'cloudMerchantAgentDetail'
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
        }

    },
    methods: {
        ...mapActions({
            findCloudMerchantList: 'findCloudMerchantList',
            getCloudMerchantAgentDetail: 'getCloudMerchantAgentDetail'
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
        queryList: function (params) {
            this.findCloudMerchantList(params)
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
        async onShowRights (val) {
            await this.getCloudMerchantAgentDetail({ id: val.id })
            this.rightsDialogVisible = true
        },
        async onShowProgress (val) {
            await this.getCloudMerchantAgentDetail({ id: val.id })
            this.progressDialogVisible = true
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
    margin: 10px 0 30px 0;
    line-height: 25px;
}
</style>
