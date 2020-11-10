<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">模板名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">签约方式：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary">
                        查询
                    </h-button>
                    <h-button>
                        重置
                    </h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <h-button type="primary" @click="onEditContract">
                    新增合同模板
                </h-button>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 项</el-tag>
            </div>
            <hosJoyTable localName="V3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="paginationInfo.total"
                actionWidth='260' isAction :isActionFixed='tableData&&tableData.length>0'>
                <template slot="action" slot-scope="scope">
                    <h-button table>复制</h-button>
                    <h-button table>预览</h-button>
                    <h-button table>编辑</h-button>
                    <h-button table>禁用</h-button>
                    <h-button table @click="onShowVer()">版本记录</h-button>
                </template>
            </hosJoyTable>
        </div>
        <!---->
        <el-drawer title="合同版本记录" :visible.sync="ver_drawer" size="50%"  :before-close="handleClose">
            <hosJoyTable localName="V4.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe  :column="tableLabel" :data="tableData"
                isAction :isActionFixed='tableData&&tableData.length>0'>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onShowVer()">查看</h-button>
                </template>
            </hosJoyTable>
        </el-drawer>
    </div>
</template>
<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'contractlist',
    components: { hosJoyTable },
    data () {
        return {
            queryParams: {
                companyName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'userAccount' }
            ],
            tableData: [{ companyName: '勇哥', userAccount: '123' }, { companyName: '勇哥', userAccount: '123' }],
            paginationInfo: {},
            ver_drawer: false
        }
    },

    computed: {
        ...mapGetters({
            contractTempdata: state => state.contractTemp.contractTempdata
        })
    },
    methods: {
        ...mapActions({
            getContractTmep: 'contractTemp/getContractTmep'
        }),
        async searchList () {
            await this.getContractTmep()
            console.log(this.contractTempdata)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        onShowVer () {
            this.ver_drawer = true
        },
        onEditContract () {
            this.$router.push({ path: '/goodwork/contractTemp' })
        },
        handleClose () {
            this.ver_drawer = false
        }
    },
    mounted () {
        this.searchList()
    }
}
</script>
<style scoped lang="scss">
.tag_top {
    margin: 10px 0;
}
</style>