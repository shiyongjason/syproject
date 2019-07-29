<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="page-header">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>尽调管理</el-breadcrumb-item>
                    <el-breadcrumb-item>尽调申请</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="page-wrap flex-wrap-col">
                <div class="flex-wrap-row">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">公司：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                placeholder="输入公司名称"
                                v-model="params.companyName"
                                maxlength="16"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">状态：</div>
                        <div class="flex-wrap-cont">
                            <el-select
                                v-model="params.approvalStatus"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-cont pl20">
                            <el-button
                                type="primary"
                                @click="onSearch()"
                            >搜索</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="top10">
                <!-- <router-link to="/bestonline/applyform"> -->
                    <el-button
                        type="primary"
                        class="ml20"
                        @click="addNewApply"
                    >
                        添加申请
                    </el-button>
                <!-- </router-link> -->
            </div>
            <div class="page-box top10">
                <applyTable
                    :totalData="totalTableData"
                    :paginationData="paginationData"
                    @onSizeChange="onSizeChange"
                    @onCurrentChange="onCurrentChange"
                >
                </applyTable>
            </div>
        </div>
    </div>
</template>
<script>
import applyTable from './components/applyTable'
import { getDueapply } from './api/index.js'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'application',
    data () {
        return {
            params: {
                companyName: '',
                approvalStatus: '',
                organizationCode: '',
                role: '',
                pageNumber: 1,
                pageSize: 10
            },
            paginationData: {},
            totalTableData: [],
            options: [{ value: '请选择', key: '' }, { value: '未提交', key: 0 }, { value: '审批中', key: 1 }, { value: '审批通过', key: 2 }, { value: '审批驳回', key: 3 }]
        }
    },
    mounted () {
        this.getDueapply()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapMutations({
            getApplyCompanyName: 'GET_APPLY_COMPANY_NAME'
        }),
        addNewApply () {
            this.getApplyCompanyName('申请')
            this.$router.push({ path: '/bestonline/applyform' })
        },
        onSizeChange (val) {
            this.params.pageSize = val
            this.getDueapply()
        },
        onCurrentChange (val) {
            this.params.pageNumber = val
            this.getDueapply()
        },
        onSearch () {
            this.params.pageNumber = 1
            this.getDueapply()
        },
        async  getDueapply () {
            this.params.organizationCode = this.userInfo.organizationCode
            this.params.role = this.userInfo.positionCode
            const { data } = await getDueapply(this.params)
            this.totalTableData = data.data.pageContent
            this.paginationData = {
                pageNumber: data.data.pageNumber,
                totalElements: data.data.totalElements
            }
        }
    },
    components: {
        applyTable
    }
}
</script>

<style lang="scss" scoped>
</style>
