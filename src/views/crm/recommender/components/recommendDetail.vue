<template>
    <div>
        <el-drawer title="邀请详情" :visible.sync="open" :before-close="handleClose" size="50%">
            <div class="drawer-wrap">
                <div class="user-base-info">
                    <p class="avatar">
                        <img :src="detail.avatarUrl" alt="">
                    </p>
                    <p>
                        <span>{{detail.userName}}</span>
                        <span>{{detail.mobile}}</span>
                    </p>
                </div>
                <h2>基本信息</h2>
                <p class="info">激活时间：{{detail.createTime | formatDate}}</p>
                <p class="info">
                    推荐官来源：
                    <template v-if="detail.source === 1">客户经理分享</template>
                    <template v-if="detail.source === 2">小程序自主</template>
                </p>
                <h2>推荐记录</h2>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="已注册" name="first">用户管理</el-tab-pane>
                    <el-tab-pane label="已认证" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="以评级" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="已失效" name="fourth">定时任务补偿</el-tab-pane>
                </el-tabs>
                <h2>奖励记录：累计获得{{detail.rewards}}元</h2>
                <div>
                    <p class="row-info" v-for="(item,index) in detail.rewardList" :key="item.companyName + index">
                        {{item.companyName}}
                        <span class="time">{{item.creditApprovedTime | formatDate}}</span>
                        获得信用评级，奖励{{item.rewardAmount}}元
                    </p>
                </div>
            </div>
            <div class="drawer-footer">
                <div class="drawer-button">
                    <h-button @click="handleClose">取消</h-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { getRecommenderInfo, getStatisticsCompanyList, getStatisticsUserList } from '../api/index'
export default {
    name: 'recommendDetail',
    props: {
        userId: {
            type: String
        }
    },
    data () {
        return {
            activeName: 'first',
            companyParams: {
                pageNumber: 1,
                pageSize: 10,
                recommenderUserId: this.userId,
                status: ''
            },
            userParams: {
                pageNum: 1,
                pageSize: 10,
                userId: this.userId
            },
            open: false,
            detail: {}
        }
    },
    methods: {
        handleClose () {
            this.open = false
        },
        handleOpen () {
            this.open = true
        },
        handleClick (tab, event) {
            console.log(tab, event)
        },
        async getStatisticsUserList() {
            const {data} = await getStatisticsUserList(this.userParams)
        },
        async getStatisticsCompanyList() {
            const {data} = await getStatisticsCompanyList(this.companyParams)
        },
        async getRecommenderInfo (userId) {
            const {data} = await getRecommenderInfo(userId)
            console.log(data)
            this.detail = data
        }
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
    .drawer-wrap {
        padding: 12px 20px;
        .avatar img{
            width: 50px;
        }
        h2 {
            color: #ff690b;
            font-size: 14px;
        }
    }
</style>
