<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col" style="width: 400px;">
                    <div class="query-col-title">被邀请人（会员）：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.member" style="width: 260px;" placeholder="请输入被邀请会员的账号和企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col" style="width: 372px;">
                    <div class="query-col-title">邀请人（会员）：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.recommendedMember" style="width: 240px;" placeholder="请输入邀请人的账号和企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <!-- <div class="query-cont-col">
                    <div class="query-col-title">所属合伙人（平台公司）：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.merchantName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div> -->
                <div class="query-cont-col">
                    <div class="query-col-title">注册时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.createTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.createTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <!-- <div class="query-cont-col">
                    <div class="query-col-title">是否认证：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.authenticated" placeholder="请选择" >
                            <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div> -->
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                    <el-button type="primary" class="ml20" @click="onReset()">重置</el-button>
                    <el-button type="primary" class="ml20" @click="onImport()">导出</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250 :isShowIndex='false'>
                <!-- <template slot="authenticated" slot-scope="scope">
                    {{scope.data.row.authenticated==1?'是':'否'}}
                </template> -->
                <template slot="memberName" slot-scope="scope">
                    {{scope.data.row.memberAccount}}{{scope.data.row.memberName?'('+scope.data.row.memberName+')':''}}
                </template>
                <template slot="recommendName" slot-scope="scope">
                    {{scope.data.row.recommendedAccount}}{{scope.data.row.recommendedMemberName?'('+scope.data.row.recommendedMemberName+')':''}}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getRecomendboss } from './api/index'
import { deepCopy } from '@/utils/utils'
import { B2bUrl } from '@/api/config'
export default {
    name: 'memberPull',
    data: function () {
        return {
            deepCopyparams: {},
            options: [{ name: '全部', key: '' }, { name: '是', key: 1 }, { name: '否', key: 0 }],
            queryParams: {
                createTimeStart: '',
                createTimeEnd: '',
                member: '',
                pageNumber: 1,
                pageSize: 10,
                recommendedMember: ''
            },
            tableLabel: [{ label: '被邀请人（会员）', prop: 'memberName' },
                { label: '注册时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '邀请人（会员）', prop: 'recommendName' }
            ],
            paginationInfo: {},
            tableData: [],
            B2bUrl: B2bUrl
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.createTimeEnd
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.createTimeStart
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }

    },
    components: {

    },
    mounted () {
        this.deepCopyparams = deepCopy(this.queryParams)
        this.getRecomendboss()
    },
    methods: {
        onQuery () {
            this.queryParams.pageNumber = 1
            this.getRecomendboss()
        },
        onReset () {
            this.queryParams = deepCopy(this.deepCopyparams)
            this.getRecomendboss()
        },
        onImport () {
            var url = ''
            for (var key in this.queryParams) {
                url += (key + '=' + this.queryParams[key] + '&')
            }
            // console.log(url)
            location.href = this.B2bUrl + 'merchant/api/company/boss/recommended/export?' + url + 'access_token=' + sessionStorage.getItem('tokenB2b')
        },
        async getRecomendboss () {
            const { data } = await getRecomendboss(this.queryParams)
            this.tableData = data.records
            this.paginationInfo = {
                total: data.total,
                pageNumber: data.current,
                pageSize: data.size
            }
        },
        handleSizeChange (val) {
            console.log(val)
            this.queryParams.pageSize = val
            this.getRecomendboss()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.getRecomendboss()
        }
    }
}
</script>

<style scoped lang="scss">

</style>
