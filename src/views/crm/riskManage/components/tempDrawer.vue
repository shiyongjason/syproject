<template>
    <div class="temp-drawer">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>

export default {
    name: 'projectdrawer',
    props: {
        drawer: {
            type: Boolean,
            default: false,
            activeName: 'second'
        }
    },
    components: {
    },
    data () {
        return {

        }
    },
    computed: {

    },

    mounted () {
    },
    methods: {
        handleClick (tab, event) {
            console.log(tab, event)
        }
    }
}
</script>
<style  lang="scss" scoped>
</style>