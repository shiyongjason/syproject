<template>
    <div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div>企业CA认证申请</div>
            </div><br>
            <div class="query-cont-col">
                <div class="query-col-title">企业名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.keywords" placeholder="请输入企业名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建日期：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.keywords" placeholder="请输入创建日期">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery">重置</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                keywords: '',
                channelType: ''
            }
        }
    },
    methods: {
        onQuery () {
            this.$emit('onQuery')
        }
    }
}
</script>

<style scoped>
</style>