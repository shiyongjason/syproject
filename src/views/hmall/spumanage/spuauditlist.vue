<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">SPU编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" placeholder="请输入商品编码" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuName" placeholder="请输入商品名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品品牌：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.brandName" placeholder="请输入商品品牌" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品类目：</div>
                    <div class="query-col-input">
                        <el-cascader :options="categoryOptions" v-model="categoryIdArr" clearable @change="productCategoryChange"></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品型号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.model" placeholder="请输入商品型号" maxlength="50"></el-input>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">商品来源：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.merchantName" placeholder="输入商品来源" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">提交时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.createTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.createTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">审核状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.auditStatus" style="width: 100%">
                            <el-option
                                v-for="item in auditStatusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-checkbox v-model="queryParams.checked">自营</el-checkbox>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest">
                            重置
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onChangeStatus">批量审核</el-button>
                        <el-button type="primary" class="ml20" @click="onExport">导出</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable
                :tableData="tableData"
                :tableLabel="tableLabel"
                :pagination="paginationInfo" @onCurrentChange="handleCurrentChange"
                @onSizeChange="handleSizeChange"
                :multiSelection.sync='multiSelection'
                :isMultiple="true"
                :isAction="true"
                :actionWidth=150
                :rowKey="rowKey"
                :isShowIndex='true'
            >
                <template slot="spuName" slot-scope="scope">
                    {{scope.data.row.brandName}}{{scope.data.row.spuName}}
                </template>
                <template slot="brandName" slot-scope="scope">
                    {{scope.data.row.brandName}}
                </template>
                <template slot="auditStatus" slot-scope="scope">
                    <span :class="scope.data.row.auditStatus==0?'colgry':scope.data.row.auditStatus==1?'':'colred'">
                        {{scope.data.row.auditStatus==0?'待审核':scope.data.row.auditStatus==1?'通过':'未通过'}}
                    </span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onAuditSpu(scope.data.row)" v-if="scope.data.row.auditStatus==0">审核</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { spuAuditBatch } from './api/index'
import { AUDIT_STATUS } from './const'
import { mapState, mapActions, mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { clearCache, newCache } from '@/utils/index'
import { B2bUrl } from '@/api/config'
export default {
    name: 'spuauditlist',
    data () {
        return {
            productSource: [],
            auditStatusOptions: AUDIT_STATUS,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                spuCode: '',
                spuName: '',
                model: '',
                categoryId: '',
                brandId: '',
                auditStatus: '',
                source: 1,
                merchantName: '',
                createTimeStart: '',
                createTimeEnd: '',
                checked: false
            },
            copyParams: {},
            tableData: [],
            paginationInfo: {},
            tableLabel: [
                { label: 'SPU编码', prop: 'spuCode' },
                { label: '商品名称', prop: 'spuName', width: '150' },
                { label: '品牌', prop: 'brandName', width: '200' },
                { label: '商品类目', prop: 'category', width: '200' },
                { label: '型号', prop: 'model', width: '200' },
                { label: '审核状态', prop: 'auditStatus' },
                { label: '提交时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '商品来源', prop: 'merchantName' }
            ],
            rowKey: '',
            multiSelection: [],
            categoryIdArr: [],
            removeValue: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters('category', {
            categoryOptions: 'categoryOptions'
        }),
        ...mapState('spumanage', {
            productsAuditListInfo: 'productsAuditListInfo'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.createTimeEnd
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal)
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.createTimeStart
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal)
                    }
                }
            }
        }
    },

    async mounted () {
        this.findAllCategory()
        // const { data } = await findBossSource({ withBoss: 0 })
        // this.productSource = data
        // TODO 模糊搜索组件
        this.productSource && this.productSource.map(item => {
            item.value = item.sourceName
            item.selectCode = item.sourceCode
        })
        this.productSource = []
        this.searchList()
        this.copyParams = deepCopy(this.queryParams)
    },
    activated () {
        this.searchList()
    },
    methods: {
        ...mapActions('category', [
            'findAllCategory'
        ]),
        ...mapActions('spumanage', [
            'findAuditProducts'
        ]),
        onRest () {
            this.categoryIdArr = []
            this.queryParams = deepCopy(this.copyParams)
            this.removeValue = true
            this.searchList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        productCategoryChange (val) {
            this.queryParams.categoryId = val[val.length - 1]
        },
        async searchList () {
            const { ...params } = this.queryParams
            if (params.categoryId) params.categoryId = params.categoryId[params.categoryId.length - 1]
            await this.findAuditProducts(params)
            this.tableData = this.productsAuditListInfo.records
            this.paginationInfo = {
                pageNumber: this.productsAuditListInfo.current,
                pageSize: this.productsAuditListInfo.size,
                total: this.productsAuditListInfo.total
            }
            this.removeValue = false
        },
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无商品审核数据可导出！')
            } else {
                let url = ''
                for (let key in this.queryParams) {
                    url += (key + '=' + (this.queryParams[key] ? this.queryParams[key] : '') + '&')
                }
                location.href = B2bUrl + 'product/api/spu/boss/audit-page/export?access_token=' + sessionStorage.getItem('tokenB2b') + '&' + url
            }
        },
        // 批量审核通过
        onChangeStatus () {
            if (this.multiSelection.length < 1) {
                this.$message.warning('请先选择商品！')
                return
            }
            this.$confirm('是否批量审核通过', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await spuAuditBatch({ spuIdList: this.multiSelection.map(v => v.spuId), auditStatus: '1' })
                this.$message.success('操作成功')
                this.searchList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        onAuditSpu (val) {
            this.$router.push({ path: '/hmall/spudetail', query: { type: 'audit', spuId: val.spuId } })
        }
    },
    beforeRouteEnter (to, from, next) {
        newCache('spuauditlist')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'spudetail') {
            clearCache('spuauditlist')
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