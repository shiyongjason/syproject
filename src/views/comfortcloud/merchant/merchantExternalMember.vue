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
                            <el-option label="全部" value=""></el-option>
                            <el-option label="单分享" value="B2b"></el-option>
                            <el-option label="好橙工" value="hcg"></el-option>
                            <!-- <el-option label="平台1.0" value="3"></el-option> -->
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">注册时间： </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">手动标签：</div>
                    <div class="query-col-cont">
                        <el-select v-model="queryParams.manualTags" multiple style="width: 100%">
                        </el-select>
                    </div>
                    <div class="click-tap hand" @click.stop="showQueryTagSelector()"></div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">自动标签：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.autoTags" multiple collapse-tags style="width: 100%">
                            <el-option v-for="item in queryParams.autoTags" :key="item.tag" :label="item.tag" :value="item.tag"></el-option>
                        </el-select>
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
                </div>
            </div>

            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :action-min-width="200">
                <template slot="provinceName" slot-scope="scope">
                    {{ scope.data.row.provinceName + scope.data.row.cityName }}
                </template>
                <template slot="isAppletUser" slot-scope="scope">
                    {{ scope.data.row.isAppletUser ? '是' : '否' }}
                </template>
                <template slot="manualTags" slot-scope="scope">
                    <div class="tag-container hand" @click="showDliag(scope.data.row)" v-if="scope.data.row.manualTags !== null">
                        <el-tag class="tag" v-for="item in scope.data.row.manualTags" :key="item">{{item}}</el-tag>
                    </div>
                    <div class="hand" @click="showDliag(scope.data.row)" v-else>--</div>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDetail(scope.data.row)">查看订单</el-button>
                    <el-button class="orangeBtn" @click="onDetail(scope.data.row)">会员详情</el-button>
                </template>
            </basicTable>

            <el-dialog title="选择标签" :modal-append-to-body=false :append-to-body=false :visible.sync="dialogVisible" width="50%">
                <div v-for="item in cloudMerchantTaglist" :key="item.id">
                    <h1>{{item.tagCategory}}</h1>
                    <div class="tag-cont">
                        <span :class="tagSelect(tag)" v-for="tag in item.tagDetailBos" :key="tag" @click="addTag(tag)">{{tag}}</span>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="tagCancel()">取消</el-button>
                    <el-button type="primary" @click="editConform()">确认</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { getChiness } from '../../hmall/membership/api/index'
import { addMemberTag, editMemberTag } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'comfortcloudExternalMemeber',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: '',
                source: '',
                provinceId: '',
                cityId: '',
                countryId: '',
                startTime: '',
                endTime: '',
                manualTags: [],
                autoTags: []
            },
            setTagUser: {},
            isQueryOperation: false,
            tableData: [],
            tagStringList: [],
            provinceList: [],
            cityList: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '会员来源', prop: 'source' },
                { label: '企业名称', prop: 'companyName', width: '100px' },
                { label: '认证状态', prop: 'authenticationStatus' },
                { label: '会员角色', prop: 'role' },
                { label: '会员账号', prop: 'phone', width: '100px' },
                { label: '会员昵称', prop: 'nickName' },
                { label: '经营区域', prop: 'provinceName', width: '100px' },
                { label: '门店地址', prop: 'storeAddress' },
                { label: '所属分部', prop: 'department' },
                { label: '主营品牌', prop: 'mainBrand' },
                { label: '主营品类', prop: 'mainCategory' },
                { label: '注册时间', prop: 'createTime', formatters: 'dateTime', width: '150px' },
                { label: '销售顾问姓名', prop: 'saleName' },
                { label: '销售顾问手机号', prop: 'salePhone', width: '100px' },
                { label: '是否注册享钱', prop: 'isAppletUser' },
                { label: '手动标签', prop: 'manualTags' }
            ],
            dialogVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantExernalMemberData: 'iotmerchantExternalMemberData',
            cloudMerchantTaglist: 'cloudMerchantTaglist'
        }),
        tagSelect () {
            return function (tag) {
                let selectTag = false
                let datas = this.isQueryOperation ? this.queryParams.manualTags : this.tagStringList
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
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
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
            findMerchantExternalMembersituation: 'findMerchantExternalMembersituation',
            findCloudMerchantTaglist: 'findCloudMerchantTaglist'
        }),
        async onQuery () {
            await this.findMerchantExternalMembersituation(this.searchParams)
            this.tableData = this.merchantExernalMemberData.records
            this.pagination = {
                pageNumber: this.merchantExernalMemberData.current,
                pageSize: this.merchantExernalMemberData.size,
                total: this.merchantExernalMemberData.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        async showDliag (val) {
            this.isQueryOperation = false
            if (val !== undefined) {
                this.setTagUser = val
                this.tagStringList = val.manualTags ? val.manualTags : []
            }
            await this.findCloudMerchantTaglist()
            this.dialogVisible = true
        },
        async showQueryTagSelector () {
            this.isQueryOperation = true
            await this.findCloudMerchantTaglist()
            this.dialogVisible = true
        },
        async editConform () {
            if (!this.isQueryOperation) {
                if (this.tagStringList.length > 0) {
                    await addMemberTag({ 'phone': this.setTagUser.phone, 'tagNames': this.tagStringList })
                    this.onQuery()
                }
            } else {
                this.queryParams.manualTags = this.tagStringList ? [...this.tagStringList] : []
            }
            this.clearData()
        },
        tagCancel () {
            this.clearData()
        },
        clearData () {
            this.tagStringList = []
            this.dialogVisible = false
            this.setTagUser = {}
            this.isQueryOperation = false
        },
        onDetail (val) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantExternalInvitation', query: val })
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
        addTag (tag) {
            let selectTag = false
            let index = 0
            let datas = this.isQueryOperation ? this.queryParams.manualTags : this.tagStringList
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

.hand {
    cursor: pointer !important;
}

.orangeBtn {
    margin: 5px 0;
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

.click-tap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
}

.el-tag.tag {
    margin: 5px;
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
