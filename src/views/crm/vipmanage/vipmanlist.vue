<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">所属分部：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.pkDeptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">VIP等级：</div>
                    <div class="query-col-input">
                      <el-select v-model="queryParams.vipRuleId" placeholder="请选择" :clearable=true>
                            <el-option :label="item.vipRule" :value="item.id" v-for="item in vipLevel" :key="item.id"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">VIP折扣：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.minServiceFeeDiscount" placeholder="请输入最小折扣" v-isNum:2></el-input>折
                        ~
                        <el-input v-model="queryParams.maxServiceFeeDiscount" placeholder="请输入最大折扣" v-isNum:2></el-input>折
                    </div>
                </div>
               <div class="query-cont-col">
                    <div class="query-col-title">VIP目标：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.minVipTarget" placeholder="请输入最小目标" v-isNum:4="queryParams.minVipTarget"  maxlength="50"></el-input>万元
                        ~
                        <el-input v-model="queryParams.maxVipTarget" placeholder="请输入最大目标" v-isNum:4="queryParams.maxVipTarget"   maxlength="50"></el-input>万元
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
            <el-tag size="medium" class="eltagtop">已筛选 {{vipManagedata.total||0}}； VIP：{{vipPageLoan.count||0|money}}； VIP目标总额（万元）：{{vipPageLoan.totalTarget||0 |money}} </el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange"
             @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true"  :isShowIndex='true'>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onDrawerinfo(scope.data.row.companyId)">分配</el-button>
                </template>
            </basicTable>
        </div>
        <vipdrawer ref="vipdrawer"></vipdrawer>
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
import vipdrawer from './components/vipdrawer'
import { deepCopy } from '@/utils/utils'
// import { money } from '@/utils/filters'
export default {
    name: 'vipmanage',
    data () {
        return {
            queryParams: {
                companyName: '',
                maxServiceFeeDiscount: '',
                minServiceFeeDiscount: '',
                minVipTarget: '',
                maxVipTarget: '',
                pageNumber: 1,
                pageSize: 10,
                pkDeptDoc: '',
                vipRuleId: ''
            },
            copyParams: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '' },
                { label: '所属分部', prop: 'deptName' },
                { label: 'VIP等级', prop: 'vipRule' },
                { label: '次年服务费折扣（折）', prop: 'serviceFeeDiscount' },
                { label: 'VIP目标（万元）', prop: 'vipTarget', formatters: 'money' },
                { label: '更新时间', prop: 'updateTime', formatters: 'dateTimes' }
            ],
            tableData: [],
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
        vipdrawer
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            crmdepList: 'crmmanage/crmdepList',
            vipManagedata: 'vipManage/vipManagedata',
            vipLevel: 'vipManage/vipLevel',
            vipPageLoan: 'vipManage/vipPageLoan'
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
        this.searchList()
        this.onGetvipLevel()
        this.copyParams = deepCopy(this.queryParams)
    },
    methods: {
        ...mapActions({
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findVipmanage: 'vipManage/findVipmanage',
            findViprules: 'vipManage/findViprules',
            findVippageLoan: 'vipManage/findVippageLoan'
        }),
        onRest () {
            this.queryParams = deepCopy(this.copyParams)
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
            const { ...params } = this.queryParams
            await this.findVipmanage(params)
            this.tableData = this.vipManagedata.records || []
            this.paginationInfo = {
                pageNumber: this.vipManagedata.current,
                pageSize: this.vipManagedata.size,
                total: this.vipManagedata.total
            }
            await this.findVippageLoan(params)
            // this.loanData = this.vipPageLoan ? this.vipPageLoan : ''
        },
        async onGetvipLevel () {
            await this.findViprules()
        },
        async onGetbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
            this.branchArr = this.crmdepList
        },
        onDrawerinfo (val) {
            this.$refs.vipdrawer.onShowDrawerinfn(val)
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