<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">资源模板名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="20" v-model="queryParams.templateName" placeholder="请输入">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">资源模板编号：</div>
                    <div class="flex-wrap-cont">
                        <el-input type="text" maxlength="20" v-model="queryParams.templateId" placeholder="请输入">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">资源类目：</div>
                    <div class="flex-wrap-cont">
                        <el-cascader
                            v-model="categoryId"
                            :options="doneServiceCategoryList"></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery">查询</el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont query-cont all-alone-bar">
                <el-button type="primary" class="ml20" @click="addResource">添加</el-button>
            </div>
            <div class="page-body-cont">
                <basicTable :isShowIndex="true" :isAction="true" :isPagination='true' :tableLabel="tableLabel"
                            :tableData="tableData" :pagination="paginationData"
                            @onSizeChange="onSizeChange"
                            @onCurrentChange="onCurrentChange">
                    <template slot="action" slot-scope="scope">
                        <el-button class="orangeBtn"
                                   @click="goDetails(scope.data.row)">查看
                        </el-button>
                        <el-button class="orangeBtn"
                                   @click="goEdit(scope.data.row)">修改
                        </el-button>
                        <el-button class="orangeBtn"
                                   @click="onDelete(scope.data.row)">删除
                        </el-button>
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { deleteServiceResourcesTemplate } from '../api/index'
export default {
    name: 'resource',
    data () {
        return {
            categoryId: [],
            queryParams: {},
            tableLabel: [{ label: '资源模板名称', prop: 'resourceTemplateName' },
                { label: '资源模板编号', prop: 'templateId' },
                { label: '资源类目', prop: 'categoryPath' },
                { label: '创建时间', prop: 'createTime' }
            ],
            tableData: [],
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    computed: {
        ...mapGetters(['doneServiceCategoryList', 'doneServiceTemplateList'])
    },
    watch: {
        categoryId (val, oldVal) {
            if (val && val.length > 0) {
                this.queryParams.categoryId = this.categoryId[this.categoryId.length - 1]
            }
        }
    },
    methods: {
        goDetails (row) {
            this.$router.push({
                path: '/serviceManagement/serviceResourceDetails',
                query: {
                    methods: 'details',
                    templateId: row.templateId
                }
            })
        },
        goEdit (row) {
            this.$router.push({
                path: '/serviceManagement/serviceResourceDetails',
                query: {
                    methods: 'edit',
                    templateId: row.templateId
                }
            })
        },
        addResource () {
            this.$router.push({
                path: '/serviceManagement/serviceResourceDetails'
            })
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        async onQuery () {
            const params = { ...this.queryParams }
            // console.log(params)
            await this.getServiceResourcesTemplate(params)
            this.tableData = this.doneServiceTemplateList.records
            this.paginationData = {
                pageNumber: this.doneServiceTemplateList.current,
                pageSize: this.doneServiceTemplateList.size,
                total: this.doneServiceTemplateList.total
            }
        },
        onDelete (row) {
            this.$alert('确认删除资源数据？', '', {
                confirmButtonText: '确定',
                showClose: false,
                callback: async (action) => {
                    if (action === 'confirm') {
                        try {
                            await deleteServiceResourcesTemplate(row.templateId)
                            this.onQuery()
                        } catch (e) {}
                    }
                }
            })
        },
        ...mapActions(['findServiceResourcesCategory', 'getServiceResourcesTemplate'])
    },
    mounted () {
        this.findServiceResourcesCategory()
        this.onQuery()
    }
}
</script>

<style scoped>
.all-alone-bar{
    padding-bottom: 20px;
}
</style>
