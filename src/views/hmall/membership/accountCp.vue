<template>
    <div class="drawer-wrap" v-if="account">
        <el-drawer title="账号详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%' :before-close="handleClose">
            <!-- <div class="container" v-for="(item,index) in account" :key="index">
                <div class="con-box">
                    <span>企业名称：</span>
                    <span>{{item.companyName}}</span>
                </div>
                <div class="con-box" v-if="item.merchantAccountType">
                    <span>大B账号类型：</span>
                    <span><i>{{item.merchantAccountType}}</i></span>
                </div>
                <div class="con-box" v-if="item.memberAccountType">
                    <span>小b账号类型：</span>
                    <span><i>{{item.memberAccountType}}</i></span>
                </div>
            </div> -->
            <!-- <div class="con-box" v-if="account.length==0">
                <div style="display: flex;flex: 1;justify-content: center;">暂无企业</div>
            </div> -->
            <div class="container">
                <div class="account-top">
                    <div class="account-topimg"><img :src="account.avatarUrl" /></div>
                    <div>
                        <p>{{account.name}}</p>
                        <p>{{account.username}}</p>
                    </div>
                </div>
                <h3>基本信息</h3>
                <div class="account-title"><i>注册时间</i> {{moment(account.createTime).format('YYYY-MM-DD HH:mm')}}</div>
                <div class="account-title"><i>账号来源</i> {{account.source}}</div>
                <h3>他/她管理的企业</h3>
                <div class="account-box" v-for="(item,index) in account.companyList" :key="index">
                    <p>{{item.companyName}} <em>{{item.isAuthentication?'已认证':'未认证'}}</em></p>
                    <ul>
                        <li v-for="(val,index) in item.roles" :key="index">{{val}}</li>
                    </ul>
                </div>
                <div class="account-box" v-if="account.companyList&&account.companyList.length==0">
                    <p>暂无企业</p>
                </div>
                <h3>关联的微信用户</h3>
                <div class="account-wx" v-for="(item,index) in account.wxUserList" :key="item.userId">
                    <img :src="item.avatarUrl" alt="">
                    <div class="account-wx_user">
                        <p><i>昵称</i>&emsp;{{item.nickName}}</p>
                        <p><i>userid：</i>&emsp;{{item.userId?item.userId:'-'}}&emsp;<i>openid：</i>&emsp;{{item.openid?item.openid:'-'}}&emsp;<i>unionid：</i>&emsp;{{item.unionid?item.unionid:'-'}}</p>
                    </div>
                </div>
                <div class="account-box" v-if="account.wxUserList&&account.wxUserList.length==0">
                    <p>暂无关联的用户</p>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
    name: 'account',
    props: {
        drawer: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            account: {},
            moment
        }
    },
    computed: {
        ...mapGetters({
            accountDetail: 'accountDetail'
        })
    },
    methods: {
        ...mapActions({
            findAccountDetail: 'findAccountDetail'
        }),
        handleClose () {
            this.$emit('backEvent')
        },
        async onFindAccountDetail (val) {
            await this.findAccountDetail(val)
            this.account = this.accountDetail
            console.log(this.account)
        }
    },
    mounted () { }
}
</script>
<style  lang="scss" scoped>
.container {
    padding: 0 10px;
    .account-box {
        display: flex;
        flex-direction: column;
        background: #f7f5f5;
        margin: 10px;
        padding: 10px;
        p {
            color: #13c2c2;
            em {
                background: #e26666;
                font-size: 14px;
                border-radius: 6px;
                color: #fff;
                font-style: normal;
                padding: 0 6px;
            }
        }
        li {
            border: 1px solid #fdb192;
            background: #fdb192;
            padding: 0 6px;
            font-size: 14px;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 0 0 0;
        }
    }

    .account-top {
        background: #f7f5f5;
        display: flex;
        justify-content: row;
        align-items: center;
        .account-topimg {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            margin: 10px;
            img {
                width: 80px;
                height: 80px;
            }
        }
        p {
            font-size: 16px;
        }
    }

    h3 {
        font-size: 16px;
        color: #ff7a45;
        margin-top: 10px;
    }
    .account-title {
        i {
            color: #737070;
            font-style: normal;
        }
        padding: 10px;
    }
    .account-wx {
        background: #f7f5f5;
        display: flex;
        align-items: center;
        margin-top: 10px;
        .account-wx_user {
            display: flex;
            flex-direction: column;
            i {
                font-style: normal;
                color: #737070;
            }
            p {
                padding: 0 0 10px 0;
            }
        }
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin: 10px;
        }
    }
}
</style>