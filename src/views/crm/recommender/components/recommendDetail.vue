<template>
    <div>
        <h-drawer title="邀请详情" :visible.sync="open" size='50%' :beforeClose="handleClose">
            <template #connect>
                <div class="drawer-wrap">
                    <div class="user-base-info">
                        <p class="avatar">
                            <img v-if="detail.avatarUrl" :src="detail.avatarUrl" alt="">
                            <img v-else src="../../../../assets/images/goodwork-default-user.png" alt="">
                        </p>
                        <p class="info">
                            <span>{{detail.userName ? detail.userName : '-'}}</span>
                            <span>{{detail.mobile}}</span>
                        </p>
                    </div>
                    <h2>基本信息</h2>
                    <p class="info">激活时间：{{detail.createTime | momentFormat}}</p>
                    <p class="info">
                        推荐官来源：
                        <template v-if="detail.source === 1">客户经理分享</template>
                        <template v-if="detail.source === 2">小程序自主</template>
                    </p>
                    <h2>推荐记录</h2>
                    <el-tabs class="tab-component" v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="已注册" name="first">
                            <List :list="list" :type="1"></List>
                        </el-tab-pane>
                        <el-tab-pane label="已认证" name="second">
                            <List :list="list" :type="2"></List>
                        </el-tab-pane>
                        <el-tab-pane label="已评级" name="third">
                            <List :list="list" :type="3"></List>
                        </el-tab-pane>
                        <el-tab-pane label="已失效" name="fourth">
                            <List :list="list" :type="4"></List>
                        </el-tab-pane>
                    </el-tabs>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next" class="pagination" :page-size="5" :current-page="pagination.pageNumber" :total="pagination.total">
                    </el-pagination>
                    <h2>奖励记录：累计获得{{ detail.rewards || '0'}}元</h2>
                    <div>
                        <p class="row-info" v-for="(item,index) in detail.rewardList" :key="item.companyName + index">
                            {{item.companyName}}
                            <span class="time">{{item.creditApprovedTime | momentFormat}}</span>
                            获得信用评级，奖励{{item.rewardAmount}}元
                        </p>
                    </div>
                </div>
            </template>
            <template #btn>
                <h-button @click="handleClose">取消</h-button>
            </template>
        </h-drawer>
    </div>
</template>

<script>
import { getRecommenderInfo, getStatisticsCompanyList, getStatisticsUserList } from '../api/index'
import List from './list'
export default {
    name: 'recommendDetail',
    components: {
        List
    },
    data () {
        return {
            activeName: 'first',
            companyParams: {
                pageNumber: 1,
                pageSize: 5,
                recommenderUserId: '',
                status: 1
            },
            userParams: {
                pageNum: 1,
                pageSize: 5,
                userId: ''
            },
            open: false,
            detail: {},
            list: [],
            pagination: {
                total: 0,
                pageNumber: 1,
                pageSize: 10
            }
        }
    },
    methods: {
        handleClose () {
            this.open = false
            this.list = []
            this.detail = {}
            this.activeName = 'first'
        },
        handleOpen () {
            this.open = true
        },
        handleClick (tab, event) {
            this.list = []
            if (this.activeName === 'first') {
                this.userParams = { ...this.userParamsTemp }
                this.getStatisticsUserList(this.userId)
            } else {
                this.companyParams = { ...this.companyParamsTemp }
                if (this.activeName === 'second') {
                    this.companyParams.status = 1
                }
                if (this.activeName === 'third') {
                    this.companyParams.status = 2
                }
                if (this.activeName === 'fourth') {
                    this.companyParams.status = 3
                }
                this.getStatisticsCompanyList(this.userId)
            }
        },
        commonSetting (data) {
            this.list = data.records
            this.pagination = {
                total: data.total,
                pageNumber: data.current,
                pageSize: data.size
            }
        },
        async getStatisticsUserList (userId) {
            this.userId = userId
            this.userParams.userId = userId
            const { data } = await getStatisticsUserList(this.userParams)
            this.commonSetting(data)
        },
        async getStatisticsCompanyList (userId) {
            this.companyParams.recommenderUserId = userId
            const { data } = await getStatisticsCompanyList(this.companyParams)
            this.commonSetting(data)
        },
        async getRecommenderInfo (userId) {
            const { data } = await getRecommenderInfo(userId)
            this.detail = data
        },
        handleSizeChange (val) {
            if (this.activeName === 'first') {
                this.userParams.pageSize = val
                this.getStatisticsUserList(this.userId)
            } else {
                this.companyParams.pageSize = val
                this.getStatisticsCompanyList(this.userId)
            }
        },
        handleCurrentChange (val) {
            if (this.activeName === 'first') {
                this.userParams.pageNumber = val
                this.getStatisticsUserList(this.userId)
            } else {
                this.companyParams.pageNumber = val
                this.getStatisticsCompanyList(this.userId)
            }
        }
    },
    mounted () {
        this.userParamsTemp = { ...this.userParams }
        this.companyParamsTemp = { ...this.companyParams }
    }
}
</script>

<style scoped lang="scss">
/deep/.el-drawer__header {
    padding: 20px 20px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
    font-size: 16px;
}
.el-drawer__body {
    position: relative;
}
.drawer-wrap {
    box-sizing: border-box;
    padding: 12px 20px 200px 20px;
    font-size: 13px;
    color: #333333;
    overflow: hidden;
    overflow-y: scroll;
    height: 100vh;
    .avatar img {
        width: 50px;
        border-radius: 5px;
    }
    h2 {
        color: #ff690b;
        font-size: 15px;
        line-height: 30px;
        padding-top: 12px;
        padding-bottom: 10px;
    }
    .user-base-info {
        background: rgba(245, 245, 249, 0.9);
        padding: 12px 20px;
        display: flex;
    }
    .info {
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6px 0;
    }
    .row-info {
        line-height: 24px;
        .time {
            color: #999999;
            padding: 0 6px;
        }
    }
    /deep/.el-tabs__item {
        font-size: 13px;
    }
}
.drawer-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 24px;
    border-top: 1px solid #e5e5ea;
    background: #fff;
    z-index: 1000;
    button {
        flex: 1;
    }
    .drawer-button {
        text-align: right;
    }
}
.pagination {
    text-align: center;
}
.tab-component {
    padding-left: 12px;
}
</style>
