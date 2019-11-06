<template>
    <div class="tags-wrapper page-body">
        <apply @onSearch='onSearch'></apply>
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
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createTimeStart" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10"> --</span>
                    <el-date-picker v-model="queryParams.createTimeEnd" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
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
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" isShowIndex>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onupdate(scope.data.row)">查看信息</el-button>
                </template>
            </basicTable>
            <CaDialog :dialog='dialog' @onCancel='dialog = false'></CaDialog>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import apply from './components/CAapply'
import CaDialog from './components/dialog'
export default {
    name: 'enterpriseCA',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
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
    components: {
        apply: apply,
        CaDialog: CaDialog
    },
    data () {
        return {
            tableLabel: [
                { label: '企业名称', prop: 'positionName' },
                { label: '企业类型', prop: 'positionCode' },
                { label: '企业账号ID', prop: 'updateTime' },
                { label: '操作人账号ID', prop: 'updateTime' },
                { label: '操作人姓名', prop: 'updateTime' },
                { label: '操作人手机号', prop: 'updateTime' },
                { label: '操作人身份证', prop: 'updateTime' },
                { label: '操作人邮箱', prop: 'updateTime' },
                { label: '证件类型', prop: 'updateTime' },
                { label: '组织机构代码证号', prop: 'updateTime' },
                { label: '创建日期', prop: 'updateTime' },
                { label: '法人姓名', prop: 'updateTime' },
                { label: '法人手机号', prop: 'updateTime' },
                { label: '法人身份证号', prop: 'updateTime' },
                { label: '验证状态', prop: 'updateTime' }
            ],
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                keywords: '',
                createTimeStart: '',
                createTimeEnd: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 100
            },
            dialogVisible: true,
            addTags: {
                labelName: '',
                labelType: '1'
            },
            multipleSelection: [],
            dialog: false
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        async onQuery () {
            // const { data } = await findTagsList(this.queryParams)
            // this.tableData = data.records
            // 控制页数和页码
            // this.pagination = {
            //     pageNumber: data.current,
            //     pageSize: data.size,
            //     total: data.total
            // }
            console.log(this.searchParams)
            this.tableData = [
                {
                    positionName: '1',
                    updateTime: '111'
                }
            ]
        },
        onSearch (val) {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'keywords', '')
            this.$set(this.queryParams, 'createTimeStart', '')
            this.$set(this.queryParams, 'createTimeEnd', '')
            this.onSearch()
        },
        async createTags () { },
        async cancel () { },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onupdate () {
            this.dialog = true
        }
    }
}
</script>

<style scoped>
.add-tags-dialog {
    padding-top: 20px;
}
</style>
