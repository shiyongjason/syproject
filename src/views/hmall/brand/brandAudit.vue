<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">供应商：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入商家名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">品牌名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.brandName" placeholder="请输入品牌名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">开启时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.applicationTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.applicationTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">审核状态：</div>
                <div class="flex-wrap-cont">
                    <el-select v-model="queryParams.status" style="width: 100%">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="审核未通过" value="2"></el-option>
                        <el-option label="过期失效" value="3"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery">搜索</el-button>
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                <template slot="status" slot-scope="scope">
                    {{ auditStatusMap.get(scope.data.row.status) || '-' }}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button v-if="scope.data.row.status == 0 || scope.data.row.status == 3" class="orangeBtn" @click="showDrawer(scope.data.row, 'review')">审核</el-button>
                    <el-button v-else class="orangeBtn" @click="showDrawer(scope.data.row, 'watch')">查看</el-button>
                </template>
            </basicTable>
        </div>
        <el-drawer
            class="page-body-drawer brand-drawer"
            :title="drawerMsg.title"
            :visible.sync="drawerShow"
            :before-close="onCancel"
            direction="rtl"
            size='580px'>
            <el-form ref="suggest" :rules="rules" :model="suggest" class="suggest" label-width="100px">
                <el-form-item label="供应商：" class="mb-5">
                    {{drawerMsg.merchantName}}
                </el-form-item>
                <el-form-item label="品牌名称：" class="mb-5">
                    {{drawerMsg.brandName}}
                </el-form-item>
                <el-form-item label="代理证书：" class="mb-5">
                    <div class="proxyCert">
                        <a :href="drawerMsg.certification" target="_blank">
                        <img :src="drawerMsg.certification" alt="">
                        </a>
                    </div>
                </el-form-item>
                <el-form-item label="到期日：" class="mb-5">
                    {{drawerMsg.expiryDate}}
                </el-form-item>
                <el-form-item label="关联类目：" class="mb-20 area-cascader">
                    <!-- <div>
                        <span class="category-tip">一级类目</span>
                        <span class="category-tip">二级类目</span>
                        <span class="category-tip">三级类目</span>
                    </div> -->
                    <!-- <el-cascader-panel
                        v-model="drawerMsg.categoryIdsArr"
                        @change="cascaderPanelChange"
                        :options="categoryOptions"
                        :props="categoryProps">
                    </el-cascader-panel> -->
                    <el-cascader
                        :options="categoryOptions"
                        :props="categoryProps"
                        v-model="drawerMsg.categoryIdsArr"
                        disabled
                    >
                    </el-cascader>
                </el-form-item>
                <el-form-item label="售卖区域：" class="mb-20 area-cascader">
                    <el-cascader
                        :options="areaOptions"
                        :props="areaProps"
                        v-model="drawerMsg.areaArr"
                        disabled
                    >
                    </el-cascader>
                </el-form-item>
                <p class="audit-opinion">审核意见</p>
                <template v-if="drawerMsg.type === 'review'">
                    <el-form-item label="审核结果：" prop="auditResult" >
                        <el-radio v-model="suggest.auditResult" label="1">审核通过</el-radio>
                        <el-radio v-model="suggest.auditResult" label="2">审核不通过</el-radio>
                    </el-form-item>
                    <el-form-item label="备注原因：">
                        <el-input type="textarea" v-model="suggest.auditRemark" rows="3" maxlength="50"></el-input>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="审核结果：" class="mb-5">
                        {{ auditStatusMap.get(drawerMsg.status) || '-'}}
                    </el-form-item>
                    <el-form-item label="备注原因：" class="mb-5">
                        {{drawerMsg.remark || '-'}}
                    </el-form-item>
                    <el-form-item label="审核人：" class="mb-5">
                        {{drawerMsg.auditBy}}
                    </el-form-item>
                    <el-form-item label="审核时间：" class="mb-5">
                        {{drawerMsg.auditTime}}
                    </el-form-item>
                </template>
            </el-form>
            <div class="drawer-footer">
                <el-button name="white-color" @click="onCancel">{{ drawerMsg.type === 'review' ? '取消' : '关闭' }}</el-button>
                <el-button name="hosjoy-color" @click="onConfirm"  v-if="drawerMsg.type === 'review'">提交</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { auditBrandArea } from './api/index'
import { AUDIT_STATUS_MAP } from './const'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    name: 'brandAudit',
    data () {
        return {
            categoryProps: {
                emitPath: false,
                multiple: true
            },
            areaProps: {
                multiple: true
            },
            tableLabel: [
                { label: '供应商', prop: 'merchantName' },
                { label: '申请品牌', prop: 'brandName' },
                { label: '申请类目', prop: 'categories' },
                { label: '申请时间', prop: 'auditTime' },
                { label: '审核状态', prop: 'status' },
                { label: '审核时间', prop: 'auditTime' }
            ],
            tableData: [],
            auditStatusMap: AUDIT_STATUS_MAP,
            initParams: {},
            searchParams: {},
            queryParams: {
                merchantName: '',
                brandName: '',
                status: '',
                applicationTimeStart: '',
                applicationTimeEnd: ''
            },
            paginationData: {
                pageNumber: 1,
                pageSize: 10
            },
            drawerShow: false,
            drawerMsg: {
                title: '',
                type: ''
            },
            suggest: {
                auditResult: '',
                auditRemark: ''
            },
            rules: {
                auditResult: [
                    { required: true, message: '审核结果不能为空！' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapState('brand', {
            brandAuthorizationInfo: 'brandAuthorizationInfo',
            brandAreaInfo: 'brandAreaInfo'
        }),
        ...mapGetters('brand', {
            areaOptions: 'cityOptions'
        }),
        ...mapState('category', {
            categoriesTree: 'categoriesTree'
        }),
        ...mapGetters('category', {
            categoryOptions: 'categoryOptions'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.applicationTimeEnd
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.applicationTimeStart)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        ...mapActions('brand', [
            'findBrandAreaList',
            'findBrandAreaDetail',
            'getChiness'
        ]),
        ...mapActions('category', [
            'findAllCategory'
        ]),
        async init () {
            // 获取全类目
            await this.findAllCategory()
            // 获取省市区
            await this.getChiness()
        },
        onQuery () {
            const { ...params } = { ...this.queryParams }
            this.searchParams = params
            this.search()
        },
        onReset () {
            this.queryParams = { ...this.initParams }
            this.paginationData = {
                pageNumber: 1,
                pageSize: 10
            }
            this.onQuery()
        },
        async search () {
            const searchParams = {
                ...this.searchParams,
                ...this.paginationData
            }
            await this.findBrandAreaList({ params: searchParams })
            this.tableData = this.brandAuthorizationInfo.records
            this.paginationData = {
                pageNumber: this.brandAuthorizationInfo.current,
                pageSize: this.brandAuthorizationInfo.size,
                total: this.brandAuthorizationInfo.total
            }
        },

        // 级联面板回调
        // cascaderPanelChange () {

        // },

        async showDrawer (scope, type) {
            await this.findBrandAreaDetail({ id: scope.id })
            this.drawerMsg = {
                ...this.brandAreaInfo,
                categoryIdsArr: this.brandAreaInfo.categoryIds.split(',') || [],
                areaArr: this.brandAreaInfo.brandAuthorizationSalesAreaList.map(item => {
                    return [item.provinceId, item.cityId]
                })
            }
            this.suggest = {
                auditResult: '',
                auditRemark: ''
            }
            if (type === 'review') {
                this.drawerMsg.title = '品牌资质审核'
                this.drawerMsg.type = 'review'
            } else if (type === 'watch') {
                this.drawerMsg.title = '品牌资质查看'
                this.drawerMsg.type = 'watch'
            }
            this.drawerShow = true
            this.$nextTick(() => {
                this.$refs['suggest'].clearValidate()
            })
        },
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            const { ...page } = val
            this.paginationData = page
            this.search()
        },
        onConfirm () {
            this.auditBrandAreaAsync()
        },
        onCancel () {
            this.drawerShow = false
            this.$refs['suggest'].resetFields()
        },
        async auditBrandAreaAsync () {
            this.$refs['suggest'].validate(async (valid) => {
                if (valid) {
                    let req = {
                        id: this.drawerMsg.id,
                        remark: this.suggest.auditRemark || '',
                        status: this.suggest.auditResult,
                        auditBy: this.userInfo.employeeName,
                        auditPhone: this.userInfo.phoneNumber
                    }
                    await auditBrandArea(req)
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.drawerShow = false
                    this.onQuery()
                } else {
                    return false
                }
            })
        }
    },
    mounted () {
        this.initParams = { ...this.queryParams }
        this.onQuery()
        this.init()
    }
}
</script>

<style lang='scss' scoped>
.proxyCert {
    display: flex;
    img {
        display: block;
        width: 80px;
        height: 80px;
    }
}
.remark {
    padding-top: 20px;
}
.mb-5 {
    margin-bottom: 5px;
}
.mb-20 {
    margin-bottom: 20px;
}
.brand-drawer {
    color: #000000;
    /deep/ .el-form-item__label {
        color: #000000;
    }
    /deep/ .el-drawer__header {
        color: #000000;
        padding: 20px 24px;
        margin-bottom: 0;
        border-bottom: 1px solid #e5e5ea;
    }
    /deep/ .el-cascader-menu {
        min-width: 160px;
    }
    .area-cascader {
        /deep/ .el-cascader__tags {
            max-height: 150px;
            overflow-y: auto;
        }
        /deep/ .el-cascader {
            max-height: 150px;
        }
        /deep/ .el-input {
            width: 300px;
        }
    }
    .category-tip {
        box-sizing: border-box;
        display: inline-block;
        width: 160px;
        padding-left: 5px;
    }
}
.audit-opinion {
    padding: 10px 5px;
}
.drawer-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 12px 24px;
    border-top: 1px solid #E5E5EA;
    text-align: right;
}
</style>
