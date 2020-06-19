<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.projectName" placeholder="请输入项目名称" maxlength="50"></el-input>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">所属分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.deptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">VIP等级：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入经销商" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">VIP折扣：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.firstPartName" placeholder="请输入甲方名称" maxlength="50"></el-input>
                        ~
                        <el-input v-model="queryParams.firstPartName" placeholder="请输入甲方名称" maxlength="50"></el-input>
                    </div>
                </div>
               <div class="query-cont-col">
                    <div class="query-col-title">VIP目标：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.firstPartName" placeholder="请输入甲方名称" maxlength="50"></el-input>
                        ~
                        <el-input v-model="queryParams.firstPartName" placeholder="请输入甲方名称" maxlength="50"></el-input>
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
            <el-tag size="medium" class="eltagtop">已筛选 3 项</el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange"
             @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=150 :isShowIndex='true'>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onDrawerinfo(scope.data.row.id)">分配</el-button>
                </template>
            </basicTable>
        </div>
        <creditdrawer ref="creditdrawer"></creditdrawer>
        <el-dialog title="分配" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="分配给（员工）" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                  <el-form-item label="所属分部" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                 <el-form-item label="说明" prop="name">
                    <el-input type="textarea" v-model="ruleForm.desc"  maxlength="300" show-word-limit   :rows="6"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import creditdrawer from './components/creditdrawer'
export default {
    name: 'vipapplication',
    data () {
        return {
            queryParams: {},
            tableLabel: [
                { label: '企业名称', prop: 'projectName', width: '' },
                { label: '所属分部', prop: 'projectNo', width: '150' },
                { label: '信用评级', prop: 'deptName', width: '150' },
                { label: '服务费', prop: 'predictLoanAmount', width: '150' },
                { label: '可代采购额度（万元）', prop: 'companyName', width: '180' },
                { label: '剩余代采购金额（万元）', prop: 'firstPartName' },
                { label: '信用到期时间', prop: 'type', width: '120' },
                { label: '状态', prop: 'progress', width: '120' },
                { label: '资料状态', prop: 'submitTime', width: '150', formatters: 'dateTimes' },
                { label: '资料更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'updateTime', width: '150', formatters: 'dateTimes' }

            ],
            tableData: [{ projectName: '123123' }],
            branchArr: [],
            paginationInfo: {},
            dialogVisible: false,
            rules: {
                name: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                des: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            },
            ruleForm: {}
        }
    },
    components: {
        creditdrawer
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            crmdepList: 'crmmanage/crmdepList'
        }),
        pickerOptionsMax () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.maxUpdateTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsMin () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.minUpdateTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    async mounted () {
        this.onGetbranch()
    },
    methods: {
        ...mapActions({
            findCrmdeplist: 'crmmanage/findCrmdeplist'
        }),
        onRest () {
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
        async  searchList () {
            this.queryParams.statusList = this.status.toString()
            this.queryParams.typeList = this.typeArr.toString()
            const { ...params } = this.queryParams
            await this.findProjetpage(params)
            this.tableData = this.projectData.records || []
            this.paginationInfo = {
                pageNumber: this.projectData.current,
                pageSize: this.projectData.size,
                total: this.projectData.total
            }
            await this.findProjectLoan(params)
            this.loanData = this.projectLoan ? this.projectLoan : ''
        },
        async onGetbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
            this.branchArr = this.crmdepList
        },
        onDrawerinfo (val) {
            this.$refs.creditdrawer.onShowDrawerinfn()
        }
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
.eltagtop {
    margin-bottom: 10px;
}
.colblue {
    color: #50b7f7;
    cursor: pointer;
}
.project-record {
    padding: 10px 0;
    height: 400px;
    overflow-y: scroll;
    /deep/ .el-card__body {
        padding: 5px;
        span {
            color: grey;
        }
    }
}
.project-plant {
    display: flex;
    flex-wrap: wrap;
    .plantimg {
        margin: 5px;
        width: 95px;
        height: 95px;
        overflow: hidden;
        img {
            width: 95px;
            height: 100%;
        }
    }
}
.previewimg {
    text-align: center;
    img {
        width: 500px;
        padding: 10px;
    }
}
</style>