<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>代理商查询</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">代理商名称：</div>
                <div class="query-col-input">
                    <el-input type="text"
                              v-model="queryParams.companyName" maxlength="50" placeholder="输入代理商名称"
                              clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">城市：</div>
                <div class="query-cont-col-area">
                    <el-select  v-model="queryParams.provinceId" @change="onProvince" placeholder="省" :clearable=true>
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
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantList"
                        :pagination="cloudMerchantListPagination" @onCurrentChange='onCurrentChange'
                        isShowIndex @onSizeChange='onSizeChange' :isAction="true" >
                <template slot="level" slot-scope="scope">
                    {{scope.data.row.level === 1 ? '一级': '二级'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <p @click="onShowPreview(scope.data.row)" class="colred title">查看权益</p>
                    <p @click="onShowPreview(scope.data.row)" class="colred title">提货进度</p>
                </template>
            </basicTable>
        </div>
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
                { label: '代理品类', prop: 'categoryName' }]
        }
    },
    mounted () {
        this.queryList(this.queryParams)
        this.getAreacode()
    },
    computed: {
        ...mapGetters({
            cloudMerchantList: 'cloudMerchantList',
            cloudMerchantListPagination: 'cloudMerchantListPagination'
        }),
        getCity () {
            const province = this.provinceList.filter(item => item.provinceId == this.queryParams.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        }

    },
    methods: {
        ...mapActions({
            findCloudMerchantList: 'findCloudMerchantList'
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

    }

}
</script>

<style scoped>
    .spanflex {
        font-size: 16px;
        padding-bottom: 10px;
    }
    .query-cont-col-area {
        position: relative;
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-right: 24px;}
    .colred {
        color: #ff7a45;
        cursor: pointer;
    }

    .title {
        overflow: hidden;
        text-overflow:ellipsis;
    }
</style>
