<template>
    <div class="page-body B2b">
        <div class="page-body-cont ">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col-title">会员账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.phone" placeholder="请输入手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">会员来源：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.source" style="width: 100%">
                            <el-option label="单分享" value="1"></el-option>
                            <el-option label="好橙工" value="2"></el-option>
                            <el-option label="平台1.0" value="3"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">注册时间： </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startRegisterTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endRegisterTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">会员标签：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.phone" placeholder="不限" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">经营区域：</div>
                    <div class="query-cont-col-area">
                        <el-select v-model="queryParams.provinceId" @change="onProvince" placeholder="省" :clearable=true>
                            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                            </el-option>
                        </el-select>
                        <span class="ml10 mr10">-</span>
                        <el-select v-model="queryParams.cityId" @change="onCity" placeholder="市" :clearable=true>
                            <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                            </el-option>
                        </el-select>
                        <span class="ml10 mr10">-</span>
                        <el-select v-model="queryParams.countryId" placeholder="区" :clearable=true>
                            <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                    </div>
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="showDliag">弹窗测试</el-button>
                    </div>
                </div>
            </div>

            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">

            </basicTable>

            <el-dialog title="选择标签" :modal-append-to-body=false :append-to-body=false :visible.sync="dialogVisible" width="50%">
                <div v-for="item in tagJiaShuju" :key="item.title">
                    <h1>{{item.title}}</h1>
                    <div class="tag-cont">
                        <span class="tag" v-for="(tag,index) in item.tags" :key="tag" @click="selectTag(index)">{{tag}}</span>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editCancel()">取消</el-button>
                    <el-button type="primary" @click="editConform()">确认</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { getChiness } from '../../hmall/membership/api/index'
import { mapState, mapGetters, mapActions } from 'vuex'
import { clearCache, newCache } from '../../../utils'
export default {
    name: 'comfortcloudExternalMemeber',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: this.$route.query.phone,
                source: "1",
                provinceId: '',
                cityId: '',
                countryId: '',
                endRegisterTime: '',
                startRegisterTime: ''
            },
            tableData: [],
            provinceList: [],
            cityList: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                // { label: '会员账号', prop: 'phone' },
                // { label: '会员昵称', prop: 'nickName' },
                // { label: '会员类型', prop: 'merchantType' },
                // { label: '注册时间', prop: 'createTime', formatters: 'dateTime' },
                // { label: '注册来源', prop: 'source' },
                // { label: '推荐人会员账号', prop: 'invitePhone' },
                // { label: '推荐人会员编号', prop: 'inviteUuid' },
                // { label: '购买订单数', prop: 'orderCount' },
                // { label: '购买订单金额', prop: 'orderAmount' },
                // { label: '邀请会员数量', prop: 'registerCount' },
                // { label: '邀请成交订单数', prop: 'rewardCount' },
                // { label: '邀请成交金额', prop: 'payAmountTotal' },
                // { label: '奖励金额', prop: 'rewardAmountTotal' }
            ],
            tagJiaShuju: [
                { 'title': '公司职位', 'tags': ['123123', '1231231', '131231', '123123', '1231231', '131231', '123123', '1231231', '131231', '123123', '1231231', '131231', '123123', '1231231', '131231'] },
                { 'title': '主营产品', 'tags': ['哈哈哈', '嗯嗯', '好好'] },
                { 'title': '是否有意向', 'tags': ['FJFJ', 'DFDF', 'GWG'] },
                { 'title': '东西好不好', 'tags': ['一二三', '四五六', '七八九'] },
            ],
            dialogVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantmemberData: 'iotmerchantmemberData',
            merchantmemberTotalData: 'iotmerchantmemberTotalData'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endRegisterTime
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startRegisterTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        getCity () {
            const province = this.provinceList.filter(item => item.provinceId == this.queryParams.provinceId)
            if (province.length > 0) {
                this.cityList = province[0].cities
                return this.cityList
            }
            return []
        },
        getCountry () {
            const city = this.cityList.filter(item => item.cityId == this.queryParams.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        }
    },
    mounted () {
        this.onSearch()
        this.getAreacode()
    },
    activated () {
        this.onQuery()
    },

    methods: {
        ...mapActions({
            findMerchantMembersituation: 'findMerchantMembersituation',
            iotmerchantmemberDataPagination: 'iotmerchantmemberDataPagination',
            findMerchantMemberTotalsituation: 'findMerchantMemberTotalsituation'
        }),
        async onQuery () {
            await this.findMerchantMembersituation(this.searchParams)
            await this.findMerchantMemberTotalsituation(this.searchParams)
            this.tableData = this.merchantmemberData.records
            this.pagination = {
                pageNumber: this.merchantmemberData.current,
                pageSize: this.merchantmemberData.size,
                total: this.merchantmemberData.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        showDliag () {
            this.dialogVisible = true
        },
        onEdit (val) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantMemberInvitation', query: val })
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        async getAreacode () {
            const { data } = await getChiness()
            this.provinceList = data
        },
        onProvince (key) {
            this.queryParams.provinceId = key
            this.queryParams.cityId = ''
            this.queryParams.countryId = ''
        },
        onCity (key) {
            this.queryParams.cityId = key
            console.log(key)
        },
        onArea (key) {
            this.queryParams.countryId = key
        },
        selectTag (index) {
            console.log(index)
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

.query-cont-col-area {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 24px;
}
.topTitle {
    margin-right: 2rem;
    font-weight: bold;
}

.tag-cont {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
}

.tag {
    display: inline-block;
    padding: 5px 10px;
    margin: 10px;
    border: 1px solid #ff7a45;
    border-radius: 5px;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
.topColred {
    color: #ff7a45;
    cursor: pointer;
}
/deep/.el-dialog__body {
    padding-top: 10px;
}
</style>
