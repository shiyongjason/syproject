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
                                   @click="onEdit(scope.data.row)">查看
                        </el-button>
                        <el-button class="orangeBtn"
                                   @click="onEdit(scope.data.row)">修改
                        </el-button>
                        <el-button class="orangeBtn"
                                   @click="onEdit(scope.data.row)">删除
                        </el-button>
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getServiceResourcesTemplate } from '../api/index'
export default {
    name: 'resource',
    data () {
        return {
            categoryId: [],
            queryParams: {},
            tableLabel: [{ label: '资源模板名称', prop: 'channelName' },
                { label: '资源模板编号', prop: 'orderNo' },
                { label: '资源类目', prop: 'workOrderNo' },
                { label: '状态', prop: 'customerName' },
                { label: '创建时间', prop: 'customerMobile' }
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
        'queryParams.categoryId' () {
            return this.categoryId && this.categoryId.length > 0 ? this.categoryId[0] : ''
        },
        ...mapGetters(['doneServiceCategoryList'])
    },
    methods: {
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
            const { data } = await getServiceResourcesTemplate(params)
            this.tableData = data.records
            this.paginationData = {
                pageNumber: data.current,
                pageSize: data.size,
                total: data.total
            }
        },
        ...mapActions(['findServiceResourcesCategory'])
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
