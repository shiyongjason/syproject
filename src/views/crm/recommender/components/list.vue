<template>
    <ul class="list">
        <template v-if="type === 1">
            <template v-if="list&& list.length> 0">
                <li v-for="item in list" :key="item.mobile" class="info-row">
                    <p class="avatar">
                        <img v-if="item.avatarUrl" :src="item.avatarUrl" alt="">
                        <img v-else src="../../../../assets/images/goodwork-default-user.png" alt="">
                    </p>
                    <p class="info">
                        <span class="user">{{item.userName}}{{item.mobile}}</span>
                        <span class="time">
                            {{item.createTime | momentFormat}}
                            <template v-if="type === 1">通过推荐注册</template>
                        </span>
                    </p>
                </li>
            </template>
            <template v-else>
                <li class="no-list">暂无数据</li>
            </template>
        </template>
        <template v-else>
            <template v-if="list && list.length>0">
                <li v-for="item in list" :key="item.mobile" class="info-row">
                    <p class="avatar">
                        <img src="../../../../assets/images/crm-company-icon.png" alt="">
                    </p>
                    <p class="info">
                        <span class="user">{{item.companyName}}</span>
                        <span class="time">
                            <template v-if="type === 2">{{item.authenticationTime | momentFormat}} 通过认证</template>
                            <template v-if="type === 3">{{item.creditApprovedTime | momentFormat}} 获得信用评级</template>
                            <template v-if="type === 4">认证30日仍未通过信用评级，推荐失败</template>
                        </span>
                    </p>
                </li>
            </template>
            <template v-else>
                <li class="no-list">暂无数据</li>
            </template>
        </template>
    </ul>
</template>

<script>
export default {
    name: 'userList',
    props: ['list', 'type']
}
</script>

<style scoped lang="scss">
.list {
    font-size: 12px;
    li{
        line-height: 24px;
        margin-bottom: 8px;
    }
    .info-row{
        display: flex;
        .avatar {
            width: 38px;
            margin-right: 12px;
            display: flex;
            align-items: center;
            img {
                width: 100%;
                border-radius: 50%;
            }
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .user {
            font-weight: 600;
            color: #000000;
        }
    }
}
    .no-list {
        text-align: center;
        color: #999999;
    }
</style>
