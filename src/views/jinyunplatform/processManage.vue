<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <h3>审批流程查询</h3>
            </div>
            <div class="padd20">
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="20" v-model="queryParams.companyName" placeholder="请输入企业名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">创建时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.createDate" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="请选择时间" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                    </div>
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                    </div>
                </div>
            </div>
            <div class="query-cont-col">
                <h3>审批流程展示</h3>
            </div>
            <div class="padd20">
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' isShowIndex>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getSignList, getSignsDetail, signImage } from './api/index'
import { interfaceUrl } from '@/api/config'
export default {
    name: 'enterpriseCA',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {

                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createTimeEnd
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createTimeStart
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        }
    },
    data () {
        return {
            tableLabel: [
                { label: '任务标题', prop: 'companyName' },
                { label: '任务内容', prop: 'companyType' },
                { label: '待审批人员', prop: 'companySignatureId' },
                { label: '创建日期', prop: 'createTime', formatters: 'dateTime' }
            ],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                companyName: '',
                createDate: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 100
            }
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        async onQuery () {
            // console.log(this.searchParams)
            const { data } = await getSignList(this.queryParams)
            console.log(data)
            this.tableData = data.records
            this.tableData.map(i => {
                if (i.companyType == 1) i.companyType = '借款方'
                if (i.companyType == 2) i.companyType = '资金方'
                if (i.companyType == 3) i.companyType = '合作方'
                if (i.companyType == 4) i.companyType = '组织方'
                if (i.companyType == 5) i.companyType = '担保方'
                if (i.companyDocumentType == 1) i.companyDocumentType = '统一社会信用代码证'
                if (i.status == 1) i.status = '认证成功'
                if (i.status == 2) i.status = '认证失败'
            })
            // 控制页数和页码
            this.pagination = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        onSearch (val) {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'companyName', '')
            this.$set(this.queryParams, 'createDate', '')
            this.onSearch()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        }
    }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog {
    min-width: 350px;
}
/deep/ .el-dialog__body {
    min-height: 256px;
}
.add-tags-dialog {
    padding-top: 20px;
}
.padd20{
    padding: 0 20px;
}
</style>
