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
                <el-tab-pane label="购买记录" name="0">
                    <el-tag size="medium" class="eltagtop">
                        合计 共购买 {{tableBuyData.length}}种商品；
                        累计购买订单数：{{tableBuyTotalData.totalOrderCount ? tableBuyTotalData.totalOrderCount : '0'}}笔；
                        累计购买件数：{{tableBuyTotalData.totalProductCount ? tableBuyTotalData.totalProductCount : '0'}}件；
                        累计购买金额：{{tableBuyTotalData.totalOrderAmount ? tableBuyTotalData.totalOrderAmount : '0'}}元；
                    </el-tag>
                    <div class="page-body-cont">
                        <basicTable :tableLabel="tableBuyLabel" :tableData="tableBuyData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                            <template slot="action" slot-scope="scope">
                                <el-button class="orangeBtn" @click="goToDetail(scope.data.row)">查看明细</el-button>
                            </template>
                        </basicTable>
                    </div>
                </el-tab-pane>
                <el-tab-pane class="page-body-cont-enterprise" label="企业信息" name="1">
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
            </el-tabs>
            <el-dialog title="选择标签" :modal-append-to-body=false :append-to-body=false :visible.sync="dialogVisible" width="50%">
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
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { getMerchantMemberInvitationOutOrdersTotal, addMemberTag, editMemberTag } from '../api'

export default {
    name: 'merchantExternalInvitation',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: this.$route.query.phone
            },
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tabIndex: 0,
            tableBuyTotalData: {},
            enterpriseInfoData: {},
            tagStringList: [],
            dialogVisible: false,
            tableBuyLabel: [
                { label: '品类', prop: 'categoryName' },
                { label: '型号', prop: 'specificationName', width: '220px' },
                { label: '商品名称', prop: 'productName' },
                { label: '最近一次购买时间', prop: 'lastOrderTime', formatters: 'dateTime' },
                { label: '累计购买订单数', prop: 'orderCount' },
                { label: '累计购买件数', prop: 'productCount' },
                { label: '累计购买金额', prop: 'orderAmount' }
            ],
            tableBuyData: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantmemberInvitationOutOrderData: 'cloudMerchantmemberInvitationOutOrderData',
            merchantExernalMemberData: 'iotmerchantExternalMemberData',
            cloudMerchantTaglist: 'cloudMerchantTaglist'
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
            if (this.tagStringList.length > 0) {
                console.log(this.tagStringList, this.$route.query.manualTags, '啥情况')
                return this.tagStringList.join(',')
            } else {
                return '--'
            }
        }
    },
    mounted () {
        this.onSearch()
        // this.tagStringList = ['空调地暖面板YG-3329', '水地暖智控面板YH-3305']
    },
    activated () {
        console.log('这个是啥时候嗲用呢')
    },
    methods: {
        ...mapActions({
            findMerchantMemberInvitationOutOrdersituation: 'findMerchantMemberInvitationOutOrdersituation',
            findMerchantExternalMembersituation: 'findMerchantExternalMembersituation',
            findCloudMerchantTaglist: 'findCloudMerchantTaglist'

        }),
        async onQuery () {
            await this.findMerchantMemberInvitationOutOrdersituation(this.searchParams)
            this.tableBuyData = this.merchantmemberInvitationOutOrderData.records
            this.pagination = {
                pageNumber: this.merchantmemberInvitationOutOrderData.current,
                pageSize: this.merchantmemberInvitationOutOrderData.size,
                total: this.merchantmemberInvitationOutOrderData.total
            }
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
        },
        async showDliag (val) {
            await this.findCloudMerchantTaglist()
            this.dialogVisible = true
        },
        async editConform () {
            if (this.tagStringList.length > 0) {
                // 这里因为后台需要传递tagid 所以要加上再传递
                let tagMapList = []
                for (let i = 0; i < this.tagStringList.length; i++) {
                    const element = this.tagStringList[i]
                    tagMapList.push({ 'tagId': '', 'tagName': element })
                }

                if (this.$route.query.manualTags) {
                    await editMemberTag({ 'phone': this.$route.query.phone, 'tagNames': tagMapList })
                } else {
                    await addMemberTag({ 'phone': this.$route.query.phone, 'tagNames': tagMapList })
                }
                this.onQuery()
            }
            this.clearData()
        },
        goToDetail (val) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantOrderManage/merchantOutOrderList', query: { 'phone': this.queryParams.phone } })
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
            this.tabIndex = tab.index
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
