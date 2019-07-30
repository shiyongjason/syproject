<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">公司：</div>
                    <div class="query-col-input">
                        <el-input placeholder="输入公司名称" v-model="params.companyName" maxlength="16">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="params.status" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" @click="onSearch()">查询</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <reviewTable :totalData="totalTableData" :paginationData="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                </reviewTable>
        </div>
    </div>
</template>
<script>
import reviewTable from './components/reviewTable'
import { getDuemain } from './api/index.js'
import { mapState } from 'vuex'
export default {
    name: 'reviewform',
    data () {
        return {
            params: {
                status: '',
                companyName: '',
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
        this.getDuemain()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onSizeChange (val) {
            this.params.pageSize = val
            this.getDuemain()
        },
        onCurrentChange (val) {
            this.params.pageNumber = val
            this.getDuemain()
        },
        onSearch () {
            this.params.pageNumber = 1
            this.getDuemain()
        },
        async  getDuemain () {
            this.params.organizationCode = this.userInfo.organizationCode
            this.params.role = this.userInfo.positionCode
            const { data } = await getDuemain(this.params)
            this.totalTableData = data.data.pageContent
            this.paginationData = {
                pageNumber: data.data.pageNumber,
                totalElements: data.data.totalElements
            }
        }
    },
    components: {
        reviewTable
    }
}
</script>

<style lang="scss" >
</style>
