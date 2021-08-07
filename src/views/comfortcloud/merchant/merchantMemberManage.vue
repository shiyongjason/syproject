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
                    <div class="flex-wrap-title">会员类型：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.role" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="新人" value=1></el-option>
                            <el-option label="普通会员" value=2></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">注册时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startRegisterTime" type="datetime"
                                        value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期"
                                        :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endRegisterTime" type="datetime"
                                        value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期"
                                        :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">经营区域：</div>
                    <div class="query-cont-col-area">
                        <el-select v-model="queryParams.provinceId" @change="onProvince" placeholder="省"
                                   :clearable=true>
                            <el-option v-for="item in provinceList" :key="item.id" :label="item.name"
                                       :value="item.provinceId">
                            </el-option>
                        </el-select>
                        <span class="ml10 mr10">-</span>
                        <el-select v-model="queryParams.cityId" @change="onCity" placeholder="市" :clearable=true>
                            <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                            </el-option>
                        </el-select>
                        <span class="ml10 mr10">-</span>
                        <el-select v-model="queryParams.countryId" placeholder="区" :clearable=true>
                            <el-option v-for="item in getCountry" :key="item.id" :label="item.name"
                                       :value="item.countryId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">手动标签：</div>
                    <div class="query-col-cont">
                        <el-select v-model="queryParams.manualTags" multiple>
                            <el-option-group v-for="group in cloudMerchantTaglist" :key="group.tagCategory"
                                             :label="group.tagCategory">
                                <el-option v-for="item in group.tagDetailBos" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                        <el-button type="primary" class="ml20" @click="onExport">导出</el-button>
                    </div>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">
                已筛选 {{merchantmemberData.total}} 项；
                累计注册: {{merchantmemberTotalData.registerCount}}个；
                累计邀请成交订单: {{merchantmemberTotalData.rewardCount}}单；
                累计邀请成交金额:{{merchantmemberTotalData.payAmountTotal}}元；
                累计奖励:{{merchantmemberTotalData.rewardAmountTotal}}元；
            </el-tag>
            <!-- 表格使用老毕的组件 -->
            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false'
                        :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'
                        :isAction="true">
                <template slot="source" slot-scope="scope">
                    {{scope.data.row.source==='1'?'自主注册':'好友推荐'}}
                </template>
                <template slot="merchantType" slot-scope="scope">
                    {{setMerchantType(scope.data.row)}}
                </template>
                <template slot="userTags" slot-scope="scope">
                    <div class="tag-container hand" @click="showDliag(scope.data.row)"
                         v-if="scope.data.row.userTags !== null">
                        <el-tag class="tag" v-for="item in scope.data.row.userTags.split(',')" :key="item">{{item}}
                        </el-tag>
                    </div>
                    <div class="hand colred" @click="showDliag(scope.data.row)" v-else>添加标签</div>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">查看详情</el-button>
                    <el-button class="orangeBtn" @click="onRecommendPerson(scope.data.row)">变更推荐人</el-button>
                </template>
            </basicTable>
            <el-dialog title="变更推荐人" :modal-append-to-body=false :append-to-body=false
                       :visible.sync="recommendDialogVisible" width="50%">
                <h1 style="padding-top: 10px">变更后，该会员将绑定在新的推荐人/无推荐人状态，请确认准确后变更</h1>
                <div>
                    <h1 style="padding-top: 20px">注册来源</h1>
                    <div class="flex-wrap-cont">
                        <el-select v-model="recommendData.source">
                            <el-option label="自主注册" value=1></el-option>
                            <el-option label="好友推荐" value=2></el-option>
                        </el-select>
                    </div>
                </div>
                <div v-show="recommendData.source==='2'">
                    <h1 style="padding-top: 20px">推荐人账号：</h1>
                    <div class="query-col-input">
                        <el-input v-model="recommendData.invitePhone" placeholder="请输入手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="onRecommendChange(0)">取消</el-button>
                    <el-button :disabled="recommendData.source==='2'&&!recommendData.invitePhone" type="primary" @click="onRecommendChange(1)">确认</el-button>
                </span>
            </el-dialog>
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
                    <el-button @click="tagCancelSelect()">清除已选中的标签</el-button>
                    <el-button @click="tagCancel()">取消</el-button>
                    <el-button type="primary" @click="editConform()">确认</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import { clearCache, newCache } from '../../../utils'
import { addMemberTag, editMemberTag, recommendChange } from '../api'
import { getChiness } from '../../hmall/membership/api'
import { iotUrl } from '../../../api/config'

export default {
    name: 'comfortcloudMembermanage',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: this.$route.query.phone ? this.$route.query.phone : '',
                companyName: '',
                endRegisterTime: '',
                provinceId: '',
                cityId: '',
                countryId: '',
                startRegisterTime: '',
                manualTags: []
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            setTagUser: {},
            tagStringList: [],
            provinceList: [],
            cityList: [],
            dialogVisible: false,
            tableLabel: [
                { label: '企业名称', prop: 'companyName' },
                { label: '会员账号', prop: 'phone' },
                { label: '会员昵称', prop: 'nickName' },
                { label: '经营区域', prop: 'saleArea' },
                { label: '主营品牌', prop: 'brand' },
                { label: '主营品类', prop: 'category' },
                { label: '会员类型', prop: 'merchantType' },
                { label: '注册时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '注册来源', prop: 'source' },
                { label: '推荐人会员账号', prop: 'invitePhone' },
                { label: '推荐人会员编号', prop: 'inviteUuid' },
                { label: '推荐人姓名', prop: 'inviteUserName' },
                { label: '购买订单数', prop: 'orderCount' },
                { label: '购买订单金额', prop: 'orderAmount' },
                { label: '邀请会员数量', prop: 'registerCount' },
                { label: '邀请成交订单数', prop: 'rewardCount' },
                { label: '邀请成交金额', prop: 'payAmountTotal' },
                { label: '奖励金额', prop: 'rewardAmountTotal' },
                { label: '首次沟通日期', prop: 'firstCommunicationDate', formatters: 'date', width: '150px' },
                { label: '会员标签', prop: 'userTags', width: '200px' }
            ],
            recommendDialogVisible: false,
            recommendData: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantmemberData: 'iotmerchantmemberData',
            merchantmemberTotalData: 'iotmerchantmemberTotalData',
            cloudMerchantTaglist: 'cloudMerchantTaglist'
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
        getCity () {
            const province = this.provinceList.filter(item => item.provinceId === this.queryParams.provinceId)
            if (province.length > 0) {
                // this.cityList = province[0].cities
                return province[0].cities
            }
            return []
        },
        getCountry () {
            const city = this.cityList.filter(item => item.cityId === this.queryParams.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endRegisterTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startRegisterTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    watch: {
        getCity: {
            deep: true,
            handler: function (newVal) {
                this.cityList = newVal
            }
        }
    },
    mounted () {
        // this.tableData = [{ productN: '123' }]
        this.onSearch()
        this.getAreacode()
        this.queryTags()
    },
    activated () {
        this.onQuery()
    },
    beforeRouteEnter (to, from, next) {
        newCache('comfortcloudMembermanage')
        next()
    },
    beforeRouteLeave (to, from, next) {
        console.log(to.name)
        if (to.name != 'merchantMemberInvitation') {
            clearCache('comfortcloudMembermanage')
        }
        next()
    },
    methods: {
        ...mapActions({
            findMerchantMembersituation: 'findMerchantMembersituation',
            iotmerchantmemberDataPagination: 'iotmerchantmemberDataPagination',
            findMerchantMemberTotalsituation: 'findMerchantMemberTotalsituation',
            findCloudMerchantTaglist: 'findCloudMerchantTaglist'
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
        async queryTags () {
            await this.findCloudMerchantTaglist()
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无数据可导出！')
            } else {
                let url = ''
                for (const key in this.queryParams) {
                    if (this.queryParams[key] !== '') {
                        url += (`${key}=${this.queryParams[key]}&`)
                    }
                }

                axios.defaults.responseType = 'blob'
                axios.post(iotUrl + '/mall/boss/user/export', this.queryParams).then(function (response) {
                    try {
                        const reader = new FileReader()
                        reader.readAsDataURL(response.data)
                        reader.onload = function (e) {
                            const a = document.createElement('a')
                            a.download = '会员列表.xlsx'
                            a.href = e.target.result
                            document.querySelector('body').appendChild(a)
                            a.click()
                            document.querySelector('body').removeChild(a)
                        }
                        axios.defaults.responseType = 'json'
                    } catch (e) {
                        axios.defaults.responseType = 'json'
                    }
                }).catch(function () {
                    axios.defaults.responseType = 'json'
                })
            }
        },
        async showDliag (val) {
            if (val !== undefined) {
                this.setTagUser = val
                this.tagStringList = val.userTags ? [...val.userTags.split(',')] : []
            }
            this.queryTags()
            this.dialogVisible = true
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
            this.queryParams.countryId = ''
        },
        onArea (key) {
            this.queryParams.countryId = key
        },
        async editConform () {
            if (this.tagStringList) {
                // 这里因为后台需要传递tagid  所以要加上再传递
                let tagMapList = []
                for (let i = 0; i < this.tagStringList.length; i++) {
                    const element = this.tagStringList[i]
                    tagMapList.push({ 'tagId': '', 'tagName': element })
                }
                if (this.setTagUser.userTags) {
                    // 已经存在过 则是编辑
                    await editMemberTag({ 'phone': this.setTagUser.phone, 'tagNames': tagMapList })
                } else {
                    await addMemberTag({ 'phone': this.setTagUser.phone, 'tagNames': tagMapList })
                }
                this.onQuery()
            }
            this.clearData()
        },
        tagCancel () {
            this.clearData()
        },
        tagCancelSelect () {
            this.tagStringList = []
        },
        clearData () {
            this.tagStringList = []
            this.dialogVisible = false
            this.setTagUser = {}
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
        onEdit (val) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantMemberInvitation', query: val })
        },
        async onRecommendPerson (val) {
            this.recommendDialogVisible = true
            this.recommendData = Object.assign({}, val)
        },
        async onRecommendChange (val) {
            this.recommendDialogVisible = false
            if (val === 1) {
                await recommendChange({
                    uuid: this.recommendData.uuid,
                    changeType: this.recommendData.source,
                    phone: this.recommendData.invitePhone,
                    operator: this.userInfo.employeeName
                })
                this.onQuery()
            }
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        setMerchantType (val) {
            let type = ''
            if (val.role === 1) {
                type += '新人'
            } else if (val.role === 2) {
                type += '普通会员'
            }
            if (val.distributorStatus === 1) {
                type += '、分销员'
            }
            if (val.agentStatus === 10) {
                type += '、经销商'
            }

            return type
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

    .topTitle {
        margin-right: 2rem;
        font-weight: bold;
    }

    .orangeBtn {
        margin: 5px 0;
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

    .unselect {
        display: inline-block;
        padding: 5px 10px;
        margin: 10px;
        border: 1px solid #606266;
        border-radius: 5px;
    }

    .query-cont-col-area {
        position: relative;
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-right: 24px;
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

    .topColred {
        color: #ff7a45;
        cursor: pointer;
    }

    /deep/ .el-dialog__body {
        padding-top: 10px;
    }
</style>
