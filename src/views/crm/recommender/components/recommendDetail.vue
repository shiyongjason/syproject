<template>
    <div>
        <el-drawer title="邀请详情" :visible.sync="true" :before-close="handleClose" size="50%">
            <div class="drawer-wrap">
                <div class="user-base-info">
                    <p class="avatar">
                        <img src="" alt="">
                    </p>
                    <p>
                        <span></span>
                        <span></span>
                    </p>
                </div>
                <h2>基本信息</h2>
                <p class="info">激活时间：</p>
                <p class="info">推荐官来源：</p>
                <h2>推荐记录</h2>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="已注册" name="first">用户管理</el-tab-pane>
                    <el-tab-pane label="已认证" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="以评级" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="已失效" name="fourth">定时任务补偿</el-tab-pane>
                </el-tabs>
                <h2>奖励记录：累计获得{{1000}}元</h2>
                <div>
                    <p class="row-info">
                        {{''}}
                        <span class="time"></span>
                        获得信用评级，奖励{{350}}元
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
export default {
    name: 'recommendDetail',
    data () {
        return {
            activeName: 'first'
        }
    },
    methods: {
        handleClose () {

        },
        handleClick (tab, event) {
            console.log(tab, event)
        }
    }
}
</script>

<style scoped>

</style>
