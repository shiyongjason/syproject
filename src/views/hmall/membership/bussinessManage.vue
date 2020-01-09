<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">商家账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" placeholder="请输入账号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">所属分部：</div>
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
                     <el-checkbox v-model="checked">只看启用</el-checkbox>
                </div>
                  <div class="query-cont-col">
                    <div class="query-col-title">商家类型：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.integrity">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="体系内" value="1"></el-option>
                            <el-option label="体系外" value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">注册时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="date" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">认证状态：</div>
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
                    <div class="query-col-title">认证时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="date" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
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
            <el-tag size="medium" class="eltagtop">已筛选 5 项  |   未认证：0；已认证：0；启用状态：5；禁用状态：5；上架商品总数：2345；店铺商品总数：2345；会员总数：2345；</el-tag>
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
        <drawerCom :drawer=drawer @backEvent='restDrawer'></drawerCom>
    </div>
</template>
<script>
import drawerCom from './drawerCom'
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
                { label: '企业名称', prop: 'spuCode' },
                { label: '企业名称', prop: 'brandName' },
                { label: '所属分部', prop: 'spuName' },
                { label: '商家类型', prop: 'spuName' },
                { label: '上架商品数', prop: 'spuName' },
                { label: '店铺商品数', prop: 'spuName' },
                { label: '会员数', prop: 'spuName' },
                { label: '注册时间', prop: 'spuName' },
                { label: '认证状态', prop: 'spuName' },
                { label: '认证时间', prop: 'spuName' },
                { label: '商家角色权限', prop: 'spuName' },
                { label: '自动推送至店铺', prop: 'spuName' },
                { label: '状态', prop: 'spuName' }
            ],
            tableData: [{ spuCode: 111, brandName: 'hah', spuName: '233' }],
            drawer: false,
            checked: false
        }
    },
    components: {
        drawerCom
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
.eltagtop{
    margin-bottom: 10px;
}
</style>