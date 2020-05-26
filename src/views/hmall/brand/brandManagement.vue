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
                <div class="query-col-title">类目：</div>
                <div class="query-col-input">
                    <el-cascader
                        v-model="queryParams.category"
                        :options="categoryOptions"
                        :props="queryParamsCategoryProps"
                        >
                    </el-cascader>
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
                    <el-button class="orangeBtn" @click="showDrawer(scope.data.row)">管理</el-button>
                </template>
            </basicTable>
        </div>
        <el-drawer
            class="page-body-drawer brand-drawer"
            title="品牌资质管理"
            :visible.sync="drawerShow"
            :before-close="onCancel"
            direction="rtl"
            size='580px'>
            <el-form ref="auditForm" :rules="rules" :model="auditForm" class="auditForm" label-width="100px">
                <el-form-item label="供应商：" class="mb-5">
                    {{auditForm.merchantName}}
                </el-form-item>
                <el-form-item label="品牌名称：" class="mb-5">
                    {{auditForm.brandName}}
                </el-form-item>
                <el-form-item label="代理证书：">
                    <div class="proxyCert">
                        <a :href="auditForm.certification" target="_blank">
                        <img :src="auditForm.certification" alt="">
                        </a>
                    </div>
                </el-form-item>
                <el-form-item label="到期日：">
                    <el-date-picker type="date" placeholder="选择日期" :editable="false" value-format="yyyy-MM-dd" v-model="auditForm.expiryDate"></el-date-picker>
                </el-form-item>

                <el-form-item label="关联类目：">
                    <div>
                        <span class="category-tip">一级类目</span>
                        <span class="category-tip">二级类目</span>
                        <span class="category-tip">三级类目</span>
                    </div>
                    <el-cascader-panel
                        v-model="auditForm.categoryIdsArr"
                        @change="cascaderPanelChange"
                        :options="categoryOptions"
                        :props="categoryProps">
                    </el-cascader-panel>
                </el-form-item>
                <el-form-item label="售卖区域：" class="area-cascader">
                    <el-cascader
                        :options="areaOptions"
                        :props="areaProps"
                        v-model="auditForm.areaArr"
                    >
                    </el-cascader>
                </el-form-item>
            </el-form>
            <div class="drawer-footer">
                <el-button name="white-color" @click="onCancel">取消</el-button>
                <el-button name="hosjoy-color" @click="onConfirm">提交</el-button>
            </div>
        </el-drawer>
    </div>
</template>
<script>
/*
    这个页面暂时不做了
*/
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
                { label: '授权品牌', prop: 'brandName' },
                { label: '授权类目', prop: 'categories' },
                { label: '到期日', prop: 'expiryDate' },
                { label: '最近维护人', prop: 'status' },
                { label: '最近维护时间', prop: 'lastModifyTime' }
            ],
            tableData: [],
            auditStatusMap: AUDIT_STATUS_MAP,
            initParams: {},
            searchParams: {},
            queryParamsCategoryProps: {
                emitPath: false
            },
            queryParams: {
                merchantName: '',
                brandName: '',
                category: '',
                status: 1
            },
            paginationData: {
                pageNumber: 1,
                pageSize: 10
            },
            drawerShow: false,
            auditForm: {
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
            areaOptions: 'areaOptions'
        }),
        ...mapState('category', {
            categoriesTree: 'categoriesTree'
        }),
        ...mapGetters('category', {
            categoryOptions: 'categoryOptions'
        })
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
        cascaderPanelChange () {

        },
        async showDrawer (scope, type) {
            await this.findBrandAreaDetail({ id: scope.id })
            this.auditForm = {
                ...this.brandAreaInfo,
                categoryIdsArr: this.brandAreaInfo.categoryIds.split(',') || [],
                areaArr: this.brandAreaInfo.brandAuthorizationSalesAreaList.map(item => {
                    return [item.provinceId, item.cityId, item.areaId]
                })
            }

            this.drawerShow = true
            this.$nextTick(() => {
                this.$refs['auditForm'].clearValidate()
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
            this.$refs['auditForm'].resetFields()
        },
        async auditBrandAreaAsync () {
            this.$refs['auditForm'].validate(async (valid) => {
                if (valid) {
                    let req = {
                        id: this.auditForm.id,
                        remark: this.auditForm.auditRemark || '',
                        status: this.auditForm.auditResult,
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
            max-height: 200px;
            overflow-y: auto;
        }
        /deep/ .el-cascader {
            max-height: 200px;
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
