<template>
    <div class="drawer-wrap">
        <el-drawer title="客户详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='40%' :before-close="handleClose" :wrapperClosable=false>
            <div class="drawer-content">
                <div class="drawer-cont">
                    <div class="drawer-cont_top">
                        <img src="../../../../assets/images/img_0.png" alt="">
                        施勇
                    </div>
                    <div class="drawer-cont_text">
                        <h3 class="drawer-cont_text-tit">注册信息</h3>
                        <div class="drawer-cont_text-info">是否注册：是</div>
                        <div class="drawer-cont_text-info">注册账号：<span>15195954045</span></div>
                    </div>
                    <div class="drawer-cont_text">
                        <h3 class="drawer-cont_text-tit">基本信息</h3>
                        <div class="drawer-cont_text-info">性别：女</div>
                        <div class="drawer-cont_text-info">电话：15195954045、137789890876</div>
                        <div class="drawer-cont_text-info">添加人：赵娟</div>
                        <div class="drawer-cont_text-info">添加时间：2020-07-20 09:08</div>
                        <div class="drawer-cont_text-info">类型：微信联系人</div>
                        <div class="drawer-cont_text-info">企业：江苏舒适云信息技术有限公司</div>
                    </div>
                    <div class="drawer-cont_text">
                        <h3 class="drawer-cont_text-tit">标签</h3>
                        <div class="drawer-cont_text-info">经营规模（万元）：<i>1千万一下</i></div>
                        <div class="drawer-cont_text-info">是否有关联平台公司：-</div>
                    </div>
                </div>
                <div class="drawer-footer">
                    <div class="drawer-button">
                        <el-button @click="drawer=false">取 消</el-button>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { mapState, mapGetters, mapActions } from 'vuex'
import * as Auths from '@/utils/auth_const'
export default {
    name: 'businessdrawer',
    data () {
        return {
            drawer: false
        }
    },
    components: {
        HAutocomplete
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            nestDdata: 'nestDdata',
            branchList: 'crmmanage/crmdepList',
            crmauthDetail: 'crmauthen/crmauthDetail',
            platlist: 'crmauthen/platlist',
            whiteRecords: 'crmauthen/whiteRecords'
        })
    },
    watch: {

    },
    methods: {
        ...mapActions({
            findNest: 'findNest',
            findBusinessDetail: 'crmauthen/findBusinessDetail',
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findPlatlist: 'crmauthen/findPlatlist',
            findWhiterecords: 'crmauthen/findWhiterecords'
        }),
        onFindCustomer () {
            this.drawer = true
        },
        handleClose () {
            this.drawer = false
        }
    },
    mounted () {

    }
}
</script>
<style  lang="scss" scoped>
/deep/ .el-drawer__body {
    overflow-y: scroll;
}
.drawer-content {
    padding: 0 20px;
    .drawer-cont {
        &_top {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 10px;
            img {
                width: 50px;
                height: 50px;
                margin-right: 15px;
            }
        }
        &_text {
            margin-top: 25px;
            line-height: 30px;
            &-tit {
                color: #ff7a45;
                font-size: 15px;
            }
            &-info {
                span {
                    color: #ff7a45;
                }
                i{
                    background: #e5e5e5;
                    color: #ff7a45;
                    font-style: normal;
                    border-radius: 6px;
                    padding:0 10px;
                    font-style: 14px;
                }
            }
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
}
</style>
