<template>
    <div class="tags-wrapper page-body amountImport">
        <div class="page-body-cont ">
            <span>会员信息</span>
        </div>
        <div class="page-body-cont-top ">
            <!-- <img style="height: 4rem " :src="decodeURIComponent(this.$route.query.avatarUrl)"> -->
            <div class="top-box">
                <span>{{decodeURIComponent(this.$route.query.nickName)}} </span>
                <span>手机号 ：{{this.$route.query.phone}} </span>
            </div>
            <div class="top-box-right">
                <span>注册时间： {{new Date(decodeURIComponent(this.$route.query.createTime)).toLocaleString()}} </span>
                <span style="margin-left: 1rem">注册来源： {{this.$route.query.source==='hcg'?'  好橙工':'  单分享APP'}}</span>
                <span style="margin-left: 1rem">会员角色： {{this.$route.query.role}}</span>
            </div>
        </div>
        <div class="page-body-cont query-cont">
            <el-tabs v-model="tabIndex" type="card" @tab-click="handleClick">
                <el-tab-pane label="购买记录" name="0">
                    <el-tag size="medium" class="eltagtop">
                        <!-- 合计 共购买 {{tableBuyData.length}}种商品；
                        累计购买订单数：{{tableBuyTotalData.totalOrderCount}}笔；
                        累计购买件数：{{tableBuyTotalData.totalProductCount}}件；
                        累计购买金额：{{tableBuyTotalData.totalOrderAmount}}元； -->
                    </el-tag>
                    <div class="page-body-cont">
                        <!-- 表格使用老毕的组件 -->
                        <basicTable :tableLabel="tableBuyLabel" :tableData="tableBuyData" :isShowIndex='true' :pagination="paginationBuy" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                            <template slot="action" slot-scope="scope">
                                <el-button class="orangeBtn" @click="goToDetail(scope.data.row)">查看明细</el-button>
                            </template>
                        </basicTable>
                    </div>
                </el-tab-pane>
                <el-tab-pane class="page-body-cont-enterprise" label="企业信息" name="1">
                    <!-- <div class="page-body-cont-enterprise-info" v-if="this.enterpriseInfoData.id!=null">
                        <span style="margin-bottom: 20px">公司名称： {{this.enterpriseInfoData.companyName}} </span>
                        <span style="margin-bottom: 20px">联系地址： {{this.enterpriseInfoData.contactAddress}}</span>
                        <span style="margin-bottom: 20px">联系人姓名： {{this.enterpriseInfoData.contactUser}}</span>
                        <span style="margin-bottom: 20px">联系电话： {{this.enterpriseInfoData.contactNumber}}</span>
                        <span>经营类型：{{this.enterpriseInfoData.businessType===1? '零售商':this.enterpriseInfoData.businessType===2? '工程商':''}}</span>
                        <div class="page-body-cont-top-no-left">
                            <span>主营业务:</span>
                            <div v-if="this.enterpriseInfoData.respCompanyCommonTagBO!=null">
                                <el-tag style="margin-left: 20px" v-for="tag in this.enterpriseInfoData.respCompanyCommonTagBO.businessCommon" :key="tag" :type="tag.type">
                                    {{tag}}
                                </el-tag>
                            </div>
                            <div v-if="this.enterpriseInfoData.respCompanyCommonTagBO!=null">
                                <el-tag style="margin-left: 20px" v-for="tag in this.enterpriseInfoData.respCompanyCommonTagBO.businessOwn" :key="tag" :type="tag.type">
                                    {{tag}}
                                </el-tag>
                            </div>
                        </div>
                        <div class="page-body-cont-top-no-left">
                            <span>主营品牌:</span>
                            <div v-if="this.enterpriseInfoData.respCompanyCommonTagBO!=null">
                                <el-tag style="margin-left: 20px" v-for="tag in this.enterpriseInfoData.respCompanyCommonTagBO.brandsCommon" :key="tag" :type="tag.type">
                                    {{tag}}
                                </el-tag>
                                <el-tag style="margin-left: 20px" v-for="tag in this.enterpriseInfoData.respCompanyCommonTagBO.brandsOwn" :key="tag" :type="tag.type">
                                    {{tag}}
                                </el-tag>
                            </div>
                        </div>
                    </div>
                    <div class="page-body-cont-enterprise-info-empty" v-show="this.enterpriseInfoData.id==null">暂无数据
                    </div> -->

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'merchantExternalInvitation',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                uuid: this.$route.query.uuid
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
        })
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
        }),
        async onQuery () {

        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
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
    flex-direction: row;
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
