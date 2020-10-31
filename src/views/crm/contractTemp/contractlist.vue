<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>

                <div class="query-cont__col">
                    <h-button type="primary">
                        查询
                    </h-button>
                    <h-button>
                        重置
                    </h-button>
                </div>
            </div>

            <!-- <el-tag size="medium" class="eltagtop">已筛选 {{creditdata.total||0}} 项</el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" actionWidth='300' :isShowIndex='true'>

            </basicTable> -->
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            queryParams: {
                companyName: ''
            }
        }
    }
}
</script>
<style scoped lang="scss">
</style>