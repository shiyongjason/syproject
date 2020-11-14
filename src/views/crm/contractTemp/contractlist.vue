<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">模板名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.templateName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status" placeholder="请选择活动区域">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="禁用" value="0"></el-option>
                            <el-option label="启用" value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">签约方式：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.typeId" placeholder="请选择活动区域">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="电子签" value="0"></el-option>
                            <el-option label="线下签" value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="searchList(1)">
                        查询
                    </h-button>
                    <h-button @click="onRest">
                        重置
                    </h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <h-button type="primary" @click="onAddContract">
                    新增合同模板
                </h-button>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 {{paginationInfo.total||0}} 项</el-tag>
            </div>
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData"  @pagination="searchList"
             :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total" actionWidth='260' isAction
                :isActionFixed='tableData&&tableData.length>0'>

                <template slot="action" slot-scope="scope">
                    <h-button table @click="onCopy(scope.data.row)">复制</h-button>
                    <h-button table @click="onEdit(scope.data.row)">编辑</h-button>
                    <h-button table v-if="scope.data.row.status==1" @click="onEnable(scope.data.row)">禁用</h-button>
                    <h-button table v-if="scope.data.row.status==0" @click="onEnable(scope.data.row)">启用</h-button>
                    <h-button table @click="onShowVer(scope.data.row.id)">版本记录</h-button>
                </template>
            </hosJoyTable>
        </div>
        <!---->
        <el-drawer title="合同版本记录" :visible.sync="ver_drawer" size="50%" :before-close="handleClose">
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" showPagination  border stripe :column="verLabel" :data="ver_Data"
             :pageNumber.sync="drawerParams.pageNumber" :pageSize.sync="drawerParams.pageSize" :total="verpaginationInfo.total" isAction >
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onShowTempdetail(scope.data.row.id)">查看</h-button>
                </template>
            </hosJoyTable>
        </el-drawer>
    </div>
</template>
<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { mapActions, mapGetters } from 'vuex'
import { enableTemp, disableTemp } from './api'
import { clearCache, newCache } from '@/utils/index'

export default {
    name: 'contractlist',
    components: { hosJoyTable },
    data () {
        return {
            queryParams: {
                templateName: '',
                typeId: '',
                status: '',
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
                { label: '合同模板编号', prop: 'templateNo' },
                { label: '合同模版名称', prop: 'templateName' },
                { label: '合同类型', prop: 'typeName' },
                { label: '状态', prop: 'status', dicData: [{ value: 0, label: '禁用' }, { value: 1, label: '启用' }] },
                { label: '启用/禁用时间', prop: 'enableTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
                { label: '最近维护时间', prop: 'updateTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
                {
                    label: '最近维护人',
                    prop: 'updateBy',
                    render: (h, scope) => {
                        return <span>{scope.row.updateBy} ({scope.row.updateAccount})</span>
                    }
                }

            ],
            tableData: [],
            verLabel: [
                { label: '版本号', prop: 'versionNo' },
                { label: '创建时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
                { label: '创建人',
                    prop: 'createBy',
                    render: (h, scope) => {
                        return <span>{scope.row.createBy} ({scope.row.createAccount})</span>
                    } }
            ],
            ver_Data: [],
            paginationInfo: {},
            verpaginationInfo: {},
            ver_drawer: false
        }
    },

    computed: {
        ...mapGetters({
            contractTempdata: 'contractTemp/contractTempdata',
            verData: 'contractTemp/verData'
        })
    },
    methods: {
        ...mapActions({
            getContractTmep: 'contractTemp/getContractTmep',
            findVerdata: 'contractTemp/findVerdata'
        }),
        onRest () {
            this.queryParams = JSON.parse(JSON.stringify(this.copy_queryParams))
            this.searchList(1)
        },
        async searchList (val) {
            console.log(val)
            if (val == 1) { this.queryParams.pageNumber = val }
            await this.getContractTmep(this.queryParams)
            console.log(this.contractTempdata)
            this.tableData = this.contractTempdata.records
            this.paginationInfo = {
                pageNumber: this.contractTempdata.current,
                pageSize: this.contractTempdata.size,
                total: this.contractTempdata.total
            }
        },
        async  onShowVer (val) {
            this.drawerParams.templateId = val
            await this.findVerdata(this.drawerParams)
            this.ver_Data = this.verData.records
            console.log(this.verData)
            this.verpaginationInfo = {
                pageNumber: this.verData.current,
                pageSize: this.verData.size,
                total: this.verData.total
            }
            this.ver_drawer = true
        },
        onAddContract () {
            this.$router.push({ path: '/goodwork/contractTemp' })
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
                await enableTemp(val.id)
                this.$message({
                    message: '启用成功',
                    type: 'success'
                })
            } else {
                await disableTemp(val.id)
                this.$message({
                    message: '禁用成功',
                    type: 'success'
                })
            }
            this.searchList()
        },
        onCopy (val) {
            this.$router.push({ path: '/goodwork/contractTemp', query: { id: val.id, type: 'copy' } })
        },
        onEdit (val) {
            if (val.status == 1) {
                this.$confirm('启用状态的模版不可编辑，如您需要编辑此模版，请先禁用此模版', '提示', {
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
        this.searchList()
    },
    activated () {
        this.searchList()
    },
    beforeRouteEnter (to, from, next) {
        newCache('contractlist')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'contractDetail' || to.name != 'contractTemp') {

        } else {
            clearCache('contractlist')
        }
        next()
    }
}
</script>
<style scoped lang="scss">
.tag_top {
    margin: 10px 0;
}
/deep/.el-drawer__body{
    padding: 0 10px;
}
</style>