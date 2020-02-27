<template>
    <div class="drawer-wrap">
        <el-drawer title="账号详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%' :before-close="handleClose">
            <div class="container" v-for="(item,index) in account" :key="index">
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
            </div>
            <div class="con-box" v-if="account.length==0">
                <div style="display: flex;flex: 1;justify-content: center;">暂无企业</div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
            account: []
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
        }
    },
    mounted () { }
}
</script>
<style  lang="scss" scoped>
.container {
    padding: 0 10px;
    .con-box {
        display: flex;
        margin-bottom: 10px;
        div {
            display: flex;
            flex: 1;
            justify-content: center;
            text-align: center;
        }
        span {
            &:first-child {
                width: 150px;
                text-align: right;
            }
            i {
                border: 1px solid #fdb192;
                background: #fdb192;
                font-style: normal;
                padding: 0 6px;
                font-size: 14px;
                border-radius: 5px;
            }
        }
    }
}
</style>