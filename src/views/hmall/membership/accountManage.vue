<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" placeholder="请输入账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">注册时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">账号来源：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.integrity">
                            <el-option label="全部" value="">
                            </el-option>
                            <el-option label="完整" value="1">
                            </el-option>
                            <el-option label="不完整" value="0">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=250 :isShowIndex='true'>
                <template slot="brandName" slot-scope="scope">
                    {{scope.data.row.brandName}}{{scope.data.row.brandNameEn}}
                </template>
                <template slot="status" slot-scope="scope">
                    <span :class="scope.data.row.status==1?'colred':'colgry'">{{scope.data.row.status==1?'启用':'禁用'}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onFindInfo(scope.data.row)">编辑</el-button>
                </template>
            </basicTable>
        </div>
        <accountCp :drawer=drawer @backEvent = 'restDrawer'></accountCp>
    </div>
</template>
<script>
import accountCp from './accountCp'
import { mapState, mapActions } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { clearCache, newCache } from '@/utils/index'
export default {
    name: 'spumange',
    data () {
        return {
            queryParams: {},
            paginationInfo: {},
            tableLabel: [
                { label: 'SPU编码', prop: 'spuCode' },
                { label: '品牌', prop: 'brandName' },
                { label: '商品名称', prop: 'spuName', width: '200' }
            ],
            tableData: [{ spuCode: 111, brandName: 'hah', spuName: '233' }],
            drawer: false
        }
    },
    components: {
        accountCp
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo,
            userInfo2: state => state.hmall.userInfo,
            categoryList: state => state.hmall.categoryList
        })

    },
    async mounted () {

    },
    methods: {
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        onFindInfo () {
            this.drawer = true
        },
        restDrawer () {
            this.drawer = false
        }
    },
    beforeRouteEnter (to, from, next) {
        newCache('spumange')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'spudetail') {
            clearCache('spumange')
        }
        next()
    }
}
</script>
<style lang="scss" scoped>
.colred {
    color: #ff7a45;
}
.colgry {
    color: #ccc;
}
</style>