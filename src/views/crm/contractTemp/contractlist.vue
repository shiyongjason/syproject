<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">模板编号/名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.templateName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">合同类型：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.typeId" placeholder="请选择合同类型">
                            <el-option v-for="(item, index) in tempTypeOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已启用" value="1"></el-option>
                            <el-option label="已禁用" value="0"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">签署方式：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.signedWay" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="电子签" value="1"></el-option>
                            <el-option label="线下签" value="0"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">签署方企业来源：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.signedFirm" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="指定企业" value="1"></el-option>
                            <el-option label="合同企业" value="0"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="searchList(1)">查询</h-button>
                    <h-button @click="onRest">重置</h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <h-button type="primary" @click="onAddContract" v-if="hosAuthCheck(Auths.CRM_CONTRACT_ADD)">
                    新增合同模板
                </h-button>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 {{paginationInfo.total||0}} 项</el-tag>
            </div>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" @pagination="searchList" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total" actionWidth='375' isAction
                :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>

                <template slot="action" slot-scope="scope">
                    <h-button table @click="onCopy(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_CONTRACT_COPY)">复制</h-button>
                    <h-button table @click="onEdit(scope.data.row)" v-if="hosAuthCheck(Auths.CRM_CONTRACT_EDIT)">编辑</h-button>
                    <h-button table v-if="scope.data.row.status==1&&hosAuthCheck(Auths.CRM_CONTRACT_OPER)" @click="onEnable(scope.data.row)">禁用</h-button>
                    <h-button table v-if="scope.data.row.status==0&&hosAuthCheck(Auths.CRM_CONTRACT_OPER)" @click="onEnable(scope.data.row)">启用</h-button>
                    <h-button table @click="onShowVer(scope.data.row.id)" v-if="hosAuthCheck(Auths.CRM_CONTRACT_VER)">版本记录</h-button>
                </template>
            </hosJoyTable>
        </div>
        <h-drawer title="合同版本记录" :visible.sync="ver_drawer" v-if="ver_drawer" size='50%' :beforeClose="handleClose">
            <template #connect>
                <hosJoyTable isShowIndex ref="hosjoyTable" align="center" showPagination border stripe :column="verLabel" :data="ver_Data" @pagination="versionList" :pageNumber.sync="drawerParams.pageNumber" :pageSize.sync="drawerParams.pageSize" :total="verpaginationInfo.total" isAction>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onShowTempdetail(scope.data.row.id)">查看</h-button>
                    </template>
                </hosJoyTable>
            </template>
        </h-drawer>
    </div>
</template>
<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { mapActions, mapGetters } from 'vuex'
import { enableTemp, disableTemp } from './api'
import * as Auths from '@/utils/auth_const'
export default {
    name: 'contractlist',
    components: { hosJoyTable },
    data () {
        return {
            Auths,
            queryParams: {
                typeAuth: '',
                templateName: '',
                typeId: '',
                status: '',
                signedWay: '',
                signedFirm: '',
                pageNumber: 1,
                pageSize: 10
            },
            drawerParams: {
                pageNumber: 1,
                pageSize: 10,
                templateId: ''
            },
            copy_queryParams: {},
            tableLabel: [
                { label: '合同模板编号', prop: 'templateNo', width: '100' },
                { label: '合同模板名称', prop: 'templateName', width: '200' },
                { label: '合同类型', prop: 'typeName', width: '100' },
                { label: '签署方式', prop: 'signedWay', width: '100' },
                { label: '签署方企业来源', prop: 'signedFirm', width: '100' },
                { label: '状态', prop: 'status', dicData: [{ value: 0, label: '已禁用' }, { value: 1, label: '已启用' }], width: '80' },
                { label: '启用/禁用时间', prop: 'enableTime', displayAs: 'YYYY-MM-DD HH:mm:ss', sortable: 'custom', width: '200' },
                { label: '最近维护时间', prop: 'updateTime', displayAs: 'YYYY-MM-DD HH:mm:ss', sortable: 'custom', width: '200' },
                {
                    label: '最近维护人',
                    prop: 'updateBy',
                    render: (h, scope) => {
                        return <span>{scope.row.updateBy} ({scope.row.updateAccount})</span>
                    },
                    width: '200'
                }

            ],
            tableData: [],
            verLabel: [
                { label: '版本号', prop: 'versionNo' },
                { label: '创建时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
                {
                    label: '创建人',
                    prop: 'createBy',
                    render: (h, scope) => {
                        return <span>{scope.row.createBy} ({scope.row.createAccount})</span>
                    }
                }
            ],
            ver_Data: [],
            paginationInfo: {},
            verpaginationInfo: {},
            ver_drawer: false
        }
    },

    computed: {
        tempTypeOptions () {
            let result = JSON.parse(JSON.stringify(this.tempType)) || []
            result.unshift({ id: '', name: '全部' })
            return result
        },
        ...mapGetters({
            tempType: 'contractTemp/tempType',
            contractTempdata: 'contractTemp/contractTempdata',
            verData: 'contractTemp/verData'
        })
    },
    methods: {
        ...mapActions({
            getContratType: 'contractTemp/getContratType',
            getContractTmep: 'contractTemp/getContractTmep',
            findVerdata: 'contractTemp/findVerdata'
        }),
        onRest () {
            this.queryParams = JSON.parse(JSON.stringify(this.copy_queryParams))
            this.searchList(1)
        },
        async searchList (val) {
            if (val == 1) { this.queryParams.pageNumber = val }
            let _query = {
                ...this.queryParams,
                typeAuth: this.hosAuthCheck(Auths.CONTRACTLIST_TYPE_AUTH) ? '' : 2 // 1确认函
            }
            await this.getContractTmep(_query)
            this.tableData = this.contractTempdata.records
            this.paginationInfo = {
                pageNumber: this.contractTempdata.current,
                pageSize: this.contractTempdata.size,
                total: this.contractTempdata.total
            }
        },
        async versionList () {
            await this.findVerdata(this.drawerParams)
            this.ver_Data = this.verData.records
            this.verpaginationInfo = {
                pageNumber: this.verData.current,
                pageSize: this.verData.size,
                total: this.verData.total
            }
        },
        async onShowVer (val) {
            this.drawerParams.templateId = val
            await this.versionList()
            this.ver_drawer = true
        },
        onAddContract () {
            this.$router.push({ path: '/goodwork/contractTemp' })
        },
        sortChange (e) {
            if (e.order) {
                this.queryParams['sort.direction'] = e.order === 'descending' ? 'DESC' : 'ASC'
                this.queryParams['sort.property'] = e.prop
            } else {
                delete this.queryParams['sort.direction']
                delete this.queryParams['sort.property']
            }
            this.searchList()
        },
        onShowTempdetail (id) {
            this.ver_drawer = false
            this.$router.push({ path: '/goodwork/contractDetail', query: { id: id } })
        },
        handleClose () {
            this.ver_drawer = false
        },
        async onEnable (val) {
            if (val.status == 0) {
                try {
                    await enableTemp(val.id)
                    this.$message({
                        message: '启用成功',
                        type: 'success'
                    })
                } catch (error) {
                    this.$message.closeAll()
                    this.$confirm('不符合启用条件，请先编辑合同模板', '提示', {
                        confirmButtonText: '去编辑',
                        cancelButtonText: '暂不启用',
                        type: 'warning'
                    }).then(async () => {
                        await disableTemp(val.id)
                        this.$router.push({ path: '/goodwork/contractTemp', query: { id: val.id } })
                    }).catch(() => {

                    })
                }
            } else {
                try {
                    await disableTemp(val.id)
                    this.$message({
                        message: '禁用成功',
                        type: 'success'
                    })
                } catch (error) {

                }
            }
            this.searchList()
        },
        onCopy (val) {
            this.$router.push({ path: '/goodwork/contractTemp', query: { id: val.id, type: 'copy' } })
        },
        onEdit (val) {
            if (val.status == 1) {
                this.$confirm('启用状态的模板不可编辑，如您需要编辑此模板，请先禁用此模板', '提示', {
                    confirmButtonText: '禁用并编辑',
                    cancelButtonText: '暂不编辑',
                    type: 'warning'
                }).then(async () => {
                    await disableTemp(val.id)
                    this.$router.push({ path: '/goodwork/contractTemp', query: { id: val.id } })
                }).catch(() => {

                })
            } else {
                this.$router.push({ path: '/goodwork/contractTemp', query: { id: val.id } })
            }
        }
    },
    mounted () {
        this.copy_queryParams = JSON.parse(JSON.stringify(this.queryParams))
        this.getContratType({
            typeAuth: this.hosAuthCheck(Auths.CONTRACTLIST_TYPE_AUTH) ? '' : 2 // 1确认函
        })
        this.searchList()
    },
    activated () {
        this.searchList()
    }

}
</script>
<style scoped lang="scss">
.tag_top {
    margin: 10px 0;
}
/deep/.el-drawer__body {
    padding: 0 10px;
}
</style>
