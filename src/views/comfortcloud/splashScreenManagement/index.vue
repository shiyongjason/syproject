<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>闪屏管理</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">标题：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.brandName" maxlength="20" placeholder="输入标题"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="onQuery(queryParams)">搜索</el-button>
                <el-button type="primary" class="ml20" @click="onOpenModel">新建</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="cloudEquipmentErrorList" :pagination="cloudEquipmentErrorPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' @onSortChange="onSortChange" :isAction="true" :actionMinWidth='80'>
                <template slot="shy" slot-scope="scope">
                    <el-switch v-model="scope.data.row.shy" @change='onChangeForced(scope.data.row)' active-color="#13ce66">
                    </el-switch>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onShy(scope.data.row.id)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row.id)">删除</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { iotUrl } from '@/api/config'
import { mapActions, mapGetters, mapState } from 'vuex'
import { downloadEquipmentErrorList, updateCloudEquipment, deleteCloudEquipment } from '../api/index'
export default {
    name: 'equipmentError',
    data () {
        return {
            queryParams: {
                createStartTime: '',
                createEndTime: '',
                createTimeSortType: '',
                categoryId: '',
                code: '',
                brandName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '标题', prop: 'source' },
                { label: '创建时间', prop: 'categoryName' },
                { label: '关联活动', prop: 'shy' },
                { label: '是否生效', prop: 'code' }
            ]
        }
    },
    computed: {
        ...mapGetters({
            cloudEquipmentErrorList: 'cloudEquipmentErrorList',
            cloudEquipmentErrorPagination: 'cloudEquipmentErrorPagination'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            onQuery: 'findCloudEquipmentErrorList'
        }),
        onChangeForced () { },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery(this.queryParams)
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery(this.queryParams)
        },
        onOpenModel () {
            this.$router.push({ path: '/comfortCloud/operationsManagement/splashScreenDetail' })
        },
        onShy (row) {
            this.$router.push({ path: '/comfortCloud/operationsManagement/splashScreenDetail', query: { id: 123 } })
        },
        onSortChange (val) {
            if (val.order) {
                this.queryParams.createTimeSortType = val.order === 'descending' ? '2' : '1'
                this.onQuery(this.queryParams)
            }
        },
        onDelete (id) {
            this.$confirm('确认要删除该条记录吗', '删除提示').then(() => {
                deleteCloudEquipment({ id: id, operateUserName: this.userInfo.employeeName })
                this.onQuery(this.queryParams)
            })
        }
    },
    mounted () {
        this.onQuery(this.queryParams)
    }
}
</script>

<style scoped lang="scss">
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
.upload-fault {
    margin-top: 30px;
    margin-bottom: 20px;
}
.download-template {
    margin-bottom: 30px;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
.fault-code-edit {
    /deep/.el-dialog__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100px;
        min-height: 100px;
    }
}
</style>
