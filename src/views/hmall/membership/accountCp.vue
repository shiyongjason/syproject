<template>
    <div class="drawer-wrap">
        <el-drawer title="账号详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%' :before-close="handleClose">
            <div class="container">
                <div class="con-box">
                    <span>企业名称：</span>
                    <span>江苏舒适云信息技术有限公司</span>
                </div>
                <div class="con-box">
                    <span>大B账号类型：</span>
                    <span><i>管理员</i></span>
                </div>
                 <div class="con-box">
                    <span>小b账号类型：</span>
                    <span><i>管理员</i></span>
                </div>
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

        }
    },
    computed: {
        ...mapGetters({
            myDoubleSalaryGetter: 'doubleSalaryList',
            myTotalSalary: 'totalSalary'
        })
    },
    methods: {
        ...mapActions({
            findNest: 'findNest'
        }),
        handleClose () {
            this.$emit('backEvent')
        }
    }
}
</script>
<style  lang="scss" scoped>
.container {
    padding: 0 10px;
    .con-box {
        display: flex;
        margin-bottom: 10px;
        span{
            &:first-child{
                width: 150px;
                text-align: right;
            }
            i{
                border:1px solid #fdb192 ;
                background: #fdb192 ;
                font-style: normal;
                padding:0 6px;
                font-size: 14px;
                border-radius: 5px;
            }
        }
    }
}
</style>